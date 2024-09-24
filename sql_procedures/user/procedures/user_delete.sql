CREATE PROCEDURE `user_delete`(IN q_id INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=user_delete_f(q_id,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("user_delete : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
