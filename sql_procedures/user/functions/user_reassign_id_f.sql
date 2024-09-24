CREATE FUNCTION `user_reassign_id_f`(uid INT,newID INT,_testonly BOOLEAN) RETURNS VARCHAR(200)
MODIFIES SQL DATA
BEGIN
	IF(user_test_f(uid,TRUE) != 1) THEN
		RETURN "User not found";
	END IF;
	IF(uid=newID) THEN
		RETURN "Initial and final ID are the same";
	END IF;
	IF(user_test_f(newID,TRUE) = 1) THEN
		RETURN "Final ID not available";
	END IF;
	IF(newID <=0 ) THEN
		RETURN "Final ID not valid";
	END IF;
	IF(_testonly) THEN
		RETURN NULL;
	END IF;
	#BGM_Access
	UPDATE BGM_Access SET acc_User_ID=newID WHERE acc_User_ID=uid;
	#BGM_Collection
	UPDATE BGM_Collection SET col_Owner_ID=newID WHERE col_Owner_ID=uid;
	UPDATE BGM_Collection SET col_Foster_ID=newID WHERE col_Foster_ID=uid;
	#BGM_Users
	UPDATE BGM_Users SET usr_ID=newID WHERE usr_ID=uid;
	RETURN NULL;
END;
