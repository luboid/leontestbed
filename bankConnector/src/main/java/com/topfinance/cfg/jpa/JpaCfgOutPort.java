package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.topfinance.cfg.ICfgDownOutMH;
import com.topfinance.cfg.ICfgOutPort;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("OUT")
public class JpaCfgOutPort extends JpaCfgPort implements ICfgOutPort {

    private JpaCfgDownOutMH downOutMH;
    
    @ManyToOne(fetch = FetchType.EAGER, optional=true)
    @JoinColumn(name = "DOWNOUT_MH_ID")
    public JpaCfgDownOutMH getDownOutMH() {
        return downOutMH;
    }

    public void setDownOutMH(JpaCfgDownOutMH downOutMH) {
        this.downOutMH = downOutMH;
    }
}
