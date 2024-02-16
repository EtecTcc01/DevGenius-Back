import database from '../repository/connectMysql.js';

async function handleLogin(userEmail, userPassword) {
    const sql = 'select user_email, user_password from tbl_user where user_email = ? and user_password = ?;'
    const dataLogin = [userEmail, userPassword];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, dataLogin);
    
    conn.end(); 
    return rows;
}

async function verifyEmail(userEmail) {
    const sql = 'select * from tbl_user where user_email = ?;'
    const dataLogin = [userEmail];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, dataLogin);

    conn.end();
    return rows;
}

export default {handleLogin, verifyEmail}