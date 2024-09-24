CREATE FUNCTION `association_get_games_f`(aID INT) RETURNS INT
	READS SQL DATA
BEGIN
	DECLARE Res INT DEFAULT NULL;
	IF(association_test_f(aID,TRUE)!=1) THEN
		RETURN NULL;
	END IF;
	SELECT ass_Games INTO Res FROM BGM_Assoc WHERE ass_ID=aID;
    SET Res=Res+1;
    RETURN Res;
END;
