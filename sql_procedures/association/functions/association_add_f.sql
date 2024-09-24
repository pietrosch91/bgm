CREATE FUNCTION `association_add_f`(_name VARCHAR(200),_code VARCHAR(3),_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE nass INT;
    DECLARE newID INT;

    #TEST IF ASSOCIATION exists
    SELECT COUNT(*) INTO nass FROM BGM_Assoc WHERE ass_Name=_name;
    IF(nass != 0) THEN #ALREADY PRESENT
		RETURN "ASSOCIATION already Present";
	END IF;
    #TEST IF CODE IS USED
    SET nass=owner_find_code_f(_code);
    IF(nass !=0) THEN #ALREADY PRESENT
		RETURN "CODE already Used";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#ACTUAL OPERATION
	SELECT MIN(ass_ID) INTO newID FROM BGM_Assoc;
	IF(newID IS NULL) THEN
		SET newID=0;
	END IF;
    SET newID=newID-1;
	INSERT INTO BGM_Assoc (ass_ID,ass_Name,ass_Mail,ass_Phone,ass_Code,ass_Site) VALUES (newID,_name,'','',_code,'');
	RETURN NULL;
END;
