// src/csv/dto/get-columns.dto.ts
import { IsString, IsNotEmpty, IsArray, ArrayNotEmpty } from 'class-validator';

export class GetColumnsDto {
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  columns: string[];
}