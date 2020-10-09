import { InternalServerErrorException } from '@nestjs/common';
import { Any, EntityRepository, Repository } from 'typeorm';
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

    try {
      if (!all) {
        tickets = await this.find({ where: { userId: user.id } });
        tickets = tickets.map(ticket => {
          delete ticket.userId;
          return ticket;
        });
      } else {
        tickets = await this.find({ relations: ['user'] });

        // Remove user sensitive data
        tickets = tickets.map(ticket => {
          delete ticket.userId;
          const { firstName, lastName, isAdmin } = ticket.user;
          // @ts-ignore
          ticket.user = { firstName, lastName, isAdmin };

          return ticket;
        });
      }

      return tickets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
