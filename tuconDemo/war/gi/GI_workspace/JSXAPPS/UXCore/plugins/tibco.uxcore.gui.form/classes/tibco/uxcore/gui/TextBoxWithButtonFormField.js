//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.TextBoxWithButtonFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        formfield.jsxtype = jsx3.gui.TextBox.TYPETEXT;

        formfield.init = function(strName) {
            this.jsxsuper(strName);
        }

        formfield.getEditors = function() {
            return [this.getRenderedBox("textfield")];
        }

        formfield.updateGUI = function(val) {
            var rend = this.getEditors()[0];
            if(rend) {
                rend.value = val ? val : "";
            }
        }

        formfield.setType = function(type, bRepaint) {
            this.jsxtype = type;
            this.getRenderedBox("textfield").type = this._jsxtexttype;
            if(bRepaint) {
                this.repaint();
            }
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
            this.jsxsuper();
            if (this.getRenderedBox("textfield") && !this.getEnabled()) {
                this.getRenderedBox("textfield").disabled = "disabled";
            }
        }


        formfield.getFieldTemplate = function() {
            return '<div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: {formfieldwidth}; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color}; overflow-x: hidden"><span style="width: {formfieldwidth};"><text>{fieldValueEscaped|}</text></span><span>&amp;nbsp;</span></div><div u:id="editField" style="display: {editFieldDisplay}; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal;"><input u:protected="true" u:id="textfield" style="border: {bordercolor}; margin: 0px 0px 0px 0px; padding: 1px 5px 0px 5px; position: relative; width: 75%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal; background-color: {fieldcolor}; color: {fieldtextcolor}; float:left;" value="{fieldvalue2|}" onfocus="{onifocus}" onblur="{oniblur}" onmousedown="{onimousedown}" onkeydown="{onikeydown}" onkeyup="{onKeyUp}" onkeypress="{onKeyPressed}"/><span style="padding: 0px 5px 0px 5px; width: 25%; height: 100%; float:left;"><attach select="new jsx3.util.List(this.getChildren()).iterator()"><drawspace boxtype="\'box\'" position="\'relative\'" margin="\'0px 0px 0px 0px\'" top="0" left="0"/></attach></span></div>';
        }

        formfield.onbuttonclick = function() {
//            jsx3.log("Button clicked");
            try {
            var ret = this.doEvent("jsxbuttonclicked", {});
            } catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
//            jsx3.log("did event");
            return ret;
        }

        formfield.getBaseline = function() {
            return this.getOffset(this.getRenderedBox("editField"), "top");
        }

        formfield.compileTemplate();

    }
);