CREATE PROCEDURE `event_empty_ludo`(IN eid INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=event_empty_ludo_f(eid,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("event_empty_ludo : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
