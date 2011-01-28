package com.topfinance.cfg.jpa;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;


@Entity
@Table(name = "T_CFG_MAP_RULE")
public class TCfgMapRuleEbo {
    
    private Integer id;
    
 // 报文
    private String msgCode;
    
 // 类型
    private String tpCode;
    
 // 种类
    private String clsCode;
    
 // 关联行内格式（format）记录主键
    private Integer formatId;
    
 // 关联行内格式（format）记录的format字段
 // 冗余数据，因format记录的该字段不可更改。只要没选取另一个format记录，该值就是不变的
    private String format;
    
    private Set<TCfgMapRuleDetailEbo> mappings = new HashSet<TCfgMapRuleDetailEbo>();

    @Id
    @Column(name = "OID", unique = true, nullable = false)
    @SequenceGenerator(name = "CFG_SEQUNCE_RULE_GEN", sequenceName = "S_CFG_SEQUNCE_RULE")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_SEQUNCE_RULE_GEN")  
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(name = "MSG_CODE")
    public String getMsgCode() {
        return msgCode;
    }

    public void setMsgCode(String msgCode) {
        this.msgCode = msgCode;
    }

    @Column(name = "TP_CODE")
    public String getTpCode() {
        return tpCode;
    }

    public void setTpCode(String tpCode) {
        this.tpCode = tpCode;
    }

    @Column(name = "CLS_CODE")
    public String getClsCode() {
        return clsCode;
    }

    public void setClsCode(String clsCode) {
        this.clsCode = clsCode;
    }
    
    @Column(name = "FORMAT_ID")
    public Integer getFormatId() {
        return formatId;
    }

    public void setFormatId(Integer formatId) {
        this.formatId = formatId;
    }
    
    @Column(name = "FORMAT")
    public String getFormat() {
        return format;
    }

    public void setFormat(String format) {
        this.format = format;
    }

    @OneToMany(fetch = FetchType.EAGER, cascade=CascadeType.ALL, mappedBy = "rule")
    public Set<TCfgMapRuleDetailEbo> getMappings() {
        return mappings;
    }

    public void setMappings(Set<TCfgMapRuleDetailEbo> mappings) {
        this.mappings = mappings;
    }
    
    
    
    
}
