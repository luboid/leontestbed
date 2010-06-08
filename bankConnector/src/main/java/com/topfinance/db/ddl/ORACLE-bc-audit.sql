DROP TABLE TBL_AUDIT;
--:

DROP TABLE TBL_AUDIT_DETAIL;
--:

DROP TABLE TBL_HIBER;
--:

DROP TABLE TBL_RESEND;
--:


CREATE TABLE TBL_AUDIT (        
        AUDIT_ID       VARCHAR2(255)    PRIMARY KEY,
        DOC_ID         VARCHAR2(255)    NULL,
        TX_ID          VARCHAR2(255)    NULL,
        OP_NAME        VARCHAR2(512)    NULL,
        PARTNER        VARCHAR2(128)    NULL,
        HOST           VARCHAR2(128)    NULL,
        STATUS         VARCHAR2(64)     NULL,
        DIRECTION      VARCHAR2(5)      NULL,        
        DESCRIPTION    VARCHAR2(1024)   NULL,
        INPORT				 VARCHAR2(255)    NULL,
        OUTPORT				 VARCHAR2(255)    NULL,
        TS             TIMESTAMP	      DEFAULT SYSTIMESTAMP,
        STARTDATE      TIMESTAMP    		DEFAULT SYSTIMESTAMP
); 
--:

CREATE INDEX BC_AUDIT_TXID ON TBL_AUDIT(TX_ID);
--:


CREATE TABLE TBL_AUDIT_DETAIL (        
        U_ID           VARCHAR2(255)    PRIMARY KEY,
        AUDIT_ID       VARCHAR2(255)    not null,
        STATUS         VARCHAR2(64)     NULL,
        STATE          VARCHAR2(64)     NULL,        
        DESCRIPTION    VARCHAR2(1024)   NULL,
        TS             TIMESTAMP	      DEFAULT SYSTIMESTAMP
);
--:


CREATE INDEX BC_AUDITDETAIL_AUDITID ON TBL_AUDIT_DETAIL(AUDIT_ID);
--:


CREATE TABLE TBL_HIBER (        
        HIBERKEY          VARCHAR2(255)    PRIMARY KEY,
        TX_ID        			VARCHAR2(255)    NULL,
        AUDIT_ID        	VARCHAR2(512)    NULL,
        STATUS             VARCHAR2(64)     NULL,
        TS                 TIMESTAMP	DEFAULT SYSTIMESTAMP,
        EXPIRATION         NUMBER(18) not null,
        DIRECTION          VARCHAR2(5)     NULL
);
--:

CREATE TABLE TBL_RESEND (        
        RESENDKEY          VARCHAR2(255)    PRIMARY KEY,
        AUDIT_ID        	VARCHAR2(512)    NULL,
        STATUS             VARCHAR2(64)     NULL,
        TS                 TIMESTAMP	not null,
        EXPIRATION         NUMBER(18)  not null,
        INPORT_NAME        VARCHAR2(64)     NULL,
        BIN                BLOB          NULL,
        RETRY_COUNT        NUMBER(3)     NULL,
        DIRECTION          VARCHAR2(5)   NULL
);
--:

