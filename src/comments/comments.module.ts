import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { TicketsModule } from '../tickets/tickets.module';
import { CommentsController } from './comments.controller';
import { CommentRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentRepository]),
    TicketsModule,
    AuthModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
