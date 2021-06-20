import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'
import { TaskStatus } from '../task.model'
export class GetTaskFilterDto {
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    @IsOptional()
    status:string

    @IsOptional()
    @IsNotEmpty()
    search:string  // searching string
}