import { hash } from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Comment } from '../comments/comments.entity';
import { Ticket } from '../tickets/tickets.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isAdmin: boolean;

  @Column()
  salt: string;

  @OneToMany(
    type => Ticket,
    ticket => ticket.user,
    { eager: false },
  )
  tickets: Ticket[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
    { eager: false },
  )
  comments: Comment[];

  async validatePassword(password: string): Promise<boolean> {
    const genHash = await hash(password, this.salt);
    return genHash === this.password;
  }
}
