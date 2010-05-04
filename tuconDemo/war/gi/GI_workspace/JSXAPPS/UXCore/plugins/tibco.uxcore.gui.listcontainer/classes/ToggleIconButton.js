jsx3.lang.Class.defineClass("tibco.uxcore.gui.LCToggleIconButton",
        tibco.uxcore.gui.LCIconButton, null, function(BUTTON, button) {

    /**
     * Set default style (font, color and background images) for this button,
     * this function will be called at init or onAfterAssemble function.
     */
    button.setDefaultStyle = function() {
        this.jsxsuper();
        this.setType(tibco.uxcore.gui.Button.TYPE_TOGGLE);
    };
});
