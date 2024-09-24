CREATE TABLE `BGM_Users` (
  `usr_ID` int NOT NULL,
  `usr_Name` varchar(200) DEFAULT NULL,
  `usr_Mail` text,
  `usr_Phone` varchar(20) DEFAULT NULL,
  `usr_Code` varchar(3) DEFAULT NULL,
  `usr_Games` int DEFAULT '0',
  `usr_Pwd` varchar(64) DEFAULT NULL,
  `usr_Enabled` tinyint DEFAULT '1',
  PRIMARY KEY (`usr_ID`),
  UNIQUE KEY `ID_UNIQUE` (`usr_ID`),
  UNIQUE KEY `Name_UNIQUE` (`usr_Name`),
  UNIQUE KEY `usr_code_UNIQUE` (`usr_Code`)
) ;

INSERT INTO BGM_Users (usr_ID,usr_Name,usr_Pwd,usr_Enabled) VALUES (-1,'admin','admin',1)
