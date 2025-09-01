// src/csv/dto/filter-rows.dto.ts
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterRowsDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsString()
  @IsNotEmpty()
  column: string;

  @IsNumber()
  @Type(() => Number) // Transform incoming string to number for validation
  value: number;
}