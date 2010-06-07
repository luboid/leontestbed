package test;

import com.topfinance.plugin.cnaps2.v00800102.Document;

import java.beans.PropertyDescriptor;
import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

import junit.framework.TestCase;
import org.apache.commons.beanutils.PropertyUtils;

public class TestMisc extends TestCase {
    
    public void testExecutor() throws Exception{
        
        ExecutorService executor = new ScheduledThreadPoolExecutor(5);
        executor.execute(new Runnable() {
            public void run() {
                System.out.println("Job Done");
                
            }
        });
        System.out.println("main done");
    }
    
    public void testMoveJars() throws Exception{
//        String base = "C:/Documents and Settings/yli/.m2/repository";
//        File newbase = new File("D:/bankConnector/source/lib");
//        
//        String jarsfile = "D:/bankConnector/jars.txt"; 
//        String s = "${M2_REPO}";
//       
//        List<String> lines = IOUtils.readLines(new FileInputStream(new File(jarsfile)));
//        
//        for(String line: lines) {
//            if(line.contains(s)) {
//                String path = StringUtils.substringBetween(line, s, "\"/>");
//                System.out.println("copying file: path="+path);
//                String fullpath = base+path;
//                
//                FileUtils.copyFileToDirectory(new File(fullpath), newbase);
//                
//            }
//        }
        
        System.out.println("Done");
    }
    
    public void testCommonBeans() throws Exception{
        
        Document bean = new Document();
//        String name = "fIToFICstmrCdtTrf";
        String name = "fiToFICstmrCdtTrf";
        PropertyDescriptor descriptor =
            PropertyUtils.getPropertyDescriptor(bean, name);
        
        
        System.out.println("descriptor="+descriptor);
        
        boolean assignable = ArrayList.class.isAssignableFrom(Collection.class);
        System.out.println("assignable="+assignable);
        
        assignable = Collection.class.isAssignableFrom(ArrayList.class);
        System.out.println("assignable="+assignable);
        
    }
}
