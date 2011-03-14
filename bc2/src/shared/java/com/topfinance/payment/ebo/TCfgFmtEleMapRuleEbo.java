package com.topfinance.payment.ebo;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "T_CFG_FMT_ELE_MAP_RULE")
public class TCfgFmtEleMapRuleEbo {

	// 以下两个ID字段用于UI匹配左右及连线

	// 行内格式明细主键
	Integer pteFldId;

	// 业务格式明细唯一标识符
	String bizFldEleId;

	// 以下为冗余数据字段，存储时由UI填入并保存，但读取（修改）时不用这些数据
	// 行内格式明细路径
	String pteFldPath;

	// 行内格式明细类型
	String pteFldType;

	// 对应BizField里的同名字段
	// 业务格式明细模式（暂忽略）
	String bizFldMode;

	// 业务格式明细类型
	String bizFldType;

	// 业务格式明细缺省值
	String bizFldValue;

	// 业务格式明细路径
	String bizFldPath;

	// 业务格式明细名字
	String bizFldName;

	// 映射规则
	private TCfgFmtEleMapFileEbo mapFile;

	private Integer id;

	@Id
	@Column(name = "ID", unique = true, nullable = false)
	@SequenceGenerator(name = "CFG_SEQUNCE_RULE_D_GEN", sequenceName = "S_CFG_ELE_MAPPING")
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_SEQUNCE_RULE_D_GEN")
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "PTE_FLD_ID")
	public Integer getPteFldId() {
		return pteFldId;
	}

	public void setPteFldId(Integer pteFldId) {
		this.pteFldId = pteFldId;
	}

	@Column(name = "BIZ_FLD_ID")
	public String getBizFldEleId() {
		return bizFldEleId;
	}

	public void setBizFldEleId(String bizFldEleId) {
		this.bizFldEleId = bizFldEleId;
	}

	@Column(name = "PTE_FLD_PATH")
	public String getPteFldPath() {
		return pteFldPath;
	}

	public void setPteFldPath(String pteFldPath) {
		this.pteFldPath = pteFldPath;
	}

	@Column(name = "PTE_FLD_TYPE")
	public String getPteFldType() {
		return pteFldType;
	}

	public void setPteFldType(String pteFldType) {
		this.pteFldType = pteFldType;
	}

	@Column(name = "BIZ_FLD_MODE")
	public String getBizFldMode() {
		return bizFldMode;
	}

	public void setBizFldMode(String bizFldMode) {
		this.bizFldMode = bizFldMode;
	}

	@Column(name = "BIZ_FLD_TYPE")
	public String getBizFldType() {
		return bizFldType;
	}

	public void setBizFldType(String bizFldType) {
		this.bizFldType = bizFldType;
	}

	@Column(name = "BIZ_FLD_VALUE")
	public String getBizFldValue() {
		return bizFldValue;
	}

	public void setBizFldValue(String bizFldValue) {
		this.bizFldValue = bizFldValue;
	}

	@Column(name = "BIZ_FLD_PATH")
	public String getBizFldPath() {
		return bizFldPath;
	}

	public void setBizFldPath(String bizFldPath) {
		this.bizFldPath = bizFldPath;
	}

	@Column(name = "BIZ_FLD_NAME")
	public String getBizFldName() {
		return bizFldName;
	}

	public void setBizFldName(String bizFldName) {
		this.bizFldName = bizFldName;
	}

	@ManyToOne
	//@JoinColumn(name="map_id",insertable=false,updatable=false)
	//@Column(name = "map_id")
	public TCfgFmtEleMapFileEbo getMap() {
		return mapFile;
	}
	public void setMap(TCfgFmtEleMapFileEbo mapFile) {
		this.mapFile = mapFile;
	}

}
