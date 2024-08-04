import { CardService } from '../ports/inbound/CardService';
import { CardRepository } from '../ports/outbound/CardRepository';
import { Card } from '../entities/Card';

export class CardDomainServices implements CardService {
  constructor(private repository: CardRepository) {}

  async save(card: Card): Promise<Card> {
    return this.repository.save(card);
  }

  findBy(number: string, exp_m: string, exp_y: string): Promise<Card> {
    return this.repository.findBy(number, exp_m, exp_y);
  }
}
