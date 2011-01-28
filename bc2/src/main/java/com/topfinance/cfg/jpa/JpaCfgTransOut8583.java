package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;
import javax.persistence.Transient;

import com.topfinance.cfg.ICfgTransOut8583;
import com.topfinance.cfg.meta.ITransportInfoMeta;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("8583")
public class JpaCfgTransOut8583 extends JpaCfgTransOut implements
		ICfgTransOut8583, ITransportInfoMeta {

	@Transient
    public long getTimeout() {
        return Long.valueOf(getMap().get(ISO8583_TIMEOUT));
    }

    public void setTimeout(long timeout) {
    	getMap().put(ISO8583_TIMEOUT, String.valueOf(timeout));
    }

}
