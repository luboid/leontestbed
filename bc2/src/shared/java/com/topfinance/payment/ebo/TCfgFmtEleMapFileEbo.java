package com.topfinance.payment.ebo;

// Generated 2011-2-23 13:35:05 by Hibernate Tools 3.4.0.Beta1

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.ForeignKey;

import com.topfinance.cfg.jpa.JpaCfgFormat;

/**
 * TCfgFmtEleMapFile generated by hbm2java
 */
@Entity
@Table(name = "T_CFG_FMT_ELE_MAP_FILE")
public class TCfgFmtEleMapFileEbo implements java.io.Serializable {

	private Integer id;

	private String msgCode;

	private String tpCode;

	private String clsCode;

	private JpaCfgFormat tCfgFormat;

	private String format;
	
	private Set<TCfgFmtEleMapRuleEbo> mappings = new HashSet<TCfgFmtEleMapRuleEbo>();
    @OneToMany(mappedBy="map",fetch = FetchType.EAGER, cascade=CascadeType.ALL)
	@JoinColumn(name = "MAP_ID")
    public Set<TCfgFmtEleMapRuleEbo> getMappings() {
        return mappings;
    }
    public void setMappings(Set<TCfgFmtEleMapRuleEbo> mappings) {
        this.mappings = mappings;
    }

	public TCfgFmtEleMapFileEbo() {
	}

	public TCfgFmtEleMapFileEbo(Integer id, String msgCode, String tpCode, String clsCode, JpaCfgFormat tCfgFormat,
			String format) {
		this.id = id;
		this.msgCode = msgCode;
		this.tpCode = tpCode;
		this.clsCode = clsCode;
		this.tCfgFormat = tCfgFormat;
		this.format = format;
	}

	@Id
	@Column(name = "ID", unique = true, nullable = false, precision = 22, scale = 0)
	@SequenceGenerator(name = "CFG_ELE_MAPPING_GEN", sequenceName = "S_CFG_ELE_MAPPING")
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_ELE_MAPPING_GEN")	
	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	@Column(name = "MSG_CODE", nullable = false, length = 20)
	public String getMsgCode() {
		return this.msgCode;
	}

	public void setMsgCode(String msgCode) {
		this.msgCode = msgCode;
	}

	@Column(name = "TP_CODE", length = 10)
	public String getTpCode() {
		return this.tpCode;
	}

	public void setTpCode(String tpCode) {
		this.tpCode = tpCode;
	}

	@Column(name = "CLS_CODE", length = 5)
	public String getClsCode() {
		return this.clsCode;
	}

	public void setClsCode(String clsCode) {
		this.clsCode = clsCode;
	}

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "FMT_ID")
	public JpaCfgFormat getTCfgFormat() {
		return this.tCfgFormat;
	}

	public void setTCfgFormat(JpaCfgFormat tCfgFormat) {
		this.tCfgFormat = tCfgFormat;
	}

	@Column(name = "FORMAT", length = 20)
	public String getFormat() {
		return this.format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
	
}
