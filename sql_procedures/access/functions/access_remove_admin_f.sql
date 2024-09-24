CREATE FUNCTION access_remove_admin_f(uid INT,to_id INT,testonly BOOLEAN) RETURNS VARCHAR(200)
        MODIFIES SQL DATA
BEGIN
    DECLARE ulev INT DEFAULT 0;
    DECLARE DUMMY VARCHAR(200);

    SET ulev=user_get_access_level_f(uid,to_id);
    IF (ulev<30) THEN
        RETURN "USER is not Admin";
    END IF;
    IF(testonly) THEN
        RETURN NULL;
    END IF;
    SET DUMMY = user_set_privileges_f(uid,to_id,20,false);
    RETURN NULL;
END
