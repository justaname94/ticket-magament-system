import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TicketStatus } from '../ticket-status.enum';

export class TicketStatusValidation implements PipeTransform {
  readonly allowedStatus = [
    TicketStatus.OPEN,
    TicketStatus.IN_PROGRESS,
    TicketStatus.CLOSED,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid ticket status`);
    }

    return value;
  }

  private isStatusValid(status: any): boolean {
    return this.allowedStatus.includes(status);
  }
}
