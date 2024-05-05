import database from '../../repository/connectMysql.js';


async function createAnswer(answer, taskId, altA, altB, altC, altD, altE) {

  const sql = `INSERT INTO tbl_answer_intermediary (_text, id_task, _alternativeA, _alternativeB, _alternativeC, _alternativeD, _alternativeE) VALUES (?, ?, ?, ?, ?, ?, ?);`

  const dataAnswer = [answer, taskId, altA, altB, altC, altD, altE];

  const conn = await database.connect();

  await conn.query(sql, dataAnswer);

  conn.end();
}

async function updateAnswer(answer, taskId, altA, altB, altC, altD, altE, answerId) {
  const sql = "UPDATE tbl_answer_intermediary SET answer_text = ?, _alternativeA = ?, _alternativeB = ?, _alternativeC = ?, _alternativeD = ?, _alternativeE = ? WHERE _id = ?"

  const dataAnswer = [answer, taskId, altA, altB, altC, altD, altE, answerId];

  const conn = await database.connect();
  await conn.query(sql, dataAnswer);
  conn.end();
}

async function deleteAnswer(answerId) {
  const sql = "DELETE FROM tbl_answer_intermediary WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, answerId);
  conn.end();
}

async function getAllAnswer() {
  const sql = "SELECT * FROM tbl_answer_intermediary";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getUniqueAnswer(answerId) {
  const sql = "SELECT * FROM tbl_answer_intermediary WHERE _id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, answerId);
  conn.end();
  return rows;
}

async function getAnswerByTask(taskId) {
  const sql = "SELECT * from tbl_answer_intermediary WHERE id_task = ?";

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