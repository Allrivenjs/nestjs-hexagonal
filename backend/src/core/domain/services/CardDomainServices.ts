import { CardService } from '../ports/inbound/CardService';
import { CardRepository } from '../ports/outbound/CardRepository';
import { Card } from '../entities/Card';

export class CardDomainServices implements CardService {
  constructor(private repository: CardRepository) {}

  async save(card: Card): Promise<Card> {
    return this.repository.save(card);
  }
}
