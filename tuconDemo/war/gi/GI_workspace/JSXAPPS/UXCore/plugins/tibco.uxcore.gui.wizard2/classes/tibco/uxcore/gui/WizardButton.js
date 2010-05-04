jsx3.Class.defineClass(
        "tibco.uxcore.gui.WizardButton",
        tibco.uxcore.gui.Button,
        null,
        function (button) {

            button.ENABLED = 0;
            button.DISABLED = 1;
            button.HIDDEN = 2;

            button.prototype.getWizard = function() {
                return this.getAncestorOfType("tibco.uxcore.gui.Wizard2");
            }

        }
);