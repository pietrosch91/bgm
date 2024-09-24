CREATE PROCEDURE `access_count_admins` (IN to_id INT)
BEGIN
    SELECT COUNT(*) AS Result FROM BGM_Access WHERE acc_To_ID=to_id AND acc_Level = 30;
END;
