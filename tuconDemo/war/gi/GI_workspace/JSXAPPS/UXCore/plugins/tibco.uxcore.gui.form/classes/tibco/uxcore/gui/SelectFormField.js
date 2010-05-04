//jsx3.require("jsx3.gui.Template", "tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.SelectFormField", tibco.uxcore.gui.FormField, null,
        function(FORMFIELD, formfield) {

            formfield.init = function(strName) {
                this.jsxsuper(strName);
            }

            formfield.setChild = function(objChild, intPersist, strSourceURL, strNS) {
                var ret = this.jsxsuper(objChild, intPersist, strSourceURL, strNS);
                var me = this;
                if(!objChild.oldSetType) {
                    objChild.oldSetType = objChild.setType;
                    objChild.setType = function(type) {
                        var ret = objChild.oldSetType(type);
                        setTimeout(function() {
                            me.repaint();
                        }, 0);
                        return ret;
                    }
                }
                objChild.unsubscribe(jsx3.gui.Interactive.SELECT, this);
                objChild.subscribe(jsx3.gui.Interactive.SELECT, this, this.onSelect);
//                objChild.unsubscribe(jsx3.gui.Interactive.JSXKEYUP, this);
//                objChild.subscribe(jsx3.gui.Interactive.JSXKEYUP, this, this.onSelect);
                objChild.unsubscribe(jsx3.gui.Interactive.JSXBLUR, this);
                objChild.subscribe(jsx3.gui.Interactive.JSXBLUR, this, this.doBlur);
                objChild.jsxenabled = this.jsxenabled;
                return ret;
            }

            formfield.oniblur = function(objEvent, objGUI) {
                var obj = this.getChild(0);
                if(obj) {
                    var val = obj.getValue()
                    if(val == "") {
                        val = null;
                    }
                    var changed = !this.valuesEqual(this.getValue(), val);
                    this.getArgs().fieldvalue = val;
                    if(changed) {
                        jsx3.sleep(function() {this.notifyContentChanged();this._updateFieldStyles();},null,this);
                    }
                }
                this.jsxsuper(objEvent, objGUI)
            }

            formfield.doBlur = function(objEvent) {
//jsx3.log("Select " + this + " doBlur at: " + (new jsx3.lang.Exception("")).printStackTrace());
                var obj = this.getChild(0);
                if(obj) {
                    objGUI = obj.getType() == jsx3.gui.Select.TYPECOMBO ? (obj.getRendered().childNodes[0].childNodes[0].childNodes[0]) : obj.getRendered();
                    this.oniblur(objEvent, objGUI);
                }
            }

            formfield.onSelect = function() {
                this._checkChange();
            }

            formfield._checkChange = function() {
                try {
                    var oldVal = this.getValue();
                    var val = this.getChild(0).getValue();
                    if(val == "") {
                        val = null;
                    }
                    var changed = !this.valuesEqual(oldVal, val);
                    this.getArgs().fieldvalue = val;
//                    this.setProperty("fieldvalue", val);
                    if(changed) {
                        this.notifyContentChanged();
                        this._notifyOfEdit(oldVal,val);
                        this._updateFieldStyles();
                    }
                }
                catch(ex) {
                }
            }

            formfield.onKeyUp = function() {
                this._checkChange();
            }

            formfield.setValue = function(strValue, bNoValidate, bNoRepaint, bNoNotify) {
                var ret = this.jsxsuper(strValue, bNoValidate, bNoRepaint, bNoNotify);
                try {
                    this.getChild(0).setValue(strValue);
                }
                catch(ex) {
                }
                return ret;
            }

            formfield.onFocusGained = function(objEvent, objGUI) {
                try {
                    var rend = this.getChild(0);
                    if(!rend._uxcoreFocus) {
                        rend._uxcoreFocus = true;
                    }
                    var arr = this.getEditors();
                    for(var i = 0; i < arr.length; i++) {
                        var objGUI = arr[i];
                        if(objGUI) {
                            try {
                                if(objGUI.setBorder) {
                                    if(!this.getArgs().oldBorder) {
                                        this.getArgs().oldBorder = objGUI.getBorder();
                                    }
                                    if(objGUI.getDynamicProperty("jsxborder")) {
                                        objGUI.setDynamicProperty("jsxborder", null)
                                    }
                                    objGUI.setBorder(tibco.uxcore.getDynamicProperty("uxcore@formrow@activeBorder"), true)
                                    this.getArgs().oldBorder = null;
                                }
                                else {
                                    objGUI.style.border = tibco.uxcore.getDynamicProperty("uxcore@formrow@activeBorder");
                                }
                            }
                            catch(ex) {
                                jsx3.log("error applying border style");
                            }
                        }
                    }
                }
                catch(ex1) {
                    jsx3.log(jsx3.lang.NativeError.wrap(ex1).printStackTrace())
                }
            }

            formfield.onFocusLost = function(objEvent, blah) {
//                jsx3.log("onFocusLost from: " + (new jsx3.lang.Exception("test")).printStackTrace());
                var me = this;
                this.getArgs().blurTimeout = setTimeout(function() {
                    if(!me.getArgs().noSetValue) {
                var rend = me.getChild(0);
                rend._uxcoreFocus = false;
                var val = rend.getValue();
                        if(val == "") {
                            val = null;
                        }
                me.setValue(val ? val : null, true, true);
                var arr = me.getEditors();
                for(var i = 0; i < arr.length; i++) {
                    var objGUI = arr[i];
                    if(objGUI) {
                        try {
                            if(objGUI.setBorder) {
                                objGUI.setBorder((me.getArgs().oldBorder && (me.getArgs().oldBorder != "")) ? me.getArgs().oldBorder : tibco.uxcore.getDynamicProperty("uxcore@formrow@inactiveBorder"), true)
                                this.getArgs().oldBorder = null;
                            }
                            else {
                                objGUI.style.border = tibco.uxcore.getDynamicProperty("uxcore@formrow@inactiveBorder");
                            }
                        }
                        catch(ex) {
                        }
                    }
                }
                    }
                },50);
            }

            formfield.focus = function(objEvent, objTarget, bReverseDirection) {
                var arr = this.getEditors();
                if(!objTarget) {
                    objTarget = bReverseDirection ? arr[arr.length - 1] : arr[0];
                }
                if(objTarget) {
                    var panel = this.getAncestorOfType("tibco.uxcore.gui.FormPanel");
                    if(panel && (panel.isOpen() != jsx3.Boolean.TRUE)) {
                        panel.toggleDisplay();
                    }
                    for(var i = 0; i < arr.length; i++) {
                        var objGUI = arr[i];
                        if(objTarget.id == objGUI.id) {
                            this.getArgs().focusIndex = i;
                            break;
                        }
                    }
                    try {
                        this.onFocusGained(objEvent, objTarget);
                        try {
                            objTarget.focus();
                        }
                        catch(ex) {

                        }
                        try {
                            if(objTarget.select && !this.getArgs().noSelect) {
                                objTarget.select();
                            }
                            else if(this.getArgs().noSelect && objTarget.value && objTarget.createTextRange) {
                                var range = objTarget.createTextRange();
                                range.move("character", objTarget.value.length);
                                range.select();
                            }
                            delete this.getArgs().noSelect;
                        }
                        catch(ex1) {
                        }
                    }
                    catch(ex) {
                        jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
                    }
                }
                else {
                    delete this.getArgs().focusIndex;
                    var parent = this.getFocusManager();
                    if(parent) {
                        if(bReverseDirection) {
                            parent.focusPreviousChild();
                        }
                        else {
                            parent.focusNextChild();
                        }
                    }
                }
            }

            formfield.getEditors = function() {
                return [this.getChild(0)];
            }

            formfield.onikeydown = function(objEvent, objGUI) {
                if(!objEvent) {
                    objEvent = window.event;
                }
                this.getArgs().wastab = (objEvent.keyCode == jsx3.gui.Event.KEY_TAB);
                this.getArgs().wasshift = objEvent.shiftKey == 1;
                if(this.getArgs().wasshift && this.getArgs().wastab) {
                    this.getArgs().ignoreFocus = true;
                }
            }

            formfield.menuDestroyed = function(objChild) {
                var me = this;
                var form = this.getAncestorOfType("tibco.uxcore.gui.Form");
                if(form) {
                    form.getArgs().ignoreLoseFocus = false;
                }
                setTimeout(function() {
                    setTimeout(function() {
                        setTimeout(function() {
                            me.onifocus(null, objChild);
                        }, 0);
                        me.getArgs().ignoreFocus = false;
                        var fi = me.getParent().getArgs().focusIndex;
        //                jsx3.log("after repaint, focus index of parent: " + fi);
        //                jsx3.log("childindex of " + this + ": " + this.getChildIndex());
                        if(fi === me.getChildIndex()) {
                            me.getArgs().noSelect = true;
                        }
                        me.focus(null, objChild);
                        me.getArgs().ignoreFocus = false;
                        delete me.getArgs().noSetValue;
                    }, 0);
                }, 0);
            }

            formfield.bindMenu = function() {
                var menu = jsx3.gui.Heavyweight.GO("jsx30curvisibleoptions");
                if(menu) {
                    var obj = this.getChild(0);
                    var objChild = null; // the focus and blur object
                    var objMKChild = null; // the mouse and key event object
                    if(obj) {
                        objMKChild = obj.getRendered();
                        objChild = obj.getType() == jsx3.gui.Select.TYPECOMBO ? (objMKChild.childNodes[0].childNodes[0].childNodes[0]) : objMKChild;
                    }
                    var me = this;
                    if(!obj.oldHide) {
                        obj.oldHide = obj.hide;
                        obj.hide = function(bFocus) {
                            this.oldHide(bFocus);
                            me.menuDestroyed(objChild);
                        }
                    }
                    setTimeout(function() {
                        me.onFocusGained(null, objChild);
                    }, 0);
                    if(!menu.oldDestroy) {
                        menu.oldDestroy = menu.destroy;
                        menu.destroy = function() {
                            me.menuDestroyed(objChild);
                            this.oldDestroy();
                        }
                    }
                }
                else {
                    this.getArgs().noSetValue = false;
                    var form = this.getAncestorOfType("tibco.uxcore.gui.Form");
                    if(form) {
                        form.getArgs().ignoreLoseFocus = false;
                    }
                }
            }

            formfield.onAfterPaint = function() {
//                jsx3.log("After paint");
                this.jsxsuper();
                try {
                    var obj = this.getChild(0);
                    var objChild = null; // the focus and blur object
                    var objMKChild = null; // the mouse and key event object
                    if(obj) {
                        objMKChild = obj.getRendered();
                        objChild = obj.getType() == jsx3.gui.Select.TYPECOMBO ? (objMKChild.childNodes[0].childNodes[0].childNodes[0]) : objMKChild;
                    }
                    if(objChild) {
                        var me = this;
                        if(!objChild.oldOnFocus) {
                            objMKChild.oldonkeydown = objMKChild.onkeydown;
                            objMKChild.onkeydown = function(event) {
                                var form = me.getAncestorOfType("tibco.uxcore.gui.Form");
                                if(form) {
                                    form.getArgs().ignoreLoseFocus = true;
                                }
                                me.getArgs().noSetValue = true;
                                setTimeout(function() {
                                    me.bindMenu();
                                }, 0);
                                me.onikeydown(event);
                                var ret = null;
                                if(this.oldonkeydown) {
                                    this.oldonkeydown(event);
                                }
                                return ret;
                            }
                            objMKChild.oldonkeyup = objMKChild.onkeyup;
                            objMKChild.onkeyup = function(event) {
                                me.onKeyUp(event);
                                if(this.oldonkeyup) {
                                    this.oldonkeyup(event);
                                }
                            }
                            objMKChild.oldonmousedown = objMKChild.onmousedown;
                            objMKChild.onmousedown = function(event) {
                                if(this.focussingToTextbox) {
                                    this.focussingToTextbox = false;
                                }
                                else {
                                    //objChild.blurringToMenu = true;
                                    me.getArgs().noSetValue = true;
                                    var form = me.getAncestorOfType("tibco.uxcore.gui.Form");
                                    if(form) {
                                        form.getArgs().ignoreLoseFocus = true;
                                    }
                                    setTimeout(function() {
                                        me.bindMenu();
                                    }, 0);
                                }
                                var ret = null;
                                if(this.oldonmousedown) {
                                    ret = this.oldonmousedown(event);
                                }
                                me.onimousedown(event, this);
                                return ret;
                            }
                            if(obj.getType() == jsx3.gui.Select.TYPECOMBO) {
                                objChild.oldonmousedown = objChild.onmousedown;
                                objChild.onmousedown = function(event) {
                                    this.focussingToTextbox = true;
                                    var ret = null;
                                    if(this.oldonmousedown) {
                                        this.oldonmousedown(event);
                                    }
                                    me.onimousedown(event, this);
                                    return ret;
                                }
                            }
                            objChild.oldOnFocus = objChild.onfocus;
                            objChild.onfocus = function(event) {
                                clearTimeout(me.getArgs().blurTimeout);
                                delete me.getArgs().blurTimeout;
                                var ret;
                                if(this.oldOnFocus) {
                                    ret = this.oldOnFocus(event);
                                }
                                if(!this._uxcoreFocus) {
                                    this._uxcoreFocus = true;
                                }
                                if(me.getArgs().ignoreFocus) {
                                    me.getArgs().ignoreFocus = false;
                                    return ret;
                                }
                                me.onifocus(event, this);
                                return ret;
                            }
                            objChild.oldonblur = objChild.onblur;
                            objChild.onblur = function(event) {
                                if(me.getArgs().isFocussing) {
                                    return;
                                }
                                this._uxcoreFocus = false;
                                if(this.oldonblur) {
                                    this.oldonblur(event);
                                }
                                me.oniblur(event, objChild);
                            }
                        }
                    }
//                    jsx3.log("onblur: " + objChild.onblur);
                }
                catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
                this._updateFieldStyles();
            }

            formfield.setEnabled = function(intEnabled, bRepaint) {
                this.setProperty("jsxenabled", intEnabled);
                this.getChild(0).setEnabled(intEnabled);
                if(bRepaint) this.repaint();
            }

            formfield.getValueEscaped = function() {
                var val = null;
                if(this.getArgs().fieldvalue) {
                    var record = this.getChild(0).getRecordNode(this.getArgs().fieldvalue);
                    if(record) {
                        val = record.getAttribute("jsxtext");
                    }
                    else {
                        val = jsx3.util.strEscapeHTML(this.getArgs().fieldvalue);
                    }
                }
                return val;
            }

            formfield.getFieldTemplate = function() {
                return '<div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow-x: hidden;"><span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span><span>&amp;nbsp;</span></div><div u:id="editField" style="display: {editFieldDisplay}; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal;"><attach select="new jsx3.util.List(this.getChildren()).iterator()"><drawspace boxtype="\'box\'" position="\'relative\'" top="0" left="0" width="this.getPaintProfile().formfieldwidth" margin="\'0px 0px 0px 0px\'"/></attach></div>';
            }

            formfield.getBaseline = function() {
                return this.getOffset(this.getRenderedBox("editField"), "top");
            }

            formfield.onBeforeResizeChild = function(child) {
                var ff = this;
                jsx3.sleep(function() {
                    child.setWidth(ff.getDrawspace().width,true);
                },"resizeChild" + child.getId(),child,true)
//                jsx3.log("Child: " + child);
//                jsx3.log("width: " + this.getDrawspace().width);
                return false;
            }


            formfield.getValidationValue = function() {
                var child = this.getChild(0);
                var ret = this.getArgs().fieldvalue;
//                jsx3.log("fieldvalue: " + ret);
                if(this.validator && ret && child) {
                    var doc = child.getXML();
                    if(doc) {
                        var record = doc.selectSingleNode("//record[@jsxid='" + ret + "']");
                        if(record) {
                            ret = record.getAttribute("jsxtext");
                        }
                    }
                }
                if(!ret && (child.getType() == jsx3.gui.Select.TYPECOMBO)) {
                    ret = child.getValue();
                    if(ret == "") {
                        ret = null;
                    }
                }
                return ret;
            }

            formfield.compileTemplate();

        }

        );