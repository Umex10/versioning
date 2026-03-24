import { useEffect, useState } from 'react'

interface Task {
  id: string,
  title: string,
  checked: boolean,
  createdAt: number
}

/**
 * Custom React hook for managing V2 tasks (CRUD and check operations).
 * @returns {object} V2 task handlers and state
 */
export const useV2Hooks = () => {
  const [v2Taskname, setV2TaskName] = useState("");
  const [v2Tasklist, setV2TaskList] = useState<Task[]>([]);
  const v2BaseURL = "http://localhost:5000/api/v2/tasks";


  useEffect(() => {
    /**
     * Fetch all tasks from the backend on mount.
     */
    const getTasks = async () => {
      try {
        const res = await fetch(v2BaseURL);
        if (!res.ok) throw new Error("Error while loading the initial tasks");
        const data = await res.json();
        setV2TaskList(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTasks();
  }, []);


  /**
   * Create a new task and update the list.
   */
  const v2Create = async () => {
    if (v2Taskname.trim().length <= 3) {
      alert("We need at least 3 characters for the creation of a task!")
      return;
    }
    try {
      const res = await fetch(v2BaseURL, {
        method: "POST",
        body: JSON.stringify({ title: v2Taskname }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error while creating new task!");
      }
      const dataJson = await res.json();
      setV2TaskList(dataJson.data);
      setV2TaskName("");
    } catch (error) {
      console.error(error);
    }
  }


  /**
   * Delete a task by id and update the list.
   * @param {string} taskIdToDelete
   */
  const v2Delete = async (taskIdToDelete: string) => {
    try {
      const res = await fetch(`${v2BaseURL}/${taskIdToDelete}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Error while deleting the task!");
      }
      const dataJson = await res.json();
      setV2TaskList(dataJson.data);
      setV2TaskName("");
    } catch (error) {
      console.error(error);
    }
  }


  /**
   * Update a task by id and update the list.
   * @param {string} taskIdToUpdate
   */
  const v2Update = async (taskIdToUpdate: string) => {
    const newTaskTitle = prompt("Enter new task name:");

    if (newTaskTitle && newTaskTitle.trim().length <= 3) {
      alert("We need at least 3 characters for the creation of a task!")
      return;
    }
    try {
      const res = await fetch(`${v2BaseURL}/${taskIdToUpdate}`, {
        method: "PUT",
        body: JSON.stringify({ newTaskTitle: newTaskTitle }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Error while updating the task!");
      }
      const dataJson = await res.json();
      setV2TaskList(dataJson.data);
      setV2TaskName("");
    } catch (error) {
      console.error(error);
    }
  }



  /**
   * Toggle the checked state of a task by id and update the list.
   * @param {string} taskIndexToCheck
   */
  const v2Check = async (taskIndexToCheck: string) => {
     try {
      const res = await fetch(`${v2BaseURL}/${taskIndexToCheck}/check`, {
        method: "PUT",
      });
      if (!res.ok) {
        throw new Error("Error while checking the task!");
      }
      const dataJson = await res.json();
      setV2TaskList(dataJson.data);
      setV2TaskName("");
    } catch (error) {
      console.error(error);
    }
  }

  return { v2Create, v2Delete, v2Update, v2Check, v2Taskname, v2Tasklist, setV2TaskName }
}