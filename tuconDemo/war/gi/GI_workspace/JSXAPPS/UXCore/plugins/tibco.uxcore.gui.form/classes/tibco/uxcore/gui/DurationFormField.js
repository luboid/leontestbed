//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.DurationFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        formfield.jsxtype = jsx3.gui.TextBox.TYPETEXT;
        formfield.showdays = jsx3.Boolean.TRUE;
        formfield.showhours = jsx3.Boolean.TRUE;
        formfield.showminutes = jsx3.Boolean.TRUE;
        formfield.showseconds = jsx3.Boolean.TRUE;
        formfield.showmillis = jsx3.Boolean.TRUE;

        formfield.init = function(strName) {
            this.jsxsuper(strName);
            this.getArgs().textstring = "";
            this.getArgs().days = null;
            this.getArgs().hours = null;
            this.getArgs().minutes = null;
            this.getArgs().seconds = null;
            this.getArgs().millis = null;
            this.getArgs().fieldcount = 5;
            this.reparse();
        }

        formfield.onAfterAssemble = function() {
            if(!this.cleaned) {
            delete this.textstring;
            delete this.days;
            delete this.hours;
            delete this.minutes;
            delete this.seconds;
            delete this.millis;
            delete this.fieldcount;
            delete this.showdaysfield;
            delete this.showhoursfield;
            delete this.showminutesfield;
            delete this.showsecondsfield;
            delete this.showmillisfield;
            }
            this.jsxsuper();
            this.getArgs().textstring = "";
            this.getArgs().days = null;
            this.getArgs().hours = null;
            this.getArgs().minutes = null;
            this.getArgs().seconds = null;
            this.getArgs().millis = null;
            this.getArgs().fieldcount = 5;
            this.reparse();
        }

        formfield.getEditors = function() {
            return [this.getRenderedBox("daystextfield"),this.getRenderedBox("hourstextfield"),this.getRenderedBox("minutestextfield"),
                    this.getRenderedBox("secondstextfield"),this.getRenderedBox("millistextfield")];
        }

