CREATE FUNCTION `ludo_add_entry_f`(g_bggid INT,g_title VARCHAR(200),g_event INT) RETURNS INT
	MODIFIES SQL DATA
BEGIN
	DECLARE l_id INT DEFAULT NULL;
    INSERT INTO BGM_Ludo (ludo_BGGID,ludo_Title,ludo_Event_ID) VALUES (g_bggid,g_title,g_event);
	IF(g_bggid IS NULL) THEN
		SELECT ludo_ID INTO l_id FROM BGM_Ludo WHERE ludo_BGGID IS NULL AND ludo_Event_ID=g_event AND ludo_Title=g_title;
	ELSE
		SELECT ludo_ID INTO l_id FROM BGM_Ludo WHERE ludo_BGGID=g_bggid AND ludo_Event_ID=g_event AND ludo_Title=g_title;
	END IF;
	RETURN l_id;
END;
