CREATE TABLE `BGM_Ludo` (
  `ludo_ID` int NOT NULL AUTO_INCREMENT,
  `ludo_Title` varchar(200) DEFAULT NULL,
  `ludo_Count` int DEFAULT '0',
  `ludo_Availability` int DEFAULT '0',
  `ludo_Event_ID` int DEFAULT NULL,
  `ludo_BGGID` int DEFAULT NULL,
  PRIMARY KEY (`ludo_ID`),
  UNIQUE KEY `ludo_ID_UNIQUE` (`ludo_ID`)
) AUTO_INCREMENT=1;
