export interface PaymentRepository {
  createTransaction(data: any): Promise<any>;
  checkTransaction(transactionId: string): Promise<any>;
}
