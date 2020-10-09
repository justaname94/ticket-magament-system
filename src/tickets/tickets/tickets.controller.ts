import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { AdminGuard } from '../../auth/admin.guards';
import { User } from '../../auth/user.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../tickets.entity';
import { TicketsService } from './tickets.service';

@Controller('tickets')
@UseGuards(AuthGuard())
export class TicketsController {
  constructor(private ticketsService: TicketsService) {}

  @Post()
  createTicket(
    @Body(ValidationPipe) createTicketDto: CreateTicketDto,
    @GetUser() user: User,
  ): Promise<Ticket> {
    return this.ticketsService.createTicket(createTicketDto, user);
  }

  @Get()
  getUserTickets(@GetUser() user: User) {
    return this.ticketsService.getTickets(user);
  }

  @Get('/all')
  @UseGuards(new AdminGuard())
  getAllTickets(): Promise<Ticket[]> {
    return this.ticketsService.getTickets(undefined, true);
  }
}
