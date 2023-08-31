import { Task } from "../types/task";
import { toast } from "sonner";

export const getTasks = async () => {
  const response = await fetch(`http://localhost:8000/v1/tasks`);
  return response.json() as Promise<Task[]>;
};

export const createTask = async (task: Partial<Task>) => {
  const response = await fetch(`http://localhost:8000/v1/tasks`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
    method: "POST",
  });

  const data = await response.json();

  if (response.status >= 400) {
    console.log(data);
    toast.error("Failed to create task.", {
      description: `Missing fields: ${data.params.join()}`,
    });

    return null;
  }

  return data as Task[];
};

export const updateTask = async (task: Partial<Task>) => {
  const response = await fetch(`http://localhost:8000/v1/tasks/${task.id}`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
    method: "PUT",
  });

  if (response.status >= 400) {
    toast.error("Failed to update task.");
    return null;
  }

  return response.json() as Promise<Task[]>;
};

export const deleteTask = async (id: string) => {
  const response = await fetch(`http://localhost:8000/v1/tasks/${id}`, {
    method: "DELETE",
  });

  if (response.status >= 400) {
    toast.error("Failed to delete task.");
    return null;
  }

  toast.success("Task deleted.");
  return response.json() as Promise<Task[]>;
};
