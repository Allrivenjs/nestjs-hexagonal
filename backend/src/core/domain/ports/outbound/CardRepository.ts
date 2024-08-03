import { Card } from '../../entities/Card';

export interface CardRepository {
  save(card: Card): Promise<Card>;
  findBy(number: string, exp_m: string, exp_y: string): Promise<Card>;
}
