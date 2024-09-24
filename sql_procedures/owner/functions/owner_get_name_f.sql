CREATE FUNCTION `owner_get_name_f` (_id INT) RETURNS VARCHAR(200)
	READS SQL DATA
BEGIN
	DECLARE res VARCHAR(200) DEFAULT NULL;
	IF (owner_test_f(_id,TRUE)!=1) THEN
		RETURN NULL;
	END IF;
    IF (_id>0) THEN
		SELECT usr_Name INTO res FROM BGM_Users WHERE usr_ID=_id;
	ELSE
		SELECT ass_Name INTO res FROM BGM_Assoc WHERE ass_ID=_id;
	END IF;
    RETURN res;
END;
