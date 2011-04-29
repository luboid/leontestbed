package com.appspot.twitteybot;

import junit.framework.TestCase;

public class TestXXX extends TestCase {
    public void debug(String s) {
        System.out.println(s);
    }
    public void testXXX() {
        String txnTagBody = "xmlns = \"http://www.edifecs.com/xdata/100\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" Standard = \"HIPAA\" XDataVersion = \"HIPAA10\"";
//        String txnTagBody = "xmlns = 'http://www.edifecs.com/xdata/100' xmlns:xsi='http://www.w3.org/2001/XMLSchema-instance' Standard = 'HIPAA' XDataVersion = 'HIPAA10'";
        String ss = txnTagBody;
        int i=txnTagBody.indexOf("Standard");
        int start = txnTagBody.indexOf("\"", i);
        int end = txnTagBody.indexOf("\"", start+1);
        if(start==-1) {
            // use single quote for all attribute??
            start = txnTagBody.indexOf("'", i);
            end = txnTagBody.indexOf("'", start+1);                
        }
        if(start==-1 || end==-1) {
            // should not happen, do nothing
        } else {
            String stdstr = txnTagBody.substring(start+1, end);     
            debug("stdstr="+stdstr);
            
            if("HIPAA".equals(stdstr) ) {
               // replace it with X12
               String s = txnTagBody.substring(0, start+1) + "X12" + txnTagBody.substring(end);
               txnTagBody = s;
            }
            
        }
        
        System.out.println("changed? "+!txnTagBody.equals(ss)+", res = \n"+txnTagBody+"\n orig=\n"+ss);
    }
}
