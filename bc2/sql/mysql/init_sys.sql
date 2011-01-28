delete from T_SYS_OPER;
delete from T_SYS_FUNCS;
delete from T_SYS_USER;
delete from T_SYS_ORG;
delete from T_SYS_PARAM_CTRL;



--表T_SYS_PARAM_CTRL
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_TRANSPORT','PROVIDER','AMQ','ApacheMQ');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_TRANSPORT','PROVIDER','JETTY','JETTY');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_TRANSPORT','PROVIDER','IBMMQ','IBMMQ');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_TRANSPORT','PROVIDER','8583','ISO8583');
    
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_TRANSPORT','CLASS','com.topfinance.cfg.om.OmCfgAMQInfo','com.topfinance.cfg.om.OmCfgAMQInfo');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_TRANSPORT','CLASS','com.topfinance.cfg.om.OmCfgJettyInfo','com.topfinance.cfg.om.OmCfgJettyInfo');
insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ( 'T_CONF_TRANSPORT', 'ISPRIVATE', 'T', '行内');
insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ('T_CONF_TRANSPORT', 'ISPRIVATE', 'F', '行外');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_NODE','TYPE','H','行内系统');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_NODE','TYPE','P','渠道系统');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PROTOCOL','UPSEND','F','上行');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PROTOCOL','UPSEND','D','下行');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','DIRECTION','U','上行');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','DIRECTION','D','下行');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','TYPE','I','接入');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','TYPE','O','接出');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','INOUT','IN','IN');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','INOUT','OUT','OUT');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_OPERATION','ISPERMIT','A','异步');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_OPERATION','ISPERMIT','S','同步');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_OPERATION','ISPERMIT','N','无回复');


insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ( 'T_CFG_FORMAT', 'TYPE', '8583', '8583');
insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ( 'T_CFG_FORMAT', 'TYPE', '2', '通用');
insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ( 'T_CFG_FORMAT', 'TYPE', 'XML', 'XML');

--表T_SYS_ORG
insert into T_SYS_ORG(ID, NAME,CODE,PID,description)
    values(1, 'Bank银行','1000',null,null);

--表T_SYS_USER
insert into T_SYS_USER(ID, NAME,LOGINNAME,PASSWORD,OID,PHONE,CELL,EMAIL,description,CREATEDATE)
    values(1, '管理用户','admin','111111',1,null,null,null,null,null);

--表T_SYS_FUNCS
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(1, '组织用户权限','/app/orgUser_orgUserHome_jsp.action','组织用户权限');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(2, '系统功能','/app/sysfunc_sysFuncHome_jsp.action','系统功能');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(3, '传输信息','/app/cfgTrans_cfgTransHome_jsp.action','传输信息');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(4, '关联系统','/app/cfgnode_cfgNodeHome_jsp.action','关联系统');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(5, '通讯协议','/app/cfgprtcl_cfgPrtclHome_jsp.action','通讯协议');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(6, '协议操作','/app/cfgOper_cfgOperHome_jsp.action','协议操作');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(7, '端口配置','/app/cfgport_cfgPortHome_jsp.action','端口配置');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(8, '路由配置','/app/cfgroute_cfgRouteHome_jsp.action','路由配置');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(9, '通用报文','/app/mesg_mesgHome_jsp.action','通用报文');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(10, '统计报表','/app/report_reportHome_jsp.action','统计报表');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(11, '交换日志','/app/tran_tranHome_jsp.action','交换日志');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(12, '休眠日志','/app/tblhiber_tblhiberHome_jsp.action','休眠日志');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(13, '重发日志','/app/tblresend_tblresendHome_jsp.action','重发日志');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(14, '交易匹配配置','/app/mesgmatch_mesgMatchHome_jsp.action','交易匹配配置');

--表T_SYS_OPER
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,1,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,2,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,3,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,4,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,5,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,6,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,7,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,8,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,9,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,10,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,11,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,12,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,13,'Y');
insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
    values(1,14,'Y');
--insert into T_SYS_OPER(USERID,FUNCID,ENABLED)
--    values(1,1020,'N');

commit;