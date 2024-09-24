CREATE PROCEDURE `event_get_info`(IN _eid INT)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    DECLARE _Name varchar(200) DEFAULT NULL;
	DECLARE _Link TEXT DEFAULT NULL;
	DECLARE _Enabled tinyint DEFAULT NULL;
    DECLARE _Visible tinyint DEFAULT NULL;
    DECLARE _Lock tinyint DEFAULT NULL;

    #TEST IF EVENT exists
    IF(event_test_f(_eid,FALSE) = 0) THEN #NOT PRESENT
		SET Result=-1;
		SET Errmsg="event_get_info : EVENT not Present";
	ELSE
		SELECT ev_Name,ev_Link,ev_Enabled,ev_Visible,ev_Lock_Games INTO _Name,_Link,_Enabled,_Visible,_Lock FROM BGM_Events WHERE ev_ID=_eid;
	END IF;
	SELECT Result,Errmsg,_Name,_Link,_Enabled,_Visible,_Lock;
END;
