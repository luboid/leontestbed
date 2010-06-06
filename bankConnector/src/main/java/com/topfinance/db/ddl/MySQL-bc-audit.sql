DROP TABLE IF EXISTS TBL_AUDIT;
--:

DROP TABLE IF EXISTS TBL_AUDIT_DETAIL;
--:

DROP TABLE IF EXISTS TBL_HIBER;
--:

DROP TABLE IF EXISTS TBL_RESEND;
--:


CREATE TABLE TBL_AUDIT (        
        AUDIT_ID          VARCHAR(255)    PRIMARY KEY,
        DOC_ID           VARCHAR(255)    NULL,
        TX_ID        VARCHAR(255)    NULL,
        OP_NAME        VARCHAR(512)    NULL,
        PARTNER             VARCHAR(128)    NULL,
        HOST           VARCHAR(128)    NULL,
        STATUS             VARCHAR(64)     NULL,
        DIRECTION      VARCHAR(5)      null,        
        DESCRIPTION    VARCHAR(1024)     NULL,
        INPORT					VARCHAR(255),
        OUTPORT					VARCHAR(255),
        TS                 TIMESTAMP	not null, 
        STARTDATE          TIMESTAMP    not null,
    INDEX TBL_AUDIT_AUDITID (AUDIT_ID)
) Type=InnoDB;
--:

CREATE TABLE TBL_AUDIT_DETAIL (        
        U_ID          VARCHAR(255)    PRIMARY KEY,
        AUDIT_ID          VARCHAR(255) not null,
        STATUS             VARCHAR(64)     NULL,
        STATE             VARCHAR(64)     NULL,        
        DESCRIPTION    VARCHAR(1024)     NULL,
        TS                 TIMESTAMP	not null,
    INDEX TBL_AUDIT_DETAIL_U_ID (U_ID)
) Type=InnoDB;
--:

CREATE TABLE TBL_HIBER (        
        HIBERKEY          VARCHAR(255)    PRIMARY KEY,
        TX_ID        			VARCHAR(255)    NULL,
        AUDIT_ID        	VARCHAR(512)    NULL,
        STATUS             VARCHAR(64)     NULL,
        TS                 TIMESTAMP	not null,
        EXPIRATION         bigint(20) unsigned  not null,
        DIRECTION          VARCHAR(5)    ,
    INDEX TBL_HIBER_HIBERKEY (HIBERKEY)
) Type=InnoDB;
--:

CREATE TABLE TBL_RESEND (        
        RESENDKEY          VARCHAR(255)    PRIMARY KEY,
        AUDIT_ID        	VARCHAR(512)    NULL,
        STATUS             VARCHAR(64)     NULL,
        TS                 TIMESTAMP	not null,
        EXPIRATION         bigint(20) unsigned  not null,
        INPORT_NAME        VARCHAR(64)     NULL,
        BIN                BLOB,
        RETRY_COUNT        INT(10),
        DIRECTION          VARCHAR(5)    ,
    INDEX TBL_RESEND_RESENDKEY (RESENDKEY)
) Type=InnoDB;
--:


