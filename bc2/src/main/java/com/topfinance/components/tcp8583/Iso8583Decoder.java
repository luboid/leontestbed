package com.topfinance.components.tcp8583;

import org.apache.log4j.Logger;
import org.apache.mina.common.ByteBuffer;
import org.apache.mina.common.IoSession;
import org.apache.mina.filter.codec.CumulativeProtocolDecoder;
import org.apache.mina.filter.codec.ProtocolDecoderOutput;
import org.springframework.util.StringUtils;

import com.topfinance.runtime.BcConstants;

public class Iso8583Decoder extends CumulativeProtocolDecoder {
    private static Logger logger = Logger.getLogger(Iso8583Decoder.class);

    private static final String DECODER_STATE_BODY_LENGTH = Iso8583Decoder.class.getName() + "_BODY_LENGTH";

    private void info(String s) {
        logger.info(s);
    }

    private void debug(String s) {
        logger.debug(s);
        // logger.info(s);
    }

    private static class DecoderState {
        int length = -1;

        public void reset() {
            length = -1;
        }
    }

    @Override
    protected boolean doDecode(IoSession session, ByteBuffer in, ProtocolDecoderOutput out) throws Exception {

        DecoderState state = (DecoderState)session.getAttribute(DECODER_STATE_BODY_LENGTH);
        if (state == null) {
            state = new DecoderState();
            session.setAttribute(DECODER_STATE_BODY_LENGTH, state);
        }

        int length = state.length;
        if (state.length == -1) {
            int remain1 = in.remaining();
            debug("remain1=" + remain1);
            if (remain1 < 5) {
                return false;
            }

            // byte head = in.get();
            // debug("4: "+new String(new byte[]{head}));
            // // CharsetDecoder decoder =
            // Charset.forName("UTF-8").newDecoder();
            // // String sLength = in.getString(4, decoder);
            // byte[] temp = new byte[4];
            // in.get(temp);

            byte[] temp = new byte[5];
            in.get(temp);

            String prefix = new String(temp, BcConstants.ENCODING);
            String head = prefix.substring(0, 1);
            String sLength = prefix.substring(1);

            debug("received Iso8583 msg, length=" + sLength);
            length = Integer.valueOf(StringUtils.trimLeadingCharacter(sLength, '0'));

            state.length = length;
        }

        // if (dataLength < 0 || dataLength > maxDataLength) {
        // throw new BufferDataException("dataLength: " + dataLength);
        // }
        int remain2 = in.remaining();
        debug("remain2=" + remain2);
        if (remain2 < length) {
            return false;
        }

        byte[] bytes = new byte[length];
        debug("2: " + length);
        in.get(bytes);
        debug("3: " + length);

        String s = new String(bytes, BcConstants.ENCODING);
        debug("s=" + s);
        out.write(s);
        
        // remember to reset the state
        state.reset();

        return true;

    }

}
