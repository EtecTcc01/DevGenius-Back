import database from '../repository/connectMysql.js';


async function createUser(userName, userEmail, userPassword, typeUser) { 
  
  const sql = `insert into tbl_user (user_name, user_email, user_password, user_type) values (?, ?, ?, ?);`

  const dataUser = [userName, userEmail, userPassword, typeUser];

  const conn = await database.connect();

  await conn.query(sql,dataUser);
  
  conn.end();
}

async function updateUser(userName, userEmail, userPassword, typeUser) {
  const sql = "update tbl_user set user_name = ?, user_email = ?, user_password = ?, user_type = ? where user_name = ?;"

  const dataUser = [userName, userEmail, userPassword, typeUser];

  const conn = await database.connect();
  await conn.query(sql, dataUser);
  conn.end();
}

async function deleteUser(userName) {
  const sql = "update tbl_user set user_inactive = 1 where user_name = ?;";

  const conn = await database.connect();
  await conn.query(sql, userName);
  conn.end();
}

async function getUser() {
  const sql = "select * from tbl_user where user_inactive = 0";

  const conn = await database.connect();
  const [rows] = await conn.query(sql); 
  conn.end();
  return rows;
}

async function getUserEmail(userEmail) {
  const sql = "select user_email, user_name, user_type from tbl_user where user_email = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, userEmail);
  conn.end();
  return rows;
}

export default {createUser, updateUser, deleteUser, getUser, getUserEmail};