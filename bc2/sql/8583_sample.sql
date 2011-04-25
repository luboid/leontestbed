select S_CFG_FORMAT.nextval from dual;
insert into "T_CFG_FORMAT"  ("OID","NAME","FORMAT","FMTVER","DESCRIPTION","DELIM","PATH_DOC_ID")
	values(S_CFG_FORMAT.nextval,'����1_8583','8583','0.1Ver',null,null,null);

select S_CFG_SEQUNCE.nextval from dual;
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'1','','PP001','p@flag','A','0','��������','0','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'1','','PP001','p@flag','A','0','��������','0','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'2','','PP002','','A','24','���ʺ�','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'3','','PP003','p@txno','A','4','������','0','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'4','','pp004','p@amt1','P','12,2','��(������)','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'5','','pp005','p@amt2','P','12,2','��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'6','','pp006','p@amt3','P','12,2','��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'7','','PP007','p@sndt','P','10,0','�������ں�ʱ��','0','2');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'8','','pp008','P@ACNO','A','13','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'9','','pp009','P@BANO','A','3','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'10','','pp010','P@CDNO','A','16','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'11','','PP011','P@BTNO','S','6,0','ϵͳ������ƺ�','0','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'12','','PP012','P@TIME','S','6,0','����ʱ��','0','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'13','','PP013','P@DATE','S','4,0','��������','0','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'14','','pp014','P@DAT1','S','8,0','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'15','','pp015','P@DAT2','S','8','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'16','','pp016','P@OPER','A','4','','0','3');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'17','','pp017','P@PWD1','A','6','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'18','','pp018','P@CHKR','A','4','','0','3');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'19','','pp019','P@PWD2','A','6','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'20','','pp020','P@KMH1','A','7','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'21','','pp021','P@KMH2','A','7','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'22','','pp022','','A','3','�������뷽ʽ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'23','','pp023','','A','3','��Ŀ�籨��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'24','','pp024','P@ZLSH','S','8','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'25','','PP025','P@PLSH','S','5,0','������ˮ��','0','2');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'26','','pp026','P@RLSH','S','8','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'27','','pp027','P@JDBZ','A','1','��/����־','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'28','','pp028','','P','12,2','���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'29','','pp029','','P','12,2','���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'30','','pp030','','P','12,2','���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'31','','pp031','','P','12,2','���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'32','','pp032','P@KHSH','S','5','','2','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'33','','pp033','P@FSSH','S','5','','2','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'34','','PP034','','A','28','�ʺţ�','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'35','','PP035','','A','37','�ڶ��ŵ�����','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'36','','PP036','','A','104','�����ŵ�����','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'37','','PP037','P@KZBZ','A','10','���Ʊ�־','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'38','','PP038','P@BRIF','A','3','ժҪ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'39','','PP039','P@RTNO','A','4','��Ӧ����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'40','','PP040','P@SVNO','A','2','���ֺ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'41','','PP041','P@INT1','S','3,0','������1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'42','','PP042','P@ZHMM','A','16','�ʻ�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'43','','PP043','P@PZNO','S','10,0','ƾ֤��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'44','','PP044','P@KHNO','A','9','�ͻ���','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'45','','PP045','','A','76','��һ�ŵ�����','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'46','','PP046','P@ACN2','A','13','���ʺ�2','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'47','','PP047','P@BAN2','A','3','���ʺ�2','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'48','','PP048','P@CDNO','A','16','����2','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'49','','PP049','P@CRNO','A','2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','','pP050','P@1FHZS','A','118','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','01','S5001','P@1NAME','A','16','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','02','S5002','P@1PYNM','A','16','����ƴ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','03','S5003','P@1IDTY','A','1','֤������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','04','S5004','P@1IDNO','A','15','֤������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','05','S5005','P@1ADDR','A','50','��ַ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','06','S5006','P@1TELN','A','18','�绰','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','07','S5007','P@1YMBZ','A','1','ӡ�ܱ�־','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'50','08','S5008','P@1ZHXZ','A','1','�ʻ�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','','pP051','P@2KHZL','A','123','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','01','S5101','P@2NAME','A','16','�ͻ�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','02','S5102','P@2CSEX','A','1','�Ա�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','03','S5103','P@2PYNM','A','16','����ƴ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','04','S5104','P@2IDTY','A','1','֤������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','05','S5105','P@2IDNO','A','15','֤������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','06','S5106','P@2TENO','A','18','�绰','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','07','S5107','P@2ZIPX','A','6','�ʱ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'51','08','S5108','P@2ADDR','A','50','��ַ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'52','','PP052','P@NWPW','A','16','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'53','','pP053','P@3DLFH','A','12','','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'53','01','S5301','P@3DLZL','S','3,0','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'53','02','S5302','P@3OGNO','S','4,0','��λ���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'53','03','S5303','P@3WKNO','S','5,0','ְ�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','','pP054','P@4DLDW','A','139','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','01','S5401','P@4CODE','S','4,0','��λ���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','02','S5402','P@4NAME','A','30','��λ����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','03','S5403','P@4BRIF','S','3,0','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','04','S5404','P@4TNUM','S','5,0','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','05','S5405','P@4AMT','S','16,2','�����ܶ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','06','S5406','P@4TELN','A','18','�绰','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'54','07','S5407','P@4ADDR','A','50','��ַ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','','pp055','P@5DHPZ','A','70','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','01','S5501','P@5WJFKM','A','7','��ҽ跽��Ŀ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','02','S5502','P@5WDFKM','A','7','��Ҵ�����Ŀ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','03','S5503','P@5RJFKM','A','7','����ҽ跽��Ŀ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','04','S5504','P@5RDFKM','A','7','����Ҵ�����Ŀ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','05','S5505','P@5DATE','S','8,0','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','06','S5506','P@5CRNO','A','2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','07','S5507','P@5FAMT','S','12,2','��ҽ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','08','S5508','P@5ZJJ','S','8,4','�м��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'55','09','S5509','P@5RAMT','S','12,2','����ҽ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','','pP056','P@6BOOK','A','57','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','01','S5601','P@6LINE','S','2,0','��ӡ�к�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','02','S5602','P@6DATE','S','8,0','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','03','S5603','P@6BRIF','A','6','ժҪ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','04','S5604','P@6DCFG','A','1','�����־','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','05','S5605','P@6AMNT','S','16,2','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','06','S5606','P@6BALE','S','16,2','���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','07','S5607','P@6OPER','A','4','����Ա��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'56','08','S5608','P@6CHKR','A','4','����Ա��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','','pP057','P@7BWJZ','A','232','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','01','S5701','P@7SNAM','A','50','֤ȯ����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','02','S5702','P@7STN1','S','16,2','�ܽ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','03','S5703','P@7STN1','S','10,0','֤ȯ��ʼ����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','04','S5704','P@7PAM1','S','10,2','���1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','05','S5705','P@7TKN1','S','5,0','����1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','06','S5706','P@7STN2','S','10,0','֤ȯ��ֹ����1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','07','S5707','P@7PAM2','S','10,0','֤ȯ��ʼ����2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','08','S5708','P@7TKN2','S','10,2','���2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','09','S5709','P@7END2','S','5,0','����2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','10','S5710','P@7IDTY','S','10,0','֤ȯ��ֹ����2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','11','S5711','P@7IDTY','','1','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','12','S5712','P@7IDNO','','15','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','13','S5713','P@7ADDR','','50','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'57','14','S5714','P@7NAME','','30','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','','pp058','P@8LXQD','A','172','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','01','S5801','P@8KMH','A','7','��Ŀ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','02','S5802','P@8CRNO','A','2','���ֺ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','03','S5803','P@8SVNO','A','2','���ֺ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','04','S5804','P@8ZZH','A','13','���ʺ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','05','S5805','P@8FZH','A','3','���ʺ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','06','S5806','P@8NAME','A','16','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','07','S5807','P@8BJ','S','12,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','08','S5808','P@8SFX','S','12,2','ʵ��Ϣ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','09','S5809','P@8WS','S','12,2','β��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','10','S5810','P@8QXRD','S','8,0','��Ϣ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','11','S5811','P@8TSD','S','5,0','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','12','S5812','P@LLD','S','6,4','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','13','S5813','P@8YFXG','S','12,2','Ӧ��Ϣ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','14','S5814','P@8TSG','S','8,0','��Ϣ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','15','S5815','P@8LLG','S','5,0','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','16','S5816','P@8yfxg','S','6,4','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','17','S5817','p@8qxrb','S','12,2','Ӧ��Ϣ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','18','S5818','p@8tsb','S','8,0','��Ϣ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','19','S5819','p@8llb','S','5,0','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'58','20','S5820','p@8yfxb','S','6,4','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'59','','pP059','p@9acst','A','64','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'59','01','S5901','p@9name','A','16','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'59','02','S5902','p@9idty','A','1','֤������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'59','03','S5903','p@9idno','A','15','֤������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'59','04','S5904','P@9LSST','A','10','��ʧ״̬','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'59','05','S5905','P@9FRST','A','16','����״̬','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'59','06','S5906','P@9ZFST','A','6','ֹ��״̬','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'60','','pp060','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'61','','PP061','P@RATE','P','6,4','����','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'62','','PP062','P@INT2','S','4,0','������2','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'63','','PP063','P@STAT','A','1','״̬��־','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'64','','PP064','P@KHMM','A','16','�ͻ�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'65','','PP065','P@INT3','S','2,0','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'66','','PP066','P@STA2','A','1','״̬��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'67','','PP067','P@STA4','A','2','״̬��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'68','','PP068','P@LXJS1','P','16,2','��Ϣ/����1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'69','','PP069','P@LXJS2','P','16,2','��Ϣ/����2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'70','','PP070','P@YQCS','S','3,0','Լ�ڴ���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'71','','PP071','','S','4,0','���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'72','','PP072','P@LINE','S','2,0','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'73','','PP073','P@DAT3','S','8,0','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'74','','PP074','P@LONG','P','10,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'75','','PP075','','P','10,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'76','','PP076','','P','10,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'77','','PP077','','P','10,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'78','','PP078','','P','10,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'79','','PP079','','P','10,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'80','','PP080','','P','10,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'81','','PP081','','P','10,0','�ͻ���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'82','','PP082','','A','4,0','ǰ̨�ն˺�','0','1');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'83','','PP083','','S','4,0','�ļ���¼����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'84','','PP084','P@PZN1','A','12','ƾ֤��1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'85','','PP085','P@PZN2','A','12','ƾ֤��2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'86','','PP086','P@BALE','P','16,2','��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'87','','PP087','P@FCHG','P','16,2','��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'88','','PP088','P@RCHG','P','16,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'89','','PP089','P@AMT11','P','16,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'90','','PP090','','S','6,0','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'91','','PP091','','S','1,0','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'92','','PP092','','A','2','״̬��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'93','','PP093','','A','5','���к�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'94','','PP094','','A','16','֧Ʊ����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'95','','PP095','P@ZJJ','A','42','��ע2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'96','','PP096','','S','8,4','�м��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'97','','PP097','','A','17','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'98','','PP098','','A','25','','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'99','','PP099','','A','9','������','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'100','','PP100','','S','5,0','���ܻ���','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'101','','PP101','P@IDNO','A','20','��Ч֤��','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'102','','PP102','','A','24','�ʺţ�','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'103','','PP103','','A','24','�ʺţ�','2','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'104','','PP104','P@ADDR','A','52','��ע��ԭ��','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'105','','PP105','P@NAME','A','16','����','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'106','','PP106','P@CPLS','S','5','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'107','','PP107','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'108','','PP108','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'109','','PP109','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'110','','PP110','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'111','','PP111','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'112','','pp112','','A','16','','3','2');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','','pp113','','','64','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','01','S11301','','A','2','ƾ֤��1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','02','S11302','','A','12','ƾ֤��1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','03','S11303','','A','2','ժҪ1','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','04','S11311','','A','2','ƾ֤��2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','05','S11312','','A','12','ƾ֤��2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','06','S11313','','A','2','ժҪ2','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','07','S11321','','A','2','ƾ֤��3','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','08','S11322','','A','12','ƾ֤��3','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','09','S11323','','A','2','ժҪ3','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','10','S11331','','A','2','ƾ֤��4','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','11','S11332','','A','12','ƾ֤��4','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'113','12','S11333','','A','2','ժҪ4','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','','pp114','','','180','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','01','S11401','','A','5','��Ŀ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','02','S11402','','A','10','ָ����ϵ����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','03','S11403','','A','20','�绰','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','04','S11404','','A','10','��ϵ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','05','S11405','','A','52','��ַ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','06','S11406','','S','7,5','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','07','S11407','','S','7,5','Э������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','08','S11408','','S','7,5','���������ʣ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','09','S11409','','S','7,5','���������ʣ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','10','S11410','','S','7,5','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','11','S11411','','S','8,0','��Ϣ��','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','12','S11412','','S','8,0','������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','13','S11413','','A','6','�ʱ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','14','S11414','','S','19,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'114','15','S11415','','S','7,5','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','','pp115','','','16','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','01','S11501','','A','1','���룱','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','02','S11502','','A','1','���룲','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','03','S11503','','A','2','���룳','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','04','S11504','','A','2','���룴','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','05','S11505','','A','3','���룵','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','06','S11506','','A','3','���룶','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'115','07','S11507','','A','4','���룷','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'116','','pp116','','','122','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'116','01','S11601','','A','20','Ӫҵִ�պ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'116','02','S11602','','A','42','�ͻ�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'116','03','S11603','','A','42','�ϼ����ܵ�λ','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'116','04','S11604','','A','10','���˴���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'116','05','S11605','','S','8,0','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'116','06','PP117','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'118','','pp118','','','59','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'118','01','S11801','','A','1','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'118','02','S11802','','S','16,2','���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'118','03','S11803','','A','42','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','','pp119','','','270','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','01','S11901','','A','5','�����к�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','02','S11902','','A','30','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','03','S11903','','A','5','�����к�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','04','S11904','','A','30','��������','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','05','S11905','','A','28','�տ����ʺ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','06','S11906','','A','52','�տ��˻���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','07','S11907','','A','28','�������ʺ�','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','08','S11908','','A','52','�����˻���','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','09','S11909','','A','20','�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'119','10','S11910','','A','20','�����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'120','','PP120','','','76','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'120','01','S12001','','S','19,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'120','02','S12002','','S','19,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'120','03','S12003','','S','19,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'120','04','S12004','','S','19,2','����','0','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'121','','PP121','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'122','','PP122','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'123','','PP123','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'124','','PP124','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'125','','PP125','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'126','','PP126','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'127','','PP127','','A','1','','3','0');
insert into "T_CFG_FMT_8583"  ("ID","OID","SEQUN","SUB_SEQ","POSITION","NAME","FLD_TYPE","LENGTH","MEMO","VAR_LEN","BAS_LEN")
	values(S_CFG_SEQUNCE.NEXTVAL,S_CFG_FORMAT.currval,'128','','PP128','','A','8','','0','0');

commit;