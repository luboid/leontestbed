---T_C2_BIS_CATG---
insert into T_C2_BIS_CATG(CAT_CODE,NAME,MEMO) values ('A','AA',null);
insert into T_C2_BIS_CATG(CAT_CODE,NAME,MEMO) values ('B','BB',null);



---T_BIS_TYPE----
insert into T_C2_BIS_TYPE (TP_CODE,CAT_CODE,NAME,MEMO) values ('A100','A','A100A100',null);
insert into T_C2_BIS_TYPE (TP_CODE,CAT_CODE,NAME,MEMO) values ('A101','A','A101A101',null);



insert into T_C2_BIS_TYPE (TP_CODE,CAT_CODE,NAME,MEMO) values ('B100','B','B100B100',null);
insert into T_C2_BIS_TYPE (TP_CODE,CAT_CODE,NAME,MEMO) values ('B104','B','B104B104',null);

---T_BIS_CLA---
insert into T_C2_BIS_CLAS  (CLS_CODE,CAT_CODE,TP_CODE,NAME,APP_TYPE,MEMO) values('02101','A','A100','0210102101','HVPS',null);
insert into T_C2_BIS_CLAS  (CLS_CODE,CAT_CODE,TP_CODE,NAME,APP_TYPE,MEMO) values('02102','A','A100','0210202102','HVPS',null);

----T_C2_BISTP_MSG
insert into T_C2_BIS_TP_MSG  (APP_TYPE,MSG_CODE,MSG_NAME,TP_CODE,TP_NAME,IS_ACITVE) values ('HVPS','hvps.111.001.01','hvps.111.001.01_A100','A100','hvps.111.001.01_A100','Y');
insert into T_C2_BIS_TP_MSG  (APP_TYPE,MSG_CODE,MSG_NAME,TP_CODE,TP_NAME,IS_ACITVE) values ('HVPS','hvps.111.001.01','hvps.111.001.01_A101','A101','hvps.111.001.01_A101','Y');


commit;
