CREATE FUNCTION `association_set_visible_f`(_aid INT,_vis INT,_testonly INT) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE vis_R INT DEFAULT 1;
    IF( _vis = 0 ) THEN
		SET vis_R = 0;
	END IF;

    IF (association_test_f(_aid,FALSE)!=1) THEN
		RETURN "ASSOCIATION not found";
	END IF;
	IF(_testonly=1) THEN
		RETURN NULL;
	END IF;
    #do the operation
    UPDATE BGM_Assoc SET ass_Visible=vis_R WHERE ass_ID = _aid;
	RETURN NULL;
END;
