CREATE PROCEDURE `association_get_info`(IN _id INT)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    DECLARE _Name varchar(200) DEFAULT NULL;
	DECLARE _Mail TEXT DEFAULT NULL;
    DECLARE _Site TEXT DEFAULT NULL;
	DECLARE _Phone varchar(20) DEFAULT NULL;
    DECLARE _Code varchar(3) DEFAULT NULL;
	DECLARE _Enabled tinyint DEFAULT '1';
    
    
    #TEST IF ASSOC exists
    IF(association_test_f(_id,FALSE) = 0) THEN #NOT PRESENT
		SET Result=-1;
        SET Errmsg="association_get_info : ASSOCIATION not Present";
	ELSE
		SELECT ass_Name,ass_Mail,ass_Phone,ass_Code,ass_Enabled,ass_Site INTO _Name,_Mail,_Phone,_Code,_Enabled,_Site FROM BGM_Assoc WHERE ass_ID=_id;
	END IF;
	SELECT Result,Errmsg,_Name,_Mail,_Phone,_Site,_Code,_Enabled;
END;
