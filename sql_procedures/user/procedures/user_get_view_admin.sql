CREATE PROCEDURE `user_get_view_admin`()
BEGIN
	SELECT usr_ID,usr_Name,usr_Code,usr_Enabled FROM BGM_Users WHERE usr_ID>0 ORDER BY usr_Name;
END;
