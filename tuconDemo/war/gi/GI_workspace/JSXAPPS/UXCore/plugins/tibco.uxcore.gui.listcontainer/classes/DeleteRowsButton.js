//jsx3.require("tibco.uxcore.gui.ListContainerButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.DeleteRowsButton",
        tibco.uxcore.gui.TreeListBuilderButton, null,
        function(BUTTON, button) {

            button.init = function(strName,a,b,c,d) {
                this.jsxsuper(strName,a,b,c,d);
                this.jsxactionid = "DeleteRows";
                this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image Delete");
            };

            button.onAfterAssemble = function() {
                this.jsxsuper();
                this.jsxactionid = "DeleteRows";
                this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image Delete");
            };

            button.getActionId = function() {
                return "DeleteRows";
            };

            button.canEnable = function(sel) {
                var lc = this.getListContainer();
                if(lc && lc.getEditMode()) {
                    var view = lc.getView();
                    if(view && view.instanceOf("tibco.uxcore.gui.TreeListBuilder")) {
                        var mysel = sel ? sel : lc.getSelectedRecordIds();
                        if(mysel && (mysel.length > 0)) {
                            return true;
                        }
                    }
                }
                return false;
            }

            button.canSortChanged = function(bCanSort) {
                // do nothing
            }
        });