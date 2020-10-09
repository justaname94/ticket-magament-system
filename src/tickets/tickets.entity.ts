import {
  BaseEntity,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { TicketStatus } from './ticket-status.enum';
import { Comment } from '../comments/comments.entity';

@Entity()
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: TicketStatus;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @ManyToOne(
    type => User,
    user => user.tickets,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;

  @OneToMany(
    type => Comment,
    comment => comment.ticket,
    { eager: true },
  )
  comments: Comment[];
}
