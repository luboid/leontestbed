package test.tcp8583;

import java.util.Date;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Map;

import org.jpos.iso.ISODate;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;
import org.jpos.iso.ISOUtil;

import com.topfinance.transform.util.ISOIBPSPackager;
import com.topfinance.transform.util.IsoHelper;

public class TestIBPSMsg {
	
	//private static TestIBPSMsg instance = null;
	
	public static ISOPackager packager = IsoHelper.getDefaultISOPackager();
	
	public static String simIBPS101Msg() throws Exception {	
		Date d = new Date();
		
		ISOMsg msg = new ISOMsg(); // 2) create ISOMsg
		msg.setPackager(TestIBPSMsg.packager); // 3) assign packager
		// 4) populate ISOMsg 0-单笔,400-中间业务，3-中间业务平台
		msg.set(new ISOField(0, "04003"));
		msg.set(new ISOField(20, ISODate.getDate(d)));// 1.委托日期 [1..1] DATE WT01 PP019
		msg.set(new ISOField(14, "1021000999962010100113000423"));// 2.支付交易序号 [1..1] ID TX01 PP013
		msg.set(new ISOField(6, "123456789012"));// 3.付款清算行行号 [1..1] BANKCODE DBClrBkCd01 PP005
		msg.set(new ISOField(2, "123456789012"));// 4.付款行行号 [1..1] BANKCODE DBBkCd01 PP001
		msg.set(new ISOField(15, "123456789012"));// 5.付款人开户行行号 [1..1] BANKCODE DBOpBk01 PP014
		msg.set(new ISOField(60, "098765432109"));// 6.付款人账号 [1..1] ACTCODE DbAct01 PP059
		msg.set(new ISOField(7, TestIBPSMsg.GBKToISO8859("付款人名称")));// 7.付款人名称 [1..1] NAME DBName01 PP006
		msg.set(new ISOField(64, "098765432109"));// 8.收款清算行行号 [1..1] BANKCODE CdClrBkCd01 PP063
		msg.set(new ISOField(3, "098765432109"));// 9.收款行行号 [1..1] BANKCODE CrBkCd01 PP002
		msg.set(new ISOField(4, "098765432109"));// 10.收款人开户行行号 [1..1] BANKCODE CrOpBk01 PP003
		msg.set(new ISOField(62, "1234567890098765"));// 11.收款人账号 [1..1] ACTCODE CrAct01 PP061
		msg.set(new ISOField(63, TestIBPSMsg.GBKToISO8859("收款人名称")));// 12.收款人名称 [1..1] NAME CdName01 PP062
		msg.set(new ISOField(5, "100.01"));// 13.货币符号、金额 [1..1] CURAMT1 CUR01 PP004
		msg.set(new ISOField(16, "00100"));// 14.业务种类 [1..1] BUSITYPE BT01 PP015
		msg.set(new ISOField(11, TestIBPSMsg.GBKToISO8859("附言")));// 15.附言 [0..1] REMARK RK01 PP010
		msg.set(new ISOField(66, "00100"));// 16.业务类型编码 [0..1] REMARK Prtry01 PP065
		msg.set(new ISOField(100, "IBPS.101.001.01"));// 99
		byte[] b = msg.pack(); // 5) packit
		

		
		System.out.println("b=" + new String(b, "UTF-8") + "..");
		return ISOUtil.hexString(b);
	}
	
	public static String GBKToISO8859(String str) throws Exception{
		return new String(str.getBytes("GBK"),"ISO-8859-1");
	}
	
	public static String ISO8859ToGBK(String str) throws Exception{
		return new String(str.getBytes("ISO-8859-1"),"GBK");
	}
	

	
	public static Hashtable fetchMessage(String msg) throws Exception {
		//返回Hashtable
		Hashtable hash = new Hashtable();
		
		ISOMsg m = new ISOMsg();
		m.setPackager(TestIBPSMsg.packager);
		m.unpack(ISOUtil.hex2byte(msg));
        //解析报文,返回结果

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

	public static ISOMsg unpackMessage(String msg) throws Exception {		
		ISOMsg m = new ISOMsg();
		m.setPackager(TestIBPSMsg.packager);
		m.unpack(ISOUtil.hex2byte(msg));
        //解析报文,返回结果

		Map map = m.getChildren();
		Object obj[] = map.keySet().toArray();
		for (int i = 0; i < obj.length; i++) {
			Integer pos = Integer.parseInt(obj[i].toString());
			if (pos > 0) {
				ISOField f = (ISOField) map.get(pos);
				if(pos == 7||pos == 10||pos == 11||pos == 25||pos == 63)
					m.set(pos, ISO8859ToGBK(f.getValue().toString()).trim());
				else
					m.set(pos,f.getValue().toString().trim());
			}
		}		
		return m;
	}

	public static void main(String args[]) {
		try {
			String msg = TestIBPSMsg.simIBPS101Msg();
			System.out.println("[101Msg]" + msg);
			Hashtable hash = TestIBPSMsg.fetchMessage(msg);	
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
