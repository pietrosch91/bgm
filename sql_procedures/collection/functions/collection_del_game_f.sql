CREATE FUNCTION `collection_del_game_f`(_gid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE _dummy VARCHAR(200);
    
    IF (collection_test_f(_gid,FALSE)!=1) THEN
        RETURN "Game not found";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    
    SET _dummy = ludo_remove_game_f(_gid,false);
    DELETE FROM BGM_Collection WHERE col_ID=_gid;
    RETURN NULL;
END;
