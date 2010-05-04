//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.CheckBoxFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        FORMFIELD.CONTENT = 1;
        FORMFIELD.TRUE_FALSE = 2;
        FORMFIELD.TRUE = 3;
        FORMFIELD.YES_NO = 4;
        FORMFIELD.YES = 5;

        formfield.init = function(strName) {
            this.jsxsuper(strName);
            this.getArgs().fieldvalue = "false";
            this.getArgs().originalValue = "false";
        }

        formfield.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            this.getArgs().fieldvalue = "false";
            this.getArgs().originalValue = "false";
            return ret;
        }

        formfield.onAfterAssemble = function() {
            this.jsxsuper();
            this.getArgs().fieldvalue = "false";
            this.getArgs().originalValue = "false";
        }

        formfield.getEditors = function() {
            return [this.getRenderedBox("checkboxField")];
        }

        formfield.setCheckboxContent = function(str, bRepaint) {
            this.checkboxcontent = str;
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.setViewModeLabeling = function(intMode, bRepaint) {
            if((intMode == FORMFIELD.CONTENT) ||
                    (intMode == FORMFIELD.TRUE_FALSE) ||
                    (intMode == FORMFIELD.YES) ||
                    (intMode == FORMFIELD.YES_NO)) {
                this.viewMode = intMode;
            }
            else {
                this.viewMode = FORMFIELD.TRUE;
            }
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getViewModeLabeling = function() {
            return this.viewMode ? this.viewMode : FORMFIELD.TRUE;
        }

        formfield.getValueEscaped = function() {
//            jsx3.log("get val escaped");
            var vm = this.getViewModeLabeling();
//            jsx3.log("vm: " + vm);
            var val;
            if(vm == FORMFIELD.CONTENT) {
                val = (this.getArgs().fieldvalue == "true") ? this.getCheckboxContent() : null;
//                jsx3.log("val 1: " + val);
            }
            else {
                val = this.getArgs().fieldvalue;
//                jsx3.log("val 2: " + val);
                if(vm == FORMFIELD.YES) {
                    val = (!val || (val == "false")) ? null : "Yes";
//                    jsx3.log("val 3: " + val);
                }
                else if(vm == FORMFIELD.YES_NO) {
                    val = (!val || (val == "false")) ? "No" : "Yes";
//                    jsx3.log("val 4: " + val);
                }
                else if(vm == FORMFIELD.TRUE_FALSE) {
                    val = (!val || (val == "false")) ? "False" : "True";
//                    jsx3.log("val 5: " + val);
                }
                else {
                    val = (!val || (val == "false")) ? null : "True";
//                    jsx3.log("val 6: " + val);
                }
            }
            return (val) ? jsx3.util.strEscapeHTML(val) : null;
        }

        formfield.getCheckboxContent = function() {
            return this.checkboxcontent || "[Untitled Checkbox]";
        }

        formfield.getFieldTemplate = function() {
            return '<var name="myMargin">((showtitle == \'none\') &amp;&amp; (showinstructions == \'none\') &amp;&amp; (showexample == \'none\') &amp;&amp; (showerror == \'none\')) ? \'0px 0px 0px 0px\' : \'5px 0px 0px 0px\'</var><var name="checkBoxString" triggers="checkboxcontent">this.getCheckboxContent()</var><div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow-x: hidden;"><span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span><span>&amp;nbsp;</span></div><div u:id="editField" id="editField" style="display: {editFieldDisplay}; margin: {myMargin}; padding: 0px 0px 0px 0px; position: relative; width: 100%; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; color: {fieldtextcolor};"><div u:id="focusField" style="padding: 0px 0px 0px 0px;"><input u:id="checkboxField" id="checkboxField" type="checkbox" style="vertical-align: middle; color: {fieldtextcolor}; font-family: Arial; font-size: 11px; font-weight: normal;" onclick="{onchclick1}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"><text>{checkBoxString}</text></input></div></div>';
        }

        formfield.onFocusLost = function(objEvent, objGUI) {
            this.updateValue();
            try {
                this.getRenderedBox("focusField").style.border = "";
            } catch(ex){
                tibco.uxcore.System.logException(ex);
            }
        }

        formfield.onFocusGained = function(objEvent, objGUI) {
            try {
                this.applyDOMBorder(this.getRenderedBox("focusField"),tibco.uxcore.getDynamicProperty("uxcore@formrow@activeBorder"));
            } catch(ex){
                tibco.uxcore.System.logException(ex);
            }
        }

        formfield.oniblur = function(objEvent, objGUI) {
            if(this.getArgs().ignoreBlur) {
                delete this.getArgs().ignoreBlur;
                return;
            }
            try{
                this.onFocusLost(objEvent, objGUI);
            }
            catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
            var parent = this.getFocusManager();
            if(this.getArgs().wastab) {
                this.getArgs().wastab = false;
                if(this.getArgs().wasshift) {
                    if(parent) {
                        parent.focusPreviousChild();
//                        parent.focusLost(this);
                    }
                }
                else {
                    if(parent) {
                        parent.focusNextChild();
//                        parent.focusLost(this);
                    }
                    this.getArgs().wasshift = false;
                }
            }
            else {delete this.getArgs().focusIndex;}
            return true;
        }

        formfield.onAfterPaint = function() {
            this.jsxsuper();
            if (this.getRenderedBox("checkboxField")) {
                this.getRenderedBox("checkboxField").checked = this.getArgs().fieldvalue == "true";
                if(!this.getEnabled()) {
                    this.getRenderedBox("checkboxField").disabled = "disabled";
                }
                this.getRenderedBox("checkboxField").style.marginLeft = ((jsx3.CLASS_LOADER.getType().indexOf("ie") != -1) ? "-4px" : "0px");
            }
        }

        formfield.updateGUI = function(val) {
            var rend = this.getRenderedBox("checkboxField");
            if(rend) {
                rend.checked = val == "true";
            }
        }

        formfield.updateValue = function(objEvent, objGUI) {
            var oldVal = this.getValue();
            var newVal = this.getRenderedBox("checkboxField").checked ? "true" : "false";
            if(newVal != oldVal) {
                try {
                    this.doEvent("jsxchange", {objEvent: objEvent, objGUI: objGUI, oldVALUE: this.getValue(), newVALUE: newVal});
                } catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
                this.notifyContentChanged();
                this._notifyOfEdit(oldVal,newVal);
            }
            if((newVal || (newVal == "")) && (tibco.uxcore.util.Validation.trimAll(newVal) == "")) {
                newVal = "false";
            }
            this.getArgs().fieldvalue = newVal;
            this._updateFieldStyles();
//            this.setProperty("fieldvalue", newVal);
//            this.validate();
//            this.setValue(newVal,false,false,false);
        }

        formfield._updateFieldStyles = function() {
            var GUIObjs = this.getEditors();
            for(var i=0; i<GUIObjs.length; i++) {
                var gui = GUIObjs[i];
                gui.style.color = this._getTextColor();
                if(gui.parentNode) {
                    gui.parentNode.style.color = this._getTextColor();
                }
            }
        }

        formfield.setValue = function(strValue, bNoValidate, bNoRepaint, bNoNotify) {
            if(!strValue) {
                strValue = "false";
            }
            this.jsxsuper(strValue, bNoValidate, bNoRepaint, bNoNotify);
            return this;
        }

        formfield.onKeyUp = function(objEvent, objGUI) {
            try {
                if(!this.getEnabled()) return;
                var select = false;
                select = objEvent.enterKey() || objEvent.spaceKey();
                if(select) {
                    this.getRenderedBox("checkboxField").checked = this.getArgs().fieldvalue != "true";
                    this.updateValue(objEvent, this.getRenderedBox("checkboxField"));
                }
                this.doEvent(jsx3.gui.Interactive.JSXKEYUP, {objEvent: objEvent, objGUI: objGUI});
                var me = this;
                setTimeout(function() {
                    me.focus();
                },0);
            } catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
        }

        formfield.readCDF = function(cdf, isRevert) {
            if(this.cdfattribute) {
                var val = null;
                var recordsIter = cdf.selectNodeIterator("//record");
                while(recordsIter.hasNext()) {
                    var record = recordsIter.next();
                    var rVal = record.getAttribute(this.cdfattribute)
                    if(!val) {
                        val = rVal;
                    }
                    else {
                        if(val != rVal) {
                            val = tibco.uxcore.gui.FormField.DIFFERENT_VALUES;
                            break;
                        }
                    }
                }
                if((val || (val == "")) && (tibco.uxcore.util.Validation.trimAll(val) == "")) {
                    val = "false";
                }
                if(!val) {
                    val = "false";
                }
                this.getArgs().originalValue = val;
                this.setErrorText(null);
                this.setValue(val, true, false, true);
            }
            else {
                this.getArgs().originalValue = "false";
                this.setErrorText(null);
                this.setValue("false", true, false, true);
            }
            if(isRevert) {
                this.notifyContentChanged("revert");
            }
        }

        formfield.onchclick1 = function(objEvent, objGUI) {
            this.updateValue(objEvent, objGUI);
            var me = this;
            setTimeout(function() {
                var parent = me.getFocusManager();
                if(parent) {
                    parent.focusTaken(me);
                }
                me.onFocusGained(null,null);
            },0);
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.compileTemplate();

    }
);