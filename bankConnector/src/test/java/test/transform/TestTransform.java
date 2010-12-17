package test.transform;

import junit.framework.TestCase;

public class TestTransform extends TestCase {
    public void test8583() {
        IsoSchema schema = new IsoSchema();
        IsoObj obj = new IsoObj();
        
        obj.setF0("04003");
        obj.setF2("123456789012");
        obj.setF3("098765432109");
        obj.setF4("098765432109");
        obj.setF5("100.01");
        obj.setF6("123456789012");
        
        String s = IsoUtil.pack(schema, obj);
        
        
    }
}
