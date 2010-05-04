(function(plugIn) {

    /**
     * Renders a Tabbed Navigation Menu Button.
     * This class publishes the following model events:
     * MENUEXECUTE ?when the user selects a menu item
     * You can provide the resource id that needs to be loaded in the CDF record so that resources will load automatically once the menu item is selected.
     * <record jsxid="1" jsxtext="golbalnav_0_0" strRsrcId="golbalnav_0_0_xml"  loadRsrc="true"  />
     * Attribute jsxtext sets the text value for menu item
     * Attribute strRsrcId sets the resource id for the resource that needs to be loaded
     * Attribute loadRsrc set to true if strRsrcId should be loaded automatically
     **/

    jsx3.require("jsx3.gui.Menu");
    jsx3.Class.defineClass(
            "tibco.uxcore.gui.TabbedNavMenuButton",
            jsx3.gui.Block,
            [jsx3.gui.Form,tibco.uxcore.gui.IActionTrigger],
            function (MENU, menu) {

                /**
                 * static field {String} MENUEXECUTE
                 * MENUEXECUTE
                 **/
                MENU.MENUEXECUTE = "MENUEXECUTE";

                MENU.Color = "#D1E6F9";
                MENU.PressedColor = "#F3DBFC";
                /**
                 * instance initializer
                 * @param strName {String} ?unique name distinguishing this object from all other JSX GUI objects in the JSX application
                 * @param vntLeft {int | String} ?either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param vntTop {int | String} ?either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param vntWidth {int | String} ?either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param vntHeight {int | String} ?either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param strHTML {String} ?Text/HTML markup to place in the jsx3.gui.Block instance
                 **/
                menu.init = function(strName, strHTML, vntLeft, vntTop, vntWidth, vntHeight) {
                    //call constructor for super class (the super expects the name of the object and the function that it is an instance of)
                    this.jsxsuper(strName, vntLeft, vntTop, vntWidth, vntHeight, strHTML);
                    var child = new jsx3.gui.Menu()
                    child.setDisplay(jsx3.gui.Block.DISPLAYNONE)
                    child.setEvent("this.getParent().selected(objEVENT, strRECORDID, objRECORD)", "jsxexecute")
                    this.setChild(child)
                    this.setEvent("this.doPressed(objEVENT)", "jsxclick")
                    this.initiaize();
                    jsx3.sleep(function(){this.initAndRegister()},null,this,false);
                }


                menu.onAfterAttach = function() {
                    this.initAndRegister();
                }

                menu.initiaize = function() {
                    var me = this
                    // remove standard background
                    this.getFirstChild().setName("contentMenu");
                    this.getFirstChild().setBackground("dummy")
                    this.getFirstChild().setXSLParam("jsxleftbuffer", "16")
                    this.setPadding("2 10 0 10");
                    this.setMargin("0 8 0 8");
                    this.setHeight("100%")
                    this.setFontName("Arial")
                    this.setFontSize("11")
                    this.setFontWeight("Bold")
                    this.setCursor("pointer")
                    this.setCSSOverride(null)
                    this.setColor(MENU.Color);
                    this.setAttribute("onmouseover", " jsx3.html.getJSXParent(this).onMenuOver(this,event)")
                    this._showmenuonmouseover = false;
                    this._recordids = null;
                }

                menu.onMenuOver = function(objGUI, event) {
                    this._recordids = this.getFirstChild().getRecordIds()
                    if (this._showmenuonmouseover && !this._isvisible) {
                        if (this._recordids.length > 1)
                            this.doPressed(new jsx3.gui.Event(event))
                    }

                    //alert("0 " + objGUI + "" + event)
                    // this.setTip()
                }

                menu.showMenuOnMouseOver = function(objEvent) {
                    this._showmenuonmouseover = objEvent.showmenu
                }

                menu.onSetParent = function(objParent) {
                    try {
                        var me = this
                        objParent.subscribe("SHOWMENUONMOUSEOVER", this, this.showMenuOnMouseOver)
                        this.getFirstChild().subscribe(jsx3.gui.Interactive.HIDE, me, me.onMenuHidden);
                        this.getFirstChild().subscribe(jsx3.gui.Interactive.MENU, me, me.onMenuVisible);
                        objParent.subscribe("MENUEXECUTE", me, me.menuExecuted);
                        this.initiaize();
                    }
                    catch(e) {
                        jsx3.log(e);
                    }
                    return true
                }


                menu.onSetChild = function (objChild) {
                    return  (objChild.instanceOf("tibco.uxcore.gui.TabbedNavMenuButton")) ? false : objChild;
                }


                menu._setTabIndex = function(index) {
                    this._index = index
                }

                menu._getTabIndex = function() {
                    return  this._index
                }

                menu.menuExecuted = function(objEVENT) {
                    if (objEVENT.index != this._getTabIndex()) {
                        this.setBorder("0px solid #338BDA; 1px solid transparent; 0px solid #338BDA; 1px solid transparent;", true);
                        this.setColor(MENU.Color, true);
                        this.setBackground("background-image: url(dummy)").repaint();
                        this.setJSXSelectDefault(true)
                    }
                }

                menu.selected = function(objEVENT, strRECORDID, objRECORD, auxObj) {
                    try {
                        this.setBorder("0px solid #338BDA; 1px solid #338BDA; 0px solid #338BDA; 1px solid #338BDA;");
                        this.setColor(MENU.PressedColor, true);
                        this.setBackground(this.getPressedBG()).repaint();
                        //alert(objRECORD)
                        var msg = new Object();
                        //if(objRECORD.getAttribute( "jsxselected") == "1"){
                        //alert(objRECORD.getAttribute( "coreselected"))
                        if(objRECORD.getAttribute( "coreselected") == "1"){
                            msg.menuitemSelectedPreviously   = true;
                        }
                        else {
                            msg.menuitemSelectedPreviously = false;
                            //objRECORD.setAttribute("jsxstyle", "color:blue");
                        }
                        this.setJSXSelectDefault()
                        objRECORD.setAttribute("jsxselected", "1");
                        objRECORD.setAttribute("coreselected", "1");
                        //alert(msg.menuitemSelectedPreviously)
                        msg.subject = MENU.MENUEXECUTE;
                        msg.target = this;
                        msg.objEVENT = objEVENT;
                        msg.strRECORDID = strRECORDID;
                        msg.objRECORD = objRECORD;
                        msg.index = this._getTabIndex()
                        if(auxObj){
                          for (var k in auxObj) {
                            msg[k] = auxObj[k]
                          }
                        }
                        this.publish(msg)
                    }
                    catch(e) {
                        jsx3.log("Error publishing messgae MENUEXECUTE: " + e)
                        var ex = new jsx3.Exception("an error occurred while ...", jsx3.NativeError.wrap(e));
                        jsx3.util.Logger.GLOBAL.error("publishing messgae MENUEXECUTE for target object " + this, ex)
                        jsx3.util.Logger.GLOBAL.error(ex.getStack())
                    }
                }

                menu.doPressed = function(objEvent) {
                    try {
                        if (this._recordids.length > 1) {
                            var root = (jsx3.IDE ? jsx3.IDE : tibco.uxcore.System.getServer()).getRootBlock();
                            var objGUI = this.getRendered();
                            var objRoot = root.getRendered(objGUI);
                            var myEvent = jsx3.html.getRelativePosition(objRoot, objGUI);
                            myEvent.T = (myEvent.T - 12) + (myEvent.H );
                            myEvent.L = myEvent.L - 10;
                            try {
                                this.getFirstChild().showContextMenu(objEvent, this, null, myEvent);
                            }
                            catch(ex) {
                                jsx3.log(ex)
                                //tibco.uxcore.System.logException(ex);
                            }
                            /*
                            *  Note form Major:
                            * if use this.repaint(), under Firefox2 , will have an issue that menu button will disappear.
                            * I spend some time , but do not find why. so Ramin, if you know that , please tell me.LOL
                            */
                            //this.getParent().repaint();
                        }
                        else if (this._recordids.length == 1) {
                            try {
                                this.onMenuHidden();
                            }
                            catch(e) {

                            }
                            try {
                                this.selected(objEvent, this._recordids[0], this.getFirstChild().getRecordNode(this._recordids[0]))
                            }
                            catch(e) {

                            }
                        }
                    } catch(ex2) {
                        jsx3.log(ex2)
                        //tibco.uxcore.System.logException(ex2);
                    }

                };

                menu.onMenuHidden = function() {
                    //jsx3.log("onMenuHidden")
                    //this.setColor(MENU.Color, false);
                    //this.setBorder("border:1px solid #163F63;border-top-width:0px;border-buttom-width:0px;");
                    if (this._isvisible) {
                        this._isvisible = false
                        this.publish({subject:"MENUHIDDEN"})
                    }
                    /*
                    *  Note:
                    * if use this.repaint(), under Firefox2 , will have an issue that menu button will disappear.
                    * I spend some time , but do not find why. so Ramin, if you know that , please tell me.LOL
                    */
                    //this.getParent().repaint();
                }


                menu.onMenuVisible = function(objEvent) {
                    if (objEvent.context.intINDEX > 1)
                        return
                    this._isvisible = true
                    this.publish({subject:"MENUVISIBLE"})

                }


                menu.getPressedBG = function() {
                    if (!this.pressedBG) {
                        //this.pressedBG = "background-image: url(" + plugIn.resolveURI("jsxplugin://tibco.uxcore.gui.desktop/images/headerNav_selectedBackground.jpg") + ")";
                       this.pressedBG = "background-image: url(" + plugIn.resolveURI("jsxplugin://tibco.uxcore.gui.desktop/images/headerNav_selectedBackground.jpg") + "); background-repeat: repeat;";
                        //this.pressedBG = "background-image: url(images/headerNav_selectedBackground.jpg) background-repeat: repeat;";
                    }
                    // jsx3.log(" this.pressedBG " +this.pressedBG)
                    return this.pressedBG;
                };

                menu.setJSXSelectDefault = function(keeppreselection) {
                    if (keeppreselection) {
                      this._setJSXSelectDefaultKeeppreselection()
                    }
                    else {
                        var childmenu = this.getFirstChild()
                        var recordids = childmenu.getRecordIds();
                        var menuitem
                        for (var k = 0; k < recordids.length; k++) {
                            menuitem = childmenu.getRecordNode(recordids[k])
                            menuitem.setAttribute("jsxselected", "0")
                            menuitem.setAttribute("coreselected", "0")
                        }
                    }

                }

                menu._setJSXSelectDefaultKeeppreselection = function() {
                    var childmenu = this.getFirstChild()
                    var recordids = childmenu.getRecordIds();
                    var menuitem
                    for (var k = 0; k < recordids.length; k++) {
                        menuitem = childmenu.getRecordNode(recordids[k])
                        if(menuitem.getAttribute("jsxselected") =="1" || menuitem.getAttribute("coreselected") =="1"){
                          menuitem.setAttribute("coreselected", "1")
                        }
                        else{
                          menuitem.setAttribute("coreselected", "0")
                        }
                        menuitem.setAttribute("jsxselected", "0")
                    }
                }
            }
            );


})(this);