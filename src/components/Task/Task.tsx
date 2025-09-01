import "./Task.css";
import { useState } from "react";
import { Pencil, Trash, Save, Ban } from "lucide-react";

type TaskProps = {
  task: { id: number; name: string; done: boolean };
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newmName: string) => void;
};

const Task = ({ task, onToggle, onDelete, onEdit }: TaskProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleEdit = () => {
    setIsEditing(true);
    setNewName(task.name);
  };

  const handleSave = () => {
    if (newName.trim()) {
      onEdit(task.id, newName);
      setIsEditing(false);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center mb-2 p-2 w-full border border-gray-300 rounded">
      <div>
        <input
          id={`task-${task.id}`}
          type="checkbox"
          checked={task.done}
          onChange={() => onToggle(task.id)}
        />
        {isEditing ? (
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus={isEditing}
          />
        ) : (
          <label htmlFor={`task-${task.id}`} className="completed-task">
            {task.name}
          </label>
        )}
      </div>

      <div>
        {isEditing ? (
          <div className="flex flex-row gap-1">
            <button
              className="p-2 text-white bg-[#3e9d80] border border-gray-300 rounded cursor-pointer"
              onClick={handleSave}
            >
              <Save color="white" size={12} />
            </button>
            <button
              className="p-2 text-white bg-gray-300 border border-gray-300 rounded cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              <Ban color="white" size={12} />
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
            <button
              className="p-2 text-white bg-[#a8963f] border border-gray-300 rounded cursor-pointer"
              disabled={false}
              onClick={handleEdit}
            >
              <Pencil color="white" size={12} />
            </button>
            <button
              className="p-2 text-white bg-[#cd2f40] border border-gray-300 rounded cursor-pointer"
              onClick={() => onDelete(task.id)}
            >
              <Trash color="white" size={12} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
