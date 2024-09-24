CREATE PROCEDURE `directlink_set_link`(IN _id INT,IN dlink TEXT,IN _testonly BOOLEAN)
BEGIN
    DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    SET Errmsg=directlink_set_link_f(_id,dlink,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("directlink_set_link : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
