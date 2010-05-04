//jsx3.require("tibco.uxcore.gui.ListContainerButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.AddRowButton",
        tibco.uxcore.gui.TreeListBuilderButton, null,
        function(BUTTON, button) {

            button.init = function(strName,a,b,c,d) {
                this.jsxsuper(strName,a,b,c,d);
                this.jsxactionid = "AddRow";
                this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image New");
            };

            button.onAfterAssemble = function() {
                this.jsxsuper();
                this.jsxactionid = "AddRow";
                this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image New");
            };

            button.getActionId = function() {
                return "AddRow";
            };

            button.canEnable = function(sel) {
                var ret = false;
                var mysel = sel;
//                jsx3.log(this.getText() + ": testing enable state");
                var lc = this.getListContainer();
                if(lc) {
                    mysel = sel ? sel : lc.getSelectedRecordIds()
                    if(lc.getEditMode()) {
                        var view = lc.getView();
                        if(view && view.instanceOf("tibco.uxcore.gui.TreeListBuilder")) {
                            ret = true;
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

            button.recordsSelected = function(arrStrIds) {
            }

            button.selectionCleared = function() {
            }

            button.modelChanged = function(intModel) {
                // do nothing
            }

            button.canSortChanged = function(bCanSort) {
                // do nothing
            }
        });