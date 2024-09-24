CREATE PROCEDURE `association_get_visible`(in _aid INT)
BEGIN
	DECLARE Result INT DEFAULT 0;
	IF (association_test_f(_aid,FALSE)=1) THEN
		SELECT ass_Visible INTO Result FROM BGM_Assoc WHERE ass_id=_aid;
	END IF;
	SELECT Result;
END;
