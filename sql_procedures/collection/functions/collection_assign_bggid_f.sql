CREATE FUNCTION `collection_assign_bggid_f`(g_id INT,bggid INT,g_mode INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE onshelf INT;
    IF(collection_test_f(g_id,FALSE)!=1) THEN
        RETURN "Collection Entry not Found";
    END IF;
    IF (bggid<=0 ) THEN
        RETURN "Invalid BGGID";
    END IF;
    IF (g_mode<1 OR g_mode >3) THEN
        RETURN "Invalid BGGID MODE";
    END IF;
    SELECT col_OnShelf INTO onshelf FROM BGM_Collection WHERE col_ID=g_id;
    IF(onshelf=1) THEN
        RETURN "Game must be OFF the shelf";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #ACTUAL Op
    UPDATE BGM_Collection SET col_BGGID=bggid , col_Assig_type=g_mode WHERE col_ID=g_id;
    RETURN NULL;
END;
