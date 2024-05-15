import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import { TodoItemType } from '../../widgets/widgetList/todo/model/TodoModel';

type TodoStore = {
  todos: TodoItemType[];
  addTodo: (text: string) => void;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newText: string) => void;
};

export const useTodoStore = create<TodoStore>()(
  devtools(
    persist(
      immer(set => ({
        todos: [],
        addTodo: (text: string) =>
          set(state => {
            const newTodo = {
              id: Date.now(),
              text,
              completed: false,
            };
            return { todos: [...state.todos, newTodo] };
          }),
        toggleComplete: (id: number) =>
          set(state => ({
            todos: state.todos.map(todo =>
              todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
          })),
        deleteTodo: (id: number) =>
          set(state => ({
            todos: state.todos.filter(todo => todo.id !== id),
          })),
        editTodo: (id: number, newText: string) =>
          set(state => ({
            todos: state.todos.map(todo =>
              todo.id === id ? { ...todo, text: newText } : todo
            ),
          })),
      })),
      {
        name: 'todoStorage',
      }
    )
  )
);
