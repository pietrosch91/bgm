CREATE FUNCTION `user_set_enabled_f`(_uid INT,_ena INT,_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE ena_R INT DEFAULT 1;
    IF( _ena = 0 ) THEN
		SET ena_R = 0;
	END IF;

    IF (user_test_f(_uid,TRUE)!=1) THEN
		RETURN "user not found";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
    #do the operation
    UPDATE BGM_Users SET usr_Enabled=ena_R WHERE usr_ID = _uid;
	#PROPAGATE TO the games
    UPDATE BGM_Collection SET col_Enabled=ena_R WHERE col_Owner_ID = _uid;
    #PROPAGATE TO the ACCESSES
    UPDATE BGM_Access SET acc_Enabled=ena_R WHERE acc_User_ID = _uid;
    #Update the ludos
    CALL ludo_recreate_all_tables();
    RETURN NULL;
END;
