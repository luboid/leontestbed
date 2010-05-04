jsx3.Class.defineClass("tibco.uxcore.gui.StackGroupBlock", jsx3.gui.Block, null, 
    function(BLOCK, block) {}
);

jsx3.Class.defineClass("tibco.uxcore.gui.StackGroup", jsx3.gui.StackGroup, null,
    function(STACKGROUP,stackGroup) {
      
        stackGroup.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            this.setDefaultProperty(objParent, {
                "jsxborder" : this.getOrientation()==0 ? "@uxcore10@StackGroup Border H" : "@uxcore10@StackGroup Border V"
            }, true);
            this.setDefaultProperty(this, {
                "jsxbarsize" : "@uxcore10@StackGroup Bar Size"
            }, true);
            return ret;
        };

        /**
         * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
         * @param objJSX {Object}
         * @param objSetting {Array} properties list
         * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
         */
        stackGroup.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                if(!objJSX.getDynamicProperty(i)){
                    objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
                }
            };
            return objJSX;
        };
    }
);
    
