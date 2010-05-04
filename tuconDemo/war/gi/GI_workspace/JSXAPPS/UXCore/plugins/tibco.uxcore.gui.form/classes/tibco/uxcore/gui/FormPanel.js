//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.FormPanel", tibco.uxcore.gui.GenericFormContainer, [tibco.uxcore.gui.IFocusTarget],
    function(FORMPANEL, formpanel) {

        formpanel.init = function(strName) {
            this.jsxsuper(strName);
        }


        formpanel.clearFocus = function() {
            delete this.getArgs().focusIndex;
            var arr = this.getFocusTargets();
            for(var i=0; i<arr.length; i++) {
                arr[i].clearFocus();
            }
        }

        formpanel.onSetChild = function(objChild) {
            var ret = objChild.instanceOf("tibco.uxcore.gui.FormColumn");
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only Form Columns are valid children of Form Panels");
                //tibco.uxcore.System.alert("Building Error", "Only Form Columns are valid children of Form Panels")
            }
            if(ret) {
                try {
                    objChild.setEditMode(this.isEditMode());
                } catch(ex) {tibco.uxcore.System.logException(ex);}
            }
            return ret;
        }

        formpanel.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            if(!objParent.instanceOf("tibco.uxcore.gui.Form")) {
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only Forms are valid parents of Form Panels");
                //tibco.uxcore.System.alert("Building Error", "Only Forms are valid parents of Form Panels")
            }
            return ret;
        }

        formpanel.allowTitle = function() {
            return this.getParent().getLayout() === tibco.uxcore.gui.Form.STACKED_LAYOUT;
        }

        formpanel.setTitleText = function(strText, bRepaint) {
            this.setProperty("titletext", strText);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        formpanel.getTitleText = function() {
            return this.titletext;
        }

        formpanel.setLiveSave = function(intLive, bRepaint) {
            this.setProperty("livesave", intLive);
            return this;
        }

        formpanel.isLiveSave = function() {
            return this.livesave ? this.livesave : jsx3.Boolean.FALSE;
        }

        formpanel.setOpen = function(intOpen, bRepaint) {
            this.setProperty("jsxopen", intOpen);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        formpanel.isOpen = function() {
            if(this.jsxopen == null) {
                this.jsxopen = jsx3.Boolean.TRUE;
            }
            if(!this.titletext) {
                return jsx3.Boolean.TRUE;
            }
            return this.jsxopen;
        }

        formpanel.toggleDisplay = function() {
            if(this.jsxopen == null) {
                this.jsxopen = jsx3.Boolean.TRUE;
            }
            if(this.jsxopen == jsx3.Boolean.FALSE) {
                this.setOpen(jsx3.Boolean.TRUE);
                this.getRenderedBox("handle").src = tibco.uxcore.System.getServer().resolveURI('jsxplugin://tibco.uxcore.common/images/matrix/arrowDown.gif');
                this.getRenderedBox("contentpane").style.display = '';
            }
            else if(this.titletext){
                this.setOpen(jsx3.Boolean.FALSE);
                this.getRenderedBox("handle").src = tibco.uxcore.System.getServer().resolveURI('jsxplugin://tibco.uxcore.common/images/matrix/arrow.gif');
                this.getRenderedBox("contentpane").style.display = 'none';
            }
        }

        formpanel.getChildSpacing = function() {
            return 40;
        }

        FORMPANEL.templateXML = tibco.uxcore.System.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.form/templates/formpanel.xml","formPanelTemplate","xml").toString();
        if(jsx3.CLASS_LOADER.getType() == "fx2") {
            FORMPANEL.templateXML = FORMPANEL.templateXML.replace(/inlinebox/g, "div");
        }
        jsx3.gui.Template.compile(FORMPANEL.templateXML,FORMPANEL.jsxclass);
    }
);