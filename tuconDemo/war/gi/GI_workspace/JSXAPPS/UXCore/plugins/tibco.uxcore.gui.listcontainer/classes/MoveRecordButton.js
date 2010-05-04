//jsx3.require("tibco.uxcore.gui.ListContainerButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.MoveRecordButton",
        tibco.uxcore.gui.TreeListBuilderButton, null,
        function(BUTTON, button) {

            button.setActionId = function(strActionId) {
                if((strActionId == "MoveIn") || (strActionId == "MoveOut") || (strActionId == "MoveUp") || (strActionId == "MoveDown")) {
                    this.jsxactionid = strActionId;
                }
                else {
                    delete this.jsxactionid;
                }
                this.initIcon(true);
                return this;
            };

            button.initIcon = function(bRepaint) {
                var id = this.getActionId();
                if(id == "MoveDown") {
                    this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image Move Down");
                }
                else if(id == "MoveOut") {
                    this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image Move Left");
                }
                else if(id == "MoveIn") {
                    this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image Move Right");
                }
                else if(id == "MoveUp") {
                    this.jsxicon = this.setDynamicProperty("jsxicon","@uxcore10@Btn Image Move Up");
                }
                else {
                    this.jsxicon = this.setDynamicProperty("jsxicon",null);
                }
                if(bRepaint) {
                    this.repaint();
                }
            }

            button.init = function(strName,a,b,c,d) {
                this.jsxsuper(strName,a,b,c,d);
                this.initIcon();
            };

            button.onAfterAssemble = function() {
                this.jsxsuper();
                this.initIcon();
            };

            button.getActionId = function() {
                return this.jsxactionid ? this.jsxactionid : "MoveOut";
            };

            button.canSortChanged = function(bCanSort) {
                this.checkEnabledState();
            }

            button.canEnable = function(sel) {
                var ret = false;
                var mysel = sel;
//                jsx3.log(this.getText() + ": testing enable state");
                var lc = this.getListContainer();
                if(lc) {
                    mysel = sel ? sel : lc.getSelectedRecordIds()
                    if(lc.getEditMode()) {
                        var view = lc.getView();
                        if(view && view.instanceOf("tibco.uxcore.gui.TreeListBuilder") && (view.getCanSort() === jsx3.Boolean.FALSE)) {
                            if((view.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) || (this.getActionId() == "MoveUp") || (this.getActionId() == "MoveDown")) {
                                if(mysel && (mysel.length > 0)) {
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
        });