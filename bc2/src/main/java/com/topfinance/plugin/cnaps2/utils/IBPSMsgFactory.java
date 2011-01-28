package com.topfinance.plugin.cnaps2.utils;

import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import org.jpos.iso.ISODate;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;
import org.jpos.iso.ISOUtil;
import org.jpos.util.LogEvent;
import org.jpos.util.Logger;
import org.jpos.util.SimpleLogListener;
import org.jpos.util.SimpleLogSource;

public class IBPSMsgFactory extends SimpleLogSource{

	private static ISOPackager packager = new ISOIBPSPackager();

	public IBPSMsgFactory(Logger logger, String realm) {
		setLogger(logger, realm);
	}

	public void test101Message() throws Exception{
		LogEvent evt = new LogEvent(this, "IBPS101");
		Date d = new Date();

		packager.setLogger(getLogger(), "Packager");

		ISOMsg m = new ISOMsg(); // 2) create ISOMsg
		m.setPackager(IBPSMsgFactory.packager); // 3) assign packager
		//try {
			// 4) populate ISOMsg 0-单笔,400-中间业务，3-中间业务平台
			m.set(new ISOField(0, "04003"));
			m.set(new ISOField(20, ISODate.getDate(d)));// 1.委托日期 [1..1] DATE WT01 PP019
			m.set(new ISOField(14, "1234567890123456789012345678"));// 2.支付交易序号 [1..1] ID TX01 PP013
			m.set(new ISOField(6, "123456789012"));// 3.付款清算行行号 [1..1] BANKCODE DBClrBkCd01 PP005
			m.set(new ISOField(2, "123456789012"));// 4.付款行行号 [1..1] BANKCODE DBBkCd01 PP001
			m.set(new ISOField(15, "123456789012"));// 5.付款人开户行行号 [1..1] BANKCODE DBOpBk01 PP014
			m.set(new ISOField(60, "098765432109"));// 6.付款人账号 [1..1] ACTCODE DbAct01 PP059
			m.set(new ISOField(7, new String("付款人名称".getBytes("GBK"),"ISO-8859-1")));// 7.付款人名称 [1..1] NAME DBName01 PP006
			m.set(new ISOField(64, "098765432109"));// 8.收款清算行行号 [1..1] BANKCODE CdClrBkCd01 PP063
			m.set(new ISOField(3, "098765432109"));// 9.收款行行号 [1..1] BANKCODE CrBkCd01 PP002
			m.set(new ISOField(4, "098765432109"));// 10.收款人开户行行号 [1..1] BANKCODE CrOpBk01 PP003
			m.set(new ISOField(62, "1234567890098765"));// 11.收款人账号 [1..1] ACTCODE CrAct01 PP061
			m.set(new ISOField(63, "收款人名称"));// 12.收款人名称 [1..1] NAME CdName01 PP062
			m.set(new ISOField(5, "100.00"));// 13.货币符号、金额 [1..1] CURAMT1 CUR01 PP004
			m.set(new ISOField(16, "00100"));// 14.业务种类 [1..1] BUSITYPE BT01 PP015
			m.set(new ISOField(11, "附言"));// 15.附言 [0..1] REMARK RK01 PP010
			m.set(new ISOField(66, "00100"));// 16.业务类型编码 [0..1] REMARK Prtry01 PP065
			byte[] b = m.pack(); // 5) packit

			//evt.addMessage(m);
			evt.addMessage("<packed>" + ISOUtil.hexString(b) + "</packed>");

			// Unpacking 'byte[] b' image into ISOMsg m1
			ISOMsg m1 = new ISOMsg();
			m1.setPackager(packager);
			m1.unpack(b);
			//evt.addMessage(m1);

			Map map = m1.getChildren();
			Object obj[] = map.keySet().toArray();
			for (int i = 0; i < obj.length; i++) {
				String pos = obj[i].toString();
				if (Integer.parseInt(pos) > 0) {
					ISOField f = (ISOField) map.get(new Integer(pos));
					// System.out.println(f.getValue());
				}
			}

			//ISOField f = (ISOField)m1.getComponent(7);
			//System.out.println(ISO8859ToGBK(f.getValue().toString()));

			// Logging
			// 解析报文,返回结果
			// evt.addMessage (m1);
		//} catch (ISOException e) {
		//	evt.addMessage(e);
		//}
		Logger.log (evt);
	}

	public static Hashtable fetchMessage(String msg) throws Exception {
		//返回Hashtable
		Hashtable hash = new Hashtable();
		//LogEvent evt = new LogEvent(this, "IBPS101");
		//TestIBPS.packager.setLogger (getLogger(), "Packager");
		
		// Unpacking 'byte[] b' image into ISOMsg m1
		ISOMsg m = new ISOMsg();
		m.setPackager(IBPSMsgFactory.packager);
		m.unpack(ISOUtil.hex2byte(msg));
        //解析报文,返回结果
        //evt.addMessage (m);
        //Logger.log (evt);

		Map map = m.getChildren();
		Object obj[] = map.keySet().toArray();
		for (int i = 0; i < obj.length; i++) {
			Integer pos = Integer.parseInt(obj[i].toString());
			if (pos > 0) {
				ISOField f = (ISOField) map.get(pos);
				if(pos == 7||pos == 10||pos == 11||pos == 25||pos == 63)
					hash.put(pos, ISO8859ToGBK(f.getValue().toString()));
				else
					hash.put(pos, f.getValue());
			}
		}
		return hash;
	}
	
