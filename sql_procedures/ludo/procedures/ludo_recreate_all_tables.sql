CREATE PROCEDURE `ludo_recreate_all_tables`()
BEGIN
	DECLARE eid INT;
	DECLARE dummy VARCHAR(200);

	DECLARE done INT DEFAULT FALSE;
    DECLARE cur2 CURSOR FOR SELECT ev_ID FROM BGM_Events WHERE ev_Enabled=1;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;

    OPEN cur2;
    l_recreate: LOOP
		FETCH cur2 INTO eid;
		IF done THEN
			LEAVE l_recreate;
		END IF;
        SET dummy=ludo_recreate_table_f(eid,FALSE);
	END LOOP l_recreate;
    CLOSE cur2;
END;
