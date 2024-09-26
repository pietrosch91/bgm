CREATE PROCEDURE `collection_set_title`(IN g_id INT,IN g_title VARCHAR(200),IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_set_title_f(g_id,g_title,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_set_title : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
