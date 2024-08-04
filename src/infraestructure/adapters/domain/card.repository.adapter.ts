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

  findBy(number: string, exp_m: string, exp_y: string): Promise<Card> {
    return this.repository.findOne({
      where: {
        number: number,
        exp_month: exp_m,
        exp_year: exp_y,
      },
    });
  }
}
