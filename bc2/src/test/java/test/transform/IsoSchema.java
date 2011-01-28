package test.transform;

import java.util.ArrayList;
import java.util.List;


public class IsoSchema {
    
    public static final String IFA_NUMERIC = "IFA_NUMERIC";
    public static final String IFA_BITMAP = "IFA_BITMAP";
    public static final String IF_CHAR = "IF_CHAR";
    public static final String IFA_LLLCHAR = "IFA_LLLCHAR";
    public static final String IFA_LLLLCHAR = "IFA_LLLLCHAR";
    public static final String IFB_LLLHCHAR = "IFB_LLLHCHAR";
    
    List<IsoField> fields = new ArrayList<IsoField>();
    
    public IsoSchema() {
        init();
    }

    
    private void init() {
        // equivalent of ISOIBPSPackager
        fields.add(new IsoField(IFA_NUMERIC, 5, ""));
        fields.add(new IsoField(IFA_BITMAP, 16, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IFA_NUMERIC, 18, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 120, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 60, ""));
        
        fields.add(new IsoField(IFA_LLLLCHAR, 512, ""));
        fields.add(new IsoField(IFA_LLLLCHAR, 4092, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IFB_LLLHCHAR, 2048, ""));
        fields.add(new IsoField(IF_CHAR, 2048, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 1, ""));     
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IFA_LLLLCHAR, 512, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IFA_NUMERIC, 18, ""));
        fields.add(new IsoField(IFA_NUMERIC, 18, ""));
        fields.add(new IsoField(IFA_NUMERIC, 18, ""));   
        
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IFA_NUMERIC, 18, ""));
        fields.add(new IsoField(IF_CHAR, 4, ""));
        fields.add(new IsoField(IF_CHAR, 2048, ""));
        fields.add(new IsoField(IF_CHAR, 4, ""));
        fields.add(new IsoField(IF_CHAR, 2, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 2, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IF_CHAR, 1, ""));
        fields.add(new IsoField(IF_CHAR, 4, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 4, ""));     
        
        fields.add(new IsoField(IF_CHAR, 1, ""));
        fields.add(new IsoField(IF_CHAR, 2, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 20, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 2, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 2, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IF_CHAR, 32, ""));
        
        fields.add(new IsoField(IF_CHAR, 2, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 32, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 120, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 35, ""));
        fields.add(new IsoField(IF_CHAR, 8, ""));
        fields.add(new IsoField(IF_CHAR, 4, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 1, ""));       
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        
        
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));        
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
        fields.add(new IsoField(IFA_LLLCHAR, 50, ""));
    }
    
    public static class IsoField {

        public IsoField(String type, int length, String desc) {
            super();
            this.type = type;
            this.length = length;
            this.desc = desc;
        }
        
        String type;
        int length;
        String desc;
        public String getType() {
            return type;
        }
        public void setType(String type) {
            this.type = type;
        }
        public int getLength() {
            return length;
        }
        public void setLength(int length) {
            this.length = length;
        }
        public String getDesc() {
            return desc;
        }
        public void setDesc(String desc) {
            this.desc = desc;
        }
        
        
    }

    public List<IsoField> getFields() {
        return fields;
    }


    public void setFields(List<IsoField> fields) {
        this.fields = fields;
    }
    

}
