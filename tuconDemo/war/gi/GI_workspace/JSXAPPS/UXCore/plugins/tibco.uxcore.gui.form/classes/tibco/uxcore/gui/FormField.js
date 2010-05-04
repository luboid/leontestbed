//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.FormField", jsx3.gui.Template.Block, [tibco.uxcore.gui.IFocusTarget],
        function(FORMFIELD, formfield) {

            FORMFIELD.DIFFERENT_VALUES = "<different values>";
            FORMFIELD.STATEENABLED = 1;
            FORMFIELD.STATEDISABLED = 0;
            FORMFIELD.supportedValidators = new jsx3.util.List(["@noWhitespace","@url","@portNumber","@digitsOnly","@IPAddress","@number","@integer","@isPositiveInteger","@isPositiveFloat","@isNegativeInteger","@isNegativeFloat","@lengthGreaterThan","@lengthLessThan","@lengthEquals"]);

            formfield.fieldtitletext = null;
            formfield.bEditable = true;
            formfield.fieldinstructionstext = null;
            formfield.fieldexampletext = null;
            formfield.isrequired = jsx3.Boolean.FALSE;
            formfield.hideoptionalstring = jsx3.Boolean.FALSE;
            formfield.hiderequiredstring = jsx3.Boolean.FALSE;
            formfield.jsxtitledisplay = jsx3.gui.Block.DISPLAYBLOCK;

            formfield.jsxenabled = FORMFIELD.STATEENABLED;

            formfield.getLogger = function() {
                return jsx3.util.Logger.getLogger(this.getClass().getName());
            }

            formfield.isDirty = function() {
//                jsx3.log(this + " old: " + this.getArgs().originalValue);
//                jsx3.log(this + " new: " + this.getValue());
//                jsx3.log(this + " dirty: " + (!this.valuesEqual(this.getValue(), this.getArgs().originalValue)))
                return !this.valuesEqual(this.getValue(), this.getArgs().originalValue);
            }

//            formfield.paint = function() {
//                var ret = this.jsxsuper(arguments);
//                var fi = this.getParent().getArgs().focusIndex;
//                if(fi === this.getChildIndex()) {
//                    var me = this;
//                    setTimeout(function() {
//                        me.getArgs().noSelect = true;
//                        me.focus();
//                        setTimeout(function() {
//                            delete me.getArgs().noSelect;
//                        }, 0);
//                    }, 0);
//                }
//                return ret;
//            }

            formfield.getArgs = function() {
                if(!this.complex) {
                    this.complex = new Object();
                }
                return this.complex;
            }

            formfield.init = function(strName) {
                this.jsxsuper(strName);
                this.getArgs().originalValue = null;
                this.getArgs().editMode = false;
                this.bEditable = true;
            }

            formfield.onAfterAssemble = function() {
                if(!this.cleaned) {
                    delete this._jsxdyntop;
                    delete this.editMode;
                    delete this.wastab;
                    delete this.wasshift;
                    delete this.fielderrortext;
                    delete this.originalValue;
                    delete this.fieldvalue;
                    delete this.lpw;
                    delete this.focusIndex;
                    delete this.oldBorder;
                    this.cleaned = true;
                }
                this.jsxsuper();
                this.getArgs().originalValue = null;
                this.getArgs().editMode = false;
                this.bEditable = true;
            }

            formfield.clearFocus = function() {
                delete this.getArgs().focusIndex;
            }

            formfield.onSetParent = function(objParent) {
                this.getArgs().editMode = false;
                this.compileTemplate();
                var ret = this.jsxsuper(objParent);
                if(objParent.instanceOf("tibco.uxcore.gui.FormRow")) {
                    delete this.getArgs().fielderrortext;
                    this.getArgs().fieldvalue = null;
                    delete this.getArgs().wastab;
                    delete this.getArgs().wasshift;
                    delete this.getArgs().focusIndex;
                }
                else {
                    ret = false;
                }
                if(!ret && jsx3.IDE) {
                    this.getLogger().error("Building Error: Only Form Rows are valid parents of Form Fields")
                //tibco.uxcore.System.alert("Building Error", "Only Form Rows are valid parents of Form Fields")
                }
                return ret;
            }

            formfield.setEditable = function(bEditable) {
                this.bEditable = bEditable;
            }

            formfield.isEditable = function() {
                return this.bEditable;
            }

            formfield.setEditMode = function(bEditMode, bRepaint) {
                if(this.bEditable) {
                    if(bEditMode != this.getArgs().editMode) {
                        this.getArgs().editMode = bEditMode;
                    }
                    if(bRepaint) {
                        this.repaint();
                    }
                }
            }

            formfield.isEditMode = function() {
                return this.getArgs().editMode;
            }

            formfield.setTitleText = function(strText, bRepaint) {
                this.setProperty("fieldtitletext", strText);
                this.adjustAlignment();
                if(bRepaint) {
                    this.repaint();
                }
                return this;
            }

            formfield.getTitleText = function() {
                return this.fieldtitletext;
            }

            formfield.setInstructionsText = function(strText, bRepaint) {
                this.setProperty("fieldinstructionstext", strText);
                this.adjustAlignment();
                if(bRepaint) {
                    this.repaint();
                }
                return this;
            }

            formfield.getInstructionsText = function() {
                return this.fieldinstructionstext;
            }

            formfield.setAlwaysShowInstructions = function(bShow, bRepaint) {
                this.setProperty("alwaysShowInstructions", bShow);
                this.adjustAlignment();
                if(bRepaint) {
                    this.repaint();
                }
                return this;
            }

            formfield.getAlwaysShowInstructions = function() {
                return this.alwaysShowInstructions;
            }

            formfield.setExampleText = function(strText, bRepaint) {
                this.setProperty("fieldexampletext", strText);
                this.adjustAlignment();
                if(bRepaint) {
                    this.repaint();
                }
                return this;
            }

            formfield.getExampleText = function() {
                return this.fieldexampletext;
            }

            formfield._hasGIEditor = function() {
                var ret = false;
                var arr = this.getEditors();
                for(var i=0; i<arr.length; i++) {
                    if(arr[i].getBackgroundColor) {
                        ret = true;
                        break;
                    }
                }
                return ret;
            }

            formfield.setErrorText = function(strText, bRepaint) {
                this.getArgs().fielderrortext = strText;
                //                this.setProperty("fielderrortext", strText);
                this.adjustAlignment();
                var panel = this.getAncestorOfType("tibco.uxcore.gui.FormPanel");
                if(strText && panel && !panel.isOpen()) {
                    panel.toggleDisplay();
                }
                var form = this.getAncestorOfType("tibco.uxcore.gui.Form");
                //                form.checkForErrors();
                if(bRepaint || this._hasGIEditor()) {
                    var block = this.getRenderedBox("errorblock");
                    var text = this.getArgs().fielderrortext ? this.getArgs().fielderrortext : "";
                    var display = this.getArgs().fielderrortext ? "block" : "";
                    var innerblock = block.childNodes[0];
                    if(innerblock.childNodes[0]) {
                        innerblock = innerblock.childNodes[0];
                        var arr = this.getEditors();
                        for(var i = 0; i < arr.length; i++) {
                            if(arr[i].getBackgroundColor) {
                                //            jsx3.log("has getBackgroundColor: " + arr[i].getBackgroundColor);
                                //            jsx3.log("oldBackgroundColor: " + this.getArgs().oldBackgroundColor);
                                if((this.getArgs().fielderrortext != null)) {
                                    if(!this.getArgs().oldBackgroundCaptured) {
                                        this.getArgs().oldBackgroundCaptured = true
                                        this.getArgs().oldBackgroundColor = arr[i].getBackgroundColor();
                                    }
                                    arr[i].setBackgroundColor(tibco.uxcore.getDynamicProperty('uxcore@formrow@invalidBGColor'), true);
                                }
                                else {
                                    arr[i].setBackgroundColor(this.getArgs().oldBackgroundColor, true);
                                }
                                jsx3.sleep(function() {
                                    var editors = this.getEditors();
                                    for(var j = 0; j < editors.length; j++) {
                                        if(editors[j].repaint) {
                                            editors[j].repaint();
                                        }
                                    }
                                }, "repaintEditors" + this.getId(), this);
                            }
                            else if(arr[i].style) {
                                arr[i].style.backgroundColor = (this.getArgs().fielderrortext != null) ? tibco.uxcore.getDynamicProperty('uxcore@formrow@invalidBGColor') : tibco.uxcore.getDynamicProperty('uxcore@formrow@defaultBGColor');
                            }
                        }
                    }
                    innerblock.innerHTML = text;
                    block.style.display = display;
                    //this.repaint();
                }
                return this;
            }

            formfield.getErrorText = function() {
                return this.getArgs().fielderrortext;
            }

            formfield.valuesEqual = function(a, b) {
                var aNull = (a == null) || (typeof a == "undefined");
                var bNull = (b == null) || (typeof b == "undefined");
                if(aNull != bNull) {
                    return false;
                }
                else if(aNull && bNull) {
                    return true;
                }
                return (("" + a) == ("" + b));
            }

            formfield._notifyOfEdit = function(oldValue,newValue) {
                var form = this.getAncestorOfType("tibco.uxcore.gui.Form");
                if(form) {
                    jsx3.sleep(function() {form.fieldEdited(this,oldValue,newValue,this.isDirty());},null,this);
                }
            }

            formfield.setValue = function(strValue, bNoValidate, bNoRepaint, bNoNotify) {
                if((typeof strValue == "undefined") || ((strValue != null) && (tibco.uxcore.util.Validation.trimAll(strValue) == ""))) {
                    strValue = null;
                }
                var oldValue = this.getValue();
                var changed = !this.valuesEqual(this.getValue(), strValue);
                this.getArgs().fieldvalue = strValue;
                //                this.setProperty("fieldvalue", strValue);
                this.updateGUI(strValue);
                if(!bNoValidate) {
                    this.validate();
                }
                if(changed && !bNoNotify) {
                    this.notifyContentChanged();
                    this._notifyOfEdit(oldValue,strValue);
                }
                if(!bNoRepaint) {
                    jsx3.sleep(function(){this.repaint();},"repaint" + this.getId(),this);
//                    var me = this;
//
//                    setTimeout(function() {
//                        me.repaint();
//                    },0);
                }
                return this;
            }

            formfield.onAfterFormRepainted = function() {
                // do nothing...useful for overrides
            }

//            formfield.repaint = function(bForce) {
//                if(this.getArgs().repaintTimeout) {
//                    clearTimeout(this.getArgs().repaintTimeout);
//                    delete this.getArgs().repaintTimeout;
//                }
//                if(bForce) {
//                    this.jsxsuper();
//                }
//                else {
//                    var me = this;
//                    this.getArgs().repaintTimeout = setTimeout(function() {
//                        me.repaint(true);
//                    },0);
//                }
//            }

            formfield.validate = function() {
                var ret = true;
//                var bRepaint = false;
                var validationValue = this.getValidationValue();
//                jsx3.log(this + " validation value '" + validationValue + "'");
                if(this.validator) {
                    if(this.isrequired == jsx3.Boolean.TRUE) {
//                        var tmp = ((validationValue != null) && (typeof validationValue != "undefined")) ? (validationValue + "") : null;
                        ret = tibco.uxcore.util.Validation.doValidateNotEmpty(this, validationValue, this.getTitleText());
                    }
                    if(ret) {
                        if(!this.getArgs().validators) {
                            this.prepareValidators();
                        }
                        if(this.getArgs().validators) {
                            for(var i = 0; i < this.getArgs().validators.size(); i++) {
                                if(ret) {
                                    ret = tibco.uxcore.util.Validation.doValidateNoLeadingOrTrailingWhSpace(this, validationValue, this.getTitleText());
                                    if(!ret) {
//                                        jsx3.log("returning");
                                        return;
                                    }
                                    var validator = this.getArgs().validators.get(i);
                                    if(validator == "@noWhitespace") {
                                        ret = tibco.uxcore.util.Validation.doValidateNoWhSpace(this, validationValue, this.getTitleText());
                                    }
                                    else if(validator == "@url") {
                                        ret = tibco.uxcore.util.Validation.doValidateURL(this, validationValue, this.getTitleText(), this.isrequired != jsx3.Boolean.TRUE);
                                    }
                                    else if(validator == "@portNumber") {
                                        ret = tibco.uxcore.util.Validation.doValidatePort(this, validationValue, this.getTitleText(), this.isrequired != jsx3.Boolean.TRUE);
                                    }
                                    else if(validator == "@digitsOnly") {
                                        ret = tibco.uxcore.util.Validation.doValidateNumbersOnly(this, validationValue, this.getTitleText(), this.isrequired != jsx3.Boolean.TRUE);
                                    }
                                    else if(validator == "@IPAddress") {
                                        ret = tibco.uxcore.util.Validation.doValidateIPAddress(this, validationValue, this.getTitleText(), this.isrequired != jsx3.Boolean.TRUE);
                                    }
                                    else if(validator == "@number") {
                                        ret = tibco.uxcore.util.Validation.validateNumeric(this, validationValue, this.getTitleText(), this.isrequired != jsx3.Boolean.TRUE);
                                    }
                                    else if(validator == "@integer") {
                                        ret = tibco.uxcore.util.Validation.validateNumeric(this, validationValue, this.getTitleText(), this.isrequired != jsx3.Boolean.TRUE, true);
                                    }
                                    else if(validator == "@isPositiveInteger") {
                                        ret = tibco.uxcore.util.Validation.doValidatePositiveNumbers(this, validationValue, this.getTitleText(), true, false);
                                    }
                                    else if(validator == "@isPositiveFloat") {
                                        ret = tibco.uxcore.util.Validation.doValidatePositiveNumbers(this, validationValue, this.getTitleText(), true, true);
                                    }
                                    else if(validator == "@isNegativeInteger") {
                                        ret = tibco.uxcore.util.Validation.doValidateNegativeNumbers(this, validationValue, this.getTitleText(), true, false);
                                    }
                                    else if(validator == "@isNegativeFloat") {
                                        ret = tibco.uxcore.util.Validation.doValidateNegativeNumbers(this, validationValue, this.getTitleText(), true, true);
                                    }
                                    else if(validator.indexOf("@lengthGreaterThan") == 0) {
                                        var start = validator.indexOf("[");
                                        var end = validator.indexOf("]");
                                        if((start != -1) && (end != -1) && (end > start)) {
                                            var strSize = validator.substring(start + 1, end);
                                            if(tibco.uxcore.util.Validation.isNumeric(strSize)) {
                                                var intSize = parseInt(strSize);
                                                ret = tibco.uxcore.util.Validation.doValidateLengthGreaterThan(this, validationValue, this.getTitleText(), intSize);
                                            }
                                            else {
                                                jsx3.log(this.getTitleText() + ": Error in validator format");
                                            }
                                        }
                                        else {
                                            jsx3.log(this.getTitleText() + ": Error in validator format");
                                        }
                                    }
                                    else if(validator.indexOf("@lengthLessThan") == 0) {
                                        var start = validator.indexOf("[");
                                        var end = validator.indexOf("]");
                                        if((start != -1) && (end != -1) && (end > start)) {
                                            var strSize = validator.substring(start + 1, end);
                                            if(tibco.uxcore.util.Validation.isNumeric(strSize)) {
                                                var intSize = parseInt(strSize);
                                                ret = tibco.uxcore.util.Validation.doValidateLengthLessThan(this, validationValue, this.getTitleText(), intSize);
                                            }
                                            else {
                                                jsx3.log(this.getTitleText() + ": Error in validator format");
                                            }
                                        }
                                        else {
                                            jsx3.log(this.getTitleText() + ": Error in validator format");
                                        }
                                    }
                                    else if(validator.indexOf("@lengthEquals") == 0) {
                                        var start = validator.indexOf("[");
                                        var end = validator.indexOf("]");
                                        if((start != -1) && (end != -1) && (end > start)) {
                                            var strSize = validator.substring(start + 1, end);
                                            if(tibco.uxcore.util.Validation.isNumeric(strSize)) {
                                                var intSize = parseInt(strSize);
                                                ret = tibco.uxcore.util.Validation.doValidateLengthEquals(this, validationValue, this.getTitleText(), intSize);
                                            }
                                            else {
                                                jsx3.log(this.getTitleText() + ": Error in validator format");
                                            }
                                        }
                                        else {
                                            jsx3.log(this.getTitleText() + ": Error in validator format");
                                        }
                                    }
                                    else {
                                        var result = jsx3.eval(validator, {objJSX:this, value:validationValue});
                                        var errorText = tibco.uxcore.getDynamicProperty("uxcore@forms@validation@field@defaultError", this.getTitleText() ? this.getTitleText() : tibco.uxcore.getDynamicProperty("@Validation Default Field Name"));
                                        var type = typeof(result);
                                        switch(type) {
                                            case "boolean":
                                                ret = result;
                                                break;
                                            case "number":
                                                ret = (result == jsx3.Boolean.TRUE)
                                                break;
                                            case "string":
                                                var lower = result.toLowerCase();
                                                ret = (lower == "true");
                                                if(!ret && (lower != "false")) {
                                                    errorText = result;
                                                }
                                                break;
                                            default:
                                        }
                                        if(ret) {
                                            this.setErrorText(null,false);
                                        }
                                        else {
                                            this.setErrorText(errorText, true);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if(ret) {
                        this.repaint();
                    }
                }
                else if(this.isrequired == jsx3.Boolean.TRUE) {
                    ret = tibco.uxcore.util.Validation.doValidateNotEmpty(this, validationValue, this.getTitleText());
                }
                else if(this.getArgs().fielderrortext) {
                    this.setErrorText(null, true);
                }
//            if(bRepaint) {
                //                this.repaint();
                //            }
//                jsx3.log("Returning from validate for " + this + ": " + ret);
                return ret;
            }

            formfield.getValue = function() {
                return this.getArgs().fieldvalue;
            }

            formfield.getValidationValue = function() {
                var tmp = this.getValue();
                if((tmp == null) || (typeof tmp == "undefined")) {
                    var editor = this.getEditors()[0];
                    if(editor && editor.value) {
                        tmp = editor.value;
                    }
                }
                return ((tmp != null) && (typeof tmp != "undefined")) ? (tmp + "") : null;
            }

            formfield.getValueEscaped = function() {
                return this.getArgs().fieldvalue ? ((this.getClass().getName() != "tibco.uxcore.gui.FormField") ? jsx3.util.strEscapeHTML(this.getArgs().fieldvalue) : this.getArgs().fieldvalue) : null;
            }

            formfield.getValueOrEmpty = function() {
                return ((this.getArgs().fieldvalue ? this.getArgs().fieldvalue : '') + "").replace(/"/g,"&quot;");
            }

            formfield.writeCDF = function(cdf) {
                if(this.cdfattribute) {
                    var val = this.getValue();
                    if(!this.valuesEqual(val, this.getArgs().originalValue)) {
                        var recordsIter = cdf.selectNodeIterator("//record");
                        while(recordsIter.hasNext()) {
                            recordsIter.next().setAttribute(this.cdfattribute, val)
                        }
                    }
                }
            }

            formfield.setOriginalData = function(val) {
                this.getArgs().originalValue = val;
            }

            formfield.readCDF = function(cdf, isRevert) {
//                jsx3.log("readCDF from: " + this);
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
                    if((val || (val=="")) && (tibco.uxcore.util.Validation.trimAll(val) == "")) {
                        val = null;
                    }
//                    jsx3.log("val: " + val);
                    this.getArgs().originalValue = val;
                    this.setErrorText(null);
                    this.setValue(val, true, false, true);
                }
                else {
//                    jsx3.log("val: null");
                    this.getArgs().originalValue = null;
                    this.setErrorText(null);
                    this.setValue(null, true, false, true);
                }
                if(isRevert) {
                    this.notifyContentChanged("revert");
                }
            }

            formfield.adoptChild = function(objChild, bRepaint, bForce) {
                var ret = this.jsxsuper(objChild, bRepaint, bForce);
                this.clearChild(objChild);
                return ret;
            }

            formfield.clearChild = function(objChild) {
                if(objChild.setValue) {
                    objChild.setValue(null);
                }
            }

            formfield.setChild = function(objChild, intPersist, strSourceURL, strNS) {
                var ret = this.jsxsuper(objChild, jsx3.app.Model.PERSISTEMBED, strSourceURL, strNS);
                this.clearChild(objChild);
                return ret;
            }

            formfield.setCDFAttribute = function(atts) {
                this.setProperty("cdfattribute", atts);
            }

            formfield.getCDFAttribute = function() {
                return this.cdfattribute;
            }

            formfield.setFieldValidator = function(atts) {
                this.setProperty("validator", atts);
                delete this.getArgs().validators;
                this.prepareValidators();
            }

            formfield.prepareValidators = function() {
                if(this.validator) {
                    var vals = this.validator.split(",");
                    var vList = new jsx3.util.List(0);
                    var val = "";
                    for(var i=0; i< vals.length; i++) {
                        var v = vals[i];
                        var testVal = (v.indexOf("[") != -1) ? v.substring(0,v.indexOf("[")) : v;
                        if(FORMFIELD.supportedValidators.contains(testVal)) {
                            if(val && (val != "")) {
//                                jsx3.log("Adding: " + val);
                                vList.add(val);
                                val = "";
                            }
//                            jsx3.log("Adding: " + v);
                            vList.add(v);
                        }
                        else if(val == "") {
                            val = v;
                        }
                        else {
                            val += "," + v;
                        }
                    }
                    if(val && (val != "")) {
//                        jsx3.log("Adding: " + val);
                        vList.add(val);
                        val = "";
                    }
                    this.getArgs().validators = vList;
//                    jsx3.log("***********");
//                    jsx3.log("validators are: ");
//                    for(var j=0; j<vList.size(); j++) {
//                        jsx3.log("    " + vList.get(j));
//                    }
                }
            }

            formfield.getFieldValidator = function() {
                return this.validator;
            }

            formfield.getOptionalString = function() {
                return (!this.isEditMode()  || ((this.isrequired == jsx3.Boolean.FALSE) && (this.isHideOptionalString() == jsx3.Boolean.TRUE)) || ((this.isrequired == jsx3.Boolean.TRUE) && (this.isHideRequiredString() == jsx3.Boolean.TRUE))) ? "&nbsp;" : ("&nbsp;" + ((this.isrequired == jsx3.Boolean.TRUE) ? tibco.uxcore.getDynamicProperty('uxcore@formrow@requiredText') : tibco.uxcore.getDynamicProperty('uxcore@formrow@optionalText')))
            }

            formfield.setRequired = function(intRequired, bRepaint) {
                if((this.getClass().getName() == "tibco.uxcore.gui.FormField")) intRequired = jsx3.Boolean.FALSE;
                this.setProperty("isrequired", intRequired);
                this.adjustAlignment();
                if(bRepaint) {
                    var box = this.getRenderedBox("optionalLabel");
                    if(box) {
                        box.innerHTML = this.getOptionalString();
                    }
                    else {
                        this.repaint();
                    }
                }
            }

            formfield.isRequired = function() {
                return (this.getClass().getName() == "tibco.uxcore.gui.FormField") ? jsx3.Boolean.FALSE : this.isrequired;
            }

            formfield.setHideOptionalString = function(intHideOptionalString, bRepaint) {
                this.setProperty("hideoptionalstring", intHideOptionalString);
                this.adjustAlignment();
                if(bRepaint) {
                    this.repaint();
                }
            }

            formfield.isHideOptionalString = function() {
                return (this.getClass().getName() == "tibco.uxcore.gui.FormField") ? jsx3.Boolean.TRUE : this.hideoptionalstring;
            }

            formfield.setHideRequiredString = function(intHideRequiredString, bRepaint) {
                this.setProperty("hiderequiredstring", intHideRequiredString);
                this.adjustAlignment();
                if(bRepaint) {
                    this.repaint();
                }
            }

            formfield.isHideRequiredString = function() {
                return (this.getClass().getName() == "tibco.uxcore.gui.FormField") ? jsx3.Boolean.TRUE : this.hiderequiredstring;
            }

            formfield.setIndex = function() {
            }

            formfield.getIndex = function() {
                var form = this.getAncestorOfType("tibco.uxcore.gui.Form");
                return (form.getIndex() ? form.getIndex() : "1");
            }

            formfield.focus = function(objEvent, objTarget, bReverseDirection) {
//jsx3.log(this + " focus called from " + (new jsx3.lang.Exception("")).printStackTrace());
//                try {
//                    if(objTarget && objTarget.id) {
//                        jsx3.log("orig target: " + objTarget.id);
//                    }
//                    else {
//                        jsx3.log("orig target: " + objTarget);
//                    }
//                } catch(ex) {
//                    jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
//                }
                var arr = this.getEditors();
                if(!objTarget) {
                    objTarget = bReverseDirection ? arr[arr.length - 1] : arr[0];
                this.getArgs().focusIndex = bReverseDirection ? (arr.length - 1) : 0;
                }
//                if(objTarget && objTarget.id) {
//                   jsx3.log("actual target: " + objTarget.id);
//                }
//                else {
//                    jsx3.log("actual target: " + objTarget);
//                }
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
//                                            jsx3.log("Applying focusGained: " + this);
                        this.onFocusGained(objEvent, objTarget);
//                    jsx3.log("applied");
                        try {
                            objTarget.focus();
                            var parent = this.getFocusManager();
                            if(parent) {
//                                jsx3.log("$$$$$$$$$$$$$$$$parent index before;" + parent.getArgs().focusIndex);
                                parent.focusTaken(this);
//                                jsx3.log("$$$$$$$$$$$$$$$$parent index after;" + parent.getArgs().focusIndex);
                            }
                            setTimeout(function() {
                                try {
                                    objTarget.focus();
                                } catch(ex) {
                                    // do nothing...
                                }
                            },0);
                        }
                        catch(ex) {

                        }
//                        if(objTarget && objTarget.id) {
//                            jsx3.log("focussing: " + objTarget.id);
//                        }
//                        else {
//                            jsx3.log("focussing: " + objTarget);
//                        }
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
                        tibco.uxcore.System.logException(ex);
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
//                jsx3.log("done focussing: " + this);
//            }
            }

            formfield.getEditors = function() {
                return [this.getRenderedBox("dummy")];
            }

            formfield.onClick = function(objEvent, objGUI) {
                this.updateValue();
            }

            formfield.oniblur = function(objEvent, objGUI) {
//jsx3.log("Object " + this + " oniblur at: " + (new jsx3.lang.Exception("")).printStackTrace());
                //            jsx3.log("^^^^^^^^^^^^^^^^^^^^^^^^blurring");

                var parent = this.getFocusManager();
                var arr = this.getEditors();
//            jsx3.log("^^^^^^^^^^^^^^^^^^^^^^^^^^arr: " + arr);
                var index = arr.length - 1;
                for(var i = 0; i < arr.length; i++) {
                    if(objGUI && (objGUI.id == arr[i].id)) {
                        index = i;
                        break;
                    }
                }
                if(this.getArgs().wastab) {
                    //                    jsx3.log("^^^^^^^^^^^^^^^^was tab");
                    this.getArgs().wastab = false;
                    if(this.getArgs().wasshift) {
                        //                        jsx3.log("^^^^^^^^^^^^^^^^^^^^^^index: " + index)
                        if(index == 0) {
                            delete this.getArgs().focusIndex;
                            if(parent) {
//                                                                jsx3.log("^^^^^^^^^^^^^^^parent index before: " + parent.getArgs().focusIndex);
//                                                                jsx3.log("^^^^^^^^^^^^^^^grandparent index before: " + parent.getParent().getArgs().focusIndex);
//                                                                jsx3.log("^^^^^^^^^^^^^^^greatgrandparent index before: " + parent.getParent().getParent().getArgs().focusIndex);
//                                                                jsx3.log("^^^^^^^^^^^^^^^greatgreatgrandparent index before: " + parent.getParent().getParent().getParent().getArgs().focusIndex);
                                parent.focusPreviousChild();
//                                jsx3.log("^^^^^^^^^^^^^^^parent index after: " + parent.getArgs().focusIndex);
//                                                                jsx3.log("^^^^^^^^^^^^^^^grandparent index after: " + parent.getParent().getArgs().focusIndex);
//                                                                jsx3.log("^^^^^^^^^^^^^^^greatgrandparent index after: " + parent.getParent().getParent().getArgs().focusIndex);
//                                                                jsx3.log("^^^^^^^^^^^^^^^greatgreatgrandparent index after: " + parent.getParent().getParent().getParent().getArgs().focusIndex);
                                                                parent.focusLost(this);
                            }
                            else {
//                                                                jsx3.log("^^^^^^^^^^^^^^^No parent");
                            }
                        }
                        else {
                            if(!this.getArgs().isFocussing) {
                                this.getArgs().isFocussing = true;
                                this.focus(objEvent, arr[index - 1], true);
                                this.getArgs().isFocussing = false;
                            }
                        }
                    }
                    else {
                        if(index == (arr.length - 1)) {
                            delete this.getArgs().focusIndex;
                            if(parent) {
                                parent.focusNextChild();
//                                parent.focusLost(this);
                            }
                        }
                        else {
                            if(!this.getArgs().isFocussing) {
                                this.getArgs().isFocussing = true;
                                try {
                                    this.focus(objEvent, arr[index + 1]);
                                }
                                catch(ex) {

                                }
                                this.getArgs().isFocussing = false;
                            }
                        }
                    }
                    this.getArgs().wasshift = false;
                }
                else {
//                                        jsx3.log("^^^^^^^^^^^doing simple focusLost")
                    delete this.getArgs().focusIndex;
                }
var me = this;
setTimeout(function() {
                try {
                    me.onFocusLost(objEvent, objGUI);
                }
                catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
},0);
                return true;
            }

            formfield.updateValue = function(objEvent, objGUI) {
                var rend = objGUI ? objGUI : this.getEditors()[0];
                this.setValue(rend.value, true, true)
            }

            formfield.updateGUI = function(val) {
                var rend = this.getEditors()[0];
                if(rend) {
                    rend.value = val;
                }
            }

            formfield.setDisplay = function(intDisplay, bRepaint) {
                var ret = this.jsxsuper(intDisplay, bRepaint);
                if(jsx3.CLASS_LOADER.IE && (intDisplay == jsx3.gui.Block.DISPLAYBLOCK)) {
                    var parent = this.getAncestorOfType("tibco.uxcore.gui.Form");
                    if(parent) {
                        jsx3.sleep(function(){parent.repaint();},"repaint" + parent.getId(),this);
                    }
                }
                return ret;
            }

            formfield.onFocusGained = function(objEvent, objGUI) {
                if(objGUI) {
                    try {
                        if(objGUI.setBorder) {
                            if(!this.getArgs().oldBorder) {
                                this.getArgs().oldBorder = objTarget.getBorder();
                            }
                            if(objTarget.getDynamicProperty("jsxborder")) {
                                objTarget.setDynamicProperty("jsxborder", null)
                            }
                            objGUI.setBorder(this.getArgs().oldBorder ? this.getArgs().oldBorder : tibco.uxcore.getDynamicProperty("uxcore@formrow@activeBorder"), true)
                        }
                        else {
                            this.applyDOMBorder(objGUI, tibco.uxcore.getDynamicProperty("uxcore@formrow@activeBorder"));
                        }
                    }
                    catch(ex) {
                        tibco.uxcore.System.logException(ex);
                    }
                }
            }

            formfield.onFocusLost = function(objEvent, objGUI) {
//jsx3.log(this + " focusLost at: " + (new jsx3.lang.Exception("")).printStackTrace());
                delete this.getArgs().focusIndex;
                this.updateValue();
                if(objGUI) {
                    try {
                        if(objGUI.setBorder) {
                            objGUI.setBorder(this.getArgs().oldBorder ? this.getArgs().oldBorder : tibco.uxcore.getDynamicProperty("uxcore@formrow@inactiveBorder"), true)
                        }
                        else {
                            this.applyDOMBorder(objGUI, tibco.uxcore.getDynamicProperty("uxcore@formrow@inactiveBorder"));
                        }
                    }
                    catch(ex) {
                        tibco.uxcore.System.logException(ex);
                    }
                }
            }

            formfield.acceptFocus = function() {
                return this.getClass().getName() != "tibco.uxcore.gui.FormField";
            }

            formfield.getMinWidth = function() {
                return 200;
            }

            formfield.getFieldTemplate = function() {
                return '<div u:id="dummy" style="margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color};"><span><text>{fieldValueEscaped}</text></span></div>';
            }

            formfield.recalcChildren = function() {
            }

            formfield.getFocusIndex = function() {
                return this.getArgs().focusIndex;
            }

            formfield.compileTemplate = function() {
                var clazz = eval(this.getClass().getName());
                if(!clazz.templateXML) {
                    if(!tibco.uxcore.gui.FormField.TEMPLATE_XML) {
                        var uri = jsx3.resolveURI("jsxplugin://tibco.uxcore.gui.form/templates/formfield.xml");
                        var temp = tibco.uxcore.System.getServer().loadInclude(uri, "formFieldTemplate", "xml");
                        tibco.uxcore.gui.FormField.TEMPLATE_XML = temp.toString();
                    }
                    clazz.templateXML = tibco.uxcore.gui.FormField.TEMPLATE_XML;
                    clazz.templateXML = clazz.templateXML.replace(/REPLACE_FORMFIELD_TEMPLATE/, this.getFieldTemplate());
                    if(jsx3.CLASS_LOADER.getType() == "fx2") {
                        clazz.templateXML = clazz.templateXML.replace(/inlinebox/g, "div");
                    }
                    jsx3.gui.Template.compile(clazz.templateXML, clazz.jsxclass);
                }
            }

            formfield.compileTemplate()

            formfield.adjustAlignment = function() {
                try {
                    this.getParent().adjustAlignment(this);
                }
                catch (e) {
                }
            }

            formfield.onBeforeResizeChild = function(child) {

            }

            formfield.onResize = function() {
                if(this.getArgs()._jsxdyntop && this.getRendered() && this.getParent().getFieldAlign() != tibco.uxcore.gui.FormRow.ALIGNTOP) {
                    this.getRendered().style.top = this.getArgs()._jsxdyntop;
                }
            }

            formfield.onAfterPaint = function() {
                var fi = this.getParent().getArgs().focusIndex;
//                jsx3.log("after repaint, focus index of parent: " + fi);
//                jsx3.log("childindex of " + this + ": " + this.getChildIndex());
                if(fi === this.getChildIndex()) {
                    this.getArgs().noSelect = true;
//                    jsx3.log("Focussing now");
                    this.focus();
                }
                if(this.getArgs()._jsxdyntop && this.getRendered() && this.getParent().getFieldAlign() != tibco.uxcore.gui.FormRow.ALIGNTOP) {
                    this.getRendered().style.top = this.getArgs()._jsxdyntop;
                }
            }

            formfield.getBaseline = function() {
                return this.getAbsolutePosition().H;
            }

            formfield.setEnabled = function(intEnabled, bRepaint) {
                this.setProperty("jsxenabled", intEnabled);
//                var arr = this.getChildren();
//                for(var i in arr) {
//                    var child = arr[i];
//                    if(child.setEnabled) {
//                        child.setEnabled(intEnabled, bRepaint);
//                    }
//                }
                if(jsx3.CLASS_LOADER.IE && !this.jsxenabled) {
                    jsx3.sleep(function(){this.repaint();},"repaint" + this.getId(),this);
                }
                else {
                if(bRepaint) {
                    var box = this.getRenderedBox("displaymask");
                    if(box) {
                        box.style.display = this.jsxenabled ? "none" : "";
                    }
                    else {
                        this.repaint();
                    }
                }
                }
            }

            formfield.getEnabled = function() {
                return this.jsxenabled;
            }

            formfield._isEnabled = function() {
                return this.getEnabled() == null || this.getEnabled();
            }

            formfield.getOffset = function(dom, offsetType) {
                if(dom) {
                var totalOffset = (offsetType == "left") ? dom.offsetLeft : dom.offsetTop;
                var parentEl = dom.offsetParent;
                while(parentEl != null) {
                    totalOffset = (offsetType == "left") ? totalOffset + parentEl.offsetLeft : totalOffset + parentEl.offsetTop;
                    parentEl = parentEl.offsetParent;
                    if(parentEl == this.getRendered()) return totalOffset;
                }
                return totalOffset;
                }
                return 0;
            }

            formfield.getTitleDisplay = function() {
                return this.jsxtitledisplay;
            }

            formfield.onKeyDown = function(objEvent, objGUI) {
                try {
                    this.doEvent(jsx3.gui.Interactive.JSXKEYDOWN, {objEvent: objEvent, objGUI: objGUI});
                }
                catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
            }

            formfield.onKeyUp = function(objEvent, objGUI) {
                try {
                    var prevValue = this.getArgs().fieldvalue;
                    var val = objGUI.value;
                    if((typeof val == "undefined") || ((val != null) && (tibco.uxcore.util.Validation.trimAll(val) == ""))) {
                        val = null;
                    }
                    this.getArgs().fieldvalue = val;
//                    this.setProperty("fieldvalue", val);
                    this.doEvent(jsx3.gui.Interactive.JSXKEYUP, {objEvent: objEvent, objGUI: objGUI});
                    if(!this.valuesEqual(prevValue, this.getArgs().fieldvalue)) {
                        this.notifyContentChanged();
                        this._notifyOfEdit(prevValue,val);
                        this._updateFieldStyles();
                    }
                }
                catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
            }

            formfield._updateFieldStyles = function() {
                var GUIObjs = this.getEditors();
                for(var i=0; i<GUIObjs.length; i++) {
                    var gui = GUIObjs[i];
                    if(gui.setColor) {
                        gui.setColor(this._getTextColor(),true);
                    }
                    else {
                        gui.style.color = this._getTextColor();
                    }
                }
            }

            formfield.onKeyPressed = function(objEvent, objGUI) {
                try {
                    this.doEvent(jsx3.gui.Interactive.JSXKEYPRESS, {objEvent: objEvent, objGUI: objGUI});
                }
                catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
            }

            formfield.setTitleDisplay = function(display, bRepaint) {
                if(this.jsxtitledisplay != display) {
                    this.setProperty("jsxtitledisplay", display);
                    this.adjustAlignment();
                    if(jsx3.CLASS_LOADER.IE && (this.jsxtitledisplay == jsx3.gui.Block.DISPLAYBLOCK)) {
                        var parent = this.getAncestorOfType("tibco.uxcore.gui.Form");
                        if(parent) {
                            jsx3.sleep(function(){parent.repaint();},"repaint" + parent.getId(),this);
                        }
                    }
                    else {

                    }
                    if(bRepaint) {
                        var box = this.getRenderedBox("fieldtitle");
                        if(box) {
                            box.style.display = (this.jsxtitledisplay == jsx3.gui.Block.DISPLAYBLOCK) ? "" : "none";
                        }
                        else {
                            this.repaint();
                        }
                    }
                }
                return this;
            }

            formfield.notifyContentChanged = function(type) {
                var parent = this.getParent() ? this.getParent() : null;
                if(parent) {
                    jsx3.sleep(function() {parent.childContentChanged(this, this, this.isDirty(), type ? type : "edit");},this.getId() + "_contentChanged",this);
                }
            }

            formfield._getTextColor = function() {
                var ret = "#000000";
                if(this.isDirty()) {
                    ret = "#0000FF";
                }
                return ret;
            }
        }

        );


