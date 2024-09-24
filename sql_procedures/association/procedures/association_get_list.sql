CREATE PROCEDURE `association_get_list`(IN _excl INT,IN f_all BOOLEAN)
BEGIN
	DECLARE h_excl INT;
	SET h_excl=_excl;
	IF(h_excl IS NULL) THEN
		SET h_excl=0;
	END IF;
	IF(f_all) THEN
		SELECT ass_Name,ass_ID FROM BGM_Assoc WHERE ass_ID!=h_excl ORDER BY ass_Name;
	ELSE
		SELECT ass_Name,ass_ID FROM BGM_Assoc WHERE ass_Enabled=1 AND ass_ID!=h_excl ORDER BY ass_Name;
	END IF;
END;
