// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User, UserRole } from './user.entity';

@Injectable()
export class UsersService {
  // In-memory database for demonstration purposes
  private readonly users: User[] = [];
  private idCounter = 1;

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(username: string, passwordHash: string, roles: UserRole[]): Promise<User> {
    const newUser: User = {
      id: this.idCounter++,
      username,
      passwordHash,
      roles,
    };
    this.users.push(newUser);
    return newUser;
  }
}