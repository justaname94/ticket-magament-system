import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import { typeOrmConfig } from './config/typeorm.config';
import { TicketsModule } from './tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TicketsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
