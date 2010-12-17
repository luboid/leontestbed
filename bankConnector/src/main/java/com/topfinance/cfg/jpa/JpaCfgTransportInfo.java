package com.topfinance.cfg.jpa;

import java.util.HashMap;
import java.util.Map;

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
import javax.persistence.Transient;

import org.apache.commons.lang.StringUtils;

import com.topfinance.cfg.ICfgTransportInfo;

@SuppressWarnings("serial")
@Entity
@Table(name="T_CFG_TRANSPORT_INFO")
@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name="TYPE",
                discriminatorType = DiscriminatorType.STRING,
                length=30)
@DiscriminatorValue("")

public class JpaCfgTransportInfo implements ICfgTransportInfo {

    // oid 主键 integer
    private Integer uid;
    // NAME 名称 varchar
    private String name;
    
    // PREFIX 名称 varchar
    private String prefix;
    // PROVIDER 名称 varchar
    private String provider;
    
    private Map<String, String> map;
    
    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_TI_GEN", sequenceName = "S_CFG_TI")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_TI_GEN")

    public Integer getUid() {
        return uid;
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
    @Column(name = "PREFIX")
    public String getPrefix() {
        return prefix;
    }
    public void setPrefix(String prefix) {
        this.prefix = prefix;
    }
    
    @Column(name = "PROVIDER")
    public String getProvider() {
        return provider;
    }
    public void setProvider(String provider) {
        this.provider = provider;
    }
    
    @Column(name = "CONFIG")
    /**
     * only called by hibernate when inserting db record from an object.
     */
    private String getConfig() {
        StringBuffer buf = new StringBuffer();
        for(String key:getMap().keySet()) {
            if(buf.length()!=0) {
                buf.append("|");
            }
            buf.append(key).append("=").append(getMap().get(key));
        }
        return buf.toString();
    }
    
    /**
     * only called by hibernate when instantiate an object from db record
     */
    private void setConfig(String config) {
        if(!StringUtils.isEmpty(config)) {
            String[] entries = StringUtils.split(config, "|");
            for(String entry : entries) {
                String[] pair = StringUtils.split(entry, "=");
                if(pair.length!=2) {
                    throw new RuntimeException("sth wrong in parsing entry: "+entry);
                }
                getMap().put(pair[0], pair[1]);
            }
        }
    }
    @Transient
    public Map<String, String> getMap() {
        if(map==null) {
            map = new HashMap<String, String>();
        }
        return map;
    }
    
    

}
