CREATE PROCEDURE `association_get_view_admin`()
BEGIN
	SELECT ass_ID,ass_Name,ass_Code,ass_Enabled FROM BGM_Assoc ORDER BY ass_Name;
END;
