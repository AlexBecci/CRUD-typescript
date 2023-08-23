import React, { Fragment, useState,useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}


function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([])

  const taskInput= useRef<HTMLInputElement>(null);
  const handleSubmit = (e: FormElement) => {

    e.preventDefault();
    addTask(newTask);
    setNewTask('')
    taskInput.current?.focus();
  }

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name: name, done: false }]
    setTasks(newTasks);
  }

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];

    newTasks[i].done = !newTasks[i].done;

    setTasks(newTasks);
  }
  const removeTask = (i: number): void => {

    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  }
  return (
    <Fragment>

      <form onSubmit={handleSubmit} className='bg-black p-8 mx-auto justify-center text-center'>

        <input ref={taskInput} type="text" onChange={e => setNewTask(e.target.value)} value={newTask} />
        <button className='text-white mx-4 bg-slate-800 px-4'>Save</button>
      </form>

      {
        tasks.map((t: ITask, i: number) => {
          return (
            <div className='px-8 m-4 bg-amber-200 text-center' key={i}>

              <h1 style={{ textDecoration: t.done ? 'line-through' : '' }}> {t.name}</h1>
              <div>
                <button onClick={() => toggleDoneTask(i)}>{t.done ? '✓' : 'Χ'}</button>
                <button onClick={() => removeTask(i)} className='bg-red-500'>Eliminar</button>
              </div>
            </div>
          )
        })
      }
    </Fragment>
  );
}

export default App;
