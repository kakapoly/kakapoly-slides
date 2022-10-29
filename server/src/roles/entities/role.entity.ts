import { Deck } from '../../decks/entities/deck.entity';
import { User } from '../../users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleType {
  OWNER = 'owner',
  VIEWER = 'viewer',
  EDITOR = 'editor',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  deckId: string;

  @Column()
  userId: string;

  @Column({
    type: 'enum',
    enum: RoleType,
  })
  type: RoleType;

  @ManyToOne(() => Deck, (deck) => deck.roles)
  deck: Deck;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;
}
