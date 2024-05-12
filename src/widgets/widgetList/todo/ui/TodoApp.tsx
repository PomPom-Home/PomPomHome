import styled from 'styled-components';
import { useState } from 'react';
import TodoList from './TodoList';
import { TodoItemType } from '../model/TodoModel';

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoItemType[]>([]);
  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };
  const deleteTodo = (id: number): void => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const editTodo = (id: number, newText: string): void => {
    setTodos(
      todos.map(todo => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };
  const toggleComplete = (id: number): void => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <TodoWrapper>
      <NewTodoInputWrappper>
        <TodoInput
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="What's next?"
        />
        <CreateTodoButton className="notDraggable" onClick={addTodo}>
          +
        </CreateTodoButton>
      </NewTodoInputWrappper>
      <TodoListWrapper>
        {todos.map(todo => (
          <TodoList
            key={todo.id}
            todo={todo}
            onToggleComplete={toggleComplete}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        ))}
      </TodoListWrapper>
    </TodoWrapper>
  );
};

export default TodoApp;

const NewTodoInputWrappper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const TodoInput = styled.input`
  background: none;
  border: 1px solid white;
  border-radius: 5px;
  color: black;
  padding: 5px;
  margin-right: 10px;
  outline: none;
  width: 100%;
  height: 30px;
  font-size: 14px;
`;

const CreateTodoButton = styled.div`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 25px;
`;

const TodoListWrapper = styled.ul`
  list-style: none;
  padding-left: 0;
  overflow: auto;
`;

const TodoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;
