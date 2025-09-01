import { useEffect, useState } from "react";
import Task from "./components/Task/Task";
import ActionFeedback from "./components/ActionFeedback";
import type { Task as TaskType } from "./types";
import DoneTasksCounter from "./components/DoneTasksCounter/DoneTasksCounter";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { TaskList } from "./components/TaskList/TaskList";
import "./App.css";
import Header from "./components/Header/Header";
import TaskForm from "./components/TaskForm/TaskForm";

function App() {
  const [actionMessage, setActionMessage] = useState("");
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask: string) => {
    const alreadyExists = tasks.find(
      (task) => task.name.toLowerCase() === newTask.toLowerCase()
    );

    if (!newTask.trim()) {
      setErrorMessage("Fill in the name of the task.");
    } else if (alreadyExists) {
      setErrorMessage("A task with that name already exists");
    } else {
      setTasks([...tasks, { id: Date.now(), name: newTask, done: false }]);
      setActionMessage("New task created!"); //define mensagem do feeback visual
    }
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

  const deleteAllCompleted = () => {
    setTasks(tasks.filter((task) => !task.done));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Header />
      <div className="m-8 p-8 w-160 min-w self-center">
        <TaskForm
          addTask={(newTaskName: string) => addTask(newTaskName)}
          errorMessage={errorMessage}
          clearError={() => setErrorMessage("")}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <DoneTasksCounter tasks={tasks} />
          <div>
            {tasks.filter((task) => task?.done).length > 1 && (
              <button
                style={{
                  color: "white",
                  backgroundColor: "#cd2f40",
                  padding: 8,
                  border: "none",
                  borderRadius: 4,
                  cursor: 'pointer'
                }}
                onClick={deleteAllCompleted}
              >
                Delete all completed
              </button>
            )}
          </div>
        </div>

        <ErrorMessage
          text={errorMessage}
          clearMessage={() => setErrorMessage("")}
        />
        <ActionFeedback
          message={actionMessage}
          clearMessage={() => setActionMessage("")}
          duration={2000}
        />
        <TaskList items={tasks} setItems={setTasks} getId={(task) => task.id}>
          {(task) => (
            <Task
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          )}
        </TaskList>
      </div>
    </div>
  );
}

export default App;
