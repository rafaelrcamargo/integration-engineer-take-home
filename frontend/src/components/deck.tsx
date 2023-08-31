import { deleteTask, updateTask } from "../api";
import { Task } from "../types/task";
import { Item } from "./item"

type Props = {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
};

export const Deck = ({ tasks, setTasks }: Props) => {
  const deleteAndSetTasks = ({ id }: Partial<Task>) =>
    deleteTask(id!).then((tasks) => tasks && setTasks(tasks));

  const toggleAndSetTasks = ({ id, completed }: Partial<Task>) =>
    updateTask({ id, completed: !completed }).then(
      (tasks) => tasks && setTasks(tasks),
    );

  return (
    <div className="flex flex-col gap-2">
      {tasks?.map((task) => (
        <Item
          key={task.id}
          task={task}
          toggle={toggleAndSetTasks}
          deleteTask={deleteAndSetTasks}
        />
      ))}
    </div>
  );
};
