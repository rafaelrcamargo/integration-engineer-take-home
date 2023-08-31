import {
  createContext,
  useContext,
  useState,
  useEffect,
  type FC,
  type PropsWithChildren,
} from "react";

import { Task } from "../types/task";
import { getTasks } from "../api";

type Context = { tasks: Task[]; setTasks: (tasks: Task[]) => void };
export const TasksContext = createContext<Context>({
  tasks: [],
  setTasks: () => {},
});

export const TasksProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then((tasks) => setTasks(tasks));
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => useContext(TasksContext);