//        formfield.repaint = function() {
//            this.jsxsuper();
//        }

        formfield.setShowDaysField = function(BShow, bRepaint) {
            try {
            this.setProperty("showdays",BShow);
            }
            catch(ex) {
                jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
            this.reparse()
            this.updateValue();
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getShowDaysField = function() {
            return this.showdays;
        }

        formfield.setShowHoursField = function(BShow, bRepaint) {
            try {
            this.setProperty("showhours",BShow);
            }
            catch(ex) {
                jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
            this.reparse()
            this.updateValue();
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getShowHoursField = function() {
            return this.showhours;
        }

        formfield.setShowMinutesField = function(BShow, bRepaint) {
            try {
            this.setProperty("showminutes",BShow);
            }
            catch(ex) {
                jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
            this.reparse()
            this.updateValue();
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getShowMinutesField = function() {
            return this.showminutes;
        }

        formfield.setShowSecondsField = function(BShow, bRepaint) {
            try {
            this.setProperty("showseconds",BShow);
            }
            catch(ex) {
                jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
            this.reparse()
            this.updateValue();
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getShowSecondsField = function() {
            return this.showseconds;
        }

        formfield.setShowMillisField = function(BShow, bRepaint) {
            try {
            this.setProperty("showmillis",BShow);
            }
            catch(ex) {
                jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
            this.reparse()
            this.updateValue();
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getShowMillisField = function() {
            return this.showmillis;
        }

//        formfield.oniblur = function(objEvent, objGUI) {
//        	if(this.getValue() == tibco.uxcore.gui.FormField.DIFFERENT_VALUES && objGUI.value == "") {
//        		objGUI.value = tibco.uxcore.gui.FormField.DIFFERENT_VALUES;
//        		objGUI.style.color = "#7A7A7A"
//        	}
//        	return tibco.uxcore.gui.FormField.prototype.oniblur.call(this, objEvent, objGUI);
//        }

        formfield.onAfterPaint = function() {
            this.jsxsuper();
            var arr = this.getEditors();
            for(var i = 0; i<arr.length; i++) {
                var child = arr[i];
                if(i == this.getArgs().focusIndex) {
                    child.focus();
                    child.select();
                }
                if (child && !this.getEnabled()) {
                    child.disabled = "disabled";
                }
            }
        }

        formfield.reparse = function() {
            try {
            this.getArgs().days = null;
            this.getArgs().hours = null;
            this.getArgs().minutes = null;
            this.getArgs().seconds = null;
            this.getArgs().millis = null;
            this.getArgs().textstring = "";
            var formatstring = "";
            this.getArgs().fieldcount = 0;
            if(this.formatstring) {
                formatstring = this.formatstring;
            }
            else {
                if(this.showdays == jsx3.Boolean.TRUE) {
                    this.getArgs().fieldcount++;
                    formatstring += "<DAYS>";
                }
                if(this.showhours == jsx3.Boolean.TRUE) {
                    this.getArgs().fieldcount++;
                    formatstring += ((formatstring == "") ? "" : ":") + "<HOURS>";
                }
                if(this.showminutes == jsx3.Boolean.TRUE) {
                    this.getArgs().fieldcount++;
                    formatstring += ((formatstring == "") ? "" : ":") + "<MINUTES>";
                }
                if(this.showseconds == jsx3.Boolean.TRUE) {
                    this.getArgs().fieldcount++;
                    formatstring += ((formatstring == "") ? "" : ":") + "<SECONDS>";
                }
                if(this.showmillis == jsx3.Boolean.TRUE) {
                    this.getArgs().fieldcount++;
                    formatstring += ((formatstring == "") ? "" : ":") + "<MILLISECONDS>";
                }
                if(formatstring == "") {
                    formatstring = "<MILLISECONDS>"
                }
            }
            if(this.getArgs().fieldvalue || (this.getArgs().fieldvalue == 0)) {
                var temp = parseInt(this.getArgs().fieldvalue + "");
                this.getArgs().textstring = tibco.uxcore.util.Formatter.formatElapsedTime(formatstring, temp);
                if(this.showdays == jsx3.Boolean.TRUE) {
                    this.getArgs().days = Math.floor(temp / tibco.uxcore.util.Formatter.DAY)
                    temp = temp % tibco.uxcore.util.Formatter.DAY;
                }
                if(this.showhours == jsx3.Boolean.TRUE) {
                    this.getArgs().hours = Math.floor(temp / tibco.uxcore.util.Formatter.HOUR)
                    temp = temp % tibco.uxcore.util.Formatter.HOUR;
                }
                if(this.showminutes == jsx3.Boolean.TRUE) {
                    this.getArgs().minutes = Math.floor(temp / tibco.uxcore.util.Formatter.MINUTE)
                    temp = temp % tibco.uxcore.util.Formatter.MINUTE;
                }
                if(this.showseconds == jsx3.Boolean.TRUE) {
                    this.getArgs().seconds = Math.floor(temp / tibco.uxcore.util.Formatter.SECOND)
                    temp = temp % tibco.uxcore.util.Formatter.SECOND;
                }
                if(this.showmillis == jsx3.Boolean.TRUE) {
                    this.getArgs().millis = temp
                }
            }
            }
            catch(ex) {
                jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
        }

        formfield.onKeyUp = function(objEvent, objGUI) {
            try {
                this.updateValue(true);
                this.doEvent(jsx3.gui.Interactive.JSXKEYUP, {objEvent: objEvent, objGUI: objGUI});
            } catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
        }

        formfield.getFieldInt = function(objGUI) {
            var temp = objGUI ? objGUI.value : null;
            if((temp || (temp == "")) && (tibco.uxcore.util.Validation.trimAll(temp) == "")) {
                temp = null;
            }
            if(temp) {
                var regipend = new RegExp("\\D", "ig")
                while(temp.search(regipend) != -1) {
                    temp = temp.substring(0,temp.length-1);
                }
                objGUI.value = temp;
            }
            return temp ? parseInt(temp) : null;
        }

        formfield.getDaysFieldValue = function() {
            return (this.showdays == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("daystextfield")) : null;
        }

        formfield.getHoursFieldValue = function() {
            return (this.showhours == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("hourstextfield")) : null;
        }

        formfield.getMinutesFieldValue = function() {
            return (this.showminutes == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("minutestextfield")) : null;
        }

        formfield.getSecondsFieldValue = function() {
            return (this.showseconds == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("secondstextfield")) : null;
        }

        formfield.getMillisFieldValue = function() {
            return (this.showmillis == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("millistextfield")) : null;
        }

        formfield.updateValue = function(bNotify) {
            try {
            this.getArgs().days = (this.showdays == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("daystextfield")) : null;
            this.getArgs().hours = (this.showhours == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("hourstextfield")) : null;
            this.getArgs().minutes = (this.showminutes == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("minutestextfield")) : null;
            this.getArgs().seconds = (this.showseconds == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("secondstextfield")) : null;
            this.getArgs().millis = (this.showmillis == jsx3.Boolean.TRUE) ? this.getFieldInt(this.getRenderedBox("millistextfield")) : null;
            var allNull = (this.getArgs().days == null) && (this.getArgs().hours == null) && (this.getArgs().minutes == null) && (this.getArgs().seconds == null) && (this.getArgs().millis == null);
            if(allNull) {
                this.setValue(null,true,true,!bNotify);
            }
            else {
            var format = tibco.uxcore.util.Formatter;
            this.setValue(((this.getArgs().days ? this.getArgs().days : 0) * format.DAY) +
                          ((this.getArgs().hours ? this.getArgs().hours : 0) * format.HOUR) +
                          ((this.getArgs().minutes ? this.getArgs().minutes : 0) * format.MINUTE) +
                          ((this.getArgs().seconds ? this.getArgs().seconds : 0) * format.SECOND) +
                          (this.getArgs().millis ? this.getArgs().millis : 0),true,true,!bNotify);
            }
            }
            catch(ex) {
                jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
        }

        formfield.getDays = function() {
            return this.getArgs().days ? this.getArgs().days : "";
        }

        formfield.getHours = function() {
            return this.getArgs().hours ? this.getArgs().hours : "";
        }

        formfield.getMinutes = function() {
            return this.getArgs().minutes ? this.getArgs().minutes : "";
        }

        formfield.getSeconds = function() {
            return this.getArgs().seconds ? this.getArgs().seconds : "";
        }

        formfield.getMillis = function() {
            return this.getArgs().millis ? this.getArgs().millis : "";
        }

        formfield.getValueEscaped = function() {
            return this.getArgs().textstring;
        }

        formfield.setValue = function(strValue, bNoValidate, bNoRepaint, bNoNotify) {
            if((typeof strValue == "undefined") || ((strValue != null) && ((strValue == "undefined") || (tibco.uxcore.util.Validation.trimAll("" + strValue) == "")))) {
                strValue = null;
            }
            var oldVal = this.getValue();
            var changed = !this.valuesEqual((strValue ? parseInt(strValue + "") : null), oldVal);
            this.getArgs().fieldvalue = (strValue ? parseInt(strValue + "") : null);
            if(!bNoValidate) {
                this.validate();
            }
            this.reparse();
            if(changed && !bNoNotify) {
                this.notifyContentChanged();
                this._notifyOfEdit(oldVal,this.getArgs().fieldvalue);
                this._updateFieldStyles();
            }
            if(!bNoRepaint) {
                this.repaint();
            }
            return this;
        }

        formfield.getFieldWidth = function(parentwidth) {
            if(!parentwidth) {
                return 0;
            }
            var count = this.getArgs().fieldcount ? this.getArgs().fieldcount : 1;
            if(count < 1) count = 1;
            var margin = (count - 1) * 5;
            var adjusted = parentwidth - margin;
            if(adjusted < 0) adjusted = 0;
            return Math.floor(adjusted / count);
        }

        formfield.getValue = function() {
            return this.getArgs().fieldvalue;
        }

        formfield.getFieldTemplate = function() {
            return '<var name="show1">(this.getShowDaysField() == jsx3.Boolean.TRUE) ? \'block\' : \'none\'</var>' +
                   '<var name="show2">(this.getShowHoursField() == jsx3.Boolean.TRUE) ? \'block\' : \'none\'</var>' +
                   '<var name="show3">(this.getShowMinutesField() == jsx3.Boolean.TRUE) ? \'block\' : \'none\'</var>' +
                   '<var name="show4">(this.getShowSecondsField() == jsx3.Boolean.TRUE) ? \'block\' : \'none\'</var>' +
                   '<var name="bordercolor1" triggers="focusIndex">(this.getArgs().focusIndex == 0) ? tibco.uxcore.getDynamicProperty(\'uxcore@formrow@activeBorder\') : tibco.uxcore.getDynamicProperty(\'uxcore@formrow@inactiveBorder\')</var>' +
                   '<var name="bordercolor2" triggers="focusIndex">(this.getArgs().focusIndex == 1) ? tibco.uxcore.getDynamicProperty(\'uxcore@formrow@activeBorder\') : tibco.uxcore.getDynamicProperty(\'uxcore@formrow@inactiveBorder\')</var>' +
                   '<var name="bordercolor3" triggers="focusIndex">(this.getArgs().focusIndex == 2) ? tibco.uxcore.getDynamicProperty(\'uxcore@formrow@activeBorder\') : tibco.uxcore.getDynamicProperty(\'uxcore@formrow@inactiveBorder\')</var>' +
                   '<var name="bordercolor4" triggers="focusIndex">(this.getArgs().focusIndex == 3) ? tibco.uxcore.getDynamicProperty(\'uxcore@formrow@activeBorder\') : tibco.uxcore.getDynamicProperty(\'uxcore@formrow@inactiveBorder\')</var>' +
                   '<var name="bordercolor5" triggers="focusIndex">(this.getArgs().focusIndex == 4) ? tibco.uxcore.getDynamicProperty(\'uxcore@formrow@activeBorder\') : tibco.uxcore.getDynamicProperty(\'uxcore@formrow@inactiveBorder\')</var>' +
                   '<var name="showdays">(this.getShowDaysField() == jsx3.Boolean.TRUE) ? "" : "none"</var>' +
                   '<var name="showhours">(this.getShowHoursField() == jsx3.Boolean.TRUE) ? "" : "none"</var>' +
                   '<var name="showminutes">(this.getShowMinutesField() == jsx3.Boolean.TRUE) ? "" : "none"</var>' +
                   '<var name="showseconds">(this.getShowSecondsField() == jsx3.Boolean.TRUE) ? "" : "none"</var>' +
                   '<var name="showmillis">(this.getShowMillisField() == jsx3.Boolean.TRUE) ? "" : "none"</var>' +
                   '<var name="daystext">"" + this.getDays()</var>' +
                   '<var name="hourstext">"" + this.getHours()</var>' +
                   '<var name="minutestext">"" + this.getMinutes()</var>' +
                   '<var name="secondstext">"" + this.getSeconds()</var>' +
                   '<var name="millistext">"" + this.getMillis()</var>' +
                   '<var name="fieldwidth">"" + this.getFieldWidth(this.getDrawspace().width)</var>' +
                   '<div style="width: 100%; position: relative;">' +
                   '<div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow-x: hidden;">' +
                       '<span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span>' +
                       '<span>&amp;nbsp;</span>' +
                   '</div>' +
                   '<div style="width: {formfieldwidth}; display: {editFieldDisplay};">' +
                       '<div u:id="editField" id="editField" style="display: {showdays}; float: left; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {fieldwidth}; height: 30px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; float: left;">' +
                           '<div u:protected="true" style="position: relative; height: 12px; color: #000000; width: 100%; font-family: Arial; font-size: 10px; font-weight: normal; color: black;">' +
                               '<span><text>Days</text></span>' +
                           '</div>' +
                           '<div u:protected="true" style="position: relative; width: 100%; float: left;">' +
                           '<input u:protected="true" u:id="daystextfield" id="daystextfield" style="border: {bordercolor1}; margin: 0px 0px 0px 0px; padding: 1px 5px 0px 5px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; background-color: {fieldcolor}; color: {fieldtextcolor};" value="{daystext|}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"/>' +
                           '</div>' +
                       '</div>' +
                       '<div style="width: 5px; height: 30px; display: {show1}; float: left;"></div>' +
                       '<div u:id="editField2" id="editField2" style="display: {showhours}; float: left; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {fieldwidth}; height: 30px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; float: left;">' +
                           '<div u:protected="true" style="position: relative; height: 12px; color: #000000; width: 100%; font-family: Arial; font-size: 10px; font-weight: normal; color: black;">' +
                               '<span><text>Hours</text></span>' +
                           '</div>' +
                           '<div u:protected="true" style="position: relative; width: 100%; float: left;">' +
                           '<input u:protected="true" u:id="hourstextfield" id="hourstextfield" style="border: {bordercolor2}; margin: 0px 0px 0px 0px; padding: 1px 5px 0px 5px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; background-color: {fieldcolor}; color: {fieldtextcolor};" value="{hourstext|}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"/>' +
                           '</div>' +
                       '</div>' +
                       '<div style="width: 5px; height: 30px; display: {show2}; float: left;"></div>' +
                       '<div u:id="editField3" id="editField3" style="display: {showminutes}; float: left; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {fieldwidth}; height: 30px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; float: left;">' +
                           '<div u:protected="true" style="position: relative; height: 12px; color: #000000; width: 100%; font-family: Arial; font-size: 10px; font-weight: normal; color: black;">' +
                               '<span><text>Minutes</text></span>' +
                           '</div>' +
                           '<div u:protected="true" style="position: relative; width: 100%; float: left;">' +
                           '<input u:protected="true" u:id="minutestextfield" id="minutestextfield" style="border: {bordercolor3}; margin: 0px 0px 0px 0px; padding: 1px 5px 0px 5px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; background-color: {fieldcolor}; color: {fieldtextcolor};" value="{minutestext|}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"/>' +
                           '</div>' +
                       '</div>' +
                       '<div style="width: 5px; height: 30px; display: {show3}; float: left;"></div>' +
                       '<div u:id="editField4" id="editField4" style="display: {showseconds}; float: left; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {fieldwidth}; height: 30px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; float: left;">' +
                           '<div u:protected="true" style="position: relative; height: 12px; color: #000000; width: 100%; font-family: Arial; font-size: 10px; font-weight: normal; color: black;">' +
                               '<span><text>Seconds</text></span>' +
                           '</div>' +
                           '<div u:protected="true" style="position: relative; width: 100%; float: left;">' +
                           '<input u:protected="true" u:id="secondstextfield" id="secondstextfield" style="border: {bordercolor4}; margin: 0px 0px 0px 0px; padding: 1px 5px 0px 5px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; background-color: {fieldcolor}; color: {fieldtextcolor};" value="{secondstext|}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"/>' +
                           '</div>' +
                       '</div>' +
                       '<div style="width: 5px; height: 30px; display: {show4}; float: left;"></div>' +
                       '<div u:id="editField5" id="editField5" style="display: {showmillis}; float: left; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {fieldwidth}; height: 30px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; float: left;">' +
                           '<div u:protected="true" style="position: relative; height: 12px; color: #000000; width: 100%; font-family: Arial; font-size: 10px; font-weight: normal; color: black;">' +
                               '<span><text>Milliseconds</text></span>' +
                           '</div>' +
                           '<div u:protected="true" style="position: relative; width: 100%; float: left;">' +
                           '<input u:protected="true" u:id="millistextfield" id="millistextfield" style="border: {bordercolor5}; margin: 0px 0px 0px 0px; padding: 1px 5px 0px 5px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; background-color: {fieldcolor}; color: {fieldtextcolor};" value="{millistext|}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"/>' +
                           '</div>' +
                       '</div>' +
                   '</div>' +
                   '</div>' +
                   '';
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.compileTemplate();

    }
);