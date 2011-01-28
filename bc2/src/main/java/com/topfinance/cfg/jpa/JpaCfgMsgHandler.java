package com.topfinance.cfg.jpa;

import javax.persistence.Column;
import javax.persistence.DiscriminatorColumn;
import javax.persistence.DiscriminatorType;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@SuppressWarnings("serial")
@Entity
@Table(name="T_CFG_MSG_HANDLER")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="TYPE",
                discriminatorType = DiscriminatorType.STRING,
                length=30)
@DiscriminatorValue("")
public class JpaCfgMsgHandler {
    
    // oid 主键 integer
    private Integer uid;
    // NAME 名称 varchar
    private String name;
    
    // TYPE 名称 varchar
    private String clazz;
    
    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_MSG_HANDLER_GEN", sequenceName = "S_CFG_MSG_HANDLER")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_MSG_HANDLER_GEN")
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
    
    @Column(name = "CLAZZ")
    public String getClazz() {
        return clazz;
    }

    public void setClazz(String clazz) {
        this.clazz = clazz;
    }
}
