// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CsvModule } from './csv/csv.module';

@Module({
  imports: [AuthModule, UsersModule, CsvModule],
  controllers: [],
  providers: [],
})
export class AppModule {}