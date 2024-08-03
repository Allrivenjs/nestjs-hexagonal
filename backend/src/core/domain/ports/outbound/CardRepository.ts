import { Card } from '../../entities/Card';

export interface CardRepository {
  save(card: Card): Promise<Card>;
}
