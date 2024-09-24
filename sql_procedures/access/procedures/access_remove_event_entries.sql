CREATE PROCEDURE `access_remove_event_entries`(IN _eid INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE accID INT;
    DECLARE cur1 CURSOR FOR SELECT acc_ID FROM BGM_Access WHERE acc_To_ID=_eid;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cur1;
    l_unassign : LOOP
		FETCH cur1 INTO accID;
		IF done THEN
			LEAVE l_unassign;
		END IF;
        DELETE FROM BGM_Access WHERE acc_ID=accID;
	END LOOP l_unassign;
    CLOSE cur1;
END;
