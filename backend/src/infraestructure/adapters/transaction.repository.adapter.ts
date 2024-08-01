import { TransactionRepository } from '../../core/domain/ports/outbound/TransactionRepository';
import { TransactionEntity } from '../../core/domain/entities/transaction.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StatusType } from '../../core/shared/types/status.type';

export class TransactionRepositoryAdapter implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
  ) {}

  findAll(): Promise<TransactionEntity[]> {
    return this.repository.find();
  }

  findById(id: number): Promise<TransactionEntity> {
    return this.repository.findOneBy({ transactionId: id });
  }

  save(transaction: TransactionEntity): Promise<TransactionEntity> {
    return this.repository.save(transaction);
  }

  async updateStatus(
    transactionId: number,
    status: StatusType,
  ): Promise<TransactionEntity> {
    await this.repository.update(transactionId, { status });
    return this.repository.findOneBy({ transactionId: transactionId });
  }
}
