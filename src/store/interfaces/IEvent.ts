export default interface IEvent {
  id: number;
  title: string;
  description?: string;
  meetLink?: string;
  location?: string;
  startDate: string | Date;
  endDate: string | Date;
  userId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}