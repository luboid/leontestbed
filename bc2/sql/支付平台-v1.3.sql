/*==============================================================*/
/* DBMS name:      ORACLE Version 10gR2                         */
/* Created on:     1/23/2011 11:38:52 AM                        */
/*==============================================================*/



-- TYPE PACKAGE DECLARATION
CREATE OR REPLACE PACKAGE PDTYPES  
AS
    TYPE REF_CURSOR IS REF CURSOR;
END;

-- INTEGRITY PACKAGE DECLARATION
CREATE OR REPLACE PACKAGE INTEGRITYPACKAGE AS
 PROCEDURE INITNESTLEVEL;
 FUNCTION GETNESTLEVEL RETURN NUMBER;
 PROCEDURE NEXTNESTLEVEL;
 PROCEDURE PREVIOUSNESTLEVEL;
 END INTEGRITYPACKAGE;
/

-- INTEGRITY PACKAGE DEFINITION
CREATE OR REPLACE PACKAGE BODY INTEGRITYPACKAGE AS
 NESTLEVEL NUMBER;

-- PROCEDURE TO INITIALIZE THE TRIGGER NEST LEVEL
 PROCEDURE INITNESTLEVEL IS
 BEGIN
 NESTLEVEL := 0;
 END;


-- FUNCTION TO RETURN THE TRIGGER NEST LEVEL
 FUNCTION GETNESTLEVEL RETURN NUMBER IS
 BEGIN
 IF NESTLEVEL IS NULL THEN
     NESTLEVEL := 0;
 END IF;
 RETURN(NESTLEVEL);
 END;

-- PROCEDURE TO INCREASE THE TRIGGER NEST LEVEL
 PROCEDURE NEXTNESTLEVEL IS
 BEGIN
 IF NESTLEVEL IS NULL THEN
     NESTLEVEL := 0;
 END IF;
 NESTLEVEL := NESTLEVEL + 1;
 END;

-- PROCEDURE TO DECREASE THE TRIGGER NEST LEVEL
 PROCEDURE PREVIOUSNESTLEVEL IS
 BEGIN
 NESTLEVEL := NESTLEVEL - 1;
 END;

 END INTEGRITYPACKAGE;
/


DROP TRIGGER "TIB_T_C1_BIS_ELE"
/

DROP TRIGGER "TIB_T_C1_BIS_ELE_E"
/

DROP TRIGGER "TIB_T_BIS_CLAS"
/

DROP TRIGGER "TIB_T_C2_BIS_ELE_BSC"
/

DROP TRIGGER "TIB_T_BIS_ELE_EX"
/

DROP TRIGGER "TIB_T_C2_BIS_TP_MSG"
/

DROP TRIGGER "TIB_T_MSG_LIST"
/

DROP TRIGGER "TIB_T_MSG_PAIR"
/

ALTER TABLE TBL_AUDIT_DETAIL
   DROP CONSTRAINT FK_TBL_AUDI_REFERENCE_TBL_AUDI
/

ALTER TABLE T_CFG_OPERATION
   DROP CONSTRAINT FKD00C0E6165A37EDC
/

ALTER TABLE T_CFG_OPERATION
   DROP CONSTRAINT FKD00C0E61CA315B8D
/

ALTER TABLE T_CFG_PORT_IN
   DROP CONSTRAINT FKA0D1293D65A37EDC
/

ALTER TABLE T_CFG_PORT_IN
   DROP CONSTRAINT FKA0D1293D72B7D490
/

ALTER TABLE T_CFG_PORT_IN
   DROP CONSTRAINT FKA0D1293DA2347560
/

ALTER TABLE T_CFG_PORT_IN
   DROP CONSTRAINT FKA0D1293DCA315B8D
/

ALTER TABLE T_CFG_PORT_IN
   DROP CONSTRAINT FKA0D1293DCD27F77C
/

ALTER TABLE T_CFG_PORT_OUT
   DROP CONSTRAINT FK7954161665A37EDC
/

ALTER TABLE T_CFG_PORT_OUT
   DROP CONSTRAINT FK79541616CD27F77C
/

ALTER TABLE T_CFG_PORT_OUT
   DROP CONSTRAINT FK_T_CFG_PO_REFERENCE_T_CFG_TR
/

ALTER TABLE T_CFG_ROUTE_RULE
   DROP CONSTRAINT FK_T_CFG_RO_REFERENCE_T_CFG_PO
/

ALTER TABLE T_SYS_OPER
   DROP CONSTRAINT FK_T_SYS_OP_REFERENCE_T_SYS_FU
/

ALTER TABLE T_SYS_OPER
   DROP CONSTRAINT FK_T_SYS_OP_REFERENCE_T_SYS_US
/

ALTER TABLE "T_C2_BIS_CLAS"
   DROP CONSTRAINT FK_T_C2_BIS_REFERENCE_T_C2_BIS
/

ALTER TABLE "T_C2_BIS_CLAS"
   DROP CONSTRAINT FK_T_C2_BIS_REF_T_C2_BIS2
/

ALTER TABLE "T_C2_BIS_TYPE"
   DROP CONSTRAINT FK_T_C2_BIS_REF_T_C2_BIS1
/

ALTER TABLE "T_CFG_FMT_8583"
   DROP CONSTRAINT FK_T_FMT8583_REF_T_CFG_FORMAT
/

ALTER TABLE "T_CFG_FMT_ELE_MAP"
   DROP CONSTRAINT FK_T_MAPPING_REF_T_FORMAT
/

ALTER TABLE "T_CFG_FMT_ELE_MAP_RULE"
   DROP CONSTRAINT FK_T_CFG_FM_REFERENCE_T_CFG_FM
/

ALTER TABLE "T_CFG_FMT_XML"
   DROP CONSTRAINT FK_T_FMTXML_REF_T_CFG_FORMAT
/

DROP view V_C2_BIS_TP_CLAS
/

DROP view V_C2_MSG_TP_CLAS
/

DROP TABLE TBL_AUDIT CASCADE CONSTRAINTS
/

DROP TABLE TBL_AUDIT_DETAIL CASCADE CONSTRAINTS
/

DROP TABLE TBL_HIBER CASCADE CONSTRAINTS
/

DROP TABLE TBL_RESEND CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_FORMAT CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_NODE CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_OPERATION CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_PORT_IN CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_PORT_OUT CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_PROTOCOL CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_ROUTE_RULE CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_TRANS_IN CASCADE CONSTRAINTS
/

DROP TABLE T_CFG_TRANS_OUT CASCADE CONSTRAINTS
/

DROP TABLE T_MSG_LIST CASCADE CONSTRAINTS
/

DROP TABLE T_SYS_FUNCS CASCADE CONSTRAINTS
/

DROP TABLE T_SYS_OPER CASCADE CONSTRAINTS
/

DROP TABLE T_SYS_ORG CASCADE CONSTRAINTS
/

DROP TABLE T_SYS_PARAM_CTRL CASCADE CONSTRAINTS
/

DROP TABLE T_SYS_USER CASCADE CONSTRAINTS
/

DROP TABLE "T_C1_BIS_ELE" CASCADE CONSTRAINTS
/

