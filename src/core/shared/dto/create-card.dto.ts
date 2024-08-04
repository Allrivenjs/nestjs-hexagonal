import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  number: string;
  @IsNotEmpty()
  @IsString()
  exp_month: string;
  @IsNotEmpty()
  @IsString()
  exp_year: string;
  @IsString()
  @IsNotEmpty()
  cvc: string;
  @IsNotEmpty()
  @IsString()
  card_holder: string;
}
