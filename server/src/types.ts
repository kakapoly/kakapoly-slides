import { Request } from 'express';
import { User } from './users/entities/user.entity';

export interface AuthUser {
  id: User['id'];
  email: User['email'];
}

export interface AnonUser {
  id: null;
  email: null;
}

export interface LogInUser extends AuthUser {
  password: User['password'];
}

export interface LocalAuthRequest extends Request {
  user: LogInUser;
}

export interface JwtAuthRequest extends Request {
  user: AuthUser;
}

export interface JwtAnonAuthRequest extends Request {
  user: AuthUser | AnonUser;
}
