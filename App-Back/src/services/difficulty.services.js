import database from '../repository/connectMysql.js';


async function createDiff(name, description) {

  const sql = `insert into tbl_difficulty (_name, _description) values (?, ?);`

  const dataDiff = [name, description];

  const conn = await database.connect();

  await conn.query(sql, dataDiff);

  conn.end();
}

async function updateDiff(name, description, idDifficulty) {
  const sql = "update tbl_difficulty set _name = ?, _description = ? where id = ?"

  const dataDiff = [name, description, idDifficulty];

  const conn = await database.connect();
  await conn.query(sql, dataDiff);
  conn.end();
}

async function deleteDiff(idDiff) {
  const sql = "delete from tbl_difficulty where id = ?";

  const conn = await database.connect();
  await conn.query(sql, idDiff);
  conn.end();
}

async function getAllDiff() {
  const sql = "select * from tbl_difficulty";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getDiff(idDiff) {
  const sql = "select * from tbl_difficulty where id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idDiff);
  conn.end();
  return rows;
}

export default {
  createDiff,
  updateDiff,
  deleteDiff,
  getAllDiff,
  getDiff
};