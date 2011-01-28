delete from T_SYS_OPER;
delete from T_SYS_FUNCS;
delete from T_SYS_USER;
delete from T_SYS_ORG;
delete from T_SYS_PARAM_CTRL;



--��T_SYS_PARAM_CTRL
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
values ( 'T_CONF_TRANSPORT', 'ISPRIVATE', 'T', '����');
insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ('T_CONF_TRANSPORT', 'ISPRIVATE', 'F', '����');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_NODE','TYPE','H','����ϵͳ');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_NODE','TYPE','P','����ϵͳ');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PROTOCOL','UPSEND','F','����');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PROTOCOL','UPSEND','D','����');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','DIRECTION','U','����');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','DIRECTION','D','����');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','TYPE','I','����');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','TYPE','O','�ӳ�');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','INOUT','IN','IN');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_PORT','INOUT','OUT','OUT');

insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_OPERATION','ISPERMIT','A','�첽');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_OPERATION','ISPERMIT','S','ͬ��');
insert into T_SYS_PARAM_CTRL(PARAM_CATG,PARAM_TYPE,PARAM_CODE,PARAM_NAME)
    values('T_CONF_OPERATION','ISPERMIT','N','�޻ظ�');


insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ( 'T_CFG_FORMAT', 'TYPE', '8583', '8583');
insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ( 'T_CFG_FORMAT', 'TYPE', '2', 'ͨ��');
insert into T_SYS_PARAM_CTRL ( PARAM_CATG, PARAM_TYPE, PARAM_CODE, PARAM_NAME)
values ( 'T_CFG_FORMAT', 'TYPE', 'XML', 'XML');

--��T_SYS_ORG
insert into T_SYS_ORG(ID, NAME,CODE,PID,description)
    values(1, 'Bank����','1000',null,null);

--��T_SYS_USER
insert into T_SYS_USER(ID, NAME,LOGINNAME,PASSWORD,OID,PHONE,CELL,EMAIL,description,CREATEDATE)
    values(1, '�����û�','admin','111111',1,null,null,null,null,null);

--��T_SYS_FUNCS
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(1, '��֯�û�Ȩ��','/app/orgUser_orgUserHome_jsp.action','��֯�û�Ȩ��');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(2, 'ϵͳ����','/app/sysfunc_sysFuncHome_jsp.action','ϵͳ����');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(3, '������Ϣ','/app/cfgTrans_cfgTransHome_jsp.action','������Ϣ');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(4, '����ϵͳ','/app/cfgnode_cfgNodeHome_jsp.action','����ϵͳ');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(5, 'ͨѶЭ��','/app/cfgprtcl_cfgPrtclHome_jsp.action','ͨѶЭ��');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(6, 'Э�����','/app/cfgOper_cfgOperHome_jsp.action','Э�����');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(7, '�˿�����','/app/cfgport_cfgPortHome_jsp.action','�˿�����');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(8, '·������','/app/cfgroute_cfgRouteHome_jsp.action','·������');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(9, 'ͨ�ñ���','/app/mesg_mesgHome_jsp.action','ͨ�ñ���');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(10, 'ͳ�Ʊ���','/app/report_reportHome_jsp.action','ͳ�Ʊ���');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(11, '������־','/app/tran_tranHome_jsp.action','������־');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(12, '������־','/app/tblhiber_tblhiberHome_jsp.action','������־');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(13, '�ط���־','/app/tblresend_tblresendHome_jsp.action','�ط���־');
insert into T_SYS_FUNCS(ID, NAME,URL,DESCRIPTION)
    values(14, '����ƥ������','/app/mesgmatch_mesgMatchHome_jsp.action','����ƥ������');

--��T_SYS_OPER
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