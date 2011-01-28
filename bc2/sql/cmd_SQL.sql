select * from T_TAG_REF

select * from t_c2_bis_catg
select * from t_c2_bis_type
select * from t_c2_bis_clas where tp_code = 'A100'
select * from t_c2_bis_clas where cls_code = '02101'

select * from t_c2_bis_tp_msg

select * from t_c2_cfg_prtl
select * from t_c2_prtcl_8583
select * from t_c2_msg_list

select * from t_c2_bis_clas where CLS_code = '02102'
--·µ»ØTP A100

select 
    c.cls_code,c.name,c.tp_code,m.msg_code,c.app_type from t_c2_bis_clas c, t_c2_bis_tp_msg m
where 
    c.cls_code = '02101' and c.tp_code = m.tp_code  and c.app_type = m.app_type and c.app_type = 'HVPS'

--·µ»Øhvps.111.001.01
select * from t_c2_bis_ele_bsc b
where
    b.msg_code = 'hvps.111.001.01'

select * from t_c2_bis_ele_ext e
where 
    e.msg_code = 'hvps.111.001.01' and e.tp_code = 'A100'
    
select * from t_c2_bis_ele_ext e
where 
    e.msg_code = 'hvps.111.001.01' and e.cls_code = '02102'    