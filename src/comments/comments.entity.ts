import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Ticket } from '../tickets/tickets.entity';

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column({ type: 'timestamp', default: () => 'now()' })
  createdAt: Date;

  @ManyToOne(
    type => Ticket,
    ticket => ticket.comments,
    { eager: false },
  )
  ticket: Ticket;

  @Column()
  ticketId: number;

  @ManyToOne(
    type => User,
    user => user.comments,
    { eager: true },
  )
  user: User;

  @Column()
  userId: number;
}
