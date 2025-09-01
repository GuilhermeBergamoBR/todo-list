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
  clearMessage: () => void;
};

export type TaskFormProps = {
  errorMessage: string;
  addTask: (newTask: string) => void;
  clearError: () => void;
};
