import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { Ticket } from '../tickets/tickets.entity';
import { Comment } from './comments.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    createCommentDto: CreateCommentDto,
    ticket: Ticket,
    user: User,
  ): Promise<Comment> {
    const { body } = createCommentDto;

    const comment = new Comment();
    comment.body = body;
    comment.ticket = ticket;
    comment.user = user;

    try {
      await comment.save();
    } catch (error) {
      throw new InternalServerErrorException();
    }

    delete comment.user;
    delete comment.userId;
    delete comment.ticket.comments;

    return comment;
  }
}
