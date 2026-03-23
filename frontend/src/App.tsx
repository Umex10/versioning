import './App.css'
import { Plus, Trash, Pen, Check, Scan } from 'lucide-react';
import { useV1Hooks } from './hooks/use-v1';
import { useV2Hooks } from './hooks/use-v2';

function App() {

  const { v1Create, v1Delete, v1Update, v1Taskname, v1Tasklist, setV1TaskName } = useV1Hooks();

  const { v2Create, v2Delete, v2Update, v2Check, v2Taskname, v2Tasklist, setV2TaskName } = useV2Hooks();

  const hoverOnButton = "hover:bg-violet-400 transition duration-300 ease-out rounded-lg";

  return (
    <div className='w-full min-h-screen flex flex-col gap-20 items-center pt-20 bg-gray-600'>
      <header className='flex flex-col gap-1 items-center'>
        <h1 className='text-4xl font-bold text-violet-400'>Taskex</h1>
        <h2 className='font-light text-xl'>Manage your Tasks! Decide wether v1 or v2!</h2>
      </header>

      <main className='w-full h-full flex-1 flex flex-row gap-20 justify-center'>
        <div className=' flex flex-col items-center gap-2'>
          <h3 className='font-bold text-xl'>V1 - Task (string)</h3>
          <div className='flex flex-row justify-center items-center gap-4'>
            <input
              value={v1Taskname}
              onChange={(e) => setV1TaskName(e.currentTarget.value)}
              className='border-1 rounded-lg p-2'
              placeholder='Your task' />
            <button disabled={v1Taskname.length <= 3} onClick={() => v1Create()} className={`flex flex-row gap-2 
            ${v1Taskname.length <= 3 ? "text-gray-400" : "text-black"} ${hoverOnButton}`}>
              <span className='font-bold'>
                Add
              </span>
              <Plus></Plus>
            </button>
          </div>

          <ul className='w-full flex flex-col items-center gap-2 max-w-[300px]'>
            {v1Tasklist.length >= 0 && v1Tasklist.map((task, index) => (
              <li key={index} className='w-full flex flex-row justify-between gap-2 border-1 p-5 rounded-lg'>
                <div className='flex flex-row gap-1'>
                  <span className='font-bold'>
                    Task:
                  </span>
                  <span>{task}</span>
                </div>

                <div className='flex flex-row gap-2'>
                  <button className={hoverOnButton}
                    onClick={() => v1Delete(index)}>
                    <Trash></Trash>
                  </button>

                  <button className={hoverOnButton}
                    onClick={() => v1Update(index)}>
                    <Pen></Pen>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className=' flex flex-col items-center gap-2'>
          <h3 className='font-bold text-xl'>{`V2 - Task ({id, title, checked, createdAt})`}</h3>
          <div className='flex flex-row justify-center items-center gap-4'>
            <input
              value={v2Taskname}
              onChange={(e) => setV2TaskName(e.currentTarget.value)}
              className='border-1 rounded-lg p-2'
              placeholder='Your task' />
            <button disabled={v2Taskname.length <= 3} onClick={() => v2Create()} className={`flex flex-row gap-2 
            ${v2Taskname.length <= 3 ? "text-gray-400" : "text-black"} ${hoverOnButton}`}>
              <span className='font-bold'>
                Add
              </span>
              <Plus></Plus>
            </button>
          </div>

          <ul className='w-full flex flex-col items-center gap-2 max-w-[300px]'>
            {v2Tasklist.length >= 0 && v2Tasklist.map((task, index) => (
              <li key={index} className={`w-full flex flex-row justify-between gap-2 
              border-1 p-5 rounded-lg ${task.checked ? "line-through" : ""}`}>
                <div className='flex flex-row gap-1'>
                  <span className='font-bold'>
                    Task:
                  </span>
                  <span>{task.title}</span>
                </div>

                <div className='flex flex-row gap-2'>
                  <button className={hoverOnButton}
                    onClick={() => v2Delete(task.id)}>
                    <Trash></Trash>
                  </button>

                  <button className={hoverOnButton}
                    onClick={() => v2Update(task.id)}>
                    <Pen></Pen>
                  </button>

                  <button className={hoverOnButton}
                    onClick={() => { v2Check(task.id) }}>
                    {task.checked ? (
                      <Check></Check>
                    ) : (
                      <Scan></Scan>
                    )}

                  </button>
                </div>

              </li>
            ))}
          </ul>
        </div>

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
