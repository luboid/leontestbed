(function(plugIn) {

    /*
    * Renders a Tabbed Navigation, which consists of a set of Tabbed Navigation Menu and Tabbed Navigation Pane, only one of which is visible at a time.
    *
    * This class publishes the following model events:
    * MENUEXECUTE ?when the user selects a menu item
    *
    * Developer can easily load resources into a Tabbed Navigation once a menu item in a Tabbed Navigation Menu is selected by subscribing to a message that is published on Tabbed Navigation if he decides not to use the pre build load mechanism in Tabbed Navigation and Tabbed Navigation Menu.
    * This is one sample of loading a resource programmatically.
    *     Main.prototype.loadResource = function(objEvent) {
    *            // get a handle to Tabbed Navigation
    *            this.gnav = this.getDescendantOfName("GlobalNav")
    *            // get the Tabbed Navigation Pane
    *            var tabPane =  this.gnav.getTabbedPane(objEvent.target)
    *            tabPane.removeChildren();
    *            // load and cache the resource
    *            tabPane.loadAndCache(objEvent.objRECORD.getAttribute("src"),true)
    *            // once the job is done and everything is loaded switch the tabs if Switch Mode is set to false
    *            if(!this.gnav.getSwitchTab()){
    *               this.gnav.showTab(objEvent.target);
    *            }
    *        }
    * However, it is possible to provide the resource id that needs to be loaded in the CDF record so that resources will load automatically once the menu item is selected. In this case the Switch Mode should be set to true.
    * the  objRECORD is the object handle of the selected CDF record that can have following properties
    * <record jsxid="1" jsxtext="golbalnav_0_0" strRsrcId="golbalnav_0_0_xml" loadRsrc="true" tabbedPaneId="com.tibco.ra" jsxselected="1"/>
    * pluginid, if present all resources are resolved relatively to this plugin otherewise resources are resolved relatively to tibco.uxcore.gui.desktop plugin
    * loadRsrc set to true if a  XML resource whose data is a GI component file and has to be loaded synchronously and is specifed in strRsrcId. The resource must be already loaded to call this method. See jsx3.amp.PlugIn#loadRsrcComponent for more detail
    * strRsrcId {String | jsx3.amp.Resource} plug-in resource as a GUI component that its contenet has to be loaded
    * tabbedPaneId {String} if specified, a unique tabbed pane is created for this specific menu item. Consider that in this case the resource specified in strRsrcId will be loaded only once regardless the value specified in Reload Resource.    
    * Attribute jsxtext sets the text value for menu item
    * Attribute strRsrcId sets the resource id for the resource that needs to be loaded
    * Attribute loadRsrc set to true if strRsrcId should be loaded automatically
    * tabbedPaneId {String} if specified, a unique tabbed pane is created for this specific menu item. Consider that in this case the resource specified in strRsrcId will be loaded only once regardless the value specified in Reload Resource.
    * @see tibco.uxcore.gui.TabbedNavMenuButton
    */

    //jsx3.require("jsx3.gui.Template", "tibco.uxcore.gui.TabbedNavMenuButton");
    jsx3.lang.Class.defineClass("tibco.uxcore.gui.TabbedNav",
            jsx3.gui.Template.Block,
            null,
            function(TABBED, tabbed) {

                /**
                 * static field {String} MENUEXECUTE
                 * MENUEXECUTE
                 **/
                TABBED.MENUEXECUTE = tibco.uxcore.gui.TabbedNavMenuButton.MENUEXECUTE;

                TABBED.TABNAVCONTENT_LOADED =    "TABNAVCONTENT_LOADED"


                tabbed.init = function(strName) {
                    this.jsxsuper(strName);
                };

                tabbed.tabbedNavMenuButtonIterator = function() {
                    return (new jsx3.util.List(this.navIterator("tibco.uxcore.gui.TabbedNavMenuButton"))).iterator();
                }

                tabbed.tabbedNavPaneIterator = function() {
                    return (new jsx3.util.List(this.navIterator("tibco.uxcore.gui.TabbedNavPane"))).iterator();
                }

                tabbed.navIterator = function(strType) {
                    var len = this.getChildren().length;
                    var arr = this.getChildren();
                    var arrTemp = [];
                    for (var i = 0; i < len; i++) {
                        if (arr[i].instanceOf(strType)) {
                            arrTemp.push(arr[i]);
                        }
                    }
                    return arrTemp;
                }

                tabbed.onSetParent = function(objParent) {
                    this._visibleMenu = 0
                    this.childMenuIndex = 0
                    this.childTabIndex = 0
                    this.compileTemplate()
                    return true
                }

                tabbed.onSetChild = function(objChild) {
                    var myReturn = objChild;
                    if (objChild.instanceOf("tibco.uxcore.gui.TabbedNavMenuButton")) {
                        var id = "menu_index_" + jsx3.xml.CDF.getKey()
                        objChild._setTabIndex(id)
                        objChild.subscribe(tibco.uxcore.gui.TabbedNavMenuButton.MENUEXECUTE, this, this.menuExecuted)
                        objChild.subscribe("MENUHIDDEN", this, this.menuHidden)
                        objChild.subscribe("MENUVISIBLE", this, this.menuVisible)
                        myReturn = objChild
                        var me = this
                        setTimeout(function() {
                            var content = new tibco.uxcore.gui.TabbedNavPane("tab")
                            content.setName(id)
                            content._setTabIndex(id)
                            me.setChild(content).repaint()
                            content.setVisibility(jsx3.gui.Block.VISIBILITYHIDDEN,true)

                        }, 0)
                    }
                    return myReturn;
                }

                tabbed.menuHidden = function(objEvent) {
                    if (this._visibleMenu > 0)
                        this._visibleMenu = this._visibleMenu - 1
                    this.broadcastMsgToMenus()
                }

                tabbed.menuVisible = function(objEvent) {
                    if (this._visibleMenu >= 0)
                        this._visibleMenu = this._visibleMenu + 1
                    this.broadcastMsgToMenus()
                }

                tabbed.broadcastMsgToMenus = function(ms) {
                    var me = this
                    me.publish({subject:"SHOWMENUONMOUSEOVER", showmenu:me.getShowMenuOnmouseOver()})
                }

                tabbed.getShowMenuOnmouseOver = function() {
                    return (this._visibleMenu > 0);
                }



                /**
                 * Internal function.
                 * Invokes the EXECUTE model event of an executed menu button of type tibco.uxcore.gui.TabbedNavMenuButton.
                 * The object event (objEvent) has following parameters:
                 * subject that is the event id  tibco.uxcore.gui.TabbedNav.MENUEXECUTE
                 * target  the object that publishes this event {tibco.uxcore.gui.TabbedNavMenuButton}
                 * objEVENT the browser event that triggers this event
                 * menuitemSelectedPreviously is a flag that shows if the menu item is selectedt prviously. this indicates that the content related to that menu item is loaded in the related  pane
                 * target is the menu button {tibco.uxcore.gui.TabbedNavMenuButton}
                 * strRECORDID the CDF jsxid of selected record
                 * objRECORD the object handle of the CDF record <record jsxid="1" jsxtext="golbalnav_0_0" strRsrcId="golbalnav_0_0_xml" loadRsrc="true" tabbedPaneId="com.tibco.ra" jsxselected="1"/>
                 * objRECORD has following additional parameteres to GI parameters:
                 * pluginid, if present all resources are resolved relatively to this plugin otherewise resources are resolved relatively to tibco.uxcore.gui.desktop plugin
                 * loadRsrc set to true if a  XML resource whose data is a GI component file and has to be loaded synchronously and is specifed in strRsrcId. The resource must be already loaded to call this method. See jsx3.amp.PlugIn#loadRsrcComponent for more detail
                 * strRsrcId {String | jsx3.amp.Resource} plug-in resource as a GUI component that its contenet has to be loaded
                 * tabbedPaneId {String} if specified, a unique tabbed pane is created for this specific menu item. Consider that in this case the resource specified in strRsrcId will be loaded only once regardless the value specified in Reload Resource.
                 * @param  objEvent {jsx3.gui.Event} ?the event, should have at least a field 'subject' that is the event id
                 **/
                tabbed.menuExecuted = function(objEvent) {
                    try {
                        var dummy;
                        /*
                        for (var k in objEvent) {
                            jsx3.log("menuExecuted k " + k + " =  " + objEvent[k])
                        }
                        */
                        this.publish(objEvent)
                        if (!objEvent.menuitemSelectedPreviously || this.getReloadResource()) {
                            this.loadResource(objEvent)
                        }

                        if (this.getSwitchTab()) {
                            if (dummy = objEvent.objRECORD.getAttribute("tabbedPaneId")) {
                                this.showTabById(dummy)
                            }
                            else {
                                this.showTab(objEvent.target)
                            }

                        }
                    }
                    catch(e) {
                        plugIn.getLog().error("Error invoking the EXECUTE model event of an executed menu button of type tibco.uxcore.gui.TabbedNavMenuButton: Description " + e.description + "  " + e)
                        var ex = new jsx3.Exception("an error occurred while ...", jsx3.NativeError.wrap(e));
                        jsx3.util.Logger.GLOBAL.error("Error invoking the EXECUTE model event of an executed menu button of type tibco.uxcore.gui.TabbedNavMenuButton ", ex)
                        jsx3.util.Logger.GLOBAL.error(ex.getStack())
                    }
                }

                /**
                * See tibco.uxcore.gui.TabbedNav#menuExecuted
                */
                tabbed.loadResource = function(objEvent) {
                   var me  = this
                    var loadrsrc = objEvent.objRECORD.getAttribute("loadRsrc")
                    var mystrRsrcId = objEvent.objRECORD.getAttribute("strRsrcId")
                    try {
                        if (loadrsrc==='true' || loadrsrc ==='1' || loadrsrc ==1) {
                            var dummy;
                            var tabPane;
                            if (objEvent.objRECORD.getAttribute("pluginid")) {
                                this.setPluginResolver(plugIn.getEngine().getPlugIn(objEvent.objRECORD.getAttribute("pluginid")));
                            }
                            else {
                                this.setPluginResolver(plugIn.getEngine().getPlugIn("tibco.uxcore.gui.desktop"));
                            }
                            var myresolver = (this.getPluginResolver()) ? this.getPluginResolver() : plugIn
                            if (dummy = objEvent.objRECORD.getAttribute("tabbedPaneId")) {
                                tabPane = this.getTabbedPanebyId(dummy)
                                if (!tabPane) {
                                  //jsx3.log("in if")
                                  tabPane = this._createTabbedPaneUsingId(dummy)
                                  tabPane.removeChildren();
                                  var r = myresolver.getResource(mystrRsrcId);
                                  r.load().when(function(){
                                    myresolver.loadRsrcComponent(mystrRsrcId, tabPane, true);
                                    objEvent.subject = TABBED.TABNAVCONTENT_LOADED
                                    me.publish(objEvent)
                                  })
                                }
                            }
                            else {
                              tabPane = this.getTabbedPane(objEvent.target)
                              tabPane.removeChildren();
                              var r = myresolver.getResource(mystrRsrcId);
                              r.load().when(function(){
                                myresolver.loadRsrcComponent(mystrRsrcId, tabPane, true);
                                objEvent.subject = TABBED.TABNAVCONTENT_LOADED
                                me.publish(objEvent)
                              })
                            }


                        }
                    }
                    catch(e) {
                        jsx3.util.Logger.GLOBAL.error("Error loading resource. objEvent " + objEvent + ". " + e)
                        var ex = new jsx3.Exception("an error occurred while ...", jsx3.NativeError.wrap(e));
                        jsx3.util.Logger.GLOBAL.error("Error loading resource. objEvent " + objEvent, ex)
                        jsx3.util.Logger.GLOBAL.error(ex.getStack())
                    }


                }

                /*
                * Returns  resolved URI against the plugin URI resolver. The URI can be absolute or relative to plugin
                * Use setPluginResolver to set the plugin that a realtive URI (like images/headerBar.jpg) should be resolved against. Otherwise the relative  URI will be resolved regarding UXcore plugin
                * @param strURI {String} ?the URI to resolve.
                * @return {String}
                * @see  {setPluginResolver}
                */
                tabbed.resolveURI = function(strURI) {
                    var myresolver = (this.getPluginResolver()) ? this.getPluginResolver() : plugIn
                    return myresolver.resolveURI(strURI)
                }

                /*
                *  Sets the plugin that all public URIs sould be resolved against
                *  @param pluginResolver {jsx3.amp.PlugIn}
                */
                tabbed.setPluginResolver = function(objResolver) {
                    this._resolver = objResolver;
                }

                /*
                *  Returns the plugin that all public URIs sould be resolved against
                *  @return {jsx3.amp.PlugIn}
                */
                tabbed.getPluginResolver = function() {
                    return this._resolver
                }

                /*
                * Shows the related tab based on passed menu and hides all other tabs.
                * Call this function if the parameter Switch Mode is set to false to switch the tabs
                * @param objMenu {tibco.uxcore.gui.TabbedNavMenuButton}
                */
                tabbed.showTab = function(objMenu) {
                    //jsx3.log("using new show tab")
                    this.showTabById(objMenu._getTabIndex())
                    /*
                    var objPanes = this.getDescendantsOfType("tibco.uxcore.gui.TabbedNavPane")
                    for (var k = 0; k < objPanes.length; k++) {
                        var displaymode = (objMenu._getTabIndex() == objPanes[k]._getTabIndex()) ? jsx3.gui.Block.DISPLAYBLOCK : jsx3.gui.Block.DISPLAYNONE ;
                        objPanes[k].setDisplay(displaymode);
                        objPanes[k].repaint();
                    }
                    */
                }

               /*
                * Shows the tab jsxname and  hides all other tabs.
                * Call this function if the parameter Switch Mode is set to false to switch the tabs and the assigned 
                * @param jsxname {String}
                */
                tabbed.showTabById = function(jsxname) {

                    var objPanes = this.getDescendantsOfType("tibco.uxcore.gui.TabbedNavPane")
                    for (var k = 0; k < objPanes.length; k++) {
                        var displaymode = (jsxname == objPanes[k]._getTabIndex()) ? jsx3.gui.Block.VISIBILITYVISIBLE : jsx3.gui.Block.VISIBILITYHIDDEN ;
                        objPanes[k].setVisibility(displaymode,true);
                    }
                }

                /*
                * gets the related tab based on passed menu.
                * use this function to get access to a Tab Navigation Pane to load resources in to it.
                * @param objMenu {tibco.uxcore.gui.TabbedNavMenuButton}
                */
              tabbed.getTabbedPane = function(objMenu){
                try {
                    return this.getDescendantOfName(objMenu._getTabIndex())
                }
                catch(e) {
                   jsx3.lang.NativeError.wrap(e).printStackTrace();
                   throw new jsx3.lang.Exception("tibco.uxcore.gui.TabbedNav#getTabbedPane"+
                   "\n an error occurred while trying to return tabbed pane for menu " + objMenu , jsx3.lang.NativeError.wrap(e));
                }
              }

                tabbed.getTabbedPanebyId = function(strPaneID) {
                    return this.getDescendantOfName(strPaneID)
                }

                tabbed._createTabbedPaneUsingId = function(strPaneID) {
                    var content = new tibco.uxcore.gui.TabbedNavPane("tab")
                    content.setName(strPaneID)
                    content._setTabIndex(strPaneID)
                    this.setChild(content).repaint();
                    //jsx3.log("content " + content)
                    return content
                }

                /*
                *  Sets the value for switching the tab upon selection of a menu item.
                *  @param boolSwitchPane {boolean} if true switches the tab immediately  by calling showTab.
                */
                tabbed.setSwitchTab = function(boolSwitchPane) {
                    this.switchpane = boolSwitchPane;
                }

                /*
                *  @return {Boolean}
                */
                tabbed.getSwitchTab = function() {
                    return (this.switchpane == undefined || this.switchpane == null) ? jsx3.Boolean.TRUE : this.switchpane;
                }

                /*
                *  Sets the value for reloading resource even if it is already loaded upon selection of a menu item.
                *  @param boolReloadResource {boolean} if true reloades the resource.
                */
                tabbed.setReloadResource = function(boolReloadResource) {
                    this.reloadresource = reloadresource;
                }

                /*
                *  @return {Boolean}
                */
                tabbed.getReloadResource = function() {
                    return (this.reloadresource == undefined || this.reloadresource == null) ? jsx3.Boolean.TRUE : this.reloadresource;
                }


                tabbed.compileTemplate = function() {
                    var clazz = eval(this.getClass().getName());
                    if (!clazz.templateXML) {
                        clazz.templateXML = plugIn.getServer().loadInclude(plugIn.getServer().resolveURI("jsxplugin://tibco.uxcore.gui.desktop/templates/tabbedNav.xml"), "tabbedNav", "xml").toString();
                        jsx3.gui.Template.compile(clazz.templateXML, clazz.jsxclass);
                    }
                }


            }
            );

})(this);