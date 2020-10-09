import { hash } from 'bcrypt';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Ticket } from '../tickets/tickets.entity';
import { Comment } from '../comments/comments.entity';

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
    { eager: true },
  )
  tickets: Ticket[];

  @OneToMany(
    type => Comment,
    comment => comment.user,
    { eager: true },
  )
  comments: Comment[];

  async validatePassword(password: string): Promise<boolean> {
    const genHash = await hash(password, this.salt);
    return genHash === this.password;
  }
}
