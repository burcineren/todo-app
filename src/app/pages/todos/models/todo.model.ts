import { TodoStatusEnum } from "../../../core/enums/todo-status.enum";

export class TodoModel {
  id!: number;
  title!: string;
  content!: string;
  creationDate!: Date;
  endDate!: Date;
  status!: TodoStatusEnum;
}
