import database from '../repository/connectMysql.js';


async function createGroup(name) { 
  
  const sql = `insert into tbl_group (_name) values (?);`

  const conn = await database.connect();

  await conn.query(sql, name);
  
  conn.end();
}

async function createGroupUser(idGroup, userName) { 
  
  const sql = `insert into tbl_group_user (code_group, user_name) values (?, ?);`

  const dataGroupUser = [idGroup, userName]

  const conn = await database.connect();

  await conn.query(sql, dataGroupUser);
  
  conn.end();
}

async function updateGroup(name, idGroup) {
  const sql = "update tbl_group set _name = ? where _code = ?"

  const dataAnswer = [name, idGroup];

  const conn = await database.connect();
  await conn.query(sql, dataAnswer);
  conn.end();
}

async function deleteGroup(idGroup) {
  const sql = "delete from tbl_group where _code = ?";

  const conn = await database.connect();
  await conn.query(sql, idGroup);
  conn.end();
}

async function getAllGroup() {
  const sql = "select * from tbl_group";

  const conn = await database.connect();
  const [rows] = await conn.query(sql); 
  conn.end();
  return rows;
}

async function getGroup(idGroup) {
  const sql = "select * from tbl_group where _code = ?";

  const conn = await database.connect();
  const [rows] = await conn.query(sql, idGroup); 
  conn.end();
  return rows;
}

async function getAllGroupUserJoin(userName) {
  const sql = "select b._code, b._name, a.user_name from tbl_group_user as a inner join tbl_group as b on a.code_group = b._code where a.code_group != 1 and b._code != 1 and a.user_name = ?"
  const conn = await database.connect();
  const [rows] = await conn.query(sql, userName);
  conn.end();
  return rows;
}

export default {
    createGroup,
    updateGroup,
    deleteGroup,
    getAllGroup,
    getAllGroupUserJoin,
    getGroup,
    createGroupUser
};