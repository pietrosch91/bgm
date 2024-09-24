CREATE PROCEDURE `user_get_id` (IN q_name VARCHAR(200))
BEGIN
	DECLARE Result INT;
	DECLARE Errmsg VARCHAR(200);
	DECLARE UID INT DEFAULT NULL;
	SET UID=user_get_id_f(q_name);
	IF(UID IS NULL) THEN
		SET Result=-1;
		SET Errmsg="User not found";
	ELSE
		SET Result=0;
		SET Errmsg="";
	END IF;
	SELECT Result,Errmsg,UID AS usr_ID;
END;
