CREATE PROCEDURE `collection_start_loan`(IN gid INT, IN gDocName VARCHAR(200), IN _testonly BOOLEAN)
BEGIN
	DECLARE Result INT DEFAULT 0;
    DECLARE Errmsg VARCHAR(200) DEFAULT "Ok";
    DECLARE slotin INT;
    SET Errmsg=collection_start_loan_f(gid,gDocName,_testonly);
    IF(Errmsg IS NULL) THEN
		SET Result=0;
		SELECT slot_compute_num_f(col_Event_ID,col_DocumentSlot) INTO slotin FROM BGM_Collection WHERE col_ID=gid;
	ELSE
        SET slotin=NULL;
        SET Errmsg=CONCAT("collection_start_loan : ",Errmsg);
		SET Result=-1;
	END IF;
    SELECT Result,Errmsg,slotin;
END;
