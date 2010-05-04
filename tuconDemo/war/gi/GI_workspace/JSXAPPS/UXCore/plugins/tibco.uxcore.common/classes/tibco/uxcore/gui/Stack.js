jsx3.Class.defineClass("tibco.uxcore.gui.Stack", jsx3.gui.Stack, null,
    function(STACK,stack) {

        jsx3.gui.Stack.CAPTION_BORDER = "0;0;0;0";

        stack.onSetParent = function(objParent){
            var ret=this.jsxsuper(objParent);
            if(ret){
                this.initProperties(objParent);
            }
            return ret;
        };

        stack.initProperties = function(objParent) {
            var childBlock = this.getChildren()[0];
            var o = objParent.getOrientation()==0 ? "H" : "V";
            this.setDefaultProperty(childBlock, {
                    "jsxpadding": "@uxcore10@Stack Padding",
                    "jsxbgcolor": "@uxcore10@Stack Background Color",
                    "jsxborder" : "@uxcore10@Stack Border " + o
            }, true);
            this.setDefaultProperty(this, {
                    "jsxpadding"   : "@uxcore10@Stack Label Padding",
                    "jsxfontname"  : "@uxcore10@Title Font Name",
                    "jsxfontsize"  : "@uxcore10@Title Font Size",
                    "jsxfontweight": "@uxcore10@Title Font Weight",
                    "jsxcolor"     : "@uxcore10@Title Color",
                    "jsxbg"        : "@uxcore10@Stack Background Image " + o
                }, true);
        };

        stack.onAfterPaint = function() {
            if(jsx3.CLASS_LOADER.IE) return;
            try{
                var v = this.getParent().getOrientation() !=0;
                if(v) {
                    var html = this.getText(), textNode = this.getRendered().childNodes[0].childNodes[0];
                    if(html.indexOf("<") == -1) {
                      textNode.innerHTML = 
                         "<div style='text-align:center;margin-left:-1px;'>" + html.split("").join("<br/>") + "</div>";
                    }
                }
            } catch(e) {}
        };

        /**
         * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
         * @param objJSX {Object}
         * @param objSetting {Array} properties list
         * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
         */
        stack.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                if(!objJSX.getDynamicProperty(i)){
                    objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
                }
            };
            return objJSX;
        };
    })

