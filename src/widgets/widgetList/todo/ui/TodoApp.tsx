import styled from 'styled-components';
import { useState } from 'react';
import TodoList from './TodoList';
import { useTodoStore } from '../../../../shared/stores/todoStore';
import { CiSquarePlus } from 'react-icons/ci';

const TodoApp = () => {
  const [newTodo, setNewTodo] = useState<string>('');
  const { todos, addTodo, deleteTodo, toggleComplete, editTodo } =
    useTodoStore();
  const handleAddTodo = () => {
    if (newTodo.trim()) {
      addTodo(newTodo);
      setNewTodo('');
    }
  };

  return (
    <TodoWrapper>
      <NewTodoInputWrappper>
        <TodoInput
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
          //onKeyDown={e => e.key === 'Enter' && handleAddTodo()} fixme: Enter key event로 투두 추가하면 에러있어서 임시로 주석처리
          placeholder="Plan your day..."
        />
        <CreateTodoButton className="notDraggable" onClick={handleAddTodo}>
          <CiSquarePlus size="35px" />
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
  outline: none;
  width: 100%;
  font-size: 14px;
`;

const CreateTodoButton = styled.div`
  display: flex;
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
