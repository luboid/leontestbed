(function(plugIn) {

    //jsx3.require("jsx3.gui.Template");
    jsx3.lang.Class.defineClass("tibco.uxcore.gui.Splitline", jsx3.gui.Template.Block, null,
            function(SPLITLINE, splitline) {
                
                splitline.init = function(strName) {
                    this.jsxsuper(strName);
                };

                splitline.onSetParent = function(objParent) {
                    this.compileTemplate()
                    return true
                }

                splitline.onSetChild = function(objChild) {
                    jsx3.log("Splitline can not contain the child");
                    return false;
                }

                splitline.compileTemplate = function() {
                    var clazz = eval(this.getClass().getName());
                    if (!clazz.templateXML) {
                        clazz.templateXML = plugIn.getServer().loadInclude(plugIn.getServer().resolveURI("jsxplugin://tibco.uxcore.gui.desktop/templates/splitline.xml"), "splitline", "xml").toString();
                        jsx3.gui.Template.compile(clazz.templateXML, clazz.jsxclass);
                    }
                }
            }

            );
})(this);
