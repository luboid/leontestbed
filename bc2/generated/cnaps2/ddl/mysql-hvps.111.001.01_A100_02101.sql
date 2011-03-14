-- T_MSG_HVPS_111_001_01_A100_02101 generated by ParseSampleXml
 
DROP TABLE IF EXISTS T_MSG_HVPS_111_001_01_A100_02101;

/*==============================================================*/
/* Table: T_MSG_HVPS_111_001_01_A100_02101                                             */
/*==============================================================*/
CREATE TABLE T_MSG_HVPS_111_001_01_A100_02101  (
   UUID			VARCHAR(64)		,
   DBTRACCTID			VARCHAR(200)		,
   CDTRACCTID			VARCHAR(200)		,
   DBTRAGTBRNCHID			VARCHAR(200)		,
   ENDTOENDID			VARCHAR(200)		,
   TXID			VARCHAR(200)		,
   NBOFTXS			VARCHAR(200)		,
   CDTRCLRSYSMMBID			VARCHAR(200)		,
   STTLMPRTY			VARCHAR(200)		,
   BIZTCCD			VARCHAR(200)		,
   BIZTPCD			VARCHAR(200)		,
   DBTRNM			VARCHAR(200)		,
   MSGID			VARCHAR(200)		,
   SETTLEMENTMETHOD			VARCHAR(200)		,
   CDTRAGTBRNCHID			VARCHAR(200)		,
   CHRGBR			VARCHAR(200)		,
   CREDTTM			DATE		,
   DBTRCLRSYSMMBID			VARCHAR(200)		,
   DBTRACCTISSR			VARCHAR(200)		,
   CDTRNM			VARCHAR(200)		,
   TS			TIMESTAMP		,
   INDEX PK_T_MSG_IBPS_101_001_01 (UUID)
)Type=InnoDB;

