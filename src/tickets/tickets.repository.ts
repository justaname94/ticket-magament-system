import { InternalServerErrorException } from '@nestjs/common';
import { join } from 'path';
import { Any, EntityRepository, Repository, TreeChildren } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketStatus } from './ticket-status.enum';
import { Ticket } from './tickets.entity';

const TICKET_DB_NAME = 'ticket';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  async createTicket(
    createTicketDto: CreateTicketDto,
    user: User,
  ): Promise<Ticket> {
    const { title, description } = createTicketDto;

    const ticket = new Ticket();
    ticket.title = title;
    ticket.description = description;
    ticket.status = TicketStatus.OPEN;
    ticket.user = user;

    try {
      await ticket.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    delete ticket.user;

    return ticket;
  }

  async getTickets(user?: User, all: boolean = false): Promise<Ticket[]> {
    let tickets: Ticket[];

    const removeCommentUserData = comment => {
      delete comment.user.password;
      delete comment.user.salt;
    };

    try {
      if (!all) {
        tickets = await this.find({ where: { userId: user.id } });
        tickets = tickets.map(ticket => {
          ticket.comments.map(removeCommentUserData);
          return ticket;
        });
      } else {
        tickets = await this.find({
          relations: ['user', 'comments'],
        }); // Remove user sensitive data
        tickets = tickets.map(ticket => {
          const { firstName, lastName, isAdmin, email } = ticket.user;
          // @ts-ignore
          ticket.user = { firstName, lastName, isAdmin, email };

          ticket.comments.map(removeCommentUserData);

          return ticket;
        });
      }

      return tickets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
