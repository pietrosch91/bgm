CREATE PROCEDURE `event_get_games_loan` (IN eid INT)
BEGIN
	IF(event_test_f(eid,FALSE) = 1) THEN
		SELECT col_ID AS ID, col_DocumentSlot AS DSlot, col_DocumentName AS DName, col_RentTime AS RTime, owner_get_name_f(col_Owner_ID) AS Owner, col_Owner_Name AS SpecOwner, col_AVAILABILITY AS Available, col_ShowName AS Title, col_Inventory AS Inv FROM BGM_Collection WHERE col_Enabled = 1 AND col_Event_ID=eid AND col_OnShelf=1 ORDER BY col_ShowName;
	ELSE
		SELECT col_ID AS ID, col_DocumentSlot AS DSlot, col_DocumentName AS DName, col_RentTime AS RTime, owner_get_name_f(col_Owner_ID) AS Owner, col_Owner_Name AS SpecOwner, col_AVAILABILITY AS Available, col_ShowName AS Title, col_Inventory AS Inv FROM BGM_Collection WHERE 0;
	END IF;
END;
