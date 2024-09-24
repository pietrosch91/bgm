CREATE FUNCTION `collection_send_to_event_f`(_g_id INT,_ev_id INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE errmsg VARCHAR(200) DEFAULT NULL;
    DECLARE gev INT;

    IF(collection_test_f(_g_id,FALSE)!=1) THEN
        RETURN "Collection Entry not found";
    END IF;
    IF(event_test_f(_ev_id,FALSE)!=1) THEN
        RETURN "Event not found";
    END IF;
    SELECT col_Event_ID INTO gev FROM BGM_Collection WHERE col_ID=_g_id;
    IF(gev IS NOT NULL) THEN
        RETURN "Game already sent to an event";
    END IF;
    SELECT ev_Lock_Games INTO gev FROM BGM_Events WHERE ev_ID=_ev_id;
    IF(gev = 1) THEN
        RETURN "Operation is disabled by Event Admin";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #ACTUAL OPERATION
    UPDATE BGM_Collection SET col_Event_ID=_ev_id , col_OnShelf=0, col_AVAILABILITY=1,col_Ludo_ID=NULL WHERE col_ID=_g_id;
    RETURN NULL;
END;
