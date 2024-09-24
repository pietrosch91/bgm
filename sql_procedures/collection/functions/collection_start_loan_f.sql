CREATE FUNCTION `collection_start_loan_f`(gid INT,gDocName VARCHAR(200),_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE eid INT;
    DECLARE ludoid INT;
    DECLARE gav INT;
    DECLARE slotin INT;
    DECLARE slotid INT;
    DECLARE exposed INT;

    IF(collection_test_f(gid,FALSE) != 1 ) THEN
        RETURN "Collection Entry not found";
    END IF;
    SELECT col_Event_ID,col_Ludo_ID,col_AVAILABILITY,col_OnShelf INTO eid,ludoid,gav,exposed FROM BGM_Collection WHERE col_ID=gid;
    IF(event_test_f(eid,FALSE) != 1) THEN
        RETURN "Game Event not found";
    END IF;
    IF(ludoid IS NULL) THEN
        RETURN "Invalid LUDO_ID";
    END IF;
    IF(gDocName IS NULL) THEN
        RETURN  "No document name provided";
    END IF;
    IF(gav=0) THEN
        RETURN "Game already Loaned";
    END IF;
    IF(exposed=0) THEN
        RETURN "Game not on display";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #ACTUAL OPERATION
    SET slotin=slot_get_next_f(eid);
    SET slotid=slot_compute_id_f(eid,slotin);
    #update info on bgm_collection
    UPDATE BGM_Collection SET col_DocumentSlot = slotid, col_DocumentName=gDocName, col_RentTime=CURRENT_TIME(),  col_AVAILABILITY=0 WHERE col_ID=gid;
    CALL slot_change_content(slotid,1);
    CALL ludo_change_availability(ludoid,-1);
    RETURN NULL;
END;
