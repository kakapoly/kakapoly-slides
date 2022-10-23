import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAnonAuthGuard extends AuthGuard(['jwt', 'anonymous']) {}
