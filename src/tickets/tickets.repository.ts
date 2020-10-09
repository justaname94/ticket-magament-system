import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
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
    const query = this.createQueryBuilder(TICKET_DB_NAME);

    if (!all) {
      query.where(`${TICKET_DB_NAME}.userId = :userId`, { userId: user.id });
    }

    try {
      const tickets = await query.getMany();
      return tickets;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
