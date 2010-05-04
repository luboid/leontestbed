/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn) {


//require the template engine (and all required interfaces by the class)
//jsx3.require("jsx3.gui.Template","jsx3.gui.Form");

//define the new class
jsx3.lang.Class.defineClass("tibco.uxcore.gui.Button",jsx3.gui.Template.Block,[jsx3.gui.Form,tibco.uxcore.gui.IActionTrigger],function(BUTTON,button) {

  var Event = jsx3.gui.Event;
  var Interactive = jsx3.gui.Interactive;
  var Form = jsx3.gui.Form;


  if(jsx3.ide) {
    jsx3.ide.loadTemplateCatalog("prop", "properties/catalog.xml",plugIn);
    jsx3.ide.loadTemplateCatalog("event", "events/catalog.xml",plugIn);
  }


  /**
   * {int} Value for the type field indicating a normal button.
   * @final @jsxobf-final
   */
  BUTTON.TYPE_NORMAL = 0;

  /**
   * {int} Value for the type field indicating a toggle (2-state) button.
   * @final @jsxobf-final
   */
  BUTTON.TYPE_TOGGLE = 1;

  /**
   * {int} Value for the state field indicating that the toggle button is off.
   * @final @jsxobf-final
   */
  BUTTON.STATE_OFF = 0;

  /**
   * {int} Value for the state field indicating that the toggle button is on.
   * @final @jsxobf-final
   */
  BUTTON.STATE_ON = 1;

  /** {String} @private */
  button.jsximage = null;

  /** {String} @private */
  button.jsxoverimage = null;

  /** {String} @private */
  button.jsxdownimage = null;

  /** {String} @private */
  button.jsxonimage = null;

  /** {int} @private */
  button.jsxtype = BUTTON.TYPE_NORMAL;

  /** {int} @private */
  button.jsxstate = BUTTON.STATE_OFF;

  /** {jsx3.gui.HotKey} @private @jsxobf-clobber */
  button._jsxhotkey = null;

  //define the init (main) method
  button.init = function(strName,a,b,c,d) {
    this.jsxsuper(strName,a,b,c,d);
      this.setDefaultImages();
    if(this.setDefaultStyle) this.setDefaultStyle();
      jsx3.sleep(function(){this.initAndRegister()},null,this,false);
  };

  BUTTON.DEFAULT_AFFORDANCE = "3 5 3 5";

  button.setDefaultImages = function() {
      this.complex = {};
      this.complex.icon = jsx3.gui.Block.SPACE;
      this.complex.bg = "jsxplugin://tibco.uxcore.common/images/button/button.jpg";
      this.complex.bgover = "jsxplugin://tibco.uxcore.common/images/button/button.jpg";
      this.complex.bgdown = "jsxplugin://tibco.uxcore.common/images/button/button_down.jpg";
      this.complex.bgon = "jsxplugin://tibco.uxcore.common/images/button/button_down.jpg";
      this.complex.bgf = "jsxplugin://tibco.uxcore.common/images/button/buttonFocus.jpg";
      this.complex.bgoverf = "jsxplugin://tibco.uxcore.common/images/button/buttonFocus.jpg";
      this.complex.bgdownf = "jsxplugin://tibco.uxcore.common/images/button/buttonFocus_down.jpg";
      this.complex.bgonf = "jsxplugin://tibco.uxcore.common/images/button/buttonFocus_down.jpg";
  };

  //initialize default prototoype
  button.setDefaultImages();

  button.onAfterAssemble = function() {
    this.jsxsuper();
    this.setDefaultImages();
    if(this.setDefaultStyle) this.setDefaultStyle();
  };

  button.onAfterAttach = function() {
      this.initAndRegister();
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
                '<img u:protected="true" style="vertical-align:middle;border:0px;padding:0px;margin:1px 0px 0px 0px;" src="{src}"/>',
              '</inlinebox>',
              '<inlinebox style="display:{t_display};font-name:{$fontname};font-size:{$fontsize};color:{$color};font-weight:{$fontweight};white-space:nowrap;background-image:{complex.img};background-position:{bg_offset};vertical-align:top;text-align:{$textalign}">',
                '<padding>{txt_padding}</padding>',
                '<height>$$parentheight</height>',
                '<width>{t_width}</width>',
                '<text>{$text}</text>',
              '</inlinebox>',
              '<inlinebox style="background-image:{complex.img};background-position:right top;width:{r_width};overflow:hidden;height:100%;vertical-align:top;font-size:0px;"><text>&amp;#160;</text></inlinebox>',
          '</inlinebox>',
        '</template>',
        '<model>',
          '<import resolver="$disabled_opacity" set="jsx3.gui.Form"/>' ,
          '<var id="complex.img" triggers="complex.img jsximage jsxonimage">return this.complex.img || this._getCurrentImageURL(false, false);</var>',
          '<var id="i_display" triggers="jsxicon">return jsx3.util.strEmpty(this.jsxicon) ? "none" : "";</var>',
          '<var id="t_display" triggers="jsxtext">return jsx3.util.strEmpty(jsx3.util.strTrim(this.jsxtext+"")) ? "none" : "";</var>',
          '<var id="cursor" triggers="jsxenabled">return this._isEnabled() ? "pointer" : "default";</var>',
          '<var id="l_width" triggers="affordance">return this.getAffordance().split(" ")[3];</var>',
          '<var id="r_width" triggers="affordance">return this.getAffordance().split(" ")[1];</var>',
          '<var id="t_width" triggers="affordance jsxwidth jsxicon">return !jsx3.util.strEmpty(this.jsxwidth) ? this.jsxwidth - (parseInt(this.getAffordance().split(" ")[1]) + parseInt(this.getAffordance().split(" ")[3]) + (jsx3.util.strEmpty(this.jsxicon)?0:16)) : null;</var>',
          '<var id="bg_offset" triggers="affordance">return "-" + this.getPaintProfile().l_width + "px" + " 0";</var>',
          '<var id="txt_padding" triggers="jsxpadding">return jsx3.util.strEmpty(this.getPadding()) ? this.getAffordance().split(" ")[0] + " 0 0 0" : this.getPadding();</var>',
          '<var id="src" triggers="jsxicon">return this.getServer() ? this.getIcon(this.complex.icon) : this.complex.icon;</var>',
        '</model>',
      '</transform>',
    ''].join('');
  };


  //TODO: remove this method in production; it exists in build 9+ of V 3.7
  button.emGetTemplate = function(strEnabled, strDisabled) {
    return '<xsl:choose xmlns:xsl="http://www.w3.org/1999/XSL/Transform">' +
        '<xsl:when test="@jsxnomask=\'1\'"></xsl:when>' +
        '<xsl:when test="@jsxdisabled=\'1\'">' + strDisabled + '</xsl:when>' +
        '<xsl:otherwise>' + strEnabled + '</xsl:otherwise>' +
        '</xsl:choose>';
  };


  //TODO: remove this method in production; it exists in build 9+ of V 3.7
  button.setPropertyGUI = function( objGUI, strName, strValue ) {
    this._setProperty.call(this,objGUI,arguments);
  };


  //TODO: remove this method in production; it exists in build 9+ of V 3.7
  button._setProperty = function( objGUI, a ) {
    var y = [];
    var strValue, strName;
    for (var i = objGUI !== null ? 1 : 0; i < a.length; i+=2) {
      strName = a[i]; strValue = a[i+1];
      if (strValue != null) {
        var target = this;
        var arr = strName.split(".");
        while(arr.length > 1)
          target = target[arr.shift()];
        target[arr.pop()] = strValue;
      } else
        delete this[strName];
      y.push(strName);
    }
    if(y.length)
      this.syncProperty(y, null, objGUI);
  };


  //called when the button is about to be painted. sets the default bg image to use (as it should appear when it is first painted)
  button._configureBG = function() {
    this.applyDynamicProperties(false);
    this.complex.img = this._getCurrentImageURL(false, false);
  };


  //called when the control is painted; binds hotkeys
  button._setKeyBinding = function() {
    var myKeyBinding = this.getKeyBinding();
    if (myKeyBinding) {
      var me = this;
      if (this._jsxhotkey != null)
        this._jsxhotkey.destroy();
      this._jsxhotkey = this.doKeyBinding(function(e){ me.onclick(e, me.getRendered()); }, myKeyBinding);
      if (this._jsxhotkey) this._jsxhotkey.setEnabled(this.getEnabled() != jsx3.gui.Form.STATEDISABLED);
    }
    if(this._jsxisfocusing) {
      this.focus();
    }
  };


    button.focus = function() {
      //give focus to persistent on-screen anchor
      var objGUI = this.getRendered();
      if (objGUI) {
        jsx3.html.focus(objGUI);
        return objGUI;
      }
    };

  button.onfocus = function(objEvent, objGUI) {
    if(this.getFocusStyle()) {
      this._jsxisfocusing = true;
      this.setPropertyGUI(objGUI,"complex.img",this._getCurrentImageURL(false, false,true));
    }
  };

  button.onblur = function(objEvent, objGUI) {
    delete this._jsxisfocusing;
    this.setPropertyGUI(objGUI,"complex.img",this._getCurrentImageURL(!!this.getImage(), false));
  };

  button.onmouseover = function(objEvent, objGUI) {
    this.setPropertyGUI(objGUI,"complex.img",this._getCurrentImageURL(true, false,!!this._jsxisfocusing));
  };

  button.onmousedown = function(objEvent, objGUI) {
    this._jsxisfocusing = true;
    this.setPropertyGUI(objGUI,"complex.img",this._getCurrentImageURL(false, true));
  };

  button._internal = function(objEvent,objGUI) {
      var elem = objEvent.toElement();
      if(elem) {
          return elem.parentNode == objGUI || elem.parentNode.parentNode == objGUI;
      }
      else return false;
  };

  button.onmouseout = function(objEvent, objGUI) {
    if(!this._internal(objEvent, objGUI))
      this.setPropertyGUI(objGUI,"complex.img",this._getCurrentImageURL(false, false,!!this._jsxisfocusing));
  };

  button.onmouseup = function(objEvent, objGUI) {
    this.setPropertyGUI(objGUI,"complex.img",this._getCurrentImageURL(true, false,!!this._jsxisfocusing));
  };

  button.onclick = function(objEvent, objGUI) {
    if(jsx3.CLASS_LOADER.IE) this.focus();
    this._onexecute(objEvent,objGUI);
  };

  button.doExecute = function(objEvent, objGUI) {
    this._onexecute(objEvent,objGUI);
  };

  button.onkeypress = function(objEvent, objGUI) {
    if(objEvent.enterKey() || objEvent.spaceKey())
      this._onexecute(objEvent,objGUI);
  };

  button._onexecute = function(objEvent,objGUI) {
    if (objEvent && !objEvent.leftButton() && objEvent.isMouseEvent()) return;

    if (this.getType() == BUTTON.TYPE_TOGGLE) {
      var newState = this.getState() == BUTTON.STATE_OFF ? BUTTON.STATE_ON : BUTTON.STATE_OFF;
      var fctn = function(value) {
          if (value !== false) {
              this.setState(newState);
          }
      }
      this.doEvent(Interactive.TOGGLE, {objEVENT:objEvent, intSTATE:newState, fctnRETURN: fctn});
    }
    this.doEvent(Interactive.EXECUTE, {objEVENT:objEvent});
  };


  button._getCurrentImageURL = function(bOver, bDown, bFocus) {
    var strPath = null;

    if (this.getEnabled() == Form.STATEENABLED) {
      if (bOver)
        strPath = this.getOverImage(bFocus);
      else if (bDown)
        strPath = this.getDownImage(bFocus);

      if (this.getType() == BUTTON.TYPE_TOGGLE && this.getState() == BUTTON.STATE_ON)
        strPath = strPath || this.getOnImage();
    }
    strPath = strPath || this.getImage(bFocus);
    return "url(" + (strPath ? this.getUriResolver().resolveURI(strPath) : "") + ")";
  };


  /**
   * Returns the padding required by the intance to grant adequate room for edges and buffers.
   * @return {String}
   */
  button.getAffordance = function() {
    return this.affordance || BUTTON.DEFAULT_AFFORDANCE;
  };

  /**
   * Sets the padding required by the intance to grant adequate room for the edges and buffers required by the background image.
   * @param strAffordance{String} For example, "2 8 2 8"
   */
  button.setAffordance = function(strAffordance) {
    this.setProperty("affordance",strAffordance);
  };

  //subclass of method in jsx3.gui.Form to ensure the icon gets greyed out
  button.setEnabled = function(intEnabled) {
    this.setProperty("jsxenabled",intEnabled);
    return this;
  };

  //convenience method to check disabled state
  button._isEnabled = function() {
    return this.getEnabled() == null || this.getEnabled();
  };

  /**
   * Returns the URL to use for the 16x16 icon.
   * @param-private strDefault {String}
   * @return {String}
   */
  button.getIcon = function(strDefault) {
      return !jsx3.util.strEmpty(this.jsxicon) ? this.getServer().resolveURI(this.jsxicon) : (this.getServer().getDynamicProperty(this.getDynamicProperty("jsximage"))?this.getServer().getDynamicProperty(this.getDynamicProperty("jsximage")):strDefault);
  };

  /**
   * Sets the URL to use for the dropdown image (16x16).
   * @param strPath {String} This URL will be resolved relative to the project path.
   */
  button.setIcon = function(strPath) {
    this.setProperty("jsxicon",strPath);
    this.repaint();
  };


  button.setText = function(strText) {
    this.setProperty("jsxtext",strText);
    this.repaint();
  };


  /**
   * Returns the URL for the background image to use when the control is moused over. If not provided, a default system image will be used.
   * @param-private bFocus {Boolean}
   * @return {String}
   */
  button.getOverImage = function(bFocus) {
    if(bFocus && this.getFocusStyle())
      return this.complex.bgoverf;
    else
      return Number(this.jsxoverimage) == 1 ? this.complex.bgover : (!jsx3.util.strEmpty(this.jsxoverimage) ? this.jsxoverimage : null);
  };

  /**
   * Sets the URL for the image to use when the control is moused over.
   * @param strPath {String} This URL will be resolved relative to the project path.
   */
  button.setOverImage = function(strPath) {
    this.setProperty("jsxoverimage", strPath);
    return this;
  };

  /**
   * Returns the URL for the background image to use when the control is moused down. If not provided, a default system image will be used.
   * @param-private bFocus {Boolean}
   * @return {String}
   */
  button.getDownImage = function(bFocus) {
    if(bFocus && this.getFocusStyle())
      return this.complex.bgdownf;
    else
      return Number(this.jsxdownimage) == 1 ? this.complex.bgdown : (!jsx3.util.strEmpty(this.jsxdownimage) ? this.jsxdownimage : null);
  };

  /**
   * Sets the URL for the image to use when the control is moused down.
   * @param strPath {String} This URL will be resolved relative to the project path.
   */
  button.setDownImage = function(strPath) {
    this.setProperty("jsxdownimage", strPath);
    return this;
  };


  /**
   * Returns the URI of the image of this image button.
   * @param-private bFocus {Boolean}
   * @return {String}
   */
  button.getImage = function(bFocus) {
    if(bFocus && this.getFocusStyle())
      return this.complex.bgf;
    else
      return Number(this.jsximage) == 1 ? this.complex.bg : (!jsx3.util.strEmpty(this.jsximage) ? this.jsximage : null);
  };

  /**
   * Sets the URI of the image of this image button. This is the default image that is displayed if the button
   * is off or if the button is in a state for which no image URI is specified.
   * @param strImage {String}
   * @return {jsx3.gui.button} this object
   */
  button.setImage = function(strImage) {
    delete this.complex.img;
    this.setProperty("jsximage", strImage);
    return this;
  };


  /**
   * Returns the URI of the on image of this image button.
   * @return {String}
   */
  button.getOnImage = function() {
    return Number(this.jsxonimage) == 1 ? this.complex.bgon : (!jsx3.util.strEmpty(this.jsxonimage) ? this.jsxonimage : null);
  };

  /**
   * Sets the URI of the on image of this image button. This is the image that is displayed when this image button is
   * of type <code>TYPE_TOGGLE</code> and its state is <code>STATE_ON</code>.
   * @param strImage {String}
   * @return {jsx3.gui.button} this object
   */
  button.setOnImage = function(strImage) {
    delete this.complex.img;
    this.setProperty("jsxonimage", strImage);
    return this;
  };

  /**
   * Returns the current state of this image button.
   * @return {int} <code>STATE_OFF</code> or <code>STATE_ON</code>
   * @see #STATE_OFF
   * @see #STATE_ON
   */
  button.getState = function() { return this.jsxstate; };


  /**
   * Sets the current state of this image button and updates the displayed image accordingly.
   * @param intState {int} <code>STATE_OFF</code> or <code>STATE_ON</code>
   * @return {jsx3.gui.button} this object
   */
  button.setState = function(intState) {
    this.jsxstate = intState;
    this.setProperty("complex.img",this._getCurrentImageURL(false, !!intState));
    if(intState && !jsx3.util.strEmpty(this.getGroupName()))
      this._deselectSiblings();
  };

  /**
   * If any siblings belong to the same group, make sur their stat is toggled off
   */
  button._deselectSiblings = function() {
    var objSibs = this.getParent().getChildren();
    for(var i=0;i<objSibs.length;i++) {
      objSib = objSibs[i];
      if(objSib != this && objSib.getClass() == this.getClass()  && objSib.getGroupName() == this.getGroupName())
        objSib.setState(0);
    }
  };

  /**
   * Returns the type of this image button.
   * @return {int} <code>TYPE_NORMAL</code> or <code>TYPE_TOGGLE</code>
   * @see #TYPE_NORMAL
   * @see #TYPE_TOGGLE
   */
  button.getType = function() { return this.jsxtype; };

  /**
   * Sets the type of this image button.
   * @param intType {int} <code>TYPE_NORMAL</code> or <code>TYPE_TOGGLE</code>
   * @return {jsx3.gui.button} this object
   */
  button.setType = function(intType) { this.jsxtype = intType; return this; };


  /**
   * If this image button is of type <code>TYPE_TOGGLE</code>, then the state must be either <code>STATE_ON</code>
   * or required must be <code>OPTIONAL</code> to pass validation.
   * @return {int}
   */
  button.doValidate = function() {
    var state = null;

    if (this.getType() == BUTTON.NORMAL)
      state = Form.STATEVALID;
    else
      state = this.getState() == BUTTON.STATE_ON || this.getRequired() == Form.OPTIONAL ?
          Form.STATEVALID : Form.STATEINVALID;

    this.setValidationState(state);
    return state;
  };

  button.emGetType = function() {
    return jsx3.gui.Matrix.EditMask.FORMAT;
  };

  button.emInit = function(objColumn) {
    this.jsxsupermix(objColumn);
  };

  button.emSetValue = function(strValue) {
  };

  button.emGetValue = function() {
    return null;
  };

  button.emBeginEdit = function(strValue, objTdDim, objPaneDim, objMatrix, objColumn, strRecordId, objTD) {
    var toFocus = objTD.childNodes[0].childNodes[0];
    if (toFocus) {
      this.jsxsupermix(strValue, objTdDim, objPaneDim, objMatrix, objColumn, strRecordId, objTD);
      jsx3.html.focus(toFocus);
    } else {
      return false;
    }
  };

  button.emPaintTemplate = function() {
    this.setProperty("jsxenabled",0,"complex.img",this._getCurrentImageURL(false, false));
    var disabled = this.paint();
    this.setProperty("jsxenabled",1);
    var enabled = this.paint();
    return this.emGetTemplate(enabled, disabled);
  };

  /**
   * Sets whether or not the button will display a graphical treatment when it has focus
   * @param intFocus {int} 0 or 1. If 1, the button will implement a focus style
   */
  button.setFocusStyle = function(intFocus) {
    this.focusstyle = intFocus;
  };

  /**
   * Returns whether or not the button will display a graphical treatment when it has focus
   * @return {int}
   */
  button.getFocusStyle = function() {
    return this.focusstyle;
  };

  /**
   * Sets the name of the group (e.g., radio group) that this button (a toggle-type button) belongs to
   * @param strName {String}
   */
  button.setGroupName = function(strName) {
    this.jsxgroupname = strName;
  };

  /**
   * Returns the name of the group (e.g., radio group) that this button (a toggle-type button) belongs to
   * @return {String}
   */
  button.getGroupName = function() {
    return this.jsxgroupname;
  };

  /**
  * Returns the value of the dynamic property @strPropName
  * @param strPropName {String} id for this dynamic property among all properties
  * @param strToken {String...} if present tokens such as {0}, {1}, {n} will be replaced with the nth element of this vararg array
  * @return {String} value of the property
  */
  button.getDynamicValue = function(strPropName, strToken) {
    return plugIn.getServer().getDynamicProperty(strPropName, strToken);
  };

  /**
   * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
   * @param objJSX {Object}
   * @param objSetting {Array} properties list
   * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
   */
  button.setDefaultProperty = function(objJSX, objSetting, bNotSave, bOverwrite) {
    for(var i in objSetting) {
      if(bOverwrite || (!this[i] && !this.getDynamicProperty(i))) {
        objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
      }
    };
    return objJSX;
  };


  button.setDefaultStyle = function() {
//      jsx3.log("Setting default style: " + this);
      this.setDefaultProperty(this, {
          "jsxwidth"      : "@uxcore10@NormalBtn Width",
          "jsxheight"     : "@uxcore10@NormalBtn Height",
          "affordance"    : "@uxcore10@NormalBtn Affordance",
          "jsxfontname"   : "@uxcore10@NormalBtn Font Name",
          "jsxfontsize"   : "@uxcore10@NormalBtn Font Size",
          "jsxfontweight" : "@uxcore10@NormalBtn Font Weight",
          "jsxcolor"      : "@uxcore10@NormalBtn Color",
          "jsxpadding"    : "@uxcore10@NormalBtn Padding",
          "jsxmargin"     : "@uxcore10@NormalBtn Margin"
      }, true, !this.jsxownstyle);
  };
});


jsx3.lang.Class.defineClass("tibco.uxcore.gui.ImageButton",
    tibco.uxcore.gui.Button, null,
    function(BUTTON, button) {
        button.setDefaultStyle = function() {
            this.setDefaultProperty(this, {
                "jsxwidth"   : "@uxcore10@ImageButton Width",
                "jsxheight"  : "@uxcore10@ImageButton Height",
                "affordance" : "@uxcore10@ImageButton Affordance"
            }, true);
        };
});

jsx3.lang.Class.defineClass("tibco.uxcore.gui.IconButton",
    tibco.uxcore.gui.Button, null,
    function(BUTTON, button) {
});

})(this);
