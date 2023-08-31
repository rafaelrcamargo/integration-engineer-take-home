// ? This is a local collection of utility functions, meant to be used within the /tasks route.

import { Task } from "../types/task";
import crypto from "crypto";

/**
 * Create a new task.
 * - This function will create a new task, with a unique ID and a timestamp.
 * - The task parameter will overwrite the default values.
 * @param task Task
 * @returns Task
 */

export const toTask = (task: Partial<Task>): Task => ({
  id: task?.id || crypto.randomUUID(),
  timestamp: task?.timestamp || new Date().getTime(),
  completed: task?.completed || false,
  description: task.description || "",
  title: task.title || "",
});
