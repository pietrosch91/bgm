CREATE FUNCTION `event_reassign_id_f`(eid INT,newID INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	IF(event_test_f(eid,TRUE) != 1) THEN
		RETURN "Event not found";
	END IF;
	IF(eid=newID) THEN
		RETURN "Initial and final ID are the same";
	END IF;
	IF(event_test_f(newID,TRUE) = 1) THEN
		RETURN "Final ID not available";
	END IF;
	IF(newID <=0 ) THEN
		RETURN "Final ID not valid";
	END IF;

	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#BGM_Access
	UPDATE BGM_Access SET acc_To_ID=newID WHERE acc_To_ID=eid;
	#BGM_Collection
	UPDATE BGM_Collection SET col_DocumentSlot=slot_recompute_id_f(eid,col_DocumentSlot,newID),col_Event_ID=newID WHERE col_Event_ID=eid;
	#BGM_Events
	UPDATE BGM_Events SET ev_ID=newID WHERE ev_id=eid;
	#BGM_Ludo
	UPDATE BGM_Ludo SET ludo_Event_ID=newID WHERE ludo_Event_ID=eid;
	#BGM_Slots
	UPDATE BGM_Slots SET slot_Event=newID WHERE slot_Event=eid;
	RETURN NULL;
END;
