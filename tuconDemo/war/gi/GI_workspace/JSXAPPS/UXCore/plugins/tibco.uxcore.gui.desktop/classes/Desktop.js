(function(plugIn) {

    if (jsx3.ide) {
        jsx3.ide.loadTemplateCatalog("prop", "jsxplugin://tibco.uxcore.gui.desktop/properties/catalog.xml", plugIn);
        jsx3.ide.loadTemplateCatalog("event", "jsxplugin://tibco.uxcore.gui.desktop/events/catalog.xml", plugIn);
    }

    //jsx3.require("jsx3.gui.Template", "tibco.uxcore.gui.Linkbutton", "tibco.uxcore.gui.Splitline", "jsx3.xml.Cacheable", "jsx3.xml.CDF");
    jsx3.require("jsx3.xml.Cacheable", "jsx3.xml.CDF");
    jsx3.lang.Class.defineClass("tibco.uxcore.gui.Desktop",
            jsx3.gui.Template.Block,
            null,
            function(DESKTOP, desktop) {
                // 3) define the init (main)
                desktop.init = function(strName) {
                    this.jsxsuper(strName);
                };


                DESKTOP.verticalBuffer = 118;
                DESKTOP.horizontalBuffer = 30;
                DESKTOP.HeadLogo = "images/header_logo.jpg";
                DESKTOP.HeadBar = "jsxplugin://tibco.uxcore.gui.desktop/images/headerBar.jpg";
                DESKTOP.HeadAdminBG = "jsxplugin://tibco.uxcore.gui.desktop/images/header_administrationBackground.jpg";
                DESKTOP.MainAreaBkgrdTile = "jsxplugin://tibco.uxcore.gui.desktop/images/fadeUpBkgrdTile_v2.jpg";
                DESKTOP.POIIcon = "jsxplugin://tibco.uxcore.gui.desktop/images/loadingBlue.gif";
                DESKTOP.POITextDefault = 'uxcore@poi@defaultTitle'
                DESKTOP.DISPLAYINLINE =  "inline"


                /*
                * Returns  resolved URI against the plugin URI resolver. The URI can be absolute or relative to plugin
                * Use setPluginResolver to set the plugin that a realtive URI (like images/headerBar.jpg) should be resolved against. Otherwise the relative  URI will be resolved regarding UXcore plugin
                * @param strURI {String} ?the URI to resolve.
                * @return {String}
                * @see  {setPluginResolver}
                */
                desktop.resolveURI = function(strURI) {
                    var myresolver = (this.getPluginResolver()) ? this.getPluginResolver() : plugIn
                    return myresolver.resolveURI(strURI)
                }

                /*
                *  Sets the plugin that all public URIs sould be resolved against
                *  @param pluginResolver {jsx3.amp.PlugIn}
                */
                desktop.setPluginResolver = function(pluginResolver) {
                    this._resolver = pluginResolver;
                }

                /*
                *  Returns the plugin that all public URIs sould be resolved against
                *  @return {jsx3.amp.PlugIn}
                */
                desktop.getPluginResolver = function() {
                    return this._resolver
                }

                /*
                * Sets the URI to Desktop logo. The URI can be absolute or relative to plugin
                * Use absolute UR like jsxplugin://myplugin/images/headerBar.jpg to resolvr URI regarding the jsxplugin URI resolver
                * Use setPluginResolver to set the plugin that a realtive URI (like images/headerBar.jpg) should be resolved against. Otherwise the relative  URI will be resolved regarding UXcore plugin
                * @param strSrc {String}
                * @see  setPluginResolver
                */
                desktop.setLogoImage = function(strSrc) {
                    this.desktoplogo = strSrc;
                }

                /*
                *  Returns the URI of Desktop Logo.
                *  @return {String}
                */
                desktop.getLogoImage = function() {
                    return (this.desktoplogo) ? this.desktoplogo : DESKTOP.HeadLogo;
                }

                /*
                *  this function decide the which component can be the child of the Desktop component.
                */
                desktop.onSetChild = function(objChild) {
                    if (!(!objChild.instanceOf("tibco.uxcore.gui.Linkbutton") && !objChild.instanceOf("tibco.uxcore.gui.Splitline") && !objChild.instanceOf("tibco.uxcore.gui.TabbedNav") )) {
                        return objChild;
                    } else {
                        jsx3.log("this component can not become the child of the DeskTop component,it should be Linkbutton, splitline,TabbedNav");
                        return false;
                    }
                }

                desktop.onSetParent = function(objParent) {
                    this.compileTemplate()
                    var me = this;
                    setTimeout(function() {
                        me.testBrowserSize();
                    },0);
                    return true
                }

                desktop.setMinimumSize = function(strSizeArray) {
                    this.minSize = strSizeArray;
                    this.testBrowserSize();
                }

                desktop.getMinimumSize = function() {
                    return this.minSize;
                }
                
                /**
                 *  to determine whether the child type is tibco.uxcore.gui.Linkbutton or tibco.uxcore.gui.Splitline
                 *  if right, then the child can contain into the Application Hooks area.
                 *  @return {Interator} the Interator of the child
                 */
                desktop.applicationHookIterator = function() {
                    var len = this.getChildren().length;
                    var arr = this.getChildren();
                    var arrTemp = [];
                    for (var i = 0; i < len; i++) {
                        if (arr[i].instanceOf("tibco.uxcore.gui.Linkbutton") || arr[i].instanceOf("tibco.uxcore.gui.Splitline")) {
                            arrTemp.push(arr[i]);
                        }
                    }
                    return (new jsx3.util.List(arrTemp)).iterator();
                }

                /**
                 *  @return {Iterator} the Iterator of the child
                 */
                desktop.NavBarIterator = function() {
                    var len = this.getChildren().length;
                    var arr = this.getChildren();
                    var arrTemp = [];
                    for (var i = 0; i < len; i++) {
                        if (arr[i].instanceOf("tibco.uxcore.gui.TabbedNav")) {
                            arrTemp.push(arr[i]);
                        }
                    }
                    return (new jsx3.util.List(arrTemp)).iterator();
                }

                desktop.setPoiText = function(poitext) {
                    try {
                        this.poitext = poitext
                        this.getRenderedBox("poitext").firstChild.nodeValue = poitext;
                    }
                    catch(e) {
                        plugIn.getLog().error("Error; can't set the poi text.  " + e + " " + e.description)
                    }

                    /*
                    this.setProperty("poi",poi);
                    if(bRepaint) {
                        this.repaint();
                    }
                    */
                }

                desktop.getPoiText = function() {
                    return (this.poitext ? this.poitext : tibco.uxcore.System.getServer().getDynamicProperty(DESKTOP.POITextDefault) )
                }

                desktop.setDisplayPoi = function(poidisplay, bRepaint) {

                    this.setProperty("poidisplay",poidisplay);
                    if(bRepaint) {
                        this.repaint();
                    }

                    /*
                    this.poidisplay = poidisplay;
                    if (bRepaint)
                        this.repaint();
                        */
                }

                desktop.getDisplayPoi = function() {
                    return (this.poidisplay ? this.poidisplay : DESKTOP.DISPLAYINLINE )
                }

                desktop.setVisibilityPoi = function(poivisibility) {
                    try{
                    this.setProperty("poivisibility",poivisibility);
                    this.getRenderedBox("poi").style.visibility = poivisibility;
                        }
                    catch(e){
                        plugIn.getLog().error("Error; can't set the poi visibility.  " + e + " " + e.description)
                    }
                    //this.poivisibility = poivisibility
                }

                desktop.getVisibilityPoi = function() {
                    return (this.poivisibility ? this.poivisibility : "visible" )
                }

               desktop.setTip = function(poitooltip) {
                    try{
                    this.setProperty("poitooltip",poitooltip);
                    this.getRenderedBox("poi").title = poitooltip;
                        }
                   catch(e){
                       plugIn.getLog().error("Error; can't set the tip.  " + e + " " + e.description)
                   }
                }

                desktop.getTip = function() {
                    return (this.poitooltip ? this.poitooltip : "" )
                }

                desktop.compileTemplate = function() {
                    var clazz = eval(this.getClass().getName());
                    if (!clazz.templateXML) {
                        clazz.templateXML = plugIn.getServer().loadInclude(plugIn.resolveURI("templates/desktop.xml"), "desktop", "xml").toString();
                        jsx3.gui.Template.compile(clazz.templateXML, clazz.jsxclass);
                    }
                }

                /**
                 * set user info, which is shown in right side of desktop
                 * @param info {String} userinfo
                 * @param bNoFormat {Boolean} false to keep original string, true to format string like "userName:aaa, server:bbb" to
                 * correspanding html string, "<span color...>userName:</span> <span color...>aaa</span>...."
                 */
                desktop.setUserInfo = function(info, bNoFormat) {
                    this.jsxuserinfoformat = !bNoFormat;
                    this.jsxuserinfo = info;
                    this.syncProperty("jsxuserinfo", this.jsxuserinfo);
                }

                desktop.getUserInfo = function() {
                    if(!this.jsxuserinfo) return "";
                    if(this.jsxuserinfoformat) {
                        info = this.jsxuserinfo
                        info = info.split(",");
                        info = jsx3.$A(info).map(function(item){
                          item = item.replace(":", "</span>: <span style='color:#CCCCCC'>");
                          return "<span style='color:#EEEEEE'>"+ item +"</span>"
                        });
                        info = info.join(", ");
                        return info;
                    }
                    return this.jsxuserinfo;
                }

                desktop.testBrowserSize = function() {
                    var minSize = this.minSize;
                    if(!minSize) {
                        minSize = "1024x768";
                    }
                    minSize = minSize.split("x");
                    for(var i=0; i<minSize.length; i++) {
                        minSize[i] = parseInt(minSize[i]);
                    }
//                    jsx3.log("Testing browser size");
                    var rootBlock = this.getServer().getRootBlock();
//                    jsx3.log("Root block: " + rootBlock);
                    var objGUI = rootBlock.getRendered();
                    if(objGUI) {
//                        jsx3.log("objGUI width: " + objGUI.style.width);
//                        jsx3.log("objGUI height: " + objGUI.style.height);
                        var w = parseInt(("" + objGUI.style.width).replace(/px/,""));
                        var h = parseInt(("" + objGUI.style.height).replace(/px/,""));
//                        jsx3.log("Width: " + w);
//                        jsx3.log("Height: " + h);
                        if(((w + DESKTOP.horizontalBuffer) < minSize[0]) || ((h + DESKTOP.verticalBuffer) < minSize[1])) {
//                            jsx3.log("Test Failed");
                            tibco.uxcore.System.alert("WARNING: Browser Size Too Small","<b>Warning:</b> Your browser size may be insufficient to display all of this application.  It is highly recommended that you resolve this issue before continuing.  Some possible solutions for this are: <br/><br/><ol><li>Maximize your browser window</li><li>Hide some of your browser toolbars</li><li>Increase your monitor resolution</li></ol>",null,null,{width:400, height:225});
                        }
                    }
                    else {
                        var me = this;
                        setTimeout(function() {
                            me.testBrowserSize();
                        },100)
                    }
                }

            }
            );
})(this);
