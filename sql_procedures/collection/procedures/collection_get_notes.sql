CREATE PROCEDURE `collection_get_notes`(IN q_id INT)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE _check INT;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    DECLARE Notes TEXT DEFAULT NULL;

    SET _check=collection_test_f(q_id,FALSE);
    IF (_check = 1) THEN
		SELECT col_Note INTO Notes FROM BGM_Collection WHERE col_ID=q_id;
		IF(Notes IS NULL) THEN
            SET Notes='';
        END IF;
    ELSE
		SET Result=-1;
        SET Errmsg="collection_get_notes : Collection Entry not found";
	END IF;
    SELECT Result,Errmsg,Notes;
END;
