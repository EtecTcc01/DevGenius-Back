import database from '../repository/connectMysql.js';


async function createCourse(name, description, icon, groupId) {

    const sql = `INSERT INTO tbl_course (_name, _description, _icon, id_group) VALUES (?, ?, ?, ?);`

    const dataCourse = [name, description, icon, groupId]

    const conn = await database.connect();

    await conn.query(sql, dataCourse);

    conn.end();
}

async function updateCourse(name, description, icon, groupId, courseId) {
    const sql = "UPDATE tbl_course SET _name = ?, _description = ?, _icon = ?, id_group = ? WHERE _id = ?"

    const dataCourse = [name, description, icon, groupId, courseId];

    const conn = await database.connect();
    await conn.query(sql, dataCourse);
    conn.end();
}

async function deleteCourse(courseId) {
    const sql = "DELETE FROM tbl_course WHERE _id = ?";

    const conn = await database.connect();
    await conn.query(sql, courseId);
    conn.end();
}

async function getAllCourse() {
    const sql = "SELECT * FROM tbl_course";

    const conn = await database.connect();
    const [rows] = await conn.query(sql);
    conn.end();
    return rows;
}

async function getUniqueCourse(courseId) {
    const sql = "SELECT * FROM tbl_course WHERE _id = ?";

    const conn = await database.connect();
    const [rows] = await conn.query(sql, courseId);
    conn.end();
    return rows;
}

async function getCourseByGroup(groupId) {
    const sql = "SELECT * FROM vw_courses WHERE id_group = ?";

    const conn = await database.connect();
    const [rows] = await conn.query(sql, groupId);
    conn.end();
    return rows;
}

export default {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourse,
    getUniqueCourse,
    getCourseByGroup
}