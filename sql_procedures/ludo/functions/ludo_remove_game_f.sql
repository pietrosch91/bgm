CREATE FUNCTION `ludo_remove_game_f`(g_id INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE g_bggid INT;
    DECLARE g_title VARCHAR(200);
    DECLARE g_event INT;
    DECLARE g_avail INT;
    DECLARE g_ludo INT;

    DECLARE l_id INT DEFAULT NULL;
    DECLARE l_count INT;
    DECLARE l_av INT;

	IF(collection_test_f(g_id,FALSE)!=1) THEN
		RETURN "Collection Entry not found";
	END IF;
	SELECT col_BGGID,col_ShowName,col_Event_ID,col_AVAILABILITY,col_Ludo_ID INTO g_bggid,g_title,g_event,g_avail,g_ludo FROM BGM_Collection WHERE col_ID=g_id;
	IF(event_test_f(g_event,FALSE)!=1) THEN
		RETURN "Game Event not found";
	END IF;
	IF(g_ludo IS  NULL) THEN
		RETURN "Game not assigned to Shelf";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#operation
	#unlink game
	UPDATE BGM_Collection SET col_Ludo_ID=NULL WHERE col_ID=g_id;
	#recover L_ID if present
	IF(g_bggid>0) THEN #good case: bggid is >0
		SELECT ludo_ID INTO l_id FROM BGM_Ludo WHERE ludo_Event_ID=g_event AND ludo_BGGID=g_bggid;
	ELSE
		SELECT ludo_ID INTO l_id FROM BGM_Ludo WHERE ludo_Event_ID=g_event AND ludo_Title=g_title;
	END IF;
	IF(l_id IS NOT NULL) THEN
		#increase the total availability and actual
		SELECT ludo_Count,ludo_Availability INTO l_count,l_av FROM BGM_Ludo WHERE ludo_ID=l_id;
		SET l_count=l_count-1;
        IF(l_count<0) THEN
			SET l_count=0;
		END IF;
        SET l_av=l_av-g_avail;
		IF(l_av<0) THEN
			SET l_av=0;
		END IF;
		IF (l_count = 0 ) THEN
			DELETE FROM BGM_Ludo WHERE ludo_ID=l_id;
		ELSE
			UPDATE BGM_Ludo SET ludo_Count=l_count, ludo_Availability=l_av WHERE ludo_ID=l_id;
		END IF;
	END IF;
	RETURN NULL;
END;
