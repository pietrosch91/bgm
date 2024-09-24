CREATE PROCEDURE `collection_assign_bggid`(IN g_id INT,IN bggid INT,IN g_mode INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_assign_bggid_f(g_id,bggid,g_mode,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_assign_bggid : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
