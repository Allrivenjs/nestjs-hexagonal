import { Injectable } from '@nestjs/common';
import { CardRepository } from '../../../core/domain/ports/outbound/CardRepository';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../../../core/domain/entities/Card';
import { Repository } from 'typeorm';
import { CardEntity } from '../../postgress/entities/card.entity';

@Injectable()
export class CardRepositoryAdapter implements CardRepository {
  constructor(
    @InjectRepository(CardEntity) private repository: Repository<CardEntity>,
  ) {}

  save(card: Card): Promise<Card> {
    return this.repository.save(card);
  }
}
