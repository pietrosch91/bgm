CREATE FUNCTION `event_reset_f`(_eid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
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
	#DELETE ALL GAMES PERTINENT TO THE EVENT
    SET dummy=event_delete_games_f(_eid,FALSE);
    #RETURN ALL GAMES PROVIDED TO THE EVENT
    CALL collection_remove_event_infos(_eid);
    #delete existing slots
	DELETE FROM BGM_Slots WHERE slot_ID > 100*_eid AND slot_ID <100*_eid+100;
	#delete all entries in the ludoteca
	CALL ludo_empty_table(_eid);
	RETURN NULL;
END;
