import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { RolesService } from '../roles/roles.service';
import { Role } from '../roles/entities/role.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Deck, Role, User])],
  controllers: [DecksController],
  providers: [DecksService, RolesService, UsersService],
})
export class DecksModule {}
