import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
  Req,
} from '@nestjs/common';
import { JwtAnonAuthGuard } from '../auth/guards/jwt-anon-auth.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleType } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { JwtAnonAuthRequest, JwtAuthRequest } from '../types';
import { UsersService } from '../users/users.service';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';

@Controller('decks')
export class DecksController {
  constructor(
    private readonly decksService: DecksService,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req: JwtAuthRequest,
    @Body() createDeckDto: CreateDeckDto,
  ) {
    return this.decksService.createAndAssignRole(createDeckDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  list(@Req() req: JwtAuthRequest) {
    return this.decksService.findAllByUser(req.user.id);
  }

  @UseGuards(JwtAnonAuthGuard)
  @Get(':id')
  async get(@Req() req: JwtAnonAuthRequest, @Param('id') id: string) {
    const deck = await this.decksService.findOne(id);

    if (!deck) {
      throw new NotFoundException();
    }

    if (deck.publicAccess) {
      return deck;
    }

    /**
     * TODO: Consider making deck creation access control logic a guard
     */
    if (req.user.id) {
      const user = await this.usersService.findOne(req.user.id);

      if (!user) {
        throw new UnauthorizedException();
      }

      const role = await this.rolesService.findUserRoleOfDeck(id, user.id);

      if (!role) {
        throw new UnauthorizedException();
      }

      if (
        !(
          role.type === RoleType.EDITOR ||
          role.type === RoleType.VIEWER ||
          role.type === RoleType.OWNER
        )
      ) {
        throw new UnauthorizedException();
      }

      return deck;
    }

    throw new UnauthorizedException();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Req() req: JwtAuthRequest,
    @Param('id') id: string,
    @Body() updateDeckDto: UpdateDeckDto,
  ) {
    const user = await this.usersService.findOne(req.user.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    const role = await this.rolesService.findUserRoleOfDeck(id, user.id);

    if (!role) {
      throw new UnauthorizedException();
    }

    if (!(role.type === RoleType.EDITOR || role.type === RoleType.OWNER)) {
      throw new UnauthorizedException();
    }

    return this.decksService.update(id, updateDeckDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.decksService.remove(id);
  }
}
