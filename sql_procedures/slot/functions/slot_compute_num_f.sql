CREATE FUNCTION `slot_compute_num_f`(eid INT,slotid INT) RETURNS int
DETERMINISTIC
BEGIN
	RETURN slotid-100*eid;
END;
