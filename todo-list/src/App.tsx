import { useState } from "react";

function App() {
  const [taskName, setTaskName] = useState<string>();
  const [taskList, setTaskList] = useState<string[]>([]);

  const handleNameChange = (e) => setTaskName(e.target.value);

  const addTask = () => {
    if (taskName) {
      setTaskList([...taskList, taskName]);
      setTaskName("");
    }
  };

  const handleRemoveTask = (target: string)=> {
    setTaskList(taskList.filter(task => task !== target ))
  }

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

      <ol>
        {taskList.map((task) => (
          <div>
            <li>{task}</li>
            <button onClick={()=>handleRemoveTask(task)}>Delete</button>
          </div>
        ))}
      </ol>
    </>
  );
}

export default App;
