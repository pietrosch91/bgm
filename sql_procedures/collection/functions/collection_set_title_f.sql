CREATE FUNCTION `collection_set_title_f`(_id INT,_title VARCHAR(200),_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    IF (collection_test_f(_id,FALSE)!=1) THEN
        RETURN "Game not found";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    UPDATE BGM_Collection SET col_ShowName=_title WHERE col_ID=_id;
    RETURN NULL;
END;
