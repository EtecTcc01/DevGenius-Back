import database from '../repository/connectMysql.js';

async function createInfo(userDate, userSex, userId) {

  const sql = `INSERT INTO tbl_user_info (date_birth, _sex, id_user) VALUES ( ?, ?, ?)`

  const dataInfo = [userDate, userSex, userId];

  const conn = await database.connect();

  await conn.query(sql, dataInfo);

  conn.end();
}

async function updateInfo(userDate, profileImage, userSex, userId) {
  const sql = "UPDATE tbl_user_info SET date_birth = ?, profile_image = ?, _sex = ? WHERE id_user = ?"

  const dataInfo = [userDate, profileImage, userSex, userId];

  const conn = await database.connect();
  await conn.query(sql, dataInfo);
  conn.end();
}

async function updateLevelInfo(userLevel, totalExp, userId) {
  const sql = "UPDATE tbl_user_info SET _level = ?, total_exp = ? WHERE id_user = ?"

  const dataInfo = [userLevel, totalExp, userId];

  const conn = await database.connect();
  await conn.query(sql, dataInfo);
  conn.end();
}

async function deleteInfo(userId) {
  const sql = "DELETE FROM tbl_user_info WHERE id_user = ?";

  const conn = await database.connect();
  await conn.query(sql, userId);
  conn.end();
}

async function getAllInfo() {
  const sql = "SELECT * FROM tbl_user_info";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getUniqueInfo(userId) {
  const sql = "SELECT * FROM tbl_user_info WHERE id_user = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, userId);
  conn.end();
  return rows;
}

export default {
  createInfo,
  updateInfo,
  deleteInfo,
  getAllInfo,
  updateLevelInfo,
  getUniqueInfo
};