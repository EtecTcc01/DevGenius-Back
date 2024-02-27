import database from '../repository/connectMysql.js';


async function createTeory(name, teory, idLanguage, idDifficulty) {

  const sql = `insert into tbl_teory (_name, teory_text, id_lang, id_diff) values (?, ?, ?, ?)`

  const dataTeory = [name, teory, idLanguage, idDifficulty];

  const conn = await database.connect();

  await conn.query(sql, dataTeory);

  conn.end();
}

async function updateTeory(name, teory, idLanguage, idDifficulty, idTeory) {
  const sql = "update tbl_teory set _name = ?, teory_text = ?, id_lang = ?, id_diff = ? where id = ?"

  const dataTeory = [name, teory, idLanguage, idDifficulty, idTeory];

  const conn = await database.connect();
  await conn.query(sql, dataTeory);
  conn.end();
}

async function deleteTeory(idTeory) {
  const sql = "delete from tbl_teory where id = ?";

  const conn = await database.connect();
  await conn.query(sql, idTeory);
  conn.end();
}

async function getTeory(idTeory) {
  const sql = "select * from tbl_teory where id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idTeory);
  conn.end();
  return rows;
}

async function getAllTeory() {
  const sql = "select * from tbl_teory";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

export default {
  createTeory,
  updateTeory,
  deleteTeory,
  getTeory,
  getAllTeory,
};