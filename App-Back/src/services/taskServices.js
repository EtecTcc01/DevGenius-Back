import database from '../repository/connectMysql.js'


async function createTask(name, task, explanation, idLanguage, idDifficulty, exp) {

  const sql = `insert into tbl_task (_name, task_text, explanation_task, id_lang, id_diff, exp_task) values (?, ?, ?, ?, ?, ?)`

  const dataT = [name, task, explanation, idLanguage, idDifficulty, exp]

  const conn = await database.connect()

  await conn.query(sql, dataT)

  conn.end()
}

async function updateTask(name, task, explanation, idLanguage, idDifficulty, exp, idtask) {
  const sql = "update tbl_task set _name = ?, task_text = ?, explanation_task = ?, id_lang = ?, id_diff = ?, exp_task = ? where id = ?"

  const dataT = [name, task, explanation, idLanguage, idDifficulty, exp, idtask]

  const conn = await database.connect()
  await conn.query(sql, dataT)
  conn.end()
}

async function deleteTask(idTask) {
  const sql = "delete from tbl_task where id = ?"

  const conn = await database.connect()
  await conn.query(sql, idtask)
  conn.end()
}

async function getAllTask() {
  const sql = "select * from tbl_task"

  const conn = await database.connect()
  const [rows] = await conn.query(sql)
  conn.end()
  return rows
}

async function getTask(idLanguage, idDifficulty) {
  const sql = "select * from tbl_task where id_lang = ? and id_diff = ?"
  const dataT = [idLanguage, idDifficulty]

  const conn = await database.connect()
  const [rows] = await conn.query(sql, dataT) 
  conn.end()
  return rows
}

async function getLangTask(idLanguage) {
  const sql = "select * from tbl_task where id_lang = ?"

  const conn = await database.connect()
  const [rows] = await conn.query(sql, idLanguage) 
  conn.end()
  return rows
}

async function getNameTask(name) {
  const sql = "select * from tbl_task where _name = ?"

  const conn = await database.connect()
  const [rows] = await conn.query(sql, name)
  conn.end()
  return rows
}

export default {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getTask,
  getNameTask,
  getLangTask,
}