package com.topfinance.cfg.jpa;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.topfinance.cfg.ICfgNode;

@Entity
@Table(name = "T_CFG_NODE")
public class JpaCfgNode implements ICfgNode {

    // oid 主键 integer
    private Integer uid;
    // NAME 名称 varchar
    private String name;
    
    // TYPE 名称 varchar
    private String type;
    
    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_NODE_GEN", sequenceName = "S_CFG_NODE")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_NODE_GEN")
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
    
    @Column(name = "TYPE")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;

    }


}
