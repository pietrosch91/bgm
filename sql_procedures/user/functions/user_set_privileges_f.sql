CREATE FUNCTION `user_set_privileges_f`(q_usr INT,q_to INT,q_lev INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE accID INT DEFAULT NULL;
	DECLARE level_r INT;

	IF(user_test_f(q_usr,FALSE) !=1) THEN
		RETURN "User not Found";
	END IF;
	IF(access_test_resource_f(q_to,FALSE) !=1) THEN
		RETURN "Resource not found";
	END IF;
	SET level_r=q_lev;
	IF(level_r IS NULL) THEN
		SET level_r = 0;
	END IF;
	IF(level_r < 0) THEN
		SET level_r = 0;
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#operation
	#TEST IF ACCESS IS REGISTERED
    SELECT acc_ID INTO accID FROM BGM_Access WHERE acc_User_ID = q_usr AND acc_To_ID = q_to;
    IF (accID IS NULL) THEN
		INSERT INTO BGM_Access (acc_User_ID,acc_To_ID,acc_Level,acc_Enabled) VALUES (q_usr,q_to,q_lev,1);
	ELSE
		UPDATE BGM_Access SET acc_Level=q_lev WHERE acc_ID=accID;
	END IF;
	RETURN NULL;
END;
