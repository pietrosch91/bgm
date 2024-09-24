CREATE TABLE `BGM_Access` (
  `acc_ID` int NOT NULL AUTO_INCREMENT,
  `acc_User_ID` int DEFAULT NULL,
  `acc_To_ID` int DEFAULT NULL,
  `acc_Level` int DEFAULT '0',
  `acc_Enabled` int DEFAULT '1',
  PRIMARY KEY (`acc_ID`),
  UNIQUE KEY `ID_UNIQUE` (`acc_ID`)
) AUTO_INCREMENT=1
