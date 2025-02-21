import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { TransactionApplication } from '../TransactionApplication';
import { CreateTransactionDto } from '../../shared/dto/create-transaction.dto';
import { TransactionService } from '../../domain/ports/inbound/TransactionService';
import { Transaction } from '../../domain/entities/Transaction';
import { StatusType } from '../../shared/types/status.type';
import { ProductsService } from '../../domain/ports/inbound/ProductsService';
import { CustomerService } from '../../domain/ports/inbound/CustomerService';
import { PaymentService } from '../../../infraestructure/payment/wompi/ports/inbound/PaymentService';
import { PaymentDomainService } from '../../../infraestructure/payment/wompi/services/PaymentDomainService';
import { HttpService } from '@nestjs/axios';
import { CardService } from '../../domain/ports/inbound/CardService';
import { Card } from '../../domain/entities/Card';
import { Customer } from '../../domain/entities/Customer';
import { Delivery } from '../../domain/entities/Delivery';
import { DeliveryService } from '../../domain/ports/inbound/DeliveryService';
import { detectCardType } from '../../shared/getTypeCard';

@Injectable()
export class TransactionApplicationService implements TransactionApplication {
  private payment: PaymentService;
  constructor(
    private transaction: TransactionService,
    private product: ProductsService,
    private customer: CustomerService,
    private card: CardService,
    private delivery: DeliveryService,
    httpService: HttpService,
  ) {
    this.payment = new PaymentDomainService(httpService);
  }

  async createTransaction(transaction: CreateTransactionDto): Promise<number> {
    const product = await this.product.findById(transaction.productId);
    if (!product || product.unitsInStock === 0) {
      throw new NotFoundException('Product not found');
    }

    if (product.unitsInStock < transaction.numberUnits) {
      throw new HttpException('Not enough stock', 400);
    }

    if (product.unitPrice * transaction.numberUnits !== transaction.amount) {
      throw new HttpException('Amount does not match', 400);
    }

    let customer: Customer;

    try {
      const customerEntity = Customer.create(
        transaction.customer.name,
        transaction.customer.email,
        transaction.customer.phone,
      );

      // validate if customer exists
      const customerExists = await this.customer.findByEmail(
        transaction.customer.email,
      );
      if (customerExists) {
        customer = customerExists;
      } else {
        customer = await this.customer.save(customerEntity);
      }
    } catch (error) {
      throw new HttpException('Error creating customer ' + error, 500);
    }

    let card: Card;
    try {
      const cardEntity = Card.create(
        transaction.card.number,
        transaction.card.exp_month,
        transaction.card.exp_year,
        transaction.card.cvc,
        transaction.card.card_holder,
        transaction.card.installments,
        detectCardType(transaction.card.number),
      );

      // validate if card exists
      const cardExists = await this.card.findBy(
        transaction.card.number,
        transaction.card.exp_month,
        transaction.card.exp_year,
      );
      if (cardExists) {
        card = cardExists;
      } else {
        card = await this.card.save(cardEntity);
      }
    } catch (error) {
      throw new HttpException('Error creating card ' + error, 500);
    }

    let amount = transaction.amount;
    // add 00 for cents
    amount = amount * 100;
    const payment = await this.payment.createTransaction(
      transaction.card,
      amount,
    );

    const transactionNumber = payment.data.id;
    let status: StatusType;
    if (payment.data.status === 'APPROVED') {
      status = StatusType.APPROVED;
    } else if (payment.data.status === 'PENDING') {
      status = StatusType.PENDING;
    } else {
      status = StatusType.CANCELLED;
    }

    let delivery: Delivery;

    try {
      const deliveryEntity = Delivery.create(
        'PENDING',
        transaction.delivery.city,
        transaction.delivery.address,
        transaction.delivery.zipCode,
        transaction.delivery.state,
        customer,
      );

      delivery = await this.delivery.save(deliveryEntity);
    } catch (e) {}

    let saved: number;
    try {
      const entity = Transaction.create(
        transactionNumber,
        transaction.date,
        transaction.amount,
        transaction.numberUnits,
        product,
        customer,
        card,
        delivery,
        status,
      );
      saved = await this.transaction.save(entity);
    } catch (error) {
      throw new HttpException('Error creating transaction ' + error, 500);
    }
    // find transaction by id
    return saved;
  }

  async updateStatus(transactionId: number, status: StatusType): Promise<void> {
    const entity = await this.transaction.findById(transactionId);
    if (!entity) {
      throw new NotFoundException('Transaction not found');
    }
    await this.transaction.updateStatus(entity.transactionId, status);
  }

  async getTransaction(transactionId: number): Promise<Transaction> {
    const transaction = await this.transaction.findById(transactionId);
    const paymentStatus = await this.payment.checkTransaction(
      transaction.transactionNumber,
    );
    const statusRequest = paymentStatus.data.status;
    if (statusRequest === 'APPROVED') {
      await this.updateStatus(transactionId, StatusType.APPROVED);
      transaction.status = StatusType.APPROVED;
      //update stock of product
      const product = await this.product.findById(
        transaction.product.productId,
      );
      const unitsInStock = product.unitsInStock - transaction.numberUnits;
      await this.product.updateStock(product.productId, unitsInStock);
    } else {
      await this.updateStatus(transactionId, StatusType.CANCELLED);
      transaction.status = StatusType.CANCELLED;
    }
    // modific number of cards to show only last 4 digits, and add **** to the rest
    transaction.card.number = transaction.card.number.slice(-4);

    // remove cvc
    delete transaction.card.cvc;

    return transaction;
  }
}
