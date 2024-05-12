import { useState } from 'react';
import styled from 'styled-components';
import { TodoListProps } from '../model/TodoModel';
import { IoClose } from 'react-icons/io5';

const TodoList: React.FC<TodoListProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <ListItem>
      <Checkbox
        className="notDraggable"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
      />
      {isEditing ? (
        <Input
          className="notDraggable"
          value={editText}
          onChange={e => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={e => e.key === 'Enter' && handleEdit()}
          autoFocus
        />
      ) : (
        <EditableText
          className={`${todo.completed ? 'completed' : ''} notDraggable`}
          onClick={() => setIsEditing(true)}>
          {todo.text}
        </EditableText>
      )}
      <Button className="notDraggable" onClick={() => onDelete(todo.id)}>
        <IoClose size="19px" />
      </Button>
    </ListItem>
  );
};

export default TodoList;
const ListItem = styled.li`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  color: gray;
  font-size: 14px;
`;
const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  margin-right: 10px;
  accent-color: white;
`;
const EditableText = styled.span`
  flex-grow: 1;
  margin-right: 10px;
  &.completed {
    text-decoration: line-through;
  }
`;
const Button = styled.div`
  margin-right: 3px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 25px;
`;
const Input = styled.input`
  background: none;
  border: 1px solid white;
  //border: none;
  border-radius: 5px;
  color: black;
  padding: 5px;
  margin-right: 10px;
  outline: none;
  width: 100%;
  height: 20px;
  font-size: 14px;
`;
