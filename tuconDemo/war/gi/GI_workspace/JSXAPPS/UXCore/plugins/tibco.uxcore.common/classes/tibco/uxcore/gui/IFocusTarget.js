//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineInterface("tibco.uxcore.gui.IFocusTarget", null,
    function(TARGET, target) {

        target.getArgs = function() {
            if(!this.complex) {
                this.complex = new Object();
            }
            return this.complex;
        }

        target.getFocusManager = function() {
            return this.findAncestor(function(obj){return obj.instanceOf("tibco.uxcore.gui.IFocusManager")}, false);
        }

        target.clearFocus = jsx3.lang.Method.newAbstract();

        target.acceptFocus = function() {
            return this.isEditable ? this.isEditable() : true;
        }

        target.applyDOMBorder = function(objGUI, border) {
            if(border) {
                var arr = border.split(";");
                var borders = new Array();
                borders[0] = arr[0];
                borders[1] = arr[1] ? arr[1] : borders[0];
                borders[2] = arr[2] ? arr[2] : borders[0];
                borders[3] = arr[3] ? arr[3] : borders[1];
//                jsx3.log("border-top: '" + borders[0] + "'");
//                jsx3.log("border-right: '" + borders[1] + "'");
//                jsx3.log("border-bottom: '" + borders[2] + "'");
//                jsx3.log("border-left: '" + borders[3] + "'");
                objGUI.style.borderTop = tibco.uxcore.util.Validation.trimAll(borders[0]);
                objGUI.style.borderRight = tibco.uxcore.util.Validation.trimAll(borders[1]);
                objGUI.style.borderBottom = tibco.uxcore.util.Validation.trimAll(borders[2]);
                objGUI.style.borderLeft = tibco.uxcore.util.Validation.trimAll(borders[3]);
//                jsx3.log("Obj border: '" + objGUI.style.border + "'");
//                jsx3.log("Obj border-top: '" + objGUI.style.borderTop + "'");
//                jsx3.log("Obj border-right: '" + objGUI.style.borderRight + "'");
//                jsx3.log("Obj border-bottom: '" + objGUI.style.borderBottom + "'");
//                jsx3.log("Obj border-left: '" + objGUI.style.borderLeft + "'");
            }
            else {
                objGUI.style.border = null;
            }
        }

        target.focus = jsx3.lang.Method.newAbstract("objEvent","objTarget","bReverseDirection");

        target.onifocus = function(objEvent, objGUI) {
//jsx3.log("Object " + this + " onifocus at: " + (new jsx3.lang.Exception("")).printStackTrace());
//            jsx3.log(this + " Focussing: " + this.getArgs().isFocussing);
//            jsx3.log("$$$$$$$$$$$$$$$$$$focussing: " + this);
            if(!this.getArgs().isFocussing) {
//                jsx3.log(this + " Setting focussing true");
                this.getArgs().isFocussing = true;
            try {
            //this.focus(objEvent,objGUI);
            var parent = this.getFocusManager();
            if(parent) {
//                jsx3.log("$$$$$$$$$$$$$$$$parent index before;" + parent.getArgs().focusIndex);
                parent.focusTaken(this);
//                jsx3.log("$$$$$$$$$$$$$$$$parent index after;" + parent.getArgs().focusIndex);
            }
                else {
//                jsx3.log("$$$$$$$$$$$$$$$$no parent;")
            }
            } catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
//                jsx3.log("clearing focus: " + this);
            this.getArgs().isFocussing = false;
//                jsx3.log(this + " set focussing false");
                        this.onFocusGained(objEvent, objGUI);
            }
            else {
//                jsx3.log("skipping focus because already focussing: " + this);
            }
        }

        target.onikeydown = function(objEvent, objGUI) {
            try {
                this.getArgs().wastab = objEvent.tabKey();
                this.getArgs().wasshift = objEvent.shiftKey();
//jsx3.log(this + " keydown: wastab=" + this.getArgs().wastab + ", wasshift=" + this.getArgs().wasshift);
                this.onKeyDown(objEvent, objGUI);
            } catch(ex) {
                // do nothing
            }
            return true;
        }

        target.onimousedown = function(objEvent,objTarget) {
            if(!this.getArgs().isFocussing) {
                this.getArgs().isFocussing = true;
            try {
            this.focus(objEvent,objTarget);
            var parent = this.getFocusManager();
            if(parent) {
                parent.focusTaken(this);
            }
            } catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
                this.getArgs().isFocussing = false;
                }
        }

        target.onFocusLost = jsx3.lang.Method.newAbstract();

        target.onFocusGained = jsx3.lang.Method.newAbstract();

        target.onKeyDown = jsx3.lang.Method.newAbstract();

        target.oniblur = function(objEvent, objGUI) {
//            jsx3.log("$$$$$$$blurring: " + this);
            try{
                this.onFocusLost(objEvent, objGUI);
            }
            catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
            var parent = this.getFocusManager();
            if(parent) {
                if(this.getArgs().wastab) {
                    this.getArgs().wastab = false;
                    if(this.getArgs().wasshift) {
                        parent.focusPreviousChild();
                    }
                    else {
                        parent.focusNextChild();
                    }
                    this.getArgs().wasshift = false;
                }
                else {
                    parent.focusLost(this);
                }
            }
            return true;
        }

    }
);