jsx3.lang.Class.defineClass("tibco.uxcore.Help", null, null, function(help) {


    help.registerHotKeyToServer = function() {
        help.hotkey = tibco.uxcore.System.getServer().registerHotKey(help._onHelpKey, "F2", null, true, null)
    }

    help.invoke = function (objThis, arrArgs) {
        help.hotkey.invoke(objThis, arrArgs)

    }

    help._onHelpKey = function(objEvent) {
        var objJSX = jsx3.html.getJSXParent(objEvent.srcElement());
        tibco.uxcore.util.Log.SYSTEM.trace("tibco.uxcore.Help#_onHelpKey objJSX  = " + objJSX)
        if (!objJSX) objJSX = tibco.uxcore.System.getServer().getBodyBlock();
        if (objJSX) help.onHelp(objJSX);
    };

    help.onHelp = function(objJSX, pluginId, helpId) {
        if(objJSX && !pluginId) {
            pluginId = objJSX.pluginId;
        }
        while (objJSX && !helpId) {
            helpId = objJSX.helpId;
            objJSX = objJSX.getParent();
        }
        tibco.uxcore.util.Log.SYSTEM.trace("tibco.uxcore.Help#onHelp objJSX = " + objJSX + " helpId  = " + helpId + " pluginId = " + pluginId)
        if (!helpId) {
            helpId = "ID_TOP";
        }
        help.onContextHelp({subject:tibco.uxcore.System.HELP, helpId:helpId, pluginId:pluginId, model:objJSX});
        return Boolean(helpId);
    };

    help.onContextHelp = function(objEvent) {
        var pluginId = objEvent.pluginId;
        var helpId = objEvent.helpId
        tibco.uxcore.util.Log.SYSTEM.trace("tibco.uxcore.Help#onContextHelp helpId= " + helpId + " | pluginId = " + pluginId);
        if (!pluginId) {
            tibco.uxcore.util.Log.SYSTEM.warn("Missing pluginId for " + helpId + ". Falling back to Matrix Admin.");
            pluginId = "tibco.uxcore.common"
        }
        //get the context first from context root
        var contextpath = "jsxplugin://" + pluginId + "/help/context.xml";
        tibco.uxcore.util.Log.SYSTEM.trace("tibco.uxcore.Help#onContextHelp contextpath=" + contextpath);
        var xml = new jsx3.xml.CDF.Document().load(tibco.uxcore.System.getServer().resolveURI(contextpath));


        var rec = null;
        // help doc still not ready or runing from file system
        //var key = tibco.uxcore.System.getServer().getLocale();
        if (!xml.hasError()) {
            // get pluginId+helpId
            rec = xml.getRecord(helpId);
            if (!rec) {
                // get UXCore+helpId
                tibco.uxcore.util.Log.SYSTEM.warn("No context help entry for " + helpId + ". Falling back to UXCore.");
                var prevPluginId = pluginId;
                pluginId = "tibco.uxcore.common";
                contextpath = "jsxplugin://" + pluginId + "/help/context.xml";
                xml = new jsx3.xml.CDF.Document().load(tibco.uxcore.System.getServer().resolveURI(contextpath));
                if (!xml.hasError()) {
                    rec = xml.getRecord(helpId);
                }
                if(!rec) {
                    // get pluginId+default
                    pluginId = prevPluginId;
                    tibco.uxcore.util.Log.SYSTEM.warn("No context help entry for " + helpId + "in UXCore. Falling back to default helpId in pluginID " + pluginId+ ".");
                    contextpath = "jsxplugin://" + pluginId + "/help/context.xml";
                    xml = new jsx3.xml.CDF.Document().load(tibco.uxcore.System.getServer().resolveURI(contextpath));
                    if (!xml.hasError()) {
                        rec = xml.getRecord("ID_TOP");
                    }
                    if(!rec) {
                        // get UXCore+default
                        tibco.uxcore.util.Log.SYSTEM.warn("No default help entry for pluginId " + pluginId + ". Falling back to UXCore to find helpId" + helpId + ".");
                        pluginId = "tibco.uxcore.common";
                        contextpath = "jsxplugin://" + pluginId + "/help/context.xml";
                        xml = new jsx3.xml.CDF.Document().load(tibco.uxcore.System.getServer().resolveURI(contextpath));
                        if(!xml.hasError()) {
                            rec = xml.getRecord("ID_TOP");
                        }
                    }
                }
            }
        }
        else {
            tibco.uxcore.util.Log.SYSTEM.warn("No context help for pluginId " + pluginId + ". Falling back to UXCore.");
            pluginId = "tibco.uxcore.common";
            contextpath = "jsxplugin://" + pluginId + "/help/context.xml";
            xml = new jsx3.xml.CDF.Document().load(tibco.uxcore.System.getServer().resolveURI(contextpath));
            if (!xml.hasError()) {
                rec = xml.getRecord(helpId);
            }
            if(!rec) {
                tibco.uxcore.util.Log.SYSTEM.warn("No UXCore context help entry for " + helpId + ". Falling back to default helpId.");
                rec = xml.getRecord("ID_TOP");
            }
        }
        if (rec) {
            var abspath =  tibco.uxcore.System.getServer().resolveURI("jsxplugin://" + pluginId + "/help/" + rec.jsxtext)
            tibco.uxcore.util.Log.SYSTEM.trace("tibco.uxcore.Help#onContextHelp path to context help= " + abspath);
            var w = window.open(abspath, "jsxidectxhelp");
            if (!w) {
                tibco.uxcore.util.Log.SYSTEM.warn("A pop-up blocker may have prevented context help from opening.");
            }
        }
        else {
            tibco.uxcore.util.Log.SYSTEM.info(xml.getError());
            tibco.uxcore.System.alert(tibco.uxcore.System.getServer().getDynamicProperty("@Help Alert Dialog Title"),
                    tibco.uxcore.System.getServer().getDynamicProperty("@Help Alert Dialog Label")+"\n contextpath = " +contextpath);
        }
    };
    help.registerHotKeyToServer();
})
