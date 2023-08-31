import { deleteTask, updateTask } from "../api"
import { useTasks } from "../providers/tasks"
import { Task } from "../types/task"
import { Item } from "./item"

export const Deck = () => {
  const { tasks, setTasks } = useTasks()

  const deleteAndSetTasks = ({ id }: Partial<Task>) =>
    deleteTask(id!).then(tasks => tasks && setTasks(tasks))

  const toggleAndSetTasks = ({ id, completed }: Partial<Task>) =>
    updateTask({ id, completed: !completed }).then(
      tasks => tasks && setTasks(tasks),
    )

  return (
    <div className="flex flex-col gap-2">
      {tasks?.map(task => (
        <Item
          task={task}
          key={task.id}
          toggle={toggleAndSetTasks}
          deleteTask={deleteAndSetTasks}
        />
      ))}
    </div>
  )
}
