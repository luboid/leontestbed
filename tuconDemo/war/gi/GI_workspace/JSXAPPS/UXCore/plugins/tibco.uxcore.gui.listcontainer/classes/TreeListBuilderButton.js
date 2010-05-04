//jsx3.require("tibco.uxcore.gui.ListContainerButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.TreeListBuilderButton",
        tibco.uxcore.gui.ActionButton, null,
        function(BUTTON, button) {


            /*
            * instance initializer
            * @param strName {String} ?unique name distinguishing this object from all other JSX GUI objects in the JSX application
            * @param intWidth {int} ?width (in pixels) of the object; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
            * @param strText {String} ?text to display in the given button; if null JSXTABLEHEADERCELL.DEFAULTTEXT is used
            */
            button.init = function(strName,a,b,c,d) {
                this.jsxsuper(strName,a,b,c,d);
                this.setEnabled(jsx3.gui.Form.STATEDISABLED);
            };

            button.onAfterAssemble = function() {
                this.jsxsuper();
                this.setEnabled(jsx3.gui.Form.STATEDISABLED);
            };

            button.setActionId = function(strActionId) {
            };

            button.recordsSelected = function(arrStrIds) {
                this.checkEnabledState(arrStrIds);
            }

            button.checkEnabledState = function(sel) {
//                jsx3.log(this.getText() + ": checking enable state from " + (new jsx3.lang.Exception("CES")).printStackTrace());
                var enable = this.canEnable(sel);
//                jsx3.log(this.getText() + ": can enable: " + enable);
                var state = this.enable ? jsx3.gui.Form.STATEENABLED : jsx3.gui.Form.STATEDISABLED;
//                jsx3.log(this.getText() + ": can enable: " + state);
//                if(state === jsx3.gui.Form.STATEENABLED) {
//                    jsx3.log(this.getText() + ": STATEENABLED");
//                }
//                else {
//                    jsx3.log(this.getText() + ": STATEDDISABLED");
//                }
                this.setEnabled(this.canEnable(sel) ? jsx3.gui.Form.STATEENABLED : jsx3.gui.Form.STATEDISABLED)
            }

            button.canEnable = function(sel) {
                var ret = false;
                var mysel = sel;
//                jsx3.log(this.getText() + ": testing enable state");
                var lc = this.getListContainer();
                if(lc) {
                    mysel = sel ? sel : lc.getSelectedRecordIds()
                    if(lc.getEditMode()) {
                        //                    jsx3.log(this.getText() + ": in edit mode");
                        var view = lc.getView();
    //                    jsx3.log("cansort: '" + view.getCanSort() + "', equals FALSE: " + (view.getCanSort() === jsx3.Boolean.FALSE));
                        if(view && view.instanceOf("tibco.uxcore.gui.TreeListBuilder") && (view.getCanSort() === jsx3.Boolean.FALSE)) {
    //                        jsx3.log(this.getText() + ": is sortable treelistbuilder");
                            if(view.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
                                if(mysel && (mysel.length > 0)) {
    //                                jsx3.log(this.getText() + ": has selected rows");
    //                                jsx3.log(this.getText() + ": is enableable");
                                    ret = true;
                                }
                            }
                        }
                    }
                }
//                jsx3.log(this.getText() + ": not enableable");
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

            button.selectionCleared = function() {
                this.checkEnabledState([]);
            }

            button.editModeChanged = function(isEditMode) {
                this.checkEnabledState();
            }

            button.modelChanged = function(intModel) {
                this.checkEnabledState();
            }

            button.viewChanged = function(strNewListViewId, strOldListViewId) {
                this.checkEnabledState();
            }

            button.canSortChanged = function(bCanSort) {
                this.checkEnabledState();
            }
        });