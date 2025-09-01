import { useState } from "react";
import type { TaskFormProps } from "../../types";
import { Plus } from "lucide-react";

const TaskForm = ({ errorMessage, clearError, addTask }: TaskFormProps) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = () => {
    addTask(newTask);
    setNewTask("");
  };

  return (
    <div className="flex flex-row justify-center gap-1 mb-2">
      <input
        type="text"
        value={newTask}
        onChange={(e) => {
          const text = e.target.value;
          setNewTask(text.charAt(0).toUpperCase() + text.slice(1));
          if (errorMessage) clearError();
        }}
        placeholder="Type what you have to do"
        onKeyDown={(event) => (event.key == "Enter" ? handleAddTask() : null)}
        className="w-full p-2 bg-white border border-gray-300 rounded outline-none"
      />
      <button
        className="p-2 text-white bg-[#275e9c] rounded cursor-pointer border-0"
        onClick={handleAddTask}
      >
        <Plus color="white" size={16} />
      </button>
    </div>
  );
};

export default TaskForm;
