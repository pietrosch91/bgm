CREATE PROCEDURE `slot_change_content`(IN s_id INT,IN variation INT)
BEGIN
	DECLARE cont INT;
	IF(slot_test_f(s_id)=1) THEN
		SELECT slot_Occupancy INTO cont FROM BGM_Slots WHERE slot_ID=s_id;
		SET cont=cont+variation;
		IF(cont<0) THEN
			SET cont=0;
		END IF;
		UPDATE BGM_Slots SET slot_Occupancy=cont WHERE slot_ID=s_id;
	END IF;
END;
