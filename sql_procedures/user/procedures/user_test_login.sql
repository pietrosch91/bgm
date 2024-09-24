CREATE PROCEDURE `user_test_login`(IN uname VARCHAR(200),IN pwd VARCHAR(64))
BEGIN
	DECLARE Result INT;
	DECLARE Errmsg VARCHAR(200);
	DECLARE upwd VARCHAR(64);
	DECLARE uid INT DEFAULT NULL;
	SET uid=user_get_id_f(uname);
	IF (uid IS NULL) THEN
		SET Result=-1;
		SET Errmsg="user not found";
	ELSE
		SELECT usr_Pwd INTO upwd FROM BGM_Users WHERE usr_ID=uid;
		IF(STRCMP(upwd,pwd)= 0 ) THEN
			SET Result=0;
			SET Errmsg=NULL;
		ELSE
			SET Result=-1;
			SET Errmsg="password is incorrect";
		END IF;
	END IF;
	SELECT Result,Errmsg,uid;
END;
