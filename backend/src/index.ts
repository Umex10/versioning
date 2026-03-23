import express, { Request, Response } from 'express';
import fs from 'fs';
import cors from 'cors';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, '../data/tasks.json');

app.get("/tasks", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const tasks: string[] = JSON.parse(data);

  res.json(tasks);
})

app.listen(5000, () => {
  console.log("The server is running!");
});

app.post("/tasks", (req: Request, res: Response) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const tasks: string[] = JSON.parse(data);

  const { task } = req.body;

  if (!task) {
    return res.status(400).json({ error: "No task provided" });
  }

  tasks.push(task);

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");

  res.status(201).json({ message: "Task was created:", data: tasks })
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const { updatedTask } = req.body;

  const data = fs.readFileSync(filePath, "utf-8");
  const tasks: string[] = JSON.parse(data);

  tasks[Number(id)] = updatedTask;

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");

  res.status(200).json({ message: "Task was updated:", updatedTask })

})

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const id = req.params.id;

  const data = fs.readFileSync(filePath, "utf-8");
  const tasks: string[] = JSON.parse(data);

  tasks.splice(Number(id), 1);

  fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2), "utf-8");
  res.status(201).json({ message: "Task was deleted!", data: tasks })
})

