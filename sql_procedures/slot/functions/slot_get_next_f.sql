CREATE FUNCTION `slot_get_next_f`(eid INT) RETURNS INT
READS SQL DATA
BEGIN
	DECLARE slot INT;

    DECLARE count INT;
    IF (event_test_f(eid,false)!=1) THEN
		RETURN NULL;
	END IF;
	SELECT MIN(slot_Occupancy) INTO count FROM BGM_Slots WHERE slot_Event = eid;
    SELECT slot_Number INTO slot FROM BGM_Slots WHERE slot_Occupancy=count ORDER BY slot_Number LIMIT 1;
    RETURN slot;
END;
