CREATE PROCEDURE `event_get_view_admin`()
BEGIN
	SELECT ev_ID,ev_Name,ev_Enabled FROM BGM_Events ORDER BY ev_Name;
END;
