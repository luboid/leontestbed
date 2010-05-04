/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn) {

if(jsx3.ide) {
    jsx3.ide.loadTemplateCatalog("prop", "jsxplugin://tibco.uxcore.gui.listcontainer/properties/catalog.xml",plugIn);
    jsx3.ide.loadTemplateCatalog("event", "jsxplugin://tibco.uxcore.gui.listcontainer/events/catalog.xml",plugIn);
}

//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.AbstractBlock", jsx3.gui.Template.Block, [],
    function(KLASS, instance) {
        
        KLASS.TEMPLATE_PATH = "jsxplugin://tibco.uxcore.gui.listcontainer/classes/templates/";
        
        /**
         * Get a logger instance with class name as identity
         */
        instance.getLogger = function() {
            return jsx3.util.Logger.getLogger(this.getClass().getName());
        };
        
        /**
         * Load template from external xml and inject corresponding getTemplateXML function into final class.
         * @param templateName {String} name of template file to be loaded.
         * @return {String} content string of template xml file.
         */
        instance.loadTemplate = function(templateName) {
            var server = plugIn.getServer();   
            var klass = this.getClass().getConstructor();
            var TEMPLATE_XML = server.loadInclude(KLASS.TEMPLATE_PATH + templateName + ".xml", templateName, "xml").toString();
            jsx3.gui.Template.compile(TEMPLATE_XML, this.getClass());
            this.getTemplateXML = function() {
                return TEMPLATE_XML;
            };
            return TEMPLATE_XML;
            /*
            //Lazy template compile cause some unresolvable issue. 
            this.getTemplateXML = function() {
                var server = plugIn.getServer();   
                var klass = this.getClass().getConstructor();
                klass.TEMPLATE_XML = server.loadInclude(KLASS.TEMPLATE_PATH + templateName + ".xml", templateName, "xml").toString();
                //jsx3.gui.Template.compile(klass.TEMPLATE_XML, this.getClass());
                return klass.TEMPLATE_XML;
            };
            */
        };
        
       /**
        * Returns the value of the dynamic property @strPropName
        * @param strPropName {String} id for this dynamic property among all properties
        * @param strToken {String...} if present tokens such as {0}, {1}, {n} will be replaced with the nth element of this vararg array
        * @return {String} value of the property
        */
        instance.getDynamicValue = function(strPropName, strToken) {
            return plugIn.getServer().getDynamicProperty(strPropName, strToken);
        };
        
        /**
         * Get the real path of address setted in dynamic property
         * @param strPropName {String} dynamic property name
         */
        instance.getDynamicURL = function(strPropName) {
            var value = plugIn.getServer().getDynamicProperty(strPropName);
            return value ? plugIn.getServer().resolveURI(value) : null;
        };

        /**
         * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
         * @param objJSX {Object} 
         * @param objSetting {Array} properties list
         * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
         */
        instance.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
            };
            return objJSX;
        };      
        
    }
);

})(this);
