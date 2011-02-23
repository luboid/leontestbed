package com.topfinance.transform.smooks;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import javax.xml.transform.stream.StreamSource;

import org.apache.log4j.Logger;
import org.milyn.Smooks;
import org.milyn.container.ExecutionContext;
import org.milyn.event.report.HtmlReportGenerator;
import org.milyn.payload.JavaResult;
import org.milyn.payload.JavaSource;

public class SmooksTransformer {
	
	private static Logger logger = Logger.getLogger(SmooksTransformer.class);
	public static final String ROOT_BEAN_ID = "target";
	
	public static Object java2Java(Object src, InputStream mapping) {
		Smooks smooks = null;
		try {
			smooks = new Smooks(mapping);

			ExecutionContext executionContext = smooks.createExecutionContext();

			// Transform the source Order to the target LineOrder via a
			// JavaSource and JavaResult instance...
			JavaSource source = new JavaSource(src);
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
	
	public static Object xml2Java(String src, InputStream mapping) {
		Smooks smooks = null;
		try {
			smooks = new Smooks(mapping);

            ExecutionContext executionContext = smooks.createExecutionContext();

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
