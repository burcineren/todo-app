import { IdLabelPair } from "../models/id-label-pair";

export enum TodoStatusEnum {
  TODO = 1,
  IN_PROGRESS = 2,
  DONE = 3
}

export const TodoStatusLookup: IdLabelPair<TodoStatusEnum>[] = [
  { id: TodoStatusEnum.TODO, label: 'BAŞLAMADIM' },
  { id: TodoStatusEnum.IN_PROGRESS, label: 'DEVAM EDİYOR' },
  { id: TodoStatusEnum.DONE, label: 'BİTTİ' }
];
