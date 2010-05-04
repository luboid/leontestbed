//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.FormColumn", tibco.uxcore.gui.GenericFormContainer, [tibco.uxcore.gui.IFocusTarget],
    function(FORMCOLUMN, formcolumn) {

        formcolumn.init = function(strName) {
            this.jsxsuper(strName);
        }

        formcolumn.clearFocus = function() {
            delete this.getArgs().focusIndex;
            var arr = this.getFocusTargets();
            for(var i=0; i<arr.length; i++) {
                arr[i].clearFocus();
            }
        }

        formcolumn.onSetChild = function(objChild) {
            var ret = objChild.instanceOf("tibco.uxcore.gui.FormRow");
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only Form Rows are valid children of Form Columns");
                //tibco.uxcore.System.alert("Building Error", "Only Form Rows are valid children of Form Columns")
            }
            if(ret) {
                try {
                    objChild.setEditMode(this.isEditMode());
                } catch(ex) {tibco.uxcore.System.logException(ex);}
            }
            return ret;
        }

        formcolumn.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            if(!objParent.instanceOf("tibco.uxcore.gui.FormPanel")) {
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only Form Panels are valid parents of Form Columns");
                //tibco.uxcore.System.alert("Building Error", "Only Form Panels are valid parents of Form Columns")
            }
            return ret;
        }

        formcolumn.getMinWidth = function() {
            return this.getArgs().minChildWidth ? (this.getArgs().minChildWidth) : 10;
        }

        FORMCOLUMN.templateXML = tibco.uxcore.System.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.form/templates/formcolumn.xml","formColumnTemplate","xml").toString();
        if(jsx3.CLASS_LOADER.getType() == "fx2") {
            FORMCOLUMN.templateXML = FORMCOLUMN.templateXML.replace(/inlinebox/g, "div");
        }
        jsx3.gui.Template.compile(FORMCOLUMN.templateXML,FORMCOLUMN.jsxclass);
    }
);