package com.topfinance.plugin.cnaps2.utils;

import java.lang.reflect.Field;
import java.util.Hashtable;



public class Tcp8583StructFactory {
	public static final String DBBkCd01 = "DBBkCd01";
	public static final String CrBkCd01 = "CrBkCd01";
	public static final String CrOpBk01 = "CrOpBk01";
	public static final String CUR01 = "CUR01";
	public static final String DBClrBkCd01 = "DBClrBkCd01";
	public static final String DBName01 = "DBName01";
	public static final String OlTxDt01 = "OlTxDt01";
	public static final String OlTxSn01 = "OlTxSn01";
	public static final String OlTxIf01 = "OlTxIf01";
	public static final String RK01 = "RK01";
	public static final String BkCd02 = "BkCd02";
	public static final String TX00 = "TX00";
	public static final String TX01 = "TX01";
	public static final String DBOpBk01 = "DBOpBk01";
	public static final String BT01 = "BT01";
	public static final String ErrMsg01 = "ErrMsg01";
	public static final String Url01 = "Url01";
	public static final String WT00 = "WT00";
	public static final String WT01 = "WT01";
	public static final String ApSn01 = "ApSn01";
	public static final String Sn01 = "Sn01";
	public static final String Nm01 = "Nm01";
	public static final String AsDt01 = "AsDt01";
	public static final String AsMo01 = "AsMo01";
	public static final String YD01 = "YD01";
	public static final String Amt01 = "Amt01";
	public static final String DayMax01 = "DayMax01";
	public static final String TotalMax01 = "TotalMax01";
	public static final String AsNo01 = "AsNo01";
	public static final String SngMax01 = "SngMax01";
	public static final String AuTp01 = "AuTp01";
	public static final String AuIf01 = "AuIf01";
	public static final String BC00 = "BC00";
	public static final String St00 = "St00";
	public static final String GcStDate00 = "GcStDate00";
	public static final String GcCC00 = "GcCC00";
	public static final String BkCd01 = "BkCd01";
	public static final String WT10 = "WT10";
	public static final String Sn10 = "Sn10";
	public static final String XN01 = "XN01";
	public static final String XL01 = "XL01";
	public static final String FL01 = "FL01";
	public static final String BC01 = "BC01";
	public static final String SYS01 = "SYS01";
	public static final String TS1T01 = "TS1T01";
	public static final String TA1T01 = "TA1T01";
	public static final String TA2T01 = "TA2T01";
	public static final String RQT01 = "RQT01";
	public static final String JRFL01 = "JRFL01";
	public static final String ST01 = "ST01";
	public static final String ExT01 = "ExT01";
	public static final String MsgSn01 = "MsgSn01";
	public static final String TT00 = "TT00";
	public static final String Sn00 = "Sn00";
	public static final String ExSt01 = "ExSt01";
	public static final String GcStDate01 = "GcStDate01";
	public static final String GcCC01 = "GcCC01";
	public static final String ExCode01 = "ExCode01";
	public static final String DbAct01 = "DbAct01";
	public static final String DbActTp01 = "DbActTp01";
	public static final String CrAct01 = "CrAct01";
	public static final String CdName01 = "CdName01";
	public static final String CdClrBkCd01 = "CdClrBkCd01";
	public static final String ClrBkCd01 = "ClrBkCd01";
	public static final String ClrDate01 = "ClrDate01";
	public static final String Prtry01 = "Prtry01";
	
