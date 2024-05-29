import database from '../repository/connectMysql.js';


async function createTeory(name, teory, stageId) {

  const sql = `INSERT INTO tbl_teory (_name, _text, id_stage) VALUES (?, ?, ?)`

  const dataTeory = [name, teory, stageId];

  const conn = await database.connect();

  await conn.query(sql, dataTeory);

  conn.end();
}

async function updateTeory(name, teory, stageId, teoryId) {
  const sql = "UPDATE tbl_teory SET _name = ?, _text = ?, id_stage = ? WHERE _id = ?"

  const dataTeory = [name, teory, stageId, teoryId];

  const conn = await database.connect();
  await conn.query(sql, dataTeory);
  conn.end();
}

async function deleteTeory(teoryId) {
  const sql = "DELETE FROM tbl_teory WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, teoryId);
  conn.end();
}

async function getAllTeory() {
  const sql = "SELECT * FROM tbl_teory";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function getUniqueTeory(teoryId) {
  const sql = "SELECT * FROM tbl_teory WHERE _id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, teoryId);
  conn.end();
  return rows;
}

async function getTeoryByCourse(courseId) {
  const sql = "SELECT * FROM vw_teory_details WHERE id_course = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, courseId);
  conn.end();
  return rows;
}

async function getTeoryOrdenedByGroup(groupId) {
  const sql = "SELECT * FROM vw_teory_note WHERE id_group = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, groupId);
  conn.end();
  return rows;
}

async function getTeoryByStage(stageId) {
  const sql = "SELECT * FROM tbl_teory WHERE id_stage = ?";
  
  const conn = await database.connect();
  const [rows] = await conn.query(sql, stageId);
  conn.end();
  return rows;
}

export default {
  createTeory,
  updateTeory,
  deleteTeory,
  getUniqueTeory,
  getAllTeory,
  getTeoryByCourse,
  getTeoryByStage,
  getTeoryOrdenedByGroup
};