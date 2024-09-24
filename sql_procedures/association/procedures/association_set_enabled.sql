CREATE PROCEDURE `association_set_enabled`(IN _aid INT,IN _ena INT,IN _testonly INT)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=association_set_enabled_f(_aid,_ena,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE 
		SET Errmsg=CONCAT("association_set_enabled : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
