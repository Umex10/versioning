import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { readJsonFile } from '../utils';

const router = Router();
const filePath = path.join(__dirname, '../../data/v1_tasks.json');


/**
 * Reads all tasks from the JSON file.
 * @returns {string[]} Array of tasks
 */
const readTasks = (): string[] => {
  return readJsonFile<string>(filePath);
};


/**
 * Get all tasks.
 */
router.get("/tasks", (req: Request, res: Response) => {
  const tasks = readTasks();
  res.json(tasks);
})


/**
 * Create a new task.
 */
router.post("/tasks", (req: Request, res: Response) => {
  const tasks = readTasks();
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "No task provided" });
  }
  tasks.push(task);
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(201).json({ message: "Task was created:", data: tasks })
});


/**
 * Update a task by index.
 */
router.put("/tasks/:index", (req: Request, res: Response) => {
  const index = Number(req.params.index);
  const { newTaskName } = req.body;
  if (!newTaskName) {
    return res.status(400).json({ error: "No task provided" });
  }
  const tasks = readTasks();
  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks[index] = newTaskName;
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(200).json({ message: "Task was updated:", data: tasks })
});


/**
 * Delete a task by index.
 */
router.delete("/tasks/:index", (req: Request, res: Response) => {
  const index = Number(req.params.index);
  const tasks = readTasks();
  if (index < 0 || index >= tasks.length) {
    return res.status(404).json({ error: "Task not found" });
  }
  // Remove one task at the given index
  tasks.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(200).json({ message: "Task was deleted!", data: tasks })
});

export default router;