	//8583结构对照表
	public static final String ALL_8583_TYPES[][] = new String[][] {
		{"PP001","DBBkCd01","付款行行号"},
		{"PP002","CrBkCd01","收款行行号"},
		{"PP003","CrOpBk01","收款人开户行行号"},
		{"PP004","CUR01","货币符号、金额"},
		{"PP005","DBClrBkCd01","付款清算行行号"},
		{"PP006","DBName01","付款人名称"},
		{"PP007","OlTxDt01","网上交易日期"},
		{"PP008","OlTxSn01","网上交易单号"},
		{"PP009","OlTxIf01","网上交易说明"},
		{"PP010","RK01","附言"},
		{"PP011","BkCd02","业务接收机构/接收直接参与者"},
		{"PP012","TX00","原预授权交易序号"},
		{"PP013","TX01","支付交易序号"},
		{"PP014","DBOpBk01","付款人开户行行号"},
		{"PP015","BT01","业务种类"},
		{"PP016","ErrMsg01","错误信息"},
		{"PP017","Url01","身份校验URL信息"},
		{"PP018","WT00","原业务委托日期"},
		{"PP019","WT01","委托日期"},
		{"PP020","ApSn01","撤销申请序号"},
		{"PP021","Sn01","申请序号"},
		{"PP022","Nm01","管理类型"},
		{"PP023","AsDt01","签约日期"},
		{"PP024","AsMo01","签约说明"},
		{"PP025","YD01","应答序号"},
		{"PP026","Amt01","单笔支付最大金额"},
		{"PP027","DayMax01","当日金额上限"},
		{"PP028","TotalMax01","累计支付最大金额"},
		{"PP029","AsNo01","签约协议号"},
		{"PP030","SngMax01","单笔金额上限"},
		{"PP031","AuTp01","认证方式"},
		{"PP032","AuIf01","认证信息"},
		{"PP033","BC00","原业务类型号"},
		{"PP034","St00","原业务处理状态"},
		{"PP035","GcStDate00","原业务轧差日期"},
		{"PP036","GcCC00","原业务轧差场次"},
		{"PP037","BkCd01","业务发起机构/原查询机构"},
		{"PP038","WT10","原业务委托日期"},
		{"PP039","Sn10","原业务序号"},
		{"PP040","XN01","明细数目"},
		{"PP041","XL01","明细清单"},
		{"PP042","FL01","往/来账标识"},
		{"PP043","BC01","业务类型号"},
		{"PP044","SYS01","所属系统编号"},
		{"PP045","TS1T01","T-1工作日期"},
		{"PP046","TA1T01","T+1工作日期"},
		{"PP047","TA2T01","T+2工作日期"},
		{"PP048","RQT01","日切参考时点"},
		{"PP049","JRFL01","法定节假日标志"},
		{"PP050","ST01","业务回执状态"},
		{"PP051","ExT01","处理、更新时间"},
		{"PP052","MsgSn01","报文序号"},
		{"PP053","TT00","原报文类型"},
		{"PP054","Sn00","原申请序号"},
		{"PP055","ExSt01","处理状态"},
		{"PP056","GcStDate01","轧差日期"},
		{"PP057","GcCC01","轧差场次"},
		{"PP058","ExCode01","处理码"},
		{"PP059","DbAct01","付款人账号"},
		{"PP060","DbActTp01","付款人账户类型"},
		{"PP061","CrAct01",""},
		{"PP062","CdName01","付款人名称"},
		{"PP063","CdClrBkCd01","收款清算行行号"},
		{"PP064","ClrBkCd01","原业务发起清算行行号"},
		{"PP065","ClrDate01","清算日期"},
		{"PP066","Prtry01","业务类型编码"}
	};
	
	private static Tcp8583StructFactory instance = null;
	private static Hashtable tag8583 = new Hashtable();
	
	public static Tcp8583StructFactory getInstance() throws Exception{
		if(instance == null){
			instance = new Tcp8583StructFactory();
		}
		return instance;
	}

	public static String getTagNameByPos(int pos) {
		if(pos <0 ||pos >=ALL_8583_TYPES.length)
			return null;
		return ALL_8583_TYPES[pos][1];
	}
	
	public static String getTagName(String tag) {
		try{
			Field f = Tcp8583StructFactory.class.getDeclaredField(tag);
			return f.getName();
		}catch(Exception e){
		}
		return "";
	}
	
	public static String getTag(int pos) {
		String name = getTagNameByPos(pos);
		if(name == null)
			return null;
		return getTagName(name);
	}
	
	public static void main(String[] args) {
		System.out.println("[TAG]" + getTag(2));
	}
}
