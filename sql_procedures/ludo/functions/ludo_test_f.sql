CREATE FUNCTION `ludo_test_f`(l_id INT) RETURNS INT
	READS SQL DATA
BEGIN
	DECLARE Result INT DEFAULT NULL;
	SELECT COUNT(*) INTO Result FROM BGM_Ludo WHERE ludo_ID=l_id;
	RETURN Result;
END;
