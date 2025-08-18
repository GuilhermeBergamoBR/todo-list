import "./App.css";
import { useEffect, useState } from "react";

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

  const toggleCompleted = (target: number, value: boolean) => {
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

      <ul>
        {taskList.map((task) => (
          <li className="task" key={task.id}>
            <input
              id={`task-${task.id}`}
              type="checkbox"
              checked={task.completed}
              onChange={(e) => toggleCompleted(task.id, e.target.checked)}
            />
            <label htmlFor={`task-${task.id}`} className="completed-task">
              {task.name}
            </label>
            <button onClick={() => handleRemoveTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
