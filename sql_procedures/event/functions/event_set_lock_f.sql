CREATE FUNCTION `event_set_lock_f`(_eid INT,_lock INT,_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE rec_R INT DEFAULT 1;
    IF( _lock = 0 ) THEN
		SET rec_R = 0;
	END IF;

    IF (event_test_f(_eid,FALSE)!=1) THEN
		RETURN "EVENT not found";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
    #do the operation
    UPDATE BGM_Events SET ev_Lock_Games=rec_R WHERE ev_ID = _eid;
	RETURN NULL;
END;
