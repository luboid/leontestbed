jsx3.Class.defineClass("tibco.uxcore.gui.TextBox", jsx3.gui.TextBox, null,
    function(TEXTBOX,textBox) {
        textBox.init = function() {
            this.setDefaultProperty(this, {
                    "jsxborder": "@uxcore10@selectBox Border",
                    "jsxstyleoverride": "@uxcore10@selectBox styleoverride"
                }, true);
            this.jsxsuper.apply(this, arguments);
        };       
        
        textBox.onAfterAssemble = function() {
            this.setDefaultProperty(this, {
                    "jsxborder": "@uxcore10@selectBox Border",
                    "jsxstyleoverride": "@uxcore10@selectBox styleoverride"
                }, true);
        }                
        
        /**
         * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
         * @param objJSX {Object} 
         * @param objSetting {Array} properties list
         * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
         */
        textBox.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                if(!objJSX.getDynamicProperty(i)){
                    objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
                }
            };
            return objJSX;
        };  
    })
    
