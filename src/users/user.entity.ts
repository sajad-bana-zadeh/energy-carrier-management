// src/users/user.entity.ts
export enum UserRole {
  ADMIN = 'admin',
  VIEWER = 'viewer',
}

export class User {
  id: number;
  username: string;
  passwordHash: string;
  roles: UserRole[];
}