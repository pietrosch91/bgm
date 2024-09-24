CREATE PROCEDURE `user_get_association_list`(IN uid INT)
BEGIN
    DECLARE su INT;

	IF(user_test_f(uid,FALSE)=1) THEN
		SET su= user_is_super_f(uid);
        IF (SU = 1)THEN
			SELECT ass_Name,ass_ID FROM BGM_Assoc ORDER BY ass_Name;
		ELSE
			SELECT association_get_name_f(acc_To_ID) AS ass_Name,acc_To_ID AS ass_ID FROM BGM_Access WHERE acc_Enabled=1 AND acc_User_ID=uid AND acc_To_ID <0 AND acc_Level>0 ORDER BY association_get_name_f(acc_To_ID);
		END IF;
    END IF;
END;
