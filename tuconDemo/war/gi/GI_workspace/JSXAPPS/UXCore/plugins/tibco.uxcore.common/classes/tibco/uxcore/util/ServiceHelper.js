/**
 * Helper utility class for use with Service objects
 */
jsx3.lang.Class.defineClass("tibco.uxcore.util.ServiceHelper", null, null, function(service) {
    //Load the dialog for session dialog. Is needed in case the server is down.
    //    var headerError = "URL base undefined"
    //    var bodyMessage = "Please contact your administrator."

    /**
    * Gets the webapp name of the ActiveMatrix Admin UI (NOT the contextRoot, which includes additional path information)
    *
    * @return {String} the nameof the webapp serving the ActiveMatrix Admin UI
    */
    service.getAdminWebapp = function() {
        if(!this.adminWebapp) {
            var val = tibco.uxcore.System.getContextRootForNamespace("tibco.admin");
            var index = val.indexOf("/");
            if(index != -1) {
                val = val.substring(0, index);
            }
            this.adminWebapp = val;
        }
        return this.adminWebapp;
    }

    /**
     *  Get the endpoint url for managementDaemon web services
     *
     * @return {String} the url to the managementDaemon web services
     */
    service.getManagementDaemonEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/managementDaemon";
    }

    /**
     *  Get the endpoint url for environment web services
     *
     * @return {String} the url to the environment web services
     */
    service.getEnvironmentEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/environment";
    }

    /**
     *  Get the endpoint url for plugin web services
     *
     * @return {String} the url to the plugin web services
     */
    service.getPluginsEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/plugins";
    }

    /**
     *  Get the endpoint url for shared resource definitions web services
     *
     * @return {String} the url to the shared resource definitions web services
     */
    service.getSharedResourcesEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/sharedresources";
    }

    /**
     *  Get the endpoint url for node web services
     *
     * @return {String} the url to the node web services
     */
    service.getNodeEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/node";
    }

    /**
     *  Get the endpoint url for inventory web services
     *
     * @return {String} the url to the inventory web services
     */
    service.getInventoryEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/inventory";
    }

    /**
     *  Get the endpoint url for container web services
     *
     * @return {String} the url to the container web services
     */
    service.getContainersEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/components";
    }

    /**
     *  Get the endpoint url for shared (managed) resources web services
     *
     * @return {String} the url to the shared (managed) resources web services
     */
    service.getManagedResourcesEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/managedresources";
    }

    /**
     *  Get the endpoint url for deployment web services
     *
     * @return {String} the url to the deployment web services
     */
    service.getDeploymentEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/deployment";
    }

    /**
     *  Get the endpoint url for keystore web services
     *
     * @return {String} the url to the keystore web services
     */
    service.getKeystoreEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/keystore";
    }

    /**
     *  Get the endpoint url for UDDI web services
     *
     * @return {String} the url to the UDDI web services
     */
    service.getUddiServerEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/uddiserver";
    }

    /**
     *  Get the endpoint url for Admin Server web services
     *
     * @return {String} the url to the Admin Server web services
     */
    service.getAdminConfigurationEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/adminconfiguration";
    }

    /**
     *  Get the endpoint url for Service Assembly upload web services
     *
     * @return {String} the url to the Service Assembly upload web services
     */
    service.getAssemblyLoadPath = function() {
        return "/" + this.getAdminWebapp() + "/upload/services";
    }

    /**
     *  Get the endpoint url for User Management web services
     *
     * @return {String} the url to the User Management web services
     */
    service.getUserMgtEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/usermgmt";
    }

    /**
     *  Get the endpoint url for permissions (ACL) web services
     *
     * @return {String} the url to the permissions (ACL) web services
     */
    service.getPermissionsEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/permissions";
    }

    /**
     *  Get the endpoint url for Logging Configuration web services
     *
     * @return {String} the url to the Logging Configuration web services
     */
    service.getLoggingConfigurationEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/loggingconfiguration";
    }

    /**
     *  Get the endpoint url for Monitor &amp; Manage web services
     *
     * @return {String} the url to the Monitor &amp; Manage web services
     */
    service.getMonitorAndManageEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/monitorandmanage";
    }



    /**
     *  Get the endpoint url for Service Assembly Download file, Used in UpdateServiceAssembly.js (1-8V52MF)
     *
     * @return {String} the url to the Zip file.
     */
    service.getSADownloadURL = function(iAssemblyEntityId) {
    	if (iAssemblyEntityId) {
 		return "/amxadministrator/safetch?saId="+iAssemblyEntityId;
 	} else {
 		return null;
 	}
    }




	/**
     *  Get the endpoint url for SubstitutionVars web services
     *
     * @return {String} the url to the SubstitutionVars web services
     */
    service.getSubstitutionVarsEndpointURL = function() {
        return "/" + this.getAdminWebapp() + "/services/svar";
    }


    /**
     * Prints a service call Inbound and outbound Document. Use for debuging.
     *
     * @param objEvent {Object} the object returned from a service call in one of the subscribed callbacks
     * @deprecated
     * @use service#printInboundDocument
     * @use service#printOutboundDocument
     */
    service.printInboundOutboundDocument = function (objEvent) {
        if(tibco.uxcore.util.Log.SERVICE.isLoggable(jsx3.util.Logger.TRACE)) {
            jsx3.log("in printInboundOutboundDocument")
            tibco.uxcore.util.Log.SERVICE.trace("\n======================\nOperation Name = " + objEvent.target.getOperationName() + "\nDocument received:\n" + objEvent.target.getInboundDocument() + " \n");
            tibco.uxcore.util.Log.SERVICE.trace("\nDocument send:\n" + objEvent.target.getOutboundDocument() + "\n======================\n");
        }
    }

    /**
     * Prints a parsed instance of the server's XML response if the level of tibco.uxcore.util.Log.SERVICE logger is set to trace.
     * This methode is called internally if the instanceinitializer tibco.uxcore.System.loadService is used for creating a service object
     * @param  objService {tibco.uxcore.net.Service} the Service object from which to print the response
     */
    service.printInboundDocument = function (objService) {
        if(tibco.uxcore.util.Log.SERVICE.isLoggable(jsx3.util.Logger.TRACE)) {
            tibco.uxcore.util.Log.SERVICE.trace("-->\nOperation Name = " + objService.getOperationName() + "\nDocument received:\n" + objService.getInboundDocument() + "\n======================\n");
        }
    }

    /**
     * Prints a parsed instance of the request documenta if the level of tibco.uxcore.util.Log.SERVICE logger is set to trace.
     * This methode is called internally if the instanceinitializer tibco.uxcore.System.loadService is used for creating a service object
     * @param objService {tibco.uxcore.net.Service} the Service object from which to print the request
     */
    service.printOutboundDocument = function (objService) {
        if(tibco.uxcore.util.Log.SERVICE.isLoggable(jsx3.util.Logger.TRACE)) {
            tibco.uxcore.util.Log.SERVICE.trace("-->\nOperation Name = " + objService.getOperationName() + "\nDocument send:\n" + objService.getOutboundDocument() + "\n======================\n");
        }
    }

    /**
     * Checks for, and handles any error messages in a wsdl mapping response.
     * Handling could be console logging, file logging, an alert dialog, or any other such mechanism.
     *
     * @param objEvent {jsx3.net.Service} the Service object to check for error response
     *
     * @return boolean indicating if any errors were found/logged. Returns true if any were found, else false.
     */
    service.logErrors = function(objEvent) {

        var result = false;
        try {
            if(service.serviceExpired(objEvent)) {
                service.redirectToLoginPage();
                return null;
            }

            // get the global id document
            var docGlob = tibco.uxcore.System.getServer().getCache().getDocument("XMLIDErrorDialog_1001");
            if(!docGlob || (docGlob == undefined)) {
                docGlob = jsx3.xml.CDF.Document.newDocument().getXML();
                tibco.uxcore.System.getServer().getCache().setDocument("XMLIDErrorDialog_1001", docGlob);
            }
            var rootNode = docGlob.getRootNode();
            //var doc = tibco.uxcore.System.getServer().getCache().getDocument(xmlCacheId);
            if(objEvent) {
                if(objEvent.target.getStatus() == 500) {
                    result = service.popupDialog(objEvent);
                    //handle the special cases
                    if(!result) {
                        var inboundDocument = objEvent.target.getInboundDocument();
                        if(inboundDocument) {
                            var fault = inboundDocument.selectSingleNode("//faultstring")
                            if(fault) {
                                inboundDocument.setSelectionNamespaces("xmlns:msg='http://matrix.tibco.com/admin/server/services/inventory/messages'");
                                var summary = inboundDocument.selectSingleNode("//msg:summary")
                                if(summary) {
                                    tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()), summary.getValue(), null, null, {width:"450",height:"200"});
                                }
                                else {
                                    tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()), tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Label") + inboundDocument, null, null, {width:"450",height:"200"});
                                }
                            }
                        }
                        else {
                            tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Invalid Title"), tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Invalid Label", objEvent.target.getOperationName()) + inboundDocument)
                        }
                    }
                    result = true;
                }
                else {
                    result = service.popupDialog(objEvent);
                }
            }
            else {
                tibco.uxcore.System.alert(opName, tibco.uxcore.System.getServer().getDynamicProperty("@Service Missing ObjEvent Label"))
            }
        }
        catch(e) {
            alert(e + "\n" + e.description);
        }
        return result;
    }

    service._logErrors = function(compName, opName, objEvent) {

        var result = false;
        try {
            if(service.serviceExpired(objEvent)) {
                service.redirectToLoginPage();
                return null;
            }

            // get the global id document
            var docGlob = tibco.uxcore.System.getServer().getCache().getDocument("XMLIDErrorDialog_1001");
            if(!docGlob || (docGlob == undefined)) {
                docGlob = jsx3.xml.CDF.Document.newDocument().getXML();
                tibco.uxcore.System.getServer().getCache().setDocument("XMLIDErrorDialog_1001", docGlob);
            }
            var rootNode = docGlob.getRootNode();
            //var doc = tibco.uxcore.System.getServer().getCache().getDocument(xmlCacheId);
            if(objEvent) {
                if(objEvent.target.getStatus() == 500) {
                    result = service.popupDialog(objEvent);
                    //handle the special cases
                    if(!result) {
                        var inboundDocument = objEvent.target.getInboundDocument();
                        if(inboundDocument) {
                            var fault = inboundDocument.selectSingleNode("//faultstring")
                            if(fault) {
                                inboundDocument.setSelectionNamespaces("xmlns:msg='http://matrix.tibco.com/admin/server/services/inventory/messages'");
                                var summary = inboundDocument.selectSingleNode("//msg:summary")
                                if(summary) {
                                    tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()), summary.getValue(), null, null, {width:"450",height:"200"});
                                }
                                else {
                                    tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()), tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Label") + inboundDocument, null, null, {width:"450",height:"200"});
                                }
                            }
                        }
                        else {
                            tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Invalid Title"), tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Invalid Label", objEvent.target.getOperationName()) + inboundDocument);
                        }
                    }
                    result = true;
                }
                else {
                    result = service.popupDialog(objEvent);
                }
            }
            else {
                tibco.uxcore.System.alert(opName, tibco.uxcore.System.getServer().getDynamicProperty("@Service Missing ObjEvent Label"))
            }
        }
        catch(e) {
            alert(e + "\n" + e.description);
        }
        return result;
    }

    /**
    * Determines if the response of a Service object contains any errors, and displays them in a dialog if any are found
    *
    * @param objEvent {jsx3.net.Service} the service object to display response errors from
    *
    * @return {boolean} <code>true</code> if any errors were found in the response
    */
    service.popupDialog = function(objEvent) {

        if(!objEvent) {
            return false;
        }

        else {
            var result = false;
            var errorDetailsCollection =
            doc.selectNodes("//record[@_errorDetails_]")
            if(errorDetailsCollection.getLength() > 0) {
                result = true;
                // Add it to dialogs
                // Create a new XML Document for pup up dialog
                var pupup = jsx3.xml.CDF.Document.newDocument();
                var pupupRoot = pupup.getRootNode();
                var newRecord = rootNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "record")
                newRecord.setAttribute("jsxid", jsx3.xml.CDF.getKey());
                newRecord.setAttribute("summary", compName + "/" + opName);
                newRecord.setAttribute("jsxopen", "1");
                // Add the errors to this
                while(errorDetailsCollection.hasNext()) {
                    var clone = errorDetailsCollection.next().cloneNode()
                    // Add to global
                    newRecord.appendChild(clone);
                    // add to pop up
                    pupupRoot.appendChild(clone.cloneNode())
                }
                // add the newly created node to the global Dialog
                rootNode.appendChild(newRecord);
                // Pup up the pup up dialog
                var errorDialog = tibco.uxcore.System.loadUIResource(tibco.uxcore.System.getServer().getBodyBlock(), "tibco.admin", "components/errorDialog.xml", true);
                // set the caption bar
                errorDialog.getFirstChildOfType("jsx3.gui.WindowBar").setText(compName + "/" + opName, true);
                // set the xml data
                var mtx = errorDialog.getDescendantOfName("mtxErrorDialog_1000", false, false)
                mtx.setSourceXML(pupup)
                mtx.repaint();
            }
        }
        return result
    }

   /**
   * Checks a Service object to see if the response indicates that the user's session has timed out
   *
   * @param objEvent {Object} the object returned from a callback when the service call completes
   *
   * @return {boolean} <code>true</code> if the session has expired
   */
    service.serviceExpired = function(objEvent) {
        var expired = false
        if(objEvent) {
            var responseText = objEvent.target.getRequest().getResponseText()
            if(responseText) {
                if(responseText.indexOf("Matrix_Administrator_Login_Test_For_SessionTimeOut") != -1) {
                    //  login page is loaded. session is expired
                    expired = true;
                }
            }
            else {
                // Looks like the session is expired. do a test
                expired = service.sessionExpired()
            }
        }
        return expired;
    }

    /**
     * Checks to see if the user's session has timed out
     *
     * @return {boolean} <code>true</code> if the session has expired
     */
    service.sessionExpired = function() {
        if(!tibco.uxcore.System.getServer().getEnv("MODE")) {
            return false;
        }
        var expired = false  ;
        var strURL = tibco.uxcore.System.getGBaseURI() + "/" + this.getAdminWebapp() + "/" + "adminSessionExpired.jsp";
        var obj = new jsx3.net.Request(strURL);
        // initialize the reguest.
        obj = obj.open("GET", strURL, false);
        obj = obj.send();
        var status = obj.getStatus();
        var response = obj.getResponseText();
        /*
        tibco.uxcore.util.Log.SERVICE.warn(" service.sessionExpired status = " + status);
        tibco.uxcore.util.Log.SERVICE.warn(" response = " + response);
        */

        if(status == 200) {
            expired = (response.indexOf("Session_Not_Expired_fg34sfgub") == -1);
        }
        else {
            expired = true;
        }
        return expired;
    }

    /**
    * Utility function called to redirect the user to the login page of the ActiveMatrix Admin UI (called
    * when the user's session has expired)
    */
    service.redirectToLoginPage = function() {
        tibco.uxcore.util.Log.SERVICE.info("tibco.uxcore.util.ServiceHelper#redirectToLoginPage");
        if(!service.sessiontimeoutlog) {
            try {
                service.sessiontimeoutlog = tibco.uxcore.System.getServer().getBodyBlock().loadXML(this.logoutalert, true)
            }
            catch(e) {
                alert(e);
                tibco.uxcore.System.logException(e);
                service._redirect()
            }
        }
    }

    service._redirect = function() {
        window.location = tibco.uxcore.System.getGBaseURI() + "/" + service.getAdminWebapp();
    }



    service.logInvalid = function(objEvent, compName, opName) {
        // Temporary code to be replaced with actual logging code.
        //var server = tibco.uxcore.System.getServer();
        //tibco.uxcore.System.alert('Error', compName + ' - ' + opName + ' just failed validation: ' + objEvent.message);
    }

    /**
    * Checks to see if there are any errors in the response from a Service call, and adds them to the global errors dialog content if any exist.
    *
    * @param objEvent {Object} the object returned from one of the callbck functions when a service call completes
    *
    * @return {boolean} <code>true</code> if any errors were found
    */
    service.printError = function(objEvent) {
        var ret = false;
        try {
            if(tibco.uxcore.System.getServer().getEnv("MODE") && service.serviceExpired(objEvent)) {
                service.redirectToLoginPage();
                return false;
            }
            if(objEvent) {
                // get the global id document
                var docGlob = tibco.uxcore.System.getServer().getCache().getDocument("XMLIDErrorDialog_1001");
                if(!docGlob || (docGlob == undefined)) {
                    docGlob = jsx3.xml.CDF.Document.newDocument().getXML();
                    tibco.uxcore.System.getServer().getCache().setDocument("XMLIDErrorDialog_1001", docGlob);
                }
                var rootNode = docGlob.getRootNode();
                var inbounddoc = objEvent.target.getInboundDocument()
                var operationname = (objEvent.target.strPOIOperationName)? objEvent.target.strPOIOperationName: objEvent.target.getOperationName();
                if(!inbounddoc) {
                    ret = true;
                    service.setErrorIcon(true)
                    var request = objEvent.target.getRequest()
                    if(request) {
                        tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Error Title", operationname), "Server response with status code " + request.getStatus() + " did not return a valid Doc. Response Text is \n" + unescape(request.getResponseText()), null, null, {width:"550",height:"300"});
                        tibco.uxcore.util.Log.SERVICE.error("Server response with status code " + request.getStatus() + " did not return a valid Doc. Response Text is \n" + request.getResponseText());
                        var newRecord = rootNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "record")
                        newRecord.setAttribute("jsxid", jsx3.xml.CDF.getKey());
                        newRecord.setAttribute("summary", "Server response with status code " + request.getStatus() + " did not return a valid Doc");
                        newRecord.setAttribute("details", request.getResponseText());
                        rootNode.insertBefore(newRecord, rootNode.getFirstChild());
                    }
                    else {
                        tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Error Title", operationname), "Server did not return a valid Doc.\n", null, null, {width:"550",height:"300"});
                        var newRecord = rootNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "record")
                        newRecord.setAttribute("jsxid", jsx3.xml.CDF.getKey());
                        newRecord.setAttribute("summary", "Server did not return a valid Doc");
                        newRecord.setAttribute("details", "request is null");
                        rootNode.insertBefore(newRecord, rootNode.getFirstChild())
                    }
                    throw "Server did not return a valid Doc. Operation: " + objEvent.target.getOperationName();
                }

                inbounddoc.setSelectionNamespaces("xmlns:msg='http://matrix.tibco.com/admin/server/services/matrixcommon/types'");
                var errorList = inbounddoc.selectNodes("//msg:errorDetails")
                if(errorList.getLength() == 0) {
                    var fault = inbounddoc.selectSingleNode("//faultstring")
                    if(fault) {
                        ret = true;
                        service.setErrorIcon(true)
                        inbounddoc.setSelectionNamespaces("xmlns:msg='http://matrix.tibco.com/admin/server/services/inventory/messages'");
                        var summary = inbounddoc.selectSingleNode("//msg:summary")
                        if(summary) {
                            tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()), summary.getValue(), null, null, {width:"550",height:"300"});
                            var newRecord = rootNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "record")
                            newRecord.setAttribute("jsxid", jsx3.xml.CDF.getKey());
                            newRecord.setAttribute("summary", summary.getValue());
                            newRecord.setAttribute("details", tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()));
                            rootNode.insertBefore(newRecord, rootNode.getFirstChild())
                        }
                        else {
                            tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()), tibco.uxcore.System.getServer().getDynamicProperty("@Service Response Label") + inbounddoc, null, null, {width:"550",height:"300"});
                            var newRecord = rootNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "record")
                            newRecord.setAttribute("jsxid", jsx3.xml.CDF.getKey());
                            newRecord.setAttribute("summary", "No summary");
                            newRecord.setAttribute("details", tibco.uxcore.System.getServer().getDynamicProperty("@Service 500 Error Title", fault.getValue()));
                            rootNode.insertBefore(newRecord, rootNode.getFirstChild())
                        }
                    }
                    return ret;
                }
                ret = true;
                service.setErrorIcon(true)
                // return;
                var errorDetailsCollection = errorList.iterator();
                // XML Doc for local error windowshade
                var popup = jsx3.xml.CDF.Document.newDocument();
                var popupRoot = popup.getRootNode();
                var next, details, summary;
                var showDetails = true;
                while(errorDetailsCollection.hasNext()) {
                    next = errorDetailsCollection.next()
                    details = next.selectSingleNode("msg:details")
                    summary = next.selectSingleNode("msg:summary")
                    //  Add to temp log error
                    var newRecord = popupRoot.createNode(jsx3.xml.Entity.TYPEELEMENT, "record")
                    newRecord.setAttribute("jsxid", jsx3.xml.CDF.getKey());
                    if(summary)
                        newRecord.setAttribute("summary", summary.getValue());
                    if(details)
                        newRecord.setAttribute("details", details.getValue());
                    // Add  to global log error
                    rootNode.insertBefore(newRecord.cloneNode(), rootNode.getFirstChild())
                    popupRoot.appendChild(newRecord)
                    if (!details) {
                        showDetails = false;
                    }
                }
                // Pup up the pup up dialog
                var errorDialog = tibco.uxcore.System.loadUIResource(tibco.uxcore.System.getServer().getBodyBlock(), "tibco.admin", "components/errorDialog.xml", true);

                // set the caption bar
                errorDialog.getFirstChildOfType("jsx3.gui.WindowBar").setText(tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@ErrorDialogHeader") + operationname, true);
                // set the xml data
                var mtx = errorDialog.getDescendantOfName("mtxErrorDialog_1000")
                errorDialog.getDescendantOfName("details").setDisplay(showDetails ? jsx3.gui.Block.DISPLAYBLOCK : jsx3.gui.Block.DISPLAYNONE);
                mtx.setSourceXML(popup)
                mtx.repaint();
                return ret;
            }
        }
        catch(e) {
            tibco.uxcore.System.logException(e, "Error in tibco.uxcore.util.ServiceHelper#printError");
            throw new jsx3.Exception("Error in tibco.uxcore.util.ServiceHelper#printError", jsx3.NativeError.wrap(e));
        }
    }

    service.setErrorIcon = function(active) {
        // commented out old AMX-specific code until this can get integrated with the UXCore Desktop

//        var color ;
//        if(active) {
//            color = tibco.uxcore.System.getServer().getDynamicProperty("@Messages Alert Label Color")
//            tibco.uxcore.System.getServer().getJSXByName("messagesAlertImage").setVisibility(jsx3.gui.Block.VISIBILITYVISIBLE, true)
//        }
//        else if(!active) {
//            color = tibco.uxcore.System.getServer().getDynamicProperty("@Messages Normal Label Color Fix")
//            tibco.uxcore.System.getServer().getJSXByName("messagesAlertImage").setVisibility(jsx3.gui.Block.VISIBILITYHIDDEN, true)
//        }
//        tibco.uxcore.System.getServer().setDynamicProperty("@Messages Normal Label Color", color)
//        tibco.uxcore.System.getServer().getJSXByName("messagesLabel").repaint()
    }


    /**
    * {String} the serialized xml for the dialog telling the user tha a session has expired.  Stored as a field this
    * way because after a session timeout, this cannot be retrieved from the server.
    * @private
    */
    service.logoutalert = '<serialization xmlns="urn:tibco.com/v3.0" jsxversion="3.4">' +
                          '<name><![CDATA[MatrixAdmin Dialog]]></name>' +
                          '<icon/>' +
    '<description><![CDATA[Dialog box.  (Set Modal property for a modal dialog).]]></description>' +
    '<onBeforeDeserialize/>' +
    '<onAfterDeserialize/>' +
    '<object type="jsx3.gui.Dialog">' +
    '<variants jsxzindex="5000" jsxwindowstate="1" jsxoverflow="2" jsxmodal="1" jsxresize="0"/>' +
    '<strings jsxname="dialog" jsxwidth="350" jsxheight="200"/>' +
    '<dynamics jsxbg="@uxcore10@dialogBackgroundImage"/>' +
    '<object type="jsx3.gui.WindowBar">' +
    '<variants jsxrelativeposition="0" jsxleft="0" jsxtop="0"/>' +
    '<strings jsxname="windowBar" jsxdisplay=""/>' +
    '<dynamics jsxtext="@Session Timeout Dialog Title" jsxbg="@uxcore10@dialogHeaderBGImage" jsxfontname="@uxcore10@Title Font Name" jsxfontsize="@uxcore10@Title Font Size" jsxfontweight="@uxcore10@Title Font Weight" jsxcolor="@uxcore10@Title Color"/>' +
    '<object type="jsx3.gui.ToolbarButton">' +
    '<variants/>' +
    '<strings jsxname="btnClose"/>' +
    '<dynamics jsximage="@uxcore10@CloseButton Image" jsxtip="@Close Tip" jsxmargin="@uxcore10@toolbarButton Margin"/>' +
    '<events jsxexecute="tibco.uxcore.util.ServiceHelper._redirect();this.getAncestorOfType(jsx3.gui.Dialog).doClose();"/>' +
    '</object>' +
    '</object>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxrelativeposition="1" jsxoverflow="2" jsxleft="0" jsxtop="0"/>' +
    '<strings jsxname="block" jsxwidth="100%" jsxheight="100%" jsxdisplay=""/>' +
    '<dynamics jsxbgcolor="@uxcore10@Matrix BG"/>' +
    '<object type="jsx3.gui.LayoutGrid">' +
    '<variants jsxrepeat="3" jsxrelativeposition="0" jsxleft="0" jsxtop="0" jsxoverflow="2" jsxbestguess="1" jsxorientation="1"/>' +
    '<strings jsxname="layout ( | )" jsxwidth="100%" jsxheight="100%" jsxbgcolor="#FFFFFF" jsxcols="40%,50%,*"/>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="2" jsxtop="50"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%" jsxtextalign="center"/>' +
    '<object type="jsx3.gui.LayoutGrid">' +
    '<variants jsxrepeat="3" jsxrelativeposition="0" jsxleft="0" jsxtop="0" jsxoverflow="2" jsxbestguess="1" jsxorientation="0"/>' +
    '<strings jsxname="layout (--)" jsxwidth="100%" jsxheight="100%" jsxrows="30%,*,30%"/>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="2"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%"/>' +
    '</object>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="1"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%"/>' +
    '<object type="jsx3.gui.Image">' +
    '<variants jsxoverflow="3" jsxrelativeposition="1"/>' +
    '<strings jsxname="image" jsxsrc="../../addins/MatrixAdmin/images/dialog/Alert48x48.gif" jsxbgcolor=""/>' +
    '<properties alt="Unable to connect"/>' +
    '</object>' +
    '</object>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="2"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%"/>' +
    '</object>' +
    '</object>' +
    '</object>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="1"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%"/>' +
    '<object type="jsx3.gui.LayoutGrid">' +
    '<variants jsxrepeat="4" jsxrelativeposition="0" jsxleft="0" jsxtop="0" jsxoverflow="2" jsxbestguess="1" jsxorientation="0"/>' +
    '<strings jsxname="layout (--)" jsxwidth="100%" jsxheight="100%" jsxrows="32%,10%,20%,*"/>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="2"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%"/>' +
    '</object>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="1"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%" jsxtextalign="left"/>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxrelativeposition="1" jsxoverflow="3"/>' +
    '<strings jsxname="label"/>' +
    '<dynamics jsxtext="@Session Timeout Dialog Label" jsxheight="@uxcore10@lbl Height" jsxfontweight="@uxcore10@Title Font Weight" jsxfontname="@uxcore10@Title Font Name" jsxfontsize="@uxcore10@Title Font Size" jsxcolor="@uxcore10@Title Color" jsxbgcolor="@uxcore10@Title BGColor" jsxbg="@uxcore10@Title Background" jsxpadding="@uxcore10@Title Padding" jsxborder="@uxcore10@Title Border" jsxstyleoverride="@uxcore10@Title Css Override" jsxclassname="@uxcore10@Title Css Rule Name"/>' +
    '</object>' +
    '</object>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="1"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%" jsxpadding="5"/>' +
    '<object type="tibco.uxcore.gui.Button">' +
    '<variants jsxindex="0" queueing="2"/>' +
    '<strings jsxname="button" jsxstyleoverride="background-image: url(../../../SVN/Matrix/dev/admin/client/administrator/depot/addins/MatrixAdmin/images/matrix/buttonBkgrd.jpg); background-repeat: repeat;"/>' +
    '<dynamics jsxfontname="@uxcore10@Btn Font Name" jsxfontsize="@uxcore10@Btn Font Size" jsxfontweight="@uxcore10@Btn Font Weight" jsxcolor="@uxcore10@Btn Color" jsxdisabledcolor="@uxcore10@Btn Disabled Color" jsxpadding="@uxcore10@Btn Padding" jsxmargin="@uxcore10@Btn Margin" jsxborder="@uxcore10@Btn Border" jsxwidth="@uxcore10@Btn Width" jsxheight="@uxcore10@Btn Height" jsxbgcolor="@uxcore10@Btn BGColor" jsxdisabledbgcolor="@uxcore10@Btn Disabled BGColor" jsxclassname="@uxcore10@Btn Css Rule Name" jsxtext="@uxcore10@btnReturnToLoginScreen"/>' +
    '<events jsxexecute="tibco.uxcore.util.ServiceHelper._redirect();this.getAncestorOfType(jsx3.gui.Dialog).doClose();"/>' +
    '</object>' +
    '</object>' +
    '<object type="jsx3.gui.Block">' +
    '<variants jsxoverflow="1"/>' +
    '<strings jsxname="pane" jsxwidth="100%" jsxheight="100%"/>' +
    '</object>' +
    '</object>' +
    '</object>' +
    '</object>' +
    '</object>' +
    '</object>' +
    '</serialization>';

})

