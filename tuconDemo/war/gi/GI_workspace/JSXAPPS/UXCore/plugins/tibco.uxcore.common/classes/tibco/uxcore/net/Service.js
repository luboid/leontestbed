/**
 * Networking related classes.
 */
jsx3.lang.Package.definePackage("tibco.uxcore.net", function(tibco) {
});


/**
 * This class is used in conjunction with the XML Mapping Utility to provide transactional support for those services using XML-based messaging.
 * <br/><br/>
 * This class has embedded mechanism for setting and removing a
 * Process Operation Indicator for monitoring the service calls, for benchmarking, setting the
 * End Point URL based on the application running mode (live, static) and also for redirecting
 * the application to the logout page if the server session timeout has been exceeded.
 * This class will be extended also for logging and client side field validation in common cases.
 * The developer can still set his/her own callback functions for various event types
 * (ON_ERROR, ON_INVALID, ON_SUCCESS, ON_TIMEOUT).
 */
jsx3.lang.Class.defineClass("tibco.uxcore.net.Service", jsx3.net.Service, null, function(service) {

    service.calls = [];
    service.prototype.hasError = false;

    /**
     * instance initializer <br/>
     * initializes also a POI and a benchmark indicator that monitors the request and response for this service call
     * Note: since jsx3.net.Service class is lazily loaded as of v3.2, the preferred method of
     * instantiating this class is by calling the tibco.uxcore.System.loadService method. This ensures proper URL resolution while also establishing the appropriate server context.
     *
     * @param strRulesURL {String}  The resolved URI for the rules document (a CXF document).
     * @param strOperationName {String} name of operation to call.
     * @param strPOIOperationName {String} name of Process Operation Indicator
     * @param callerInstanceId {String} (optional) a unique identifier for the instance of the caller. Ids are automatically generated
     *                    to uniquely identify the calling class/function for service calls to a given rules file/operation,
     *                    and ignore responses from earlier (stale) requests.  This is not able identify unique <i>instances</i>
     *                    of the calling class, however.  If you may have multiple instance of the same class, this handling
     *                    of stale requests must be done on an <i>instance</i> basis.  This parameter allows you to specify
     *                    an id for the unique instance of the calling class.
     * @param bNoCancelOnNew {boolean} if <code>true</code>, multiple requests for the same rules file/operation from the same
     *                    calling location will all be used (responses from earlier requests will not be ignored). (Default
     *                    value is <code>false</code>.
     */
    service.prototype.init = function(strRulesURL, strOperationName, strPOIOperationName, callerInstanceId, bNoCancelOnNew) {
        try {
            if (!strPOIOperationName) {
                strPOIOperationName = tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@wsdl@" + strOperationName);
                if (!strPOIOperationName) {
                    strPOIOperationName = strOperationName;
                }
            }
            this.strPOIOperationName = strPOIOperationName;
            this.strOperationName = strOperationName;
            this.jsxsuper(strRulesURL, strOperationName)
            this._setInternalCallBack();
            if (!callerInstanceId) {
                callerInstanceId = "defaultId";
            }
            this.jsxinstanceid = callerInstanceId;
            this.jsxnocancel = bNoCancelOnNew;
            this.counter = 0;
        }
        catch(e) {
            throw new jsx3.Exception("Error in tibco.uxcore.net.Service.init", jsx3.NativeError.wrap(e));
        }

    };


    /**
     * Generates the request message (if applicable) and sends to the remote service.
     * @param bCancelIfInvalid {Boolean} If true, the remote service will not be called if the message does not pass validation while being generated.
     * @return {Boolean} true if the message passed all validation rules while being generated.
     */
    service.prototype.doCall = function(bCancelIfInvalid) {
        var timeout = parseInt(tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@timeout"))
        var timeoutInterval = parseInt(tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@timeoutInterval"))
        var me = this;
        // This is due to bug in GI or FF. If the admin server is not running then none of the
        // call back functions are called (even the ojService.timeout). So to allow  a proper timeout handling
        // we have to test if the response text is null or not.
        this.timerFF = setInterval(function() {
            me._timeoutExceedFF()
        }, timeoutInterval)
        this.setTimeout(timeout, this._timeoutExceed)
        if (!this.jsxnocancel) {
            var caller = jsx3.lang.getCaller();
            this.key = caller.jsxmethod + "_" + this.jsxinstanceid + "_" + this.getRulesURL() + "_" + this.strOperationName;
            var prev = service.calls[this.key];
            if (prev) {
                clearInterval(prev.timerFF);
                prev.unsubscribeAllFromAll();
                if (prev.benchmarkingID)
                    tibco.uxcore.util.Performance.endBenchmark(prev.benchmarkingID)
                if (prev.operationID)
                    tibco.uxcore.util.PendingOperationsHandler.removeOperation(prev.operationID)
            }
            delete service.calls[this.key];
            service.calls[this.key] = me;
        }
        tibco.uxcore.util.Log.SERVICE.trace("tibco.uxcore.net.Service#doCall");
        try {
            this.operationID = tibco.uxcore.util.PendingOperationsHandler.addOperation(this.strPOIOperationName);
            /* @JSC :: begin BENCH */
            this.benchmarkingID = tibco.uxcore.util.Performance.beginBenchmark("Sending Message with the operation name " + this.strOperationName + " to server");
            /* @JSC :: end */
            var validate = this.jsxsuper(bCancelIfInvalid);
            tibco.uxcore.util.Log.SERVICE.trace("this.getRequest().getReadyState() =  " + this.getRequest().getReadyState());
            //tibco.uxcore.util.Log.SERVICE.trace("this.getRequest().getStatus() =  " + this.getRequest().getStatus());
            if (this.getRequest().getReadyState() == 0 && tibco.uxcore.System.getServer().getEnv("MODE")) {
                this.hasError = true;
                /* @JSC :: begin BENCH */
                if (this.benchmarkingID)
                    tibco.uxcore.util.Performance.endBenchmark(this.benchmarkingID)
                    /* @JSC :: end */
                if (this.operationID)
                    tibco.uxcore.util.PendingOperationsHandler.removeOperation(this.operationID)
                tibco.uxcore.util.Log.SERVICE.error("System runing is alive: " + tibco.uxcore.System.getServer().getEnv("MODE"));
                tibco.uxcore.util.Log.SERVICE.error("getReadyState() for the service call " + this.strOperationName + " is 0.\nThe object has been created, but not initialized (the open method has not been called).");
                // The object has been created, but not initialized (the open method has not been called).
                // Eventually the session is timed out and the returned rule file is not valid also test if session expired
                this._testSession()
            }
            if (!tibco.uxcore.System.getServer().getEnv("mode")) {
                var url = tibco.uxcore.System.getServer().resolveURI(this.getInboundURL());
                if (tibco.uxcore.System.getServer().getCache().getOrOpenDocument(url, url).hasError()) {
                    this.hasError = true;
                    /* @JSC :: begin BENCH */
                    if (this.benchmarkingID)
                        tibco.uxcore.util.Performance.endBenchmark(this.benchmarkingID)
                        /* @JSC :: end */
                    if (this.operationID)
                        tibco.uxcore.util.PendingOperationsHandler.removeOperation(this.operationID)
                }
            }
            return validate;
        } catch(ex) {
            tibco.uxcore.util.Log.SERVICE.error("Error in tibco.uxcore.net.Service#doCall: " + ex);
            clearInterval(me.timerFF);
            this._testSession()
            /* @JSC :: begin BENCH */
            if (this.benchmarkingID)
                tibco.uxcore.util.Performance.endBenchmark(this.benchmarkingID)
                /* @JSC :: end */
            if (this.operationID)
                tibco.uxcore.util.PendingOperationsHandler.removeOperation(this.operationID)
            var stub = this.getInboundURL();
            if (stub) {
                try {
                    tibco.uxcore.System.getServer().getCache().clearById(stub);
                }
                catch(ex1) {
                    jsx3.lang.NativeError.wrap(ex1).printStackTrace();
                }
            }
            tibco.uxcore.System.logException(ex, "Exception thrown while calling web service " + this.strOperationName);
        }
    }


    /**
     * Private method to register internal subscriptions on the service object set up.
     * This ensures that benchmarking and/or PendingOperationsHandler events are ended.
     *
     * @private
     * @jsxobf-clobber
     */
    service.prototype._setInternalCallBack = function() {
        var me = this
        this.subscribe(jsx3.net.Service.ON_SUCCESS, me, me._endLog);
        this.subscribe(jsx3.net.Service.ON_SUCCESS, me, me._printLog);
        this.subscribe(jsx3.net.Service.ON_INVALID, me, me._endLog);
        this.subscribe(jsx3.net.Service.ON_TIMEOUT, me, me._endLog);
        this.subscribe(jsx3.net.Service.ON_TIMEOUT, me, me._wasInvalid);
        this.subscribe(jsx3.net.Service.ON_TIMEOUT, me, me._printLog);
        this.subscribe(jsx3.net.Service.ON_ERROR, me, me._endLog);
        this.subscribe(jsx3.net.Service.ON_ERROR, me, me._printLog);
    }


    /**
     * Private method to end the benchmarking and PendingOperationsHandler events when the service call returns.
     *
     * @param objEvent {Object} the response message from the service when a subscription response is received.
     *
     * @private
     * @jsxobf-clobber
     */
    service.prototype._endLog = function (objEvent) {
        // if one of the call backs is called then remove hack timer
        var me = this
        clearInterval(me.timerFF);
        tibco.uxcore.util.Log.SERVICE.trace("tibco.uxcore.net.Service#_endLog: end log and cleare interval " + me.timerFF);
        delete service.calls[objEvent.target.key];
        try {
            var req = objEvent.target.getRequest();
        } catch(ex) {
            tibco.uxcore.System.logException(ex);
        }
        /* @JSC :: begin BENCH */
        tibco.uxcore.util.ServiceHelper.printInboundOutboundDocument(objEvent);
        if (objEvent.target.benchmarkingID)
            tibco.uxcore.util.Performance.endBenchmark(objEvent.target.benchmarkingID)
            /* @JSC :: end */
        if (objEvent.target.operationID)
            tibco.uxcore.util.PendingOperationsHandler.removeOperation(objEvent.target.operationID)
    }

    service.prototype._printLog = function (objEvent) {
        try {
            objEvent.target.hasError = tibco.uxcore.util.ServiceHelper.printError(objEvent);
        }
        catch(e) {
            tibco.uxcore.System.logException(e, "Error in tibco.uxcore.net.Service#_printLog");
        }
    }

    service.prototype._wasInvalid = function (objEvent) {
        objEvent.target.hasError = true;
    }

    service.prototype.hadError = function() {
        return this.hasError;
    }

    // This is a dummy function the session timeout is handled in serviceHelper.printError
    service.prototype._timeoutExceed = function (objEvent) {
    }

    // This is due to bug in GI or FF. If the admin server is not running then none of the
    // call back functions are called (even the objService.timeout). So to allow  a proper timeout handling
    // we have to test if the response text is null or not.
    service.prototype._timeoutExceedFF = function () {
        tibco.uxcore.util.Log.SERVICE.trace("tibco.uxcore.net.Service#_timeoutExceedFF: Test for Response text. Timer = " + this.timerFF + " counter = " + this.counter);
        if (this.counter > 5) {
            var me = this
            clearInterval(me.timerFF);
        }
        else {
            this.counter ++ ;
        }
        var responseText;
        try {
            responseText = this.getRequest().getResponseText();
        }
        catch (ex) {
            // do nothing
        }
        if (!responseText || responseText == 'undefined') {
            this._testSession()
        }
    }

    service.prototype._testSession = function () {
        try {
            if (tibco.uxcore.util.ServiceHelper.sessionExpired()) {
                var me = this
                clearInterval(me.timerFF);
                tibco.uxcore.util.Log.SERVICE.trace("tibco.uxcore.net.Service#_printLog: cleared interval " + me.timerFF);
                tibco.uxcore.util.ServiceHelper.redirectToLoginPage();
                tibco.uxcore.util.Log.SERVICE.warn("Session Expired");
            }
        }
        catch(e) {
            tibco.uxcore.System.logException(e, "Error in tibco.uxcore.net.Service.init#_timeoutExceed");
        }

    }
})
