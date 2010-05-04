jsx3.Class.defineClass(
        "tibco.uxcore.gui.WizardCancelButton",
        tibco.uxcore.gui.WizardNavButton,
        null,
        function (button) {

            var strFnctn = button.prototype.doExecute.toString();
            var obfFnctn = strFnctn.substring(strFnctn.indexOf("this.") + 5);
            obfFnctn = obfFnctn.substring(0,obfFnctn.indexOf("("));
            button.prototype[obfFnctn] = function(objEvent, objGUI) {
                if (objEvent == null || objEvent.leftButton() || !objEvent.isMouseEvent()) {
                    objEvent.wizButton = this;
                   this.handleNav(objEvent, null);
                    this.doEvent(jsx3.gui.Interactive.EXECUTE, {objEVENT:objEvent});
                }
            }

            button.prototype.handleNav = function(objEvent, nextPanel) {
                objEvent.wizButton = this;
                this.getWizard().doCancel(objEvent);
            }

        }
);