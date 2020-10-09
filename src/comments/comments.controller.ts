import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('tickets')
@UseGuards(AuthGuard())
export class CommentsController {
  constructor(private commentService: CommentsService) {}

  @Post('/:ticketId/comment')
  commentOnTicket(
    @Param('ticketId', ParseIntPipe) ticketId: number,
    @Body(ValidationPipe) createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentService.createCommentDto(
      createCommentDto,
      ticketId,
      user,
    );
  }
}
