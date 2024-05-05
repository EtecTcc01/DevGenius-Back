import database from '../repository/connectMysql.js';


async function createGroup(name) {

  const sql = `INSERT INTO tbl_group (_name) VALUES (?);`

  const conn = await database.connect();

  await conn.query(sql, name);

  conn.end();
}

async function updateGroup(name, groupId) {
  const sql = "UPDATE tbl_group SET _name = ? WHERE _id = ?"

  const dataGroup = [name, groupId];

  const conn = await database.connect();
  await conn.query(sql, dataGroup);
  conn.end();
}

async function deleteGroup(groupId) {
  const sql = "DELETE FROM tbl_group WHERE _id = ?";

  const conn = await database.connect();
  await conn.query(sql, groupId);
  conn.end();
}

async function getAllGroup() {
  const sql = "SELECT * FROM tbl_group";

  const conn = await database.connect();
  const [rows] = await conn.query(sql);
  conn.end();
  return rows;
}

async function createUserGroup(groupId, userId) {

  const sql = `INSERT INTO tbl_user_group (id_group, id_user) VALUES (?, ?)`

  const dataGroupUser = [groupId, userId]

  const conn = await database.connect();

  await conn.query(sql, dataGroupUser);

  conn.end();
}

async function getUniqueGroup(groupId) {
  const sql = "SELECT * FROM tbl_group WHERE _id = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, groupId);
  conn.end();
  return rows;
}

async function getAllUserGroup(userId) {
  const sql = "SELECT * FROM vw_user_groups WHERE user_id = ?"
  const conn = await database.connect();
  const [rows] = await conn.query(sql, userId);
  conn.end();
  return rows;
}

export default {
  createGroup,
  updateGroup,
  deleteGroup,
  getAllGroup,
  createUserGroup,
  getUniqueGroup,
  getAllUserGroup
};