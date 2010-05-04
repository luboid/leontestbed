//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.TitleRow", tibco.uxcore.gui.FormRow, null,
    function(FORMROW, formrow) {

        formrow.init = function(strName) {
            this.jsxsuper(strName);
        }

        formrow.onAfterAssemble = function() {
            this.jsxsuper();
        }

        formrow.acceptFocus = function() {
            return false;
        }

        formrow.setTitleText = function(strText, bRepaint) {
            this.setProperty("titletext", strText);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        formrow.getTitleText = function() {
            return this.titletext;
        }

        formrow.clearFocus = function() {
        }

        formrow.onSetChild = function(objChild) {
            return false;
        }

        formrow.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            if(!objParent.instanceOf("tibco.uxcore.gui.FormColumn")) {
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only Form Columns are valid parents of Title Rows");
                //tibco.uxcore.System.alert("Building Error", "Only Form Columns are valid parents of Form Row")
            }
            return ret;
        }

        formrow.getMinWidth = function() {
            return 0;
        }

        formrow.getChildSpacing = function() {
            return 5;
        }

        formrow.onAfterPaint = function() {
            this.jsxsuper();
        }

        FORMROW.templateXML = tibco.uxcore.System.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.form/templates/titlerow.xml","titleRowTemplate","xml").toString();
        if(jsx3.CLASS_LOADER.getType() == "fx2") {
            FORMROW.templateXML = FORMROW.templateXML.replace(/inlinebox/g, "div");
        }
        jsx3.gui.Template.compile(FORMROW.templateXML,FORMROW.jsxclass);
    }
);