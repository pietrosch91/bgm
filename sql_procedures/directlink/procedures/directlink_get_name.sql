CREATE PROCEDURE `directlink_get_name`(IN _id INT)
BEGIN
    IF(_id>0) THEN
        SELECT ev_DirectLink AS dlink FROM BGM_Events WHERE ev_ID=_id;
    ELSE
        SELECT ass_DirectLink AS dlink FROM BGM_Assoc WHERE ass_ID=_id;
    END IF;
END
