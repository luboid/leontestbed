/**
 * 
 */
package com.tibco.cmidemo.web.servlet;

import com.tibco.cmidemo.hibernate.GiPkistoreitem;
import com.tibco.cmidemo.web.dwr.PKISTOREITEM;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.fileupload.util.Streams;
import org.apache.commons.io.IOUtils;

/**
 * @author xliu
 *
 */
public class UploadServlet extends HttpServlet {


    private static final long serialVersionUID = -4784200610574969144L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        String respStatus = null;
        boolean isMultipart = ServletFileUpload.isMultipartContent(req); 
        if(isMultipart) {
            try {
                ServletFileUpload uploader = new ServletFileUpload();
                FileItemIterator itr = uploader.getItemIterator(req);
                String name = null, tpBinindex = null, url=null;
                byte[] fileContent = null;
                while(itr.hasNext()) {
                    FileItemStream item = itr.next();
                    InputStream stream = item.openStream();
                    if(item.isFormField()) {
                        // process form fields
                        if(item.getFieldName().equalsIgnoreCase("name")) {
                            name = Streams.asString(stream);
                        } else if(item.getFieldName().equalsIgnoreCase("tpBinindex")) {
                            tpBinindex = Streams.asString(stream);
                        } else if(item.getFieldName().equalsIgnoreCase("url")) {
                            url = Streams.asString(stream);
                        }
                    } else {
                        fileContent = IOUtils.toByteArray(stream);
                    }
                }
                
                if(name == null || tpBinindex == null 
                        || fileContent == null || url == null) 
                    throw new ServletException("required field [name]/[tpBinindex]/[url]/[fileContent] is null") ;
                
                GiPkistoreitem si = new GiPkistoreitem(name, Long.valueOf(tpBinindex));
                si.setContent(fileContent);
                si.setUrl(url);
                PKISTOREITEM.saveCred(si);
                
                respStatus = "\"OK\"";
                
            } catch (FileUploadException e) {
                respStatus = "\"" + e.getMessage() + "\""; 
            } catch (Exception e) {
                respStatus = "\"" + e.getMessage() + "\"";
            }
        } else {
            respStatus = "\"request content should be multipart\"";
        }
        
        String respHTML = "<script language=javascript> var status=" + respStatus + ";</script>";
        resp.getWriter().write(respHTML);
    }
    
    

}
