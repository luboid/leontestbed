/*
 * Copyright (c) 2001-2007, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

/**
 * Provides a object-oriented interface for a standard command button, with ActiveMatrix Visual Styles applied to it.
 * <p/>
 * This class publishes the following model events:
 * <ul>
 * <li><code>EXECUTE</code> - when the user clicks on the enabled button, when the button has focus and the user presses the
 *    space or enter key, or when <code>doExecute()</code> is called on the button.</li>
 * <li><code>MENU</code> - on a mouseup event with the right button when the button has a bound context menu.</li>
 * </ul>
 */
//jsx3.Class.defineClass("tibco.uxcore.gui.FormButton", tibco.uxcore.gui.Button, null, function(BUTTON, button) {
jsx3.Class.defineClass("tibco.uxcore.gui.FormButton", tibco.uxcore.gui.Button, null, function(BUTTON, button) {

    /**
     * instance initializer
     * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
     * @param intLeft {int} left position (in pixels) of the object relative to its parent container; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
     * @param intTop {int} top position (in pixels) of the object relative to its parent container; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
     * @param intWidth {int} width (in pixels) of the object; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
     * @param strText {String} text to display in the given button; if null JSXTABLEHEADERCELL.DEFAULTTEXT is used
     */
    button.init = function(strName) {
        this.jsxsuper(strName);
    };

    button.getLogger = function() {
        return jsx3.util.Logger.getLogger(this.getClass().getName());
    };

    button.onSetParent = function(objParent) {
        var ret = this.jsxsuper(objParent);
        if(objParent.instanceOf("tibco.uxcore.gui.Form") || objParent.instanceOf("tibco.uxcore.gui.FormGroup")) {
            // reset any props if necessary
        }
        else {
            ret = false;
        }
        if(!ret && jsx3.IDE) {
            this.getLogger().error("Building Error: Only Forms are valid parents of Form Buttons");
            //tibco.uxcore.System.alert("Building Error", "Only Forms are valid parents of Form Buttons")
        }
        return ret;
    }

});
