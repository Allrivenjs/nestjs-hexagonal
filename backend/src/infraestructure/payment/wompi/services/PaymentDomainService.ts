import { PaymentService } from '../ports/inbound/PaymentService';
import { HttpService } from '@nestjs/axios';
import { MERCHANDISE, TOKEN_CARD, TRANSACTION } from '../shared/endpoints';
import { Card } from '../../../../core/domain/entities/Card';
import { lastValueFrom } from 'rxjs';
import { TokenizeCardResponse } from '../shared/response/tokenize-card';
import { HttpException } from '@nestjs/common';
import { AcceptTokenResponse } from '../shared/response/accept-token';
import * as crypto from 'crypto';
import * as process from 'node:process';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentResponse } from '../shared/response/payment';
import { CardDto } from '../dto/card.dto';
import { v4 as uuidv4 } from 'uuid';
import { WompiCardDto } from '../dto/wompi-card.dto';

export class PaymentDomainService implements PaymentService {
  private readonly baseURL: string;
  constructor(private readonly httpService: HttpService) {
    this.baseURL = process.env.WOMPI_URL;
  }

  mapToCard(card: Card): WompiCardDto {
    return WompiCardDto.create(
      card.number,
      card.exp_month,
      card.exp_year,
      card.cvv,
      card.card_holder,
      card.installments,
    );
  }

  async AcceptToken(): Promise<string> {
    const response = this.httpService.get<AcceptTokenResponse>(
      `${this.baseURL}/${MERCHANDISE}/${process.env.WOMPI_PUBLIC_KEY}`,
      { headers: { 'Content-Type': 'application/json' } },
    );
    try {
      const result = await lastValueFrom(response);
      return result.data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      throw new HttpException(
        'Error when making the request to the Wompi service:' + error.message,
        500,
      );
    }
  }

  async checkTransaction(transactionId: string): Promise<PaymentResponse> {
    const response = this.httpService.get<PaymentResponse>(
      `${this.baseURL}/${TRANSACTION}/${transactionId}`,
    );
    return (await lastValueFrom(response)).data;
  }

  async createTransaction(
    card: CardDto,
    amount: number,
  ): Promise<PaymentResponse> {
    const token_data = await this.tokenizeCard(card as Card);
    const reference = uuidv4();
    const token = await this.AcceptToken();
    const currency = 'COP';
    const text = `${reference}${amount}${currency}${process.env.WOMPI_FIRMA}`;
    const encondedText = new TextEncoder().encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    const payment = PaymentDto.newChargeDto({
      currency: currency,
      amount_in_cents: amount,
      payment_method: {
        type: 'CARD',
        installments: card.installments,
        token: token_data.data.id,
      },
      reference: reference,
      acceptance_token: token,
      customer_email: 'test@gmail.com',
      signature: signature,
    });

    payment.redirect_url =
      process.env.SERVER_NAME !== 'localhost'
        ? process.env.SERVER_NAME + '/transaction/result'
        : '';

    const response = this.httpService.post<PaymentResponse>(
      `${this.baseURL}/${TRANSACTION}`,
      payment.toJSON(),
      { headers: this.getHeadersPublic() },
    );
    try {
      const result = await lastValueFrom(response);
      return result.data;
    } catch (error) {
      throw new HttpException(
        'Error when making the request to the Wompi service:' + error.message,
        500,
      );
    }
  }

  generateHash(): string {
    return crypto
      .createHash('sha256')
      .update(
        `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}${String(Math.floor(Math.random() * 60)).padStart(2, '0')}${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      )
      .digest('hex');
  }

  async tokenizeCard(card: Card): Promise<TokenizeCardResponse> {
    const response = this.httpService.post<TokenizeCardResponse>(
      `${this.baseURL}/${TOKEN_CARD}`,
      this.mapToCard(card),
      {
        headers: this.getHeadersPublic(),
      },
    );

    try {
      const result = await lastValueFrom(response);
      return result.data;
    } catch (error) {
      throw new HttpException(
        'Error when making the request to the Wompi service:' + error.message,
        500,
      );
    }
  }

  getHeadersPublic(): object {
    return {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + process.env.WOMPI_PUBLIC_KEY,
    };
  }
}
