import { useEffect, useState } from "react";
import Task from "./components/Task/Task";
import NewTaskAlert from "./components/NewTaskAlert";

type Task = {
  id: number;
  name: string;
  done: boolean;
};

function App() {
  const [newTask, setNewTask] = useState<string>("");
  const [newTaskNotificationMessage, setNewTaskNotificationMessage] =
    useState(""); // novo hook para a mensagem do feedback visual temporário quando uma nova tarefa é criada
  const [tasks, setTasks] = useState<Task[]>(() => {
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
    setNewTaskNotificationMessage("New task created!"); //define mensagem do feeback visual
    setTimeout(() => {
      setNewTaskNotificationMessage(""); // remove a mensagem
    }, 2000); // depois de 2 segundos
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
  };

  const editTask = (id: number, newName: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, name: newName } : task))
    );
  };

  return (
    <>
      <h1>Todo List</h1>
      {tasks.length > 0 && (
        <p>
          {tasks.filter((task) => task.done).length} of {tasks.length} tasks
          completed
        </p>
      )}
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Type what you have to do"
      />
      <button onClick={addTask}>Add</button>

      <NewTaskAlert message={newTaskNotificationMessage} duration={2000} />

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