DROP TABLE "T_C1_BIS_ELE_E" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_990_TMOUT_CTRL" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_BIS_CATG" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_BIS_CLAS" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_BIS_ELE_BSC" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_BIS_ELE_EXT" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_BIS_TP_MSG" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_BIS_TYPE" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_GW_SCHD" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_MSG_LIST" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_MSG_PAIR" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_PROC_CDLST" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_REF_DICT" CASCADE CONSTRAINTS
/

DROP TABLE "T_C2_TAG_REF" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_CONFIG" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_CONFIG_SET" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_FLD_TYPE" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_FMT_8583" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_FMT_ELE_MAP" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_FMT_ELE_MAP_FILE" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_FMT_ELE_MAP_RULE" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_FMT_XML" CASCADE CONSTRAINTS
/

DROP TABLE "T_CFG_PROVIDER_SET" CASCADE CONSTRAINTS
/

DROP SEQUENCE S_C1_BIS_ELE_BSC
/

DROP SEQUENCE S_C2_BIS_CATG
/

DROP SEQUENCE S_C2_BIS_CLAS
/

DROP SEQUENCE S_C2_BIS_ELE_BSC
/

DROP SEQUENCE S_C2_BIS_ELE_EXT
/

DROP SEQUENCE S_C2_BIS_TP_MSG
/

DROP SEQUENCE S_C2_BIS_TYPE
/

DROP SEQUENCE S_C2_MSG_LIST
/

DROP SEQUENCE S_C2_MSG_PAIR
/

DROP SEQUENCE S_C2_PROC_CDLST
/

DROP SEQUENCE S_C2_REF_DICT
/

DROP SEQUENCE S_C2_TAG_REF
/

DROP SEQUENCE S_CFG_ELE_MAPPING
/

DROP SEQUENCE S_CFG_FORMAT
/

DROP SEQUENCE S_CFG_SEQUNCE
/

DROP SEQUENCE S_SYS_FUNCS
/

DROP SEQUENCE S_SYS_MSG
/

DROP SEQUENCE S_SYS_OPER
/

DROP SEQUENCE S_SYS_ORG
/

DROP SEQUENCE S_SYS_PARAM_CTRL
/

DROP SEQUENCE S_SYS_USER
/

CREATE SEQUENCE S_C1_BIS_ELE_BSC
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_BIS_CATG
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_BIS_CLAS
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_BIS_ELE_BSC
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_BIS_ELE_EXT
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_BIS_TP_MSG
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_BIS_TYPE
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_MSG_LIST
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_MSG_PAIR
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_PROC_CDLST
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_REF_DICT
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_C2_TAG_REF
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_CFG_ELE_MAPPING
START WITH 1
INCREMENT BY 1
/

CREATE SEQUENCE S_CFG_FORMAT
/

CREATE SEQUENCE S_CFG_SEQUNCE
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_SYS_FUNCS
START WITH 1000
/

CREATE SEQUENCE S_SYS_MSG
START WITH 100
/

CREATE SEQUENCE S_SYS_OPER
START WITH 1000
/

CREATE SEQUENCE S_SYS_ORG
START WITH 1000
/

CREATE SEQUENCE S_SYS_PARAM_CTRL
START WITH 1000
INCREMENT BY 1
/

CREATE SEQUENCE S_SYS_USER
START WITH 1000
/

/*==============================================================*/
/* Table: TBL_AUDIT                                             */
/*==============================================================*/
CREATE TABLE TBL_AUDIT  (
   AUDIT_ID             VARCHAR2(255)                   NOT NULL,
   DOC_ID               VARCHAR2(255),
   TX_ID                VARCHAR2(255),
   OP_NAME              VARCHAR2(512),
   PARTNER              VARCHAR2(128),
   HOST                 VARCHAR2(128),
   STATUS               VARCHAR2(64),
   DIRECTION            VARCHAR2(5),
   DESCRIPTION          VARCHAR2(1024),
   INPORT               VARCHAR2(255),
   OUTPORT              VARCHAR2(255),
   TS                   TIMESTAMP,
   STARTDATE            TIMESTAMP,
   CONSTRAINT PK_TBL_AUDIT PRIMARY KEY (AUDIT_ID)
)
/

COMMENT ON TABLE TBL_AUDIT IS
'交换日志表'
/

/*==============================================================*/
/* Table: TBL_AUDIT_DETAIL                                      */
/*==============================================================*/
CREATE TABLE TBL_AUDIT_DETAIL  (
   U_ID                 VARCHAR2(255)                   NOT NULL,
   AUDIT_ID             VARCHAR2(255)                   NOT NULL,
   STATUS               VARCHAR2(64),
   STATE                VARCHAR2(64),
   DESCRIPTION          VARCHAR2(1024),
   TS                   TIMESTAMP,
   CONSTRAINT PK_TBL_AUDIT_DETAIL PRIMARY KEY (U_ID)
)
/

COMMENT ON TABLE TBL_AUDIT_DETAIL IS
'交换日志详细信息'
/

/*==============================================================*/
/* Table: TBL_HIBER                                             */
/*==============================================================*/
CREATE TABLE TBL_HIBER  (
   HIBERKEY             VARCHAR2(255)                   NOT NULL,
   TX_ID                VARCHAR2(255),
   AUDIT_ID             VARCHAR2(512),
   STATUS               VARCHAR2(64),
   TS                   TIMESTAMP,
   EXPIRATION           NUMBER(18)                      NOT NULL,
   DIRECTION            VARCHAR2(5),
   CONSTRAINT PK_TBL_HIBER PRIMARY KEY (HIBERKEY)
)
/

COMMENT ON TABLE TBL_HIBER IS
'交换日志HIBER'
/

/*==============================================================*/
/* Table: TBL_RESEND                                            */
/*==============================================================*/
CREATE TABLE TBL_RESEND  (
   RESENDKEY            VARCHAR2(255)                   NOT NULL,
   AUDIT_ID             VARCHAR2(512),
   STATUS               VARCHAR2(64),
   TS                   TIMESTAMP,
   EXPIRATION           NUMBER(18)                      NOT NULL,
   INPORT_NAME          VARCHAR2(64),
   BIN                  BLOB,
   RETRY_COUNT          NUMBER(3),
   DIRECTION            VARCHAR2(5),
   CONSTRAINT PK_TBL_RESEND PRIMARY KEY (RESENDKEY)
)
/

COMMENT ON TABLE TBL_RESEND IS
'重发日志RESEND'
/

/*==============================================================*/
/* Table: T_CFG_FORMAT                                          */
/*==============================================================*/
CREATE TABLE T_CFG_FORMAT  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80)                    NOT NULL,
   "FMTVER"             VARCHAR2(20),
   "DESCRIPTION"        VARCHAR2(256),
   "DELIM"              VARCHAR2(10),
   "FORMAT"             VARCHAR2(20),
   "PATH_OP_INFO"       VARCHAR2(200),
   "PATH_DOC_ID"        VARCHAR2(200),
   "PATH_ORIG_DOC_ID"   VARCHAR2(200),
   CONSTRAINT PK_T_CFG_FORMAT PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_FORMAT IS
'配置协议，如果选择8583类型，间隔符和格式不选；如果选择GNRL通用类型，间隔符和格式必选；XML格式暂定
注：在报文中，PATH_OP_INFO 字段所对应的path上，其要求的数据格式为（报文_业务类型_业务种类）'
/

