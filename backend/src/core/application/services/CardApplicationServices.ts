import { Injectable } from '@nestjs/common';
import { CardApplication } from '../CardApplication';
import { CardService } from '../../domain/ports/inbound/CardService';
import { CardDto } from '../../../infraestructure/payment/wompi/dto/card.dto';
import { Card } from '../../domain/entities/Card';

@Injectable()
export class CardApplicationServices implements CardApplication {
  constructor(private card: CardService) {}

  save(card: CardDto): Promise<Card> {
    return this.card.save(card as Card);
  }

  findBy(number: string, exp_m: string, exp_y: string): Promise<Card> {
    return this.card.findBy(number, exp_m, exp_y);
  }
}
