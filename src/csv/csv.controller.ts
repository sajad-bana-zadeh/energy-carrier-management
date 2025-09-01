// src/csv/csv.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CsvService } from './csv.service';
import { GetColumnsDto } from './dto/get-columns.dto';
import { FilterRowsDto } from './dto/filter-rows.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../users/user.entity';

@Controller('csv')
@UseGuards(JwtAuthGuard, RolesGuard) // Apply guards to the entire controller
export class CsvController {
  constructor(private readonly csvService: CsvService) {}

  @Get('last-row/:fileName')
  @Roles(UserRole.ADMIN, UserRole.VIEWER) // Accessible by both admins and viewers
  getLastRow(@Param('fileName') fileName: string) {
    return this.csvService.getLastRow(fileName);
  }

  @Post('columns')
  @Roles(UserRole.ADMIN, UserRole.VIEWER) // Accessible by both admins and viewers
  getColumns(@Body() getColumnsDto: GetColumnsDto) {
    return this.csvService.getColumns(getColumnsDto.fileName, getColumnsDto.columns);
  }

  @Post('filter-rows')
  @Roles(UserRole.ADMIN) // Accessible only by admins
  filterRows(@Body() filterRowsDto: FilterRowsDto) {
    return this.csvService.filterRows(filterRowsDto.fileName, filterRowsDto);
  }
}