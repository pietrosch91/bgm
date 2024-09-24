CREATE TABLE `BGM_Infos` (
  `info_BGGID` int NOT NULL DEFAULT '0',
  `info_Title` varchar(400) DEFAULT NULL,
  `info_Players` varchar(50) DEFAULT NULL,
  `info_Age` varchar(50) DEFAULT NULL,
  `info_Time` varchar(50) DEFAULT NULL,
  `info_Year` int DEFAULT NULL,
  `info_Picture` varchar(1000) DEFAULT NULL,
  `info_Link` varchar(1500) DEFAULT NULL,
  PRIMARY KEY (`info_BGGID`),
  UNIQUE KEY `BGGID_UNIQUE` (`info_BGGID`)
)
