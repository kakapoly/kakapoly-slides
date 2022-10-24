import { IsEnum, IsUUID } from 'class-validator';
import { RoleType } from '../entities/role.entity';

export class CreateRoleDto {
  @IsUUID()
  deckId: string;

  @IsUUID()
  userId: string;

  @IsEnum(RoleType)
  type: RoleType;
}
