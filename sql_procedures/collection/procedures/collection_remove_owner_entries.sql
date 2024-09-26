CREATE PROCEDURE `collection_remove_owner_entries`(IN _oid INT)
BEGIN
	DECLARE done INT DEFAULT FALSE;
	DECLARE colID INT;
	DECLARE _dummy VARCHAR(200);
	DECLARE cur1 CURSOR FOR SELECT col_ID FROM BGM_Collection WHERE col_Owner_ID=_oid;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

	OPEN cur1;
    l_unassign : LOOP
		FETCH cur1 INTO colID;
		IF done THEN
			LEAVE l_unassign;
		END IF;
	SET _dummy = ludo_remove_game_f(colID,false);
        DELETE FROM BGM_Collection WHERE col_ID=colID;
	END LOOP l_unassign;
    CLOSE cur1;
END;
