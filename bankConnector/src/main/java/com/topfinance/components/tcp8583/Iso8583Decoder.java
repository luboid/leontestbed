package com.topfinance.components.tcp8583;

import com.topfinance.runtime.BcConstants;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.CumulativeProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
import org.springframework.util.StringUtils;

public class Iso8583Decoder extends CumulativeProtocolDecoder {
    private static final String DECODER_STATE_BODY_LENGTH = Iso8583Decoder.class.getName()+"_BODY_LENGTH";
    
    @Override
    protected boolean doDecode(IoSession session, ByteBuffer in, ProtocolDecoderOutput out) throws Exception {
        
//        Integer length = (Integer)session.getAttribute(DECODER_STATE_BODY_LENGTH);
        if (in.remaining() >= 5) {
            byte head = in.get();
            System.out.println("head=" + head);
//            CharsetDecoder decoder = Charset.forName("UTF-8").newDecoder();
//            String sLength = in.getString(4, decoder);
            byte[] temp = new byte[4];
            in.get(temp);
            String sLength = new String(temp, BcConstants.ENCODING);
            
            System.out.println("=========in doDecode(): sLength=" + sLength);
            int length = Integer.valueOf(StringUtils.trimLeadingCharacter(sLength, '0'));
            byte[] bytes = new byte[length];
            in.get(bytes);

            String s = new String(bytes, BcConstants.ENCODING);
            out.write(s);
            
            return true;
        } else {
            return false;
        }            
        
        

    }

}