prompt PL/SQL Developer import file
prompt Created on 2011年1月23日 by xiays
set feedback off
set define off
prompt Creating T_SYS_PARAM_CTRL...
create table T_SYS_PARAM_CTRL
(
  CTRL_ID    NUMBER(38) not null,
  PARAM_CATG VARCHAR2(80) not null,
  PARAM_TYPE VARCHAR2(40) not null,
  PARAM_CODE VARCHAR2(40) not null,
  PARAM_NAME VARCHAR2(100) not null
)
tablespace GATEWAY
  pctfree 10
  initrans 1
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );
comment on table T_SYS_PARAM_CTRL
  is '参数控制';
comment on column T_SYS_PARAM_CTRL.CTRL_ID
  is '主键';
comment on column T_SYS_PARAM_CTRL.PARAM_CATG
  is '大类';
comment on column T_SYS_PARAM_CTRL.PARAM_TYPE
  is '参数类型';
comment on column T_SYS_PARAM_CTRL.PARAM_CODE
  is '参数值';
comment on column T_SYS_PARAM_CTRL.PARAM_NAME
  is '参数显示';
alter table T_SYS_PARAM_CTRL
  add constraint PK_T_SYS_PARAM_CTRL primary key (CTRL_ID)
  using index 
  tablespace GATEWAY
  pctfree 10
  initrans 2
  maxtrans 255
  storage
  (
    initial 64K
    minextents 1
    maxextents unlimited
  );

prompt Disabling triggers for T_SYS_PARAM_CTRL...
alter table T_SYS_PARAM_CTRL disable all triggers;
prompt Truncating T_SYS_PARAM_CTRL...
truncate table T_SYS_PARAM_CTRL;
prompt Loading T_SYS_PARAM_CTRL...

insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1000, 'T_CONF_TRANSPORT', 'PROVIDER', 'AMQ', '消息');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1001, 'T_CONF_TRANSPORT', 'PROVIDER', 'JETTY', 'JETTY');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1002, 'T_CONF_TRANSPORT', 'CLASS', 'com.topfinance.cfg.om.OmCfgAMQInfo', 'com.topfinance.cfg.om.OmCfgAMQInfo');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1003, 'T_CONF_TRANSPORT', 'CLASS', 'com.topfinance.cfg.om.OmCfgJettyInfo', 'com.topfinance.cfg.om.OmCfgJettyInfo');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1023, 'T_CONF_TRANSPORT', 'ISPRIVATE', 'T', '行内');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1024, 'T_CONF_TRANSPORT', 'ISPRIVATE', 'F', '行外');


insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1004, 'T_CONF_NODE', 'TYPE', '0', '行内系统');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1005, 'T_CONF_NODE', 'TYPE', '1', '渠道系统');

insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1006, 'T_CONF_PROTOCOL', 'UPSEND', 'F', '有效');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1007, 'T_CONF_PROTOCOL', 'UPSEND', 'D', '无效');

insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1008, 'T_CONF_PORT', 'DIRECTION', 'U', '上行');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1009, 'T_CONF_PORT', 'DIRECTION', 'D', '下行');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1010, 'T_CONF_PORT', 'TYPE', 'I', '接入');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1011, 'T_CONF_PORT', 'TYPE', 'O', '接出');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1012, 'T_CONF_PORT', 'INOUT', 'IN', 'IN');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1013, 'T_CONF_PORT', 'INOUT', 'OUT', 'OUT');


insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1014, 'T_CONF_OPERATION', 'ISPERMIT', 'A', '异步');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1015, 'T_CONF_OPERATION', 'ISPERMIT', 'S', '同步');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1016, 'T_CONF_OPERATION', 'ISACK', 'Y', '回复');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1017, 'T_CONF_OPERATION', 'ISACK', 'N', '无回复');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1018, 'T_CONF_OPERATION', 'downType', 'A', '允许');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1019, 'T_CONF_OPERATION', 'downType', 'S', '不允许');

insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1020, 'T_CFG_FORMAT', 'TYPE', '1', '8583');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1021, 'T_CFG_FORMAT', 'TYPE', '2', '通用');
insert into T_SYS_PARAM_CTRL (CTRL_ID, PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values (1022, 'T_CFG_FORMAT', 'TYPE', '3', 'XML');
commit;
prompt 25 records loaded
prompt Enabling triggers for T_SYS_PARAM_CTRL...
alter table T_SYS_PARAM_CTRL enable all triggers;
set feedback on
set define on
prompt Done.
