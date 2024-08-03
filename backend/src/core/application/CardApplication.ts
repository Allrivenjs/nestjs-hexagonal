import { CardDto } from '../../infraestructure/payment/wompi/dto/card.dto';
import { Card } from '../domain/entities/Card';

export interface CardApplication {
  save(card: CardDto): Promise<Card>;
}
