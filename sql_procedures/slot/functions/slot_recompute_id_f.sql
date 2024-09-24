CREATE FUNCTION `slot_recompute_id_f`(eid INT,slotid INT,newID INT) RETURNS int
DETERMINISTIC
BEGIN
	RETURN slotid-100*eid+100*newID;
END;
