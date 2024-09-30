CREATE PROCEDURE `directlink_get_id`(IN dlink TEXT)
BEGIN
    DECLARE _id INT DEFAULT NULL;

    SELECT ev_ID INTO _id FROM BGM_Events WHERE ev_Enabled=1 AND ev_DirectLink=dlink AND ev_Visible=1;
    IF(_id IS NULL) THEN
        SELECT ass_ID INTO _id FROM BGM_Assoc WHERE ass_Enabled=1 AND ass_DirectLink=dlink AND ass_Visible=1;
    END IF;
    SELECT _id;
END;
