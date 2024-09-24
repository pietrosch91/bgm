CREATE PROCEDURE `association_reassign_id`(IN aid INT,IN newID INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=association_reassign_id_f(aid,newID,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("association_reassign_id : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
