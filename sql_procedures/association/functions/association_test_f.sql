CREATE FUNCTION `association_test_f` (q_id INT,f_all BOOLEAN) RETURNS INT
	READS SQL DATA
BEGIN
	DECLARE Result INT DEFAULT NULL;
	IF (f_all) THEN
		SELECT COUNT(*) INTO Result FROM BGM_Assoc WHERE ass_ID=q_id;
	ELSE
		SELECT COUNT(*) INTO Result FROM BGM_Assoc WHERE ass_ID=q_id AND ass_Enabled=1;
	END IF;
    RETURN Result;
END;
