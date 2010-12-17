
    alter table T_CFG_OPERATION 
        drop 
        foreign key FKD00C0E61CA315B8D;

    alter table T_CFG_PORT 
        drop 
        foreign key FK52E99F27CD27F77C;

    alter table T_CFG_PORT 
        drop 
        foreign key FK52E99F27CA315B8D;

    alter table T_CFG_PORT 
        drop 
        foreign key FK52E99F277806506A;

    alter table T_CFG_PORT 
        drop 
        foreign key FK52E99F27C59CB154;

    alter table T_CFG_PORT 
        drop 
        foreign key FK52E99F273AA09DD1;

    alter table T_CFG_PORT 
        drop 
        foreign key FK52E99F2772B7D490;

    alter table T_CFG_PORT 
        drop 
        foreign key FK52E99F279554817D;

    alter table T_CFG_ROUTE_RULE 
        drop 
        foreign key FK695F7978CBA66B38;

    drop table if exists T_CFG_MSG_HANDLER;

    drop table if exists T_CFG_NODE;

    drop table if exists T_CFG_OPERATION;

    drop table if exists T_CFG_PORT;

    drop table if exists T_CFG_PROTOCOL;

    drop table if exists T_CFG_ROUTE_RULE;

    drop table if exists T_CFG_TRANSPORT_INFO;

    drop table if exists T_MSG_IBPS_101_001_01;

    drop table if exists T_MSG_IBPS_102_001_01;

    drop table if exists T_MSG_SAPS_601_001_01;

    create table T_CFG_MSG_HANDLER (
        TYPE varchar(30) not null,
        OID integer not null auto_increment,
        CLAZZ varchar(255),
        NAME varchar(255),
        primary key (OID)
    );

    create table T_CFG_NODE (
        OID integer not null auto_increment,
        NAME varchar(255),
        TYPE varchar(255),
        primary key (OID)
    );

    create table T_CFG_OPERATION (
        OID integer not null auto_increment,
        DOWN_MF varchar(255),
        DOWN_PP_REPLY_TYPE varchar(255),
        NAME varchar(255),
        UP_MF varchar(255),
        UP_PP_REPLY_TYPE varchar(255),
        PROT_ID integer,
        primary key (OID)
    );

    create table T_CFG_PORT (
        IN_OR_OUT varchar(30) not null,
        OID integer not null auto_increment,
        DIRECTION varchar(255),
        NAME varchar(255),
        URL varchar(255),
        NODE_ID integer,
        TRANS_INFO_ID integer,
        ACK_PORT_ID integer,
        PROT_ID integer,
        SYNCREPLY_MH_ID integer,
        UPIN_MH_ID integer,
        DOWNOUT_MH_ID integer,
        primary key (OID)
    );

    create table T_CFG_PROTOCOL (
        OID integer not null auto_increment,
        CONFIG varchar(255),
        NAME varchar(255),
        primary key (OID)
    );

    create table T_CFG_ROUTE_RULE (
        OID integer not null auto_increment,
        direction varchar(255),
        name varchar(255),
        operationMask varchar(255),
        sequence integer not null,
        OUTPORT_ID integer,
        primary key (OID)
    );

    create table T_CFG_TRANSPORT_INFO (
        TYPE varchar(30) not null,
        OID integer not null auto_increment,
        CONFIG varchar(255),
        NAME varchar(255),
        PREFIX varchar(255),
        PROVIDER varchar(255),
        channel varchar(255),
        hostName varchar(255),
        port integer,
        queueManager varchar(255),
        transportType integer,
        primary key (OID)
    );

    create table T_MSG_IBPS_101_001_01 (
        UUID varchar(255) not null,
        ACCPTNCDTTM datetime,
        BRNCHID_ID varchar(255),
        BRNCHID_ID1 varchar(255),
        BTCHBOOKG bit,
        CDTRACCT_ID_OTHR_ID varchar(255),
        CDTR_NM varchar(255),
        CHRGBR varchar(255),
        CLRSYSMMBID_MMBID varchar(255),
        CLRSYSMMBID_MMBID1 varchar(255),
        CREDTTM datetime,
        CTGYPURP_PRTRY varchar(255),
        CTRLSUM double precision,
        CTRYSUBDVSN varchar(255),
        DBTRACCT_ID_OTHR_ID varchar(255),
        DBTRACCT_ID_OTHR_ISSR varchar(255),
        DBTR_NM varchar(255),
        EMAILADR varchar(255),
        ENDTOENDID varchar(255),
        GRPHDR_MSGID varchar(255),
        INSTRPRTY varchar(255),
        INTRBKSTTLMAMT_CCY varchar(255),
        INTRBKSTTLMAMT_VALUE double precision,
        INTRBKSTTLMDT datetime,
        NBOFTXS varchar(255),
        PMTID_TXID varchar(255),
        PURP_PRTRY varchar(255),
        RMTINF_USTRD varchar(255),
        STTLMMTD varchar(255),
        TP_PRTRY varchar(255),
        TS datetime,
        primary key (UUID)
    );

    create table T_MSG_IBPS_102_001_01 (
        UUID varchar(255) not null,
        ADDTLINF varchar(255),
        BRNCHID_ID varchar(255),
        BRNCHID_ID1 varchar(255),
        CDTRACCT_ID_OTHR_ID varchar(255),
        CDTRACCT_ID_OTHR_ISSR varchar(255),
        CDTR_NM varchar(255),
        CLRSYSMMBID_MMBID varchar(255),
        CLRSYSMMBID_MMBID1 varchar(255),
        CREDTTM datetime,
        CTGYPURP_PRTRY varchar(255),
        CTRYSUBDVSN varchar(255),
        DBTRACCT_ID_OTHR_ID varchar(255),
        DBTRACCT_ID_OTHR_ISSR varchar(255),
        DBTR_NM varchar(255),
        EMAILADR varchar(255),
        GRPHDR_MSGID varchar(255),
        INSTRPRTY varchar(255),
        INTRBKSTTLMAMT_CCY varchar(255),
        INTRBKSTTLMAMT_VALUE double precision,
        ORGNLENDTOENDID varchar(255),
        ORGNLMSGID varchar(255),
        ORGNLMSGNMID varchar(255),
        ORGNLTXID varchar(255),
        RSN_PRTRY varchar(255),
        TP_PRTRY varchar(255),
        TP_PRTRY1 varchar(255),
        TS datetime,
        TXINFANDSTS_STSID varchar(255),
        primary key (UUID)
    );

    create table T_MSG_SAPS_601_001_01 (
        UUID varchar(255) not null,
        ACCT_ID_OTHR_ID varchar(255),
        ADDTLINF varchar(255),
        AMT_CCY varchar(255),
        AMT_CCY1 varchar(255),
        AMT_VALUE double precision,
        AMT_VALUE1 double precision,
        BOOKGDT_DT datetime,
        CDTDBTIND varchar(255),
        CLRSYSREF varchar(255),
        CREDTTM datetime,
        CREDTTM1 datetime,
        DBTRACCT_ID_OTHR_ID varchar(255),
        DBTRACCT_ID_OTHR_ISSR varchar(255),
        DBTR_NM varchar(255),
        DOMN_CD varchar(255),
        EMAILADR varchar(255),
        FMLY_CD varchar(255),
        GRPHDR_MSGID varchar(255),
        NTFCTN_ID varchar(255),
        NTRY_STS varchar(255),
        RLTDACCT_ID_OTHR_ID varchar(255),
        RPTGSRC_PRTRY varchar(255),
        SUBFMLYCD varchar(255),
        TP_PRTRY varchar(255),
        TS datetime,
        primary key (UUID)
    );

    alter table T_CFG_OPERATION 
        add index FKD00C0E61CA315B8D (PROT_ID), 
        add constraint FKD00C0E61CA315B8D 
        foreign key (PROT_ID) 
        references T_CFG_PROTOCOL (OID);

    alter table T_CFG_PORT 
        add index FK52E99F27CD27F77C (NODE_ID), 
        add constraint FK52E99F27CD27F77C 
        foreign key (NODE_ID) 
        references T_CFG_NODE (OID);

    alter table T_CFG_PORT 
        add index FK52E99F27CA315B8D (PROT_ID), 
        add constraint FK52E99F27CA315B8D 
        foreign key (PROT_ID) 
        references T_CFG_PROTOCOL (OID);

    alter table T_CFG_PORT 
        add index FK52E99F277806506A (TRANS_INFO_ID), 
        add constraint FK52E99F277806506A 
        foreign key (TRANS_INFO_ID) 
        references T_CFG_TRANSPORT_INFO (OID);

    alter table T_CFG_PORT 
        add index FK52E99F27C59CB154 (SYNCREPLY_MH_ID), 
        add constraint FK52E99F27C59CB154 
        foreign key (SYNCREPLY_MH_ID) 
        references T_CFG_MSG_HANDLER (OID);

    alter table T_CFG_PORT 
        add index FK52E99F273AA09DD1 (DOWNOUT_MH_ID), 
        add constraint FK52E99F273AA09DD1 
        foreign key (DOWNOUT_MH_ID) 
        references T_CFG_MSG_HANDLER (OID);

    alter table T_CFG_PORT 
        add index FK52E99F2772B7D490 (ACK_PORT_ID), 
        add constraint FK52E99F2772B7D490 
        foreign key (ACK_PORT_ID) 
        references T_CFG_PORT (OID);

    alter table T_CFG_PORT 
        add index FK52E99F279554817D (UPIN_MH_ID), 
        add constraint FK52E99F279554817D 
        foreign key (UPIN_MH_ID) 
        references T_CFG_MSG_HANDLER (OID);

    alter table T_CFG_ROUTE_RULE 
        add index FK695F7978CBA66B38 (OUTPORT_ID), 
        add constraint FK695F7978CBA66B38 
        foreign key (OUTPORT_ID) 
        references T_CFG_PORT (OID);
