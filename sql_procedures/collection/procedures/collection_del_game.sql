CREATE PROCEDURE `collection_del_game`(IN gid INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_del_game_f(gid,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_del_game : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
