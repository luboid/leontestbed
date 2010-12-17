package com.topfinance.message;

import com.topfinance.cfg.TestDummy;
import com.topfinance.converter.Iso8583ToXml;
import com.topfinance.plugin.cnaps2.Cnaps2Constants;
import com.topfinance.plugin.cnaps2.MsgHeader;
import com.topfinance.runtime.BcConstants;

import java.io.InputStream;
import java.util.Map;

import org.jpos.iso.ISOMsg;

public class DefaultCnaps2Packer  {

    // do not override
    public final String pack(Object obj, String origSender, String origReceiver, String mesgType, String mesgId, String mesgRefId) {
        MsgHeader header = new MsgHeader(origSender, origReceiver, mesgType, mesgId, mesgRefId);
        String pkgName = Iso8583ToXml.getPackageName(mesgType);
        Iso8583ToXml converter = new Iso8583ToXml(pkgName);
        
        String body = converter.objectToXml(obj);
        String res = header.toText()+body;
        return res;
    }

}
