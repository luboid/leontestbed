--��T_SYS_PARAM_CTRL
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','PROVIDER','AMQ','��Ϣ');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','PROVIDER','JETTY','JETTY');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','CLASS','com.topfinance.cfg.om.OmCfgAMQInfo','com.topfinance.cfg.om.OmCfgAMQInfo');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_TRANSPORT','CLASS','com.topfinance.cfg.om.OmCfgJettyInfo','com.topfinance.cfg.om.OmCfgJettyInfo');


insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_NODE','TYPE','0','����ϵͳ');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_NODE','TYPE','1','����ϵͳ');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PROTOCOL','UPSEND','F','����');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PROTOCOL','UPSEND','D','����');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','DIRECTION','U','����');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','DIRECTION','D','����');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','TYPE','I','����');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','TYPE','O','�ӳ�');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','INOUT','IN','IN');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_PORT','INOUT','OUT','OUT');

insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISPERMIT','Y','����');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISPERMIT','N','������');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISACK','Y','�ظ�');
insert into T_SYS_PARAM_CTRL(CTRL_ID,PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values(S_SYS_PARAM_CTRL.nextval,'T_CONF_OPERATION','ISACK','N','�޻ظ�');

--��T_SYS_ORG
insert into T_SYS_ORG(ID,NAME,CODE,PID,description)
    values(S_SYS_ORG.nextval,'Bank����','1000',null,null);

--��T_SYS_USER
insert into T_SYS_USER(ID,NAME,LOGINNAME,PASSWORD,OID,PHONE,CELL,EMAIL,description,CREATEDATE)
    values(S_SYS_USER.nextval,'�����û�','admin','111111',1000,null,null,null,null,sysdate);

--��T_SYS_FUNCS
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'��֯�û�Ȩ��','/app/orgUser_orgUserHome_jsp.action','��֯�û�Ȩ��');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'ϵͳ����','/app/sysfunc_sysFuncHome_jsp.action','ϵͳ����');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'������Ϣ','/app/cfgTrans_cfgTransHome_jsp.action','������Ϣ');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'����ϵͳ','/app/cfgnode_cfgNodeHome_jsp.action','����ϵͳ');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'ͨѶЭ��','/app/cfgprtcl_cfgPrtclHome_jsp.action','ͨѶЭ��');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'Э�����','/app/cfgOper_cfgOperHome_jsp.action','Э�����');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'�˿�����','/app/cfgport_cfgPortHome_jsp.action','�˿�����');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'·������','/app/cfgroute_cfgRouteHome_jsp.action','·������');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'ͨ�ñ���','/app/mesg_mesgHome_jsp.action','ͨ�ñ���');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'ͳ�Ʊ���','/app/report_reportHome_jsp.action','ͳ�Ʊ���');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'������־','/app/tran_tranHome_jsp.action','������־');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'������־','/app/tblhiber_tblhiberHome_jsp.action','������־');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'�ط���־','/app/tblresend_tblresendHome_jsp.action','�ط���־');
insert into T_SYS_FUNCS(ID,NAME,URL,DESCRIPTION)
    values(S_SYS_FUNCS.nextval,'����ƥ������','/app/mesgmatch_mesgMatchHome_jsp.action','����ƥ������');

--��T_SYS_OPER
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

