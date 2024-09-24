CREATE TABLE `BGM_Slots` (
  `slot_Number` int NOT NULL DEFAULT '0',
  `slot_Occupancy` int NOT NULL DEFAULT '0',
  `slot_Event` int NOT NULL DEFAULT '0',
  `slot_ID` int GENERATED ALWAYS AS (((`slot_Event` * 100) + `slot_Number`)) STORED,
  `slot_Auto` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`slot_Auto`),
  UNIQUE KEY `slot_ID_UNIQUE` (`slot_ID`),
  UNIQUE KEY `slot_Auto_UNIQUE` (`slot_Auto`)
) 
