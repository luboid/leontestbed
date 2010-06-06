package test;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.ScheduledThreadPoolExecutor;

import junit.framework.TestCase;

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
}
