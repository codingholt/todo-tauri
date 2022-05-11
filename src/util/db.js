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

const create  = async (title) => {
  const { lastInsertId: id } = await db.execute('INSERT INTO todos (title) VALUES ($1)', [title]);
  return {
    id,
    title,
    completed: false,
  };
}

const update = async (todo) => {
  await db.execute('UPDATE todos SET title = $1, completed = $2 WHERE id = $3', [todo.title, todo.completed, todo.id]);
  return todo;
}

const remove = async (id) => {
  return await db.execute('DELETE FROM todos WHERE id = $1', [id]);
}

export {
  all,
  create,
  update,
  remove
};