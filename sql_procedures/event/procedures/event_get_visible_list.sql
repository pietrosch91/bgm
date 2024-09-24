CREATE PROCEDURE `event_get_visible_list`()
BEGIN
	SELECT ev_Name,ev_ID FROM BGM_Events WHERE ev_Enabled=1 AND ev_Visible=1 ORDER BY ev_Name;
END;
