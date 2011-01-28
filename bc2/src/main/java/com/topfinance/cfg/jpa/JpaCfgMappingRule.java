package com.topfinance.cfg.jpa;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.topfinance.cfg.ICfgMappingRule;

@SuppressWarnings("serial")
@Entity
@Table(name="t_cfg_fmt_ele_mapping")
public class JpaCfgMappingRule implements ICfgMappingRule{
	
	
    // oid 主键 integer
    private Integer uid; 
    private String mesgType;
	private String opType;
	private String opClass;
    private byte[] mapping;
    private String direction;



	@Column(name = "MAPPING")
	public byte[] getMapping() {
		return mapping;
	}


	public void setMapping(byte[] mapping) {
		this.mapping = mapping;
	}

	@Column(name = "DIRECTION")
	public String getDirection() {
		return direction;
	}


	public void setDirection(String direction) {
		this.direction = direction;
	}

    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_MAPPINGRULE_GEN", sequenceName = "S_CFG_MAPPINGRULE")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_MAPPINGRULE_GEN")
	public Integer getUid() {
		return uid;
	}


	public void setUid(Integer uid) {
		this.uid = uid;
	}

	@Column(name = "msg_code")
	public String getMesgType() {
		return mesgType;
	}


	public void setMesgType(String mesgType) {
		this.mesgType = mesgType;
	}

	@Column(name = "tp_code")
	public String getOpType() {
		return opType;
	}


	public void setOpType(String opType) {
		this.opType = opType;
	}

	@Column(name = "cls_code")
	public String getOpClass() {
		return opClass;
	}


	public void setOpClass(String opClass) {
		this.opClass = opClass;
	}
}
