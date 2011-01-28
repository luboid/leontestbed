package com.topfinance.runtime;


public class OpInfo {
	public OpInfo() {
	}
	public OpInfo(String mesgType, String opType, String opClass) {
		super();
		this.mesgType = mesgType;
		this.opType = opType;
		this.opClass = opClass;
	}
	// 报文
	String mesgType;
	
	// 业务种类
	String opClass;
	
	// 业务类型
	String opType;

	public String getMesgType() {
		return mesgType;
	}

	public void setMesgType(String mesgType) {
		this.mesgType = mesgType;
	}

	public String getOpClass() {
		return opClass;
	}

	public void setOpClass(String opClass) {
		this.opClass = opClass;
	}

	public String getOpType() {
		return opType;
	}

	public void setOpType(String opType) {
		this.opType = opType;
	}
	
	public String toString() {
		return mesgType+"_"+opType+"_"+opClass;
	}
	public static OpInfo fromString(String s) {
		
		int i1 = s.indexOf("_");
		int i2 = s.indexOf("_", i1+1);
		
		if(i1<0 || i2<0) {
			throw new RuntimeException("wrong opInfo format: s="+s);
		}
		String msg = s.substring(0, i1);
		String opType = s.substring(i1+1, i2);
		String opCls = s.substring(i2+1);
		
		OpInfo oi = new OpInfo();
		oi.setMesgType(msg);
		oi.setOpType(opType);
		oi.setOpClass(opCls);
		
//		String[] ss = StringUtils.split(s, "_");
//		OpInfo oi = new OpInfo();
//		oi.setMesgType(ss[0]);
//		oi.setOpType(ss[1]);
//		oi.setOpClass(ss[2]);
		return oi;
	}
}
