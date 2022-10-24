import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deck {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @OneToMany(() => Role, (role) => role.deck)
  roles: Role[];

  @Column({
    default: false,
  })
  publicAccess: boolean;
}
