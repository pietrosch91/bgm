CREATE FUNCTION `association_set_enabled_f`(_aid INT,_ena INT,_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE ena_R INT DEFAULT 1;
    IF( _ena = 0 ) THEN
		SET ena_R = 0;
	END IF;
    
    IF (association_test_f(_aid,TRUE)!=1) THEN
		RETURN "association not found";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
    #do the operation
    UPDATE BGM_Assoc SET ass_Enabled=ena_R WHERE ass_ID = _aid;
	#PROPAGATE TO the games
    UPDATE BGM_Collection SET col_Enabled=ena_R WHERE col_Owner_ID = _aid;
    #PROPAGATE TO the ACCESSES
    UPDATE BGM_Access SET acc_Enabled=ena_R WHERE acc_To_ID = _aid;
    #upgrade the ludos
    CALL ludo_recreate_all_tables();
    RETURN NULL;
END;
