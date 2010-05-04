(function(plugIn){
//jsx3.require("tibco.uxcore.gui.LCToggleIconButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.ViewButton",
        tibco.uxcore.gui.LCToggleIconButton, null,
        function(BUTTON, button) {

            BUTTON.DEFAULTHEIGHT = 18;
            BUTTON.DEFAULTWIDTH = 17;

            /*
            * instance initializer
            * @param strName {String} ¨C unique name distinguishing this object from all other JSX GUI objects in the JSX application
            */
            button.init = function(strName) {
                this.jsxsuper(strName);
            }

           button.onAfterPaint = function(objGUI) {
                this.setAffordance(BUTTON.DEFAULT_AFFORDANCE);
                this.setFocusStyle(BUTTON.FOCUS_STYLE);
                this.setWidth(BUTTON.DEFAULTWIDTH);
                this.setHeight(BUTTON.DEFAULTHEIGHT);
           }


        });

})(this);