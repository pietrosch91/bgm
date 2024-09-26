CREATE PROCEDURE `event_ack_mod`(IN ev_id INT)
BEGIN
    UPDATE BGM_Events SET ev_LudoMod=0 WHERE ev_ID=ev_id;
    SELECT NULL AS result;
END
