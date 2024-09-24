CREATE PROCEDURE `association_get_visible_list`()
BEGIN
	SELECT ass_Name,ass_ID FROM BGM_Assoc WHERE ass_Enabled=1 AND ass_Visible=1 ORDER BY ass_Name;
END;
