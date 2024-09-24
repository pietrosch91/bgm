CREATE PROCEDURE `user_get_info`(IN _uid INT)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    DECLARE _Name varchar(200) DEFAULT NULL;
	DECLARE _Mail TEXT DEFAULT NULL;
	DECLARE _Phone varchar(20) DEFAULT NULL;
    DECLARE _Code varchar(3) DEFAULT NULL;
	DECLARE _Pwd varchar(64) DEFAULT NULL;
    DECLARE _Enabled tinyint DEFAULT 1;

    #TEST IF USER exists
    IF(user_test_f(_uid,FALSE)!=1) THEN #NOT PRESENT
		SET Result=-1;
        SET Errmsg="user_get_info : USER not Present";
	ELSE
		SELECT usr_Name,usr_Mail,usr_Phone,usr_Code,usr_Pwd,usr_Enabled INTO _Name,_Mail,_Phone,_Code,_Pwd,_Enabled FROM BGM_Users WHERE usr_ID=_uid;
	END IF;
	SELECT Result,Errmsg,_Name,_Mail,_Phone,_Code,_Pwd,_Enabled,_uid AS _ID;
END;
