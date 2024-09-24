CREATE TABLE `BGM_Events` (
  `ev_ID` int NOT NULL,
  `ev_Name` varchar(200) DEFAULT NULL,
  `ev_Link` text COMMENT '\n',
  `ev_Enabled` tinyint DEFAULT '1',
  `ev_Visible` tinyint DEFAULT '1',
  `ev_Lock_Games` tinyint DEFAULT '0',
  `ev_DirectLink` text DEFAULT NULL,
  PRIMARY KEY (`ev_ID`),
  UNIQUE KEY `ID_UNIQUE` (`ev_ID`),
  UNIQUE KEY `ev_Name_UNIQUE` (`ev_Name`)
)
