package com.tibco.cmidemo.web.dwr;

import com.tibco.cmidemo.web.WebAppException;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.io.IOUtils;

public class DOMAIN extends DWR {
    public static List<String> getDomainList() throws WebAppException {
        List<String> res = new ArrayList<String>();
        try {
        
            InputStream input = DOMAIN.class.getClassLoader().getResourceAsStream("domains.xml");
            List<String> lines = IOUtils.readLines(input);
            String s = "bc:_id=\"";
            int indent = s.length();
            for(String line: lines) {
                if(line.contains("bc:_element=\"Domain\"")) {
                    int i1 = line.indexOf(s);
                    if(i1>0) {
                        int i2 = line.indexOf("\"", i1+indent);
                        String domain = line.substring(i1+indent, i2);
                        res.add(domain);
                    }
                }
            }
            
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return res;
    }
        
}
