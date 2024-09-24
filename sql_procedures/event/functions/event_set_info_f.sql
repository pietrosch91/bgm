CREATE FUNCTION `event_set_info_f`(_eid INT,_site TEXT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	IF(event_test_f(_eid,FALSE)!=1) THEN
		RETURN "EVENT not Present";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	UPDATE BGM_Events SET ev_Link = _site WHERE ev_ID=_eid;
	RETURN NULL;
END;
