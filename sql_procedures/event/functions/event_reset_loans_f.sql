CREATE FUNCTION `event_reset_loans_f`(eid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
	DECLARE gid INT;

	DECLARE done INT DEFAULT FALSE;
    DECLARE cur1 CURSOR FOR SELECT col_ID FROM BGM_Collection WHERE col_Event_ID=eid;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;


	IF(event_test_f(eid,FALSE)!=1) THEN
		RETURN "Event not found";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	OPEN cur1;
	unloan : LOOP
		FETCH cur1 INTO gid;
		IF done THEN
			LEAVE unloan;
		END IF;
		SET Errmsg = collection_stop_loan_f(gid,false);
	END LOOP unloan;
	CLOSE cur1;
	RETURN NULL;
END;
