
--6.2日增加的

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.101.001.01','网银贷记业务报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.102.001.01','网银贷记业务回执报文','参与者->人行','Y','N');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.103.001.01','网银借记业务报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.104.001.01','网银借记业务回执报文','参与者->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.105.001.01','第三方贷记业务报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.106.001.01','第三方贷记业务回执报文','参与者->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ibps.303.001.01','自由格式报文','参与者<->人行','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.305.001.01','业务状态查询报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.306.001.01','业务状态查询应答报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.307.001.01','业务撤销申请报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.308.001.01','业务撤销应答报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.309.001.01','账户信息查询申请报文','参与者->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.310.001.01','账户信息查询应答报文','参与者<-人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.331.001.01','预授权申请报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.332.001.01','预授权应答报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.333.001.01','预授权撤销申请报文','参与者->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.334.001.01','预授权撤销应答报文','参与者<-人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.335.001.01','授权支付协议管理申请报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.336.001.01','授权支付协议管理应答报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.337.001.01','授权支付协议管理通知报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.338.001.01','授权支付协议管理通知应答报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.339.001.01','账户信息查询协议管理申请报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.340.001.01','账户信息查询协议管理应答报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.341.001.01','账户信息查询协议管理通知报文','参与者<->人行','Y','Y');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.342.001.01','账户信息查询协议管理通知应答报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'SAPS','saps.601.001.01','轧差通知报文','人行->参与者 ','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'SAPS','saps.603.001.01','清算通知报文','人行->参与者 ','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'SAPS','saps.605.001.01','计费与返还清单报文','人行->参与者','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.701.001.01','汇总核对报文','人行->参与者','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.703.001.01','业务明细核对申请报文','参与者->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.704.001.01','业务明细核对应答报文','人行->参与者','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.705.001.01','业务明细核对下载申请报文','参与者->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.706.001.01','业务明细核对下载应答报文','人行->参与者','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.801.001.01','系统状态变更通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.803.001.01','参与机构状态变更通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.805.001.01','登录/退出申请报文','参与者->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.806.001.01','登录/退出应答报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.807.001.01','强制离线通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.809.001.01','停运通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.900.001.01','通用处理确认报文','人行->参与者','Y','
');
insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'IBPS','ibps.901.001.01','行别变更通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.903.001.01','数字证书绑定通知报文','参与者<->人行','Y','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.905.001.01','参与机构变更通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.907.001.01','系统参数变更通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.909.001.01','支付业务金额上限变更通知报文','人行->参与者','','');

insert into T_MSG_LIST(ID,TYPE,MSGCODE,MSGNAME,DIRECTION,ENCRYPT,PAIR)
    values(S_SYS_MSG.nextval,'CCMS','ccms.990.001.01','通信级确认报文','人行<->参与者','','');

--6月3日数据
--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('1',sysdate,'1234567890','0987654321','IBPS','测试脚本');

--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('2',sysdate,'1234567890','0987654321','IBPS','测试脚本');

--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('3',sysdate,'1234567890','0987654321','IBPS','测试脚本');

--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('4',sysdate,'1234567890','0987654321','IBPS','测试脚本');

--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('5',sysdate,'1234567890','0987654321','IBPS','测试脚本');

--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('6',sysdate,'1234567890','0987654321','IBPS','测试脚本');

--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('7',sysdate,'1234567890','0987654321','IBPS','测试脚本');

--insert into T_MSG_IBPS303(MSGID,CREDTTM,INSTGPTY,INSTDPTY,SYSCD,MSGCNT)
--    values('8',sysdate,'1234567890','0987654321','IBPS','测试脚本');


--6.5日增加的
insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.101.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.101.001.01','U','','saps.601.001.01','D','','（处理成功时）轧差通知报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.101.001.01','D','','ibps.102.001.01','U','','网银贷记业务回执报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.102.001.01','U','','ccms.900.001.01','D','','（处理失败时）对原业务的通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.102.001.01','U','','saps.601.001.01','D','','（处理成功时）对原业务的轧差通知报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.103.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.103.001.01','U','','saps.601.001.01','D','','（处理成功时）轧差通知报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.103.001.01','D','','ibps.104.001.01','U','','网银借记业务回执报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.104.001.01??','U','','ccms.900.001.01','D','','（处理失败时）对原业务的通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.104.001.01??','U','','saps.601.001.01','D','','（处理成功时）对原业务的轧差通知报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.105.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.105.001.01','U','','saps.601.001.01','D','','（处理成功时）第三方贷记业务回执报文或者轧差通知报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.105.001.01','D','','ibps.106.001.01','U','','第三方贷记业务回执报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.106.001.01','U','','ccms.900.001.01','D','','（处理失败时）对原业务的通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.106.001.01','U','','saps.601.001.01','D','','（处理成功时）对原业务的轧差通知报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.303.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.303.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.305.001.01','U','','ibps.306.001.01','D','','业务状态查询应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.306.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.307.001.01','U','','ibps.308.001.01','D','','业务撤销应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.308.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.309.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.309.001.01','U','','ibps.310.001.01','D','','（处理成功时）账户信息查询应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.309.001.01','D','','ibps.310.001.01','U','','账户信息查询应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.310.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.310.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.331.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.331.001.01','U','','ibps.332.001.01','D','','（处理成功时）预授权应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.331.001.01','D','','ibps.332.001.01','U','','预授权应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.332.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.332.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.333.001.01','U','','ccms.900.001.01','U','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.333.001.01','U','','ibps.334.001.01','U','','（处理成功时）预授权撤销应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.333.001.01','D','','ibps.332.001.01','U','','预授权应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.334.001.01','U','','ccms.900.001.01','U','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.334.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.335.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.335.001.01','U','','ibps.336.001.01','D','','（处理成功时）授权支付协议管理应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.335.001.01','D','','ibps.336.001.01','U','','授权支付协议管理应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.336.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.336.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.337.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.337.001.01','U','','ibps.338.001.01','D','','（处理成功时）授权支付协议管理通知应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.337.001.01','D','','ibps.338.001.01','U','','授权支付协议管理通知应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.338.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.338.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.339.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.339.001.01','U','','ibps.340.001.01','D','','（处理成功时）账户信息查询协议管理应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.339.001.01','D','','ibps.340.001.01','U','','账户信息查询协议管理应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.340.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.340.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.341.001.01','U','','ccms.900.001.01','D','','（处理失败时）通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.341.001.01','U','','ibps.342.001.01','D','','（处理成功时）账户信息查询协议管理通知应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.341.001.01','D','','ibps.342.001.01','U','','账户信息查询协议管理通知应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.342.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.342.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','saps.601.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','saps.603.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','saps.605.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.701.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.703.001.01','U','','ibps.704.001.01','D','','业务明细核对应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.704.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.705.001.01','U','','ibps.706.001.01','U','','业务明细核对下载应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.706.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.801.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.805.001.01','U','','ccms.806.001.01','D','','登录/退出应答报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.806.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.807.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.809.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.900.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ibps.901.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.903.001.01','U','','ccms.900.001.01','D','','通用处理确认报文');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.903.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.905.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.907.001.01','D','','','','','无');

insert into T_MSG_PAIR(ID,TYPE,LEFTMSG,LEFTDIR,LEFTKEY,RIGHTMSG,RIGHTDIR,RIGHTKEY,MEMO)
    values(S_SYS_MSGPAIR.nextval,'IBPS','ccms.909.001.01','D','','','','','无');

