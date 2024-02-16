import database from '../../repository/connectMysql.js';


async function createAnswer(answer, idTask, altA, altB, altC, altD) { 
  
  const sql = `insert into tbl_answer_basic (answer_text, id_task, alternativeA, alternativeB, alternativeC) values (?, ?, ?, ?, ?);`

  const dataAnswer = [answer, idTask, altA, altB, altC, altD];

  const conn = await database.connect();

  await conn.query(sql, dataAnswer);
  
  conn.end();
}

async function updateAnswer(answer, altA, altB, altC, altD, idAnswer) {
  const sql = "update tbl_answer_basic set answer_text = ?, alternativeA = ?, alternativeB = ?, alternativeC = ? where id = ?"

  const dataAnswer = [answer, altA, altB, altC, altD, idAnswer];

  const conn = await database.connect();
  await conn.query(sql, dataAnswer);
  conn.end();
}

async function deleteAnswer(idAnswer) {
  const sql = "delete from tbl_answer_basic where id = ?";

  const conn = await database.connect();
  await conn.query(sql, idAnswer);
  conn.end();
}

async function getAllAnswer() {
  const sql = "select * from tbl_answer_basic";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getAnswer(idAnswer) {
  const sql = "select * from tbl_answer_basic where id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idAnswer);
  conn.end();
  return rows;
}

async function getAnswerTask(idTask) {
  const sql = "select * from tbl_answer_basic where id_task = ?";

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