CREATE PROCEDURE `event_get_games_view` (IN eid INT)
BEGIN
	IF(event_test_f(eid,FALSE) = 1) THEN
		SELECT BGM_Ludo.ludo_Title AS _title, BGM_Ludo.ludo_Availability AS _availability, BGM_Ludo.ludo_BGGID AS _bggid, BGM_Infos.info_Players AS _pl, BGM_Infos.info_Age AS _age, BGM_Infos.info_Time AS _dur, BGM_Infos.info_Year AS _year, BGM_Infos.info_Picture AS _pic, BGM_Infos.info_Link AS _link FROM BGM_Ludo LEFT JOIN BGM_Infos ON BGM_Ludo.ludo_BGGID=BGM_Infos.info_BGGID WHERE BGM_Ludo.ludo_Event_ID=eid ORDER BY BGM_Ludo.ludo_Title;
	ELSE
		SELECT BGM_Ludo.ludo_Title AS _title, BGM_Ludo.ludo_Availability AS _availability, BGM_Ludo.ludo_BGGID AS _bggid, BGM_Infos.info_Players AS _pl, BGM_Infos.info_Age AS _age, BGM_Infos.info_Time AS _dur, BGM_Infos.info_Year AS _year, BGM_Infos.info_Picture AS _pic, BGM_Infos.info_Link AS _link FROM BGM_Ludo LEFT JOIN BGM_Infos ON BGM_Ludo.ludo_BGGID=BGM_Infos.info_BGGID WHERE 0;
	END IF;
#	IF(event_test_f(eid,FALSE) = 1) THEN
#		SELECT * FROM BGM_Ludo WHERE ludo_Event_ID=eid ORDER BY ludo_Title;
#	ELSE
#		SELECT * FROM BGM_Ludo WHERE 0;
#	END IF;
END;
