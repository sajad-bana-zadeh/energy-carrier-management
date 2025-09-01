// src/auth/dto/register-user.dto.ts
import { IsString, IsNotEmpty, MinLength, IsEnum, IsArray } from 'class-validator';
import { UserRole } from '../../users/user.entity';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsArray()
  @IsEnum(UserRole, { each: true })
  @IsNotEmpty()
  roles: UserRole[];
}