COMMENT ON COLUMN T_CFG_FORMAT."FORMAT" IS
'格式样例演示用间隔符隔开的数据格式表示，比如A,B,C,D,E,F等'
/

COMMENT ON COLUMN T_CFG_FORMAT."PATH_OP_INFO" IS
'将以HVPS.111.001.01_A100_02101格式提供'
/

/*==============================================================*/
/* Table: T_CFG_NODE                                            */
/*==============================================================*/
CREATE TABLE T_CFG_NODE  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80)                    NOT NULL,
   TYPE                 VARCHAR2(20)                    NOT NULL,
   IP                   VARCHAR2(20),
   CONSTRAINT PK_T_CFG_NODE PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_NODE IS
'配置系统节点'
/

/*==============================================================*/
/* Table: T_CFG_OPERATION                                       */
/*==============================================================*/
CREATE TABLE T_CFG_OPERATION  (
   OID                  INTEGER                         NOT NULL,
   "NAME"               VARCHAR2(80),
   DOWN_PP_REPLY_TYPE   CHAR(1)                        
      CONSTRAINT CKC_DOWN_PP_REPLY_TYP_T_CFG_OP CHECK (DOWN_PP_REPLY_TYPE IS NULL OR (DOWN_PP_REPLY_TYPE IN ('A','S'))),
   UP_PP_REPLY_TYPE     CHAR(1)                        
      CONSTRAINT CKC_UP_PP_REPLY_TYPE_T_CFG_OP CHECK (UP_PP_REPLY_TYPE IS NULL OR (UP_PP_REPLY_TYPE IN ('A','S'))),
   FORMAT_ID            INTEGER,
   PROT_ID              INTEGER,
   CONSTRAINT PK_T_CFG_OPERATION PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_OPERATION IS
'配置报文操作'
/

/*==============================================================*/
/* Table: T_CFG_PORT_IN                                         */
/*==============================================================*/
CREATE TABLE T_CFG_PORT_IN  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80),
   DIRECTION            CHAR(1),
   URL                  VARCHAR2(255),
   FORMAT_ID            INTEGER,
   NODE_ID              INTEGER,
   PROT_ID              INTEGER,
   TRANS_INFO_ID        INTEGER,
   ACK_PORT_ID          INTEGER,
   "IPS_PERMITTED"      VARCHAR2(256),
   CONSTRAINT PK_T_CFG_PORT_IN PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_PORT_IN IS
'配置端口IN'
/

COMMENT ON COLUMN T_CFG_PORT_IN."IPS_PERMITTED" IS
'允许访问的IP列表，以逗号分隔开，字段长度256，能最多允许定义17个IP地址'
/

/*==============================================================*/
/* Table: T_CFG_PORT_OUT                                        */
/*==============================================================*/
CREATE TABLE T_CFG_PORT_OUT  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80),
   DIRECTION            CHAR(1),
   URL                  VARCHAR2(255),
   FORMAT_ID            INTEGER,
   NODE_ID              INTEGER,
   TRANS_INFO_ID        INTEGER,
   CONSTRAINT PK_T_CFG_PORT_OUT PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_PORT_OUT IS
'配置端口OUT'
/

/*==============================================================*/
/* Table: T_CFG_PROTOCOL                                        */
/*==============================================================*/
CREATE TABLE T_CFG_PROTOCOL  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80),
   CONFIG               VARCHAR2(1024),
   "IS_ACTIVE"          CHAR(1),
   CONSTRAINT PK_T_CFG_PROTOCOL PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_PROTOCOL IS
'配置支付系统
<ICfgProtocol class="com.topfinance.cfg.xml.OmCfgProtocol" id="6" name="CNAPS2"  upSendAckToPP="F" downRecievePPAck="F"/>'
/

/*==============================================================*/
/* Table: T_CFG_ROUTE_RULE                                      */
/*==============================================================*/
CREATE TABLE T_CFG_ROUTE_RULE  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80),
   SEQUN                NUMBER(10,0)                    NOT NULL,
   OPERATIONMASK        VARCHAR2(120),
   DIRECTION            CHAR(1)                        
      CONSTRAINT CKC_DIRECTION_T_CFG_RO CHECK (DIRECTION IS NULL OR (DIRECTION IN ('U','D'))),
   OUTPORT_ID           INTEGER,
   CONSTRAINT PK_T_CFG_ROUTE_RULE PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_ROUTE_RULE IS
'配置路由规则'
/

/*==============================================================*/
/* Table: T_CFG_TRANS_IN                                        */
/*==============================================================*/
CREATE TABLE T_CFG_TRANS_IN  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80)                    NOT NULL,
   PREFIX               VARCHAR2(40)                    NOT NULL,
   PROVIDER             VARCHAR2(20)                    NOT NULL,
   CLAS                 VARCHAR2(120),
   TYPE                 VARCHAR2(30),
   IS_PRIVATE           CHAR(1)                         NOT NULL
      CONSTRAINT CKC_IS_PRIVATE_T_CFG_TRANSIN CHECK (IS_PRIVATE IN ('T','F')),
   "CONFIG"             VARCHAR2(1024),
   CONSTRAINT PK_T_CFG_TRANS_IN PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_TRANS_IN IS
'配置传输IN
<ICfgTransOut class="com.topfinance.cfg.xml.OmCfgTransOut8583" id="TRANS_OUT_PP_8583" name="8583" provider="8583" prefix="Iso8583OutPP" isPrivate="T">
	<config key="timeout">1000</config>
</ICfgTransOut>'
/

/*==============================================================*/
/* Table: T_CFG_TRANS_OUT                                       */
/*==============================================================*/
CREATE TABLE T_CFG_TRANS_OUT  (
   OID                  INTEGER                         NOT NULL,
   NAME                 VARCHAR2(80)                    NOT NULL,
   PREFIX               VARCHAR2(40)                    NOT NULL,
   PROVIDER             VARCHAR2(20)                    NOT NULL,
   CLAS                 VARCHAR2(120),
   TYPE                 VARCHAR2(30),
   IS_PRIVATE           CHAR(1)                         NOT NULL
      CONSTRAINT CKC_IS_PRIVATE_T_CFG_TRANSOUT CHECK (IS_PRIVATE IN ('T','F')),
   "CONFIG"             VARCHAR2(1024),
   CONSTRAINT PK_T_CFG_TRANS_OUT PRIMARY KEY (OID)
)
/

COMMENT ON TABLE T_CFG_TRANS_OUT IS
'配置传输OUT'
/

/*==============================================================*/
/* Table: T_MSG_LIST                                            */
/*==============================================================*/
CREATE TABLE T_MSG_LIST  (
   ID                   INTEGER                         NOT NULL,
   "TYPE"               VARCHAR2(10)                    NOT NULL,
   "MSGCODE"            VARCHAR2(40)                    NOT NULL,
   "MSGNAME"            VARCHAR2(120)                   NOT NULL,
   "DIRECTION"          VARCHAR2(20)                    NOT NULL,
   "ENCRYPT"            CHAR(1),
   "PAIR"               CHAR(1),
   CONSTRAINT PK_T_MSG_LIST PRIMARY KEY (ID)
)
/

