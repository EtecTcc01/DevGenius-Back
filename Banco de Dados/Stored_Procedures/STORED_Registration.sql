#ARQUIVO PARA ARMAZENAR UMA STORED_PROCEDURE DO db_devgenius

DELIMITER $$

CREATE PROCEDURE GetRegistration(
	IN userId INT,
    IN courseId INT
)
BEGIN
	DECLARE registration INT;
    
    SELECT a._id AS id_registration INTO registration
    FROM tbl_registration AS a
    WHERE a.id_user = userId AND a.id_course = courseId;
    
    IF registration IS NULL THEN
		INSERT INTO tbl_registration (id_user, id_course)
        VALUES (userId, courseId);
	END IF;
    
	SELECT a._id AS id_registration, a.date_registration, a.level_stage, a._phase, a._lifes,
	b._id AS id_user, b._name AS _user, b._email AS email_user,
	c._id AS id_course, c._name AS _course, c._description AS course_desc, c._icon AS course_icon,
	d._id AS id_group, d._name AS _group
	FROM tbl_registration AS a
	INNER JOIN tbl_user AS b ON b._id = a.id_user
	INNER JOIN tbl_course AS c ON c._id = a.id_course
	INNER JOIN tbl_group AS d ON d._id = c.id_group
	WHERE b._id = userId AND c._id = courseId;
END
$$