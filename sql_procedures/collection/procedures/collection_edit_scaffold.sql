CREATE PROCEDURE `collection_edit_scaffold`(IN g_id INT,IN scaff_status INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_edit_scaffold_f(g_id,scaff_status,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_edit_scaffold : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
