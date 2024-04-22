
import React from 'react';
import { Button } from 'antd';

interface Todo {
  id: string;
  task: string;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: () => void;
  onEdit: (newTask: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedTask, setEditedTask] = React.useState(todo.task);

  const handleSave = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  return (
    <div style={{ marginBottom: '8px' }}> {}
      {isEditing ? (
        <div style={{ marginBottom: '8px' }}> {}
          <input
            type="text"
            value={editedTask}
            onChange={(e) => setEditedTask(e.target.value)}
          />
          <Button type="default" onClick={handleSave} style={{ marginLeft: '8px' }}>Save</Button> {}
        </div>
      ) : (
        <div style={{ marginBottom: '8px' }}> {}
          <span>{todo.task}</span>
          <Button type="default" onClick={() => setIsEditing(true)} style={{ marginLeft: '8px' }}>Edit</Button> {}
          <Button type="default" onClick={onDelete} style={{ marginLeft: '8px' }}>Delete</Button> {}
        </div>
      )}
    </div>
  );
};

export default TodoItem;
