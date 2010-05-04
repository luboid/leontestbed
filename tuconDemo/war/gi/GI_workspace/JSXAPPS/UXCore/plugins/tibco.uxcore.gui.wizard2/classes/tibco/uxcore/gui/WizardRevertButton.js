jsx3.Class.defineClass(
        "tibco.uxcore.gui.WizardRevertButton",
        tibco.uxcore.gui.WizardNavButton,
        null,
        function (button) {
            button.prototype.handleNav = function(objEvent, nextPanel) {
				objEvent.wizButton = this;
				this.getWizard().doRevert(objEvent);
            }
        }
);