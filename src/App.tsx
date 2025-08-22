import { useEffect, useState } from "react";
import Task from "./components/Task/Task";
import ActionFeedback from "./components/ActionFeedback";
import type { Task as TaskType } from "./types";
import DoneTasksCounter from "./components/DoneTasksCounter/DoneTasksCounter";

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [actionMessage, setActionMessage] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), name: newTask, done: false }]);
    setNewTask("");
    setActionMessage("New task created!"); //define mensagem do feeback visual
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setActionMessage("Task deleted!");
  };

  const editTask = (id: number, newName: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, name: newName } : task))
    );
    setActionMessage("Task updated!");
  };

  return (
    <>
      <h1>Todo List</h1>
      <DoneTasksCounter tasks={tasks} />
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Type what you have to do"
      />
      <button onClick={addTask}>Add</button>

      <ActionFeedback
        message={actionMessage}
        clearMessage={() => setActionMessage("")}
        duration={2000}
      />

      <ul>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        ))}
      </ul>
    </>
  );
}

export default App;
