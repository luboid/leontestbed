package com.topfinance.transform.smooks;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListMap;

import javax.xml.transform.stream.StreamSource;

import org.apache.log4j.Logger;
import org.milyn.Smooks;
import org.milyn.container.ExecutionContext;
import org.milyn.event.report.HtmlReportGenerator;
import org.milyn.payload.JavaResult;
import org.milyn.payload.JavaSource;

import com.topfinance.util.PerfUtil;

public class SmooksTransformer {
	
	public static class Splitter {
		public String split(String s, String v) {
			logger.info("s="+s+", v="+v);

			if(v.contains(s)) {
				return v;
			} else {
				return "xxxx";
			}
		}
	}
	
	private static Logger logger = Logger.getLogger(SmooksTransformer.class);
	public static final String ROOT_BEAN_ID = "target";
	
//	public static Object java2Java(Object src, InputStream mapping) {
//		return java2Java(null, src, mapping);
//	}
	
	
	
	public static Map<String, Smooks> cachedSmooks = new ConcurrentSkipListMap<String, Smooks>();
	
	public static Object java2Java(String mappingId, Object src, InputStream mapping) {
		
		Smooks smooks = null;
		try {
			
			long e0 = PerfUtil.time();
			
//			smooks = new Smooks(mapping);
			if(mappingId!=null) {
				smooks = cachedSmooks.get(mappingId);
			}
			if(smooks==null) {
				smooks = new Smooks(mapping);
				if(mappingId!=null) {
					// concurrent access to cache?
					cachedSmooks.put(mappingId, smooks);
				}
			}
			
			ExecutionContext executionContext = smooks.createExecutionContext();
			
			// Transform the source Order to the target LineOrder via a
			// JavaSource and JavaResult instance...
			JavaSource source = new JavaSource(src);
			JavaResult result = new JavaResult();

			// Configure the execution context to generate a report...
			if(logger.isDebugEnabled()) {
				executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));
			}
			long e1 = PerfUtil.time();
	        PerfUtil.perfLog(" cost "+(e1-e0)+", end Smooks init" );
	        
			smooks.filterSource(executionContext, source, result);
			long e2 = PerfUtil.time();
	        PerfUtil.perfLog(" cost "+(e2-e1)+", end filterSource" );
	        
	        // debug only 
	        try {
//	        	Object rmtInf = result.getBean("fiToFiCstmrDrctDbt.drctDbtTxInf[0].xxx.rmtInf");
//	        	
//	        	Object ustrdList = result.getBean("fiToFiCstmrDrctDbt.drctDbtTxInf[0].xxx.rmtInf.ustrd[0]");
//	        	
//	        	logger.debug("rmtInf"+rmtInf+", ustrdList="+ustrdList);
	        	
	        } catch (Exception ex) {
	        	ex.printStackTrace();
	        }
	        
			return result.getBean(ROOT_BEAN_ID);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			if (smooks != null) {
				smooks.close();
			}

		}		
	}
	
	public static Object xml2Java(String src, InputStream mapping) {
		Smooks smooks = null;
		try {
			smooks = new Smooks(mapping);

            ExecutionContext executionContext = smooks.createExecutionContext();
            Splitter s = new Splitter();
            executionContext.getBeanContext().addBean("splitter", s);
            // Transform the source Order to the target LineOrder via a
            // JavaSource and JavaResult instance...
            StreamSource source = new StreamSource(new ByteArrayInputStream(src.getBytes()));
            JavaResult result = new JavaResult();

            // Configure the execution context to generate a report...
            if(logger.isDebugEnabled()) {
            	executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));
            }
            
            smooks.filterSource(executionContext, source, result);

			return result.getBean(ROOT_BEAN_ID);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			if (smooks != null) {
				smooks.close();
			}

		}		
	}
}
