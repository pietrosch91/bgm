CREATE PROCEDURE `collection_add_game`(IN _g_title VARCHAR(200),IN ow_ID INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_add_game_f(_g_title,ow_ID,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_add_game : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
