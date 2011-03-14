insert into t_cfg_fmt_ele_map_file (ID, MSG_CODE, TP_CODE, CLS_CODE, FMT_ID, FORMAT)
values (1, 'hvps.111.001.01', 'A100', '02101', 2, '行内1_8583');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (2, 1, 1155, 'EndToEndId', 'S5811', 'S', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/PmtId/EndToEndId', '端到端标识号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (3, 1, 1157, 'NbOfTxs', 'S5813', 'S', '', 'Max15NumericText', '1', '/Document/FIToFICstmrCdtTrf/GrpHdr/NbOfTxs', '明细业务总笔数');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (4, 1, 1153, 'IntrBkSttlmAmt', 'S5809', 'S', '', 'ActiveCurrencyAndAmount', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/IntrBkSttlmAmt', '货币符号、金额');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (5, 1, 1156, 'TxId', 'S5812', 'S', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/PmtId/TxId', '交易标识号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (6, 1, 1158, 'ChrgBr', 'S5814', 'S', '', 'code', 'DEBT', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/ChrgBr', 'ChargeBearer');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (7, 1, 1160, 'SettlementMethod', 'S5816', 'S', '', 'Max14Text', 'CLRG', '/Document/FIToFICstmrCdtTrf/GrpHdr/SttlmInf/SttlmMtd', 'SettlementMethod');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (8, 1, 1162, 'DbtrAcctId', 'S5818', 'S', '', 'Max32Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAcct/Id/Othr/Id', '付款人账号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (9, 1, 1164, 'DbtrNm', 'S5820', 'S', '', 'Max60Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Dbtr/Nm', '付款人名称');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (10, 1, 1166, 'DbtrAcctIssr', 'S5901', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAcct/Id/Othr/Issr', '付款人开户行行号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (11, 1, 1165, 'DbtrClrSysMmbId', 'pP059', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAgt/FinInstnId/ClrSysMmbId/MmbId', '付款清算行行号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (12, 1, 1167, 'CdtrAgtBrnchId', 'S5902', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/CdtrAgt/BrnchId/Id', '收款行行号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (13, 1, 1163, 'DbtrAgtBrnchId', 'S5819', 'S', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAgt/BrnchId/Id', '付款行行号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (14, 1, 1176, 'Rmk', 'PP064', 'A', '', 'Max135Text', '/H01/value', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/RmtInf/Ustrd', '备注');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (15, 1, 1171, 'CdtrNm', 'S5906', 'A', '', 'Max60Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Cdtr/Nm', '收款人名称');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (16, 1, 1178, 'BizTcCd', 'PP066', 'A', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/Purp/Prtry', '业务种类编码');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (17, 1, 1152, 'CreDtTm', 'S5808', 'S', '', 'ISODateTime', '', '/Document/FIToFICstmrCdtTrf/GrpHdr/CreDtTm', '报文发送时间');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (18, 1, 1161, 'BizTpCd', 'S5817', 'S', '', 'Max4Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/PmtTpInf/CtgyPurp/Prtry', '业务类型编码');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (19, 1, 1169, 'SttlmPrty', 'S5904', 'A', '', 'Priority3Code', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/SttlmPrty', '业务优先级');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (20, 1, 1177, 'CdtrAcctId', 'PP065', 'S', '', 'Max32Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/CdtrAcct/Id/Othr/Id', '收款人账号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (21, 1, 1151, 'MsgId', 'S5807', 'S', '', 'Max35Text', '', '/Document/FIToFICstmrCdtTrf/GrpHdr/MsgId', '报文标识号');

insert into t_cfg_fmt_ele_map_rule (ID, MAP_ID, PTE_FLD_ID, BIZ_FLD_ID, PTE_FLD_PATH, PTE_FLD_TYPE, BIZ_FLD_MODE, BIZ_FLD_TYPE, BIZ_FLD_VALUE, BIZ_FLD_PATH, BIZ_FLD_NAME)
values (22, 1, 1170, 'CdtrClrSysMmbId', 'S5905', 'A', '', 'Max14Text', '', '/Document/FIToFICstmrCdtTrf/CdtTrfTxInf/DbtrAgt/FinInstnId/ClrSysMmbId/MmbId', '收款清算行行号');

