//jsx3.require("tibco.uxcore.gui.ListContainerButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.ActionMenuButton",
        tibco.uxcore.gui.ActionButton, null,
        function(BUTTON, button){

          button.defaultmenuborder = '0px solid #C5C4C4;0px solid #C5C4C4;0px solid #C5C4C4;1px solid transparent'

          button.arrowdownicon = 'jsxplugin://tibco.uxcore.gui.listcontainer/images/moveDown.png'
          /*
          * instance initializer
          * @param strName {String} ?unique name distinguishing this object from all other JSX GUI objects in the JSX application
          * @param intWidth {int} ?width (in pixels) of the object; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
          * @param strText {String} ?text to display in the given button; if null JSXTABLEHEADERCELL.DEFAULTTEXT is used
          */
          button.init = function(strName, a, b, c, d){
            this.jsxsuper(strName, a, b, c, d);
            var child = new jsx3.gui.Menu()
            child.setDisplay(jsx3.gui.Block.DISPLAYNONE)
            this.setChild(child)
          };

          button.onMenuClick = function(objEvent, objGUI){
          }

          /*
          * executes the button
          */
          button.selected = function(objEvent, objGUI){
            try {
              if(this.getEnabled() == jsx3.gui.Form.STATEDISABLED) {
                return;
              }
              var menuObj = this.getFirstChild();
              var defaultid = this.getDefaultExecuteId() ? this.getDefaultExecuteId() : menuObj.getRecordIds()[0]
              if (defaultid) {
                var objRECORD = menuObj.getRecord(defaultid)
                menuObj.doEvent("jsxexecute", {strRECORDID:defaultid , objEVENT:objEvent, objRECORD:objRECORD})
              }
            }
            catch(e) {
              var ex = new jsx3.Exception("an error occurred at tibco.uxcore.gui.ActionMenuButto while ...", jsx3.NativeError.wrap(e));
              jsx3.util.Logger.GLOBAL.error("MENUEXECUTE for target object " + this, ex)
              jsx3.util.Logger.GLOBAL.error(ex.getStack())
            }
          }

          /*
          * opens the menu
          */
          button.doPressed = function(objEvent){
            try {
              if(this.getEnabled() == jsx3.gui.Form.STATEDISABLED) {
                return;
              }
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
              }
            } catch(ex2) {
              jsx3.log(ex2)
            }
          };

          /**
           *  to determine whether the child type is tibco.uxcore.gui.Linkbutton or tibco.uxcore.gui.Splitline
           *  if right, then the child can contain into the Application Hooks area.
           *  @return {Interator} the Interator of the child
           */
          button.getMenuIterator = function(){
            var len = this.getChildren().length;
            var arr = this.getChildren();
            var arrTemp = [];
            for (var i = 0; i < len; i++) {
              if (arr[i].instanceOf("jsx3.gui.Menu")) {
                arr[i].setDisplay(jsx3.gui.Block.DISPLAYNONE)
                arrTemp.push(arr[i]);
              }
            }
            return (new jsx3.util.List(arrTemp)).iterator();
          }

          button.onMenuMouseover = function(objEvent, objGUI){
            //jsx3.log("onMenuMouseover objEvent: " + objEvent + "objGUI: " + objGUI)
            //objGUI.style.borderLeft = '1px solid red'
          }

          button.onMenuMousedown = function(objEvent, objGUI){
            /*
            jsx3.log("onMenuMousedown objEvent: " + objEvent + "objGUI: " + objGUI)
            objGUI.style.backgroundImage = this._getCurrentImageURL(false, true)
            this.doPressed(new jsx3.gui.Event(objEvent))
            */
            objGUI.style.backgroundImage = this._getCurrentImageURL(false, true)
          }

          button.onMenuMouseclick = function(objEvent, objGUI){
            jsx3.log("onMenuMouseclick objEvent: " + objEvent + "objGUI: " + objGUI)
            //objGUI.style.backgroundImage = this._getCurrentImageURL(false, true)
            this.doPressed(new jsx3.gui.Event(objEvent))
          }

          button.onMenuMouseout = function(objEvent, objGUI){
            //jsx3.log("onMenuMouseout objEvent: " + objEvent + "objGUI: " + objGUI)
            //objGUI.style.borderLeft = '1px solid transparent'
          }

          button.onMenuMouseup = function(objEvent, objGUI){
            //jsx3.log("onMenuMouseup objEvent: " + objEvent + "objGUI: " + objGUI)
            objGUI.style.backgroundImage = this._getCurrentImageURL(true, false, !!this._jsxisfocusing)
          }

          button.onButtonClick = function(objEvent, objGUI){
            this.selected(objEvent, objGUI)
          }

          button.onmouseover = function(objEvent, objGUI){
            this.jsxsuper(objEvent, objGUI)
            this.setMenuborder('0px solid #C5C4C4;0px solid #C5C4C4;0px solid #C5C4C4;1px solid #C5C4C4')
            //this.menucomplex_img = this._getCurrentImageURL(true, false);
            this.setPropertyGUI(objGUI, "menucomplex_img", this._getCurrentImageURL(true, false, !!this._jsxisfocusing));
            jsx3.log(objGUI.innerHTML)
          }

          button.onmouseout = function(objEvent, objGUI){
            this.jsxsuper(objEvent, objGUI)
            this.setMenuborder('0px solid #C5C4C4;0px solid #C5C4C4;0px solid #C5C4C4;1px solid transparent')
            this.setPropertyGUI(objGUI, "menucomplex_img", this._getCurrentImageURL(false, false, !!this._jsxisfocusing));
            jsx3.log(objGUI.innerHTML)
          }

          button.setDefaultStyle = function(){
            this.jsxsuper()
            this.setDefaultProperty(this, {
              "jsxpadding"  : "@uxcore10@ActionMenuBtn Padding"
            }, true, true);
          };

          button.getMenuBorder = function(){
            return this.coremenuborder;
          }

          button.setMenuborder = function(menuborder){

            try {
              this.coremenuborder = menuborder;
              this.setProperty("coremenuborder", menuborder);
            }
            catch(e) {
              jsx3.log("Error; can't set the poi visibility.  " + e + " " + e.description)
            }
          }

          button._configureBG = function(){
            this.jsxsuper()
            this.menucomplex_img = this.complex.img
          };

          button.setDefaultExecuteId = function(strId){
            this.jsxdefaulexecuteid = strId
          }

          button.getDefaultExecuteId = function(){
            return this.jsxdefaulexecuteid
          }




          //define the VIEW template
  button.getTemplateXML = function() {
    //TODO: remove this conditional in production; it exists in build 9+ of V 3.7
//    if (jsx3.CLASS_LOADER.IE) {
//      jsx3.gui.Template.addResolver("jsx3.gui.Form","$disabled_opacity",new Function('if(this.getEnabled && this.getEnabled() == 0) {return jsx3.html.getCSSOpacity(.4).replace(";","").split(":")[1];}'),
//        {clobber:true,type:"css",name:"filter",triggers:["jsxenabled"]});
//    } else if (jsx3.CLASS_LOADER.FX) {
//      jsx3.gui.Template.addResolver("jsx3.gui.Form","$disabled_opacity",new Function('if(this.getEnabled && this.getEnabled() == 0) {return jsx3.html.getCSSOpacity(.4).replace(";","").split(":")[1];}'),
//        {clobber:true,type:"css",name:"-moz-opacity",triggers:["jsxenabled"]});
//    } else {
//      jsx3.gui.Template.addResolver("jsx3.gui.Form","$disabled_opacity",new Function('if(this.getEnabled && this.getEnabled() == 0) {return jsx3.html.getCSSOpacity(.4).replace(";","").split(":")[1];}'),
//        {clobber:true,type:"css",name:"opacity",triggers:["jsxenabled"]});
//    }

    return ['',
      '<transform xmlns="http://gi.tibco.com/transform/" xmlns:u="http://gi.tibco.com/transform/user" version="1.0">',
        '<template onbeforepaint="this._configureBG();" onpaint="this._setKeyBinding();">',
          '<inlinebox onmouseover="{$onmouseover}" onmousedown="{$onmousedown}" onmouseout="{$onmouseout}" onmouseup="{$onmouseup}" onclick="{$onclick}" onkeypress="{$onkeypress}" onfocus="{$onfocus}" onblur="{$onblur}" ',
          'index="{$index}" jsxindex="{$jsxindex}" label="{$label}" title="{$tip}" ',
          'style="opacity:{$disabled_opacity};white-space:nowrap;vertical-align:top;position:{$position};left:{$left};top:{$top};width:{$width};height:{$height};margin:{$margin};display:{$display};visibility:{$visibility};z-index:{$zindex};cursor:{cursor};style-group:{$style-group};border:{$border}">',
              '<inlinebox style="background-image:{complex.img};background-position:0 0;width:{l_width};overflow:hidden;height:100%;vertical-align:top;font-size:0px;"><text>&amp;#160;</text></inlinebox>',
              '<inlinebox style="display:{i_display};background-image:{complex.img};background-position:{bg_offset};height:100%;vertical-align:top;">',
                '<img u:protected="true" style="vertical-align:middle;border:0px;padding:0px;margin:1px 0px 0px 0px;" src="{src}" />',
              '</inlinebox>',
              '<inlinebox onclick="{onButtonClick}" style="display:{t_display};font-name:{$fontname};font-size:{$fontsize};color:{$color};font-weight:{$fontweight};white-space:nowrap;background-image:{complex.img};background-position:{bg_offset};vertical-align:top;text-align:{$textalign}">',
                '<padding>{txt_padding}</padding>',
                '<height>$$parentheight</height>',
                '<width>{t_width}</width>',
                '<text>{$text}</text>',      
              '</inlinebox>',
            '<inlinebox u:id="coremenuborder" id="menuIcon" style="display:{i_display};background-image:{menucomplex_img};background-position:{bg_offset};height:100%;vertical-align:top;" onmouseover="{onMenuMouseover}" onmousedown="{onMenuMousedown}" onmouseout="{onMenuMouseout}" onmouseup="{onMenuMouseup}" onclick="{onMenuMouseclick}" >',
              '<padding>0 0 0 2</padding>',
              '<border>{menuborder}</border>',
              '<img u:protected="true" style="vertical-align:middle;border:0px;padding:0px;margin:1px 0px 0px 0px;" src="{downarrowsrc}" />',
            '</inlinebox>',
            '<inlinebox id="rightspan" style="background-image:{complex.img};background-position:right top;width:1px;overflow:hidden;height:100%;vertical-align:top;font-size:0px;"><text>&amp;#160;</text></inlinebox>',
            '<attach select="this.getMenuIterator()">' ,
                    '<drawspace boxtype="\'box\'" position="\'relative\'" top="0" left="0"/>' ,
            '</attach>',
            '</inlinebox>',
        '</template>',
        '<model>',
          '<import resolver="$disabled_opacity" set="jsx3.gui.Form"/>' ,
          '<var id="complex.img" triggers="complex.img jsximage jsxonimage">return this.complex.img || this._getCurrentImageURL(false, false);</var>',
          '<var id="menucomplex_img" triggers="menucomplex_img">return this.menucomplex_img || this._getCurrentImageURL(false, false);</var>',
          '<var id="i_display" triggers="jsxicon">return jsx3.util.strEmpty(this.jsxicon) ? "none" : "";</var>',
          '<var id="t_display" triggers="jsxtext">return jsx3.util.strEmpty(jsx3.util.strTrim(this.jsxtext+"")) ? "none" : "";</var>',
          '<var id="cursor" triggers="jsxenabled">return this._isEnabled() ? "pointer" : "default";</var>',
          '<var id="l_width" triggers="affordance">return this.getAffordance().split(" ")[3];</var>',
          '<var id="r_width" triggers="affordance">return this.getAffordance().split(" ")[1];</var>',
          '<var id="t_width" triggers="affordance jsxwidth jsxicon">return !jsx3.util.strEmpty(this.jsxwidth) ? this.jsxwidth - (parseInt(this.getAffordance().split(" ")[1]) + parseInt(this.getAffordance().split(" ")[3]) + (jsx3.util.strEmpty(this.jsxicon)?0:16)) : null;</var>',
          '<var id="bg_offset" triggers="affordance">return "-" + this.getPaintProfile().l_width + "px" + " 0";</var>',
          '<var id="txt_padding" triggers="jsxpadding">return jsx3.util.strEmpty(this.getPadding()) ? this.getAffordance().split(" ")[0] + " 0 0 0" : this.getPadding();</var>',
          '<var id="src" triggers="jsxicon">return this.getServer() ? this.getIcon(this.complex.icon) : this.complex.icon;</var>',
          '<var id="downarrowsrc" triggers="jsxicon">return this.getServer().resolveURI(this.arrowdownicon)</var>',
          '<var id="menuborder" triggers="coremenuborder" >return this.getMenuBorder() ? this.getMenuBorder() : this.defaultmenuborder</var>',
        '</model>',
      '</transform>',
    ''].join('');
  };



        });