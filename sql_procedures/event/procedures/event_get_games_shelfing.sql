CREATE PROCEDURE `event_get_games_shelfing` (IN eid INT)
BEGIN
	IF(event_test_f(eid,FALSE) = 1) THEN
		SELECT col_ID AS ID, owner_get_name_f(col_Owner_ID) AS Owner, col_Owner_Name AS SpecOwner, col_ShowName AS Title, col_Inventory AS Inv, col_BGGID AS BGGID, col_OnShelf AS Shelved  FROM BGM_Collection WHERE col_Enabled = 1 AND col_Event_ID=eid ORDER BY col_ShowName;
	ELSE
		SELECT col_ID AS ID, owner_get_name_f(col_Owner_ID) AS Owner, col_Owner_Name AS SpecOwner, col_ShowName AS Title, col_Inventory AS Inv, col_BGGID AS BGGID, col_OnShelf AS Shelved  FROM BGM_Collection WHERE 0;
	END IF;
END;
