import database from '../repository/connectMysql.js';


async function createRegistration(userId, courseId) {

    const sql = `INSERT INTO tbl_registration (id_user, id_course) VALUES (?, ?)`

    const dataRegistration = [userId, courseId]

    const conn = await database.connect();

    await conn.query(sql, dataRegistration);

    conn.end();
}

async function updateRegistration(phase, lifes, date, userId, courseId, registrationId) {
    const sql = "UPDATE tbl_registration SET _phase = ?, _lifes = ?, date_registration = ?, id_user = ?, id_course = ? WHERE _id = ?"

    const dataRegistration = [phase, lifes, date, userId, courseId, registrationId];

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
    const sql = "UPDATE tbl_registration SET level_stage = ?, _phase = 0, _lifes = 5 WHERE _id = ?;"

    const dataRegistration = [stageLvl, registrationId];

    const conn = await database.connect();
    await conn.query(sql, dataRegistration);
    conn.end();
}

async function updateLifeRegistration(lifes, registrationId) {
    const sql = "UPDATE tbl_registration SET _lifes = ? WHERE _id = ?;"

    const dataRegistration = [lifes, registrationId];

    const conn = await database.connect();
    await conn.query(sql, dataRegistration);
    conn.end();
}

async function updatePhaseRegistration(phase, registrationId) {
    const sql = "UPDATE tbl_registration SET _phase = ? WHERE _id = ?;"

    const dataRegistration = [phase, registrationId];

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

async function getRegistrationByGroup(userId, groupId) {
    const sql = "SELECT * FROM vw_registration WHERE id_user = ? AND id_group = ?"

    const dataRegistration = [userId, groupId]

    const conn = await database.connect();
    const [rows] = await conn.query(sql, dataRegistration);
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
    getRegistrationByGroup,
    updateLifeRegistration,
    updatePhaseRegistration
}