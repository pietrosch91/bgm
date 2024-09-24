CREATE PROCEDURE `collection_test_nonbgg_data`(IN gid INT,IN gtitle VARCHAR(200))
BEGIN
	DECLARE Result INT;
    DECLARE Errmsg VARCHAR(200) Default "Ok";
	DECLARE gBGGID INT;
    DECLARE id_Found INT DEFAULT 0;

	IF(collection_test_f(gid,FALSE)=1) THEN
		SELECT info_BGGID INTO gBGGID FROM BGM_Infos WHERE info_Title=gtitle AND info_BGGID<0 LIMIT 1;
        IF (gBGGID IS NOT NULL) THEN
			UPDATE BGM_Collection SET col_BGGID = gBGGID , col_Assig_type = 4 WHERE col_ID = gid;
            SET id_Found=1;
        END IF;
	ELSE
		SET Result=-1;
        SET Errmsg="collection_test_nonbgg_data : Collection Entry not found";
	END IF;
    SELECT Result,Errmsg,id_Found;
END;
