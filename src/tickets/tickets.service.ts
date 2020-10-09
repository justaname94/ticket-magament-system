import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketStatus } from './ticket-status.enum';
import { Ticket } from './tickets.entity';
import { TicketRepository } from './tickets.repository';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
  ) {}

  async createTicket(
    createTicketDto: CreateTicketDto,
    user: User,
  ): Promise<Ticket> {
    return this.ticketRepository.createTicket(createTicketDto, user);
  }

  async getTickets(user?: User, all: boolean = false): Promise<Ticket[]> {
    return this.ticketRepository.getTickets(user, all);
  }

  async getTicketById(id: number, user: User): Promise<Ticket> {
    const ticket = await this.ticketRepository.findOne({ id });

    if (!ticket) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    if (ticket.userId !== user.id && !user.isAdmin) {
      throw new ForbiddenException();
    }
    delete ticket.userId;

    return ticket;
  }

  async updateTicketStatus(
    id: number,
    status: TicketStatus,
    user: User,
  ): Promise<Ticket> {
    const ticket = await this.getTicketById(id, user);
    ticket.status = status;
    await ticket.save();

    return ticket;
  }
}
