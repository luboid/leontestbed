//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.TimePickerFormField", tibco.uxcore.gui.FormField, null,
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
            objChild.setBackgroundColor("#FFFFFF");
            objChild.unsubscribe(jsx3.gui.Interactive.CHANGE,this);
            objChild.subscribe(jsx3.gui.Interactive.CHANGE,this,this.onChange);
            objChild.jsxenabled = this.jsxenabled;
            return ret;
        }

        formfield.onChange = function(objEvent) {
            var me = this;
            setTimeout(function() {
                try {
                    var oldVal = me.getValue();
                    var val = objEvent.context.newDATE;
//                    jsx3.log("val: " + val);
                    if(val) {
                        val.setFullYear(1970,0,1);
//                        var offset = val.getTimezoneOffset() * 60 * 1000;
                        val = val.getTime();
//                        jsx3.log("time: " + val);
                        me.getChild(0).repaint();
//                        if(offset > 0) {
//                            val = val - offset;
//                        }
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

        formfield.setValue = function(strValue, bNoValidate, bNoRepaint, bNoNotify) {
            try {
                this.getChild(0).setValue(strValue ? parseInt(strValue) : null);
            }
            catch(ex) {}
            return ret = this.jsxsuper(strValue, bNoValidate, bNoRepaint, bNoNotify);
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
            return '<div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow-x: hidden"><span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span><span>&amp;nbsp;</span></div><div u:id="editField" style="display: {editFieldDisplay}; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal;"><attach select="new jsx3.util.List(this.getChildren()).iterator()"><drawspace boxtype="\'box\'" position="\'relative\'" top="0" left="0" width="this.getPaintProfile().width"/></attach></div><var name="recalctemp">this.recalcChildren()</var>';
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.onAfterPaint = function() {
//                jsx3.log("After paint");
            this.jsxsuper();
            this._updateFieldStyles();
        }

        formfield.compileTemplate();

    }
);