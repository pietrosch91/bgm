CREATE PROCEDURE `event_get_slots`(IN eid INT)
BEGIN
    SELECT COUNT(*) AS slots FROM BGM_Slots WHERE slot_Event=eid;
END
