CREATE PROCEDURE `event_reassign_id`(IN eid INT,IN newID INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=event_reassign_id_f(eid,newID,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("event_reassign_id : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
