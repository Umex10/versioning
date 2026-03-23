/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from 'react'
import './App.css'
import { Plus, Trash } from 'lucide-react';

function App() {

  const [taskName, setTaskName] = useState("");
  const [taskList, setTaskList] = useState<string[]>([]);

  useEffect(() => {
    const rawData = localStorage.getItem("tasks");

    if (rawData) {
      try {
        const data = JSON.parse(rawData);
        setTaskList(data);
      } catch (error) {
        console.error("Fehler beim Laden aus dem LocalStorage:", error);
        setTaskList([]);
      }
    }
  }, []);

  const updateLocalStorage = (updatedTaskList: string[]) => {
    try {
      localStorage.setItem("tasks", JSON.stringify(updatedTaskList));

    } catch (error) {
      console.error(error);
    }
  }

  const onSend = async () => {

    if (taskName.trim().length <= 3) {
      alert("We need at least 3 characters for the creation of a task!")
    }

    const updatedTaskList = [...taskList, taskName];

    setTaskList(updatedTaskList);
    setTaskName("");

    updateLocalStorage(updatedTaskList)
  }

  const onDelete = (taskToDelete: string) => {
    const updatedTaskList = taskList.filter(task => task !== taskToDelete);

    setTaskList(updatedTaskList);
    updateLocalStorage(updatedTaskList)
  }

  return (
    <div className='w-full min-h-screen flex flex-col gap-20 items-center pt-20 bg-gray-600'>
      <header className='flex flex-col gap-1 items-center'>
        <h1 className='text-4xl font-bold text-violet-400'>Taskex</h1>
        <h2 className='font-light text-xl'>Manage your Tasks! Decide wether v1 or v2!</h2>
      </header>

      <main className='w-full h-full flex-1 flex flex-col items-center gap-2'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.currentTarget.value)}
            className='border-1 rounded-lg p-2' />
          <button disabled={taskName.length <= 3} onClick={() => onSend()} className={`flex flex-row gap-2 ${taskName.length <= 3 ? "text-gray-400" : "text-black"}`}>
            <span className='font-bold'>
              Add
            </span>
            <Plus></Plus>
          </button>
        </div>

        <ul className='w-full flex flex-col items-center gap-2 max-w-[300px]'>
          {taskList.length >= 0 && taskList.map((task, index) => (
            <li key={index} className='w-full flex flex-row justify-between gap-2 border-1 p-5 rounded-lg'>
              <div className='flex flex-row gap-1'>
                <span className='font-bold'>
                  Task:
                </span>
                <span>{task}</span>
              </div>

              <div className='flex flex-row gap-2'>
                <button className='hover:bg-violet-400 transition duration-300 ease-out rounded-lg'
                  onClick={() => onDelete(task)}>
                  <Trash></Trash>
                </button>
              </div>

            </li>
          ))}
        </ul>
      </main>

      <footer className='font-bold'>
        <span className='text-violet-500 font-bold'>
          Umejr Dzinovic
        </span>

        <span>
          - Taskex - Exercise for WebServices
        </span>

      </footer>

    </div>

  )
}

export default App
