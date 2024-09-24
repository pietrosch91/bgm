CREATE PROCEDURE `collection_send_to_event`(IN _g_id INT,IN _ev_id INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT 'Ok';
    SET Errmsg=collection_send_to_event_f(_g_id,_ev_id,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
	ELSE
        SET Errmsg=CONCAT("collection_send_to_event : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg;
END;
