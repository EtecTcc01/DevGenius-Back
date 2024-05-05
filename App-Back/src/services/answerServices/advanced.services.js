import database from '../../repository/connectMysql.js';

async function createAnswer(code, taskId) {

  const sql = `INSERT INTO tbl_answer_advanced (_code, id_task) VALUES (?, ?)`

  const dataAnswer = [code, taskId];

  const conn = await database.connect();

  await conn.query(sql, dataAnswer);

  conn.end();
}

async function updateAnswer(code, answerId) {
  const sql = "UPDATE tbl_answer_advanced SET _code = ? WHERE _id = ?"

  const dataAnswer = [code, answerId];

  const conn = await database.connect();
  await conn.query(sql, dataAnswer);
  conn.end();
}

async function deleteAnswer(answerId) {
  const sql = "DELETE FROM tbl_answer_advanced WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, answerId);
  conn.end();
}

async function getAllAnswer() {
  const sql = "SELECT * FROM tbl_answer_advanced";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getUniqueAnswer(answerId) {
  const sql = "SELECT * FROM tbl_answer_advanced WHERE _id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, answerId);
  conn.end();
  return rows;
}

async function getAnswerByTask(taskId) {
  const sql = "SELECT * FROM tbl_answer_advanced WHERE id_task = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, taskId);
  conn.end();
  return rows;
}

export default {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getUniqueAnswer,
  getAllAnswer,
  getAnswerByTask
};