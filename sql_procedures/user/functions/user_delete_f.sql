CREATE FUNCTION `user_delete_f`(_uid INT,_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE maxID INT;
	DECLARE dummy VARCHAR(200);

	IF(user_test_f(_uid,TRUE)!=1)THEN
		RETURN "USER not Present";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
	#ACTUAL OPERATION
	#DELETE ALL ENTRIES IN BGM_Access pertaining to the association
	CALL access_remove_user_entries(_uid);
    #DELETE ALL GAMES FROM THE USER
    CALL collection_remove_owner_entries(_uid);
    #UNFOSTER ALL GAMES FOSTERED TO THE USER
    UPDATE BGM_Collection SET col_Foster_ID = NULL WHERE col_Foster_ID = _uid;
    #Update the LUDOs
    CALL ludo_recreate_all_tables();
    #DELETE THE USER
	DELETE FROM BGM_Users WHERE usr_ID=_uid;
    #SHIFT the other ids
	SELECT MAX(usr_ID) INTO maxID FROM BGM_Users;
	IF(maxID > _uid) THEN
		SET dummy = user_reassign_id_f(maxID,_uid,false);
	END IF;
    RETURN NULL;
END;
