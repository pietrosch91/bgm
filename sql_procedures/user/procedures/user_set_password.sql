CREATE PROCEDURE `user_set_password`(IN uid INT,IN q_pwd VARCHAR(64),IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=user_set_password_f(uid,q_pwd,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("user_set_password : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
