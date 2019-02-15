export interface Todo {
  id: string;
  group?: string;
  title: string;
  details: string;
  isCompleted: boolean;
  createdAt: string;
  completedAt: string;
}
