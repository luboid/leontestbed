package test;

import java.lang.reflect.Constructor;

import junit.framework.TestCase;

import com.topfinance.plugin.cnaps2.MsgHeader;

public class TestMsgHeader extends TestCase {
    
    public void testMsgHeader() {
        try {
            String origSender = "origSender";
            String origReceiver = "origReceiver";
            String mesgType = "mesgType";
            String mesgId = "mesgId";
            String mesgRefId = "mesgRefId";

            MsgHeader header = new MsgHeader(origSender, origReceiver, mesgType, mesgId, mesgRefId);

            char x = 0x20;
            System.out.println("["+x+"]");
            char y = 0x30;
            System.out.println("["+y+"]");
            
            String encoded = header.toText();

            System.out.println("after encoding=" + encoded);

            MsgHeader decoded = MsgHeader.fromText(encoded);

            String t = decoded.toText();
            
            assertTrue(t.equals(encoded));
            System.out.println("Done");
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }
    
    public void testConstructor() {
    	
    	try {
    		Constructor con = Person.class.getConstructor(int.class);
    		
    		System.out.println("con="+con);
    	
    	} catch (Exception ex) {
    		ex.printStackTrace();
    	}
    }
    
    public static class Person {
    	public int i;
    	public Person(int i) {
    		this.i = i;
    	}
    	
    }
    
}
