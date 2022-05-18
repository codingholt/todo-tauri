import { useState, useEffect } from 'react';
import { ask } from '@tauri-apps/api/dialog';
import './App.css';
import {  all,
  create,
  remove,
  removeAll,
  update} from './util/db.js'
import Input from './components/Input.js'




function App() {
  const [showInput, setshowInput] = useState(false)
  const [todo, setTodo] = useState([])
  const [InputField, setInputField] = useState('')


  useEffect(() => {
    all().then((res) => setTodo(res))
  }, [])
  

  const submitTodo = (title) =>{
    
    const id = Math.floor(Math.random() * 1000) + 1
    const completed = false
    setTodo([...todo, {id, title, completed}])
    create(id, title, completed)
    setInputField('')

  }
 
  
  const removeItem = async (t) =>{
    const deleteTodo = todo.find(ele => ele.id === t)
    const sure = await ask(`Are you sure you want to delete ${deleteTodo.title}?`)
     if(sure === false){
       return
     }
     remove(t)
     const newTodo = todo.filter(object => {
       return object.id !== t;
     });
     
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

  const setDone = async (id) =>{
    setTodo(todo.map((t) => 
      t.id === id  && {...t, completed: !t.completed}
    ))
    update(todo.map((t) => 
    t.id === id  && {...t, completed: !t.completed}

  ))
  }


  return (
    <div className='container'>
        <h1 className='title'>todo.</h1>
        {todo.length  > 0 ? <div className='delAll' onClick={()  => deleteAllTodo()}><span>delete all todo's</span></div> : ''}
        <div>
          {todo.map(t => <p className='todo-item' key={t.id} onClick={(e) => e.button === 1 && removeItem(t.id)}><input type="checkbox" className='checkbox'   value={t.completed}onChange={() => setDone(t.id)}  ></input> <span>{t.title}</span></p>)}
        </div>
        <div className='sub-container' onClick={() => setshowInput(true)}>
          {showInput ? <Input onSubmit={submitTodo} value={InputField} setInputField={setInputField}/> :''}

        </div>
    </div>

  );
}

export default App;