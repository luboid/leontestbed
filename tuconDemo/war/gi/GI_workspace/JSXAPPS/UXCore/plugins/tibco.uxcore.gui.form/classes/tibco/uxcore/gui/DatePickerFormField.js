//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.DatePickerFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        formfield.dateformat = "MMMM d, yyyy";

        formfield.init = function(strName) {
            this.jsxsuper(strName);
        }

        formfield.acceptFocus = function() {
            return false;
        }

        formfield.setChild = function(objChild, intPersist, strSourceURL, strNS) {
            var ret = this.jsxsuper(objChild, intPersist, strSourceURL, strNS);
            objChild.unsubscribe(jsx3.gui.Interactive.CHANGE,this);
            objChild.subscribe(jsx3.gui.Interactive.CHANGE,this,this.onChange);
            objChild.unsubscribe(jsx3.gui.Interactive.JSXBLUR,this);
            objChild.subscribe(jsx3.gui.Interactive.JSXBLUR,this,this.onBlur);
            objChild.jsxenabled = this.jsxenabled;
            return ret;
        }

        formfield.onBlur = function(objEvent) {
            this.onChange();
        }

        formfield.onKeyUp = function() {
            this.onChange();
        }

        formfield.onChange = function(objEvent) {
            var me = this;
            setTimeout(function() {
                var oldVal = me.getValue();
                try {
                    var val = me.getChild(0).getDate();
                    var dp = me.getChild(0);
                    var objServer = dp.getServer();
                    var locale = (objServer != null) ? objServer.getLocale() : jsx3.System.getLocale();
                    var df = new jsx3.util.DateFormat(dp.getFormat(),locale);
                    if(("" + df) == dp.getValue()) {
                        val = null;
                    }
                    if(val) {
                        val = val.getTime();
                    }
                    var changed = !me.valuesEqual(oldVal,val);
                    me.getArgs().fieldvalue = val;
//                    me.setProperty("fieldvalue", val);
                    if(changed) {
                        me.notifyContentChanged();
                        me._notifyOfEdit(oldVal,val);
                        me._updateFieldStyles();
                    }
                    //me.repaint();
                } catch(ex) {tibco.uxcore.System.logException(ex);}
            },0);
        }

        formfield.getCalendar = function() {
            var heavy = null;
            var dp = this.getChild(0);
            if(dp) {
          var id = "jsxDatePicker" + dp.getId();
          heavy = jsx3.gui.Heavyweight.GO(id);
            }
          return heavy;
        };

        formfield.calendarDestroyed = function(objChild) {
            var form = this.getAncestorOfType("tibco.uxcore.gui.Form");
            if(form) {
                form.getArgs().ignoreLoseFocus = false;
            }
        }

        formfield.bindCalendar = function() {
            try {
            var me = this;
            var cal = this.getCalendar();
            if(cal) {
                if(!cal.oldDestroy) {
                    cal.oldDestroy = cal.destroy;
                    cal.destroy = function() {
                        me.calendarDestroyed(me.getChild(0));
                        this.oldDestroy();
                    }
                }
            }
            else {
                var form = this.getAncestorOfType("tibco.uxcore.gui.Form");
                if(form) {
                    form.getArgs().ignoreLoseFocus = false;
                }
            }
            }
            catch(ex) {
                jsx3.log("ex: " + jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
        }

        formfield.onAfterPaint = function() {
//                jsx3.log("After paint");
            this.jsxsuper();
            this._updateFieldStyles();
            var dp = this.getChild(0);
            var objChild = null; // the text field (for down arrow keypress opening calendar)
            var objMKChild = null; // the button (for click opening calendar)
            if(dp) {
                var rend = dp.getRendered();
                if(rend) {
                    var cn = rend.childNodes[0];
                    if(cn) {
                        objChild = cn.childNodes[0];
                        objMKChild = cn.childNodes[1];
                    }
                }
            }
            if(objChild) {
                var me = this;
                if(!objChild.oldonkeydown) {
                    objChild.oldonkeydown = objMKChild.onkeydown;
                    objChild.onkeydown = function(event) {
                        var form = me.getAncestorOfType("tibco.uxcore.gui.Form");
                        if(form) {
                            form.getArgs().ignoreLoseFocus = true;
                        }
                        setTimeout(function() {
                            me.bindCalendar();
                        }, 0);
                        me.onikeydown(event);
                        var ret = null;
                        if(this.oldonkeydown) {
                            this.oldonkeydown(event);
                        }
                        return ret;
                    }
                    objChild.oldonkeyup = objMKChild.onkeyup;
                    objChild.onkeyup = function(event) {
                        me.onKeyUp(event,this);
                        if(this.oldonkeyup) {
                            this.oldonkeyup(event);
                        }
                    }
                    objChild.oldonmousedown = objMKChild.onmousedown;
                    objChild.onmousedown = function(event) {
                        if(this.focussingToTextbox) {
                            this.focussingToTextbox = false;
                        }
                        var ret = null;
                        if(this.oldonmousedown) {
                            ret = this.oldonmousedown(event);
                        }
                        return ret;
                    }
                    objMKChild.oldonclick = objMKChild.onclick;
                    objMKChild.onclick = function(event) {
                            var form = me.getAncestorOfType("tibco.uxcore.gui.Form");
                            if(form) {
                                form.getArgs().ignoreLoseFocus = true;
                            }
                            setTimeout(function() {
                                me.bindCalendar();
                            }, 0);
                        var ret = null;
                        if(this.oldonclick) {
                            ret = this.oldonclick(event);
                        }
                        return ret;
                    }
                }
            }
        }

        formfield.valuesEqual = function(a,b) {
            var equal = this.jsxsuper(a,b);
            if(equal) {
                return true;
            }
            var intA = (typeof a == "string") ? parseInt(a) : a;
            var intB = (typeof b == "string") ? parseInt(b) : b;
            return (a == b);
        }

        formfield.setValue = function(strValue, bNoValidate, bNoRepaint, bNoNotify) {
            try {
                    this.getChild(0).setValue(strValue ? parseInt(strValue) : null);
            }
            catch(ex) {}
            return this.jsxsuper(strValue, bNoValidate, bNoRepaint, bNoNotify);
        }

        formfield.getValueEscaped = function() {
            var ret = null;
            if(this.getArgs().fieldvalue) {
                ret = jsx3.util.strEscapeHTML(this.getChild(0).getValue());
            }
            return ret;
        }

        formfield.getEditors = function() {
            return [this.getChild(0)];
        }

        formfield.onikeydown = function(objEvent, objGUI) {
            this.getArgs().wastab = objEvent.keyCode==objEvent.DOM_VK_TAB;
            this.getArgs().wasshift = objEvent.shiftKey==1;
        }

        formfield.setEnabled = function(intEnabled, bRepaint) {
            this.setProperty("jsxenabled", intEnabled);
            this.getChild(0).setEnabled(intEnabled);
            if(bRepaint) this.repaint();
        }

        formfield.getFieldTemplate = function() {
            return '<div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow-x: hidden;"><span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span><span>&amp;nbsp;</span></div><div u:id="editField" style="display: {editFieldDisplay}; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal;"><attach select="new jsx3.util.List(this.getChildren()).iterator()"><drawspace boxtype="\'box\'" position="\'relative\'" top="0" left="0" width="this.getPaintProfile().formfieldwidth"/></attach></div><var name="recalctemp">this.recalcChildren()</var>';
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.compileTemplate();

    }
);