CREATE FUNCTION `collection_retake_from_foster_f`(_g_id INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE g_foster INT;
    IF(collection_test_f(_g_id,FALSE)!=1) THEN
        RETURN "Collection Entry Not Found";
    END IF;
    SELECT col_Foster_ID INTO g_foster FROM BGM_Collection WHERE col_ID=_g_id;
    IF(g_foster IS NULL) THEN
        RETURN "Game is not fostered";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #ACTUAL OPERATION
    UPDATE BGM_Collection SET col_Foster_ID=NULL WHERE col_ID=_g_id;
    RETURN NULL;
END;
