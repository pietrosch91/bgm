CREATE FUNCTION `user_add_f`(_name VARCHAR(200),_code VARCHAR(3),_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE nusr INT;
    DECLARE newID INT;

    #TEST IF USER exists
    SELECT COUNT(*) INTO nusr FROM BGM_Users WHERE usr_Name=_name;
    IF(nusr != 0) THEN #ALREADY PRESENT
		RETURN "USER already Present";
	END IF;
    #TEST IF CODE IS USED
    SET nusr=owner_find_code_f(_code);
    IF(nusr !=0) THEN #ALREADY PRESENT
		RETURN "CODE already Used";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
	#ACTUAL OPERATION
	SELECT MAX(usr_ID) INTO newID FROM BGM_Users WHERE usr_ID>0;
	IF(newID IS NULL) THEN
		SET newID=0;
	END IF;
	SET newID=newID+1;
	INSERT INTO BGM_Users (usr_ID,usr_Name,usr_Mail,usr_Phone,usr_Code,usr_Pwd) VALUES (newID,_name,'','',_code,'');
	RETURN NULL;
END;
