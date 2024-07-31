import { CardEntity } from '../../entities/card.entity';
import { ChargeDto } from '../../dto/charge.dto';
import { TokenizeCardResponse } from '../../shared/response/tokenize-card';
import { PaymentResponse } from '../../shared/response/payment';

export interface PaymentService {
  tokenizeCard(card: CardEntity): Promise<TokenizeCardResponse>;
  AcceptToken(): Promise<string>;
  generateHash(): string;
  createTransaction(data: ChargeDto): Promise<PaymentResponse>;
  checkTransaction(transactionId: string): Promise<PaymentResponse>;
  getHeadersPublic(): object;
}
