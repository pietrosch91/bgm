CREATE PROCEDURE `ludo_recreate_table`(IN eid INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=ludo_recreate_table_f(eid,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("ludo_recreate_table : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
