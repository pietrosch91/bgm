CREATE PROCEDURE `association_delete`(IN _aid INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=association_delete_f(_aid,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("association_delete : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
