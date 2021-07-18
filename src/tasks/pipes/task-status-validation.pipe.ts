import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowesStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  private isStatusvalid(status) {
    const indx = this.allowesStatuses.indexOf(status);
    return indx !== -1;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if (!this.isStatusvalid(value)) {
      throw new BadRequestException('Invaliid provided status');
    }
    return value;
  }
}
