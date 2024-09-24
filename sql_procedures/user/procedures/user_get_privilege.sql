CREATE PROCEDURE `user_get_privilege`(IN uid INT,IN to_id INT)
BEGIN
	DECLARE l_access INT DEFAULT 0;

    SET l_access = user_get_privilege_f(uid,to_id);
    SELECT l_access;
END;
