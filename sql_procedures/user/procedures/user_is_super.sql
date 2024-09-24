CREATE PROCEDURE `user_is_super` (IN uid INT)
BEGIN
	DECLARE Result INT;
    SET Result = user_is_super_f(uid);
    SELECT Result;
END;
