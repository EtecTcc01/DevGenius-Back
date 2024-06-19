import database from '../repository/connectMysql.js';


async function createTitle(title, description, exp) {

    const sql = `INSERT INTO tbl_title (_name, _description, _exp) VALUES (?, ?, ?);`

    const dataTitle = [title, description, exp]

    const conn = await database.connect();

    await conn.query(sql, dataTitle);

    conn.end();
}

async function updateTitle(title, description, exp, titleId) {
    const sql = "UPDATE tbl_title SET _name = ?, _description = ?, _exp = ? WHERE _id = ?"

    const dataTitle = [title, description, exp, titleId];

    const conn = await database.connect();
    await conn.query(sql, dataTitle);
    conn.end();
}

async function deleteTitle(titleId) {
    const sql = "DELETE FROM tbl_title WHERE _id = ?";

    const conn = await database.connect();
    await conn.query(sql, titleId);
    conn.end();
}

async function getAllTitle() {
    const sql = "SELECT * FROM tbl_title";

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function createUserTitle(userId, titleId) {

    const sql = `INSERT INTO tbl_user_title (id_user, id_title) VALUES (?, ?);`

    const dataTitle = [userId, titleId]

    const conn = await database.connect();

    await conn.query(sql, dataTitle);

    conn.end();
}

async function getUniqueTitle(titleId) {
    const sql = "SELECT * FROM tbl_title WHERE _id = ?";

    const conn = await database.connect();
    const [rows] = await conn.query(sql, titleId);
    conn.end();
    return rows;
}

async function getTitleByUser(userId) {
    const sql = "SELECT * FROM tbl_user_title WHERE id_user = ?";

    const conn = await database.connect();
    const [rows] = await conn.query(sql, userId);
    conn.end();
    return rows;
}

export default {
    createTitle,
    updateTitle,
    deleteTitle,
    getAllTitle,
    getUniqueTitle,
    getTitleByUser,
    createUserTitle
}