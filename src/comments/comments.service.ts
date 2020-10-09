import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { TicketsService } from '../tickets/tickets/tickets.service';
import { CommentRepository } from './comments.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './comments.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
    private ticketsService: TicketsService,
  ) {}

  async createCommentDto(
    createCommentDto: CreateCommentDto,
    ticketId: number,
    user: User,
  ): Promise<Comment> {
    const ticket = await this.ticketsService.getTicketById(ticketId, user);
    return await this.commentRepository.createComment(
      createCommentDto,
      ticket,
      user,
    );
  }
}
