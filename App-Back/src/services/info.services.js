import database from '../repository/connectMysql.js';


async function createInfo(userName, firstName, lastName, userDate, userSex) {

  const sql = `insert into tbl_info (user_name, first_name, last_name, date_birth, user_sex) values (?, ?, ?, ?, ?)`

  const dataInfo = [userName, firstName, lastName, userDate, userSex];

  const conn = await database.connect();

  await conn.query(sql, dataInfo);

  conn.end();
}

async function updateInfo(firstName, lastName, userDate, userSex, userName ) {
  const sql = "update tbl_info set first_name = ?, last_name = ?, date_brith = ?, user_sex = ? where user_name = ?"

  const dataInfo = [userName, userDate, userSex, firstName, lastName];

  const conn = await database.connect();
  await conn.query(sql, dataInfo);
  conn.end();
}

async function deleteInfo(userName) {
  const sql = "delete from tbl_info where user_name = ?";

  const conn = await database.connect();
  await conn.query(sql, userName);
  conn.end();
}

async function getInfo(userName) {
  const sql = "select * from tbl_info where user_name = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, userName);
  conn.end();
  return rows;
}

export default {
  createInfo,
  updateInfo,
  deleteInfo,
  getInfo
};