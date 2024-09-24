CREATE PROCEDURE `access_get_admins` (IN to_id INT)
BEGIN
    SELECT BGM_Access.acc_User_ID AS _id, BGM_Users.usr_Name AS _name FROM BGM_Access LEFT JOIN BGM_Users ON BGM_Access.acc_User_ID = BGM_Users.usr_ID WHERE BGM_Access.acc_To_ID=to_id AND BGM_Access.acc_Level = 30;
END;

