CREATE FUNCTION `ludo_recreate_table_f`(eid INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	DECLARE err VARCHAR(200);

	IF(event_test_f(eid,FALSE) !=1) THEN
		RETURN "Event not found";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#operation
	SET err=ludo_empty_table_f(eid);
	IF(err IS NOT NULL) THEN
		RETURN err;
	END IF;
	SET err=ludo_repop_table_f(eid);
	IF(err IS NOT NULL) THEN
		RETURN err;
	END IF;
	RETURN NULL;
END;
