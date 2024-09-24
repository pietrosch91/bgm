CREATE FUNCTION `slot_compute_id_f`(eid INT,slotnum INT) RETURNS int
DETERMINISTIC
BEGIN
	RETURN 100*eid+slotnum;
END;
