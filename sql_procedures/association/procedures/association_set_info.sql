CREATE PROCEDURE `association_set_info`(IN _aid INT,IN _phone VARCHAR(20),IN _mail TEXT,IN _site TEXT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=association_set_info_f(_aid,_phone,_mail,_site,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("association_set_info : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
