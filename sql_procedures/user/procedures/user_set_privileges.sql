CREATE PROCEDURE `user_set_privileges`(IN q_usr INT,IN q_to INT,IN q_lev INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=user_set_privileges_f(q_usr,q_to,q_lev,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("user_set_privileges : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
