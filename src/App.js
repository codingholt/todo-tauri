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

    setTodo([...todo, {id, title}])
    create(id, title)
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
    setTodo(todo.map((t) => {
      t.id === id  ? {...t, completed: !t.completed} : t
    }))}

  
  return (
    <div className='container'>
        <h1 className='title'>todo.</h1>
        {todo.length  > 0 ? <div className='delAll' onClick={()  => deleteAllTodo()}><span>delete all todo's</span></div> : ''}
        <div>
          {todo.map(t => <p className='todo-item' key={t.id} onClick={(e) => e.button === 1 && removeItem(t.id)}><input type="checkbox" className='checkbox' onChange={setDone(t.id)} checked={t.completed}></input> <span>{t.title}</span></p>)}
        </div>
        <div className='sub-container' onClick={() => setshowInput(true)}>
          {showInput ? <Input onSubmit={submitTodo} value={InputField} setInputField={setInputField}/> :''}

        </div>
    </div>

  );
}

export default App;