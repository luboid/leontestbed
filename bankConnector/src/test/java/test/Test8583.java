/*
 * Copyright (c) 2000 jPOS.org.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 *
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in
 *    the documentation and/or other materials provided with the
 *    distribution.
 *
 * 3. The end-user documentation included with the redistribution,
 *    if any, must include the following acknowledgment:
 *    "This product includes software developed by the jPOS project 
 *    (http://www.jpos.org/)". Alternately, this acknowledgment may 
 *    appear in the software itself, if and wherever such third-party 
 *    acknowledgments normally appear.
 *
 * 4. The names "jPOS" and "jPOS.org" must not be used to endorse 
 *    or promote products derived from this software without prior 
 *    written permission. For written permission, please contact 
 *    license@jpos.org.
 *
 * 5. Products derived from this software may not be called "jPOS",
 *    nor may "jPOS" appear in their name, without prior written
 *    permission of the jPOS project.
 *
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY EXPRESSED OR IMPLIED
 * WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.  
 * IN NO EVENT SHALL THE JPOS PROJECT OR ITS CONTRIBUTORS BE LIABLE FOR 
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS 
 * OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
 * HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, 
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING 
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE 
 * POSSIBILITY OF SUCH DAMAGE.
 * ====================================================================
 *
 * This software consists of voluntary contributions made by many
 * individuals on behalf of the jPOS Project.  For more
 * information please see <http://www.jpos.org/>.
 */

/* $Id: Test.java,v 1.7 2003/10/13 11:04:18 apr Exp $ */

package test;

import com.topfinance.cfg.dummy.TestDummy;
import com.topfinance.components.tcp8583.ISO8583BjobPackager;
import com.topfinance.runtime.BcConstants;
import com.topfinance.util.BCUtils;

import java.util.Date;

import org.jpos.iso.ISODate;
import org.jpos.iso.ISOException;
import org.jpos.iso.ISOField;
import org.jpos.iso.ISOMsg;
import org.jpos.iso.ISOPackager;
import org.jpos.iso.ISOUtil;
import org.jpos.util.LogEvent;
import org.jpos.util.Logger;
import org.jpos.util.SimpleLogListener;
import org.jpos.util.SimpleLogSource;

public class Test8583 extends SimpleLogSource {
    public Test8583 (Logger logger, String realm) {
        setLogger (logger, realm);
    }
    public void simpleMessage () {
        LogEvent evt = new LogEvent (this, "SimpleMessage");
        Date d = new Date();

        ISOPackager packager = new ISO8583BjobPackager();  // 1) Create packager
        // comment the following line if you don't want to debug packager
//        packager.setLogger (getLogger(), "Packager");

        ISOMsg m = new ISOMsg();                      // 2) create ISOMsg

        m.setPackager (packager);                     // 3) assign packager
        try {
            // 4) populate ISOMsg
            //m.set (new ISOField (0,  "1800"));
            m.set (new ISOField (35,  "我"));
            m.set (new ISOField (3,  "000000"));
            //m.set (new ISOField (11, "000001"));
            m.set (new ISOField (7,  ISODate.getDateTime(d)));
            //m.set (new ISOField (12, ISODate.getTime(d)));
            //m.set (new ISOField (13, ISODate.getDate(d)));
            //m.set (new ISOBinaryField (128, "AAAAAAAA".getBytes()));
            

            m.set (new ISOField (BcConstants.ISO8583_OP_NAME,  TestDummy.OPERATION_101));
            m.set (new ISOField (BcConstants.ISO8583_DOC_ID,  BCUtils.getUniqueDocId()));
            m.set (new ISOField (BcConstants.ISO8583_ORIG_DOC_ID,  ""));
            m.set (new ISOField (BcConstants.ISO8583_HOST_ID,  "xxxx"));
            m.set (new ISOField (BcConstants.ISO8583_PARTNER_ID,  "yyyy"));

            byte[] b = m.pack();                      // 5) packit
            
            Object o3 = m.getValue(3);
            System.out.println("o3="+o3);
            Object o7 = m.getValue(7);
            System.out.println("o7="+o7);
            Date ddd = ISODate.parseDateTime((String)o7);
            System.out.println("ddd="+ddd);
            
            System.out.println("b="+new String(b, "UTF-8")+"..");
            
            
            evt.addMessage (m);
            evt.addMessage ("<packed>" + ISOUtil.hexString(b) + "</packed>");

            // Unpacking 'byte[] b' image into ISOMsg m1
            ISOMsg m1 = new ISOMsg();
            m1.setPackager (packager);
            m1.unpack (b);
            // Logging
            String hIdentity = null;
            String pIdentity = null;
            String opName = null;
            String docId = null;
            String origDocId = null;

            opName = m1.getString(BcConstants.ISO8583_OP_NAME);
            docId = m1.getString(BcConstants.ISO8583_DOC_ID);
            origDocId = m1.getString(BcConstants.ISO8583_ORIG_DOC_ID);
            hIdentity = m1.getString(BcConstants.ISO8583_HOST_ID);
            pIdentity = m1.getString(BcConstants.ISO8583_PARTNER_ID);
            System.out.println("opName="+opName+", docId="+docId);
            
            opName = (String)m1.getValue(BcConstants.ISO8583_OP_NAME);
            docId = (String)m1.getValue(BcConstants.ISO8583_DOC_ID);
            System.out.println("opName="+opName+", docId="+docId);
            
            o3 = m1.getValue(3);
            System.out.println("o3="+o3);
            
            evt.addMessage (m1);
        } catch (ISOException e) {
            evt.addMessage (e);
        } catch (Exception e) {
            e.printStackTrace();
        }
//        Logger.log (evt);
    }

    public static void main (String args[]) {
        Logger logger = new Logger();
        logger.addListener (new SimpleLogListener (System.out));

        Test8583 t = new Test8583 (logger, "Test");
        t.simpleMessage();
    }

}
