(function(plugIn){

//jsx3.require("tibco.uxcore.gui.LCToggleIconButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.HideShowButton",
        tibco.uxcore.gui.LCToggleIconButton, null,
        function(BUTTON, button) {

            /**
             * Set default style (font, color and background images) for this button, 
             * this function will be called at init or onAfterAssemble function.
             */
            button.setDefaultStyle = function() {
                this.jsxsuper();
                this.jsxstate = tibco.uxcore.gui.Button.STATE_OFF;
                this.setDefaultProperty(this, {
                    "jsxwidth"    : "@uxcore10@HideShowButton Width",
                    "jsxheight"   : "@uxcore10@HideShowButton Height",
                    "jsximage"    : "@uxcore10@HideShowButton Image OFF",
                    "jsxonimage"  : "@uxcore10@HideShowButton Image ON",
                    "jsxdownimage": "@uxcore10@HideShowButton Image ON"
                }, true, true);
            };


            button.onSetParent = function(objParent) {
                var ret = this.jsxsuper(objParent);
                this.subscribe(jsx3.gui.Interactive.EXECUTE, this, this.doExecute);
                return ret;
            };

            button.doExecute = function() {
                var newState = this.getState() == tibco.uxcore.gui.Button.STATE_ON ? false : true;
                if(this.getListContainer()) {
                    this.getListContainer().setVisibility(newState, this);
                }
            };

        });

})(this);