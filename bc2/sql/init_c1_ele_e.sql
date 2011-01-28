--扩展
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00101','委托收款（划回）业务','1','','委托凭证日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00101','委托收款（划回）业务','2','','委托凭证号码','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00101','委托收款（划回）业务','3','','凭证种类号','M','2n','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00102','托收承付（划回）业务','1','','托收凭证日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00102','托收承付（划回）业务','2','','托收凭证号码','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00102','托收承付（划回）业务','3','','赔偿金金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00102','托收承付（划回）业务','4','','拒付金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00102','托收承付（划回）业务','5','','原托金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00102','托收承付（划回）业务','6','','支付金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00102','托收承付（划回）业务','7','','多付金额','M','15n','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','1','','信息流水号','M','8n','登记发出时的流水号','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','2','','金额','M','18n','除总额分成外，表示明细汇总金额，对于总额分成表示上解金额','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','3','','上报国库代码','M','10n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','4','','接收国库代码','M','10n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','5','','预算级次','M','1N','1－中央 2－省级','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','6','','调整期标志','M','1n','0-正常 1-调整期','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','7','','预算种类','M','1n','1--预算内 ；2--预算外 ','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','8','','报表日期','M','8n','YYYYMMDD','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','9','','报表序号','M','3n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','10','','明细条数','M','3n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','100','10','征收机关大类代码','M','10n','1111111111－国税；2222222222－地税；3333333333－海关；4444444444－财政；5555555555－其他','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','101','10','预算科目代码','M','20x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00103','国库资金贷记划拨业务','102','10','发生额','M','18n','','BEPS');


insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00500','一般通用信息业务','1','','标题','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00500','一般通用信息业务','2','','正文内容','M','255g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00500','一般通用信息业务','3','','附件文件名','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00500','一般通用信息业务','4','','附件长度','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('00500','一般通用信息业务','5','','附件内容','O','nE','见说明','BEPS');


insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','1','','征收机关代码','M','11n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','2','','委托日期','M','8n','征收机关委托扣税日期','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','3','','交易流水号','M','8x','征收机关发出的交易流水号','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','4','','扣税日期','O','8n','商业银行的扣税日期(如扣税成功，此项必添；如扣税不成功，可为空)','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','5','','税票号码','M','18n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','6','','备注','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','7','','备注1','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20101','实时扣税','8','','备注2','O','60g','','BEPS');


insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20002','非税收入','1','','付费单位','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20002','非税收入','2','','所属期间','M','16n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20002','非税收入','3','','收入种类','M','2n','根据实际情况定义','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','1','','国库代码','M','10n','由国库部门制订的全国统一的代码','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','2','','付款人账号','M','32x','国库的库款账户','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','3','','代理银行代码','M','12x','财政、国库制订的代理银行代码','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','4','','预算种类','M','1n','1-预算内，2-预算外','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','5','','调整期标志','M','1n','0-正常期 1-调整期','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','6','','零余额汇总发生额','M','18n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','7','','小额现金汇总发生额','M','18n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','8','','凭证编号','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','9','','凭证日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','10','','明细条数','M','3n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','100','10','预算单位代码','M','15x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','101','10','功能分类科目代码','M','20x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','102','10','经济分类科目代码','O','20x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','103','10','账户性质','M','1n','1-零余额账户，2-小额现金账户','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20103','财政直接支付','104','10','金额','M','18n','明细金额','BEPS');


insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30101','个人储蓄通兑业务','1','','付款人账户类型','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30101','个人储蓄通兑业务','2','','收款人账户类型','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30101','个人储蓄通兑业务','3','','通兑业务模式','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30101','个人储蓄通兑业务','4','','密码验证码算法','M','2n','01：客户密码；02：支付密码单密码；03：支付密码器密码；04：授权码；05：其他','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30101','个人储蓄通兑业务','5','','密码验证码长度','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30101','个人储蓄通兑业务','6','','密码验证码值','M','NE','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30001','个人储蓄通存业务','1','','付款人账户类型','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30001','个人储蓄通存业务','2','','收款人账户类型','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30001','个人储蓄通存业务','3','','通存业务模式','M','1n','见说明','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30505',' 证书查询申请报文','1','','附言','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30505',' 证书查询申请报文','2','','证书长度','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30505',' 证书查询申请报文','3','','证书','M','nE','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30506','证书查询应答报文','1','','检查结果','M','1n','0 合法 1 非法','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30506','证书查询应答报文','2','','备注','O','60g','见说明','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','1','','出票日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','2','','支票号码','M','12n','不足12位时左边补零','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','3','','付款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','4','','出票人账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','5','','收款人账号','O','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','6','','金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','7','','用途','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','8','','背书人数','O','2n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','9','','背书人清单','O','ng','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','100','9','背书人名称','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','10','','支票密码','O','512x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','11','','票据图像数据长度1','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','13','','票据图像数据1','M','nE','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','14','','票据图像数据长度2','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30102','支票截留业务','15','','票据图像数据2','M','nE','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','1','','出票日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','2','','票据号码','M','20x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','3','','付款行行号','O','12n','当票据种类为01、03、05时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','4','','代理付款行行号','O','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','5','','出票金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','6','','用途','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','7','','背书人数','O','2n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','8','','背书人清单','O','Ng','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','100','8','背书人名称','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','9','','支票密码','O','512x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','10','','票据种类','M','2n','见说明(1)','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','11','','提示付款日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','12','','密押','O','20x','票据种类为01、05时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','13','','汇票到期日','O','8n','票据种类为02、03时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','14','','承兑协议编号','O','20n','票据种类为03时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','15','','交易合同号码','O','20n','票据种类为02、03时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','16','','承兑日期','O','8n','票据种类为02、03时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','17','','承兑人','O','60g','票据种类为02、03时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','18','','申请人名称','O','60g','票据种类为01、05时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','19','','申请人账号','O','32x','票据种类为01时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','20','','付款人开户银行名称','O','60g','票据种类为02、04时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','21','','收款人开户银行名称','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','22','','出票人全称','O','60g','票据种类为02、03、04时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','23','','出票人账号','O','32x','票据种类为03、04时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','24','','付款行名称','O','60g','当票据种类为01、03、05时为强制项','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','25','','附言','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','26','','票据图像数据长度1','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','27','','票据图像数据1','M','nE','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','28','','票据图像数据长度2','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30103','通用截留业务','29','','票据图像数据2','M','nE','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30502','客户账户信息查询业务','1','','账号类型','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30502','客户账户信息查询业务','2','','账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30502','客户账户信息查询业务','3','','密码验证码算法','M','2n','01：客户密码；02：支付密码单密码；03：支付密码器密码；04：授权码；05：其他','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30502','客户账户信息查询业务','4','','密码验证码长度','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30502','客户账户信息查询业务','5','','密码验证码值','M','NE','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30502','客户账户信息查询业务','6','','查询类型','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30502','客户账户信息查询业务','7','','查询附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','1','','原批量包日期','M','8n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','2','','原批量包序号','M','8n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','3','','原委托日期','M','8n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','4','','原信息序号','M','8n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','5','','账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','6','','原查询类型','M','1n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','7','','应答标识','M','1n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','8','','当前余额','O','3x15n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','9','','当前账户状态','O','2n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30503','客户账户信息查询应答业务','10','','查复附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','1','','出票日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','2','','支票号码','M','12n','不足12位时左边补零','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','3','','付款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','4','','出票人账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','5','','收款人账号','O','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','6','','金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','7','','用途','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','8','','背书人数','O','2n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','9','','背书人清单','O','ng','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','100','9','背书人名称','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','10','','校验模式','M','2n','01：支付密码单密码；02：支付密码器密码；03：数字签名；04：影像；05：其他','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','11','','校验密码','M','512x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','12','','票据图像数据长度','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30501','支票圈存申请业务','13','','票据图像数据','O','nE','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','1','','代收付中心工作日','M','8n','提交业务时代收付中心工作日','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','2','','合同（协议）号','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','3','','付款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','4','','付款人开户行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','5','','付款人账号','M','32X','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','6','','付款人名称','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','7','','付款人地址','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','8','','业务种类','M','5n','说明付款事由，如代发工资等,按照小额的标准编码','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','9','','本条付款总金额','M','15n','等于所有收款人收款金额之和，用于总分检验。','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','10','','收款人清算行行号','M','12n','为方便付款行处理，同一业务要素集只允许收款人属于同一清算行。','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','11','','收款人数目','M','8n','K条（明细条数）','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','12','','收款人清单','M','ng','K*(8n12n12n32x60g60g15n60g)','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','100','12','明细序号','M','8n','本业务要素集（信息业务序号）内唯一','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','101','12','收款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','102','12','收款人开户行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','103','12','收款人账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','104','12','收款人名称','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','105','12','收款人地址','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','106','12','金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40501','代付业务信息','107','12','附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','1','','代收付中心工作日','M','8n','提交业务时代收付中心工作日','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','2','','回执期限（天数）','M','2n','收款行办理定期借记业务的回执返回期限','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','3','','收款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','4','','收款人开户行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','5','','收款人账户','M','32X','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','6','','收款人名称','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','7','','收款人地址','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','8','','业务种类','M','5n','说明收款事由，如代收电话费等，按照小额的标准编码。','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','9','','本条收款总金额','M','15n','等于所有付款人付款金额之和，用于总分检验。','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','10','','付款人清算行行号','M','12n','为方便收款行处理，同一业务要素集只允许付款人属于同一清算行。','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','11','','付款人数目','M','8n','K条','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','12','','付款人清单','M','ng','K*((8n12n12n32x60g60g15n60g60g)','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','100','12','明细序号','M','8n','本业务要素集（信息业务序号）内唯一','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','101','12','付款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','102','12','付款人开户行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','103','12','付款人账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','104','12','付款人名称','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','105','12','付款人地址','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','106','12','金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','107','12','合同（协议）号','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40502','代收业务信息','108','12','附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','1','','原交易委托日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','2','','原交易信息业务序号','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','3','','付款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','4','','付款人开户行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','5','','付款人账号','M','32X','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','6','','收款人清算行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','7','','原交易要求付款总金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','8','','成功付款总金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','9','','成功笔数','M','8n','M条','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','10','','原交易收款人数目','M','8n','K条','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','11','','结果清单','M','ng','n=K*(8n32x15n2n60g)','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','100','11','明细序号','M','8n','原明细序号','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','101','11','收款人账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','102','11','金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','103','11','回执状态','M','2n','同2.16节业务回执状态号','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40503','批量代付业务回执','104','11','附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','1','','原交易委托日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','2','','原交易信息业务序号','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','3','','收款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','4','','收款人开户行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','5','','收款人账号','M','32X','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','6','','付款人清算行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','7','','原交易要求收款总金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','8','','成功收款总金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','9','','成功笔数','M','8n','M条','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','10','','原交易付款人数目','M','8n','K条','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','11','','结果清单','M','ng','K*（8n32x15n2n60g）','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','100','11','明细序号','M','8n','原明细序号','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','101','11','付款人账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','102','11','金额','M','15n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','103','11','回执状态','M','2n','同2.16节业务回执状态号','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40504','批量代收业务回执','104','11','附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40505','批量代收撤销申请','1','','原交易委托日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40505','批量代收撤销申请','2','','原交易信息业务序号','M','8n','只能一次撤销一个信息业务序号对应的通用业务要素集中包含的所有代收请求 ','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40505','批量代收撤销申请','3','','原包业务类型','M','5n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40505','批量代收撤销申请','4','','代收付中心日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40505','批量代收撤销申请','5','','附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40506','代收代付通用回执包','1','','原交易委托日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40506','代收代付通用回执包','2','','原交易信息业务序号','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40506','代收代付通用回执包','3','','原包业务类型','M','5n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40506','代收代付通用回执包','4','','代收付中心工作日','O','8n','当回执包发起方为代收付中心时，为必选项。','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40506','代收代付通用回执包','5','','业务回执状态','M','2n','使用业务回执状态号，当是00 表示正常','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40506','代收代付通用回执包','6','','附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','1','','合同（协议）号','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','2','','合同（协议）类型','M','1n','1:代收协议；2:代付协议','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','3','','变更方式','M','1n','1：新增；2：修改 ；0：删除','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','4','','付款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','5','','付款清算行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','6','','付款人开户行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','7','','付款人账号','M','32X','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','8','','付款人名称','M','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','9','','付款人地址','O','60g','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('40507','签约关系变更通知','10','','附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30002','缴费','1','','收费单位流水号','M','20x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30002','缴费','2','','所属期间','M','16n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30002','缴费','3','','缴费类型','M','1n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30002','缴费','4','','收费附言','O','60g','','BEPS');

insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','1','','信息流水号','M','8n','报表登记发出时候的流水号','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','2','','金额','M','18n','明细的汇总金额','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','3','','上报国库代码','M','10n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','4','','接收国库代码','M','10n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','5','','报表日期','M','8n','YYYYMMDD','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','6','','报表序号','M','3n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','7','','明细条数','M','3n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','100','7','兑付国债银行大类代码','M','12n','1111111111－人行；2222222222－工行；3333333333－农行；4444444444－中行；5555555555－建行；6666666666－交行；7777777777－其他银行','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','101','7','本金代码','M','12x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','102','7','本金金额','M','18n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','103','7','利息代码','M','12x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('20005','国库资金国债兑付贷记划拨','104','7','利息金额','M','18n','','BEPS');


insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30504','支票圈存回应','1','','回应标识','M','2n','见说明','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30504','支票圈存回应','2','','出票日期','M','8n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30504','支票圈存回应','3','','支票号码','M','12n','不足12位时左边补零','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30504','支票圈存回应','4','','付款行行号','M','12n','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30504','支票圈存回应','5','','出票人账号','M','32x','','BEPS');
insert into "T_C1_BIS_ELE_E"("TP_CODE","TP_NAME","SEQUN","UPSEQ","ELE_NAME","IS_REQUIRED","TYPE","MEMO","APP_TYPE") values('30504','支票圈存回应','6','','金额','M','15n','','BEPS');

commit;
