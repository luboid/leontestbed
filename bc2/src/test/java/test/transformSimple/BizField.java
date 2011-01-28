package test.transformSimple;

public class BizField {
	
	// 业务格式明细唯一标识符
	String bizFldId;
	
	// 以下字段对转换引擎可能没什么意义
	
	// 是否扩展
	Boolean isExt;
	
	// 是否必选
	// UI上约束其是否有mapping。转换时不管？ （检查其值是否为空应该可以在二代xml的校验这一层做了）
	Boolean isRequired;
	
	// 等等其他字段
	
	

	
	// 以下字段作为转换引擎需要的数据，需copy到rule中
	
	// 业务格式明细模式
	// 可选值为AUTO/FIXED/MAPPING
	// 注：对转换引擎而言，上行时考虑AUTO，下行时忽略此选项。FIXED要看是协议级常量，还是参与方定义的常量？
	String bizFldMode;
	
	// 业务格式明细类型
	// （数据类型）可选值为：DATE, NUMBER, 等等
	String bizFldType;
	
	// 业务格式明细缺省值
	// 注：对转换引擎而言，上行时且当模式为FIXED时生效，或当模式为MAPPING且实际数据为空时生效
	String bizFldValue;
	
	// 业务格式明细路径
	String bizFldPath;
	
	// 业务格式明细名字
	// 注：对转换引擎而言，用于报错
	String bizFldName;
	
}
