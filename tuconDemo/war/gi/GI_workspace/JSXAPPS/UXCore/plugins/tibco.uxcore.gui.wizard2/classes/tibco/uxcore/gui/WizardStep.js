/**
* Prototype class object to create a specialized block object with built-in basic benchmarking in the repaint calls
**/
jsx3.Class.defineClass(
        "tibco.uxcore.gui.WizardStep",
        jsx3.gui.Block,
        null,
        function (block) {


            /**
             * instance initializer
             * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
             * @param vntLeft {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param vntTop {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param vntWidth {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param vntHeight {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param strHTML {String} Text/HTML markup to place in the jsx3.gui.Block instance
             */
            block.prototype.init = function(strName, vntLeft, vntTop, vntWidth, vntHeight, strHTML) {
                //call constructor for super class (the super expects the name of the object and the function that it is an instance of)
                this.jsxsuper(strName, vntLeft, vntTop, vntWidth, vntHeight, strHTML);


            };

            block.prototype.setActive = function() {
                this._setActive(true, true);
            }

            block.prototype._setActive = function(bActive, updateSiblings) {
                this.active = bActive;
                try {
                    var bg = bActive ? this.activebg : this.inactivebg;
                    if(!bg) {
                        bg = bActive ? ("background-image:url(" + tibco.uxcore.System.getServer().resolveURI("amxplugin://tibco.spm/addins/spm/images/stepsBkgrd_black.gif") + ")") : ("background-image:url(" + tibco.uxcore.System.getServer().resolveURI("amxplugin://tibco.spm/addins/spm/images/stepsBkgrd_gray.gif") + ")")
                    }
                    this.getChild(0).setBackground(bg, true).repaint();
                    var color = bActive ? this.activecolor : this.inactivecolor;
                    if(!color) {
                        color = bActive ? "#000000" : "#7E7E7E";
                    }
                    this.getChild(1).setColor(color, true);
                    var parent = this.getAncestorOfType("tibco.uxcore.gui.SteppedWizard");
                    if(bActive && parent) {
                        var me = this;
                        parent.setActiveStep(me);
                    }
                    if(bActive && updateSiblings) {
                var children = this.getParent().getChildren();
                for(var i=0; i<children.length; i++) {
                    var child = children[i];
                    if((child != this) && (child.instanceOf("tibco.uxcore.gui.WizardStep"))) {
                        child._setActive(false);
                    }
                }
                    }
                } catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
            }

            block.prototype.setActiveColor = function(color, bApply) {
                this.activecolor = color;
                if(bApply) {
                    this._setActive(this.active, false);
                }
            }

            block.prototype.getActiveColor = function() {
                return this.activecolor;
            }

            block.prototype.setActiveBackground = function(bgCss, bApply) {
                this.activebg = bgCss;
                if(bApply) {
                    this._setActive(this.active, false);
                }
            }

            block.prototype.getActiveBackground = function() {
                return this.activebg;
            }
        }
        )