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
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guards';
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
  ): Promise<Ticket> {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Get('/all')
  @Roles('admin')
  @UseGuards(new RolesGuard(new Reflector()))
  getAllTickets(@GetUser() user: User) {}
}
