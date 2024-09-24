CREATE FUNCTION `association_set_info_f`(_aid INT,_phone VARCHAR(20),_mail TEXT,_site TEXT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	IF(association_test_f(_aid,FALSE)!=1) THEN
		RETURN "ASSOCIATION not Present";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	UPDATE BGM_Assoc SET ass_Mail=_mail , ass_Phone=_phone , ass_Site=_site WHERE ass_ID=_aid;
	RETURN NULL;
END;
