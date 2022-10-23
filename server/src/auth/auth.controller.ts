import {
  Controller,
  Post,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { LocalAuthRequest } from 'src/types';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('log-in')
  async logIn(@Req() req: LocalAuthRequest) {
    return this.authService.login(req.user);
  }

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.findOneByEmail(createUserDto.email);

    if (user) {
      throw new HttpException('Email already in use.', HttpStatus.BAD_REQUEST);
    }

    return this.usersService.create(createUserDto);
  }
}
