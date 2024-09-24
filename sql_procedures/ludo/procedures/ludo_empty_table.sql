CREATE PROCEDURE `ludo_empty_table`(IN eid INT)
BEGIN
	DECLARE DUMMY VARCHAR(200);
	SET DUMMY=ludo_empty_table_f(eid);
END;
