//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.RadioButtonFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        formfield.columns = 3;

        formfield.init = function(strName) {
            this.jsxsuper(strName);
            this.getArgs().groupid = jsx3.xml.CDF.getKey();
        }

        formfield.onAfterAssemble = function() {
            this.jsxsuper();
            delete this.groupid;
            this.getArgs().groupid = jsx3.xml.CDF.getKey();
        }

        formfield.acceptFocus = function() {
            return false;
        }

        formfield.onAfterPaint = function() {
//                jsx3.log("After paint");
            this.jsxsuper();
            this._updateFieldStyles();
        }

        formfield.getGroupId = function() {
            if(!this.getArgs().groupid) {
                this.getArgs().groupid = jsx3.xml.CDF.getKey();
            }
            return this.getArgs().groupid;
        }

        formfield.initChild = function(objChild) {
            try {
                objChild.unsubscribe(jsx3.gui.Interactive.SELECT,this);
                objChild.subscribe(jsx3.gui.Interactive.SELECT,this,this.onSelect);
                objChild.setMargin(null);
                objChild.setSelected(jsx3.gui.RadioButton.UNSELECTED);
                objChild.setGroupName(this.getGroupId() + "_RadioButtonGroup");
                objChild.setCSSOverride("float:left; position: relative");
                this.updateEnabledState();
                var me = this;
                setTimeout(function() {
                    me.repaint();
                },0);
            } catch(ex) {tibco.uxcore.System.logException(ex);}
        }

        formfield.insertBefore = function(objMoveChild,objPrecedeChild,bRepaint) {
            var ret = this.jsxsuper(objMoveChild,objPrecedeChild,bRepaint);
            if(ret) {
                this.initChild(objMoveChild);
            }
            return ret;
        }

        formfield.clearChild = function(objChild) {
        }

        formfield.adoptChild = function(objChild, bRepaint, bForce) {
            var ret = this.jsxsuper(objChild, bRepaint, bForce);
            this.initChild(objChild);
            return ret;
        }

        formfield.setChild = function(objChild, intPersist, strSourceURL, strNS) {
            var ret = this.jsxsuper(objChild, jsx3.app.Model.PERSISTEMBED, strSourceURL, strNS);
            if(ret) {
                this.initChild(objChild);
            }
            return ret;
        }

        formfield.onSelect = function() {
            var me = this;
            setTimeout(function() {
                var oldVal = me.getValue();
                var val = me.getChild(0).getGroupValue();
                var changed = !me.valuesEqual(oldVal,val);
                me.getArgs().fieldvalue = val;
//                me.setProperty("fieldvalue", val);
                if(changed) {
                    me.notifyContentChanged();
                    me._notifyOfEdit(oldVal,val);
                    me._updateFieldStyles();
                }
            },0);
        }

        formfield._updateFieldStyles = function() {
            var GUIObjs = this.getEditors();
            for(var i=0; i<GUIObjs.length; i++) {
                var gui = GUIObjs[i];
                gui.setColor(gui.getSelected() ? this._getTextColor() : "#000000",true);
            }
        }


        formfield.setColumnCount = function(intColumnCount, bRepaint) {
            this.columns = intColumnCount ? intColumnCount : 3;
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getColumnsCount = function() {
            return this.columns;
        }

        formfield.setEditMode = function(bEditMode, bRepaint) {
            if(this.bEditable) {
                if(bEditMode != this.getArgs().editMode) {
                    this.getArgs().editMode = bEditMode;
                }
            }
            this.updateEnabledState(bRepaint);
        }

        formfield.setEditable = function(bEditable) {
            this.jsxsuper(bEditable);
            this.updateEnabledState(true);
        }

        formfield.updateEnabledState = function(bRepaint) {
            var enable = this.bEditable && this.getArgs().editMode && (this.jsxenabled == tibco.uxcore.gui.FormField.STATEENABLED);
            var children = this.getChildren();
            for(var i=0; i<children.length; i++) {
                var setto = enable ? jsx3.gui.Form.STATEENABLED : jsx3.gui.Form.STATEDISABLED;
                children[i].setEnabled(setto);
            }
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.setValue = function(strValue, bNoValidate) {
            this.getArgs().fieldvalue = strValue;
//            this.setProperty("fieldvalue", strValue);
            var child = this.getChild(0);
            child.setGroupValue(strValue);
            if(!bNoValidate) {
                this.validate();
            }
            this.repaint();
            return this;
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

        formfield.getEditors = function() {
            return this.getChildren();
        }

        formfield.onikeydown = function(objEvent, objGUI) {
            this.getArgs().wastab = objEvent.keyCode==objEvent.DOM_VK_TAB;
            this.getArgs().wasshift = objEvent.shiftKey==1;
        }

        formfield.setEnabled = function(intEnabled, bRepaint) {
            this.setProperty("jsxenabled", intEnabled);
            this.updateEnabledState(bRepaint);
        }

        formfield.getValueEscaped = function() {
            var text = "";
            if(this.getArgs().fieldvalue) {
                var children = this.getChildren();
                for(var i=0; i<children.length; i++) {
                    var child = this.getChild(i);
                    if(child.getValue() == this.getArgs().fieldvalue) {
                        text = child.getText();
                        break;
                    }
                }
            }
            return this.getArgs().fieldvalue ? (jsx3.util.strEscapeHTML(text)) : null;
        }

        formfield.getFieldTemplate = function() {
            return '<var name="displayWidth">this.getDrawspace().width ? this.getDrawspace().width : 0</var><var name="numColumns">(this.getChildren().length &lt; this.columns) ? this.getChildren().length : this.columns</var><var name="childWidth">Math.floor(displayWidth / numColumns)</var><div u:protected="true" style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; display:{viewFieldDisplay}; overflow-x: hidden;"><span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span></div><div u:protected="true" u:id="editField" style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: 100%; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: #000000; display:{editFieldDisplay}"><attach select="new jsx3.util.List(this.getChildren()).iterator()"><drawspace boxtype="\'box\'" position="\'relative\'" top="0" left="0" width="{childWidth}"/></attach></div>';
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.compileTemplate();

    }
);