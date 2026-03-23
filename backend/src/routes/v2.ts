import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

interface Task {
  id: string,
  title: string,
  checked: boolean,
  createdAt: number
}

const router = Router();
const filePath = path.join(__dirname, '../../data/v2_tasks.json');


/**
 * Reads all tasks from the JSON file.
 * @returns {Task[]} Array of tasks
 */
const readTasks = (): Task[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
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
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: "No title provided" });
  }
  // Create new Task
  const newTask: Task = {
    id: Date.now().toString(),
    title: title,
    checked: false,
    createdAt: Date.now()
  }
  tasks.push(newTask);
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(201).json({ message: "Task was created:", data: tasks })
});



/**
 * Toggle the checked state of a task by id.
 */
router.put("/tasks/:id/check", (req: Request, res: Response) => {
  const tasks = readTasks();
  const id = req.params.id;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  // use the existing boolean and revert it
  task.checked = !task.checked;
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(200).json({ message: "Task was created:", data: tasks })
});


/**
 * Update the title of a task by id.
 */
router.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const { newTaskTitle } = req.body;
  if (!newTaskTitle) {
    return res.status(400).json({ error: "No new title provided" });
  }
  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  task.title = newTaskTitle;
  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(200).json({ message: "Task was updated:", data: tasks })
});


/**
 * Delete a task by id.
 */
router.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const tasks = readTasks();
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  const updatedTasks = tasks.filter(t => t.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updatedTasks, null, 2), "utf-8");
  res.status(201).json({ message: "Task was deleted!", data: updatedTasks })
});

export default router;