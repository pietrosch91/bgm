CREATE PROCEDURE `directlink_get_name_from_game`(IN g_id INT)
BEGIN
    DECLARE e_id INT DEFAULT NULL;

    SELECT col_Event_ID INTO e_id FROM BGM_Collection WHERE col_ID=g_id;
    IF(e_id IS NULL) THEN
        SELECT e_id AS dlink;
    ELSE
        SELECT ev_DirectLink AS dlink FROM BGM_Events WHERE ev_ID=e_id;
    END IF;
END
