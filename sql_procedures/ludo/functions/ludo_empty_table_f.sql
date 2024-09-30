CREATE FUNCTION `ludo_empty_table_f`(eid INT,keepshelf BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE _check INT;
    DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
	DECLARE l_id INT;
	DECLARE g_id INT;
    
    DECLARE done INT DEFAULT FALSE;
    DECLARE cur1 CURSOR FOR SELECT ludo_ID FROM BGM_Ludo WHERE ludo_Event_ID=eid;
    DECLARE cur2 CURSOR FOR SELECT col_ID FROM BGM_Collection WHERE col_Event_ID=eid;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    
    IF(event_test_f(eid,TRUE) = 1) THEN
		#delete entries in ludo
        OPEN cur1;
        l_unassign : LOOP
			FETCH cur1 INTO l_id;
            IF done THEN
				LEAVE l_unassign;
			END IF;
            DELETE FROM BGM_Ludo WHERE ludo_ID=l_id;
		END LOOP l_unassign;
        CLOSE cur1;
        
        SET done=false;
        OPEN cur2;
        l_clearcol : LOOP
			FETCH cur2 INTO l_id;
            IF done THEN
				LEAVE l_clearcol;
			END IF;
			IF(keepshelf) THEN
                UPDATE BGM_Collection SET col_Ludo_ID=NULL WHERE col_ID=l_id;
            ELSE
                UPDATE BGM_Collection SET col_OnShelf=0, col_Ludo_ID=NULL WHERE col_ID=l_id;
            END IF;
		END LOOP l_clearcol;
        CLOSE cur2;
        RETURN NULL;
	ELSE
		RETURN "EVENT not Found";
	END IF;
END;
