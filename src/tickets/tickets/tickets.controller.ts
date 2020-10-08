import { Body, Controller, Post } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../tickets.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  createTicket(@Body() createTicketDto: CreateTicketDto): Promise<Ticket> {
    return this.ticketsService.createTicket(createTicketDto);
  }
}
