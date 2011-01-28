package com.topfinance.cfg.jpa;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.simpleframework.xml.Attribute;

import com.topfinance.cfg.ICfgFormat;
import com.topfinance.cfg.ICfgFormat8583;
import com.topfinance.cfg.meta.ITransFormatMeta;

@Entity
@Table(name = "t_cfg_fmt_8583")
public class JpaCfgFormat8583 implements ICfgFormat8583, ITransFormatMeta {

    // oid 主键 integer
    private Integer uid;
	
    JpaCfgFormat format;
	
    String name;
	String type;
	int length;
	String desc;
	
	int pos;
	
    @Id
    @Column(name = "ID", nullable = false)
    @SequenceGenerator(name = "CFG_FORMAT_8583_GEN", sequenceName = "S_CFG_FORMAT")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_FORMAT_8583_GEN")
	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}
	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "OID")
	public JpaCfgFormat getFormat() {
		return format;
	}
	public void setFormat(JpaCfgFormat format) {
		this.format = format;
	}
	
	@Column(name = "length")
	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}
	@Column(name = "memo")
	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}
	@Column(name = "position")
	public int getPos() {
		return pos;
	}

	public void setPos(int pos) {
		this.pos = pos;
	}
	
	@Column(name = "fld_type")
	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	@Column(name = "name")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
