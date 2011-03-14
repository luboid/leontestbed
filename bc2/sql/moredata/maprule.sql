insert into t_cfg_fmt_ele_map_file (ID, MSG_CODE, TP_CODE, CLS_CODE, FMT_ID, FORMAT)
values (1, 'hvps.111.001.01', 'A100', '02101', 2, '����1_8583');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (2, 1, 1155, 'EndToEndId', 'S5811', 'S', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/PmtId/EndToEndId', '�˵��˱�ʶ��');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (3, 1, 1157, 'NbOfTxs', 'S5813', 'S', '', 'Max15NumericText', '1', '/Document/FIToFICstmrCdtTrf/GrpHdr/NbOfTxs', '��ϸҵ���ܱ���');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (4, 1, 1153, 'IntrBkSttlmAmt', 'S5809', 'S', '', 'ActiveCurrencyAndAmount', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/IntrBkSttlmAmt', '���ҷ��š����');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (5, 1, 1156, 'TxId', 'S5812', 'S', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/PmtId/TxId', '���ױ�ʶ��');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (6, 1, 1158, 'ChrgBr', 'S5814', 'S', '', 'code', 'DEBT', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/ChrgBr', 'ChargeBearer');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (7, 1, 1160, 'SettlementMethod', 'S5816', 'S', '', 'Max14Text', 'CLRG', '/Document/FIToFICstmrCdtTrf/GrpHdr/SttlmInf/SttlmMtd', 'SettlementMethod');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (8, 1, 1162, 'DbtrAcctId', 'S5818', 'S', '', 'Max32Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAcct/Id/Othr/Id', '�������˺�');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (9, 1, 1164, 'DbtrNm', 'S5820', 'S', '', 'Max60Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Dbtr/Nm', '����������');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (10, 1, 1166, 'DbtrAcctIssr', 'S5901', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAcct/Id/Othr/Issr', '�����˿������к�');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (11, 1, 1165, 'DbtrClrSysMmbId', 'pP059', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAgt/FinInstnId/ClrSysMmbId/MmbId', '�����������к�');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (12, 1, 1167, 'CdtrAgtBrnchId', 'S5902', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/CdtrAgt/BrnchId/Id', '�տ����к�');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (13, 1, 1163, 'DbtrAgtBrnchId', 'S5819', 'S', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAgt/BrnchId/Id', '�������к�');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (14, 1, 1176, 'Rmk', 'PP064', 'A', '', 'Max135Text', '/H01/value', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/RmtInf/Ustrd', '��ע');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (15, 1, 1171, 'CdtrNm', 'S5906', 'A', '', 'Max60Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Cdtr/Nm', '�տ�������');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (16, 1, 1178, 'BizTcCd', 'PP066', 'A', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Purp/Prtry', 'ҵ���������');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (17, 1, 1152, 'CreDtTm', 'S5808', 'S', '', 'ISODateTime', '', '/Document/FIToFICstmrCdtTrf/GrpHdr/CreDtTm', '���ķ���ʱ��');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (18, 1, 1161, 'BizTpCd', 'S5817', 'S', '', 'Max4Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/PmtTpInf/CtgyPurp/Prtry', 'ҵ�����ͱ���');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (19, 1, 1169, 'SttlmPrty', 'S5904', 'A', '', 'Priority3Code', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/SttlmPrty', 'ҵ�����ȼ�');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (20, 1, 1177, 'CdtrAcctId', 'PP065', 'S', '', 'Max32Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/CdtrAcct/Id/Othr/Id', '�տ����˺�');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (21, 1, 1151, 'MsgId', 'S5807', 'S', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/GrpHdr/MsgId', '���ı�ʶ��');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (22, 1, 1170, 'CdtrClrSysMmbId', 'S5905', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAgt/FinInstnId/ClrSysMmbId/MmbId', '�տ��������к�');

