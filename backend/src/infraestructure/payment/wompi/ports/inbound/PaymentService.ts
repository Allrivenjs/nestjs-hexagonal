import { TokenizeCardResponse } from '../../shared/response/tokenize-card';
import { PaymentResponse } from '../../shared/response/payment';
import { CardDto } from '../../dto/card.dto';

export interface PaymentService {
  tokenizeCard(card: CardDto): Promise<TokenizeCardResponse>;
  AcceptToken(): Promise<string>;
  generateHash(): string;
  createTransaction(card: CardDto, amount: number): Promise<PaymentResponse>;
  checkTransaction(transactionId: string): Promise<PaymentResponse>;
  getHeadersPublic(): object;
}
