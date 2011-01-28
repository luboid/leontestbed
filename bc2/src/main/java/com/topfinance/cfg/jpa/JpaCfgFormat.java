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

import com.topfinance.cfg.ICfgFormat;

//@SuppressWarnings("serial")
//@Entity
//@Table(name="T_CFG_FORMAT")
//@Inheritance(strategy=InheritanceType.SINGLE_TABLE)
//@DiscriminatorColumn(name="FORMAT",
//                discriminatorType = DiscriminatorType.STRING,
//                length=30)
//@DiscriminatorValue("")

@Entity
@Table(name = "T_CFG_FORMAT")
public class JpaCfgFormat implements ICfgFormat {

    
    // oid 主键 integer
    private Integer uid;
    
    private String name;
    
    private String format;

    private String pathOpInfo;
    
    private String pathDocId;
    private String pathOrigDocId;
    
    private Map<String, String> map;

    @Column(name = "NAME")
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "FORMAT")
	public String getFormat() {
		return format;
	}

	public void setFormat(String format) {
		this.format = format;
	}
	
	@Column(name = "PATH_OP_INFO", length = 100)
	public String getPathOpInfo() {
		return pathOpInfo;
	}

	public void setPathOpInfo(String pathOpInfo) {
		this.pathOpInfo = pathOpInfo;
	}

	@Column(name = "PATH_DOC_ID", length = 100)
	public String getPathDocId() {
		return pathDocId;
	}

	public void setPathDocId(String pathDocId) {
		this.pathDocId = pathDocId;
	}
    @Column(name = "PATH_ORIG_DOC_ID", length = 100)
	public String getPathOrigDocId() {
		return pathOrigDocId;
	}

	public void setPathOrigDocId(String pathOrigDocId) {
		this.pathOrigDocId = pathOrigDocId;
	}
	
    @Id
    @Column(name = "OID", nullable = false)
    @SequenceGenerator(name = "CFG_FORMAT_GEN", sequenceName = "S_CFG_FORMAT")
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "CFG_FORMAT_GEN")
	public Integer getUid() {
		return uid;
	}

	public void setUid(Integer uid) {
		this.uid = uid;
	}
	

    /**
     * only called by hibernate when inserting db record from an object.
     */
//  @Column(name = "CONFIG")	
//    private String getConfig() {
//        StringBuffer buf = new StringBuffer();
//        for(String key:getMap().keySet()) {
//            if(buf.length()!=0) {
//                buf.append("|");
//            }
//            buf.append(key).append("=").append(getMap().get(key));
//        }
//        return buf.toString();
//    }
    
    /**
     * only called by hibernate when instantiate an object from db record
     */
//    private void setConfig(String config) {
//        if(!StringUtils.isEmpty(config)) {
//            String[] entries = StringUtils.split(config, "|");
//            for(String entry : entries) {
//                String[] pair = StringUtils.split(entry, "=");
//                if(pair.length!=2) {
//                    throw new RuntimeException("sth wrong in parsing entry: "+entry);
//                }
//                getMap().put(pair[0], pair[1]);
//            }
//        }
//    }
    @Transient
    public Map<String, String> getMap() {
        if(map==null) {
            map = new HashMap<String, String>();
        }
        return map;
    }



}
