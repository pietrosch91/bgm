CREATE PROCEDURE `collection_remove_event_infos`(IN _eid INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE colID INT;
    DECLARE cur1 CURSOR FOR SELECT col_ID FROM BGM_Collection WHERE col_Event_ID=_eid;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cur1;
    l_unassign : LOOP
		FETCH cur1 INTO colID;
		IF done THEN
			LEAVE l_unassign;
		END IF;
		UPDATE BGM_Collection SET col_DocumentSlot=NULL, col_DocumentName=NULL, col_RentTime=NULL, col_AVAILABILITY=1, col_OnShelf=0, col_Event_ID=NULL, col_Ludo_ID=NULL WHERE col_ID=colID;
	END LOOP l_unassign;
    CLOSE cur1;
END;
