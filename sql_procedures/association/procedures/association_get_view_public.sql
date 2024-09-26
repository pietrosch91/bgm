CREATE PROCEDURE `association_get_view_public`(IN a_id INT)
BEGIN
	IF(association_test_f(a_id,FALSE) = 1) THEN
		SELECT BGM_Collection.col_Inventory AS _inv, BGM_Collection.col_Showname AS _title,BGM_Collection.col_BGGID AS _bggid, BGM_Infos.info_Players AS _pl, BGM_Infos.info_Age AS _age, BGM_Infos.info_Time AS _dur, BGM_Infos.info_Year AS _year, BGM_Infos.info_Picture AS _pic, BGM_Infos.info_Link AS _link FROM BGM_Collection LEFT JOIN BGM_Infos ON BGM_Collection.col_BGGID=BGM_Infos.info_BGGID WHERE collection_available_to_f(BGM_Collection.col_ID)=a_id ORDER BY BGM_Collection.col_Showname;
	ELSE
		SELECT BGM_Collection.col_Inventory AS _inv, BGM_Collection.col_Showname AS _title,BGM_Collection.col_BGGID AS _bggid, BGM_Infos.info_Players AS _pl, BGM_Infos.info_Age AS _age, BGM_Infos.info_Time AS _dur, BGM_Infos.info_Year AS _year, BGM_Infos.info_Picture AS _pic, BGM_Infos.info_Link AS _link FROM BGM_Collection LEFT JOIN BGM_Infos ON BGM_Collection.col_BGGID=BGM_Infos.info_BGGID WHERE 0;
	END IF;
END;
