import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketRepository } from './tickets.repository';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';
@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository])],
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
