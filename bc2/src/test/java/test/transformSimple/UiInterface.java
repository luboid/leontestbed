package test.transformSimple;

import java.util.List;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;


public class UiInterface {
	
	
	/**
	 * 获取业务要素中的各字段定义
	 * 
	 * @param mesgCode 		报文号
	 * @param tpCode		类型编码
	 * @param clsCode		种类编码
	 * @param direction		方向 （上行或下行 U/D）
	 * @return 一个列表，列表中每个对象对应一个业务要素字段的宏信息。对于上行来说，是目标（右侧），对于下行来说，是源（左侧）。 
	 */
	
	public List getBizFields(String mesgCode, String tpCode, String clsCode, String direction){
		
		SessionFactory sf=new Configuration().configure().buildSessionFactory();
		return null;
	}
	
	/**
	 * 获取可选的行内系统格式
	 * 
	 * @return 一个列表。每个Format元素是一个可选的行内系统格式。每个格式对应多个格式明细表的记录
	 */
	public List getFormats() {
		return null;
	}
	
	/**
	 * 获取行内系统格式中的各字段定义
	 * 
	 * @param formatId UI上选中的行内系统格式（记录主键）
	 * @return 一个列表，列表中每个对象对应一个行内格式字段的宏信息（或一个格式明细表的记录）。对于上行来说，是源（左侧），对于下行来说，是目标（右侧）。
	 */
	public List getFields(Integer formatId) {
		return null;
	}
	
	/**
	 * 获取已保存的映射关系
	 * 
	 * @param mesgCode 		报文号
	 * @param tpCode		类型编码
	 * @param clsCode		种类编码
	 * @param direction		方向 （上行或下行 U/D）
	 * @return 一个Rule对象，代表建立好的映射关系（详见Rule对象定义），返回空值则该映射关系尚不存在
	 */
	public List<Rule> getMapping(String mesgCode, String tpCode, String clsCode, String direction) {
		return null;
	}
	
	/**
	 * 保存映射关系 （如果已存在，则自动覆盖原有的）
	 * 
	 * @param rule 一个映射关系定义
	 * @return
	 */
	public boolean saveMapping(Rule rule) {
		return false;
	}
	
}
