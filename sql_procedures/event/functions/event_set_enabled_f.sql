CREATE FUNCTION `event_set_enabled_f`(_eid INT,_ena INT,_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE ena_R INT DEFAULT 1;
    IF( _ena = 0 ) THEN
		SET ena_R = 0;
	END IF;

    IF (event_test_f(_eid,TRUE)!=1) THEN
		RETURN "EVENT not found";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
    #do the operation
    UPDATE BGM_Events SET ev_Enabled=ena_R WHERE ev_ID = _eid;
	#PROPAGATE TO the ACCESSES
    UPDATE BGM_Access SET acc_Enabled=ena_R WHERE acc_To_ID = _eid;
    RETURN NULL;
END;
