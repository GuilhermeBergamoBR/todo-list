export type Task = {
  id: number;
  name: string;
  done: boolean;
};

export type DoneTasksCounterProps = {
  tasks: Task[];
};

export type ErrorMessageProps = {
  text: string;
  duration?: number;
  clearMessage: ()=> void;
};
