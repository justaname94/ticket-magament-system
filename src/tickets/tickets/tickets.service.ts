import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../tickets.entity';
import { TicketRepository } from '../tickets.repository';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(TicketRepository)
    private ticketRepository: TicketRepository,
  ) {}

  async createTicket(createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketRepository.createTicket(createTicketDto);
  }
}
