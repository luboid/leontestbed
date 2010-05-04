jsx3.Class.defineClass(
        "tibco.uxcore.gui.WizardNavButton",
        tibco.uxcore.gui.WizardButton,
        null,
        function (button) {

            var strFnctn = button.prototype.doExecute.toString();
            var obfFnctn = strFnctn.substring(strFnctn.indexOf("this.") + 5);
            obfFnctn = obfFnctn.substring(0,obfFnctn.indexOf("("));
            button.prototype[obfFnctn] = function(objEvent, objGUI) {
                if (objEvent == null || objEvent.leftButton() || !objEvent.isMouseEvent()) {
                   var nextPanel = this.doEvent(jsx3.gui.Interactive.EXECUTE, {objEVENT:objEvent});
                    objEvent.wizButton = this;
                   this.handleNav(objEvent, nextPanel);
                }
            }

            button.prototype.handleNav = function(objEvent, nextPanel) {
                if(nextPanel) {
                    objEvent.wizButton = this;
                    this.getWizard().jumpToPanel(objEvent, nextPanel);
                }
                else {
                    alert("No panel is specified to navigate to");
                }
            }

        }
);