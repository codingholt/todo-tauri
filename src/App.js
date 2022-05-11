import { useState, useEffect } from 'react';
import { arrayRemove } from './util/arrRemove.js';
import { ask } from '@tauri-apps/api/dialog';

import './App.css';

import {  all,
  create,
  remove,
  removeAll} from './util/db.js'

import Input from './components/Input.js'




function App() {
  const [showInput, setshowInput] = useState(false)
  const [todo, setTodo] = useState([])
  const [InputField, setInputField] = useState('')

  useEffect(() => {
    all().then((res) => setTodo(res.map(r => r.title)))
  }, [])
  

  const submitTodo = (submit) =>{
    setTodo([...todo, submit])
    create(submit)
    setInputField('')
 
  } 
 
  
  const removeItem = async (t) =>{
   const sure = await ask(`Are you sure you want to delete ${t}?`)
    if(sure === false){
      return
    }
    remove(t)
    const newTodo = arrayRemove(todo, t)

    setTodo(newTodo)
  }

  const deleteAllTodo = async () =>{
    const sure = await ask("Are you sure you want to delete all todo's?")
    if(sure === false){
      return
    }
    removeAll()
    setTodo([])
  }
  return (
    <div className='container'>
        <h1 className='title'>todo.</h1>
        {todo.length  > 0 ? <div className='delAll' onClick={()  => deleteAllTodo()}><span>delete all todo's</span></div> : ''}
        <div>
          {todo.map(t => <p className='todo-item' onClick={(e) => e.button === 1 && removeItem(t)}>{t}</p>)}
        </div>
        <div className='sub-container' onClick={() => setshowInput(true)}>
          {showInput ? <Input onSubmit={submitTodo} value={InputField} setInputField={setInputField}/> :''}

        </div>
    </div>

  );
}

export default App;