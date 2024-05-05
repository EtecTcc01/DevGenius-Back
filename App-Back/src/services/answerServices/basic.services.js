import database from '../../repository/connectMysql.js';


async function createAnswer(answer, taskId, altA, altB, altC) {

  const sql = `INSERT INTO tbl_answer_basic (_text, id_task, _alternativeA, _alternativeB, _alternativeC) VALUES (?, ?, ?, ?, ?);`

  const dataAnswer = [answer, taskId, altA, altB, altC];

  const conn = await database.connect();

  await conn.query(sql, dataAnswer);

  conn.end();
}

async function updateAnswer(answer, altA, altB, altC, answerId) {
  const sql = "UPDATE tbl_answer_basic SET _text = ?, _alternativeA = ?, _alternativeB = ?, _alternativeC = ? WHERE _id = ?"

  const dataAnswer = [answer, altA, altB, altC, answerId];

  const conn = await database.connect();
  await conn.query(sql, dataAnswer);
  conn.end();
}

async function deleteAnswer(answerId) {
  const sql = "DELETE FROM tbl_answer_basic WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, answerId);
  conn.end();
}

async function getAllAnswer() {
  const sql = "SELECT * FROM tbl_answer_basic";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getUniqueAnswer(answerId) {
  const sql = "SELECT * FROM tbl_answer_basic WHERE _id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, answerId);
  conn.end();
  return rows;
}

async function getAnswerByTask(taskId) {
  const sql = "SELECT * FROM tbl_answer_basic WHERE id_task = ?";

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