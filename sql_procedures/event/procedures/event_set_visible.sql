CREATE PROCEDURE `event_set_visible`(IN _eid INT,IN _vis INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
	SET Errmsg=event_set_visible_f(_eid,_vis,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("event_set_visible : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
