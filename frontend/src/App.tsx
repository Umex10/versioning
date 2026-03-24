import './App.css'
import { Trash, Pen, Check, Scan } from 'lucide-react';
import { useV1Hooks } from './hooks/use-v1';
import { useV2Hooks } from './hooks/use-v2';

function App() {
  const { v1Create, v1Delete, v1Update, v1Taskname, v1Tasklist, setV1TaskName } = useV1Hooks();
  const { v2Create, v2Delete, v2Update, v2Check, v2Taskname, v2Tasklist, setV2TaskName } = useV2Hooks();

  const iconButtonStyle = "p-1.5 hover:text-violet-400 transition-colors text-gray-400";
  const addButtonStyle = "px-4 py-2 bg-violet-600 text-white rounded-md disabled:bg-gray-700 disabled:text-gray-500";

  return (
    <div className='w-full min-h-screen flex flex-col bg-gray-800 text-gray-100'>

      <header className='flex flex-col items-center pt-12 pb-10'>
        <h1 className='text-4xl font-bold text-violet-400'>Taskex</h1>
        <p className='text-gray-400'>API Versioning: Strings vs. erweiterte Instanzen</p>
      </header>

      <main className='w-full max-w-5xl mx-auto px-4 flex flex-row gap-8 justify-center items-start'>

        {/* V1 - Legacy */}
        <div className='flex-1 flex flex-col gap-4 border-r border-gray-700 pr-8'>
          <h3 className='font-bold text-lg border-b border-gray-700 pb-2'>V1 (Legacy)</h3>

          <div className='flex flex-row gap-2'>
            <input
              value={v1Taskname}
              onChange={(e) => setV1TaskName(e.currentTarget.value)}
              className='flex-1 bg-gray-900 border border-gray-600 rounded p-2 text-sm outline-none focus:border-violet-500'
              placeholder='Task name...'
              data-testid="task-name-string" />
            <button
              disabled={v1Taskname.length <= 3}
              onClick={() => v1Create()}
              className={addButtonStyle}
              data-testid="task-name-add">
              Add
            </button>
          </div>

          <ul className='flex flex-col gap-2'>
            {v1Tasklist.map((task, index) => (
              <li key={index} className='flex flex-row justify-between items-center bg-gray-700/30 p-3 rounded'>
                <span className='text-sm'>{task}</span>
                <div className='flex flex-row gap-1'>
                  <button className={iconButtonStyle} onClick={() => v1Update(index)}
                    data-testid="task-name-edit">
                    <Pen size={16} />
                  </button>
                  <button className={iconButtonStyle} onClick={() => v1Delete(index)}
                     data-testid="task-name-delete">
                    <Trash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* V2 - Modern */}
        <div className='flex-1 flex flex-col gap-4'>
          <h3 className='font-bold text-lg border-b border-gray-700 pb-2'>V2 (Modern)</h3>

          <div className='flex flex-row gap-2'>
            <input
              value={v2Taskname}
              onChange={(e) => setV2TaskName(e.currentTarget.value)}
              className='flex-1 bg-gray-900 border border-gray-600 rounded p-2 text-sm outline-none focus:border-violet-500'
              placeholder='Task name...'
              data-testid="task-title-name" />
            <button
              disabled={v2Taskname.length <= 3}
              onClick={() => v2Create()}
              className={addButtonStyle}
              data-testid="task-title-add">
              Add
            </button>
          </div>

          <ul className='flex flex-col gap-2'>
            {v2Tasklist.map((task) => (
              <li key={task.id} className={`flex flex-row justify-between items-center bg-gray-700/30 p-3 rounded ${task.checked ? "opacity-40" : ""}`}>
                <div className='flex flex-col'>
                  <span className={`text-sm ${task.checked ? "line-through" : ""}`}>
                    {task.title}
                  </span>
                  <span className='text-[10px] text-gray-500 mt-1'>
                    Created: {new Date(task.createdAt).toLocaleString('de-DE', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                <div className='flex flex-row gap-1'>
                  <button className={iconButtonStyle} onClick={() => { v2Check(task.id) }}
                    data-testid="task-title-check">
                    {task.checked ? <Check size={16} className="text-green-500" /> : <Scan size={16} />}
                  </button>
                  <button className={iconButtonStyle} onClick={() => v2Update(task.id)}
                    data-testid="task-title-edit">
                    <Pen size={16} />
                  </button>
                  <button className={iconButtonStyle} onClick={() => v2Delete(task.id)}
                    data-testid="task-title-delete">
                    <Trash size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className='mt-auto py-8 text-center border-t border-gray-700 text-gray-500 text-xs'>
        <p><span className='text-violet-400'>Umejr Dzinovic</span> — Taskex Exercise</p>
      </footer>
    </div>
  )
}

export default App