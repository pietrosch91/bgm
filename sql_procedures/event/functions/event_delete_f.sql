CREATE FUNCTION `event_delete_f`(_eid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE maxid INT;
	DECLARE dummy VARCHAR(200);
	IF(event_test_f(_eid,TRUE)!=1) THEN
		RETURN "EVENT not found";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#ACTUAL OPERATION
	#DELETE ALL ENTRIES IN BGM_Access pertaining to the event
    CALL access_remove_event_entries(_eid);
    #DELETE ALL GAMES PERTINENT TO THE EVENT
    SET dummy=event_delete_games_f(_eid,FALSE);
    #RETURN ALL GAMES PROVIDED TO THE EVENT
    CALL collection_remove_event_infos(_eid);
    #delete existing slots
	DELETE FROM BGM_Slots WHERE slot_ID > 100*_eid AND slot_ID <100*_eid+100;
	#delete all entries in the ludoteca
	CALL ludo_empty_table(_eid);
	#DELETE THE EVENT
	DELETE FROM BGM_Events WHERE ev_ID=_eid;
	#SHIFT the other ids
	SELECT MAX(ev_ID) INTO maxid FROM BGM_Events;
	IF(maxid > _eid) THEN
		SET dummy = event_reassign_id_f(maxid,_eid,false);
	END IF;
	RETURN NULL;
END;
