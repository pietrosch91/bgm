CREATE FUNCTION `collection_send_to_foster_f`(_g_id INT,_f_id INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE g_owner INT;
    DECLARE g_foster INT;

    IF(owner_test_f(_f_id,FALSE)!=1) THEN
        RETURN "Foster not found";
    END IF;
    IF(collection_test_f(_g_id,FALSE)!=1) THEN
        RETURN "Collection Entry Not Found";
    END IF;
    SELECT col_Owner_ID,col_Foster_ID INTO g_owner,g_foster FROM BGM_Collection WHERE col_ID=_g_id;
    IF (g_owner = _f_id) THEN
        RETURN "Unable to foster game to its Owner";
    END IF;
    IF(g_foster IS NOT NULL) THEN
        RETURN "Game is already fostered";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #ACTUAL OPERATION
    UPDATE BGM_Collection SET col_Foster_ID=_f_id WHERE col_ID=_g_id;
    RETURN NULL;
END;
