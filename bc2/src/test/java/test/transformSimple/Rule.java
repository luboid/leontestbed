package test.transformSimple;

import java.util.List;


public class Rule {
	// 数据库主键
	Integer id;
	
	// 报文
	String mesgCode;
	
	// 类型
	String tpCode;
	
	// 种类
	String clsCode;
	
	// 关联行内格式（format）记录主键
	Integer formatId;	
	
	// 关联行内格式（format）记录的format字段
	// 冗余数据，因format记录的该字段不可更改。只要没选取另一个format记录，该值就是不变的
	String format;	
	
	// 一组字段mapping
	List<Mapping> mappings;
	
	
	public static class Mapping {
		
		// 以下两个ID字段用于UI匹配左右及连线
		// 行内格式明细主键
		Integer pteFldId;
		// 业务格式明细唯一标识符
		String bizFldEleId;
		
		
		// 以下为冗余数据字段，存储时由UI填入并保存，但读取（修改）时不用这些数据
		
		
		// 对应PteField里的同名字段
		// 行内格式明细路径
		String pteFldPath;
		
		// 行内格式明细类型
		String pteFldType;
 
		
		// 对应BizField里的同名字段
		// 业务格式明细模式
		String bizFldMode;
		
		// 业务格式明细类型
		String bizFldType;
		
		// 业务格式明细缺省值
		String bizFldValue;
		
		// 业务格式明细路径
		String bizFldPath;
		
		// 业务格式明细名字
		String bizFldName;

	}
}
