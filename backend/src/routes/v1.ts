import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const filePath = path.join(__dirname, '../../data/v1_tasks.json');

// This function helps us to read the file more conveniently.
const readTasks = (): string[] => {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

router.get("/tasks", (req: Request, res: Response) => {
  const tasks = readTasks();

  res.json(tasks);
})

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

router.put("/tasks/:index", (req: Request, res: Response) => {
  const index = req.params.index;

  const { newTaskName } = req.body;

  if (!newTaskName) {
    return res.status(400).json({ error: "No task provided" });
  }

  const tasks = readTasks();

  tasks[Number(index)] = newTaskName;

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(200).json({ message: "Task was updated:", data: tasks })

});

router.delete("/tasks/:index", (req: Request, res: Response) => {
  const index = req.params.index;

  const tasks = readTasks();

  // Search for the "index" and only delete one
  tasks.splice(Number(index), 1);

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(201).json({ message: "Task was deleted!", data: tasks })
});

export default router;