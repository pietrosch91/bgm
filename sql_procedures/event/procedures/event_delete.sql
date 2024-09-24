CREATE PROCEDURE `event_delete`(IN _eid INT, IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=event_delete_f(_eid,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("event_delete : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
