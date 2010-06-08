package com.topfinance.components.tcp8583;

import com.topfinance.runtime.BcConstants;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.ProtocolEncoder;
import org.apache.mina.filter.codec.ProtocolEncoderOutput;

public class Iso8583Encoder implements ProtocolEncoder{
    private static Logger logger = Logger.getLogger(Iso8583Encoder.class);
    public void encode(IoSession session, Object message, ProtocolEncoderOutput out) throws Exception {
        
        String req = (String)message;
        logger.debug("req="+req);
        
        byte[] request = req.getBytes(BcConstants.ENCODING);
        int length = request.length;
        
        logger.debug("length="+length);
        
        String sLength = String.valueOf(length);
        sLength = "+"+StringUtils.leftPad(sLength, 4, '0');
        
        logger.debug("sLength="+sLength);
        ByteBuffer buffer = ByteBuffer.allocate(5+length, false);
        buffer.put(sLength.getBytes("UTF-8"));
        buffer.put(request);
        buffer.flip();
        out.write(buffer);
        
    }
    public void dispose(IoSession session) throws Exception {
        // nothing to dispose
    }
}
