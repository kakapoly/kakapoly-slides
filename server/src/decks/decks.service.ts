import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Deck } from './entities/deck.entity';
import { RolesService } from 'src/roles/roles.service';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { RoleType } from 'src/roles/entities/role.entity';
import { UsersService } from 'src/users/users.service';
import { AuthUser } from 'src/types';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private readonly decksRepository: Repository<Deck>,
    private readonly rolesService: RolesService,
    private readonly usersService: UsersService,
  ) {}

  async create(createDeckDto: CreateDeckDto) {
    const deck = this.decksRepository.create({
      title: createDeckDto.title,
    });

    await this.decksRepository.save(deck);

    return deck;
  }

  async createAndAssignRole(
    createDeckDto: CreateDeckDto,
    userId: AuthUser['id'],
  ) {
    const deck = await this.create(createDeckDto);

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    const createRoleDto = new CreateRoleDto();
    createRoleDto.deckId = deck.id;
    createRoleDto.userId = user.id;
    createRoleDto.type = RoleType.OWNER;

    await this.rolesService.create(createRoleDto);

    return deck;
  }

  findAll() {
    return `This action returns all decks`;
  }

  async findOne(id: string) {
    return await this.decksRepository.findOneBy({ id });
  }

  update(id: string, updateDeckDto: UpdateDeckDto) {
    return `This action updates a #${id} deck`;
  }

  remove(id: string) {
    return `This action removes a #${id} deck`;
  }
}
