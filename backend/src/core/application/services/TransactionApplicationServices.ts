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

@Injectable()
export class TransactionApplicationService implements TransactionApplication {
  private payment: PaymentService;
  constructor(
    private transaction: TransactionService,
    private product: ProductsService,
    private customer: CustomerService,
    private card: CardService,
    private readonly httpService: HttpService,
  ) {
    this.payment = new PaymentDomainService(httpService);
  }

  async createTransaction(transaction: CreateTransactionDto): Promise<number> {
    const product = await this.product.findById(transaction.productId);
    if (!product || product.unitsInStock === 0) {
      throw new NotFoundException('Product not found');
    }
    console.log('product: ', product);
    let customer: Customer;

    let card: Card;
    try {
      const cardEntity = Card.create(
        transaction.card.number,
        transaction.card.exp_month,
        transaction.card.exp_year,
        transaction.card.cvv,
        transaction.card.card_holder,
        transaction.card.installments,
      );
      card = await this.card.save(cardEntity);
      console.log('card: ', card);
    } catch (error) {
      throw new HttpException('Error creating card ' + error, 500);
    }

    console.log('transaction.customer: ', transaction.customer);
    try {
      const customerEntity = Customer.create(
        transaction.customer.name,
        transaction.customer.email,
        transaction.customer.phone,
        transaction.customer.address,
      );
      customer = await this.customer.save(customerEntity);
      console.log('customer: ', customer);
    } catch (error) {
      throw new HttpException('Error creating customer ' + error, 500);
    }

    const payment = await this.payment.createTransaction(
      transaction.card,
      transaction.amount,
    );

    const transactionNumber = payment.data.id;
    console.log('transactionNumber: ', transactionNumber);
    let status: StatusType;
    if (payment.data.status === 'APPROVED') {
      status = StatusType.APPROVED;
    } else if (payment.data.status === 'PENDING') {
      status = StatusType.PENDING;
    } else {
      status = StatusType.CANCELLED;
    }

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
        status,
      );
      console.log('entity: ', entity);
      saved = await this.transaction.save(entity);
    } catch (error) {
      throw new HttpException('Error creating transaction ' + error, 500);
    }

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
      //update stock of product
      const product = await this.product.findById(
        transaction.product.productId,
      );
      const unitsInStock = product.unitsInStock - transaction.numberUnits;
      await this.product.updateStock(product.productId, unitsInStock);
    } else {
      await this.updateStatus(transactionId, StatusType.CANCELLED);
    }
    return transaction;
  }
}
