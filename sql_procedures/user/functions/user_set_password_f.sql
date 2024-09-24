CREATE FUNCTION `user_set_password_f`(uid INT,pwd VARCHAR(64),_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	IF(user_test_f(uid,FALSE)!=1) THEN
		RETURN "User not Found";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#operation
	UPDATE BGM_Users SET usr_Pwd=pwd WHERE usr_ID = uid;
	RETURN NULL;
END;
