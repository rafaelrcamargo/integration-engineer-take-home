import { Router } from "express";

import type { Task } from "../types/task";
import { isEmpty } from "../utils";
import { toTask } from "./utils";

const router = Router();

const tasks: { [key: string]: Task } = {
  "0": {
    id: "0",
    completed: false,
    title: "Sample task!",
    description: "That's a sample task, feel free to delete it!",
    timestamp: new Date().getTime(),
  }
};

const morph = (tasks: { [key: string]: Task }) =>
  Object.values(tasks); /* .sort((a, b) => b.timestamp - a.timestamp) */

router.get("/", (_, res) =>
  /**
   * Return all tasks.
   * - Here we morph the object into an array and sort it,
   * so we can serve it to the client in order.
   */

  res.json(morph(tasks)),
);

router.post("/", (req, res) => {
  const { title, description } = req.body;

  /**
   * ! Error handling.
   * - If the title or description is empty, we return a 400 error.
   * - We also return the missing parameters, so the client can know what went wrong.
   */

  const { hasEmpty, params } = isEmpty({ title, description });

  if (hasEmpty)
    return res
      .status(400)
      .json({ error: "Required parameters are missing.", params });

  /**
   * With the error handling out of the way, we can create the task.
   * - We add a timestamp, so we can sort the tasks by the last created/edited.
   */

  const task = toTask({ title, description });

  tasks[task.id] = task;
  return res.json(morph(tasks));
});

router.put("/:id", (req, res) => {
  const { title, description, completed } = req.body;
  const { id } = req.params;

  /**
   * With the error handling out of the way, we can update the task.
   * - We update the timestamp, so we can sort the tasks by the last created/edited.
   * - We also check if the task exists, and return a 404 error if it doesn't.
   */

  const oldTask = tasks[id];
  if (!oldTask) return res.status(404).json({ error: "Task not found." });

  const newTask = toTask({
    id: id,
    title: title || oldTask.title,
    description: description || oldTask.description,
    completed: completed ?? oldTask.completed,
  });

  tasks[newTask.id] = newTask;
  return res.json(morph(tasks));
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  /**
   * ! Error handling.
   * - We check if the task exists, and return a 404 error if it doesn't.
   */

  const task = tasks[id];

  if (!task) return res.status(404).json({ error: "Task not found." });

  /**
   * With the error handling out of the way, we can delete the task.
   */

  delete tasks[id];
  return res.json(morph(tasks));
});

export default router;
