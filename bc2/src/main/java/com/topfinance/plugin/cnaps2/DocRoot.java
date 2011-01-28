package com.topfinance.plugin.cnaps2;

import com.topfinance.runtime.BcException;
import com.topfinance.runtime.BcRuntimeException;

import java.io.File;
import java.io.Reader;
import java.io.StringReader;
import java.io.StringWriter;

import org.simpleframework.xml.Attribute;
import org.simpleframework.xml.Root;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;

@Root
public class DocRoot {
    public String toText() {
        try {
            Serializer serializer = new Persister();
            StringWriter writer = new StringWriter();
            serializer.write(this, writer);
            return writer.toString();
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new BcRuntimeException(ex); 
        }
    }
    public static DocRoot loadFromFile(String path) {
        DocRoot instance = null;
        try {
            System.out.println("load document from path: "+path);
            Serializer serializer = new Persister();
            File result = new File(path);    
            instance = serializer.read(DocRoot.class, result);

            System.out.println("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return instance;
    }
    
    public static DocRoot loadFromReader(Reader reader) {
        DocRoot instance = null;
        try {
            System.out.println("load document from reader: "+reader);
            Serializer serializer = new Persister();
            instance = serializer.read(DocRoot.class, reader);

            System.out.println("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return instance;
    }
    public static DocRoot loadFromString(String str) throws BcException{
        DocRoot instance = null;
        try {
            System.out.println("load document from string: "+str);
            Serializer serializer = new Persister();
            instance = serializer.read(DocRoot.class, new StringReader(str));

            System.out.println("Done");
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new BcException(ex);
        }
        return instance;
    }
    
     
    @Attribute(required=false)
    private String docId;
    
    // (optional) if is async reply, this must be filled. used as hiberkey.
    @Attribute(required=false)
    private String origDocId;
    
    @Attribute(required=true)
    private String opName;
    
    @Attribute(required=true)
    private String hostIdentity;
    
    @Attribute(required=true)
    private String partnerIdentity;




    public String getOpName() {
        return opName;
    }

    public void setOpName(String opName) {
        this.opName = opName;
    }

    public String getHostIdentity() {
        return hostIdentity;
    }

    public void setHostIdentity(String hostIdentity) {
        this.hostIdentity = hostIdentity;
    }

    public String getPartnerIdentity() {
        return partnerIdentity;
    }

    public void setPartnerIdentity(String partnerIdentity) {
        this.partnerIdentity = partnerIdentity;
    }
    public String getDocId() {
        return docId;
    }
    public void setDocId(String docId) {
        this.docId = docId;
    }
    public String getOrigDocId() {
        return origDocId;
    }
    public void setOrigDocId(String origDocId) {
        this.origDocId = origDocId;
    }



    
    
    
}
