//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.FormRow", tibco.uxcore.gui.GenericFormContainer, [tibco.uxcore.gui.IFocusTarget],
    function(FORMROW, formrow) {

        FORMROW.ALIGNTOP = 0;
        FORMROW.ALIGNBASELINE = 1;
        FORMROW.ALIGNBOTTOM = 2;

        formrow.jsxfieldalign = FORMROW.ALIGN_TOP;

        formrow.init = function(strName) {
            this.jsxsuper(strName);
            if(jsx3.CLASS_LOADER.IE) {
                this.doFloat = "";
            }
            else {
                this.doFloat = "left";
            }
        }

        formrow.onAfterAssemble = function() {
            this.jsxsuper();
            delete this.getArgs()._jsxtimer;
            if(jsx3.CLASS_LOADER.IE) {
                this.doFloat = "";
            }
            else {
                this.doFloat = "left";
            }
        }

        formrow.clearFocus = function() {
            delete this.getArgs().focusIndex;
            var arr = this.getFocusTargets();
            for(var i=0; i<arr.length; i++) {
                arr[i].clearFocus();
            }
        }

        formrow.onSetChild = function(objChild) {
            var ret = objChild.instanceOf("tibco.uxcore.gui.FormField");
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only Form Fields are valid children of Form Rows");
                //tibco.uxcore.System.alert("Building Error", "Only Form Fields are valid children of Form Rows")
            }
            if(ret) {
                try {
                    objChild.setEditMode(this.isEditMode());
                } catch(ex) {tibco.uxcore.System.logException(ex);}
            }
            return ret;
        }

        formrow.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            if(!objParent.instanceOf("tibco.uxcore.gui.FormColumn")) {
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only Form Columns are valid parents of Form Rows");
                //tibco.uxcore.System.alert("Building Error", "Only Form Columns are valid parents of Form Row")
            }
            return ret;
        }

        formrow.getMinWidth = function() {
            return this.getArgs().minChildWidth ? (this.getArgs().minChildWidth * this.getFormChildren().length) + (this.getChildSpacing() * (this.getFormChildren().length - 1)) : 10;
        }

        formrow.getChildSpacing = function() {
            return 5;
        }

        formrow.onAfterPaint = function() {
            this.jsxsuper();
            this.adjustAlignment();
        }

        formrow.onResize = function() {
            this.adjustAlignment();
//            setTimeout(jsx3.$F(function(){this.adjustAlignment();}).bind(this), 10);
        }

        formrow.setFieldAlign = function(align, bRepaint) {
            this.jsxfieldalign = align;
            if(bRepaint) {
                this.repaint()
            } else {
                this.adjustAlignment();
            }
        }

        formrow.getFieldAlign = function() {
            return this.jsxfieldalign;
        }

        formrow.adjustAlignment = function() {
            //jsx3.log("timer" + this.getArgs()._jsxtimer);
            if(this.getArgs()._jsxtimer) {
                window.clearTimeout(this.getArgs()._jsxtimer);
                delete this.getArgs()._jsxtimer;
            }
            this.getArgs()._jsxtimer = setTimeout(jsx3.$F(this._adjustAlignment).bind(this), 10);
        }

        formrow._adjustAlignment = function() {
            var children = this.getChildren();
            if(this.jsxfieldalign == FORMROW.ALIGNBOTTOM) {
                //jsx3.log("Enter... adjustAlignment..." );
                var rowH = this.getAbsolutePosition().H;
                //jsx3.log("rowH" + rowH);

                for(var i=0; i< children.length; i++) {
                    var childH = children[i].getAbsolutePosition().H;
                    children[i].getRendered().style.top = rowH - childH;
                    children[i].getArgs()._jsxdyntop = rowH - childH;
                    jsx3.log(children[i] + "..." + childH);
                }
            } else if(this.jsxfieldalign == FORMROW.ALIGNBASELINE) {
                var baselineH = 0;
                for(var i=0; i< children.length; i++) {
                    var childBaselineH = children[i].getBaseline();
                    if(childBaselineH > baselineH) {
                        baselineH = childBaselineH;
                    }
                }
                jsx3.log("baselineH: " + baselineH);
                for(var i=0; i< children.length; i++) {
                    var childH = children[i].getAbsolutePosition().H;
                    var childBaselineH = children[i].getBaseline();
                    //jsx3.log("top : " + children[i].getRendered().style.top);
                    children[i].getRendered().style.top = baselineH - childBaselineH;
                    children[i].getArgs()._jsxdyntop = baselineH - childBaselineH;
                    jsx3.log(children[i] + "  childBaselineH: " + childBaselineH);
                }
            }
        }

        FORMROW.templateXML = tibco.uxcore.System.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.form/templates/formrow.xml","formRowTemplate","xml").toString();
        if(jsx3.CLASS_LOADER.getType() == "fx2") {
            FORMROW.templateXML = FORMROW.templateXML.replace(/inlinebox/g, "div");
        }
        jsx3.gui.Template.compile(FORMROW.templateXML,FORMROW.jsxclass);
    }
);