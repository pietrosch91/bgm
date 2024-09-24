CREATE FUNCTION `collection_test_f` (q_id INT,f_all BOOLEAN) RETURNS INT
	READS SQL DATA
BEGIN
	DECLARE Result INT DEFAULT NULL;
    IF(q_id IS NULL) THEN
        RETURN 0;
    END IF;
    IF (f_all) THEN
        SELECT COUNT(*) INTO Result FROM BGM_Collection WHERE col_ID=q_id;
    ELSE
        SELECT COUNT(*) INTO Result FROM BGM_Collection WHERE col_ID=q_id AND col_Enabled=1;
    END IF;
    RETURN Result;
END;
