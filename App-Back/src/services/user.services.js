import database from '../repository/connectMysql.js';

async function createUser(userEmail, userName, userPassword, userType) {

  let sql = `CALL UserRegistration(?, ?, ?, ?, 0)`

  const dataUser = [userEmail, userName, userPassword, userType];

  const conn = await database.connect();

  await conn.query(sql, dataUser);

  sql = 'SELECT * FROM tbl_user WHERE _name = ?'
  const [rows] = await conn.query(sql, userName);

  conn.end();
  return rows
}

async function updateUser(userName, userEmail, userPassword, userType, userId) {
  const sql = "UPDATE tbl_user SET _name = ?, _email = ?, _password = ?, id_type = ? WHERE _id = ?"

  const dataUser = [userName, userEmail, userPassword, userType, userId];

  const conn = await database.connect();
  await conn.query(sql, dataUser);
  conn.end();
}

async function deleteUser(userId) {
  const sql = "DELETE FROM tbl_user WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, userId);
  conn.end();
}

async function getAllUser() {
  const sql = "SELECT * FROM tbl_user WHERE _inactive = 0";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function inactiveUser(userId) {
  const sql = "UPDATE tbl_user set _inactive = 1 WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, userId);
  conn.end();
}

async function getUniqueUser(userId) {
  const sql = "SELECT _email, _name, id_type, _password FROM tbl_user WHERE _id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, userId);
  conn.end();
  return rows;
}

async function getUserInfo(userId) {
  const sql = "SELECT * FROM vw_user_info WHERE id_user = ?"

  const conn = await database.connect();
  const [rows] = await conn.query(sql, userId);
  conn.end();
  return rows;
}

async function getUserRank() {
  const sql = "SELECT * FROM vw_user_info ORDER BY _level DESC, total_exp DESC, date_register"

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

// -------------------------- USER LOGIN -------------------------------------------------

async function handleLogin(userEmail, userPassword) {
  const sql = 'SELECT _email, _password FROM tbl_user WHERE _email = ? AND _password = ?;'
  const dataLogin = [userEmail, userPassword];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dataLogin);

  conn.end();
  return rows;
}

async function handleVerification(dataTest) {
  let sql = 'SELECT * FROM tbl_user WHERE _email = ?'

  if (dataTest.length > 1) {
    sql = 'SELECT * FROM tbl_user WHERE _email = ? OR _name = ?;'
  }

  const conn = await database.connect()
  const [rows] = await conn.query(sql, dataTest)

  conn.end();
  return rows;
}

export default {
  createUser,
  updateUser,
  deleteUser,
  getAllUser,
  getUniqueUser,
  getUserInfo,
  inactiveUser,
  handleVerification,
  handleLogin,
  getUserRank
};