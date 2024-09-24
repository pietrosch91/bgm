CREATE FUNCTION `owner_test_f` (_id INT,_f_all BOOLEAN) RETURNS INT
	READS SQL DATA
BEGIN
	DECLARE res INT DEFAULT NULL;
	IF (_id IS NULL) THEN
		RETURN 0;
	END IF;
    IF (_id>0) THEN
		RETURN user_test_f(_id,_f_all);
	ELSE
		RETURN association_test_f(_id,_f_all);
	END IF;
    RETURN res;
END;
