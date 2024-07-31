import { PaymentService } from '../ports/inbound/PaymentService';
import { PaymentRepository } from '../ports/outbound/PaymentRepository';
import { HttpService } from '@nestjs/axios';
import { MERCHANDISE, TOKEN_CARD, TRANSACTION } from '../shared/endpoints';
import { CardEntity } from '../entities/card.entity';
import { lastValueFrom } from 'rxjs';
import { TokenizeCardResponse } from '../shared/response/tokenize-card';
import { HttpException } from '@nestjs/common';
import { AcceptTokenResponse } from '../shared/response/accept-token';
import * as crypto from 'crypto';
import { ChargeDto } from '../dto/charge.dto';
import * as process from 'node:process';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentResponse } from '../shared/response/payment';

export class PaymentDomainService implements PaymentService {
  private readonly baseURL: string;
  constructor(
    private repository: PaymentRepository,
    private readonly httpService: HttpService,
  ) {
    this.baseURL = process.env.WOMPI_URL;
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

  async createTransaction(data: ChargeDto): Promise<PaymentResponse> {
    const token = await this.AcceptToken();
    const text =
      data.reference +
      data.amount_in_cents +
      data.currency +
      process.env.WOMPI_FIRMA;
    const hashBuffer = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(text),
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    const payment = PaymentDto.newChargeDto({
      currency: data.currency,
      amount_in_cents: data.amount_in_cents,
      payment_method: data.payment_method,
      reference: data.reference,
      acceptance_token: token,
      customer_email: 'test@gmail.com',
      signature: signature,
    });

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

  async tokenizeCard(card: CardEntity): Promise<TokenizeCardResponse> {
    const response = this.httpService.post<TokenizeCardResponse>(
      `${this.baseURL}/${TOKEN_CARD}`,
      card,
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
