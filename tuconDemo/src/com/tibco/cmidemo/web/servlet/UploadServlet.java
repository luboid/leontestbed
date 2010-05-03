/**
 * 
 */
package com.tibco.cmidemo.web.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

/**
 * @author xliu
 *
 */
public class UploadServlet extends HttpServlet {

    private static final long serialVersionUID = 1L;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // TODO Auto-generated method stub
        boolean isMultipart = ServletFileUpload.isMultipartContent(req); 
        if(isMultipart) {
            try {
                ServletFileUpload uploader = new ServletFileUpload();
                FileItemIterator itr = uploader.getItemIterator(req);
                while(itr.hasNext()) {
                    FileItemStream item = itr.next();
                    if(item.isFormField()) {
                        // process form fields
                    } else {
                        // write to db
                    }
                }
            } catch (FileUploadException e) {
                // TODO Auto-generated catch block
                resp.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "file upload error: " + e.getMessage());
            }
        } else {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "request content should be multipart");
        }
    }
    
    

}
