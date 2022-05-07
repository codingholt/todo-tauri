import { useState } from 'react';
import { arrayRemove } from './util/arrRemove.js';
import './App.css';
import Input from './components/Input.js'

function App() {
  const [showInput, setshowInput] = useState(false)
  const [todo, setTodo] = useState([])
  const [InputField, setInputField] = useState('')

  const submitTodo = (submit) =>{
    setTodo([...todo, submit])
    setInputField('')
 
  } 
 
  
  const removeItem = (t) =>{

    const newTodo = arrayRemove(todo, t)

    setTodo(newTodo)
  }
  return (
    <div className='container'>
        <h1 className='title'>todo.</h1>
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