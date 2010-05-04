//jsx3.require("tibco.uxcore.gui.IconButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.RefreshButton",
        tibco.uxcore.gui.LCIconButton, null,
        function(BUTTON, button) {

            /**
             * Set default style (font, color and background images) for this button, this function will be called at init or onAfterAssemble function.
             */
            button.setDefaultStyle = function() {
                this.jsxsuper();
                this.setDefaultProperty(this, {
                    "jsximage" : "@uxcore10@RefreshButton Image"
                }, true);
            };

            button.onSetParent = function(objParent) {
                var ret = this.jsxsuper(objParent);
                this.subscribe(jsx3.gui.Interactive.EXECUTE, this, this.doRefresh);
                return ret;
            };

            button.doRefresh = function() {
                if(this.getListContainer()) {
                    this.getListContainer().refresh();
                }
            };

        });