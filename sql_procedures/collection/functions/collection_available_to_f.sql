CREATE FUNCTION `collection_available_to_f`(gid INT) RETURNS INT
READS SQL DATA
BEGIN
    DECLARE usr INT DEFAULT NULL;
    DECLARE foster INT DEFAULT NULL;
    IF(collection_test_f(gid,FALSE)!= 1) THEN
        RETURN NULL;
    END IF;
    SELECT col_Owner_ID, col_Foster_ID into usr,foster FROM BGM_Collection WHERE col_ID=gid;
    IF(foster IS NOT NULL) THEN
        RETURN foster;
    END IF;
    RETURN usr;
END
