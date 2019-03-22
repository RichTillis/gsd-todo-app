export interface Todo {
  id: string;
  title: string;
  details: string;
  isCompleted: boolean;
  createdAt: string;
  completedAt: string;
  categoryId?: string;
  categoryName?: string;
  categoryColorName?: string;
  categoryColorCode?: string;
  isPriority?: boolean;
}
