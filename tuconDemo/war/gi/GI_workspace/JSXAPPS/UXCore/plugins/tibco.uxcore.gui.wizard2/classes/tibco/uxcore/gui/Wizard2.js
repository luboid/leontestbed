(function(plugIn) {

        if(jsx3.ide) {
                jsx3.log("about to load Wizard2 catalogs");
                jsx3.ide.loadTemplateCatalog("prop", "properties/catalog.xml", plugIn);
                jsx3.ide.loadTemplateCatalog("event", "events/catalog.xml", plugIn);
                jsx3.log("loaded catalog");
        }
})(this);

/**
* Prototype class object to create a specialized block object with built-in basic benchmarking in the repaint calls
**/
jsx3.Class.defineClass(
        "tibco.uxcore.gui.Wizard2",
        jsx3.gui.Block,
        null,
        function (block) {

            block.prototype.panels = new jsx3.util.List(0);

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
                try {
                    this.panels = new jsx3.util.List(0);
                    delete this.contentPane;
                    delete this.buttonPanel;
                    var cp = this.getContentPane();
                    var first = this.getCurrentPanel();
                // try to find the content pane and start panel, if specified
                if(!first) {
                    if(!this.getCurrentPanel() && this.initialPanelName) {
                        this.jumpToPanel(null, this.initialPanelName);
                        first = this.getCurrentPanel();
                    }
                    else if(cp) {
                        first = cp.getChild(0);
                        if(first) {
                            this.jumpToPanel(null, first.getName(), bRepaint);
                        }
                    }
                    if(first) {
                        var children = cp.getChildren()
                        for(var i=0; i<children.length; i++) {
                            var child = children[i];
                            if((child != first) && (child.instanceOf("tibco.uxcore.gui.WizardPanel"))) {
                                child.setDisplay(jsx3.gui.Block.DISPLAYNONE, true).repaint();
                            }
                        }
                    }
                }
                } catch(ex) {}
                return ret;
            }

            block.prototype.setContentPaneName = function(pane) {
                return this._setContentPane(pane, true);
            }

            block.prototype._setContentPane = function(pane, wasExplicit) {
                if(typeof(pane) == "string") {
                    var paneObj = this.getDescendantOfName(pane);
                    if(!paneObj) {
                        paneObj = tibco.uxcore.System.getServer().getJSXByName(pane);
                    }
                    if(paneObj) {
                        this.contentPane = paneObj;
                        this.contentPaneName = paneObj.getName();
                        this.contentPaneExplicit = wasExplicit;
                    }
                }
                else {
                    this.contentPane = pane;
                    this.contentPaneName = pane.getName();
                    this.contentPaneExplicit = wasExplicit;
                }
            }

            block.prototype.getContentPaneName = function() {
                return this.contentPaneName;
            }

            block.prototype.getContentPane = function() {
                if(!this.contentPane && this.contentPaneName) {
                    this._setContentPane(this.contentPaneName, true);
                }
                return this.contentPane;
            }

            block.prototype.setInitialPanel = function(panel) {
                this.initialPanelName = panel;
            }

            block.prototype.getInitialPanel = function() {
                return this.initialPanelName;
            }

            block.prototype.setButtonPanelName = function(panel) {
                this.buttonPanelName = panel;
            }

            block.prototype.getButtonPanelName = function() {
                return this.buttonPanelName;
            }

            block.prototype.getButtonPanel = function() {
                if(!this.buttonPanel && this.buttonPanelName) {
                    var paneObj = this.getDescendantOfName(this.buttonPanelName);
                    if(!paneObj) {
                        paneObj = tibco.uxcore.System.getServer().getJSXByName(this.buttonPanelName);
                    }
                    if(paneObj) {
                        this.buttonPanel = paneObj;
                    }
                    else {
                        alert("Button Panel name has not been set!");
                    }
                }
                return this.buttonPanel;
            }

            //            block.prototype.setCurrentPanel = function(panel) {
//                this.jumpToPanel(null, panel);
//            }
//
            block.prototype.getCurrentPanelName = function() {
                var curr = this.getCurrentPanel();
                return curr ? curr.getName() : null;
            }

            block.prototype.getCurrentPanel = function() {
                if(this.panels.size() == 0) {
                    return null;
                }
                return this.panels.get(this.panels.size() - 1);
            }

            block.prototype.doCancel = function(objEvent) {
                if(!this.getContentPane()) {
                    return;
                }
                var me = this;
                var curr = this.getCurrentPanel();
                var children = this.getContentPane().getChildren()
                for(var i=0; i<children.length; i++) {
                    var child = children[i];
                    if(child.instanceOf("tibco.uxcore.gui.WizardPanel")) {
                        child.doEvent("wizardcancel", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strCURRENTPANEL:curr.getName()});
                    }
                }
            }

            block.prototype.doFinish = function(objEvent) {
                if(!this.getContentPane()) {
                    return;
                }
                var me = this;
                var curr = this.getCurrentPanel();
                var children = this.getContentPane().getChildren()
                for(var i=0; i<children.length; i++) {
                    var child = children[i];
                    if(child.instanceOf("tibco.uxcore.gui.WizardPanel")) {
                        child.doEvent("wizardfinish", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strCURRENTPANEL:curr.getName()});
                    }
                }
            }

            block.prototype.doCustomNav = function(objEvent) {
                if(!this.getContentPane()) {
                    return;
                }
                var me = this;
                var curr = this.getCurrentPanel();
                var children = this.getContentPane().getChildren()
                for(var i=0; i<children.length; i++) {
                    var child = children[i];
                    if(child.instanceOf("tibco.uxcore.gui.WizardPanel")) {
                        child.doEvent("wizardcustomnav", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strCURRENTPANEL:curr.getName()});
                    }
                }
            }

			block.prototype.doRevert = function(objEvent){
                if(!this.getContentPane()) {
                    return;
                }
                var me = this;
                var curr = this.getCurrentPanel();
                if(curr.instanceOf("tibco.uxcore.gui.WizardPanel")) {
					curr.doEvent("wizardrevert", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strCURRENTPANEL:curr.getName()});
                }
			}

            block.prototype.nextPanel = function(objEvent) {
                if(!this.getContentPane()) {
                    return;
                }
                var curr = this.getCurrentPanel();
                if(curr) {
                    var next = null;
                    var me = this;
                    var nextName = curr.doEvent("wizardnext", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strCURRENTPANEL:curr.getName()});
                    if(nextName) {
                        if(nextName == "NONE") {
                            return;
                        }
                        next = this.getContentPane().getDescendantOfName(nextName, false, true);
                    }
                    if(!next) {
                        next = this._findNextPanel();
                    }
                    if(next) {
                        if(!next.instanceOf("tibco.uxcore.gui.WizardPanel")) {
                            jsx3.log(pane + " is not a valid child panel.  It must be an instance of tibco.uxcore.gui.WizardPanel");
                            return;
                        }
                        curr.setDisplay(jsx3.gui.Block.DISPLAYNONE, true).repaint();
                        var me = this;
                        curr.doEvent("wizardhide", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strNEXTPANEL:next.getName()});
                        next.doEvent("wizardshow", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strLASTPANEL:curr.getName()});
                        this.applyButtonStates(next);
                        next.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                        this.currentPanel = next.getName();
                        this.panels.add(next);
                    }
                }
            };

            block.prototype.applyButtonStates = function(panel, bRepaint) {
                var me = this;
				me.panel = panel;
                setTimeout(function() {
                var bPane = me.getButtonPanel();
                if(bPane) {
                    var cArr = bPane.getDescendantsOfType("tibco.uxcore.gui.WizardButton");
                    for(var i=0; i<cArr.length; i++) {
                        var btn = cArr[i];
                        var state = me.panel.getInitialButtonState(btn.getName());
                            switch(state + "") {
                               case tibco.uxcore.gui.WizardButton.ENABLED + "":
                                   btn.setEnabled(jsx3.gui.Form.STATEENABLED, true).setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                                   break;
                                case tibco.uxcore.gui.WizardButton.DISABLED + "":
                                    btn.setEnabled(jsx3.gui.Form.STATEDISABLED, true).setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                                    break;
                                case tibco.uxcore.gui.WizardButton.HIDDEN + "":
                                    btn.setEnabled(jsx3.gui.Form.STATEENABLED, true).setDisplay(jsx3.gui.Block.DISPLAYNONE, true).repaint();
                                    break;
                                default:
                                    btn.setEnabled(jsx3.gui.Form.STATEENABLED, true).setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                                    break;
                            }
                        if(bRepaint) {
                            bPane.repaint();
                        }
                    }
                }
                },0);
            }

            block.prototype._findNextPanel = function() {
                var curr = this.getCurrentPanel();
                var next = null;
                if(curr) {
                var idx = curr.getChildIndex();
                if((idx != -1) && (idx != (this.getContentPane().getChildren().length - 1))) {
                    for(var i = idx + 1; i < this.getContentPane().getChildren().length; i++) {
                        var child = this.getContentPane().getChild(i);
                        if(child.instanceOf("tibco.uxcore.gui.WizardPanel")) {
                            next = child;
                            break;
                        }
                    }
                }
                else if(idx == -1) {
                    jsx3.log("-1 Index current panel is: " + curr);
                }
                }
                return next;
            }
			block.prototype._findPrevPanel = function() {
                var curr = this.getCurrentPanel();
                var prev = null;
                if(curr) {
	                var idx = curr.getChildIndex();
	                if((idx != -1) && (idx != 0)) {
	                    for(var i = idx-1; i >=0; i--) {
	                        var child = this.getContentPane().getChild(i);
	                        if(child.instanceOf("tibco.uxcore.gui.WizardPanel")) {
	                            prev = child;
	                            break;
	                        }
	                    }
	                }
	                else if(idx == -1) {
	                    jsx3.log("-1 Index current panel is: " + curr);
	                }
                }
                return prev;
			}
            block.prototype.prevPanel = function(objEvent) {
                var curr = this.getCurrentPanel();
                if(curr) {
                    var prev = null;
                    var me = this;
                    var prevName = curr.doEvent("wizardprev", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strCURRENTPANEL:curr.getName()});
                    if(prevName) {
                        if(prevName == "NONE") {
                            jsx3.log("Not advancing to the previous panel");
                            return;
                        }
                        prev = this.getContentPane().getDescendantOfName(prevName, false, true);
                        if(prev) {
                           curr.setDisplay(jsx3.gui.Block.DISPLAYNONE, true).repaint();
                            curr.doEvent("wizardhide", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strNEXTPANEL:prev.getName()});
                            prev.doEvent("wizardshow", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strLASTPANEL:curr.getName()});
                            this.applyButtonStates(prev);
                           prev.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                            var idx = this.panels.indexOf(prev);
                            if(idx != -1) {
                                if(idx == (this.panels.size() - 1)) {
                                    return; // it's already the last panel
                                }
                                else {
                                    this.panels = this.panels.slice(0,idx + 1);
                                }
                            }
                            else {
                                this.panels.add(prev);
                            }
                           this.currentPanel = prev.getName();
                        }
                    }
                    else {
                        prev = this._findPrevPanel();
                        if(prev) {
                           curr.setDisplay(jsx3.gui.Block.DISPLAYNONE, true).repaint();
                            curr.doEvent("wizardhide", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strNEXTPANEL:prev.getName()});
                            prev.doEvent("wizardshow", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strLASTPANEL:curr.getName()});
                            this.applyButtonStates(prev);
                           prev.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                           this.currentPanel = prev.getName();
                            var idx = this.panels.indexOf(prev);
                            if(idx != -1) {
                                if(idx == (this.panels.size() - 1)) {
                                    return; // it's already the last panel
                                }
                                else {
                                    this.panels = this.panels.slice(0,idx + 1);
                                }
                            }
                            else {
                                this.panels.add(prev);
                            }
                        }
                    }
                }
            };

