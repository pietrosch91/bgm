CREATE FUNCTION `event_empty_ludo_f`(eid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE Errmsg VARCHAR(200) DEFAULT NULL;
	DECLARE nloan INT;
	IF(event_test_f(eid,FALSE)!=1) THEN
		RETURN "Event not found";
	END IF;
	SELECT COUNT(*) INTO nloan FROM BGM_Collection WHERE col_AVAILABILITY=0 AND col_Event_ID=eid;
	IF(nloan>0) THEN
		RETURN "Some games are still loaned";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	SET Errmsg=ludo_empty_table_f(eid,false);
	RETURN Errmsg;
END;
