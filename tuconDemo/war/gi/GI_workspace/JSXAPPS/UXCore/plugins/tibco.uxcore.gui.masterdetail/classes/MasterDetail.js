(function(plugIn){
    jsx3.Class.defineClass("tibco.uxcore.gui.MasterDetail", jsx3.gui.Splitter, null,
    function(md) {

        if(jsx3.ide) {
            jsx3.ide.loadTemplateCatalog("prop", "properties/catalog.xml",plugIn);
        }
    
        md.prototype.init = function() {
            this.jsxsuper.apply(this, arguments);
        };

        md.prototype.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                if(objJSX[i] || objJSX.getDynamicProperty(i)) continue;
                objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
            };
            return objJSX;
        };
        
        md.prototype.onAfterAssemble = function() {
            this.setDynamicProperty("jsxbgcolor","@uxcore@MasterDetail@SplitterBGColor",true);
            if(this.getChildren().length==2) {
                if(this.getFirstChild()){
                    this.setDefaultProperty(this.getFirstChild(), {
                      "jsxpadding": this.getOrientation()==jsx3.gui.Splitter.ORIENTATIONV?"@uxcore@MasterDetail@TopPadding":"@uxcore@MasterDetail@LeftPadding"
                    }, true);
                }
                if(this.getLastChild()){
                    this.setDefaultProperty(this.getFirstChild(), {
                      "jsxpadding": this.getOrientation()==jsx3.gui.Splitter.ORIENTATIONV?"@uxcore@MasterDetail@BottomPadding":"@uxcore@MasterDetail@RightPadding"
                    }, true);
                }
            }
            this.toggleSplImg();
        }
        
        md.prototype.setEnabled = function(value) {
            var ret = this.jsxsuper(value);
            this.toggleSplImg().repaint();
            return ret;
        }
        
        md.prototype.toggleSplImg = function() {
            if(this.getEnabled()==undefined || this.getEnabled()==jsx3.gui.Form.STATEENABLED) {
                this.setDynamicProperty("jsxvsplitimage","@uxcore@MasterDetail@SplitterHImage",true);
                this.setDynamicProperty("jsxhsplitimage","@uxcore@MasterDetail@SplitterVImage",true);
            } else {
                this.setDynamicProperty("jsxvsplitimage",null,true);
                this.setDynamicProperty("jsxhsplitimage",null,true);
                this.setHSplitImage("");
                this.setVSplitImage("");
            }
            return this;
        }
        
        md.prototype.getDetailPromptText = function() {
            return this.detailPromptText || plugIn.getServer().getDynamicProperty("@uxcore@MasterDetail@DetailPromptText");
        }
        
        md.prototype.setDetailPromptText = function(text) {
            this.detailPromptText = text;
            if (this.getChildren()[1].getDescendantOfName("objDetailPromptText")) {
                this.getChildren()[1].getDescendantOfName("objDetailPromptText").setText(this.getDetailPromptText()).repaint();
            }
        }

        md.prototype.showDetailPromptText = function() {
            if (!this.getChildren()[1].getDescendantOfName("objDetailPromptText")) {
                var objText = new jsx3.gui.Block("objDetailPromptText", "0", "50%", "100%");
                objText.setText(this.getDetailPromptText()).setTextAlign(jsx3.gui.Block.ALIGNCENTER);
                objText.setFontName("Arial").setFontSize("16").setFontWeight("Bold").setColor("A1A1A1");
                objText.setRelativePosition(jsx3.gui.Block.ABSOLUTE).setCSSOverride("margin-top:-8px;");
                this.getChildren()[1].setChild(objText, jsx3.app.Model.PERSISTNONE).repaint();
            }
            return this;
        }
        
        md.prototype.hideDetailPromptText = function() {
            if (this.getChildren()[1].getDescendantOfName("objDetailPromptText")) {
                this.getChildren()[1].removeChild(this.getChildren()[1].getDescendantOfName("objDetailPromptText"));
            }
            return this;
        }
    })
    
})(this);