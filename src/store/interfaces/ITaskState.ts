import type ITask from "./ITask";

export default interface ITaskState {
  tasks: ITask[];
  setTasks: (tasks: ITask[]) => void;

  //Local-first
  addTaskLocal: (tasks: ITask) => void;
  updateTaskLocal: (id: number, data: Partial<ITask>) => void;
  removeTaskLocal: (id: number) => void;
  loadFromLocal: () => void;
  saveToLocal: () => void;

  //API-first
  addTaskToServer: (taskData: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => Promise<{ success: boolean }>;
  updateTaskOnServer: (id: number, data: Partial<ITask>) => Promise<{ success: boolean }>;
  removeTaskFromServer: (id: number) => Promise<{ success: boolean }>;

  //Sync
  syncToServer: (userId: number) => Promise<{ success: boolean }>;
}

