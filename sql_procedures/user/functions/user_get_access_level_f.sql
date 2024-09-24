CREATE FUNCTION `user_get_access_level_f` (o_id INT, to_id INT) RETURNS INT
READS SQL DATA
BEGIN
	DECLARE Res INT DEFAULT NULL;
    SELECT acc_Level INTO Res FROM BGM_Access WHERE acc_User_ID=o_id AND acc_To_ID=to_id;
    IF (Res IS NULL) THEN
		RETURN 0;
	END IF;
    RETURN RES;
END;
