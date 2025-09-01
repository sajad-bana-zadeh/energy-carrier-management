// src/csv/csv.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse';
import { FilterRowsDto } from './dto/filter-rows.dto';

@Injectable()
export class CsvService {
  private readonly validFiles = ['electricity', 'water', 'gas'];
  private readonly filesDir = path.join(process.cwd(), 'files_project');

  private async getValidatedFilePath(fileName: string): Promise<string> {
    if (!this.validFiles.includes(fileName)) {
      throw new BadRequestException('Invalid file name specified.');
    }
    const filePath = path.join(this.filesDir, `${fileName}.csv`);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException(`File ${fileName}.csv not found.`);
    }
    return filePath;
  }
  
  private async parseCsv(filePath: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      // FIX: Explicitly type 'records' as any[]
      const records: any[] = []; 
      const parser = parse({
        columns: true,
        trim: true,
        skip_empty_lines: true,
      });

      fs.createReadStream(filePath)
        .pipe(parser)
        .on('data', (record) => records.push(record)) // This line will now work correctly
        .on('end', () => resolve(records))
        .on('error', (error) => reject(error));
    });
  }

  async getLastRow(fileName: string): Promise<any> {
    const filePath = await this.getValidatedFilePath(fileName);
    const records = await this.parseCsv(filePath);
    if (records.length === 0) {
      return {};
    }
    return records[records.length - 1];
  }

  async getColumns(fileName: string, columns: string[]): Promise<any[]> {
    const filePath = await this.getValidatedFilePath(fileName);
    const records = await this.parseCsv(filePath);

    if (records.length > 0) {
        const availableColumns = Object.keys(records[0]);
        const invalidColumns = columns.filter(c => !availableColumns.includes(c));
        if (invalidColumns.length > 0) {
            throw new BadRequestException(`Invalid columns requested: ${invalidColumns.join(', ')}`);
        }
    }

    return records.map(record => {
      const result = {};
      columns.forEach(col => {
        if (record.hasOwnProperty(col)) {
          result[col] = record[col];
        }
      });
      return result;
    });
  }

  async filterRows(fileName: string, filterDto: FilterRowsDto): Promise<any[]> {
    const filePath = await this.getValidatedFilePath(fileName);
    const records = await this.parseCsv(filePath);
    const { column, value } = filterDto;

    return records.filter(record => {
      if (!record.hasOwnProperty(column)) {
        return false; // Or throw an error if the column must exist
      }
      const recordValue = parseFloat(record[column]);
      return !isNaN(recordValue) && recordValue > value;
    });
  }
}