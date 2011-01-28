package com.topfinance.plugin.cnaps2;

public class MsgField {
//    public static final String BEGIN_FLAG = "BeginFlag";
//    public static final String VERSION_ID = "VersionID";
//    public static final String ORIG_SENDER = "OrigSender";
//    public static final String ORIG_SENDER_SID = "OrigSenderSID";
    
    public static final String TYPE_X = "X";
    public static final String TYPE_N = "N";
    public static final String TYPE_D = "D";
    public static final String TYPE_T = "T";
    
    public static final String _D = "D";
    
    public static final MsgField BEGIN_FLAG = 
        new MsgField("BeginFlag", 0, 3, TYPE_X, true, "{H:");   
    public static final MsgField VERSION_ID = 
        new MsgField("VersionID", 3, 2, TYPE_N, true, "01");      
    public static final MsgField ORIG_SENDER = 
        new MsgField("OrigSender", 5, 12, TYPE_X, true, null);
    public static final MsgField ORIG_SENDER_SID = 
        new MsgField("OrigSenderSID", 17, 4, TYPE_X, true, null);
    public static final MsgField ORIG_RECEIVER = 
        new MsgField("OrigReceiver", 21, 12, TYPE_X, true, null);    
    public static final MsgField ORIG_RECEIVER_SID = 
        new MsgField("OrigReceiverSID", 33, 4, TYPE_X, true, null);    
    public static final MsgField ORIG_SEND_DATE = 
        new MsgField("OrigSendDate", 37, 8, TYPE_D, true, null);    
    public static final MsgField ORIG_SEND_TIME = 
        new MsgField("OrigSendTime", 45, 6, TYPE_T, true, null);     
    public static final MsgField STRUCT_TYPE = 
        new MsgField("StructType", 51, 3, TYPE_X, true, null);
    public static final MsgField MESG_TYPE = 
        new MsgField("MesgType", 54, 20, TYPE_X, true, null);   
    public static final MsgField MESG_ID = 
        new MsgField("MesgID", 74, 20, TYPE_X, true, null);       
    public static final MsgField MESG_REF_ID = 
        new MsgField("MesgRefID", 94, 20, TYPE_X, false, null);    
    
    
    private String name;
    private int pos;
    private int length;
    private String type;
    private boolean isRequired;
    private String defaultVal;
    
    private MsgField(String name, int pos, int length, String type, boolean isRequired, String defaultVal) {
        super();
        this.name = name;
        this.pos = pos;
        this.length = length;
        this.type = type;
        this.isRequired = isRequired;
        this.defaultVal = defaultVal;
    }

    public int getPos() {
        return pos;
    }

    public void setPos(int pos) {
        this.pos = pos;
    }

    public int getLength() {
        return length;
    }

    public void setLength(int length) {
        this.length = length;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }



    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isRequired() {
        return isRequired;
    }

    public void setRequired(boolean isRequired) {
        this.isRequired = isRequired;
    }

    public String getDefaultVal() {
        return defaultVal;
    }

    public void setDefaultVal(String defaultVal) {
        this.defaultVal = defaultVal;
    }
}