	public static Map convertMsgByTag(Hashtable hash) throws Exception {
		Map map = new HashMap();
		String value = null;
		
		Enumeration keys = hash.keys();
		while(keys.hasMoreElements()){
			Integer key = (Integer)keys.nextElement();
			Object obj = hash.get(key);
			if(obj != null){
				map.put(Tcp8583StructFactory.getTag(key-2), obj);
			}
		}
		
		//[66]00100
		//[20]0606
		//[64]098765432109
		//[63]收款人名称
		//[62]1234567890098765
		//[16]00100
		//[15]123456789012
		//[60]098765432109
		//[14]1234567890123456789012345678
		//[11]附言
		//[7]付款人名称
		//[6]123456789012
		//[5]000000000000100.01
		//[4]098765432109
		//[3]098765432109
		//[2]123456789012
		return map;
	}

	public static Map convertMsgByPos(Hashtable hash) throws Exception {
		Map map = new HashMap();
		String value = null;
		
		Enumeration keys = hash.keys();
		while(keys.hasMoreElements()){
			Integer key = (Integer)keys.nextElement();
			Object obj = hash.get(key);
			if(obj != null){
				//调整到文档对照表位置，从PP001开始的
				map.put(new Integer(key-2), obj);
			}
		}
		return map;
	}
	public static String compose101Message() throws Exception {
		//LogEvent evt = new LogEvent(this, "IBPS101");
		
		Date d = new Date();

		ISOPackager packager = new ISOIBPSPackager(); // 1) Create
		// packager
		// comment the following line if you don't want to debug packager
		//packager.setLogger(getLogger(), "Packager");

		ISOMsg m = new ISOMsg(); // 2) create ISOMsg
		m.setPackager(packager); // 3) assign packager

		// 4) populate ISOMsg 0-单笔,400-中间业务，3-中间业务平台
		m.set(new ISOField(0, "04003"));
		m.set(new ISOField(20, ISODate.getDate(d)));// 1.委托日期 [1..1] DATE WT01 PP019
		m.set(new ISOField(14, "1234567890123456789012345678"));// 2.支付交易序号 [1..1] ID TX01 PP013
		m.set(new ISOField(6, "123456789012"));// 3.付款清算行行号 [1..1] BANKCODE DBClrBkCd01 PP005
		m.set(new ISOField(2, "123456789012"));// 4.付款行行号 [1..1] BANKCODE DBBkCd01 PP001
		m.set(new ISOField(15, "123456789012"));// 5.付款人开户行行号 [1..1] BANKCODE DBOpBk01 PP014
		m.set(new ISOField(60, "098765432109"));// 6.付款人账号 [1..1] ACTCODE DbAct01 PP059
		m.set(new ISOField(7, IBPSMsgFactory.GBKToISO8859("付款人名称")));// 7.付款人名称 [1..1] NAME DBName01 PP006
		m.set(new ISOField(64, "098765432109"));// 8.收款清算行行号 [1..1] BANKCODE CdClrBkCd01 PP063
		m.set(new ISOField(3, "098765432109"));// 9.收款行行号 [1..1] BANKCODE CrBkCd01 PP002
		m.set(new ISOField(4, "098765432109"));// 10.收款人开户行行号 [1..1] BANKCODE CrOpBk01 PP003
		m.set(new ISOField(62, "1234567890098765"));// 11.收款人账号 [1..1] ACTCODE CrAct01 PP061
		m.set(new ISOField(63, IBPSMsgFactory.GBKToISO8859("收款人名称")));// 12.收款人名称 [1..1] NAME CdName01 PP062
		m.set(new ISOField(5, "100.01"));// 13.货币符号、金额 [1..1] CURAMT1 CUR01 PP004
		m.set(new ISOField(16, "00100"));// 14.业务种类 [1..1] BUSITYPE BT01 PP015
		m.set(new ISOField(11, IBPSMsgFactory.GBKToISO8859("附言")));// 15.附言 [0..1] REMARK RK01 PP010
		m.set(new ISOField(66, "00100"));// 16.业务类型编码 [0..1] REMARK Prtry01 PP065
		byte[] b = m.pack(); // 5) packit
		return ISOUtil.hexString(b);
	}
	
	private static String GBKToISO8859(String str) throws Exception{
		return new String(str.getBytes("GBK"),"ISO-8859-1");
	}
	
	private static String ISO8859ToGBK(String str) throws Exception{
		return new String(str.getBytes("ISO-8859-1"),"GBK");
	}
	
	public static void main(String args[]) {
		Logger logger = new Logger();
		logger.addListener(new SimpleLogListener(System.out));

		try {
			IBPSMsgFactory t = new IBPSMsgFactory(logger, "Test");
			String msg = IBPSMsgFactory.compose101Message();
			Hashtable hash = IBPSMsgFactory.fetchMessage(msg);	
			Enumeration keys = hash.keys();
			while(keys.hasMoreElements()){
				Integer key = (Integer)keys.nextElement();
				Object obj = hash.get(key);
				if(obj != null)
					System.out.println("[" + key +"]" + obj.toString().trim());
			}
		} catch (Exception i) {
			System.out.println(i.getMessage());
		}
	}

}
