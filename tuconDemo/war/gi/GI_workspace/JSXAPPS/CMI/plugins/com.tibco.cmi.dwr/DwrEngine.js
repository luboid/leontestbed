 var _registerGetter = function(instance, property, getter, setter) {
    var fnName = property.substring(0,1).toUpperCase() + property.substring(1);
    if(getter) {
        instance["get" + fnName] = function() {
          return this["_" + property];
        };
    }
    if(setter) {
        instance["set" + fnName] = function(value) {
            this["_" + property] =  value;
            return this;
        };
    }
};

jsx3.lang.Class.defineClass("com.tibco.cmi.dwr.Engine", null, null, 
    
    function(KLASS, instance) {
    	  //alert(CONTEXT_PATH);
        //if(!CONTEXT_PATH) {var CONTEXT_PATH="";}
				CONTEXT_PATH = '';
        KLASS._DWR_PATH = CONTEXT_PATH + "/dwr/";
        KLASS._ENGINE_FILES = ['engine.js', 'util.js'];
        KLASS._isEngineLoaded = false;

        KLASS._queries = jsx3.util.List.wrap([]);
        KLASS._isInBatch = false;
        KLASS._batchCount = 0;

        KLASS._DUMMY_DOCS_PATH = "docs/";
        KLASS._isLiveMode = true;

        KLASS.BEFORE_CALL = "onBeforeCall";
        KLASS.AFTER_CALL = "onAfterCall";
        KLASS.TIMEOUT = "onTimeout";
        KLASS.ERROR = "onError";
        
        KLASS._errorHandler = null;
        KLASS._timeout = 0;

        KLASS.LOG = jsx3.util.Logger.getLogger("com.tibco.cmi.dwr.Engine");

        KLASS.initialize = function(strDwrPath, strDocPath, bLiveMode) {
            if(strDwrPath!== undefined) { this.setPath(strDwrPath); }
            if(strDocPath!== undefined) { this.setDocPath(strDocPath); }
            if(bLiveMode !== undefined) { this.setLiveMode(bLiveMode); }
            return this;
        };
        /**
         * setErrorHandler and setTimeout will only be called one time.
         */
        KLASS.setErrorHandler = function(errorHandler){
        	this._errorHandler = errorHandler;
        };
        KLASS.setTimeout = function(timeout){
        	this._timeout = timeout;
        }
        KLASS.load = jsx3.$Y(function(cb) {
            if(this.isLiveMode()) {
                var condRV = null;
                if(!this._isEngineLoaded) {
                    jsx3.$A(this._ENGINE_FILES).each(jsx3.$F(function(item) {
										  jsx3.log('dwr engine files<<<'+item);
											jsx3.log(document.getElementById(item)+'<<<'+item);
										  if(!document.getElementById(item)){
                        var c = this._loadJS(this._DWR_PATH + item,item);
                        condRV = condRV ? condRV.and(c) : c;
											}
											else {
											  jsx3.log('file is loading or loaded'+document.getElementById(item)+'<<<<'+item);
											  var c = this._monitorJSState(document.getElementById(item));
										    condRV = condRV ? condRV.and(c) : c;
											}
                    }).bind(this));
                }
                if (condRV) {
                    condRV.when(jsx3.$F(function(){
                        this.version = dwr.version.label;
                        this._isEngineLoaded = true;
                        jsx3.log("dwr engine is loaded");
                        if(this._errorHandler) {
                        	dwr.engine.setErrorHandler(this._errorHandler);
                        }
                        if(this._timeout!=0){
                        	 dwr.engine.setTimeout(this._timeout);
                        }
                    }).bind(this));
                    return condRV;
                }
                cb.done();
            } else {
                cb.done();
            }
        });

        KLASS.loadService = function(interfaceName, methodName, argumentArray, requireFile) {
            return new com.tibco.cmi.dwr.Service(interfaceName, methodName, argumentArray, requireFile);
        };

        KLASS.isLoaded = function() {
            return this._isEngineLoaded();
        };

        KLASS.doMockCall = function(service, mockId) {
            try {
                var absPath, req, content;
                var args = service.getArgs();
                var dwrClass = service.getInterface();
                var dwrMethod = service.getMethod();
                
                if(args && args[0] && args[0] instanceof String) {
                    req = new jsx3.net.Request();
                    if(mockId) {
                        absPath = plugIn.resolveURI(this._DUMMY_DOCS_PATH + dwrClass + "/" + dwrMethod + "_" + args[0] + "_" + mockId + ".js");
                    } else {
                        absPath = plugIn.resolveURI(this._DUMMY_DOCS_PATH + dwrClass + "/" + dwrMethod + "_" + args[0] + ".js");
                    }
                    this.LOG.info("Mock file:" + absPath);
                    req.open("GET", absPath, false);
                    req.send();
                    content = req.getResponseText();
                }

                if(!req || req.getStatus() == 404) {
                    req = new jsx3.net.Request();
                    if(mockId) {
                        absPath = plugIn.resolveURI(this._DUMMY_DOCS_PATH + dwrClass + "/" + dwrMethod + "_" + mockId + ".js");
                    } else {
                        absPath = plugIn.resolveURI(this._DUMMY_DOCS_PATH + dwrClass + "/" + dwrMethod + ".js");
                    }
                    this.LOG.info("Mock file:" + absPath);
                    req.open("GET", absPath, false);
                    req.send();
                    content = req.getResponseText();
                }

                if (req.getStatus() != 200) {
                    throw "Status is " + req.getStatus();
                } else if (!content) {
                    throw "ResponseText is null";
                } else if (content.indexOf("SessionTimeOut") != -1) {
                    //TODO:: by Eric
                    throw "Login_Test_For_SessionTimeOut is loaded. Not a valid Java Script";
                }
                var dwrObject =  eval('(' + content + ')');
                service.callback.callbackHandler(dwrObject);
                return(dwrObject);
            } catch(ex) {
                alert("Error in load static data (" + dwrClass +"."+ dwrMethod +") ::" + ex);
                return null;
            }            
        };

        KLASS.getRequestCount = function() {
            return this._queries.size();
        };

        KLASS.getRequestInfo = function() {
            var iterator = this._queries.iterator();
            var info = [];
            while(iterator.hasNext()) {
              info.push(iterator.next().getMethod());
            }
            return info.join("\n");
        };

        KLASS.getVersion = function() {
            if(!this._isLiveMode) { return "mock-dwr-engine"; }
            return this.version ? this.version : "NULL";
        };

        KLASS.setPath = function(strDwrPath) {
            this._DWR_PATH = strDwrPath;
        };

        KLASS.setDocPath = function(strDocPath) {
            this._DUMMY_DOCS_PATH = strDocPath;
        };

        KLASS.setLiveMode = function(bLiveMode) {
            this._isLiveMode = bLiveMode;
        };

        KLASS.isLiveMode = function() {
            return this._isLiveMode;
        };

        KLASS.publishTryCatch = function(message) {
            try {
                this.publish(message);
            } catch(e) {
                this.LOG.error("Publish Message Error: subject=" + message.subject + "..." + e);
            }
        };

        KLASS.onBeforeCall = function(service, status) {
        	  jsx3.log("before call");
//            if(this._errorHandler && window.dwr && window.dwr.engine) {
//            	  jsx3.log("errorhandler");
//                dwr.engine.setErrorHandler(jsx3.$F(this._errorHandler).bind(this));
//            }
//            if(this._timeout!=0){
//            	  jsx3.log("timeout");
//            	  dwr.engine.setTimeout(this._timeout);
//            }
//            jsx3.log("11");
            this._queries.add(service);
            this.publishTryCatch({subject: this.BEFORE_CALL, service: this, status: status});
        };

        KLASS.onAfterCall = function(service, status) {
            this._queries.remove(service);
            this.publishTryCatch({subject: this.AFTER_CALL, service: this, status: status});
        };
        KLASS._monitorJSState = jsx3.$Y(function(cb){
				    var element = cb.args()[0];
 						if (element.addEventListener) {
                var evtHandler = function(e) {
				jsx3.log('<<<<<loaded<<<<<<');
				jsx3.log('<<<<<loaded<<<<<<');
                    element.removeEventListener('load', evtHandler, false);
                    cb.done();
                };
                element.addEventListener('load', evtHandler, false);
            } else { 
                var evtHandler = function(e) {
										var state = element.readyState;
										if(state == "loaded" || state == "interactive" || state == "complete"){
										    jsx3.log('<<<<<loaded<<<<<<');
												element.detachEvent('onreadystatechange', evtHandler, false);
												cb.done();
										}
                };
								element.attachEvent('onreadystatechange',evtHandler,false);
            }
				});



        KLASS._loadJS = jsx3.$Y(function(cb) {
            var path = cb.args()[0];
            var id = cb.args()[1];
            this.LOG.info("loadJS.." + path);
            var element = document.createElement("script");
            element.setAttribute("id",id);
            element.setAttribute("src", path);
            element.setAttribute("type", 'text/javascript');
						
            // set up onload handler
			element.isloaded = false;
						element.onreadystatechange = function() {
								var state = element.readyState;
								if (state == "loaded" || state == "interactive" || state == "complete") {
										element.onreadystatechange = null;
										element.isloaded = true;
										cb.done();
								}
						};

						element.onload = function(){
						    element.isloaded = true;
							cb.done();
						}
            // bind the element to the browser DOM to begin loading the resource
						document.getElementsByTagName("head")[0].appendChild(element);
						jsx3.log('add the script element<<<<'+id);
            
        })
    }

);

