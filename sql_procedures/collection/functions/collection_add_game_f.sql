CREATE FUNCTION `collection_add_game_f`(_title VARCHAR(200),ow_ID INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE InvNum VARCHAR(10) DEFAULT NULL;
    DECLARE gNUM INT;
    IF (owner_test_f(ow_ID,FALSE)!=1) THEN
        RETURN "Owner not found";
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    #actual operation
    IF (ow_ID > 0) THEN #usr game
        SET gNUM = user_get_games_f(ow_ID);
		SET InvNum = CONCAT( user_get_code_f(ow_ID),'-',gNUM);
        UPDATE BGM_Users SET usr_Games = gNUM WHERE usr_ID=ow_ID;
        INSERT INTO BGM_Collection (col_Owner_ID,col_ShowName,col_Inventory) VALUES (ow_ID,_title,InvNum);
    ELSE
        SET gNUM = association_get_games_f(ow_ID);
        SET InvNum = CONCAT(association_get_code_f(ow_ID),'-',gNUM);
        UPDATE BGM_Assoc SET ass_Games = gNUM WHERE ass_ID=ow_ID;
        INSERT INTO BGM_Collection (col_Owner_ID,col_ShowName,col_Inventory) VALUES (ow_ID,_title,InvNum);
    END IF;
    RETURN NULL;
END;
