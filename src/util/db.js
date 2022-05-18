import Database from 'tauri-plugin-sql-api';


let db = null
const load = Database.load('sqlite:test.db').then(instance => {
  db = instance
  return db
})

const all = async () => {
  await load
  return await db.select('SELECT * FROM todos')
}

const create  = async (id, title, completed) => {

await db.execute('INSERT INTO todos (id, title) VALUES (?,?)', [id, title, completed]);
  return {
    id,
    title,
    completed,
  };
}

const update = async (todo) => {
  await db.execute('UPDATE todos SET title = $1 AND completed= $3 WHERE id = $2', [todo.title, todo.id, todo.completed]);
  return todo;
}

const remove = async (id) => {
  return await db.execute('DELETE FROM todos WHERE id = $1', [id]);
}

const removeAll = async () =>{
    return await db.execute('DELETE FROM todos')
}

export {
  all,
  create,
  update,
  remove,
  removeAll
};