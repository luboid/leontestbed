//jsx3.require("tibco.uxcore.gui.ListContainerButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.AddChildButton",
        tibco.uxcore.gui.TreeListBuilderButton, null,
        function(BUTTON, button) {

            button.init = function(strName,a,b,c,d) {
                this.jsxsuper(strName,a,b,c,d);
                this.jsxactionid = "AddChild";
                this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image New Child");
            };

            button.onAfterAssemble = function() {
                this.jsxsuper();
                this.jsxactionid = "AddChild";
                this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image New Child");
            };

            button.getActionId = function() {
                return "AddChild";
            };

            button.canEnable = function(sel) {
                var ret = false;
                var mysel = sel;
                var lc = this.getListContainer();
                if(lc) {
                    mysel = sel ? sel : lc.getSelectedRecordIds();
                    if(lc && lc.getEditMode()) {
                        var view = lc.getView();
                        if(view && view.instanceOf("tibco.uxcore.gui.TreeListBuilder")) {
                            if(view.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
                                if(mysel && (mysel.length == 1)) {
                                    ret = true;
                                }
                            }
                        }
                    }
                }
                var defaultValue = ret;
                var editMode = lc?lc.getEditMode():null;
                var listView = lc?lc.getView():null;
                var rendModel = (listView && listView.getRenderingModel)?listView.getRenderingModel():null;
                var userVal = this.doEvent("canEnable",{defaultValue:defaultValue,selectedRecordIds:mysel,listContainer:lc,editMode:editMode,listView:listView,renderingModel:rendModel,actionId:this.getActionId()});
                if(typeof userVal != "undefined") {
                    ret = userVal
                }
                return ret;
            }

            button.canSortChanged = function(bCanSort) {
                // do nothing
            }
        });