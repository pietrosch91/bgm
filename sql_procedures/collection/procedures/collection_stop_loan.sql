CREATE PROCEDURE `collection_stop_loan`(IN gid INT,IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    DECLARE slotout INT DEFAULT NULL;
    DECLARE docname VARCHAR(200) DEFAULT NULL;
    SELECT slot_compute_num_f(col_Event_ID,col_DocumentSlot),col_DocumentName INTO slotout,docname FROM BGM_Collection WHERE col_ID=gid;
    SET Errmsg=collection_stop_loan_f(gid,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
    ELSE
        SET Errmsg=CONCAT("collection_stop_loan : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg,slotout,docname;
END;
