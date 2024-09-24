CREATE FUNCTION `collection_edit_note_f`(g_id INT,newnotes TEXT,append BOOLEAN,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE notes TEXT;

    IF(collection_test_f(g_id,FALSE)!=1) THEN
        RETURN "Collection Entry not Found";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #actual operation
    IF (append) THEN
        SELECT col_Note INTO notes FROM BGM_Collection WHERE col_ID=g_id;
        IF(notes IS NULL) THEN
            SET notes=newnotes;
        ELSE
            SET notes=CONCAT(notes,"\n",newnotes);
        END IF;
    ELSE
        SET notes=newnotes;
    END IF;
    UPDATE BGM_Collection SET col_Note=notes WHERE col_ID=g_id;
    RETURN NULL;
END;
