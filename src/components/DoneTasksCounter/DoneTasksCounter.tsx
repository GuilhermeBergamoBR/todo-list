import type { DoneTasksCounterProps } from "../../types";

const DoneTasksCounter = ({ tasks }: DoneTasksCounterProps) => {
  const completed = tasks.filter((task) => task.done).length;
  const pendent = tasks.filter((task) => !task.done).length;

  return (
    tasks.length > 1 && (
      <div>
        <span>{completed} tasks are done.</span>
        <br></br>
        <span>{pendent} tasks are pendent.</span>
      </div>
    )
  );
};

export default DoneTasksCounter;
