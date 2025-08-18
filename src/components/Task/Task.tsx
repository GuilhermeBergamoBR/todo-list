import "./Task.css";
import React, { useState, type FC } from "react";

type TaskComponent = {
  id: number;
  name: string;
  isCompleted: boolean;
  onToggle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: (id: number) => void;
};

const Task: FC<TaskComponent> = ({
  id,
  name,
  isCompleted,
  onToggle,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskName, setTaskName] = useState(name);

  const updateTaskName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  return (
    <div>
      <input
        id={`task-${id}`}
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
      />
      {isEditing ? (
        <input
          id={`task-${id}`}
          type="text"
          value={taskName}
          onChange={(e) => updateTaskName(e)}
        />
      ) : (
        <label htmlFor={`task-${id}`} className="completed-task">
          {name}
        </label>
      )}

      <button onClick={() => setIsEditing(true)}>Edit</button>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Task;
