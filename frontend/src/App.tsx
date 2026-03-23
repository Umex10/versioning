/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from 'react'
import './App.css'
import { Plus } from 'lucide-react';

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
  const onSend = async () => {

    if (taskName.trim().length <= 3) {
      alert("We need at least 3 characters for the creation of a task!")
    }

    setTaskList(last => [...last, taskName]);
    setTaskName("");

    try {
      localStorage.setItem("tasks", JSON.stringify(taskList));
      
    } catch(error) {
      console.error(error);
    }

  }

  return (
    <div className='w-full min-h-screen flex flex-col items-center pt-20'>
      <header className='flex flex-col gap-1 items-center'>
        <h1>Taskex</h1>
        <h2>Manage your Tasks! Decide wether v1 or v2!</h2>
      </header>

      <main className='w-full h-full flex-1 flex flex-col items-center gap-2'>
        <div className=' flex flex-row justify-center gap-4'>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.currentTarget.value)}
            className='border-1 rounded-lg' />
          <button disabled={taskName.length <= 3} onClick={() => onSend()} className={`flex flex-row gap-2 ${taskName.length <= 3 ? "text-gray-400" : "text-black"}`}>
            <span>
              Add
            </span>
            <Plus></Plus>
          </button>
        </div>

        <ul className='flex flex-col items-center gap-2 max-w-[300px]'>
          {taskList.length >= 0 && taskList.map((task, index) => (
            <li key={index} className='w-full flex flex-row gap-2 border-1 p-5'>
              <span className='font-bold'>
                Task:
              </span>
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </main>

      <footer>
        Umejr Dzinovic - Taskex
      </footer>

    </div>

  )
}

export default App
