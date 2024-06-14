import database from '../repository/connectMysql.js';


async function createAchievement(title, description, icon, exp) {

    const sql = `INSERT INTO tbl_achievement (_title, _description, _icon, _exp) VALUES (?, ?, ?, ?);`

    const dataCourse = [title, description, icon, exp]

    const conn = await database.connect();

    await conn.query(sql, dataCourse);

    conn.end();
}

async function updateAchievement(title, description, icon, exp, achievementId) {
    const sql = "UPDATE tbl_achievement SET _title = ?, _description = ?, _icon = ?, _exp = ? WHERE _id = ?"

    const dataCourse = [title, description, icon, exp, achievementId];

    const conn = await database.connect();
    await conn.query(sql, dataCourse);
    conn.end();
}

async function deleteAchievement(achievementId) {
    const sql = "DELETE FROM tbl_achievement WHERE _id = ?";

    const conn = await database.connect();
    await conn.query(sql, achievementId);
    conn.end();
}

async function getAllAchievement() {
    const sql = "SELECT * FROM tbl_achievement";

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function getUniqueAchievement(achievementId) {
    const sql = "SELECT * FROM tbl_achievement WHERE _id = ?";

    const conn = await database.connect();
    const [rows] = await conn.query(sql, achievementId);
    conn.end();
    return rows;
}

async function getAchievementByUser(userId) {
    const sql = "SELECT * FROM tbl_user_achievement WHERE id_user = ?";

    const conn = await database.connect();
    const [rows] = await conn.query(sql, userId);
    conn.end();
    return rows;
}

export default {
    createAchievement,
    updateAchievement,
    deleteAchievement,
    getAllAchievement,
    getUniqueAchievement,
    getAchievementByUser
}