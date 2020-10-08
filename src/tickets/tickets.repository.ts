import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketStatus } from './ticket-status.enum';
import { Ticket } from './tickets.entity';

@EntityRepository(Ticket)
export class TicketRepository extends Repository<Ticket> {
  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    const { title, description } = createTicketDto;

    const ticket = new Ticket();
    ticket.title = title;
    ticket.description = description;
    ticket.status = TicketStatus.OPEN;

    try {
      await ticket.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    return ticket;
  }
}
