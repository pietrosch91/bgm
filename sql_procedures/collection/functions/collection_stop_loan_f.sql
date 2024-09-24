CREATE FUNCTION `collection_stop_loan_f`(gid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE eid INT;
    DECLARE ludoid INT;
    DECLARE gav INT;
    DECLARE slotid INT;

    IF(collection_test_f(gid,FALSE) != 1 ) THEN
        RETURN "Collection Entry not found";
    END IF;
    SELECT col_Event_ID,col_Ludo_ID,col_AVAILABILITY,col_DocumentSlot INTO eid,ludoid,gav,slotid FROM BGM_Collection WHERE col_ID=gid;
    IF(event_test_f(eid,FALSE) != 1) THEN
        RETURN "Game Event not found";
    END IF;
    IF(ludoid IS NULL) THEN
        RETURN "Invalid LUDO_ID";
    END IF;
    IF(gav=1) THEN
        RETURN "Game isn't Loaned";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #actual operation
    UPDATE BGM_Collection SET col_DocumentSlot = NULL, col_DocumentName=NULL, col_RentTime=NULL,  col_AVAILABILITY=1 WHERE col_ID=gid;
    CALL slot_change_content(slotid,-1);
    CALL ludo_change_availability(ludoid,1);
    RETURN NULL;
END;
