package com.topfinance.cfg.jpa;

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

import com.topfinance.cfg.ICfgPortOut;


@SuppressWarnings("serial")
@Entity
@Table(name="T_CFG_PORT_OUT")
//@SuppressWarnings("serial")
//@Entity
//@DiscriminatorValue("OUT")
public class JpaCfgPortOut implements ICfgPortOut {

    // oid 主键 integer
    private Integer uid;
    // NAME 名称 varchar
    private String name;
    
    // DIRECTION 方向 varchar
    private String direction;
    
    // URL varchar
    private String url;

    private JpaCfgTransOut transOut;
    
    private JpaCfgNode node;
    

    private JpaCfgFormat format;
    
    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_PORT_IN_GEN", sequenceName = "S_CFG_SEQUNCE")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_PORT_IN_GEN")
    public Integer getUid() {
        return this.uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }
    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    @Column(name = "URL")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    @Column(name = "DIRECTION")
    public String getDirection() {
        // TODO Auto-generated method stub
        return direction;
    }
    public void setDirection(String direction) {
        this.direction = direction;
    }
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TRANS_INFO_ID")
    public JpaCfgTransOut getTransOut() {
        return transOut;
    }

    public void setTransOut(JpaCfgTransOut transOut) {
        this.transOut = transOut;
    }
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "NODE_ID")
    public JpaCfgNode getNode() {
        return node;
    }

    public void setNode(JpaCfgNode node) {
        this.node = node;
    }
	



    @ManyToOne(fetch = FetchType.EAGER, optional=true)
    @JoinColumn(name = "FORMAT_ID")
	public JpaCfgFormat getFormat() {
		return format;
	}

	public void setFormat(JpaCfgFormat format) {
		this.format = format;
	}
}
