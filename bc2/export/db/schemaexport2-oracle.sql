
    drop table T_CFG_FORMAT cascade constraints;

    drop table T_CFG_NODE cascade constraints;

    drop table T_CFG_OPERATION cascade constraints;

    drop table T_CFG_PORT_IN cascade constraints;

    drop table T_CFG_PORT_OUT cascade constraints;

    drop table T_CFG_PROTOCOL cascade constraints;

    drop table T_CFG_ROUTE_RULE cascade constraints;

    drop table T_CFG_TRANS_IN cascade constraints;

    drop table T_CFG_TRANS_OUT cascade constraints;

    drop table T_MSG_IBPS_101_001_01 cascade constraints;

    drop table T_MSG_IBPS_102_001_01 cascade constraints;

    drop table T_MSG_SAPS_601_001_01 cascade constraints;

    drop sequence S_CFG_NODE;

    drop sequence S_CFG_OPERATION;

    drop sequence S_CFG_OUT_TI;

    drop sequence S_CFG_PORMAT;

    drop sequence S_CFG_PORT_IN;

    drop sequence S_CFG_PROTOCOL;

    drop sequence S_CFG_ROUTE_RULE;

    drop sequence S_CFG_TI_IN;

    create table T_CFG_FORMAT (
        FORMAT varchar2(30 char) not null,
        OID number(10,0) not null,
        CONFIG varchar2(255 char),
        NAME varchar2(255 char),
        PATH_DOC_ID varchar2(255 char),
        PATH_OP_ID varchar2(255 char),
        PATH_ORIG_DOC_ID varchar2(255 char),
        primary key (OID)
    );

    create table T_CFG_NODE (
        OID number(10,0) not null,
        NAME varchar2(255 char),
        TYPE varchar2(255 char),
        primary key (OID)
    );

    create table T_CFG_OPERATION (
        OID number(10,0) not null,
        DOWN_MF varchar2(255 char),
        DOWN_PP_REPLY_TYPE varchar2(255 char),
        NAME varchar2(255 char),
        UP_MF varchar2(255 char),
        UP_PP_REPLY_TYPE varchar2(255 char),
        FORMAT_ID number(10,0),
        PROT_ID number(10,0),
        primary key (OID)
    );

    create table T_CFG_PORT_IN (
        OID number(10,0) not null,
        DIRECTION varchar2(255 char),
        NAME varchar2(255 char),
        URL varchar2(255 char),
        ACK_PORT_ID number(10,0),
        FORMAT_ID number(10,0),
        NODE_ID number(10,0),
        PROT_ID number(10,0),
        TRANS_INFO_ID number(10,0),
        primary key (OID)
    );

    create table T_CFG_PORT_OUT (
        OID number(10,0) not null,
        DIRECTION varchar2(255 char),
        NAME varchar2(255 char),
        URL varchar2(255 char),
        FORMAT_ID number(10,0),
        NODE_ID number(10,0),
        TRANS_INFO_ID number(10,0),
        primary key (OID)
    );

    create table T_CFG_PROTOCOL (
        OID number(10,0) not null,
        CONFIG varchar2(255 char),
        NAME varchar2(255 char),
        primary key (OID)
    );

    create table T_CFG_ROUTE_RULE (
        OID number(10,0) not null,
        direction varchar2(255 char),
        name varchar2(255 char),
        operationMask varchar2(255 char),
        sequence number(10,0) not null,
        OUTPORT_ID number(10,0),
        primary key (OID)
    );

    create table T_CFG_TRANS_IN (
        TYPE varchar2(30 char) not null,
        OID number(10,0) not null,
        CONFIG varchar2(255 char),
        IS_PRIVATE varchar2(255 char),
        NAME varchar2(255 char),
        PREFIX varchar2(255 char),
        PROVIDER varchar2(255 char),
        primary key (OID)
    );

    create table T_CFG_TRANS_OUT (
        TYPE varchar2(30 char) not null,
        OID number(10,0) not null,
        CONFIG varchar2(255 char),
        IS_PRIVATE varchar2(255 char),
        NAME varchar2(255 char),
        PREFIX varchar2(255 char),
        PROVIDER varchar2(255 char),
        primary key (OID)
    );

    create table T_MSG_IBPS_101_001_01 (
        UUID varchar2(255 char) not null,
        ACCPTNCDTTM timestamp,
        BRNCHID_ID varchar2(255 char),
        BRNCHID_ID1 varchar2(255 char),
        BTCHBOOKG number(1,0),
        CDTRACCT_ID_OTHR_ID varchar2(255 char),
        CDTR_NM varchar2(255 char),
        CHRGBR varchar2(255 char),
        CLRSYSMMBID_MMBID varchar2(255 char),
        CLRSYSMMBID_MMBID1 varchar2(255 char),
        CREDTTM timestamp,
        CTGYPURP_PRTRY varchar2(255 char),
        CTRLSUM double precision,
        CTRYSUBDVSN varchar2(255 char),
        DBTRACCT_ID_OTHR_ID varchar2(255 char),
        DBTRACCT_ID_OTHR_ISSR varchar2(255 char),
        DBTR_NM varchar2(255 char),
        EMAILADR varchar2(255 char),
        ENDTOENDID varchar2(255 char),
        GRPHDR_MSGID varchar2(255 char),
        INSTRPRTY varchar2(255 char),
        INTRBKSTTLMAMT_CCY varchar2(255 char),
        INTRBKSTTLMAMT_VALUE double precision,
        INTRBKSTTLMDT timestamp,
        NBOFTXS varchar2(255 char),
        PMTID_TXID varchar2(255 char),
        PURP_PRTRY varchar2(255 char),
        RMTINF_USTRD varchar2(255 char),
        STTLMMTD varchar2(255 char),
        TP_PRTRY varchar2(255 char),
        TS timestamp,
        primary key (UUID)
    );

    create table T_MSG_IBPS_102_001_01 (
        UUID varchar2(255 char) not null,
        ADDTLINF varchar2(255 char),
        BRNCHID_ID varchar2(255 char),
        BRNCHID_ID1 varchar2(255 char),
        CDTRACCT_ID_OTHR_ID varchar2(255 char),
        CDTRACCT_ID_OTHR_ISSR varchar2(255 char),
        CDTR_NM varchar2(255 char),
        CLRSYSMMBID_MMBID varchar2(255 char),
        CLRSYSMMBID_MMBID1 varchar2(255 char),
        CREDTTM timestamp,
        CTGYPURP_PRTRY varchar2(255 char),
        CTRYSUBDVSN varchar2(255 char),
        DBTRACCT_ID_OTHR_ID varchar2(255 char),
        DBTRACCT_ID_OTHR_ISSR varchar2(255 char),
        DBTR_NM varchar2(255 char),
        EMAILADR varchar2(255 char),
        GRPHDR_MSGID varchar2(255 char),
        INSTRPRTY varchar2(255 char),
        INTRBKSTTLMAMT_CCY varchar2(255 char),
        INTRBKSTTLMAMT_VALUE double precision,
        ORGNLENDTOENDID varchar2(255 char),
        ORGNLMSGID varchar2(255 char),
        ORGNLMSGNMID varchar2(255 char),
        ORGNLTXID varchar2(255 char),
        RSN_PRTRY varchar2(255 char),
        TP_PRTRY varchar2(255 char),
        TP_PRTRY1 varchar2(255 char),
        TS timestamp,
        TXINFANDSTS_STSID varchar2(255 char),
        primary key (UUID)
    );

    create table T_MSG_SAPS_601_001_01 (
        UUID varchar2(255 char) not null,
        ACCT_ID_OTHR_ID varchar2(255 char),
        ADDTLINF varchar2(255 char),
        AMT_CCY varchar2(255 char),
        AMT_CCY1 varchar2(255 char),
        AMT_VALUE double precision,
        AMT_VALUE1 double precision,
        BOOKGDT_DT timestamp,
        CDTDBTIND varchar2(255 char),
        CLRSYSREF varchar2(255 char),
        CREDTTM timestamp,
        CREDTTM1 timestamp,
        DBTRACCT_ID_OTHR_ID varchar2(255 char),
        DBTRACCT_ID_OTHR_ISSR varchar2(255 char),
        DBTR_NM varchar2(255 char),
        DOMN_CD varchar2(255 char),
        EMAILADR varchar2(255 char),
        FMLY_CD varchar2(255 char),
        GRPHDR_MSGID varchar2(255 char),
        NTFCTN_ID varchar2(255 char),
        NTRY_STS varchar2(255 char),
        RLTDACCT_ID_OTHR_ID varchar2(255 char),
        RPTGSRC_PRTRY varchar2(255 char),
        SUBFMLYCD varchar2(255 char),
        TP_PRTRY varchar2(255 char),
        TS timestamp,
        primary key (UUID)
    );

    alter table T_CFG_OPERATION 
        add constraint FKD00C0E61CA315B8D 
        foreign key (PROT_ID) 
        references T_CFG_PROTOCOL;

    alter table T_CFG_OPERATION 
        add constraint FKD00C0E6165A37EDC 
        foreign key (FORMAT_ID) 
        references T_CFG_FORMAT;

    alter table T_CFG_PORT_IN 
        add constraint FKA0D1293DCD27F77C 
        foreign key (NODE_ID) 
        references T_CFG_NODE;

    alter table T_CFG_PORT_IN 
        add constraint FKA0D1293DCA315B8D 
        foreign key (PROT_ID) 
        references T_CFG_PROTOCOL;

    alter table T_CFG_PORT_IN 
        add constraint FKA0D1293D65A37EDC 
        foreign key (FORMAT_ID) 
        references T_CFG_FORMAT;

    alter table T_CFG_PORT_IN 
        add constraint FKA0D1293DA2347560 
        foreign key (TRANS_INFO_ID) 
        references T_CFG_TRANS_IN;

    alter table T_CFG_PORT_IN 
        add constraint FKA0D1293D72B7D490 
        foreign key (ACK_PORT_ID) 
        references T_CFG_PORT_OUT;

    alter table T_CFG_PORT_OUT 
        add constraint FK79541616CD27F77C 
        foreign key (NODE_ID) 
        references T_CFG_NODE;

    alter table T_CFG_PORT_OUT 
        add constraint FK7954161665A37EDC 
        foreign key (FORMAT_ID) 
        references T_CFG_FORMAT;

    alter table T_CFG_PORT_OUT 
        add constraint FK79541616E1DD873D 
        foreign key (TRANS_INFO_ID) 
        references T_CFG_TRANS_OUT;

    alter table T_CFG_ROUTE_RULE 
        add constraint FK695F7978CBA66B38 
        foreign key (OUTPORT_ID) 
        references T_CFG_PORT_OUT;

    create sequence S_CFG_NODE;

    create sequence S_CFG_OPERATION;

    create sequence S_CFG_OUT_TI;

    create sequence S_CFG_PORMAT;

    create sequence S_CFG_PORT_IN;

    create sequence S_CFG_PROTOCOL;

    create sequence S_CFG_ROUTE_RULE;

    create sequence S_CFG_TI_IN;
