export type TTaskStatus = 'onHold' | 'inProgress' | 'finished';

export default interface ITask {
  id: number;
  title: string;
  description?: string;
  status: TTaskStatus;
  startDate: string;
  endDate: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}