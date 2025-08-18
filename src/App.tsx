import { useEffect, useState } from "react";
import Task from "./components/Task/Task";

type Task = {
  id: number;
  name: string;
  completed: boolean;
};

function App() {
  const [taskName, setTaskName] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);

  useEffect(() => {
    const tasks: string | null = localStorage.getItem("tasks");
    if (tasks) {
      setTaskList(JSON.parse(tasks));
    }
  }, []);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const addTask = () => {
    if (taskName) {
      const taskId = Math.random();
      const newTask = { id: taskId, name: taskName, completed: false };
      const updatedTaskList = [...taskList, newTask];

      setTaskList(updatedTaskList);
      localStorage.setItem("tasks", JSON.stringify(updatedTaskList));
      setTaskName("");
    }
  };

  const handleToggleCompleted = (target: number, value: boolean) => {
    const updatedTasks = taskList.map((item) =>
      item.id === target ? { ...item, completed: value } : item
    );

    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleRemoveTask = (target: number) => {
    const updatedTasks = taskList.filter((task) => task.id !== target);
    setTaskList(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        value={taskName}
        onChange={handleNameChange}
        placeholder="Type what you have to do"
      />
      <button onClick={addTask}>Add</button>

      {taskList.map((task) => (
        <Task
          id={task.id}
          name={task.name}
          isCompleted={task.completed}
          onToggle={(e)=> handleToggleCompleted(task.id, e.target.checked)}
          onDelete={() => handleRemoveTask(task.id)}
        />
      ))}
    </>
  );
}

export default App;
