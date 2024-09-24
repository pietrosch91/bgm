CREATE PROCEDURE `collection_append_notes`(IN q_id INT,IN newnotes TEXT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_edit_note_f(q_id,newnotes,TRUE,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_append_notes : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
