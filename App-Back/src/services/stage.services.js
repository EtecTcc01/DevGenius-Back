import database from '../repository/connectMysql.js';


async function createStage(name, courseId) {

  const sql = `INSERT INTO tbl_stage (_name, id_course) VALUES (?, ?)`

  const dataStage = [name, courseId];

  const conn = await database.connect();

  await conn.query(sql, dataStage);

  conn.end();
}

async function updateStage(name, courseId, stageId) {
  const sql = "UPDATE tbl_stage SET _name = ?, id_course = ? WHERE _id = ?"

  const dataStage = [name, courseId, stageId];

  const conn = await database.connect();
  await conn.query(sql, dataStage);
  conn.end();
}

async function deleteStage(stageId) {
  const sql = "DELETE FROM tbl_stage WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, stageId);
  conn.end();
}

async function getAllStage() {
  const sql = "SELECT * FROM tbl_stage";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getUniqueStage(stageId) {
  const sql = "SELECT * FROM tbl_stage WHERE _id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, stageId);
  conn.end();
  return rows;
}

async function getStageByCourse(courseId) {
  const sql = "SELECT * FROM tbl_stage WHERE id_course = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, courseId);
  conn.end();
  return rows;
}

export default {
  createStage,
  updateStage,
  deleteStage,
  getAllStage,
  getUniqueStage,
  getStageByCourse
};