COMMENT ON TABLE T_MSG_LIST IS
'报文清单'
/

COMMENT ON COLUMN T_MSG_LIST.ID IS
'主键'
/

COMMENT ON COLUMN T_MSG_LIST."TYPE" IS
'系统类型'
/

COMMENT ON COLUMN T_MSG_LIST."MSGCODE" IS
'备注'
/

COMMENT ON COLUMN T_MSG_LIST."MSGNAME" IS
'允许'
/

COMMENT ON COLUMN T_MSG_LIST."DIRECTION" IS
'方向'
/

COMMENT ON COLUMN T_MSG_LIST."ENCRYPT" IS
'是否加签'
/

COMMENT ON COLUMN T_MSG_LIST."PAIR" IS
'是否对账'
/

/*==============================================================*/
/* Table: T_SYS_FUNCS                                           */
/*==============================================================*/
CREATE TABLE T_SYS_FUNCS  (
   ID                   INTEGER                         NOT NULL,
   "NAME"               VARCHAR2(100)                   NOT NULL,
   "URL"                VARCHAR2(256)                   NOT NULL,
   "DESCRIPTION"        VARCHAR2(256),
   CONSTRAINT PK_T_SYS_FUNCS PRIMARY KEY (ID)
)
/

COMMENT ON TABLE T_SYS_FUNCS IS
'功能表'
/

COMMENT ON COLUMN T_SYS_FUNCS.ID IS
'主键'
/

COMMENT ON COLUMN T_SYS_FUNCS."NAME" IS
'组ID'
/

COMMENT ON COLUMN T_SYS_FUNCS."URL" IS
'操作ID'
/

COMMENT ON COLUMN T_SYS_FUNCS."DESCRIPTION" IS
'备注'
/

/*==============================================================*/
/* Table: T_SYS_OPER                                            */
/*==============================================================*/
CREATE TABLE T_SYS_OPER  (
   ID                   INTEGER                         NOT NULL,
   "USERID"             INTEGER                         NOT NULL,
   "FUNCID"             INTEGER                         NOT NULL,
   "ENABLED"            CHAR(1),
   CONSTRAINT PK_T_SYS_OPER PRIMARY KEY (ID)
)
/

COMMENT ON TABLE T_SYS_OPER IS
'操作表'
/

COMMENT ON COLUMN T_SYS_OPER.ID IS
'主键'
/

COMMENT ON COLUMN T_SYS_OPER."USERID" IS
'名称'
/

COMMENT ON COLUMN T_SYS_OPER."FUNCID" IS
'备注'
/

COMMENT ON COLUMN T_SYS_OPER."ENABLED" IS
'允许'
/

/*==============================================================*/
/* Table: T_SYS_ORG                                             */
/*==============================================================*/
CREATE TABLE T_SYS_ORG  (
   ID                   INTEGER                         NOT NULL,
   "NAME"               VARCHAR2(100)                   NOT NULL,
   "CODE"               VARCHAR2(40)                    NOT NULL,
   PID                  INTEGER,
   "DESCRIPTION"        VARCHAR2(100),
   CONSTRAINT PK_T_SYS_ORG PRIMARY KEY (ID)
)
/

COMMENT ON TABLE T_SYS_ORG IS
'用户组表'
/

COMMENT ON COLUMN T_SYS_ORG.ID IS
'主键'
/

COMMENT ON COLUMN T_SYS_ORG."NAME" IS
'名称'
/

COMMENT ON COLUMN T_SYS_ORG."CODE" IS
'部门编码'
/

COMMENT ON COLUMN T_SYS_ORG.PID IS
'上级ID'
/

COMMENT ON COLUMN T_SYS_ORG."DESCRIPTION" IS
'备注'
/

/*==============================================================*/
/* Table: T_SYS_PARAM_CTRL                                      */
/*==============================================================*/
CREATE TABLE T_SYS_PARAM_CTRL  (
   CTRL_ID              INTEGER                         NOT NULL,
   PARAM_CATG           VARCHAR2(80)                    NOT NULL,
   PARAM_TYPE           VARCHAR2(40)                    NOT NULL,
   PARAM_CODE           VARCHAR2(40)                    NOT NULL,
   PARAM_NAME           VARCHAR2(100)                   NOT NULL,
   CONSTRAINT PK_T_SYS_PARAM_CTRL PRIMARY KEY (CTRL_ID)
)
/

COMMENT ON TABLE T_SYS_PARAM_CTRL IS
'参数控制'
/

COMMENT ON COLUMN T_SYS_PARAM_CTRL.CTRL_ID IS
'主键'
/

COMMENT ON COLUMN T_SYS_PARAM_CTRL.PARAM_CATG IS
'大类'
/

COMMENT ON COLUMN T_SYS_PARAM_CTRL.PARAM_TYPE IS
'参数类型'
/

COMMENT ON COLUMN T_SYS_PARAM_CTRL.PARAM_CODE IS
'参数值'
/

COMMENT ON COLUMN T_SYS_PARAM_CTRL.PARAM_NAME IS
'参数显示'
/

/*==============================================================*/
/* Table: T_SYS_USER                                            */
/*==============================================================*/
CREATE TABLE T_SYS_USER  (
   ID                   INTEGER                         NOT NULL,
   "NAME"               VARCHAR2(40)                    NOT NULL,
   "LOGINNAME"          VARCHAR2(100)                   NOT NULL,
   "PASSWORD"           VARCHAR2(30)                    NOT NULL,
   "OID"                INTEGER                         NOT NULL,
   "PHONE"              VARCHAR2(30),
   "CELL"               VARCHAR2(30),
   "EMAIL"              VARCHAR2(30),
   "DESCRIPTION"        VARCHAR2(256),
   "CREATEDATE"         TIMESTAMP                       NOT NULL,
   CONSTRAINT PK_T_SYS_USER PRIMARY KEY (ID)
)
/

COMMENT ON TABLE T_SYS_USER IS
'用户表T_SYS_USER'
/

COMMENT ON COLUMN T_SYS_USER.ID IS
'主键'
/

COMMENT ON COLUMN T_SYS_USER."NAME" IS
'用户名'
/

COMMENT ON COLUMN T_SYS_USER."LOGINNAME" IS
'用户名'
/

COMMENT ON COLUMN T_SYS_USER."PASSWORD" IS
'密码'
/

COMMENT ON COLUMN T_SYS_USER."OID" IS
'部门'
/

COMMENT ON COLUMN T_SYS_USER."PHONE" IS
'电话'
/

COMMENT ON COLUMN T_SYS_USER."CELL" IS
'手机'
/

COMMENT ON COLUMN T_SYS_USER."EMAIL" IS
'邮件'
/

COMMENT ON COLUMN T_SYS_USER."DESCRIPTION" IS
'备注'
/

COMMENT ON COLUMN T_SYS_USER."CREATEDATE" IS
'创建时间'
/

