CREATE FUNCTION `event_set_document_slots_f`(_eid INT,_count INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE sn INT;
	IF(event_test_f(_eid,TRUE) != 1 ) THEN
		RETURN "EVENT not found";
	END IF;
	SELECT SUM(slot_Occupancy) INTO sn FROM BGM_Slots WHERE slot_Event = _eid;
	IF(sn!=0) THEN
		RETURN "Some slots are not empty";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#operation
	#delete existing slots
	DELETE FROM BGM_Slots WHERE slot_ID > 100*_eid AND slot_ID <100*_eid+100;
	#CREATE SLOTS
	SET sn=0;
	cc_slot : LOOP
		SET sn=sn+1;
		IF (sn>_count) THEN
			LEAVE cc_slot;
		END IF;
		INSERT INTO BGM_Slots (slot_Number,slot_Event) VALUES (sn,_eid);
		ITERATE cc_slot;
	END LOOP cc_slot;
	RETURN NULL;
END;
