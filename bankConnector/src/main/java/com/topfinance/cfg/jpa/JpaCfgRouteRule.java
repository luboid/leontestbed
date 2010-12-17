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

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Element;
import com.topfinance.cfg.ICfgInPort;
import com.topfinance.cfg.ICfgOutPort;
import com.topfinance.cfg.ICfgRouteRule;

@Entity
@Table(name = "T_CFG_ROUTE_RULE")
public class JpaCfgRouteRule implements ICfgRouteRule {
    
    private Integer uid;
    
    private String name;
    
    private String direction;
    
    private String operationMask;
    
    private int sequence;
    
    private JpaCfgOutPort outPort;
    
    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_ROUTE_RULE_GEN", sequenceName = "S_CFG_ROUTE_RULE")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_ROUTE_RULE_GEN")
    public Integer getUid() {
        return this.uid;
    }

    public void setUid(Integer uid) {
        this.uid = uid;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public String getOperationMask() {
        return operationMask;
    }

    public void setOperationMask(String operationMask) {
        this.operationMask = operationMask;
    }

    public int getSequence() {
        return sequence;
    }

    public void setSequence(int sequence) {
        this.sequence = sequence;
    }
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "OUTPORT_ID")
    public JpaCfgOutPort getOutPort() {
        return outPort;
    }

    public void setOutPort(JpaCfgOutPort outPort) {
        this.outPort = outPort;
    }
    
}