/*==============================================================*/
/* Table: "T_C1_BIS_ELE"                                        */
/*==============================================================*/
CREATE TABLE "T_C1_BIS_ELE"  (
   "ID"                 INTEGER                         NOT NULL,
   "MSG_CODE"           VARCHAR(20),
   "MSG_NAME"           VARCHAR(80),
   "ELE_TAG"            VARCHAR(3),
   "ELE_NAME"           VARCHAR(80),
   "SRC_ELE_NAME"       VARCHAR(80),
   "SEQUN"              INTEGER,
   "UPSEQ"              INTEGER,
   "IS_REQUIRED"        VARCHAR(1),
   "TYPE"               VARCHAR(40),
   "MEMO"               VARCHAR(256),
   "APP_TYPE"           VARCHAR(4),
   CONSTRAINT PK_T_C1_BIS_ELE PRIMARY KEY ("ID")
)
/

COMMENT ON TABLE "T_C1_BIS_ELE" IS
'一代基本要素'
/

/*==============================================================*/
/* Table: "T_C1_BIS_ELE_E"                                      */
/*==============================================================*/
CREATE TABLE "T_C1_BIS_ELE_E"  (
   "ID"                 INTEGER                         NOT NULL,
   "TP_CODE"            VARCHAR(20),
   "TP_NAME"            VARCHAR(80),
   "ELE_NAME"           VARCHAR(80),
   "SEQUN"              INTEGER,
   "UPSEQ"              INTEGER,
   "IS_REQUIRED"        VARCHAR(1),
   "TYPE"               VARCHAR(40),
   "MEMO"               VARCHAR(256),
   "APP_TYPE"           VARCHAR(4),
   CONSTRAINT PK_T_C1_BIS_ELE_E PRIMARY KEY ("ID")
)
/

COMMENT ON TABLE "T_C1_BIS_ELE_E" IS
'一代扩展要素'
/

