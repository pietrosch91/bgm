CREATE FUNCTION `collection_add_event_game_f`(_title VARCHAR(200),ow_name VARCHAR(200),ev_ID INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE InvNum VARCHAR(10) DEFAULT '###';
    DECLARE gNUM INT;
    IF (event_test_f(ev_ID,FALSE)!=1) THEN
        RETURN "Event not found";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #actual operation
    INSERT INTO BGM_Collection (col_Owner_Name,col_ShowName,col_Inventory,col_Event_ID) VALUES (ow_name,_title,InvNum,ev_ID);
    RETURN NULL;
END;
