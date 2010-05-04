try {
    (function(plugIn) {

    if (!gBaseURI) {
    var gBaseURI = "http://localhost:8080";
}
if (!adminContextRoot) {
    var adminContextRoot = "administrator";
}

if (!gUserName) {
    var gUserName = "Debug User";
}

if(!tibco) {
/**
 * The top-level package.
 */
jsx3.lang.Package.definePackage("tibco", function(tibco) {
});
}

if(!tibco.uxcore) {
/**
 * The root package for all ActiveMatrix Admin UI classes.
 */
jsx3.lang.Package.definePackage("tibco.uxcore", function(admin) {
});
}

jsx3.require("tibco.uxcore.exception.InvalidFunctionException",
        "tibco.uxcore.exception.InvalidNamespaceException",
        "tibco.uxcore.exception.InvalidTargetException",
        "tibco.uxcore.exception.InvalidURIException",
        "tibco.uxcore.exception.InvalidXMLDocException",
        "tibco.uxcore.exception.LoadClassFailedException",
        "tibco.uxcore.exception.UnsupportedResourceTypeException");

/**
 * The main utility class of the ActiveMatrix Admin UI, containing most of the utility functions
 * to be used by plugin developers.
 */
jsx3.lang.Class.defineClass("tibco.uxcore.System", null, null, function(system) {

    /**
     * {Object} An associative array containing the mappings between plugin package namespaces and their contextRoots
     * @private
     * @jsxobf-clobber
     */
    system.contextRoots = new Object();

    /**
     * {jsx3.app.Server} The current server object.  This allows individual plugin projects to set the server object when not being run
     * from the administrator project.
     * @private
     * @jsxobf-clobber
     */
    system.server = plugIn.getServer();

    /**
     * This is called upon deserialization of the main UI component (the AdminDesktop).  It gets the list of installed
     * plugins from the server, and registers their namespace/contextRoot associations.
     *
     * @param target {Object} the target object on which to perform the response callback notifying the caller that the
     *                        operation is complete
     * @param fctn {function} the function to call on <code>target</code> to perform the response callback
     *
     * @private
     */
    system.initializePlugins = function(target, fctn) {
//        this.contextRoots['tibco.admin'] = adminContextRoot;
        this.callgetAllInstalledPluginContext(target, fctn);
    }

    /**
     * Utility function to get the name of the currently-logged-in user.
     *
     * @return {String} the name of the logged in user
     */
    system.getUserName = function() {
        return gUserName;
    }

    /**
     * Given a filename or path, resolves the URI to an image in the MatrixAdmin addin.
     *
     * @param strPath {String} the filename (must be in the images/matrix subfolder of the addin) or the path within the
     *                         MatrixAdmin addin to the desired image file
     *
     * @return {jsx3.net.URI} the URI to the image file requested
     */
    system.resolveCommonAsset = function(strPath) {
        return this.resolveURI(null,strPath);
    }

   /**
     * Internal function. Performs a service call to get all implementing plugin components for some given interfaces.
     *
     * @param target {Object} the target object on which to perform the response callback
     * @param fctn {function} the function to call on <code>target</code> to perform the response callback
     *
     * @private
     * @jsxobf-clobber
     */
    system.callgetAllInstalledPluginContext = function(target, fctn) {
        try {
            var objService = system.loadService("tibco.admin", "rules/getInstalledPluginContexts.xml", "getAllInstalledPluginContexts");
            if (this.getServer().getEnv("MODE")) {
                objService.setEndpointURL(tibco.uxcore.util.ServiceHelper.getPluginsEndpointURL());
            }
            objService.callbackTarget = target;
            objService.callbackFunction = fctn;
            //subscribe and call
            objService.subscribe(jsx3.net.Service.ON_SUCCESS, this.ongetAllInstalledPluginContextsSuccess);
            objService.subscribe(jsx3.net.Service.ON_ERROR, this.ongetAllInstalledPluginContextsError);
            objService.subscribe(jsx3.net.Service.ON_INVALID, this.ongetAllInstalledPluginContextsInvalid);
            objService.doCall();
        }
        catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.callgetInstalledPlugins");
        }
    };

     /**
     * Internal function. Called when a successful service call has been made to get implementing plugin components
     * for a given list of interfaces. Calls register plugins, which then notifies the requesting plugin container
     * of the plugins via a callback.
     *
     * @param objEvent {Object} the response object from the service call.
     * @private
     * @jsxobf-clobber
     */
    system.ongetAllInstalledPluginContextsSuccess = function(objEvent) {
        jsx3.log("SUCCESS!");
        try {
            var doc = system.getServer().getCache().getDocument("getAllInstalledPluginContexts_00");
            if (doc) {
                var iter = doc.getChildNodes().iterator();
                while (iter.hasNext()) {
                    var next = iter.next();
                    var namespace = next.getAttribute("packageNamespace");
                    var contextRoot = next.getAttribute("contextRoot");
                    system.contextRoots[namespace] = contextRoot;
                }
            }
            objEvent.target.callbackFunction.call(objEvent.target.callbackTarget);
        }
        catch(ex) {
            system.logException(ex);
        }
    };

    /**
     * Internal function. Called when an error occurs in the service call to get implementing plugin components
     * for a given list of interfaces. Notifies the requesting plugin container of the error by returning <code>null</code>
     * in the callback.
     *
     * @param objEvent {Object} the response object from the service call.
     * @private
     * @jsxobf-clobber
     */
    system.ongetAllInstalledPluginContextsError = function(objEvent) {
        jsx3.log("ERROR getting installed plugins!");
    };

   /**
     * Internal function. Called when an error occurs in the service call to get implementing plugin components
     * for a given list of interfaces, due to the mapping being invalid. Notifies the requesting plugin container
     * of the error by returning <code>null</code> in the callback.
     *
     * @param objEvent {Object} the response object from the service call.
     * @private
     * @jsxobf-clobber
     */
    system.ongetAllInstalledPluginContextsInvalid = function(objEvent) {
          jsx3.log("INVALID! Document invalid while getting installed plugins!");
    };




    /**
     * Gets the application server
     *
     * @return {jsx3.app.Server} the application server object.
     * @throws {tibco.uxcore.exception.ServerNotDefinedException} if no valid {jsx3.app.Server} object has been
     *         set
     */
    system.getServer = function() {
        return this.server;
    };

    /**
     * Gets a url that is resolved to the proper value for a static or live environment from for the current protocol
     * (file, http, etc.), given the desired resource path and the resource's plugin package's namespace.
     *
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the plugin package namespace of this
     *                  resource's plugin package, or the <code>ComponentConfig</code> of the component that owns the
     *                  resource at <code>relPath</code>
     * @param relPath {String} the path to the resource, relative to the plugin's context root
     *
     * @throws {tibco.uxcore.exception.InvalidNamespaceException} if <code>namespace</code> is invalid
     * @throws {jsx3.lang.Exception} if an unknown error occurs
     *
     * @return {String} the resolved URI
     */
    system.resolveURI = function(namespace, relPath) {
        try {
            var id = tibco.uxcore.util.Performance.beginBenchmark("Resolving URI for " + relPath + " in namespace " + namespace);
//            jsx3.log("Namespace: " + namespace + ", relPath: " + relPath);
            if(relPath.indexOf("\\") == 0) {
                relPath = "/" + relPath.substring(1);
            }
//            jsx3.log("relPath: " + relPath);
            if(relPath.indexOf("/") != 0) {
                relPath = "/" + relPath;
            }
//            jsx3.log("relPath: " + relPath);
            var ret = null;
            if(namespace) {
                relPath = "jsxplugin://" + namespace + relPath;
            }
//            jsx3.log("relPath: " + relPath);
            ret = this.server.resolveURI(relPath);
//            jsx3.log("Resolved: " + ret);
            tibco.uxcore.util.Performance.endBenchmark(id);
            return ret;
        } catch(ex) {
            throw ex;
        }
    }

    /**
     * Gets the appropriate base URI, depending on whether the application is running in from the filesystem or not.
     *
     * @return {String} the application's base URI
     * @throws {jsx3.lang.Exception} if an error occurs while calculating the gBaseURI
     */
    system.getGBaseURI = function() {
        try {
            var base = this.isFileSystem() ? this.getGBaseURIStatic() : gBaseURI;
            if (base.lastIndexOf("/") == (base.length - 1)) {
                base = base.substring(0, base.length - 1);
            }
            return base;
        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.getGBaseURI");
            throw new jsx3.lang.Exception("Exception thrown while retrieving gBaseURI", jsx3.NativeError.wrap(ex));
        }
    }

    /**
     * Internal function to get the base URI of the application when running from the filesystem.  Called by the
     * <code>getGBaseURI</code> function.
     *
     * @return {String} the gBaseURI
     * @throws {jsx3.lang.Exception} if an error occurs while calculating the static gBaseURI
     * @private
     * @jsxobf-clobber
     */
    system.getGBaseURIStatic = function() {
        try {
            if (!this.gBaseURIStatic) {
                var loc = window.location.toString();
                var index = loc.lastIndexOf("?");
                if (index > -1) { // strip off any parameters after the html file...
                    loc = loc.substring(0, index);
                }
                loc = loc.substring(0, loc.lastIndexOf("/"));
                // strip off the html file, etc
                var user = this.getServer().resolveURI("jsxuser://") + "JSXAPPS/";
                var index2 = user.indexOf("../");
                while (index2 == 0) {
                    user = user.substring(3);
                    loc = loc.substring(0, loc.lastIndexOf("/"));
                    // strip off the html file, etc
                    index2 = user.indexOf("../");
                }
                this.gBaseURIStatic = loc + "/" + user;
            }
            return this.gBaseURIStatic;
        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.getGBaseURIStatic");
            throw new jsx3.lang.Exception("Exception thrown while calculating the static gBaseURI", jsx3.NativeError.wrap(ex));
        }
    }

    /**
     * Utility function to determine if we are running the project from the filesystem or not.
     *
     * @return {boolean} <cdoe>true</code> if we are running off the filesystem, else <code>false</code>
     */
    system.isFileSystem = function() {
        return document.location.toString().indexOf("file:///") == 0;
    }

    /**
     * Given a plugin package's namespace, gets the contextRoot for that nemespace.
     *
     * @param namespace {String} the namespace of the plugin package
     *
     * @return {String} the contextRoot for the namespace
     *
     * @throws {tibco.uxcore.exception.InvalidNamespaceException} if the <code>namespace</code> argument is invalid
     * @throws {jsx3.lang.Exception} if an unknown error occurs while retrieving the contextRoot
     */
//    system.getContextRootForNamespace = function(namespace) {
//        if (!namespace) {
//            throw new tibco.uxcore.exception.InvalidNamespaceException("The namespace is null or undefined");
//        }
//        if (typeof(namespace) != "string") {
//            throw new tibco.uxcore.exception.InvalidNamespaceException("The namespace argument is not a string");
//        }
//        try {
//            var ret = null;
//            if (this.isFileSystem()) {
//                ret = this.contextRoots[namespace];
//                if (!ret) {
//                    var index = namespace.lastIndexOf(".");
//                    if (index > -1) {
//                        ret = namespace.substring(index + 1);
//                    }
//                    else {
//                        ret = namespace;
//                    }
//                    if (ret == "admin") {
//                        ret = "administrator";
//                    }
//                }
//            }
//            else {
//                ret = this.contextRoots[namespace];
//                if(!ret) {
//                    ret = adminContextRoot;
//                }
//                if (namespace == "tibco.admin") {
//                    ret += "/JSXAPPS/administrator";
//                }
//            }
//            return ret;
//        } catch(ex) {
//            this.logException(ex, "Error in tibco.uxcore.System.getContextRootForNamespace");
//            throw new jsx3.lang.Exception("Unknown exception while retrieving the context root for namespace " + namespace, jsx3.NativeError.wrap(ex));
//        }
//    }

    /**
     * Loads an external resource into this server instance. What this method does depends on the <code>strType</code>
     * parameter.
     * <ul>
     *   <li><code>css</code> - Loads a CSS file asynchronously into the memory space of the page hosting this
     *       application; returns <code>null</code>.</li>
     *   <li><code>xml</code> or <code>xsl</code> - Loads an XML file synchronously into the XML cache of this
     *       application; <code>strId</code> is ignored; returns the loaded {jsx3.xml.Document} instance.</li>
     *   <li><code>jss</code> or <code>ljss</code> - Loads a dynamic properties file or localized properties bundle
     *       synchronously into this application; <code>strId</code> is ignored; returns <code>null</code>.</li>
     * </ul>
     *
     * @param strSrc {String} The path to the resource, relative to the context root of its owning component.
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the namespace of the plugin package
     *                  that the resource belongs to.
     * @param strId {String} the unique identifier of the resource. A resource loaded by this method may clobber
     *              a previously loaded resource of the same type and id.  This will be the id of the resource in the cache.
     * @param strType {String} the type of include, one of: <code>css</code>, <code>jss</code>, <code>xml</code>,
     *                <code>xsl</code>, or <code>ljss</code>.
     * @param bReload {boolean} if <code>true</code>, a CSS file is reloaded from the remote server without checking
     *                the local browser cache. Other types of resources are not affected by this parameter.
     * @return {jsx3.xml.Document | null} the return type depends on the <code>strType</code>
     *          parameter. See the method description.
     *
     * @throws {jsx3.lang.Exception} if an error occurs while loading the resource.
     */
    system.loadResource = function(strSrc, namespace, strId, strType, bReload) {
        try {
            if (!(strType == "css") && !(strType == "jss") && !(strType == "ljss") && !(strType == "xml") && !(strType == "xsl")) {
                throw new tibco.uxcore.exception.UnsupportedResourceTypeException(strType);
            }
            var id = tibco.uxcore.util.Performance.beginBenchmark("Loading resource " + strSrc);
            var absURI = this.resolveURI(namespace, strSrc);
            var ret = null;
            try {
                ret = this.getServer().loadInclude(absURI, strId, strType, bReload);
            }
            catch(failed) {
                try {
                    tibco.uxcore.System.getServer().getCache().clearById(strId ? strId : absURI);
                }
                catch(innerfail) {
                    // do nothing
                }
            }
            tibco.uxcore.util.Performance.endBenchmark(id);
            return ret;
        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.loadResource");
            if (system._sessionExpired())
                return;
            if (ex instanceof tibco.uxcore.exception.UnsupportedResourceTypeException) {
                throw ex;
            }
            else {
                throw new jsx3.lang.Exception("Could not load resource " + strSrc, jsx3.NativeError.wrap(ex));
            }
        }
    }

    /**
     * Loads one or more external resources specified in an external xml document into this server instance.
     * What this method does depends on various attributes defiend in xml document located at <code>strPath</code>  parameter
     *
     * <h3>Attribute namespace {String}:</h3>
     * <ul>
     *   <li>the namespace of the plugin packag that the resource belongs to. Will use parameter <code>namespace</code> as default</li>
     * </ul>
     * <h3>Attribute id {String}:</h3>
     * <ul>
     *   <li>the unique identifier of the resource. A resource loaded by this method may clobber
     *       a previously loaded resource of the same type and id.  This will be the id of the resource in the cache.
     *       Will use parameter <code>strPath</code> as default </li>
     * </ul>
     * <h3>Attribute type:</h3>
     * <h3>Attribute type:</h3>
     * <ul>
     *   <li><code>script</code> - Given the absolute path to the .js file, or the relative path and it's plugin component's
     *       namespace, retrieves the .js file from the server, and loads the class.</li>
     *   <li><code>css</code> - Loads a CSS file asynchronously into the memory space of the page hosting this
     *       application.</li>
     *   <li><code>xml</code> or <code>xsl</code> - Loads an XML file synchronously into the XML cache of this
     *       application.</li>
     *   <li><code>jss</code> or <code>ljss</code> - Loads a dynamic properties file or localized properties bundle
     *       synchronously into this application.</li>
     * </ul>
     * <h3>Sample of a resource.xml file:</h3>
     *
     * <code>
     * &lt;data jsxid=&quot;jsxroot&quot;&gt;<br />
     * &nbsp;&nbsp;&nbsp;&nbsp;&lt;record jsxid=&quot;1&quot; path=&quot;tibco/admin/enterpriseAssets/envDef/envDtls/genInfo/jss/genInfo_en.xml&quot; id=&quot;&quot; type=&quot;jss&quot; namespace=&quot;tibco.admin&quot;/&gt;<br />
     * &nbsp;&nbsp;&nbsp;&nbsp;&lt;record jsxid=&quot;2&quot; path=&quot;tibco/admin/enterpriseAssets/envDef/envDtls/genInfo/GenInfo.js&quot; type=&quot;script&quot;  /&gt;<br />
     * &nbsp;&nbsp;&nbsp;&nbsp;&lt;record jsxid=&quot;2&quot; path=&quot;tibco/admin/enterpriseAssets/envDef/envDtls/genInfo/GenInfoAdd.js&quot; type=&quot;script&quot;  /&gt;<br />
     * &lt;/data&gt;
     * </code>
     *
     * @param strPath {String} The path to the xml document, relative to the context root of its owning component.
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the namespace of the plugin package that the resource belongs to.
     *
     * @throws {jsx3.lang.IllegalArgumentException} if the caller of this function does not pass arguments according to the method's contract.
     *
     * @throws {tibco.uxcore.exception.InvalidXMLDocException} if xml document located in <code>strPath</code> is invalid or not found.
     *
     * @throws {jsx3.lang.Exception} if an error occurs while loading one of the the resources specified in <code>strPath</code..
     */
    system.loadResources = function(strPath, namespace) {
        var absURI, resDocument, nodeList, next, path, strId, type ;

        try {
            absURI = system.resolveURI(namespace, strPath)
        }
        catch(e) {
            throw new jsx3.lang.IllegalArgumentException("\nstrPath = " + strPath + "\nnamespace = " + namespace, jsx3.NativeError.wrap(e));
        }
        try {
            resDocument = jsx3.xml.CDF.Document.newDocument();
            resDocument.setAsync(false);
            resDocument.setValidateOnParse(true)
            resDocument = resDocument.load(absURI);
            if (resDocument.getError().code != 0) {
                throw  resDocument
            }
            nodeList = resDocument.selectNodes("//record");
        }
        catch(e) {
            if (system._sessionExpired())
                return;
            throw new tibco.uxcore.exception.InvalidXMLDocException("\nPlease check if " + absURI + " exists and is a valid document.", jsx3.NativeError.wrap(e));
        }
        try {
            var strNamespace = namespace ;
            for (i = 0; i < nodeList.size(); i++) {
                next = nodeList.get(i);
                path = next.getAttribute("path");
                type = next.getAttribute("type");
                strNamespace = next.getAttribute("namespace")
                if (!strNamespace || strNamespace == "") {
                    strNamespace = namespace
                }
                if (next.getAttribute("type") == "script") {
                    try {
                        system.loadClass(path, strNamespace)
                    }
                    catch(e) {
                        throw e;
                    }
                }
                if (type == "jss" || type == "ljss" || type == "xml" || type == "xsl" || type == "css") {
                    strId = (strId = next.getAttribute("strId")) ? strId : path;
                    system.getServer().loadInclude(system.resolveURI(strNamespace, path), strId, type, false);
                }
            }
        }
        catch(e) {
            if (system._sessionExpired())
                return;
            throw new jsx3.lang.Exception("Could not load resource .\nCan't load one or more resources located in document  " + absURI, jsx3.NativeError.wrap(e));
        }
    }

    /**
     * Given the absolute path to the .js file, or the relative path and it's plugin component's
     * namespace, retrieves the .js file from the server, and loads the class.
     *
     * @param path {String} either an absolute URL to the .js file (<code>namespace</code> MUST not be
     *            specified), or a relative path to the .js file (<code>namespace</code> MUST be specified, and must be
     *            the plugin package namespace for the class' plugin).
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the plugin package namespace for the class'
     *                  plugin package, or the <code>ComponentConfig</code> for the component that owns this class.
     *                  Used to resolve the path to the .js file, given the class name specified in <code>path</code>.
     *                  (Must be <code>null</code> if <code>path</code> is an absoulte url to the .js file).
     *
     * @throws {tibco.uxcore.exception.LoadClassFailedException} if an error occurs while loading the class.
     */
    system.loadClass = function(path, namespace) {
        try {
            var id = tibco.uxcore.util.Performance.beginBenchmark("Loading class " + path);
            if (path.indexOf("://") < 0) {
                if (namespace) {
                    var fullpath = this.resolveURI(namespace, path);
                    this._loadClass(fullpath);
                }
                else {
                    throw new tibco.uxcore.exception.InvalidURIException(path + " is an invalid URI.  An absoulte path was expected because the namespace argument was null or undefined");
                }
            }
            else {
                this._loadClass(path);
            }
            tibco.uxcore.util.Performance.endBenchmark(id);
        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.loadClass");
            throw new tibco.uxcore.exception.LoadClassFailedException("Load Class failed for path " + path + " and namespace " + namespace, jsx3.NativeError.wrap(ex));
        }
    }

    /**
     * Given the absolute URL to a class' .js file, retrieves the .js file from the server, and loads the class
     * into the browser's memory for the current page.
     *
     * @param absPath {String} the absolute URL to the class to be loaded.
     *
     * @throws {tibco.uxcore.exception.LoadClassFailedException} if an error occurs while loading the class.
     *
     * @private
     * @jsxobj-clobber
     */
    system._loadClass = function(absPath) {
        try {
            var req = new jsx3.net.Request();
            req.open("GET", absPath, false);
            var myreq = req.send();
            var content = req.getResponseText();
            if (req.getStatus() != 200) {
                throw "Status is " + req.getStatus();
            }
            else if (!content) {
                throw "ResponseText is null";
            }
            else if (content.indexOf("Matrix_Administrator_Login_Test_For_SessionTimeOut") != -1) {
                throw "Matrix_Administrator_Login_Test_For_SessionTimeOut is loaded. Not a valid Java Script";
            }
            jsx3.eval(content);
        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System._loadClass");
            if (system._sessionExpired())
                return;
            throw new tibco.uxcore.exception.LoadClassFailedException("Load Class failed class at absolute path " + absPath, jsx3.NativeError.wrap(ex));
        }
    }

    /**
     * Loads a particular serialized UI resource into a parent block, automatically resolving URLs within the
     * Admin UI plugin framework.
     *
     * @param parent {jsx3.app.Model} the Model object representing the parent object to load the resource as
     *               a child of.
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the namespace of the resource's plugin
     *                  package, or the <code>ComponentConfig</code> for the component that owns this UI Resource
     * @param resourcePath {String} the path (relative to the component path of the plugin component) of the
     *                     resource to be loaded into <code>parent</code>
     * @param repaint {boolean} flag to indicate whether or not to repaint the parent after the child is loaded. Default
     *                is <code>false</code> (no repaint)
     *
     * @throws {jsx3.lang.Exception} if an error occurs while loading the resource
     *
     * @return {jsx3.app.Model} The deserialized object that was loaded into <code>parent</code>
     */
    system.loadUIResource = function(parent, namespace, resourcePath, repaint) {
        tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#loadUIResource: resourcePath = " + resourcePath)
        try {
            var absPath = this.resolveURI(namespace, resourcePath);
            var objXML = this.getServer().getCache().getDocument(absPath)
            if (objXML == null) {
                var req = new jsx3.net.Request();
                if (tibco.uxcore.System.isFileSystem()) {
                    req.open("GET", absPath, false);
                }
                else {
                    var contextroot = this.contextRoots[namespace]
                    contextrootfull = "/" + contextroot + "/"
                    var strpath = "/amxadministrator/uiresourcecheck?file=" + absPath.replace(contextrootfull, "") + "&contextroot=" + contextroot + "&ts=" + new Date()
                    tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#loadUIResource Runinig at server.\npath = " + strpath)
                    req.open("GET", strpath, false);
                }
                req.send();
                objXML = req.getResponseXML()
                tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#loadUIResource: HTTP response code  = " + req.getStatus())
                if (req.getStatus() != 200) {
                    if (system._sessionExpired()){
                        return null;
                    }
                    if(req.getStatus() == 500){
                        tibco.uxcore.System.getServer().alert("500",req.getResponseText(),null,"Ok",{width:600,height:400})
                    }
                }
                system.getServer().getCache().setDocument(absPath, objXML);
            }
            return parent.loadXML(objXML, repaint);
        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.loadUIResource");
            if (system._sessionExpired())
                return;
            throw new jsx3.lang.Exception("Error loading UI Resource " + resourcePath + " with namespace " + namespace, jsx3.NativeError.wrap(ex));
        }
    }

   /**
     * Pre loads a particular serialized UI resource into cache, automatically resolving URLs within the
     * Admin UI plugin framework. Is used for ACL to test if user has access right to the UI
     *
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the namespace of the resource's plugin
     *                  package, or the <code>ComponentConfig</code> for the component that owns this UI Resource
     * @param resourcePath {String} the path (relative to the component path of the plugin component) of the
     *                     resource to be loaded into <code>parent</code>
     * @throws {jsx3.lang.Exception} if an error occurs while loading the resource
     *
     * @private
     *
     * @return {int} HTTP response code (i.e., 200 OK , 404 Not Found, 500 Internal Server Error, 403 Forbidden etc);
     */
    system.preLoadUIResource = function(namespace, resourcePath) {
        tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#preLoadUIResource: resourcePath = " + resourcePath)
        try {
            var loadedstatus = 0;
            if (namespace == "tibco.admin") {
                var prefix = "JSXAPPS/administrator/"
                resourcePath = resourcePath.replace(prefix, "")
            }
            var absPath = this.resolveURI(namespace, resourcePath);
            var req = new jsx3.net.Request();
            if (tibco.uxcore.System.isFileSystem()) {
                req.open("GET", absPath, false);
            }
            else {
                var contextroot = this.contextRoots[namespace]
                contextrootfull = "/" + contextroot + "/"
                //alert("namespace " + namespace +" contextroot  "+contextroot)
                var strpath = "/amxadministrator/uiresourcecheck?file=" + absPath.replace(contextrootfull, "") + "&contextroot=" + contextroot + "&ts=" + new Date()
                tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#preLoadUIResource Runinig at server.\npath = " + strpath)
                req.open("GET", strpath, false);
            }
            req.send();
            objXML = req.getResponseXML()
            tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#preLoadUIResource: HTTP response code  = " + req.getStatus())
            loadedstatus = req.getStatus()
            if (loadedstatus == 200) {
                system.getServer().getCache().setDocument(absPath, objXML);
            }
            else {
                if (system._sessionExpired()) {
                    return null;
                }
                if (loadedstatus == 500) {
                    tibco.uxcore.System.getServer().alert("500", req.getResponseText(),null,"Ok",{width:600,height:400})
                }
            }
            return loadedstatus

        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.loadUIResource");
            if (system._sessionExpired())
                return;
            throw new jsx3.lang.Exception("Error loading UI Resource " + resourcePath + " with namespace " + namespace, jsx3.NativeError.wrap(ex));
        }
    }


    /**
     * Asynchronously loads a particular serialized UI resource into a parent block, automatically resolving URLs within the
     * Admin UI plugin framework. Notifies the caller of the completed load on the <code>callbackTarget</code>'s
     * <code>callbackFunction</code> function.  The callback will pass an object with a <code>resourcePath</code> field, which will
     * have the original <code>resourcePath</code> specified here, a <code>namespace</code> field conaining the original
     * <code>namespace</code> specified here, a <code>status</code> field with a String value of either
     * <code>SUCCESS</code> or <code>FAILURE</code>, a <code>message</code> field containing any error message, an <code>exception</code>
     * field, containing any {jsx3.lang.Exception} thrown, and an <code>obj</code> field containing the
     * deserialized {jsx3.app.Model} object that was loaded.
     *
     * If you need asynchronous loading of components, but chanied to guarantee the order in which they are loaded, load
     * successive components from the callbackFunction.  This synchronizes the loading of multiple UI files, but allows
     * the rest of the application to continue to work (repainting, etc). rather than waiting for the UI objects to load before
     * coninuing.
     *
     * @param parent {jsx3.app.Model} the Model object representing the parent object to load the resource as
     *               a child of.
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the namespace of the resource's plugin package
     *                  or the <code>ComponentConfig</code> for the component that owns this UI Resource
     * @param resourcePath {String} the path (relative to the component path of the plugin component) of the
     *                     resource to be loaded into <code>parent</code>
     * @param repaint {boolean} flag to indicate whether or not to repaint the parent after the child is loaded. Default
     *                is <code>false</code> (no repaint)
     * @param callbackTarget {Object} the target object on which the callback to <code>callbackFunction</code> should be made
     *                       when the load operation is complete.
     * @param callbackFunction {Function} the function to call on <code>callbackTarget</code> to perform the callback once
     *                         the load operation is complete.
     *
     * @throws {tibco.uxcore.exception.InvalidTargetException} if <code>callbackTarget</code> and <code>callbackFunction</code>
     *         are specified, but the <code>callbackTarget</code> is not an Object
     * @throws {tibco.uxcore.exception.InvalidFunctionException} if <code>callbackTarget</code> and <code>callbackFunction</code>
     *         are specified, but <code>callbackFunction</code> is not a function
     * @throws {jsx3.lang.Exception} if an unknown error occurs
     */
    system.loadUIResourceAsync = function(parent, namespace, resourcePath, callbackTarget, callbackFunction, repaint) {
        tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#loadUIResourceAsync: resourcePath = " + resourcePath)
        try {
            if (!parent) {
                throw new jsx3.lang.Exception("Parent is not defnied.  Cannot load UI Resource into non-existent parent");
            }
            if (callbackTarget && callbackFunction) {
                if (typeof(callbackTarget) != "object") {
                    throw new tibco.uxcore.exception.InvalidTargetException("Specified callback target is not an Object");
                }
                else if (typeof(callbackFunction) != "function") {
                    throw new tibco.uxcore.exception.InvalidFunctionException("Specified callback function is not a function");
                }
                //                else if(!jsx3.eval(callbackTarget + "." + callbackFunction)) {
                //                    throw new tibco.uxcore.exception.InvalidFunctionException("The specified callback function is not a valid function on the callback target object")
                //                }
            }
            var absPath = this.resolveURI(namespace, resourcePath);
            var objXML = this.getServer().getCache().getDocument(absPath)
            if (objXML != null) {
                jsx3.sleep(function() {
                    tibco.uxcore.util.Log.SYSTEM.info("loadUIResourceAsync loading from cache ")
                    var msg = new Object();
                    msg.obj = parent.loadXML(objXML, true);
                    msg.resourcePath = resourcePath;
                    msg.namespace = namespace;
                    msg.headers = null;
                    msg.exception = null;
                    msg.status = "SUCCESS";
                    msg.message = "Successfully loaded UI Resource " + resourcePath + " from cache";
                    if (callbackTarget && callbackFunction) {
                        setTimeout(function() {
                            callbackFunction.call(callbackTarget, msg);
                        }, 0);
                    }
                }, null, system);
            }
            else {
                tibco.uxcore.util.Log.SYSTEM.info("loadUIResourceAsync loading from servlet ")
                var req = new jsx3.net.Request();
                req.parent = parent;
                req.repaint = repaint;
                req.resourcePath = resourcePath;
                req.namespace = namespace;
                req.callbackTarget = callbackTarget;
                req.callbackFunction = callbackFunction;
                req.absPath = absPath ;
                if (tibco.uxcore.System.isFileSystem()) {
                    req.open("GET", absPath, true);
                }
                else {
                    var contextroot = this.contextRoots[namespace]
                    tibco.uxcore.util.Log.SYSTEM.info("contextroot = " + contextroot)
                    tibco.uxcore.util.Log.SYSTEM.info("absPath = " + absPath)
                    contextrootfull = "/" + contextroot + "/"
                    var strpath = "/amxadministrator/uiresourcecheck?file=" + absPath.replace(contextrootfull, "") + "&contextroot=" + contextroot + "&ts=" + new Date()
                    tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#loadUIResourceAsync Runinig at server.\npath = " + strpath)
                    req.open("GET", strpath, true);
                    tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#loadUIResourceAsync invoked open");
                }
                req.subscribe(jsx3.net.Request.EVENT_ON_RESPONSE, system.onLoadUIResourceResponse);
                req.subscribe(jsx3.net.Request.EVENT_ON_TIMEOUT, system.onLoadUIResourceTimeout);
                req.send(null, 10000);
            }
        } catch(ex) {
            this.logException(ex, "Error in tibco.uxcore.System.loadUIResourceAsync")
            if ((ex instanceof tibco.uxcore.exception.InvalidTargetException) || (ex instanceof tibco.uxcore.exception.InvalidFunctionException)) {
                throw ex;
            }
            else {
                throw new jsx3.lang.Exception("Unknown error occurred while trying to asynchronously load UI Resource " + resourcePath + " with namespace " + namespace, jsx3.NativeError.wrap(ex));
            }
        }
    }

    /**
    * Given a CDF cache document and record id, shows an error dialog by simply providing the attributes of that row to use
    * as the summary and details of the dialog.
    *
    * @param cacheId {String} the id of the CDF document in the cache
    * @param jsxid {String} the jsxid of the record to be used in the document identified by <code>cacheId</code>
    * @param shortMessageAtt {String} the name of the attribute in the record to use as the content of the summary
    * @param longMessageAtt {String} the name of the attribute in the record to use as the content of the details
    * @param shortLabel {String} the optional label to use for the summary area
    * @param longLabel {String} the optional label to use for the details area
    * @param dialogTitle {String} the optional title for the dialog
    */
    system.showErrorDialog = function(cacheId, jsxid, shortMessageAtt, longMessageAtt, shortLabel, longLabel, dialogTitle) {
        var doc = this.getServer().getCache().getDocument(cacheId);
        if (doc) {
            var record = doc.getRecordNode(jsxid);
            if (record) {
                var shortMessage = record.getAttribute(shortMessageAtt);
                var longMessage = record.getAttribute(longMessageAtt);
                if (!shortLabel) {
                    shortLabel = this.getServer().getDynamicProperty("@ErrMsgDialog Summary Label");
                }
                if (!longLabel) {
                    longLabel = this.getServer().getDynamicProperty("@ErrMsgDialog Details Label");
                }
                if (!dialogTitle) {
                    dialogTitle = this.getServer().getDynamicProperty("@ErrMsgDialog Title");
                }
                var block = this.getServer().getJSXByName("dlgMessageDetails_30");
                if (!block) {
                    var server = jsx3.IDE ? jsx3.IDE : this.getServer();
                    var bodyblock = server.getBodyBlock();
                    block = bodyblock.load("jsxplugin://tibco.uxcore.common/components/messageDialog.xml", true);
                }
                block.getDescendantOfName("txtMessageSummary_30").setValue(shortMessage, true);
                block.getDescendantOfName("txtbxMessageDetails_30").setValue(longMessage, true);
                block.getDescendantOfName("lblMessageSummaryLabel_30").setText(shortLabel, true);
                block.getDescendantOfName("lblMessageDetailsLabel_30").setText(longLabel, true);
                block.getDescendantOfName("windowBar").setText(dialogTitle, true);
            }
            else {
                // throw exception?
            }
        }
        else {
            // throw exception here?
        }
    }

    /**
     * Private function to handle a response from a <code>loadUIResource()</code> call.
     *
     * @param objEvent {Object} the response message object from the subscription callback
     *
     * @private
     * @jsxobf-clobber
     */
    system.onLoadUIResourceResponse = function(objEvent) {
        tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#onLoadUIResourceResponse Call back function for async loading objEvent " + objEvent)
        try {
            var req = objEvent.target;
            tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#onLoadUIResourceResponse. status for request " + req + "is "+req.getStatus())
            var msg = new Object();
            msg.resourcePath = req.resourcePath;
            msg.namespace = req.namespace;
            msg.headers = req.getAllResponseHeaders();
            if (req.getStatus() == "200") {
                msg.exception = null;
                msg.status = "SUCCESS";
                msg.message = "Successfully loaded UI Resource " + req.resourcePath;
                try {
                    msg.obj = req.parent.loadXML(req.getResponseXML(), true);
                    try {
                        system.getServer().getCache().setDocument(req.absPath , req.getResponseXML());
                    } catch(failed) {
                        try {
                            tibco.uxcore.System.getServer().getCache().clearById(req.absPath);
                        }
                        catch(innerfail) {
                            // do nothing
                        }
                    }
                } catch (ex) {
                    if (system._sessionExpired())
                        return;
                    msg.status = "FAILURE";
                    msg.exception = jsx3.NativeError.wrap(ex);
                    msg.message = "Successfully retrieved UI Resource " + req.resourcePath + " but failed to load it into the parent object\nException thrown: " + msg.exception.getMessage();
                    system.logException(ex);
                }
            }
            else {
                if (system._sessionExpired())
                    return;
                msg.exception = null;
                msg.status = "FAILURE";
                msg.obj = null;
                msg.message = "Failed to load UI Resource " + req.resourcePath + "\nHTTP Response Code: " + req.getStatus() + "\nHTTP Response Text: " + req.getStatusText();
                if (req.getStatus() == 500) {
                    tibco.uxcore.System.getServer().alert("500", req.getResponseText(),null,"Ok",{width:600,height:400})
                }
            }
            if (req.callbackTarget && req.callbackFunction) {
                setTimeout(function() {
                    req.callbackFunction.call(req.callbackTarget, msg);
                }, 0);
            }
        } catch(ex) {
            tibco.uxcore.util.Log.SYSTEM.error("Error in tibco.uxcore.System.onLoadUIResourceResponse 0" + ex)
            if (system._sessionExpired())
                return;
            system.logException(ex, "Error in tibco.uxcore.System.onLoadUIResourceResponse")
            if (req.callbackTarget && req.callbackFunction) {
                msg.exception = ex;
                msg.status = "FAILURE";
                msg.message = "Failed to load UI Resource " + req.resourcePath;
                if (req.callbackTarget && req.callbackFunction) {
                    setTimeout(function() {
                        req.callbackFunction.call(req.callbackTarget, msg);
                    }, 0);
                }
            }
            if (objEvent.target.getStatus() == 500) {
               tibco.uxcore.System.getServer().alert("500", objEvent.target.getResponseText(),null,"Ok",{width:600,height:400})
            }
        }
    }

    /**
     * Private function to handle a timeout on a <code>loadUIResource()</code> call.
     *
     * @param objEvent {Object} the response message object from the subscription callback
     *
     * @private
     * @jsxobf-clobber
     */
    system.onLoadUIResourceTimeout = function(objEvent) {
        try {
            if (system._sessionExpired())
                return;
            var req = objEvent.target;
            var msg = new Object();
            msg.resourcePath = req.resourcePath;
            msg.namespace = req.namespace;
            msg.headers = req.getAllResponseHeaders();
            msg.exception = null;
            msg.status = "FAILURE";
            msg.obj = null;
            msg.message = "Failed to load UI Resource " + req.resourcePath + "\nOperation Timed Out";
            if (objEvent.target.getStatus() == 500) {
               tibco.uxcore.System.getServer().alert("500", objEvent.target.getResponseText(),null,"Ok",{width:600,height:400})
            }
            if (req.callbackTarget && req.callbackFunction) {
                setTimeout(function() {
                    req.callbackFunction.call(req.callbackTarget, msg);
                }, 0);
            }
        } catch(ex) {
            system.logException(ex, "Error in tibco.uxcore.System.onLoadUIResourceTimeout")
            if (system._sessionExpired())
                return;
            if (req.callbackTarget && req.callbackFunction) {
                msg.exception = ex;
                msg.status = "FAILURE";
                if (req.callbackTarget && req.callbackFunction) {
                    setTimeout(function() {
                        req.callbackFunction.call(req.callbackTarget, msg);
                    }, 0);
                }
            }
        }
    }

    /**
     * Given an exception and an optional message, prints the exception to the logs
     *
     * @param ex {jsx3.lang.Exception} the exception to log
     * @param message {String} (optional) a message to prepend to the exception logging
     */
    system.logException = function(ex, message) {
        try {
            if (!ex.wasLogged) {
                ex.wasLogged = true;
                jsx3.util.Logger.GLOBAL.error((message) ? message : "An error occurred: ", jsx3.NativeError.wrap(ex));
            }
        } catch(e) {
            this.logException(new jsx3.lang.Exception("An error occurred while attempting to log an exception."), "Error logging exception: ");
        }
    }

    /**
     * Loads and parses a mapping rules file synchronously; returns a new instance of {tibco.uxcore.net.Service}.
     *
     * @param namespace {String | tibco.uxcore.util.component.ComponentConfig} the namespace of the plugin package that the resource belongs to.
     * @param strRulesURL {String} The relative URI for the rules document (a CXF document).
     * @param strOperationName {String} name of operation to call.
     * @param strPOIOperationName {String} name of process operation indicator.
     * @param callerInstanceId {String} (optional) a unique identifier for the instance of the caller. Ids are automatically generated
     *                    to uniquely identify the calling class/function for service calls to a given rules file/operation,
     *                    and ignore responses from earlier (stale) requests.  This is not able identify unique <i>instances</i>
     *                    of the calling class, however.  If you may have multiple instance of the same class, this handling
     *                    of stale requests must be done on an <i>instance</i> basis.  This parameter allows you to specify
     *                    an id for the unique instance of the calling class.
     * @param bNoCancelOnNew {boolean} if <code>true</code>, multiple requests for the same rules file/operation from the same
     *                    calling location will all be used (responses from earlier requests will not be ignored). (Default
     *                    value is <code>false</code>.
     *
     * @return {tibco.uxcore.net.Service} the service object that has been loaded.
     *
     * @throws {jsx3.lang.Exception} if an error occurs while creating the service object
     */
    system.loadService = function(namespace, strRulesURL, strOperationName, strPOIOperationName, callerInstanceId, bNoCancelOnNew) {
        try {
            jsx3.require("jsx3.net.Service");
            var objService = (new tibco.uxcore.net.Service(tibco.uxcore.System.resolveURI(namespace, strRulesURL), strOperationName, strPOIOperationName, callerInstanceId, bNoCancelOnNew)).setNamespace(system.getServer());
            objService.setOutboundStubURL("jsx://xml/stubs/soap.xml")
            var stub = objService.getInboundURL()
            if (!tibco.uxcore.System.getServer().getEnv("MODE")) {
                if (!stub) {
                    tibco.uxcore.util.Log.SERVICE.warn("System is running in static mode.\n Stub url for the mapping rule " + strOperationName + " specified at " + strRulesURL + " is " + stub);
                }
                else {
                    var absuri = tibco.uxcore.System.resolveURI(namespace, stub)
                    tibco.uxcore.util.Log.SYSTEM.info("tibco.uxcore.System#loadService: \n absolute path to mapping rule is " + absuri)
                    objService.setInboundURL(absuri);
                }
            }
            return  objService;
        }
        catch(e) {
            system.logException(e, "Error in tibco.uxcore.System.loadService");
            throw new jsx3.lang.Exception("Error creating service object for rules file " + strRulesURL, jsx3.NativeError.wrap(e));
        }
    }

    /**
    * Opens the API documentation in a GI dialog.
    *
    * @param objEvent {jsx3.gui.Event} the event that triggered this action
    *
    * @private
    */
    system.apiHelpWindowDidOpen = function(objEvent) {
        jsx3.ide.LOG.debug("apiHelpWindowDidOpen " + objEvent.target.getName());

        var w = objEvent.target;
        if (w.getHelpBlock() == null) {
            var dialog = jsx3.IDE.getRootBlock().getChild('jsx_ide_api_dialog');
            if (dialog != null && dialog.getHelpBlock() != null) {
                jsx3.ide.LOG.debug("apiHelpWindowDidOpen adopting");
                w.getHelpBlockParent().adoptChild(dialog.getHelpBlock());
            } else {
                jsx3.ide.LOG.debug("apiHelpWindowDidOpen loading");
                try {
                    w.getHelpBlockParent().loadAndCache('jsxplugin://tibco.uxcore.common/components/apihelp/apihelp.xml');
                }
                catch(failed) {
                    try {
                        tibco.uxcore.System.getServer().getCache().clearById(tibco.uxcore.System.getServer().resolveURI('jsxplugin://tibco.uxcore.common/components/apihelp/apihelp.xml'));
                    }
                    catch(innerfail) {
                        // do nothing
                    }
                }
            }

            if (dialog)
                dialog.getParent().removeChild(dialog);
        }
    };

    /**
    * Opens the API documentation in GI (non-HTML format)
    *
    * @param bAsWindow {boolean} <code>true</code> indicates that it should open in a separate window, <code>false</code>
    *                            indicates it should open in an internal dialog within GI Builder.
    *
    * @private
    */
    system.doOpenApiHelp = function(bAsWindow) {
        jsx3.ide.LOG.debug("doOpenApiHelp window:" + bAsWindow);

        var w = jsx3.IDE.getAppWindow("api_help");
        var success = false;
        if (bAsWindow) {
            if (w == null) {
                w = jsx3.IDE.loadAppWindow('jsxplugin://tibco.uxcore.common/components/apihelp/as_window.xml');
                w.subscribe(jsx3.gui.Window.DID_OPEN, this.apiHelpWindowDidOpen);
                //          w.subscribe(jsx3.gui.Window.WILL_CLOSE, jsx3.ide.saveApiHelpWindowState);
                //          w.subscribe(jsx3.gui.Window.DID_FOCUS, jsx3.ide.saveApiHelpWindowState);
            }
            if (w.isOpen())
                w.focus();
            else
                w.open();

            success = w.isOpen();
        }

        if (! success) {
            var dialog = jsx3.IDE.getRootBlock().getChild('jsx_ide_api_dialog');
            jsx3.ide.LOG.debug("switching to dialog: " + dialog);

            if (dialog == null) {
                jsx3.ide.LOG.debug("doOpenApiHelp loading dialog component");
                try {
                    dialog = jsx3.IDE.getRootBlock().loadAndCache('jsxplugin://tibco.uxcore.common/components/apihelp/as_dialog.xml');
                }
                catch(failed) {
                    try {
                        tibco.uxcore.System.getServer().getCache().clearById(tibco.uxcore.System.getServer().resolveURI('jsxplugin://tibco.uxcore.common/components/apihelp/as_dialog.xml'));
                    }
                    catch(innerfail) {
                        // do nothing
                    }
                }
            }

            if (dialog.getHelpBlock() == null) {
                if (w != null && w.getHelpBlock() != null) {
                    jsx3.ide.LOG.debug("doOpenApiHelp adopting API help content");
                    dialog.getHelpBlockParent().adoptChild(w.getHelpBlock());
                } else {
                    jsx3.ide.LOG.debug("doOpenApiHelp loading API help content component");
                    window.setTimeout(function() {
                        try {
                            dialog.getHelpBlockParent().loadAndCache('jsxplugin://tibco.uxcore.common/components/apihelp/apihelp.xml');
                        }
                        catch(failed) {
                            try {
                                tibco.uxcore.System.getServer().getCache().clearById(tibco.uxcore.System.getServer().resolveURI('jsxplugin://tibco.uxcore.common/components/apihelp/apihelp.xml'));
                            }
                            catch(innerfail) {
                                // do nothing
                            }
                        }
                    }, 0);
                }
            }

            if (w != null && w.isOpen())
                w.close();

            window.setTimeout(function() {
                dialog.focus();
            }, 0);
        }
    }

    /**
    * Internal function to open an html document in a separate window.  Used to open the HTML help.
    *
    * @private
    */
    system.openConsoleWindow = function(strURL, strPopupName, intWidth, intHeight, yesnoScrollbar,
                                      yesnoMenuBar, yesnoStatus, yesnoLocation, yesnoToolbar, intLeft, intTop) {

        if (this.CONSOLES == null) this.CONSOLES = {};

        if (strPopupName) {
            try {
                var console = this.CONSOLES[strPopupName];
                if (console && ! console.closed) {
                    // timeout because closing a menu focuses the GI app again
                    window.setTimeout(function() {
                        console.focus();
                    }, 10);
                    return;
                }
            } catch (e) {
            }
        }

        var strScrollbar = yesnoScrollbar ? "scrollbars=" + yesnoScrollbar + "," : "";
        var strMenuBar = yesnoMenuBar ? "menubar=" + yesnoMenuBar + "," : "";
        var strStatus = yesnoStatus ? "status=" + yesnoStatus + "," : "";
        var strLocation = yesnoLocation ? "location=" + yesnoLocation + "," : "";
        var strToolbar = yesnoToolbar ? "toolbar=" + yesnoToolbar + "," : "";
        var strWidth = intWidth ? "width=" + intWidth + "," : "";
        var strHeight = intHeight ? "height=" + intHeight + "," : "";
        var strLeft = intLeft ? "left=" + intLeft + "," : "";
        var strTop = intTop ? "top=" + intTop + "," : "";

        this.CONSOLES[strPopupName] = window.open(this.getServer().resolveURI(strURL), strPopupName, "directories=no,resizable=yes," +
                                                                                                     strScrollbar + strMenuBar + strStatus + strLocation + strToolbar + strWidth + strHeight + strLeft + strTop);
        window.setTimeout(function() {
            tibco.uxcore.System.CONSOLES[strPopupName].focus();
        }, 10);
        return this.CONSOLES[strPopupName];
    };

    /**
    * Checks to see if the current session has expired, and redirects the user to the login page if it has.
    *
    * @private
    */
    system._sessionExpired = function() {
        if (tibco.uxcore.System.getServer().getEnv("MODE")) {
            if (tibco.uxcore.util.ServiceHelper.sessionExpired()) {
                tibco.uxcore.util.Log.SERVICE.warn("tibco.uxcore.System#_sessionExpired: session is expired");
                tibco.uxcore.util.ServiceHelper.redirectToLoginPage();
                return true;
            }
        }
        return false;
    }

    /**
     * Show an alert dialog.  The signature and usage is identical to that in the standard GI alert function, but it gives
     * an alert dialog that uses the MatrixAdmin Visual Style.
     *
     * @param strTitle {String} the title of the dialog
     * @param strMessage {String} the message to display
     * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strOk {String} the text of the ok button, can be false to remove button from display
     * @param objParams {objParams} argument to configureAlert()
     */
    system.alert = function(strTitle, strMessage, fctOnOk, strOk, objParams) {
        var ret = null;
        if(tibco.uxcore.gui.Dialog) {
            ret = tibco.uxcore.gui.Dialog.alert(strTitle, strMessage, fctOnOk, strOk, objParams);
        }
        else {
            ret = this.getServer().alert(strTitle, strMessage, fctOnOk, strOk, objParams);
        }
        return ret;
    }

    /**
     * Show a confirm dialog.  The signature and usage is identical to that in the standard GI confirm function, but it gives
     * a confirm dialog that uses the MatrixAdmin Visual Style.
     *
     * @param strTitle {String} the title of the dialog
     * @param strMessage {String} the message to display
     * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param fctOnCancel {Function} callback function on pressing cancel button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strOk {String} the text of the ok button
     * @param strCancel {String} the text of the cancel button
     * @param intBtnDefault {int} the bold button that receives return key, 1:ok, 2:cancel, 3:no
     * @param fctOnNo {Function} callback function on pressing no button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strNo {String} the text of the no button
     * @param objParams {objParams} argument to configureAlert()
     */
    system.confirm = function(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, intBtnDefault,
                                        fctOnNo, strNo, objParams) {
        var ret = null;
        if(tibco.uxcore.gui.Dialog) {
            ret = tibco.uxcore.gui.Dialog.confirm(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, intBtnDefault, fctOnNo, strNo, objParams);
        }
        else {
            ret = this.getServer().confirm(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, intBtnDefault, fctOnNo, strNo, objParams);
        }
        return ret;
    }

    /**
     * Show a textbox input prompt dialog.  The signature and usage is identical to that in the standard GI prompt function, but it gives
     * a textbox input prompt dialog that uses the MatrixAdmin Visual Style.
     *
     * @param strTitle {String} the title of the dialog
     * @param strMessage {String} the message to display
     * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument, and the value of the text input as a second argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param fctOnCancel {Function} callback function on pressing cancel button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strOk {String} the text of the ok button
     * @param strCancel {String} the text of the cancel button
     * @param objParams {objParams} argument to configureAlert()
     */
    system.prompt = function(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, objParams) {
        var ret = null;
        if(tibco.uxcore.gui.Dialog) {
            ret = tibco.uxcore.gui.Dialog.prompt(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, objParams);
        }
        else {
            ret = this.getServer().prompt(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, objParams);
        }
        return ret;
    };

    /**
    * Utility function to apply a mask to a given block using a custom color. The mask can be hidden again via the usual
    * means (call the <code>hideMask</code> function directly on the block).
    *
    * @param block {jsx3.gui.Block} the block to apply the mask to.
    * @param strColor {String} the string representation of the color to use for the mask.  All tthe standard javascript
    *                          string representations of colors are supported (named colors, Hex code, etc.).
    */
    system.showMask = function(block, strColor) {
        block.showMask();
        var arr = block.getChildren();
        var child = arr[arr.length - 1];
        child.setDynamicProperty("jsxbgcolor", null);
        if(!strColor) {
            strColor = "#666666";
        }
        child.setBackgroundColor(strColor, true);
    }

   // todo: Remove system._setSystemLocale once this GI bug is fixed.
   /**
     * Internal function. Due to a bug in GI 3.5 the property bundles in addin will not load.
     * This function quarantines that the property bundlea jss\adminJSS.xml and jss\core.1.0.JSS.xml
     * are loaded properly.
     * @private
     */
//    system._setSystemLocale = function() {
//        system.pb = jsx3.app.PropsBundle.getProps(tibco.uxcore.ADDIN.resolveURI("jss/adminJSS.xml"), null, jsx3.getSystemCache());
//        jsx3.System.LJSS.addParent(system.pb);
//        system.pb2 = jsx3.app.PropsBundle.getProps(plugIn.resolveURI("jss/core.textJSS.xml"), null, jsx3.getSystemCache());
//        jsx3.System.LJSS.addParent(system.pb2);
//    }
//
//    system._setSystemLocale();


    // todo: Remove system._setLocale once this GI bug is fixed.
    /**
     * Internal function. Due to a bug in GI 3.5 the property bundles in addin will not load.
     * This function quarantines that the appropriate language of the property bundle
     * jss\adminJSS.xml and jss\core.1.0.JSS.xml are loaded properly.
     * Use this function only if the user can interact with the interface to change the system language to a preferred language
     *
     * @param newLocale {jsx3.util.Locale} new Locale
     */
//    system.setLocale = function(newLocale) {
//        if(system.pb2) {
//           jsx3.System.LJSS.removeParent(system.pb2);
//        }
//        system.pb2 = jsx3.app.PropsBundle.getProps(plugIn.resolveURI("jss/core.textJSS.xml"), newLocale, jsx3.getSystemCache());
//        jsx3.System.LJSS.addParent(system.pb2);
//    }

    system.updateVetoerActiveState = function(objIActionVeto, bActive) {
//        jsx3.log("Update active state: " + objIActionVeto + "=" + bActive);
        if(bActive) {
            system.activeVetoers[objIActionVeto.getId()] = objIActionVeto;
        }
        else {
            delete system.activeVetoers[objIActionVeto.getId()];
        }
//        jsx3.log("Active veto objects: " + this.formatArray(system.activeVetoers));
//        jsx3.log("***");
    }

    system.updateVetoerStatus = function(objIActionVeto, intStatus) {
//        jsx3.log("Update vetoer status: " + objIActionVeto + "=" + intStatus);
        system.vetoersStatus[objIActionVeto.getId()] = objIActionVeto.getStatus();
        if(intStatus == tibco.uxcore.gui.IActionVeto.STATUS_CANCEL) {
            this.flushEvents();
        }
//        jsx3.log("Veto States: " + this.formatArray(system.vetoersStatus));
//        jsx3.log("***");
    }

    system.registerActionVetoer = function(objIActionVeto) {
//        jsx3.log("Register Vetoer: " + objIActionVeto);
        if(objIActionVeto && objIActionVeto.instanceOf("tibco.uxcore.gui.IActionVeto")) {
            var strId = objIActionVeto.getId();
            system.vetoersById[strId] = objIActionVeto;
            system.vetoersStatus[strId] = objIActionVeto.getStatus();
            if(objIActionVeto.isActive()) {
                system.activeVetoers[strId] = objIActionVeto;
            }
        }
//        else {
//            jsx3.log(objIActionVeto + " is not an IActionVeto object - cannot register");
//        }
//        jsx3.log("Action Vetoers by Id: " + this.formatArray(system.vetoersById));
//        jsx3.log("Veto Status: " + this.formatArray(system.vetoersStatus));
//        jsx3.log("Active Veto objects: " + this.formatArray(system.activeVetoers));
//        jsx3.log("***");
    }

    system.unregisterActionVetoer = function(objIActionVeto) {
//        jsx3.log("Unregister Vetoer: " + objIActionVeto);
        if(objIActionVeto && objIActionVeto.instanceOf("tibco.uxcore.gui.IActionVeto")) {
            var strId = objIActionVeto.getId();
            delete system.vetoersById[strId];
            delete system.vetoersStatus[strId];
            delete system.activeVetoers[strId];
        }
//        else {
//            jsx3.log(objIActionVeto + " is not an IActionVeto object - cannot unregister");
//        }
//        jsx3.log("Action Vetoers by Id: " + this.formatArray(system.vetoersById));
//        jsx3.log("Veto Status: " + this.formatArray(system.vetoersStatus));
//        jsx3.log("Active Veto objects: " + this.formatArray(system.activeVetoers));
//        jsx3.log("***");
    }

    system.formatArray = function(arr) {
        var ret = "[";
        for(var name in arr) {
            if(typeof arr[name] != "function") {
            ret += (name + ":" + arr[name] + ",");
            }
        }
        if(ret.length > 1) {
            ret = ret.substring(0,ret.length - 1);
        }
        ret += "]";
        return ret;
    }

    system.getTriggerPeriod = function() {
        return this.triggerPeriod ? this.triggerPeriod : 50;
    }

    system.setTriggerPeriod = function(intPeriod) {
        this.triggerPeriod = intPeriod;
    }

    system.registerActionTrigger = function(objIActionTrigger) {
//        jsx3.log("Register Trigger: " + objIActionTrigger);
        if(objIActionTrigger && objIActionTrigger.instanceOf("tibco.uxcore.gui.IActionTrigger")) {
            var strId = objIActionTrigger.getId();
            system.triggers[strId] = objIActionTrigger;
        }
//        else {
//            jsx3.log(objIActionTrigger + " is not an IActionTrigger object - cannot register");
//        }
//        jsx3.log("Action Triggers: " + this.formatArray(system.triggers));
//        jsx3.log("***");
    }

    system.unregisterActionTrigger = function(objIActionTrigger) {
//        jsx3.log("Unregister Trigger: " + objIActionTrigger);
        if(objIActionTrigger && objIActionTrigger.instanceOf("tibco.uxcore.gui.IActionTrigger")) {
            objIActionTrigger.flushEvents();
            var strId = objIActionTrigger.getId();
            delete system.triggers[strId];
        }
//        else {
//            jsx3.log(objIActionTrigger + " is not an IActionTrigger object - cannot unregister");
//        }
//        jsx3.log("Action Triggers: " + this.formatArray(system.triggers));
//        jsx3.log("***");
    }

    system.flushEvents = function() {
        for(var name in  this.triggers) {
            var trigger = this.triggers[name];
            try {
                if(typeof trigger != "function") {
//                    jsx3.log("Flushing: " + trigger);
                    trigger.flushEvents();
                }
            }
            catch(ex) {
                jsx3.log("Error flushing events for " + trigger);
            }
        }
    }

    system.getActionVetoStatus = function() {
        var ret = tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE;
//        jsx3.log("Getting status from: " + this.formatArray(this.vetoersStatus));
        for(var name in this.vetoersStatus) {
            if(this.activeVetoers[name]) {
                var status = this.vetoersStatus[name];
                if(status && (status < ret) && (status > 0)) {
                    ret = status;
                }
                if(ret == tibco.uxcore.gui.IActionVeto.STATUS_CANCEL) {
                    break;
                }
            }
        }
//        jsx3.log("Returning status: " + ret);
        return ret;
    }

    system.test = function(objEVENT) {
      var server = tibco.uxcore.System.getServer();
      var form = server.getJSXByName("form");
      var child = jsx3.html.getJSXParent(objEVENT.srcElement());
//      jsx3.log("Testing target: " + child + " for parent: " + form);
      if(!this.isOrIsChildOf(child,form)) {
        form.setEditMode(false,true);
      }
    }

    system.isChildOf = function(child,parent) {
        var ret = false;
        var p = child.getParent();
        while(p) {
          if(p == parent) {
            ret = true;
            break;
          }
          p = p.getParent();
        }
        return ret;
    }

    system.isOrIsChildOf = function(child,parent) {
      if(child == parent) {
        return true;
      }
        return system.isChildOf(child,parent);
    }

    system.queueEvents = function() {
        return (typeof this.bQueueEvents != "undefined") ? this.bQueueEvents : true;
    }

    system.setQueueEventsEnabled = function(bQueue) {
        this.bQueueEvents = bQueue;
    }

    system.toggleEditModeOnLoseFocus = function() {
        return (typeof this.bToggleEdit != "undefined") ? this.bToggleEdit : true;
    }

    system.setToggleEditModeOnLoseFocus = function(bToggle) {
        this.bToggleEdit = bToggle;
    }

    system.confirmEditsOnLoseFocus = function() {
        return (typeof this.bConfirmEdits != "undefined") ? this.bConfirmEdits : true;
    }

    system.setConfirmEditsOnLoseFocus = function(bConfirm) {
        this.bConfirmEdits = bConfirm;
    }

    system.initialize = function() {
        this.vetoersById = [];
        this.vetoersStatus = [];
        this.activeVetoers = [];
        this.triggers = [];
        this.bToggleEdit = true;
        this.bConfirmEdits = true;
    }

});

        tibco.uxcore.System.initialize();

tibco.uxcore.getDynamicProperty = function(strPropName, strToken) {
    return tibco.uxcore.System.getServer().getDynamicProperty(strPropName, strToken);
}

jsx3.log("************ System loaded");
//if (jsx3.IDE) {
//    var menubar = jsx3.IDE.getJSXByName("jsxmenubar");
//    var cdfXML = "<data jsxid='jsxroot'><record config='true' jsxexecute='tibco.uxcore.System.doOpenApiHelp(false);' jsxid='2' jsxtext='Open API (in dialog)'/><record config='true' jsxexecute='tibco.uxcore.System.doOpenApiHelp(true);' jsxid='3' jsxtext='Open API (in separate window)'/><record config='true' jsxexecute='tibco.uxcore.System.openConsoleWindow(&quot;jsxaddin://user!UXCore/doc/html/api/index.html&quot;,&quot;jsxide_api&quot;,null,null,&quot;yes&quot;,&quot;yes&quot;,&quot;yes&quot;,&quot;yes&quot;,&quot;yes&quot;);' jsxid='4' jsxtext='...HTML version'/></data>";
//    var menu = new jsx3.gui.Menu("tibcoIDEMenu", "ActiveMatrix Plugin Framework Help");
//    menu.setXMLString(cdfXML);
//    menubar.setChild(menu);
//    menubar.paintChild(menu);
//}

        tibco.uxcore.System.getServer().getRootBlock().registerHotKey(function() {
          tibco.uxcore.System.alert("About UXCore","UXCore Version 1.2");
        },"V",true,true);
})(this);
}
catch(ex) {
    jsx3.log("ERROR: " + ex);
}