import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const role = this.rolesRepository.create(createRoleDto);
    await this.rolesRepository.save(role);
    return role;
  }

  findAll() {
    return `This action returns all roles`;
  }

  findOne(id: string) {
    return `This action returns a #${id} role`;
  }

  async findUserRoleOfDeck(deckId: string, userId: string) {
    return await this.rolesRepository.findOneBy({
      deckId,
      userId,
    });
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: string) {
    return `This action removes a #${id} role`;
  }
}
