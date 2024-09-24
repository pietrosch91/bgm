CREATE PROCEDURE `user_get_event_list`(IN uid INT)
BEGIN
    DECLARE su INT;
     
	IF(user_test_f(uid,FALSE)=1) THEN
		SET su= user_is_super_f(uid);
        IF (SU = 1)THEN
			SELECT ev_Name,ev_ID FROM BGM_Events ORDER BY ev_Name;
		ELSE
			SELECT event_get_name_f(acc_To_ID) AS ev_Name, acc_To_ID AS ev_ID FROM BGM_Access WHERE acc_Enabled=1 AND acc_User_ID=uid AND acc_To_ID >0 AND acc_Level>0 ORDER BY event_get_name_f(acc_To_ID);
		END IF;
    END IF;
END;
