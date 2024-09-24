CREATE FUNCTION `event_set_visible_f`(_eid INT,_vis INT,_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE vis_R INT DEFAULT 1;
    IF( _vis = 0 ) THEN
		SET vis_R = 0;
	END IF;

    IF (event_test_f(_eid,FALSE)!=1) THEN
		RETURN "EVENT not found";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
    #do the operation
    UPDATE BGM_Events SET ev_Visible=vis_R WHERE ev_ID = _eid;
	RETURN NULL;
END;
