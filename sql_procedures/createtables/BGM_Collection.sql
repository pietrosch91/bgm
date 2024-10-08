CREATE TABLE `BGM_Collection` (
  `col_ID` int NOT NULL AUTO_INCREMENT,
  `col_DocumentSlot` int DEFAULT NULL,
  `col_DocumentName` varchar(200) DEFAULT NULL,
  `col_RentTime` varchar(200) DEFAULT NULL,
  `col_Owner_ID` int DEFAULT NULL,
  `col_Owner_Name` varchar(200) DEFAULT NULL,
  `col_Foster_ID` int DEFAULT NULL,
  `col_AVAILABILITY` int DEFAULT '1',
  `col_TimesRented` int DEFAULT '0',
  `col_ShowName` varchar(200) DEFAULT NULL,
  `col_BGGID` int DEFAULT NULL,
  `col_Assig_type` int DEFAULT NULL,
  `col_OnShelf` int DEFAULT NULL,
  `col_Note` text,
  `col_Event_ID` int DEFAULT NULL,
  `col_Inventory` varchar(20) DEFAULT NULL,
  `col_Enabled` int DEFAULT '1',
  `col_Ludo_ID` int DEFAULT NULL,
  PRIMARY KEY (`col_ID`),
  UNIQUE KEY `ID_UNIQUE` (`col_ID`)
) AUTO_INCREMENT=1
