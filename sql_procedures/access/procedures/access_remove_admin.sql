CREATE PROCEDURE `access_remove_admin` (IN uid INT,IN to_id INT,IN testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
	SET Errmsg=access_remove_admin_f(uid,to_id,testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
		SET Errmsg=CONCAT("access_remove_admin : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
