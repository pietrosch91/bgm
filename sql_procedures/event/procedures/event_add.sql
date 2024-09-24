CREATE PROCEDURE `event_add`(IN _name VARCHAR(200),IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=event_add_f(_name,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("event_add : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
