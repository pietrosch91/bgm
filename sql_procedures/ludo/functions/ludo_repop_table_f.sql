CREATE FUNCTION `ludo_repop_table_f`(eid INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE _check INT;
    DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
	DECLARE _partial VARCHAR(200) DEFAULT "Ok";
	DECLARE g_id INT;
    
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur2 CURSOR FOR SELECT col_ID FROM BGM_Collection WHERE col_Event_ID=eid AND col_Enabled=1 AND col_OnShelf=1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    IF(event_test_f(eid,TRUE) = 1) THEN
		OPEN cur2;
        l_reassign : LOOP
			FETCH cur2 INTO g_id;
            IF done THEN
				LEAVE l_reassign;
			END IF;
            SET _partial=ludo_add_game_f(g_id,FALSE);
		END LOOP;
        CLOSE cur2;
        RETURN NULL;
	ELSE
		RETURN "EVENT not Found";
	END IF;
END;
