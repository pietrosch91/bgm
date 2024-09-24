CREATE PROCEDURE `association_get_view_foster_to`(IN a_id INT)
BEGIN
	IF( association_test_f(a_id,FALSE) = 1) THEN
		SELECT col_ID AS ID,owner_get_name_f(col_Owner_ID) AS owner,owner_get_name_f(col_Foster_ID) AS foster,col_Showname AS title, col_BGGID as bggid, event_get_name_f(col_Event_ID) AS event, col_Inventory AS inv FROM BGM_Collection WHERE col_Foster_ID=a_id ORDER BY col_Showname;
	ELSE
		SELECT col_ID AS ID,owner_get_name_f(col_Owner_ID) AS owner,owner_get_name_f(col_Foster_ID) AS foster,col_Showname AS title, col_BGGID as bggid, event_get_name_f(col_Event_ID) AS event, col_Inventory AS inv FROM BGM_Collection WHERE 0;
	END IF;
END;
