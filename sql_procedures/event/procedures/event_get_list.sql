CREATE PROCEDURE `event_get_list`(IN f_all BOOLEAN)
BEGIN
	IF(f_all) THEN
		SELECT ev_Name,ev_ID FROM BGM_Events ORDER BY ev_Name;
	ELSE
		SELECT ev_Name,ev_ID FROM BGM_Events WHERE ev_Enabled=1 ORDER BY ev_Name;
	END IF;
END;
