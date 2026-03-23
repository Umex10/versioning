import { useEffect, useState } from 'react'

export const useV1Hooks = () => {
  const [v1Taskname, setV1TaskName] = useState("");
  const [v1Tasklist, setV1TaskList] = useState<string[]>([]);
  const v1BaseURL = "http://localhost:5000/api/v1/tasks";

  useEffect(() => {

    const getTasks = async () => {
      try {
        const res = await fetch(v1BaseURL);
        if (!res.ok) throw new Error("Error while loading the initial tasks");

        const data = await res.json();

        setV1TaskList(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTasks();
  }, []);

  const v1Create = async () => {

    if (v1Taskname.trim().length <= 3) {
      alert("We need at least 3 characters for the creation of a task!");
      return;
    }

    try {
      const res = await fetch(v1BaseURL, {
        method: "POST",
        body: JSON.stringify({ task: v1Taskname }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error while creating new task!");
      }

      const dataJson = await res.json();

      setV1TaskList(dataJson.data);
      setV1TaskName("");
    } catch (error) {
      console.error(error);
    }
  }

  const v1Delete = async (taskIndexToDelete: number) => {
    try {
      const res = await fetch(`${v1BaseURL}/${taskIndexToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Error while deleting the task!");
      }

      const dataJson = await res.json();

      setV1TaskList(dataJson.data);
      setV1TaskName("");
    } catch (error) {
      console.error(error);
    }
  }

  const v1Update = async (taskIndexToUpdate: number) => {

    const newTaskName = prompt("Enter new task name:");

    try {
      const res = await fetch(`${v1BaseURL}/${taskIndexToUpdate}`, {
        method: "PUT",
        body: JSON.stringify({ newTaskName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Error while updating the task!");
      }

      const dataJson = await res.json();

      setV1TaskList(dataJson.data);
      setV1TaskName("");
    } catch (error) {
      console.error(error);
    }
  }

  return {v1Create, v1Delete, v1Update, v1Taskname, v1Tasklist, setV1TaskName}
}