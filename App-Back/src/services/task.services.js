import database from '../repository/connectMysql.js'


async function createTask(name, task, explanation, operationId, stageId) {

  const sql = `INSERT INTO tbl_task (_name, _text, _explanation, id_operation, id_stage) VALUES (?, ?, ?, ?, ?)`

  const dataTask = [name, task, explanation, operationId, stageId]

  const conn = await database.connect()

  await conn.query(sql, dataTask)

  conn.end()
}

async function updateTask(name, task, explanation, operationId, stageId, taskId) {
  const sql = "UPDATE tbl_task set _name = ?, id_task = ?, _text = ?, _explanation = ?, id_operation = ?, id_stage = ? WHERE _id = ?"

  const dataTask = [name, task, explanation, operationId, stageId, taskId]

  const conn = await database.connect()
  await conn.query(sql, dataTask)
  conn.end()
}

async function deleteTask(taskId) {
  const sql = "DELETE FROM tbl_task WHERE _id = ?"

  const conn = await database.connect()
  await conn.query(sql, taskId)
  conn.end()
}

async function getAllTask() {
  const sql = "SELECT * FROM tbl_task"

  const conn = await database.connect()
  const [rows] = await conn.query(sql)
  conn.end()
  return rows
}

async function getUniqueTask(taskId) {
  const sql = "SELECT * FROM tbl_task WHERE _id = ?"

  const conn = await database.connect()
  const [rows] = await conn.query(sql, taskId)
  conn.end()
  return rows
}

async function geTaskByStage(stageId) {
  const sql = "SELECT * FROM vw_task_operation WHERE id_stage = ?"

  const conn = await database.connect()
  const [rows] = await conn.query(sql, stageId)
  conn.end()
  return rows
}

export default {
  createTask,
  updateTask,
  deleteTask,
  getAllTask,
  getUniqueTask,
  geTaskByStage
}