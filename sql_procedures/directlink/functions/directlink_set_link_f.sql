CREATE FUNCTION `directlink_set_link_f`(_id INT,dlink TEXT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
    DECLARE cdl INT DEFAULT 0;

    #VERIFY EXISTENCE
    IF(_id>0) THEN
        IF(event_test_f(_id,FALSE)!=1) THEN
            RETURN "Event not found";
        END IF;
    ELSE
        IF(association_test_f(_id,FALSE)!=1) THEN
            RETURN "Association not found";
        END IF;
    END IF;
    #VERIFY unicity
    IF(dlink IS NOT NULL) THEN
        SELECT COUNT(*) INTO cdl FROM BGM_Assoc WHERE ass_DirectLink = dlink;
        IF(cdl != 0) THEN
            RETURN "Link already used";
        END IF;
        SELECT COUNT(*) INTO cdl FROM BGM_Events WHERE ev_DirectLink = dlink;
        IF(cdl != 0) THEN
            RETURN "Link already used";
        END IF;
    END IF;
    IF(_testonly) THEN
        RETURN NULL;
    END IF;
    IF(_id>0) THEN
        UPDATE BGM_Events SET ev_DirectLink=dlink WHERE ev_ID=_id;
    ELSE
        UPDATE BGM_Assoc SET ass_DirectLink=dlink WHERE ass_ID=_id;
    END IF;
    RETURN NULL;
END;
