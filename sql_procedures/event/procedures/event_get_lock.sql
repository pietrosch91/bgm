CREATE PROCEDURE `event_get_lock`(in _eid INT)
BEGIN
	DECLARE Result INT DEFAULT 0;
	IF (event_test_f(_eid,FALSE)=1) THEN
		SELECT ev_Lock_Games INTO Result FROM BGM_Events WHERE ev_id=_eid;
	END IF;
	SELECT Result;
END;
