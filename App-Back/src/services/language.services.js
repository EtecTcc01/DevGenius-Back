import database from '../repository/connectMysql.js';


async function createLang(name, description) {

  const sql = `insert into tbl_language (_name, _description) values (?, ?)`

  const dataLang = [name, description];

  const conn = await database.connect();

  await conn.query(sql, dataLang);

  conn.end();
}

async function updateLang(name, description, idLanguage) {
  const sql = "update tbl_language set _name = ?, _description = ? where id = ?"

  const dataLang = [name, description, idLanguage];

  const conn = await database.connect();
  await conn.query(sql, dataLang);
  conn.end();
}

async function deleteLang(idLanguage) {
  const sql = "delete from tbl_language where id = ?";

  const conn = await database.connect();
  await conn.query(sql, idLanguage);
  conn.end();
}

async function getAllLang() {
  const sql = "select * from tbl_language";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getAllLangGroup(idGroup) {
  const sql = "select * from tbl_language where code_group = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idGroup);
  conn.end();
  return rows;
}

async function getLang(idLanguage) {
  const sql = "select * from tbl_language where id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idLanguage);
  conn.end();
  return rows;
}

export default {
  createLang,
  updateLang,
  deleteLang,
  getLang,
  getAllLang,
  getAllLangGroup
};