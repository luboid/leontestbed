package com.topfinance.cfg.xml;

import com.topfinance.cfg.ICfgFormatXml;
import com.topfinance.cfg.meta.ITransFormatMeta;

public class OmCfgFormatXml extends OmCfgFormat implements ICfgFormatXml, ITransFormatMeta {

    public String getEncoding() {
    	return getConfig().get(XML_ENCODING);
    }
    public void setEncoding(String encoding) {
    	getConfig().put(XML_ENCODING, encoding);
    }

}
