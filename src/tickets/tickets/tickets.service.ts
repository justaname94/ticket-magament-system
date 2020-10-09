import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../auth/user.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../tickets.entity';
import { TicketRepository } from '../tickets.repository';

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
}
