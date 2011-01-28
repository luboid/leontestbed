package com.topfinance.components.tcp8583;

import org.apache.mina.filter.codec.ProtocolCodecFactory;
import org.apache.mina.filter.codec.ProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolEncoder;

public class Iso8583Codec implements ProtocolCodecFactory {

    public ProtocolDecoder getDecoder() throws Exception {
        return new Iso8583Decoder();
    }

    
    public ProtocolEncoder getEncoder() throws Exception {
        return new Iso8583Encoder();
    }

}
