CREATE PROCEDURE `user_add`(IN q_name VARCHAR(200),IN q_code VARCHAR(3),IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=user_add_f(q_name,q_code,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("user_add : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
