import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  // constructor(private readonly transactionRepository: TransactionRepository) {}
  // async save(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity> {
  //     const newTransaction = new TransactionEntity(
  //         this.transactionRepository.getNextId(),
  //         createTransactionDto.amount,
  //         createTransactionDto.status,
  //     );
  //     return await this.transactionRepository.save(newTransaction);
  // }
}
