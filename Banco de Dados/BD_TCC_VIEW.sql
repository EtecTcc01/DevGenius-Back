#ARQUIVO P/ARMAZENAR SELECT'S E VIEW'S DAS TABELAS DO bd_devgenius

CREATE VIEW vw_registration AS (
	SELECT a._id AS id_registration, a.date_registration, a.level_stage, a._phase, a._lifes, a._points,
    b._id AS id_user, b._name AS _user, b._email AS email_user,
	c._id AS id_course, c._name AS _course, c._description AS course_desc, c._icon AS course_icon,
	d._id AS id_group, d._name AS _group
	FROM tbl_registration AS a
    INNER JOIN tbl_user AS b ON b._id = a.id_user
	INNER JOIN tbl_course AS c ON c._id = a.id_course
	INNER JOIN tbl_group AS d ON d._id = c.id_group
);

CREATE VIEW vw_user_info AS (
	SELECT a._id AS id_user, a._name AS user_name, a._email, a._password, c._name AS type_user,
	b.date_birth, b._sex, b._level, b.total_exp, b.profile_image, b.title_actual, a.date_register, a._inactive
	from tbl_user AS a 
	INNER JOIN tbl_user_info AS b ON b.id_user = a._id
	INNER JOIN tbl_user_type AS c ON c._id = a.id_type
);

CREATE VIEW vw_user_groups AS (
	SELECT b._id AS group_id, b._name AS group_name, a._perm,
    a.id_user AS user_id, c._name AS user_name, a.date_register
	FROM tbl_user_group AS a 
	INNER JOIN tbl_group AS b ON b._id = a.id_group
	INNER JOIN tbl_user AS c ON c._id = a.id_user
	WHERE a.id_group != 1 AND b._id != 1
);

CREATE VIEW vw_courses AS (
	SELECT a._id AS id_course, a._name AS _course, a._description AS course_desc, a._icon AS course_icon,
	b._id AS id_group, b._name AS _group, count(c._id) AS qtd_stages
	FROM tbl_course AS a
	INNER JOIN tbl_group AS b ON b._id = a.id_group
    INNER JOIN tbl_stage AS c ON c.id_course = a._id
    GROUP BY a._id
);

CREATE VIEW vw_teory_details AS (
	SELECT a._id AS id_course, a._name AS _course, a._description AS course_desc, a._icon AS course_icon,
    b._id AS id_stage, b._name AS _stage, c._id AS id_teory, c._name AS _teory, c._text AS teory_text,
    d._id AS id_group, d._name AS _group
	FROM tbl_course AS a
	INNER JOIN tbl_stage AS b ON b.id_course = a._id
	INNER JOIN tbl_teory AS c ON c.id_stage = b._id
	INNER JOIN tbl_group AS d ON d._id = a.id_group
);

CREATE VIEW vw_teory_note AS (
	SELECT a._id AS id_course, a._name AS _course, a._description AS course_desc, a._icon AS course_icon,
	d._id AS id_group, d._name AS _group
	FROM tbl_course AS a
	INNER JOIN tbl_stage AS b ON b.id_course = a._id
	INNER JOIN tbl_teory AS c ON c.id_stage = b._id
	INNER JOIN tbl_group AS d ON d._id = a.id_group
	GROUP BY a._id
);

CREATE VIEW vw_task_operation AS (
	SELECT a._id AS id_task, a.id_stage, a._name AS _task, _text, _explanation, 
    b._id AS id_operation, b._name AS _operation, b._description AS op_description
    FROM tbl_task AS a
    INNER JOIN tbl_operation AS b ON b._id = a.id_operation
);

SELECT * FROM tbl_user;