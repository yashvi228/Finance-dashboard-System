import { IsString, IsNumber, IsDateString, IsOptional, Min, IsIn } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  @Min(0.01)
  amount: number;

  @IsString()
  @IsIn(['income', 'expense'])
  type: string;

  @IsString()
  category: string;

  @IsDateString()
  date: string;

  @IsOptional()
  @IsString()
  notes?: string;
}