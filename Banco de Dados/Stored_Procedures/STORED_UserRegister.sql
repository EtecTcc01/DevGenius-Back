#ARQUIVO PARA ARMAZENAR UMA STORED_PROCEDURE DO db_devgenius

DELIMITER $$

CREATE PROCEDURE UserRegistration(
	IN userEmail VARCHAR(100), 
	IN userName VARCHAR(30), 
	IN userPassword VARCHAR(30), 
	IN userType INT,
    IN userPermG BOOLEAN
)
BEGIN
	DECLARE userId INT;
    
    INSERT INTO tbl_user (_email, _name, _password, id_type) VALUES (userEmail, userName, userPassword, userType);
    
    SELECT a._id AS id_user INTO userId
    FROM tbl_user AS a
    WHERE a._name = userName;
    
    INSERT INTO tbl_user_info (date_birth, _sex, id_user) VALUES ("0000/00/00", "O", userId);
    INSERT INTO tbl_user_group (id_user, id_group, _perm) VALUES (userId, 1, userPermG);
END
$$