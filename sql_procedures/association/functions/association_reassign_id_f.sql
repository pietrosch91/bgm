CREATE FUNCTION `association_reassign_id_f`(aid INT,newID INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	IF(association_test_f(aid,TRUE) != 1) THEN
		RETURN "Association not found";
	END IF;
	IF(aid=newID) THEN
		RETURN "Initial and final ID are the same";
	END IF;
	IF(association_test_f(newID,TRUE) = 1) THEN
		RETURN "Final ID not available";
	END IF;
	IF(newID >=0 ) THEN
		RETURN "Final ID not valid";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#BGM_Access
	UPDATE BGM_Access SET acc_To_ID=newID WHERE acc_To_ID=aid;
	#BGM_Collection
	UPDATE BGM_Collection SET col_Owner_ID=newID WHERE col_Owner_ID=aid;
	UPDATE BGM_Collection SET col_Foster_ID=newID WHERE col_Foster_ID=aid;
	#BGM_Assoc
	UPDATE BGM_Assoc SET ass_ID=newID WHERE ass_ID=aid;
	RETURN NULL;
END;
