CREATE PROCEDURE `collection_set_nonbgg_data`(IN gid INT,IN gtitle VARCHAR(200),IN g_pl VARCHAR(100),IN g_age VARCHAR(100),IN g_dur VARCHAR(100),IN g_year INT,IN g_pic VARCHAR(1000),IN g_link VARCHAR(1000))
BEGIN
    DECLARE Result INT;
    DECLARE Errmsg VARCHAR(200);
    DECLARE target_id INT;


    IF(collection_test_f(gid,FALSE)=1) THEN
        SELECT info_BGGID INTO target_id FROM BGM_Infos WHERE info_Title=gtitle AND info_BGGID<0 LIMIT 1;
        IF (target_id IS NOT NULL) THEN
            UPDATE BGM_Collection SET col_BGGID = target_id , col_Assig_type = 4 WHERE col_ID = gid;
        ELSE
            SELECT MIN(info_BGGID) INTO target_id FROM BGM_Infos WHERE info_BGGID<0;
            IF(target_id IS NULL) THEN
                SET target_id=0;
            END IF;
            SET target_id=target_id-1;
            INSERT INTO BGM_Infos (info_BGGID,info_Title,info_Players,info_Age,info_Time,info_Year,info_Picture,info_Link) VALUES (target_id,gtitle,g_pl,g_age,g_dur,g_year,g_pic,g_pic);
            UPDATE BGM_Collection SET col_BGGID = target_id , col_Assig_type = 4 WHERE col_ID = gid;
        END IF;
        SET Result=0;
        SET Errmsg=NULL;
    ELSE
        SET Result=-1;
        SET Errmsg="collection_set_nonbgg_data : Collection Entry not found";
    END IF;
    SELECT Result,Errmsg;
END;
