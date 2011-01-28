package test;

import com.topfinance.cfg.CfgImplFactory;
import com.topfinance.cfg.ICfgReader;
import com.topfinance.cfg.ICfgTransportInfo;
import com.topfinance.cfg.db.DbCfgReader;

import java.util.List;

import junit.framework.TestCase;

public class TestDbCfgReader extends TestCase {

    @Override
    protected void setUp() throws Exception {
        super.setUp();
    }
    
    public void testReadOperation() {
        System.out.println("start testReadOperation");
        
    }
    public void testGetListTransport() {
        System.out.println("start");
        ICfgReader reader = CfgImplFactory.loadCfgReader(CfgImplFactory.TYPE_DB);
        reader.init(DbCfgReader.DBSTORE);
        
        List<ICfgTransportInfo> res = reader.getListOfTransportInfo();
        for(ICfgTransportInfo ti : res) {
            System.out.println("name="+ti.getName()+", prefix="+ti.getPrefix()+", provider="+ti.getProvider());
        }
        
        System.out.println("end");
        
    }
}
