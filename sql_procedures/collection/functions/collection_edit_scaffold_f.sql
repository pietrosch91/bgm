CREATE FUNCTION `collection_edit_scaffold_f`(g_id INT,target_status INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE eid INT;
    DECLARE current_status INT;
    DECLARE errmsg VARCHAR(200);
    IF(collection_test_f(g_id,FALSE)!=1) THEN
        RETURN "Collection Entry not Found";
    END IF;
    SELECT col_Event_ID,col_OnShelf INTO eid,current_status FROM BGM_Collection WHERE col_ID=g_id;
    IF (eid IS NULL) THEN
        RETURN "Game is not part of any event";
    END IF;
    IF(event_test_f(eid,FALSE)!=1) THEN
        RETURN "Game Event not found";
    END IF;
    IF (current_status = target_status) THEN
        RETURN "Game is already in the desired state";
    END IF;
    IF (_testonly) THEN
        RETURN NULL;
    END IF;
    #actual operation
    UPDATE BGM_Collection SET col_OnShelf=target_status WHERE col_ID=g_id;
    IF (target_status=1) THEN
        RETURN ludo_add_game_f(g_id,false);
    ELSE
        RETURN ludo_remove_game_f(g_id,false);
    END IF;
    RETURN NULL;
END;
