//jsx3.require("jsx3.gui.Template","tibco.uxcore.gui.FormField");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.ButtonFormField", tibco.uxcore.gui.FormField, null,
    function(FORMFIELD, formfield) {

        formfield.buttonalignment = jsx3.gui.Block.ALIGNLEFT;

        formfield.init = function(strName) {
            this.jsxsuper(strName);
        }

        formfield.setButtonAlignment = function(intAlign, bRepaint) {
            if((intAlign == null) || (typeof intAlign == "undefined")) {
                intAlign = jsx3.gui.Block.ALIGNLEFT;
            }
            else if(intAlign == "left") {
                intAlign = jsx3.gui.Block.ALIGNLEFT;
            }
            else if(intAlign == "right") {
                intAlign = jsx3.gui.Block.ALIGNRIGHT;
            }
            else if(intAlign == "center") {
                intAlign = jsx3.gui.Block.ALIGNCENTER;
            }
            if((intAlign == jsx3.gui.Block.ALIGNLEFT) || (intAlign == jsx3.gui.Block.ALIGNRIGHT) || (intAlign == jsx3.gui.Block.ALIGNCENTER)) {
                this.setProperty("buttonalignment",intAlign);
            }
            this.adjustAlignment();
            if(bRepaint) {
                this.repaint();
            }
        }

        formfield.getButtonAlignment = function() {
            return this.buttonalignment;
        }

        formfield.getButtonAlignmentHTML = function() {
            var ret = "left";
            if(this.buttonalignment == jsx3.gui.Block.ALIGNRIGHT) {
                ret = "right";
            }
            else if(this.buttonalignment == jsx3.gui.Block.ALIGNCENTER) {
                ret = "center";
            }
            return ret;
        }

        formfield.setTitleDisplay = function(display, bRepaint) {
            this.setProperty("jsxtitledisplay", jsx3.gui.Block.DISPLAYNONE);
            if(bRepaint) this.repaint();
            return this;
        }

        formfield.setTitleText = function(strText, bRepaint) {
            this.setProperty("fieldtitletext", null);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        formfield.setExampleText = function(strText, bRepaint) {
            this.setProperty("fieldexampletext", null);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        formfield.setValue = function(strValue, bNoValidate, bNoRepaint) {
            this.getArgs().fieldvalue = null;
//            this.setProperty("fieldvalue", null);
            if(!bNoRepaint) {
                this.repaint();
            }
            return this;
        }

        formfield.getEditors = function() {
            return [];
        }

//        formfield.onifocus = function(objEvent, objGUI) {
//        }
//
//        formfield.oniblur = function(objEvent, objGUI) {
//        }

        formfield.onAfterPaint = function() {
            this.jsxsuper();
        }

        formfield.isDirty = function() {
            return false;
        }

        formfield.getFieldTemplate = function() {
            return '<var name="buttonalign">this.getButtonAlignmentHTML()</var><div u:protected="true" u:id="textlabel" style="display: {viewFieldDisplay}; margin: 0px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: 100%; left: 0px; top: 1px; font-family: Arial; font-size: 11px; font-weight: normal; color: {color};"></div><div u:id="editField" style="display: {editFieldDisplay}; margin: 5px 0px 0px 0px; padding: 0px 0px 0px 0px; position: relative; width: 100%; height: 18px; left: 0px; top: 0px; font-family: Arial; font-size: 11px; font-weight: normal;"><span style="padding: 0px 5px 0px 5px; width: 100%; height: 100%; float:left; text-align: {buttonalign};"><attach select="new jsx3.util.List(this.getChildren()).iterator()"><drawspace boxtype="\'box\'" position="\'relative\'" margin="\'0px 0px 0px 0px\'"/></attach></span></div>';
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