import {
  IsInt,
  Min,
  IsNotEmpty,
  IsEnum,
  IsDate,
  IsOptional,
  IsArray,
  ArrayNotEmpty,
} from 'class-validator';
import { StatusType } from '../types/status.type';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsEnum(StatusType)
  status: StatusType;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  amount: number;

  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  productIds: number[];
}
