package com.topfinance.cfg.jpa;

import com.topfinance.cfg.ICfgPort;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="T_CFG_PORT")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="IN_OR_OUT",
                discriminatorType = DiscriminatorType.STRING,
                length=30)
@DiscriminatorValue("")
public class JpaCfgPort implements ICfgPort {
    // oid 主键 integer
    private Integer uid;
    // NAME 名称 varchar
    private String name;
    
    // DIRECTION 方向 varchar
    private String direction;
    
    // URL varchar
    private String url;

    private JpaCfgTransportInfo transportInfo;
    
    private JpaCfgNode node;
    
    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_PORT_GEN", sequenceName = "S_CFG_PORT")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_PORT_GEN")
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
    public JpaCfgTransportInfo getTransportInfo() {
        return transportInfo;
    }

    public void setTransportInfo(JpaCfgTransportInfo transportInfo) {
        this.transportInfo = transportInfo;
    }
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "NODE_ID")
    public JpaCfgNode getNode() {
        return node;
    }

    public void setNode(JpaCfgNode node) {
        this.node = node;
    }

}
