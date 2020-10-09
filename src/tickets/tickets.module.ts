import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TicketRepository } from './tickets.repository';
import { TicketsController } from './tickets/tickets.controller';
import { TicketsService } from './tickets/tickets.service';

@Module({
  imports: [TypeOrmModule.forFeature([TicketRepository]), AuthModule],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
