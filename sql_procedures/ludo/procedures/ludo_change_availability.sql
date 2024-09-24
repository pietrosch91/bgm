CREATE PROCEDURE `ludo_change_availability`(IN l_id INT,IN variation INT)
BEGIN
	DECLARE cont INT;

	IF(ludo_test_f(l_id)=1) THEN
		SELECT ludo_Availability INTO cont FROM BGM_Ludo WHERE ludo_ID=l_id;
		SET cont=cont+variation;
		IF(cont<0) THEN
			SET cont=0;
		END IF;
		UPDATE BGM_Ludo SET ludo_Availability=cont WHERE ludo_ID=l_id;
	END IF;
END;
