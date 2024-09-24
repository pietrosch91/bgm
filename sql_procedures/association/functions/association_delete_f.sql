CREATE FUNCTION `association_delete_f`(_aid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE minID INT;
	DECLARE dummy VARCHAR(200);
	IF(association_test_f(_aid,TRUE)!=1)THEN
		RETURN "ASSOCIATION not Present";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#ACTUAL OPERATION
	#DELETE ALL ENTRIES IN BGM_Access pertaining to the association
	CALL access_remove_assoc_entries(_aid);
    #DELETE ALL GAMES FROM THE ASSOCIATION
    CALL collection_remove_owner_entries(_aid);
    #UNFOSTER ALL GAMES FOSTERED TO THE ASSOCIATION
    UPDATE BGM_Collection SET col_Foster_ID = NULL WHERE col_Foster_ID = _aid;
    #UPDATE LUDO
    CALL ludo_recreate_all_tables();
    #DELETE THE ASSOCIATION
	DELETE FROM BGM_Assoc WHERE ass_ID=_aid;
    #SHIFT the other ids
	SELECT MIN(ass_ID) INTO minID FROM BGM_Assoc;
	IF(minID < _aid) THEN
		SET dummy = association_reassign_id_f(minID,_aid,false);
	END IF;
    RETURN NULL;
END;
