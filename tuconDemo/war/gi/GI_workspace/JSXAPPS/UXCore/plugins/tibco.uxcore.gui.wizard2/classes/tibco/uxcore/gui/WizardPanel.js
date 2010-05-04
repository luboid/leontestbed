/**
* Prototype class object to create a specialized block object with built-in basic benchmarking in the repaint calls
**/
jsx3.Class.defineClass(
        "tibco.uxcore.gui.WizardPanel",
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

            block.prototype.onSetParent = function(objChild, intPersist, strSourceURL, strNS) {
                var ret = this.jsxsuper(objChild, intPersist, strSourceURL, strNS);
                delete this.buttonStatesArr;
                return ret;
            }

            block.prototype.getButtonStates = function() {
                try {
                if(!this.buttonStatesArr) {
                    this.buttonStatesArr = new Array();
                    if(this.buttonStates) {
                        var btnStateArr = this.buttonStates.split(",");
                        for(var i=0; i<btnStateArr.length; i++) {
                            var vals = btnStateArr[i].split(":",2);
                            var state = tibco.uxcore.gui.WizardButton.ENABLED;
                            var stateStr = vals[1].toUpperCase();
                            switch(stateStr) {
                                case "ENABLED":
                                    break;
                                case "DISABLED":
                                    state = tibco.uxcore.gui.WizardButton.DISABLED;
                                    break;
                                case "HIDDEN":
                                    state = tibco.uxcore.gui.WizardButton.HIDDEN;
                                    break;
                                default:
                                    state = tibco.uxcore.gui.WizardButton.ENABLED;
                            }
                            this.buttonStatesArr[vals[0]] = state;
                        }
                    }
                }
//                    else {
//                    jsx3.log("ButtonStatesArr already exists!");
//                }
                } catch(ex) {tibco.uxcore.System.logException(ex)}
                return this.buttonStatesArr;
            }

            block.prototype.getInitialButtonState = function(btnName) {
                var ret = tibco.uxcore.gui.WizardButton.ENABLED;
                var states = this.getButtonStates();
                if(states) {
                var val = states[btnName];
                if(val) {
                    ret = val;
                }
                }
                return ret;
            }
        }
        )