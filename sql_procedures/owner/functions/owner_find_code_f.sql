CREATE FUNCTION `owner_find_code_f` (_code VARCHAR(3)) RETURNS INTEGER
	READS SQL DATA
BEGIN
	DECLARE code_count INT;
    SELECT COUNT(*) INTO code_count FROM BGM_Users WHERE usr_Code=_code;
    IF(code_count!=0) THEN
		RETURN 1;
	END IF;
    SELECT COUNT(*) INTO code_count FROM BGM_Assoc WHERE ass_Code=_code;
    IF(code_count!=0) THEN
		RETURN 1;
	END IF;
	RETURN 0;
END;
