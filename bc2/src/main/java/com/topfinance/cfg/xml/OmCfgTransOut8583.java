package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgTransOut8583;
import com.topfinance.cfg.meta.ITransportInfoMeta;

public class OmCfgTransOut8583 extends OmCfgTransOut implements ICfgTransOut8583, ITransportInfoMeta {
	
    public long getTimeout() {
        return Long.valueOf(getProviderConfig().get(ISO8583_TIMEOUT));
    }

    public void setTimeout(long timeout) {
        getProviderConfig().put(ISO8583_TIMEOUT, String.valueOf(timeout));
    }
    

    
}
