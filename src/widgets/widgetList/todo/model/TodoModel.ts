export type TodoItemType = {
  id: number;
  text: string;
  completed: boolean;
};

export type TodoListProps = {
  todo: TodoItemType;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
};
