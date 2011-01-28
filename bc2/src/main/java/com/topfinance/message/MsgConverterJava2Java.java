package com.topfinance.message;

import java.io.InputStream;

import org.milyn.Smooks;
import org.milyn.container.ExecutionContext;
import org.milyn.event.report.HtmlReportGenerator;
import org.milyn.payload.JavaResult;
import org.milyn.payload.JavaSource;

import com.topfinance.ebo.msg.Ibps10100101;

public class MsgConverterJava2Java implements IMsgConverter {
	
	InputStream mapping;
	
	public Object convert(Object src) {
		Smooks smooks = null;
		try {
			smooks = new Smooks(getMapping());

			ExecutionContext executionContext = smooks.createExecutionContext();

			// Transform the source Order to the target LineOrder via a
			// JavaSource and JavaResult instance...
			JavaSource source = new JavaSource(src);
			JavaResult result = new JavaResult();

			// Configure the execution context to generate a report...
			executionContext.setEventListener(new HtmlReportGenerator("target/report/report.html"));

			smooks.filterSource(executionContext, source, result);

			return (Ibps10100101) result.getBean(IMsgConverter.ROOT_BEAN_ID);
		} catch (Exception ex) {
			ex.printStackTrace();
			throw new RuntimeException(ex);
		} finally {
			if (smooks != null) {
				smooks.close();
			}

		}
	}

	public InputStream getMapping() {
		return mapping;
	}


	public void setMapping(InputStream mapping) {
		this.mapping = mapping;
	}

}
