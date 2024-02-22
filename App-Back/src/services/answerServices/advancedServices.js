import database from '../../repository/connectMysql.js';

async function createAnswer(answer, idTask) { 
  
  const sql = `insert into tbl_answer_advanced_advanced (answer_text, id_task) values (?, ?);`

  const dataAnswer = [answer, idTask];

  const conn = await database.connect();

  await conn.query(sql, dataAnswer);
  
  conn.end();
}

async function updateAnswer(answer, idAnswer) {
  const sql = "update tbl_answer_advanced set answer_text = ? where id = ?"

  const dataAnswer = [answer, idAnswer];

  const conn = await database.connect();
  await conn.query(sql, dataAnswer);
  conn.end();
}

async function deleteAnswer(idAnswer) {
  const sql = "delete from tbl_answer_advanced where id = ?";

  const conn = await database.connect();
  await conn.query(sql, idAnswer);
  conn.end();
}

async function getAllAnswer() {
  const sql = "select * from tbl_answer_advanced";

  const conn = await database.connect();
  const [rows] = await conn.query(sql); 
  conn.end();
  return rows;
}

async function getAnswer(idAnswer) {
  const sql = "select * from tbl_answer_advanced where id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idAnswer); 
  conn.end();
  return rows;
}

async function getAnswerTask(idTask) {
  const sql = "select * from tbl_answer_advanced where id_task = ?";

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