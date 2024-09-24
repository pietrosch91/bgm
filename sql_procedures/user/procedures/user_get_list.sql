CREATE PROCEDURE `user_get_list`(IN _excl INT,IN f_all BOOLEAN)
BEGIN
	DECLARE h_excl INT;
	SET h_excl=_excl;
	IF(h_excl IS NULL) THEN
		SET h_excl=0;
	END IF;

	IF(f_all) THEN
		SELECT usr_Name,usr_ID FROM BGM_Users WHERE usr_ID!=h_excl AND usr_ID>0 ORDER BY usr_Name;
	ELSE
		SELECT usr_Name,usr_ID FROM BGM_Users WHERE usr_Enabled=1 AND usr_ID!=h_excl AND usr_ID>0 ORDER BY usr_Name;
	END IF;
END;