//            block.prototype._findPrevPanel = function() {
//                var curr = this.getCurrentPanel();
//                var prev = null;
//                if(curr) {
//                    try {
//                        prev = this.panels.get(this.panels.size() - 2);
//                    } catch(ex) {}
//                }
//                return prev;
//            }

            block.prototype.cancelWizard = function(objEvent) {
                jsx3.log("Cancel");
            };

            block.prototype.finishWizard = function(objEvent) {
                jsx3.log("Finish");
            };

            block.prototype.closeWizard = function(objEvent) {
                jsx3.log("Close");
            };

            block.prototype.jumpToPanel = function(objEvent, panelName, bRepaint) {

                var panel = null;
                if(!this.getContentPane()) {
                    panel = this.getDescendantOfName(panelName);
                    if(!panel.instanceOf("tibco.uxcore.gui.WizardPanel")) {
                        jsx3.log(pane + " is not a valid child panel.  It must be an instance of tibco.uxcore.gui.WizardPanel");
                        return;
                    }
                    if(panel) {
                        this._setContentPane(panel.getParent(), false);
                    }
                    else {
                        panel = tibco.uxcore.System.getServer().getJSXByName(panelName);
                        if(panel) {
                            this._setContentPane(panel.getParent(), false);
                        }
                    }
                }
                else {
                    jsx3.log("Jump - content pane not null");
                    panel = this.getContentPane().getDescendantOfName(panelName, false, true);
                    jsx3.log("Jump - Panel: " + panel);
                    if(!panel && tibco.uxcore.System.getServer().getJSXByName(panelName) && !this.contentPaneExplicit) {
                        jsx3.log("Trying again!");
                        // try using a different content pane, but ONLY if there at least exists an object with this name
                        // we don't want to discard the content pane just because a specified panel is completely missing
                        delete this.contentPaneName;
                        delete this.contentPane;
                        this.jumpToPanel(objEvent, panelName, bRepaint);
                        return;
                    }
                }
                if(panel) {
                    if(!panel.instanceOf("tibco.uxcore.gui.WizardPanel")) {
                        jsx3.log(pane + " is not a valid child panel.  It must be an instance of tibco.uxcore.gui.WizardPanel");
                        return;
                    }
                    if(this.panels.size() > 0) {
                        var idx = this.panels.indexOf(panel);
                        if(idx != -1) {
                            if(idx == (this.panels.size() - 1)) {
                                return; // it's already the last panel
                            }
                            else {
                                var prev = this.panels.get(this.panels.size() - 1);
                                prev.setDisplay(jsx3.gui.Block.DISPLAYNONE, true).repaint();
                                var me = this;
                                prev.doEvent("wizardhide", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strNEXTPANEL:panel.getName()});
                                this.panels = this.panels.slice(0,idx + 1);
                                this.currentPanel = panel.getName();
                                panel.doEvent("wizardshow", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strLASTPANEL:prev.getName()});
                                this.applyButtonStates(panel,bRepaint);
                                panel.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                            }
                        }
                        else {
                            var me = this;
                            if(this.panels.size() > 0) {
                                var prev = this.panels.get(this.panels.size() - 1);
                                prev.setDisplay(jsx3.gui.Block.DISPLAYNONE, true).repaint();
                                prev.doEvent("wizardhide", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strNEXTPANEL:panel.getName()});
                            }
                            panel.doEvent("wizardshow", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strLASTPANEL:prev.getName()});
                            this.applyButtonStates(panel, bRepaint);
                            panel.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                            this.currentPanel = panel.getName();
                            this.panels.add(panel);
                        }
                    }
                    else {
                        var me = this;
                        panel.doEvent("wizardshow", {objWIZARD:me,objBUTTON:(objEvent ? objEvent.wizButton : null),objEVENT:objEvent,strLASTPANEL:null});
                        this.applyButtonStates(panel, bRepaint);
                       panel.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true).repaint();
                       this.currentPanel = panel.getName();
                       this.panels.add(panel);
                    }
                }
            };

            /* @JSC :: begin BENCH */

            /**
             * Updates the view of this object by calling <code>paint()</code> and replacing the current view with the
             * returned HTML. This method has no effect if this object is not currently displayed.
             * <br /><br />
             * Automatically prints abasic benchmarking line on this function to the BENCHMARK log (at the debug log-level)
             *
             * @return {String} the result of calling <code>paint()</code> or <code>null</code> if this object is not displayed.
             * @see #paint()
             */
            block.prototype.repaint = function() {
                var before = new Date().getTime();
                var dump = this.jsxsuper();
                var since = new Date().getTime() - before
                tibco.uxcore.util.Log.BENCHMARK.debug("Repainting the Block " + this.getName() + " takes about " + since + " ms");
                return dump
            };

            block.prototype.paintText = function() {
              return (this.getText()) ? this.getText() : ""; //jsx3.gui.Block.DEFAULTTEXT;
            };

            block.prototype.getInnerClientDimensions = function(axis, intIndex) {
              var cachedDims = this.getCachedClientDimensions(axis,intIndex);
              if (! cachedDims) this.cacheAllInnerClientDims(axis);
              return this.getCachedClientDimensions(axis,intIndex) ||
                     {boxtype:"box", left:0, top:0, width:0, height:0, parentwidth:0, parentheight:0};
            };
            /* @JSC :: end */

            block.prototype.cacheAllInnerClientDims = function(axis) {
              // TODO: adjust following to use the explicit box profile for the lg, so that border size is accounted for (layoutgrids can implement borders)
              //find out the dimension for the splitter's parent container
              var pArr = this.getAbsolutePosition(this.getParent())
              var myImplicit = this.getParent().getClientDimensions(this);

              //get the recommended (parent-width/height) or explicit (width/height) and convert to recommended
              var myWidth = pArr.W;
              var myHeight = pArr.H;

              // get true dimensions for the children
              var rows = this._getTrueSizeArray(axis, true, myHeight);
              var cols = this._getTrueSizeArray(axis, false, myWidth);

              var numCells = rows.length * cols.length;
              var numChildren = this.getChildren().length;
              var numCalcs = Math.min(numCells, numChildren);

              var n = 0;
              var t = 0;
              for (var rowIndex = 0; rowIndex < rows.length; rowIndex++) {
                var l = 0;

                for (var colIndex = 0; colIndex < cols.length && n < numCalcs; colIndex++) {
                  this.setCachedClientDimensions(n++,
                      {boxtype:"box", left:l, top:t, width:"100%", height:"100%",
                        parentwidth:cols[colIndex], parentheight:rows[rowIndex]});

                  l += cols[colIndex];
                }

                t += rows[rowIndex];
              }
            };

            block.prototype._getTrueSizeArray = function(axis, bRow, intSize) {
//              var cachedField = bRow ? "_jsxcachedrows" : "_jsxcachedcols";

              //get the box profile for this layout grid (basically a simple box, inherited from jsx3.gui.Block)
//              var objProfile = this.getBoxProfile(true);

              //used cached dimension for repeated access (comes via pull-based request to getClientDimensions)
//              if (objProfile[cachedField] instanceof Array) return objProfile[cachedField];

              //get the clientHeight (which is also the same as height, since layout grids don't implement padding, borders, and margins)
//              if (intSize == null || isNaN(intSize))
//                intSize = bRow ? pArr.H : pArr.W;
              if (isNaN(intSize)) return [];

              var intTotal = 0;
              var intWild = 0;

              var divs = null;
              if(bRow) {
                  if(axis == axisName1) {
                     divs =  axis1Rows;
                  }
                  else if(axis == axisName2) {
                     divs =  axis2Rows;
                  }
                  else if (axis == axisName3) {
                     divs =  axis3Rows;
                  }
              }
              else {
                  if(axis == axisName1) {
                     divs =  axis1Cols;
                  }
                  else if(axis == axisName2) {
                     divs =  axis2Cols;
                  }
                  else if (axis == axisName3) {
                     divs =  axis3Cols;
                  }
              }
              if(!(divs instanceof Array))
                divs = divs != null  ? divs.split(/\s*,\s*/g) : [];
              var objNew = new Array(divs.length);

              //loop through implicit dimensions to create exlicit version
              for (var i = 0; i < divs.length; i++) {
                var div = divs[i];
                if (div == "*") {
                  objNew[i] = "*";
                } else if (typeof(div) == "string" && div.indexOf("%") >= 0) {
                  var intVal = parseInt(div);
                  objNew[i] = isNaN(intVal) ? "*" : (intVal / 100) * intSize;
                } else {
                  var intVal = parseInt(div);
                  objNew[i] = isNaN(intVal) ? "*" : intVal;
                }

                if (objNew[i] == "*") intWild++;
                else intTotal += objNew[i];
              }

              if (intWild > 0) {
                var wildSize = Math.max(0, intSize - intTotal) / intWild;

                for (var i = 0; i < objNew.length; i++)
                  if (objNew[i] == "*") objNew[i] = wildSize;
              }

              // Round each row/col to an integer and distribute the remainder as full pixels among the rows/cols.
              // This algorithm will not necessarily distribute pixels to the most "deserving" rows/cols.
              //     (e.g. [10.9, 1.1] will give the extra pixel to the 1.1).
              var decimal = 0;
              for (var i = 0; i < objNew.length; i++) {
                decimal += objNew[i] % 1;
                objNew[i] = Math.floor(objNew[i]);
                if (decimal >= 1 || (i == objNew.length - 1 && decimal > 0.5)) {
                  objNew[i]++;
                  decimal--;
                }
              }

//              objProfile[cachedField] = objNew;
              return objNew;
            };
        }
        )