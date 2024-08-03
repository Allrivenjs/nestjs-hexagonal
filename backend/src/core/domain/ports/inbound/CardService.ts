import { Card } from '../../entities/Card';

export interface CardService {
  save(card: Card): Promise<Card>;
}
