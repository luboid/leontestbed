--表T_SYS_PARAM_CTRL
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','PROVIDER','AMQ','消息');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','PROVIDER','JETTY','JETTY');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','CLASS','com.topfinance.cfg.om.OmCfgAMQInfo','com.topfinance.cfg.om.OmCfgAMQInfo');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','CLASS','com.topfinance.cfg.om.OmCfgJettyInfo','com.topfinance.cfg.om.OmCfgJettyInfo');


insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_NODE','TYPE','0','行内系统');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_NODE','TYPE','1','渠道系统');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PROTOCOL','UPSEND','F','上行');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PROTOCOL','UPSEND','D','下行');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','DIRECTION','U','上行');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','DIRECTION','D','下行');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','TYPE','I','接入');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','TYPE','O','接出');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','INOUT','IN','IN');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','INOUT','OUT','OUT');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISPERMIT','Y','允许');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISPERMIT','N','不允许');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISACK','Y','回复');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISACK','N','无回复');

--表T_SYS_ORG
insert into T_SYS_ORG(ID,NAME,CODE,PID,description)
    values(S_SYS_ORG.nextval,'Bank银行','1000',null,null);

--表T_SYS_USER
insert into T_SYS_USER(ID,NAME,LOGINNAME,PASSWORD,OID,PHONE,CELL,EMAIL,description,CREATEDATE)
    values(S_SYS_USER.nextval,'管理用户','admin','111111',1000,null,null,null,null,sysdate);

--表T_SYS_FUNCS
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'组织用户权限','/app/orgUser_orgUserHome_jsp.action','组织用户权限');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'系统功能','/app/sysfunc_sysFuncHome_jsp.action','系统功能');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'传输信息','/app/cfgTrans_cfgTransHome_jsp.action','传输信息');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'关联系统','/app/cfgnode_cfgNodeHome_jsp.action','关联系统');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'通讯协议','/app/cfgprtcl_cfgPrtclHome_jsp.action','通讯协议');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'协议操作','/app/cfgOper_cfgOperHome_jsp.action','协议操作');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'端口配置','/app/cfgport_cfgPortHome_jsp.action','端口配置');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'路由配置','/app/cfgroute_cfgRouteHome_jsp.action','路由配置');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'通用报文','/app/mesg_mesgHome_jsp.action','通用报文');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'统计报表','/app/report_reportHome_jsp.action','统计报表');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'交换日志','/app/tran_tranHome_jsp.action','交换日志');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'休眠日志','/app/tblhiber_tblhiberHome_jsp.action','休眠日志');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'重发日志','/app/tblresend_tblresendHome_jsp.action','重发日志');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'交易匹配配置','/app/mesgmatch_mesgMatchHome_jsp.action','交易匹配配置');

--表T_SYS_OPER
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1000,'Y');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1001,'Y');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1002,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1003,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1004,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1005,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1006,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1007,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1008,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1009,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1010,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1011,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1012,'N');
insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1013,'N');
--insert into T_SYS_OPER(ID,USERID,FUNCID,ENABLED)
--    values(S_SYS_OPER.nextval,S_SYS_USER.currval,1020,'N');

