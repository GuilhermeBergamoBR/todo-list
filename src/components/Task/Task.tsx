import "./Task.css";
import { useState } from "react";

type TaskProps = {
  task: { id: number; name: string; done: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newmName: string) => void;
};

const Task = ({ task, onToggle, onDelete, onEdit }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleSave = () => {
    if (newName.trim()) {
      onEdit(task.id, newName);
      setIsEditing(false);
    }
  };

  return (
    <div>
      <input
        id={`task-${task.id}`}
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      {isEditing ? (
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      ) : (
        <label htmlFor={`task-${task.id}`} className="completed-task">
          {task.name}
        </label>
      )}

      <div>
        {isEditing ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <button disabled={false} onClick={()=> setIsEditing(true)}>
              Edit
            </button>
            <button onClick={() => onDelete(task.id)}>Delete</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
