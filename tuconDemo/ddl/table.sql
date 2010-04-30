DROP TABLE IF EXISTS tbl_test;
--:

CREATE TABLE `tbl_test` (
  `OID` varchar(100) NOT NULL,
  `DESC` varchar(200) default NULL,
  PRIMARY KEY  (`OID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;