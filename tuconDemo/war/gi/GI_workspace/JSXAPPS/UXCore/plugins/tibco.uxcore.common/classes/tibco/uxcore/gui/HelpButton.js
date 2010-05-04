//jsx3.require("jsx3.gui.ImageButton");

/**
* A button specifically designed to trigger the opening of context-sensitive help.
 */
jsx3.Class.defineClass("tibco.uxcore.gui.HelpButton", jsx3.gui.ImageButton, null, function(button) {

    /**
     * The instance initializer.
     * @param strName {String} ?the JSX name
     * @param vntLeft {int | String} ?either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
     * @param vntTop {int | String} ?either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
     * @param vntWidth {int} ?
     * @param vntHeight {int} ?
     */
    button.prototype.init = function(strName, vntLeft, vntTop, vntWidth, vntHeight) {
        //call constructor for super class (the super expects the name of the object and the function that it is an instance of)
        this.jsxsuper(strName, vntLeft, vntTop, vntWidth, vntHeight);
    };


    button.prototype.setHelpId = function(strId) {
        this.helpId = strId;
    }

    button.prototype.getHelpId = function() {
        return this.helpId;
    }

    button.prototype.setPluginId = function(strId) {
        this.pluginId = strId;
    }

    button.prototype.getPluginId = function() {
        return this.pluginId;
    }

    /**
    * Opens the context-sensitive help for this button.
    *
    * @param helpId {String} the helpId of the help area to be displayed
    * @param pluginId {String} the help pluginId to be used
    * @param objEVENT {Object} the event that triggered this action (the event object passed into the button click event\
    *                          callback)
    */
    button.prototype.openHelp = function() {
        //call constructor for super class (the super expects the name of the object and the function that it is an instance of)

//        this.helpid = helpId;
//        this.namespace = nameSpace;

        // invoke the hotkeys call back
        tibco.uxcore.Help.onHelp(this)
//        tibco.uxcore.Help.invoke(this,[objEVENT])


    };




});
