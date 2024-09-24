CREATE PROCEDURE `access_get_abilitated_users` (IN to_id INT)
BEGIN
	SELECT usr_Name, usr_ID, user_get_access_level_f(usr_ID,to_id) AS usr_Access FROM BGM_Users WHERE usr_ID > 0 AND  usr_Enabled=1 ORDER BY usr_Name;
END;