jsx3.util.EventDispatcher.jsxclass.mixin(com.tibco.cmi.dwr.Engine);

jsx3.lang.Class.defineClass("com.tibco.cmi.dwr.Service", null, [jsx3.util.EventDispatcher], 
    function(KLASS, instance) {

       var Engine = com.tibco.cmi.dwr.Engine;

        KLASS.ON_SUCCESS = "onSuccess";
        KLASS.ON_ERROR   = "onError";

        instance.init = function(interfaceName, methodName, argumentArray, requireFile) {
        	  
            this._isLoaded = false;
            this.setInterface(interfaceName);
            this.setMethod(methodName);
            this._requireFiles = [];
            if(requireFile) {
                if(!requireFile instanceof Array) { requireFile = [requireFile]; }
                this._requireFiles.concat(requireFile);
            } else {
                this._requireFiles.push(interfaceName);
            }
            this.callback = {
                callbackHandler : jsx3.$F(function() {
                    Engine.onAfterCall(this, "success");
										jsx3.log(this._method+'<<<<call success...');
                    this.publishTryCatch({subject: KLASS.ON_SUCCESS, service: this, data: arguments[0],attachArgs:arguments[1]});
                }).bind(this)
            };
            if(argumentArray) {
                this._args = argumentArray;
                this._args.push(this.callback);
            }
            this.serviceId = jsx3.app.DOM.newId("dwr-service");
            jsx3.log("dwrService"+this.serviceId+"is initialized.");
        };
        instance.pubSpecialErrorHandler = function(){
        	this.callback.errorHandler = jsx3.$F(function() {
                    Engine.onAfterCall(this, "error");
                    this.publishTryCatch({subject: KLASS.ON_ERROR, service: this, message: arguments[0], exception: arguments[1]});
                }).bind(this);
        }
        instance.setTimeout = function(timeout){
        	this.callback.timeout = timeout;
        }

        instance.getServiceId = function() {
            return this.serviceId;
        };

        instance.getLogger = function() {
            return jsx3.util.Logger.getLogger(this.getClass().getName());
        };

        instance.doCall = function(mockId) {
            if(Engine.isLiveMode()) {
                Engine.load().and(this.load()).when(jsx3.$F(function() {
                    Engine.onBeforeCall(this, "calling");
                    this._doCall();
                }).bind(this));
            } else {
                Engine.onBeforeCall(this, "mocking");
                Engine.doMockCall(this, mockId);
            }
        };
        instance.load = jsx3.$Y(function(cb) {
            var condRV = null;
            if(!this._isLoaded) {
                jsx3.$A(this._requireFiles).each(jsx3.$F(function(item) {
								  jsx3.log('script element<<<<'+document.getElementById(item)+'<<<'+item);
                	if(!document.getElementById(item)){
                    var c = Engine._loadJS(Engine._DWR_PATH + "interface/" + item + ".js",item);
                    condRV = condRV ? condRV.and(c) : c;
                  }
									//in the case the same two or more dwr service is called
									else {
									    var state = document.getElementById(item).readyState;
										jsx3.log(document.getElementById(item).loadedHandler);
									    if(!document.getElementById(item).isloaded){
										    jsx3.log(document.getElementById(item).readyState);
											jsx3.log('file is loading'+document.getElementById(item)+'<<<<'+item);
											var c = Engine._monitorJSState(document.getElementById(item));
											condRV = condRV ? condRV.and(c) : c;
										}
									}
                }).bind(this));
            }
            if (condRV) {
                condRV.when(jsx3.$F(function(){
                	  jsx3.log("the js that the service needed are loaded");
                    this._isLoaded = true;
                }).bind(this));
                return condRV;
            }
            cb.done();
        });

        instance._doCall = function() {
        	  jsx3.log("call the dwr service:"+this._interface+'<<<'+this._method);
						try{
						window[this._interface][this._method].apply(this._interface,this._args);
						jsx3.log('ok');
						}catch(e){jsx3.log('dwr _docall exc <<<'+e)}
        };

        instance.setArgs = function() {
            this._args = jsx3.Method.argsAsArray(arguments);
            this._args.push(this.callback);
            return this;
        };

        _registerGetter(instance, "args", true, false);
        _registerGetter(instance, "method", true, true);
        _registerGetter(instance, "interface", true, true);

        instance.publishTryCatch = function(message) {
            try {
                this.publish(message);
            } catch(e) {
                this.getLogger().error("Publish Message Error: subject=" + message.subject + "..." + e);
            }
        };

    }
);