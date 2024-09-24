CREATE TABLE `BGM_Assoc` (
  `ass_ID` int NOT NULL,
  `ass_Name` varchar(200) DEFAULT NULL,
  `ass_Mail` text,
  `ass_Phone` varchar(20) DEFAULT NULL,
  `ass_Code` varchar(3) DEFAULT NULL,
  `ass_Games` int DEFAULT '0',
  `ass_Enabled` tinyint DEFAULT '1',
  `ass_Site` text DEFAULT NULL,
  `ass_Visible` tinyint DEFAULT '0',
  `ass_DirectLink` text DEFAULT NULL,
  PRIMARY KEY (`ass_ID`),
  UNIQUE KEY `ID_UNIQUE` (`ass_ID`),
  UNIQUE KEY `Name_UNIQUE` (`ass_Name`),
  UNIQUE KEY `ass_code_UNIQUE` (`ass_Code`)
)
