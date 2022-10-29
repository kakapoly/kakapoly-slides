import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { Deck } from './entities/deck.entity';
import { RolesService } from '../roles/roles.service';
import { CreateRoleDto } from '../roles/dto/create-role.dto';
import { RoleType } from '../roles/entities/role.entity';
import { UsersService } from '../users/users.service';
import { AuthUser } from '../types';

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

    return await this.findOne(deck.id);
  }

  async createAndAssignRole(
    createDeckDto: CreateDeckDto,
    userId: AuthUser['id'],
  ) {
    const deck = await this.create(createDeckDto);

    if (!deck) {
      throw new Error('Deck not found.');
    }

    const user = await this.usersService.findOne(userId);

    if (!user) {
      throw new Error('User not found.');
    }

    const createRoleDto = new CreateRoleDto();
    createRoleDto.deckId = deck.id;
    createRoleDto.userId = user.id;
    createRoleDto.type = RoleType.OWNER;

    await this.rolesService.create(createRoleDto);

    return await this.findOne(deck.id);
  }

  async findAllByUser(userId: string) {
    return await this.decksRepository
      .createQueryBuilder('deck')
      .leftJoinAndSelect('deck.roles', 'roles')
      .leftJoinAndSelect('roles.user', 'user')
      .where('user.id = :userId', { userId })
      .select(['deck.id', 'deck.title', 'deck.publicAccess', 'roles'])
      .getMany();
  }

  async findOne(id: string) {
    return await this.decksRepository.findOne({
      where: {
        id,
      },
      relations: ['roles'],
    });
  }

  async update(id: string, updateDeckDto: UpdateDeckDto) {
    await this.decksRepository.update(
      {
        id,
      },
      updateDeckDto,
    );

    return await this.findOne(id);
  }

  remove(id: string) {
    return `This action removes a #${id} deck`;
  }
}
