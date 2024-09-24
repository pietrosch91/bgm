CREATE FUNCTION `collection_retake_from_event_f`(_g_id INT,_forced BOOLEAN,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE errmsg VARCHAR(200) DEFAULT NULL;
    DECLARE gev INT;
    DECLARE op_ok INT;

    IF(collection_test_f(_g_id,FALSE)!=1) THEN
        RETURN "Collection Entry not found";
    END IF;
    SELECT col_Event_ID INTO gev FROM BGM_Collection WHERE col_ID=_g_id;
    IF(gev IS NULL) THEN
        RETURN "Game not sent to an event";
    END IF;
    IF(!_forced) THEN
        SELECT ev_Lock_Games INTO op_ok FROM BGM_Events WHERE ev_ID=gev;
        IF (op_ok=1) THEN
            RETURN "Operation is disabled by Event Admin";
        END IF;
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #ACTUAL OPERATION
    SET errmsg=ludo_remove_game_f(_g_id,FALSE);
    UPDATE BGM_Collection SET col_Event_ID=NULL , col_OnShelf=0, col_AVAILABILITY=0,col_Ludo_ID=NULL WHERE col_ID=_g_id;
    RETURN NULL;
END;
