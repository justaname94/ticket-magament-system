import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TicketsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
