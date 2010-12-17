package test;

import com.topfinance.plugin.cnaps2.Cnaps2Plugin;
import com.topfinance.runtime.OperationDefinition;
import com.topfinance.runtime.OperationDefinitions;
import junit.framework.TestCase;

public class TestOperationDefinitionLoader extends TestCase {
    public void testLoad() {
        OperationDefinitions ods = new Cnaps2Plugin().loadOperationDefinitions();
        for(OperationDefinition od : ods.list ) {
            System.out.println("name="+od.getName()+", upisenabled="+od.getUpIsEnabled());
        }
        
        OperationDefinition od = ods.getOd("ibps.101.001.01");
        System.out.println(od.getDownIsReply());
        System.out.println("Done");
    }
}
