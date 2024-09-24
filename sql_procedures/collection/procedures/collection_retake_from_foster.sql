CREATE PROCEDURE `collection_retake_from_foster`(IN _g_id INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_retake_from_foster_f(_g_id,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_retake_from_foster : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
