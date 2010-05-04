//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.TextBoxFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        formfield.jsxtype = jsx3.gui.TextBox.TYPETEXT;

        formfield.init = function(strName) {
            this.jsxsuper(strName);
            this._jsxtexttype = (this.jsxtype == jsx3.gui.TextBox.TYPEPASSWORD) ? "password" : "text";
        }

        formfield.updateGUI = function(val) {
            var rend = this.getEditors()[0];
            if(rend) {
                rend.value = val ? val : "";
            }
        }

        formfield.onAfterAssemble = function() {
            this.jsxsuper();
            this._jsxtexttype = (this.jsxtype == jsx3.gui.TextBox.TYPEPASSWORD) ? "password" : "text";
        }

        formfield.getEditors = function() {
            return [this.getRenderedBox("textfield")];
        }

        formfield.setType = function(type, bRepaint) {
            this.jsxtype = type;
            this._jsxtexttype = (type == jsx3.gui.TextBox.TYPEPASSWORD) ? "password" : "text";
            this.syncProperty("_jsxtexttype");
            this.getRenderedBox("textfield").type = this._jsxtexttype;
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getType = function() {
            return this.jsxtype;
        }

        formfield.onifocus = function(objEvent, objGUI) {
        	if(this.getValue() == tibco.uxcore.gui.FormField.DIFFERENT_VALUES) {
        		objGUI.value = "";
        		objGUI.style.color = "#000000"
        	}
            return tibco.uxcore.gui.IFocusTarget.prototype.onifocus.call(this, objEvent, objGUI);
        }

        formfield.oniblur = function(objEvent, objGUI) {
        	if(this.getValue() == tibco.uxcore.gui.FormField.DIFFERENT_VALUES && objGUI.value == "") {
        		objGUI.value = tibco.uxcore.gui.FormField.DIFFERENT_VALUES;
        		objGUI.style.color = "#7A7A7A"
        	}
        	return tibco.uxcore.gui.FormField.prototype.oniblur.call(this, objEvent, objGUI);
        }

        formfield.onAfterPaint = function() {
//jsx3.log(this + " repaint");
            this.jsxsuper();
            if (this.getRenderedBox("textfield") && !this.getEnabled()) {
                this.getRenderedBox("textfield").disabled = "disabled";
            }
        }

        formfield.getValueEscaped = function() {
            var value = this.jsxsuper();
            return (this.jsxtype == jsx3.gui.TextBox.TYPEPASSWORD && value) ?
              jsx3.$A(value.toString().split("")).map(function(){return "*"}).join("") : value;
        }

        formfield.getFieldTemplate = function() {
            return '<div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow-x: hidden;" tabindex="-1"><span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span><span>&amp;nbsp;</span></div><div u:id="editField" style="display: {editFieldDisplay}; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal;" tabindex="-1"><input id="textfield" u:protected="true" u:id="textfield" tabindex="{tabindex}" type="{_jsxtexttype}" style="border: {bordercolor}; margin: 0px 0px 0px 0px; padding: 1px 5px 0px 5px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; background-color: {fieldcolor}; color: {fieldtextcolor};" value="{fieldvalue2|}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"/></div>';
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.compileTemplate();

    }
);