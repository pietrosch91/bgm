CREATE PROCEDURE `ludo_add_game`(IN g_id INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=ludo_add_game_f(g_id,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("ludo_add_game : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
