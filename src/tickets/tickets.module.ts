import { Module } from '@nestjs/common';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService]
})
export class TicketsModule {}
