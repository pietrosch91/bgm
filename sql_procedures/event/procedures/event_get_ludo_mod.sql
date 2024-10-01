CREATE PROCEDURE `event_get_ludo_mod`(IN _ev_id INT)
BEGIN
    DECLARE result INT DEFAULT NULL;
    SELECT ev_LudoMod INTO result FROM BGM_Events WHERE ev_ID=_ev_id;
    SELECT result AS reload;
END
