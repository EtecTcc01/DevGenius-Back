import database from '../../repository/connectMysql.js';


async function createAnswer(answer, idTask, altA, altB, altC, altD, altE) {

  const sql = `insert into tbl_answer_intermediary_intermediary (answer_text, id_task, alternativeA, alternativeB, alternativeC, alternativeD, alternativeE) values (?, ?, ?, ?, ?, ?, ?);`

  const dataAnswer = [answer, idTask, altA, altB, altC, altD, altE];

  const conn = await database.connect();

  await conn.query(sql, dataAnswer);

  conn.end();
}

async function updateAnswer(answer, idTask, altA, altB, altC, altD, altE, idAnswer) {
  const sql = "update tbl_answer_intermediary set answer_text = ?, alternativeA = ?, alternativeB = ?, alternativeC = ?, alternativeD = ?, alternativeE = ? where id = ?"

  const dataAnswer = [answer, idTask, altA, altB, altC, altD, altE, idAnswer];

  const conn = await database.connect();
  await conn.query(sql, dataAnswer);
  conn.end();
}

async function deleteAnswer(idAnswer) {
  const sql = "delete from tbl_answer_intermediary where id = ?";

  const conn = await database.connect();
  await conn.query(sql, idAnswer);
  conn.end();
}

async function getAllAnswer() {
  const sql = "select * from tbl_answer_intermediary";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getAnswer(idAnswer) {
  const sql = "select * from tbl_answer_intermediary where id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idAnswer);
  conn.end();
  return rows;
}

async function getAnswerTask(idTask) {
  const sql = "select * from tbl_answer_intermediary where id_task = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idTask);
  conn.end();
  return rows;
}

export default {
  createAnswer,
  updateAnswer,
  deleteAnswer,
  getAnswer,
  getAllAnswer,
  getAnswerTask
};