/*==============================================================*/
/* Table: "T_C2_990_TMOUT_CTRL"                                 */
/*==============================================================*/
CREATE TABLE "T_C2_990_TMOUT_CTRL"  (
   ID                   INTEGER                         NOT NULL,
   CONSTRAINT PK_T_C2_990_TMOUT_CTRL PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_C2_990_TMOUT_CTRL" IS
'为保证系统报文传输可靠，参与机构与支付系统间需对对方发送的业务报文，给予通信级确认。没有收到对方通信级确认报文的业务报文，应视为没有发送成功的报文。
通讯级超时设置，可以针对单个业务进行超时设置。'
/

/*==============================================================*/
/* Table: "T_C2_BIS_CATG"                                       */
/*==============================================================*/
CREATE TABLE "T_C2_BIS_CATG"  (
   "CAT_CODE"           VARCHAR(10)                     NOT NULL,
   "NAME"               VARCHAR(80)                     NOT NULL,
   "MEMO"               VARCHAR(120),
   CONSTRAINT PK_T_C2_BIS_CATG PRIMARY KEY ("CAT_CODE")
)
/

COMMENT ON TABLE "T_C2_BIS_CATG" IS
'业务性质'
/

/*==============================================================*/
/* Table: "T_C2_BIS_CLAS"                                       */
/*==============================================================*/
CREATE TABLE "T_C2_BIS_CLAS"  (
   ID                   INTEGER                         NOT NULL,
   "CAT_CODE"           VARCHAR(5),
   "TP_CODE"            VARCHAR(4),
   "CLS_CODE"           CHAR(5)                         NOT NULL,
   "NAME"               VARCHAR(80)                     NOT NULL,
   "MEMO"               VARCHAR(120),
   "APP_TYPE"           VARCHAR2(4)                     NOT NULL,
   "IS_ACTIVE"          CHAR(1)                        DEFAULT 'Y',
   CONSTRAINT PK_T_C2_BIS_CLAS PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_C2_BIS_CLAS" IS
'业务种类'
/

COMMENT ON COLUMN "T_C2_BIS_CLAS"."IS_ACTIVE" IS
'ccms906实时更新业务类型和业务种类的权限'
/

/*==============================================================*/
/* Table: "T_C2_BIS_ELE_BSC"                                    */
/*==============================================================*/
CREATE TABLE "T_C2_BIS_ELE_BSC"  (
   "ID"                 INTEGER                         NOT NULL,
   "MSG_CODE"           VARCHAR(20),
   "ELE_ID"             VARCHAR(80),
   "ELE_NAME"           VARCHAR(80),
   "SEQUN"              INTEGER,
   "UPSEQ"              INTEGER,
   "TYPE"               VARCHAR(40),
   "LENGH"              INTEGER,
   "IS_REQUIRED"        CHAR(1),
   "IS_BIS"             CHAR(1),
   "DEF_VALUE"          VARCHAR(100),
   "REF_CODE"           VARCHAR(60),
   "PATH"               VARCHAR(200),
   "MEMO"               VARCHAR(120),
   CONSTRAINT PK_T_C2_BIS_ELE_BSC PRIMARY KEY ("ID")
)
/

COMMENT ON TABLE "T_C2_BIS_ELE_BSC" IS
'业务基本要素'
/

/*==============================================================*/
/* Table: "T_C2_BIS_ELE_EXT"                                    */
/*==============================================================*/
CREATE TABLE "T_C2_BIS_ELE_EXT"  (
   ID                   INTEGER                         NOT NULL,
   "MSG_CODE"           VARCHAR(20),
   "SRC_ELE_NAME"       VARCHAR(80),
   "SEQUN"              INTEGER,
   "TP_CODE"            VARCHAR(10),
   "TP_NAME"            VARCHAR(40),
   "CLS_CODE"           VARCHAR(10),
   "CLA_NAME"           VARCHAR(80),
   "ELE_ID"             VARCHAR(80),
   "ELE_NAME"           VARCHAR(80),
   "TYPE"               VARCHAR(40),
   "LEN"                INTEGER,
   "IS_REQUIRED"        CHAR(1),
   "IS_BIS"             CHAR(1),
   "DEF_VALUE"          VARCHAR(40),
   "PRT_NODE"           VARCHAR(200),
   "TAG_NAME"           VARCHAR(20),
   "APPEND_TYPE"        CHAR(1)                        
      CONSTRAINT CKC_APPEND_TYPE_T_C2_BIS CHECK ("APPEND_TYPE" IS NULL OR ("APPEND_TYPE" IN ('A','B','M'))),
   CONSTRAINT PK_T_C2_BIS_ELE_EXT PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_C2_BIS_ELE_EXT" IS
'业务扩展要素'
/

/*==============================================================*/
/* Table: "T_C2_BIS_TP_MSG"                                     */
/*==============================================================*/
CREATE TABLE "T_C2_BIS_TP_MSG"  (
   ID                   INTEGER                         NOT NULL,
   "APP_TYPE"           VARCHAR2(4)                     NOT NULL,
   "MSG_CODE"           VARCHAR2(20)                    NOT NULL,
   "MSG_NAME"           VARCHAR2(80)                    NOT NULL,
   "TP_CODE"            VARCHAR2(10)                    NOT NULL,
   "TP_NAME"            VARCHAR2(80)                    NOT NULL,
   "IS_ACITVE"          CHAR(1)                         NOT NULL,
   CONSTRAINT PK_T_C2_BIS_TP_MSG PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_C2_BIS_TP_MSG" IS
'业务类型报文对照表'
/

/*==============================================================*/
/* Table: "T_C2_BIS_TYPE"                                       */
/*==============================================================*/
CREATE TABLE "T_C2_BIS_TYPE"  (
   "TP_CODE"            VARCHAR(4)                      NOT NULL,
   "CAT_CODE"           VARCHAR(2),
   "NAME"               VARCHAR(80)                     NOT NULL,
   "MEMO"               VARCHAR(120),
   CONSTRAINT PK_T_C2_BIS_TYPE PRIMARY KEY ("TP_CODE")
)
/

COMMENT ON TABLE "T_C2_BIS_TYPE" IS
'业务类型'
/

/*==============================================================*/
/* Table: "T_C2_GW_SCHD"                                        */
/*==============================================================*/
CREATE TABLE "T_C2_GW_SCHD"  (
   ID                   INTEGER                         NOT NULL,
   CONSTRAINT PK_T_C2_GW_SCHD PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_C2_GW_SCHD" IS
'运行时序表,支付平台的运行时序'
/

/*==============================================================*/
/* Table: "T_C2_MSG_LIST"                                       */
/*==============================================================*/
CREATE TABLE "T_C2_MSG_LIST"  (
   "MSG_ID"             INTEGER,
   "SYS_TYPE"           VARCHAR(10),
   "APP_MODULE"         VARCHAR(10),
   "OUT_MSG_CODE"       VARCHAR(20),
   "OUT_MSG_NAME"       VARCHAR(80),
   "MSG_DIRECT"         VARCHAR(40),
   "IS_ASSINGED"        VARCHAR(10),
   "IS_RECONCILIATED"   VARCHAR(20)
)
/

COMMENT ON TABLE "T_C2_MSG_LIST" IS
'报文列表'
/

/*==============================================================*/
/* Table: "T_C2_MSG_PAIR"                                       */
/*==============================================================*/
CREATE TABLE "T_C2_MSG_PAIR"  (
   "ID"                 INTEGER,
   "SYS_TYPE"           VARCHAR(10),
   "OUT_MSG_CODE"       VARCHAR(20),
   "OUT_MSG_NAME"       VARCHAR(80),
   "INOUT_DIRECT"       VARCHAR(10),
   "PO_MODE"            VARCHAR(10),
   "IN_MSG_CODE"        VARCHAR(20),
   "IN_MSG_MEMO"        VARCHAR(80)
)
/

COMMENT ON TABLE "T_C2_MSG_PAIR" IS
'报文往来'
/

/*==============================================================*/
/* Table: "T_C2_PROC_CDLST"                                     */
/*==============================================================*/
CREATE TABLE "T_C2_PROC_CDLST"  (
   ID                   INTEGER                         NOT NULL,
   "SYS_TYPE"           VARCHAR(10),
   "PROC_CODE"          VARCHAR(20),
   "PROC_MEMO"          VARCHAR(120),
   CONSTRAINT PK_T_C2_PROC_CDLST PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_C2_PROC_CDLST" IS
'处理码一览表'
/

/*==============================================================*/
/* Table: "T_C2_REF_DICT"                                       */
/*==============================================================*/
CREATE TABLE "T_C2_REF_DICT"  (
   "ID"                 INTEGER                         NOT NULL,
   "SYS_TYPE"           VARCHAR(8),
   "TP_CODE"            VARCHAR(40),
   "TP_NAME"            VARCHAR(80),
   "REF_CODE"           VARCHAR(40),
   "REF_NAME"           VARCHAR(80),
   CONSTRAINT PK_T_C2_REF_DICT PRIMARY KEY ("ID")
)
/

COMMENT ON TABLE "T_C2_REF_DICT" IS
'参照数据字典'
/

/*==============================================================*/
/* Table: "T_C2_TAG_REF"                                        */
/*==============================================================*/
CREATE TABLE "T_C2_TAG_REF"  (
   "ID"                 INTEGER                         NOT NULL,
   "TP_TYPE"            VARCHAR(20)                     NOT NULL,
   "TP_NAME"            VARCHAR(40)                     NOT NULL,
   "TG_NAME"            VARCHAR(80)                     NOT NULL,
   "CMT_TAG"            VARCHAR(10)                     NOT NULL,
   "CMT_TYPE"           VARCHAR(10)                     NOT NULL,
   "XML_TYPE"           VARCHAR(40)                     NOT NULL,
   CONSTRAINT PK_T_C2_TAG_REF PRIMARY KEY ("ID")
)
/

COMMENT ON TABLE "T_C2_TAG_REF" IS
't_tag_refTAG码对照'
/

/*==============================================================*/
/* Table: "T_CFG_CONFIG"                                        */
/*==============================================================*/
CREATE TABLE "T_CFG_CONFIG"  (
   OID                  INTEGER                         NOT NULL,
   POID                 INTEGER,
   "CFG_TYPE"           VARCHAR2(40)                   
      CONSTRAINT CKC_CFG_TYPE_T_CFG_CO CHECK ("CFG_TYPE" IS NULL OR ("CFG_TYPE" IN ('TRANS_IN','TRANS_OUT','PORT_IN','PORT_OUT'))),
   "CFG_NAME"           VARCHAR2(40),
   "CFG_VALUE"          VARCHAR2(40),
   CONSTRAINT PK_T_CFG_CONFIG PRIMARY KEY (OID)
)
/

COMMENT ON TABLE "T_CFG_CONFIG" IS
'配置扩展配置表。配置表中的config字段的最终值保持在此表中，程序处理以序列化方式的多个key-value形式的配置项保持在各表的config字段中。'
/

/*==============================================================*/
/* Table: "T_CFG_CONFIG_SET"                                    */
/*==============================================================*/
CREATE TABLE "T_CFG_CONFIG_SET"  (
   ID                   INTEGER                         NOT NULL,
   PROVIDER             VARCHAR2(20),
   "CFG_KEY"            VARCHAR2(80),
   "CFG_DFT_VAL"        VARCHAR2(80),
   CONSTRAINT PK_T_CFG_CONFIG_SET PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_CFG_CONFIG_SET" IS
'配置参数表'
/

/*==============================================================*/
/* Table: "T_CFG_FLD_TYPE"                                      */
/*==============================================================*/
CREATE TABLE "T_CFG_FLD_TYPE"  (
   "FLD_ID"             INTEGER                         NOT NULL,
   "FLD_NAME"           VARCHAR(20),
   CONSTRAINT PK_T_CFG_FLD_TYPE PRIMARY KEY ("FLD_ID")
)
/

COMMENT ON TABLE "T_CFG_FLD_TYPE" IS
'字段类型'
/

/*==============================================================*/
/* Table: "T_CFG_FMT_8583"                                      */
/*==============================================================*/
CREATE TABLE "T_CFG_FMT_8583"  (
   "ID"                 INTEGER                         NOT NULL,
   OID                  INTEGER,
   "SEQUN"              INTEGER,
   "SUB_SEQ"            VARCHAR(10),
   "POSITION"           VARCHAR(20),
   "NAME"               VARCHAR(40),
   "FLD_TYPE"           VARCHAR(40),
   "LENGTH"             VARCHAR(20),
   "MEMO"               VARCHAR(40),
   "VAR_LEN"            INTEGER,
   "BAS_LEN"            INTEGER,
   CONSTRAINT PK_T_CFG_FMT_8583 PRIMARY KEY ("ID")
)
/

COMMENT ON TABLE "T_CFG_FMT_8583" IS
'8583报文明细'
/

/*==============================================================*/
/* Table: "T_CFG_FMT_ELE_MAP"                                   */
/*==============================================================*/
CREATE TABLE "T_CFG_FMT_ELE_MAP"  (
   ID                   INTEGER                         NOT NULL,
   OID                  INTEGER,
   "MSG_CODE"           VARCHAR(20)                     NOT NULL,
   "TP_CODE"            VARCHAR(4),
   "CLS_CODE"           VARCHAR(5),
   "POS_EXP"            VARCHAR(256),
   "ELE_ID"             VARCHAR(80),
   "ELE_NAME"           VARCHAR(80),
   "SEQUN"              INTEGER,
   "LENGH"              INTEGER,
   "IS_REQUIRED"        CHAR(1),
   "IS_BIS"             CHAR(1),
   "DEF_VALUE"          VARCHAR(40),
   "PATH"               VARCHAR(200),
   CONSTRAINT PK_T_CFG_FMT_ELE_MAP PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_CFG_FMT_ELE_MAP" IS
'业务协议要素映射表
保存业务要素集的全集，如果有对应的格式映射，就给出定义，否则为空'
/

COMMENT ON COLUMN "T_CFG_FMT_ELE_MAP"."POS_EXP" IS
'8583位置或者xml的XPATH，所以长度定为256'
/

/*==============================================================*/
/* Table: "T_CFG_FMT_ELE_MAP_FILE"                              */
/*==============================================================*/
CREATE TABLE "T_CFG_FMT_ELE_MAP_FILE"  (
   ID                   INTEGER                         NOT NULL,
   "MSG_CODE"           VARCHAR(20)                     NOT NULL,
   "TP_CODE"            VARCHAR(10)                     NOT NULL,
   "CLS_CODE"           CHAR(5)                         NOT NULL,
   FORMAT_ID            INTEGER                         NOT NULL,
   FORMAT               VARCHAR(20),
   CONSTRAINT PK_T_CFG_FMT_ELE_MAP_FILE PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_CFG_FMT_ELE_MAP_FILE" IS
'要素映射文件表'
/

/*==============================================================*/
/* Table: "T_CFG_FMT_ELE_MAP_RULE"                              */
/*==============================================================*/
CREATE TABLE "T_CFG_FMT_ELE_MAP_RULE"  (
   "ID"                 INTEGER                         NOT NULL,
   "RULE_ID"            INTEGER,
   PTE_FLD_ID           INTEGER,
   BIZ_FLD_ID           VARCHAR(50),
   PTE_FLD_PATH         VARCHAR(50),
   PTE_FLD_TYPE         VARCHAR(50),
   BIZ_FLD_MODE         VARCHAR(50),
   BIZ_FLD_TYPE         VARCHAR(50),
   BIZ_FLD_VALUE        VARCHAR(50),
   BIZ_FLD_PATH         VARCHAR(50),
   BIZ_FLD_NAME         VARCHAR(50),
   CONSTRAINT PK_T_CFG_FMT_ELE_MAP_RULE PRIMARY KEY ("ID")
)
/

COMMENT ON TABLE "T_CFG_FMT_ELE_MAP_RULE" IS
'要素映射规则明细'
/

/*==============================================================*/
/* Table: "T_CFG_FMT_XML"                                       */
/*==============================================================*/
CREATE TABLE "T_CFG_FMT_XML"  (
   ID                   INTEGER                         NOT NULL,
   OID                  INTEGER,
   "IS_FILE"            CHAR(1)                         NOT NULL,
   "FILE_NAME"          VARCHAR2(256),
   "XSD_FILE"           CLOB,
   CONSTRAINT PK_T_CFG_FMT_XML PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_CFG_FMT_XML" IS
'XML报文明细'
/

/*==============================================================*/
/* Table: "T_CFG_PROVIDER_SET"                                  */
/*==============================================================*/
CREATE TABLE "T_CFG_PROVIDER_SET"  (
   ID                   INTEGER                         NOT NULL,
   PROVIDER             VARCHAR2(20),
   CLAS                 VARCHAR2(120),
   "DIRECTION"          VARCHAR2(8),
   "IS_ACTIVE"          CHAR(1),
   CONSTRAINT PK_T_CFG_PROVIDER_SET PRIMARY KEY (ID)
)
/

COMMENT ON TABLE "T_CFG_PROVIDER_SET" IS
'配置供应类型'
/

/*==============================================================*/
/* View: V_C2_BIS_TP_CLAS                                       */
/*==============================================================*/
CREATE OR REPLACE VIEW V_C2_BIS_TP_CLAS AS
SELECT T.TP_CODE,T.NAME TP_NAME,C.CLS_CODE,C.NAME CLS_NAME,C.APP_TYPE 
FROM T_C2_BIS_CLAS C,T_C2_BIS_TYPE T WHERE  C.TP_CODE = T.TP_CODE
WITH READ ONLY
/

 COMMENT ON TABLE V_C2_BIS_TP_CLAS IS
'v_C2_bis_tp_clas'
/

/*==============================================================*/
/* View: V_C2_MSG_TP_CLAS                                       */
/*==============================================================*/
CREATE OR REPLACE VIEW V_C2_MSG_TP_CLAS AS
SELECT M.MSG_CODE,M.MSG_NAME,T.TP_CODE,T.NAME TP_NAME,C.CLS_CODE,C.NAME CLS_NAME,C.APP_TYPE
FROM T_C2_BIS_CLAS C,T_C2_BIS_TYPE T,T_C2_BIS_TP_MSG M WHERE  C.TP_CODE = T.TP_CODE AND C.TP_CODE = M.TP_CODE AND C.APP_TYPE = M.APP_TYPE
WITH READ ONLY
/

 COMMENT ON TABLE V_C2_MSG_TP_CLAS IS
'V_C2_MSG_TP_CLAS'
/

ALTER TABLE TBL_AUDIT_DETAIL
   ADD CONSTRAINT FK_TBL_AUDI_REFERENCE_TBL_AUDI FOREIGN KEY (AUDIT_ID)
      REFERENCES TBL_AUDIT (AUDIT_ID)
/

ALTER TABLE T_CFG_OPERATION
   ADD CONSTRAINT FKD00C0E6165A37EDC FOREIGN KEY (FORMAT_ID)
      REFERENCES T_CFG_FORMAT (OID)
/

ALTER TABLE T_CFG_OPERATION
   ADD CONSTRAINT FKD00C0E61CA315B8D FOREIGN KEY (PROT_ID)
      REFERENCES T_CFG_PROTOCOL (OID)
/

ALTER TABLE T_CFG_PORT_IN
   ADD CONSTRAINT FKA0D1293D65A37EDC FOREIGN KEY (FORMAT_ID)
      REFERENCES T_CFG_FORMAT (OID)
/

ALTER TABLE T_CFG_PORT_IN
   ADD CONSTRAINT FKA0D1293D72B7D490 FOREIGN KEY (ACK_PORT_ID)
      REFERENCES T_CFG_PORT_OUT (OID)
/

ALTER TABLE T_CFG_PORT_IN
   ADD CONSTRAINT FKA0D1293DA2347560 FOREIGN KEY (TRANS_INFO_ID)
      REFERENCES T_CFG_TRANS_IN (OID)
/

ALTER TABLE T_CFG_PORT_IN
   ADD CONSTRAINT FKA0D1293DCA315B8D FOREIGN KEY (PROT_ID)
      REFERENCES T_CFG_PROTOCOL (OID)
/

ALTER TABLE T_CFG_PORT_IN
   ADD CONSTRAINT FKA0D1293DCD27F77C FOREIGN KEY (NODE_ID)
      REFERENCES T_CFG_NODE (OID)
/

ALTER TABLE T_CFG_PORT_OUT
   ADD CONSTRAINT FK7954161665A37EDC FOREIGN KEY (FORMAT_ID)
      REFERENCES T_CFG_FORMAT (OID)
/

ALTER TABLE T_CFG_PORT_OUT
   ADD CONSTRAINT FK79541616CD27F77C FOREIGN KEY (NODE_ID)
      REFERENCES T_CFG_NODE (OID)
/

ALTER TABLE T_CFG_PORT_OUT
   ADD CONSTRAINT FK_T_CFG_PO_REFERENCE_T_CFG_TR FOREIGN KEY (TRANS_INFO_ID)
      REFERENCES T_CFG_TRANS_OUT (OID)
/

ALTER TABLE T_CFG_ROUTE_RULE
   ADD CONSTRAINT FK_T_CFG_RO_REFERENCE_T_CFG_PO FOREIGN KEY (OUTPORT_ID)
      REFERENCES T_CFG_PORT_OUT (OID)
/

ALTER TABLE T_SYS_OPER
   ADD CONSTRAINT FK_T_SYS_OP_REFERENCE_T_SYS_FU FOREIGN KEY ("FUNCID")
      REFERENCES T_SYS_FUNCS (ID)
/

ALTER TABLE T_SYS_OPER
   ADD CONSTRAINT FK_T_SYS_OP_REFERENCE_T_SYS_US FOREIGN KEY ("USERID")
      REFERENCES T_SYS_USER (ID)
/

ALTER TABLE "T_C2_BIS_CLAS"
   ADD CONSTRAINT FK_T_C2_BIS_REFERENCE_T_C2_BIS FOREIGN KEY ("TP_CODE")
      REFERENCES "T_C2_BIS_TYPE" ("TP_CODE")
/

ALTER TABLE "T_C2_BIS_CLAS"
   ADD CONSTRAINT FK_T_C2_BIS_REF_T_C2_BIS2 FOREIGN KEY ("CAT_CODE")
      REFERENCES "T_C2_BIS_CATG" ("CAT_CODE")
/

ALTER TABLE "T_C2_BIS_TYPE"
   ADD CONSTRAINT FK_T_C2_BIS_REF_T_C2_BIS1 FOREIGN KEY ("CAT_CODE")
      REFERENCES "T_C2_BIS_CATG" ("CAT_CODE")
/

ALTER TABLE "T_CFG_FMT_8583"
   ADD CONSTRAINT FK_T_FMT8583_REF_T_CFG_FORMAT FOREIGN KEY (OID)
      REFERENCES T_CFG_FORMAT (OID)
/

ALTER TABLE "T_CFG_FMT_ELE_MAP"
   ADD CONSTRAINT FK_T_MAPPING_REF_T_FORMAT FOREIGN KEY (OID)
      REFERENCES T_CFG_FORMAT (OID)
/

ALTER TABLE "T_CFG_FMT_ELE_MAP_RULE"
   ADD CONSTRAINT FK_T_CFG_FM_REFERENCE_T_CFG_FM FOREIGN KEY ("RULE_ID")
      REFERENCES "T_CFG_FMT_ELE_MAP_FILE" (ID)
/

ALTER TABLE "T_CFG_FMT_XML"
   ADD CONSTRAINT FK_T_FMTXML_REF_T_CFG_FORMAT FOREIGN KEY (OID)
      REFERENCES T_CFG_FORMAT (OID)
/


CREATE TRIGGER "TIB_T_C1_BIS_ELE" BEFORE INSERT
ON "T_C1_BIS_ELE" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN ""ID"" USES SEQUENCE S_C1_BIS_ELE_BSC
    SELECT S_C1_BIS_ELE_BSC.NEXTVAL INTO :NEW."ID" FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/


CREATE TRIGGER "TIB_T_C1_BIS_ELE_E" BEFORE INSERT
ON "T_C1_BIS_ELE_E" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN ""ID"" USES SEQUENCE S_C1_BIS_ELE_BSC
    SELECT S_C1_BIS_ELE_BSC.NEXTVAL INTO :NEW."ID" FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/


CREATE TRIGGER "TIB_T_BIS_CLAS" BEFORE INSERT
ON "T_C2_BIS_CLAS" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN "ID" USES SEQUENCE S_C2_BIS_CLAS
    SELECT S_C2_BIS_CLAS.NEXTVAL INTO :NEW.ID FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/


CREATE TRIGGER "TIB_T_C2_BIS_ELE_BSC" BEFORE INSERT
ON "T_C2_BIS_ELE_BSC" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN ""ID"" USES SEQUENCE S_C2_BIS_ELE_BSC
    SELECT S_C2_BIS_ELE_BSC.NEXTVAL INTO :NEW."ID" FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/


CREATE TRIGGER "TIB_T_BIS_ELE_EX" BEFORE INSERT
ON "T_C2_BIS_ELE_EXT" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN "ID" USES SEQUENCE S_C2_BIS_ELE_EXT
    SELECT S_C2_BIS_ELE_EXT.NEXTVAL INTO :NEW.ID FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/


CREATE TRIGGER "TIB_T_C2_BIS_TP_MSG" BEFORE INSERT
ON "T_C2_BIS_TP_MSG" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN "ID" USES SEQUENCE S_C2_BIS_TP_MSG
    SELECT S_C2_BIS_TP_MSG.NEXTVAL INTO :NEW.ID FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/


CREATE TRIGGER "TIB_T_MSG_LIST" BEFORE INSERT
ON "T_C2_MSG_LIST" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN ""MSG_ID"" USES SEQUENCE S_C2_MSG_LIST
    SELECT S_C2_MSG_LIST.NEXTVAL INTO :NEW."MSG_ID" FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/


CREATE TRIGGER "TIB_T_MSG_PAIR" BEFORE INSERT
ON "T_C2_MSG_PAIR" FOR EACH ROW
DECLARE
    INTEGRITY_ERROR  EXCEPTION;
    ERRNO            INTEGER;
    ERRMSG           CHAR(200);
    DUMMY            INTEGER;
    FOUND            BOOLEAN;

BEGIN
    --  COLUMN ""ID"" USES SEQUENCE S_C2_MSG_PAIR
    SELECT S_C2_MSG_PAIR.NEXTVAL INTO :NEW."ID" FROM DUAL;

--  ERRORS HANDLING
EXCEPTION
    WHEN INTEGRITY_ERROR THEN
       RAISE_APPLICATION_ERROR(ERRNO, ERRMSG);
END;
/

