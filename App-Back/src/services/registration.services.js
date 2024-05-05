import database from '../repository/connectMysql.js';


async function createRegistration(userId, courseId) {

    const sql = `INSERT INTO tbl_registration (id_user, id_course) VALUES (?, ?)`

    const dataRegistration = [userId, courseId]

    const conn = await database.connect();

    await conn.query(sql, dataRegistration);

    conn.end();
}

async function updateRegistration(date, userId, courseId, registrationId) {
    const sql = "UPDATE tbl_registration SET date_registration = ?, id_user = ?, id_course = ? WHERE _id = ?"

    const dataRegistration = [date, userId, courseId, registrationId];

    const conn = await database.connect();
    await conn.query(sql, dataRegistration);
    conn.end();
}

async function deleteRegistration(registrationId) {
    const sql = "DELETE FROM tbl_registration WHERE _id = ?";

    const conn = await database.connect();
    await conn.query(sql, registrationId);
    conn.end();
}

async function getAllRegistration() {
    const sql = "SELECT * FROM tbl_registration";

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function updateLevelRegistration(stageLvl, registrationId) {
    const sql = "UPDATE tbl_registration SET level_stage = ? WHERE _id = ?;"

    const dataRegistration = [stageLvl, registrationId];

    const conn = await database.connect();
    await conn.query(sql, dataRegistration);
    conn.end();
}

async function getUniqueRegistration(registrationId) {
    const sql = "SELECT * FROM vw_registration WHERE id_registration = ?";

    const conn = await database.connect();
    const [rows] = await conn.query(sql, registrationId);
    conn.end();
    return rows;
}

async function getRegistrationByCourse(userId, courseId) {
    const sql = "CALL GetRegistration(?, ?)"

    const dataRegistration = [userId, courseId]

    const conn = await database.connect();
    const [rows] = await conn.query(sql, dataRegistration);
    conn.end();
    return rows;
}

async function getRegistrationByGroup(groupId) {
    const sql = "SELECT * FROM vw_registration WHERE id_group = ?"

    const conn = await database.connect();
    const [rows] = await conn.query(sql, groupId);
    conn.end();
    return rows;
}

export default {
    createRegistration,
    updateRegistration,
    deleteRegistration,
    getAllRegistration,
    updateLevelRegistration,
    getUniqueRegistration,
    getRegistrationByCourse,
    getRegistrationByGroup
}