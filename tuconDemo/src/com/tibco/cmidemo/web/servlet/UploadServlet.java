/**
 * 
 */
package com.tibco.cmidemo.web.servlet;

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

import com.tibco.cmidemo.hibernate.GiPkistoreitem;
import com.tibco.cmidemo.web.dwr.PKISTOREITEM;

/**
 * @author xliu
 *
 */
public class UploadServlet extends HttpServlet {


    private static final long serialVersionUID = -4784200610574969144L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        
        boolean isMultipart = ServletFileUpload.isMultipartContent(req); 
        if(isMultipart) {
            try {
                ServletFileUpload uploader = new ServletFileUpload();
                FileItemIterator itr = uploader.getItemIterator(req);
                while(itr.hasNext()) {
                    String fileName = null, tpBinindex = null;
                    FileItemStream item = itr.next();
                    InputStream stream = item.openStream();
                    if(item.isFormField()) {
                        // process form fields
                        if(item.getFieldName().equalsIgnoreCase("fileName")) {
                            fileName = Streams.asString(stream);
                        } else if(item.getFieldName().equalsIgnoreCase("tpBinindex")) {
                            tpBinindex = Streams.asString(stream);
                        }
                    } else {
                        // write to db
                        if(fileName == null || tpBinindex == null) 
                            throw new ServletException("required field [fileName] or [tpBinindex] is null");
                        GiPkistoreitem si = new GiPkistoreitem(fileName, Long.valueOf(tpBinindex));
                        si.setContent(IOUtils.toByteArray(stream));
                        si.setUrl(fileName);
                        PKISTOREITEM.saveCred(si);
                    }
                }
            } catch (FileUploadException e) {
                resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "parse file content error: " + e.getMessage());
            } catch (Exception e) {
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "internal server error: " + e.getMessage());
            }
        } else {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "request content should be multipart");
        }
    }
    
    

}
