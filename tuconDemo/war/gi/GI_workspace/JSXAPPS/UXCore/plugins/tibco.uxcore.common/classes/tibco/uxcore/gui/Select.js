jsx3.Class.defineClass("tibco.uxcore.gui.Select", jsx3.gui.Select, null,
    function(Select,select) {

        jsx3.gui.Select.OVERIMAGE = jsx3.resolveURI("jsxplugin://tibco.uxcore.common/images/matrix/row_Highlight.jpg");
        jsx3.html.loadImages(jsx3.gui.Select.OVERIMAGE);

        select.init = function() {
            this.jsxsuper.apply(this, arguments);
            this.setDefaultProperty(this, {
                    "jsxheight": "@uxcore10@selectBox Height",
                    "jsxborder": "@uxcore10@selectBox Border",
                    "jsxstyleoverride": "@uxcore10@selectBox styleoverride",
                    "jsxicon": "@uxcore10@selectBox Icon"
                }, false);
        };

        /**
         * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
         * @param objJSX {Object}
         * @param objSetting {Array} properties list
         * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
         */
        select.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                if(!objJSX.getDynamicProperty(i)){
                    objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
                }
            };
            return objJSX;
        };

        select.onAfterAssemble = function() {
            this.setDefaultProperty(this, {
                    "jsxheight": "@uxcore10@selectBox Height",
                    "jsxborder": "@uxcore10@selectBox Border",
                    "jsxstyleoverride": "@uxcore10@selectBox styleoverride",
                    "jsxicon": "@uxcore10@selectBox Icon"
                }, true);
        }


    })

