CREATE FUNCTION `user_get_privilege_f`(uid INT, to_id INT) RETURNS INT
READS SQL DATA
BEGIN
	DECLARE res INT DEFAULT NULL;
	IF(user_test_f(uid,FALSE)!=1) THEN
		RETURN 0;
	END IF;
	IF(access_test_resource_f(to_id,FALSE)!=1) THEN
		RETURN 0;
	END IF;
	IF(user_is_super_f(uid)=1) THEN
		RETURN 40;
	END IF;
	SELECT acc_Level INTO res FROM BGM_Access WHERE acc_Enabled=1 AND acc_User_ID=uid AND acc_To_ID = to_id;
	IF(res IS NULL) THEN
		RETURN 0;
	END IF;
	RETURN res;
END;
