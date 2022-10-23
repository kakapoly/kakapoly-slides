import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-anonymous';
import { AnonUser } from 'src/types';

@Injectable()
export class AnonStrategy extends PassportStrategy(Strategy, 'anonymous') {
  constructor() {
    super();
  }

  authenticate() {
    const anonUser: AnonUser = {
      id: null,
      email: null,
    };

    return this.success(anonUser);
  }
}
