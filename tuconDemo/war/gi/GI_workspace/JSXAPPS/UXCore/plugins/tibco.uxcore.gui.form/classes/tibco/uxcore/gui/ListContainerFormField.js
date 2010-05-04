//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.ListContainerFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        formfield.init = function(strName) {
            this.jsxsuper(strName);
            if(!this.flexheight) {
                this.flexheight = jsx3.Boolean.FALSE;
            }
        }

        formfield.onAfterFormRepainted = function() {
            if(jsx3.CLASS_LOADER.IE && this.getUseFlexHeight() === jsx3.Boolean.TRUE) {
                var arr = this.getEditors();
                for(var i=0; i<arr.length; i++) {
                    arr[i].repaint();
                }
            }
        }

        formfield.onAfterAsssemble = function() {
            this.jsxsuper();
            if(!this.flexheight) {
                this.flexheight = jsx3.Boolean.FALSE;
            }
        }

        formfield.acceptFocus = function() {
            return false;
        }

        formfield.setUseFlexHeight = function(intFlex, bRepaint) {
            this.flexheight = intFlex;
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getUseFlexHeight = function() {
            return (this.flexheight && (this.flexheight === jsx3.Boolean.TRUE)) ? this.flexheight : jsx3.Boolean.FALSE;
        }

        formfield.validate = function() {
            var child = this.getChild(0);
            var valid = true;
            if(child) {
                try {
                    var result = child.validate(this, this.isrequired == jsx3.Boolean.TRUE);
                    var errorText = tibco.uxcore.getDynamicProperty("uxcore@forms@validation@field@defaultError", this.getTitleText() ? this.getTitleText() : tibco.uxcore.getDynamicProperty("@Validation Default Field Name"));
                    var type = typeof(result);
                    switch(type) {
                        case "boolean":
                            valid = result;
                            break;
                        case "number":
                            valid = (result == jsx3.Boolean.TRUE)
                            break;
                        case "string":
                            var lower = result.toLowerCase();
                            valid = (lower == "true");
                            if(!valid && (lower != "false")) {
                                errorText = result;
                            }
                            break;
                        default:
                    }
                    this.setErrorText(valid ? null : errorText, true);
                }
                catch(ex) {
                    jsx3.log(ex);
                    // do nothing...pass through
                }
            }
            return valid;
        }

        formfield.setChild = function(objChild, intPersist, strSourceURL, strNS) {
            intPersist = (objChild.getName() && (objChild.getName().indexOf("_mask") != -1)) ? intPersist : jsx3.app.Model.PERSISTEMBED;
            var ret = this.jsxsuper(objChild, intPersist, strSourceURL, strNS);
            if(ret) {
                try {
//                    objChild.unsubscribe(jsx3.gui.Interactive.SELECT,this);
//                    objChild.subscribe(jsx3.gui.Interactive.SELECT,this,this.onSelect);
                    objChild.jsxenabled = this.jsxenabled;
                    if(objChild.setEditMode) {
                        objChild.setEditMode(this.isEditMode(), false);
                    }
                } catch(ex) {tibco.uxcore.System.logException(ex);}
            }
            return ret;
        }

        formfield.onSelect = function() {
//            var val = this.getChild(0).getValue()
//            this.setProperty("fieldvalue", val);
        }

        formfield.setEditMode = function(bEditMode, bRepaint) {
            if(this.bEditable) {
                if(bEditMode != this.getArgs().editMode) {
                    this.getArgs().editMode = bEditMode;
                }
                if(bRepaint) {
                    this.repaint();
                }
                var child = this.getChild(0);
                if(child && child.setEditMode) {
                    child.setEditMode(bEditMode, bRepaint);
                }
            }
        }

        formfield.setValue = function(strValue) {
//            var ret = this.jsxsuper(strValue);
//            try {
//                this.getChild(0).setValue(strValue);
//            }
//            catch(ex) {}
//            return ret;
        }

        formfield.setHeight = function(strHeight,bRepaint) {
            var intHeight = strHeight ? parseInt('' + strHeight) : null;
            this.setProperty("jsxheight", intHeight);
            if(bRepaint) this.repaint();
        }

        formfield.getHeight = function() {
            return this.jsxheight;
        }

        formfield.onFocusGained = function(objEvent, blah) {
            this.jsxsuper(objEvent, blah);
            var panel = this.getAncestorOfType("tibco.uxcore.gui.FormPanel");
            if(panel) { panel.repaint(); }
        }

        formfield.onFocusLost = function(objEvent, blah) {
            var panel = this.getAncestorOfType("tibco.uxcore.gui.FormPanel");
            if(panel) { panel.repaint(); }
        }

        formfield.isDirty = function() {
            var isDirty = this.getArgs().isDirty;
            if(typeof isDirty == "undefined") {
                return this.updateDirtyState();
            }
            return isDirty;
        }

        formfield.updateDirtyState = function() {
            var args = this.getArgs();
            args.isDirty = false;
            var arr = this.getEditors();
            for(var i=0; i<arr.length; i++) {
                args.isDirty = arr[i].isDirty();
                if(args.isDirty) {
                    break;
                }
            }
            return args.isDirty;
        }

        formfield.childContentChanged = function(isDirty, type) {
            this.getArgs().isDirty = isDirty ? isDirty : this.updateDirtyState();
            this.notifyContentChanged(type);
            if(type != "revert") {
                this._notifyOfEdit(null,null);
            }
            if((type != "select") && (this.getUseFlexHeight() === jsx3.Boolean.TRUE)) {
                jsx3.sleep(function() {this.repaint();}, "repaint" + this.getId(), this);
            }
        }

        formfield.onResize = function() {
            this.repaint();
            this.jsxsuper();
        }

        formfield.recordEdited = function(isDirty, strRecordId, strAction) {
            this.getArgs().isDirty = isDirty ? isDirty : this.updateDirtyState();
            this.notifyContentChanged();
            if(((strAction == "added") || (strAction == "deleted")) && (this.getUseFlexHeight() == jsx3.Boolean.TRUE)) {
                jsx3.sleep(function() {this.repaint();}, "repaint" + this.getId(), this);
            }
        }

        formfield.getEditors = function() {
            return this.getChild(0) ? [this.getChild(0)] : [];
        }

        formfield.onikeydown = function(objEvent, objGUI) {
            this.getArgs().wastab = objEvent.keyCode==objEvent.DOM_VK_TAB;
            this.getArgs().wasshift = objEvent.shiftKey==1;
        }

        formfield.getFieldTemplate = function() {
            return '<var name="displayHeight">this.calculateHeight()</var>' +
                   '<div u:id="editField" style="height: {displayHeight}; margin: 1px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow: hidden;">' +
                       '<attach select="new jsx3.util.List(this.getChildren()).iterator()"><drawspace boxtype="\'box\'" position="\'relative\'" top="0" left="0" height="{displayHeight}" width="{formfieldwidth}" parentheight="{displayHeight}"/></attach>' +
                   '</div>';
//                   '<var name="recalctemp">this.recalcChildren()</var>';
        }

        formfield.calculateHeight = function() {
            var maxHeight = this.jsxheight ? this.jsxheight : 100;
            if(this.getUseFlexHeight() === jsx3.Boolean.TRUE) {
                var lc = this.getChild(0);
                if(lc) {
                    var view = lc.getView();
                    if(view) {
                        var rowHeight = parseInt(view.getRowHeight(jsx3.gui.Matrix.DEFAULT_ROW_HEIGHT));
                        if(rowHeight > 0) {
                            var filterHeight = parseInt(lc.getFilterPaneDisplay() ? tibco.uxcore.gui.ListContainer.complex.f_height : 0);
                            var actionBarHeight = parseInt(lc.getActionBarPaneDisplay() ? tibco.uxcore.gui.ListContainer.complex.a_height : 0);
                            var paginatorHeight = parseInt(lc.getPaginatorPaneDisplay() ? tibco.uxcore.gui.ListContainer.complex.p_height : 0);
                            var matrixHeaderHeight = parseInt(view.getHeaderHeight(jsx3.gui.Matrix.DEFAULT_HEADER_HEIGHT));
                            var baseHeight = filterHeight + actionBarHeight + paginatorHeight + matrixHeaderHeight + 2;
                            var rowsHeight = (view.getXML().selectNodes("//record").size()) * rowHeight;
                            var height = baseHeight + rowsHeight;
                            if(height > maxHeight) {
                                view.setSuppressVScroller(0,true);
                                return "" + maxHeight;
                            }
                            view.setSuppressVScroller(1,true);
                            return "" + height;
                        }
                    }
                }
            }
            else {
                var lc = this.getChild(0);
                if(lc) {
                    var view = lc.getView();
                    if(view) {
                        if(view.getSuppressVScroller && view.getSuppressVScroller()) {
                            view.setSuppressVScroller(0,true);
                        }
                    }
                }
            }
            return "" + maxHeight;
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.compileTemplate();

    }
);