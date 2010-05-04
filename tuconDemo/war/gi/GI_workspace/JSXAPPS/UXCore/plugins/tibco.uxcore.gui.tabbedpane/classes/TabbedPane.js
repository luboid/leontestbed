/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn){

//jsx3.require("jsx3.gui.Block", "jsx3.gui.TabbedPane", "jsx3.gui.LayoutGrid");

if(jsx3.ide) {
    jsx3.ide.loadTemplateCatalog("prop", "jsxplugin://tibco.uxcore.gui.tabbedpane/properties/catalog.xml",plugIn);
    jsx3.ide.loadTemplateCatalog("event", "jsxplugin://tibco.uxcore.gui.tabbedpane/events/catalog.xml",plugIn);
}

//require the template engine (and all required interfaces by the class)
//jsx3.require("jsx3.gui.Template","jsx3.gui.Form");

//define the new class
jsx3.lang.Class.defineClass("tibco.uxcore.gui.TabbedPane.NavButton",jsx3.gui.Template.Block, null, function(BUTTON,button) {

  var Event = jsx3.gui.Event;
  var Interactive = jsx3.gui.Interactive;

  BUTTON.LSCROLLER = jsx3.html.getCSSPNG(jsx3.resolveURI("jsx:///images/tab/l.png"));
  BUTTON.RSCROLLER = jsx3.html.getCSSPNG(jsx3.resolveURI("jsx:///images/tab/r.png"));

  BUTTON.AUTO_SCROLL_INTERVAL = 50;

  button.jsxscrolltype = "left";
  button.getTemplateXML = function() {
    return ['',
      '<transform xmlns="http://gi.tibco.com/transform/" xmlns:u="http://gi.tibco.com/transform/user" version="1.0">',
        '<template onpaint="this.onPaint(); " onresize="this.onResize();">',
          '<span onmouseover="{mouseover}" onmouseout="{mouseout}" ',
          'style="position:relative;width:14px;height:14px;display:none;cursor:pointer;">',
              '<inlinebox u:id="image" style="background-position:0 0;background-repeat:no-repeat;width:100%;height:100%;font-size:0px;margin:2px 2px 2px 2px"><style-group>{float}</style-group><text>&amp;#160;</text></inlinebox>',
          '</span>',
        '</template>',
        '<model>',
          '<var id="float">return this.jsxscrolltype=="right" ? "float:right;" : "float:left";</var>',
        '</model>',
      '</transform>',
    ''].join('');
  };

  button.onResize = function() {
    try {
      this.getParent().getParent().getParent()._updateAutoScrollDisplay();
    }
    catch (e) {}
  };

  button.onPaint = function() {

    var objImage = this.getRenderedBox("image");
    var objGUI = this.getRendered();

    if(this.jsxscrolltype=="right") {
      objGUI.style.cssFloat = "right";
      objGUI.style.styleFloat = "right";
      jsx3.html.DOM.setStyles(objImage, BUTTON.RSCROLLER);
      if(this.getTotalWidth()>0) { this.getRendered().style.display = ""; }
    } else {
      objGUI.style.cssFloat = "left";
      objGUI.style.styleFloat = "left";
      jsx3.html.DOM.setStyles(objImage, BUTTON.LSCROLLER);
    }
  };

  button._getTabContainerElement = function() {
    return this.getParent().getChild(0).getRendered();
  };

  button.getTotalWidth = function() {
    return - this.getParent().getRendered().offsetWidth + this._getTabContainerElement().offsetWidth;
  };

  button._getLeftButton = function() {
    return this.getParent().getChild(1).getRendered();
  };

  button._getRightButton = function() {
    return this.getParent().getChild(2).getRendered();
  };

  button.mouseover = function(objEvent, objGUI) {
    //this.doEvent(Interactive.MOUSEOVER, {objEVENT:objEvent, objGUI:objGUI})
     var my = this;
     /* @jsxobf-clobber */
     this._jsxautoscrollinterval = {};
     this._jsxautoscrollinterval.interval = window.setInterval(function() {  my._doAutoScroll(); }, BUTTON.AUTO_SCROLL_INTERVAL);

  };

  button.mouseout = function(objEvent, objGUI) {
    //this.doEvent(Interactive.MOUSEOUT, {objEVENT:objEvent, objGUI:objGUI})
    if(this._jsxautoscrollinterval) {
      window.clearInterval(this._jsxautoscrollinterval.interval);
      delete this._jsxautoscrollinterval;
    }
  };

  button._doAutoScroll = function() {
    try {
      var objVP = this._getTabContainerElement();
      var intLeft = parseInt(objVP.style.left, 10);
      if(this.jsxscrolltype == "left") {
        //reveal tabs to the left
        if(intLeft < 0) {
          objVP.style.left = (intLeft + 5) + "px";
          this._getRightButton().style.display="";
          //objVP.nextSibling.nextSibling.style.display = "";
         } else {
          objVP.style.left = "0px";
          this._getLeftButton().style.display="none";
          //objVP.nextSibling.style.display = "none";
          this.mouseout();
        }
      } else {
        //reveal tabs to the right
        if(Math.abs(intLeft) + 5 <= this.getTotalWidth()) {
          objVP.style.left = (intLeft - 5) + "px";
          this._getLeftButton().style.display="";
          //objVP.nextSibling.style.display = "";
        } else {
          objVP.style.left = "-" + this.getTotalWidth() + "px";
          this._getRightButton().style.display="none";
          //objVP.nextSibling.nextSibling.style.display = "none";
          this.mouseout();
        }
      }
    }
    catch (e) {}

  };

});


/**
 * A tabbedPane in Uxcore
 */
jsx3.Class.defineClass("tibco.uxcore.gui.TabbedPane", jsx3.gui.Block, null, function(TabbedPane, TabbedPane_prototype) {

  var Block = jsx3.gui.Block;
  var Button = tibco.uxcore.gui.Button;
  var Interactive = jsx3.gui.Interactive;
  var NavButton = tibco.uxcore.gui.TabbedPane.NavButton;

  TabbedPane.TAB_BGTITLE = "images/tab_backgroundTile_V2.jpg";
  TabbedPane.BTN_HEIGHT = 22;
  TabbedPane.LINK_HEIGHT = 22;
  TabbedPane.STYLE_TAB = 0;
  TabbedPane.STYLE_LINK = 1;

    TabbedPane_prototype.tabStyle = TabbedPane.STYLE_TAB;

  /**
   * Get a logger instance with class name as identity
   */
  TabbedPane_prototype.getLogger = function() {
      return jsx3.util.Logger.getLogger(this.getClass().getName());
  };

jsx3.$O(TabbedPane_prototype).extend({

  init: function(strName) {
    this.jsxsuper(strName, 0, 0, "100%", "100%");
    this._ensureIntegrity();
  },

    getButtonHeight: function() {
        return (this.tabStyle == TabbedPane.STYLE_TAB) ? TabbedPane.BTN_HEIGHT : TabbedPane.LINK_HEIGHT;
    },

  _updateAutoScrollDisplay : function() {
    var intTabWidths = this._getBtnBar().getRendered().offsetWidth ;
    var intAvailWidth = this._getBtnContainer().getRendered().offsetWidth;
    if(intAvailWidth < intTabWidths) {
      var left = this._getBtnBar().getRendered().style.left;
      if(left< -intTabWidths + intAvailWidth) {
        this._getBtnBar().getRendered().style.left = (-intTabWidths + intAvailWidth) + "px";
        left = -intTabWidths + intAvailWidth;
      }
      this._getBtnContainer().getChild(1).getRendered().style.display = (parseInt(left, 10) <0) ? "" : "none";
      this._getBtnContainer().getChild(2).getRendered().style.display = "";
    } else {
      this._getBtnContainer().getChild(0).getRendered().style.left = "0px";
      this._getBtnContainer().getChild(1).getRendered().style.display = "none";
      this._getBtnContainer().getChild(2).getRendered().style.display = "none";
    }
  },

  _ensureIntegrity: function() {
    var layout = this.getChild(0);
    if (layout && !(layout instanceof jsx3.gui.LayoutGrid)) {
      this.removeChildren();
      layout = null;
    }

    if (!layout) {
      layout = new jsx3.gui.LayoutGrid();
      this.setChild(layout);
    }

    layout.setRows([this.getButtonHeight(), "*"]);

    var btnBar = layout.getChild(0);
    if (!btnBar) {
      btnBar = new jsx3.gui.Block(null, 0, 0, "100%", "100%");
      layout.setChild(btnBar);
    }

    var btnContainer = btnBar.getChild(0);
    if (!btnContainer) {
      btnContainer = new jsx3.gui.Block(null, 0, 0, null, 22);
      btnContainer.setCSSOverride("white-space:nowrap;");
      btnContainer.setRelativePosition(0);
      btnBar.setChild(btnContainer);

      var leftButton = new NavButton("lBtn");
      leftButton.jsxscrolltype="left";
      btnBar.setChild(leftButton);
      var rightButton = new NavButton("rBtn");
      rightButton.jsxscrolltype="right";
      btnBar.setChild(rightButton);
    }

    if(this.tabStyle == TabbedPane.STYLE_TAB) {
        btnBar.setBorder("0px;0px;1px solid #555555;0px");
    }
    else {
        btnBar.setBorder("0px;0px;0px;0px");
    }
    btnBar.jsxideinvisible = 1;

    var tp = layout.getChild(1);
    if (!tp) {
      tp = new jsx3.gui.TabbedPane();
      layout.setChild(tp);
    }

    if(this.tabStyle == TabbedPane.STYLE_TAB) {
        tp.setBorder("0px;1px solid #555555;1px solid #555555;1px solid #555555");
    }
    else {
        tp.setBorder("0px;0px;0px;0px");
    }
    tp.setShowTabs(0);
  },

    getTabStyle: function() {
        return ((typeof this.tabStyle == "undefined") || (this.tabStyle == null)) ? TabbedPane.STYLE_TAB : this.tabStyle;
    },

    setTabStyle: function(intStyle) {
        this.tabStyle = intStyle;
        this._getBtnBar().removeChildren();
        this._doAfterAttach();
        this.recalcBox();
        this.repaint();
    },

    setTabEnabled: function(intIndex, bEnabled) {
        var tab = this.getTab(intIndex);
        bEnabled = (bEnabled === true || bEnabled === 1) ? jsx3.gui.Form.STATEENABLED : jsx3.gui.Form.STATEDISABLED;
        if(tab) {
          this._getBtnBar().getChild(tab.getChildIndex()).setEnabled(bEnabled, true);
          tab.setEnabled(bEnabled);
        }
    },

    enableTabByIndex: function(intIndex) {
      return this.setTabEnabled(intIndex, true);
    },

    disableTabByIndex: function(intIndex) {
      return this.setTabEnabled(intIndex, false);
    },

    overrideTabSetText: function(objChild) {
        if(!objChild.patchedSetText) {
            objChild.oldSetText = objChild.setText;
            objChild.setText = function(strText) {
                this.oldSetText(strText);
                var tp = this.getAncestorOfType("tibco.uxcore.gui.TabbedPane");
                if(tp) {
                    tp._getBtnBar().removeChildren();
                    tp._doAfterAttach();
                    tp.repaint();
                }
            }
            objChild.patchedSetText = true;
        }
    },

  _processChild: function(objChild, index) {
    this.overrideTabSetText(objChild);
    var objContent = objChild.getChild(0);
    if (objContent) {
        if(!objContent.getPadding()) {
            objContent.setPadding("20");
        }
        if(this.tabStyle == TabbedPane.STYLE_TAB) {
          //alert("tab style");
            objContent.setBackground("background-image:url(" + plugIn.resolveURI(TabbedPane.TAB_BGTITLE) + ");background-repeat:repeat-x;",true);
            objContent.setBackgroundColor("#FAFAFA",true);
        }
        else {
          //alert("link style");
            objContent.setBackground("background-image:",true);
            objContent.setBackgroundColor("-1",true);
        }
    }

    var btn = new Button(null, 0, 0, null, this.getButtonHeight());
      btn.setDynamicProperty("jsxheight",null);
      btn.setDynamicProperty("jsxmargin",null);
      btn.setHeight(this.getButtonHeight());
      //      btn.setDefaultStyle();
      var txt = objChild.getText();
      if(!txt && objChild.getDynamicProperty("jsxtext")) {
        txt = tibco.uxcore.System.getServer().getDynamicProperty(objChild.getDynamicProperty("jsxtext"));
      }
      btn.sourceTab = objChild;
      if(this.tabStyle == TabbedPane.STYLE_LINK) {
          txt = "<u>" + txt + "</u>";
      }
    btn.setText(txt);
    btn.getUriResolver = function() { return plugIn; };
    btn.setType(Button.TYPE_TOGGLE);
    if(this.tabStyle == TabbedPane.STYLE_TAB) {
//        jsx3.log("Setting tab style");
        btn.setImage("images/tab.gif");
        btn.setOnImage("images/tab_selected.gif");
        btn.setMargin("0 5 -1 0");
        btn.setPadding("4 0 0 0");
        btn.setAffordance("2 11 2 11");
        btn.setFontWeight(jsx3.gui.Block.FONTBOLD);
        btn.setFontSize(11);
        btn.setColor("#2F475D");
    }
    else {
//        jsx3.log("Setting link style");
        btn.setDynamicProperty("jsxfontweight",null);
        btn.setDynamicProperty("jsxcolor",null);
        btn.setDynamicProperty("jsxfontsize",null);
        btn.setImage(null);
        btn.setOnImage(null);
        btn.setMargin("0 10 0 0");
        btn.setPadding("0 0 0 0");
        btn.setAffordance("0 0 0 0");
        btn.setFontWeight(jsx3.gui.Block.FONTNORMAL);
        btn.setFontSize(11);
        btn.setCSSOverride("text-decoration:underline");
        btn.setColor(tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@Link Color"));
    }
    btn.setEvent("1;", Interactive.EXECUTE);
    btn.subscribe(Interactive.EXECUTE, this, "_onBtnClick");
    btn.setPersistence(jsx3.app.Model.PERSISTNONE);
    btn.setFontName("Arial");
    btn.setEnabled(objChild.getEnabled());
    index = parseInt(index, 10);
    if(!isNaN(index)) {
        this._getBtnBar().insertBefore(btn, this._getBtnBar().getChild(index));
    } else {
        this._getBtnBar().setChild(btn);
    }
//      jsx3.log("Weight: " + btn.getFontWeight());
//    jsx3.sleep(function(){btn.getParent().recalcBox();btn.getParent().repaint();jsx3.log("New weight: " + btn.getFontWeight())},null,this,false);
  },

  _setBtnState: function(btn, bOn) {
    if(btn) {
        var txt = btn.sourceTab.getText();
        if(!txt && btn.sourceTab.getDynamicProperty("jsxtext")) {
          txt = tibco.uxcore.System.getServer().getDynamicProperty(btn.sourceTab.getDynamicProperty("jsxtext"));
        }

        if(this.tabStyle == TabbedPane.STYLE_LINK) {
            btn.setCSSOverride(bOn ? "text-decoration:" : "text-decoration:underline");
            btn.setFontWeight(bOn ? jsx3.gui.Block.FONTBOLD : jsx3.gui.Block.FONTNORMAL);
            btn.setColor(bOn ? "#000000" : "#2F475D");
            btn.setText(bOn ? txt : ("<u>" + txt + "</u>"))
            //btn.repaint();
//            jsx3.log("Updated weight to: " + btn.getFontWeight());
        }
        else {
            btn.setText(txt,true);
        }
        btn.setState(bOn ? Button.STATE_ON : Button.STATE_OFF);
    }
  },

  _onBtnClick: function(objEvent) {
    var index = objEvent.target.getChildIndex();
    var t = this.getTab(index);
    var veto = true;
    try {
      veto = this.doEvent("onbeforetabchange", {currentTab:this.getActiveTab(),targetTab:t});
    }
    catch (e) {
      this.getLogger().error("Error in Before Tab Change event: " + e);
    }
    if (t && (veto !== false)) t.doShow();
    else{
        this._setBtnState(this._getBtn(index), index == this.getActiveIndex());
        return;
    }

    var tabs = this.getTabCount();
    for (var i = 0; i < tabs; i++) {
      this._setBtnState(this._getBtn(i), i == index);
    }
  },

  _checkTabState: function() {
      var top = this._getLayout().getRows()[0];
      var newTop;
      if(!this.getHideSingleTab() || (this.getTabCount() > 1)) {
          newTop = this.getButtonHeight();
      }
      else {
          newTop = 1;
      }
      if(top != newTop) {
      this._getLayout().setRows([newTop, "*"],true);
      try {
          this._getLayout().recalcBox();
      }
      catch(ex) {
      }
      jsx3.sleep(function() {
          this.recalcBox();
          this.repaint();
      },null,this);
      }
  },

  setHideSingleTab: function(intHide) {
      this.hideSingleTab = intHide;
      this._checkTabState();
  },

  getHideSingleTab: function() {
      return ((typeof this.hideSingleTab == "undefined") || this.hideSingleTab) ? jsx3.Boolean.TRUE : jsx3.Boolean.FALSE;
  },

    onAfterAttach: function() {
        this.jsxsuper();
        this._doAfterAttach();
    },

    _doAfterAttach: function() {

    this._ensureIntegrity();
      var me = this;
      var tp = this._getTabbedPane();
//      tp.adoptChild = function(objChild,bRepaint,bForce) {
//          var ret = jsx3.app.Model.prototype.adoptChild.call(this, objChild,bRepaint,bForce);
//          jsx3.sleep(function() {this._checkTabState();},null,me);
//          return ret;
//      }
//      tp.setChild = function(objChild,intPersist,strSourceURL,strNS) {
//          var ret = jsx3.app.Model.prototype.setChild.call(this, objChild,intPersist,strSourceURL,strNS);
//          jsx3.sleep(function() {this._checkTabState();},null,me);
//          return ret;
//      }
//      tp.removeChild = function(vntItem) {
//          var ret = jsx3.app.Model.prototype.removeChild.call(this, vntItem);
//          jsx3.log("Remove Child");
//          jsx3.sleep(function() {this._checkTabState();},null,me);
//          return ret;
//      }
//      tp.removeChildren = function(arrChildren) {
//          var ret = jsx3.app.Model.prototype.removeChildren.call(this, arrChildren);
//          jsx3.sleep(function() {this._checkTabState();},null,me);
//          return ret;
//      }
//      tp.doClone = function(intPersist,intMode) {
//          var ret = jsx3.app.Model.prototype.doClone.call(this, intPersist,intMode);
//          jsx3.sleep(function() {this._checkTabState();},null,me);
//          return ret;
//      }

      this._checkTabState();
      this._getBtnBar().removeChildren();
    jsx3.$A(this._getTabbedPane().getChildren()).each(jsx3.$F(function(e) {
      this._processChild(e);
    }).bind(this));

    if(!this._getTabbedPane()._oldOnChildAdded) {
      this._getTabbedPane()._oldOnChildAdded = this._getTabbedPane().onChildAdded;
      this._getTabbedPane()._oldOnRemoveChild = this._getTabbedPane().onRemoveChild;
      var uxTabbedPane = this;
      this._getTabbedPane().onChildAdded = function(objChild) {
          var ret = this._oldOnChildAdded(objChild);
          if(jsx3.IDE) {
          var index = uxTabbedPane.getActiveIndex();
          uxTabbedPane._getBtnBar().removeChildren();
          jsx3.$A(uxTabbedPane._getTabbedPane().getChildren()).each(jsx3.$F(function(e) {
            this._processChild(e);
          }).bind(uxTabbedPane));

          if (index >= 0)
            uxTabbedPane._setBtnState(uxTabbedPane._getBtnBar().getChild(index), true);
          uxTabbedPane._getBtnBar().repaint();
          uxTabbedPane._updateAutoScrollDisplay();
          }
          jsx3.sleep(function() {this._checkTabState();},null,me);
          return ret;
      };

      this._getTabbedPane().onRemoveChild = function(objChild, intIndex) {
          var ret = this._oldOnRemoveChild(objChild,intIndex)
          if(jsx3.IDE) {
          var index = uxTabbedPane.getActiveIndex();
          if (index < 0 && uxTabbedPane._getTabbedPane().getChildren().length > 0)
            index = 0;
          if (index == intIndex) index = 0;

          uxTabbedPane._getBtnBar().removeChildren();
          jsx3.$A(uxTabbedPane._getTabbedPane().getChildren()).each(jsx3.$F(function(e) {
            this._processChild(e);
          }).bind(uxTabbedPane));

          if (index >= 0)
            uxTabbedPane._setBtnState(uxTabbedPane._getBtnBar().getChild(index), true);
          uxTabbedPane._getBtnBar().repaint();
          uxTabbedPane._updateAutoScrollDisplay();
          }
          jsx3.sleep(function() {this._checkTabState();},null,me);

          return ret;
      };

    }

    var index = this.getActiveIndex();
    if (index < 0 && this._getTabbedPane().getChildren().length > 0)
      index = 0;

    if (index >= 0) {
      this._setBtnState(this._getBtnBar().getChild(index), true);
    }
  },

  onSetChild: function(objChild) {
    return objChild instanceof jsx3.gui.LayoutGrid && this.getChildren().length == 0;
  },

  getActiveIndex: function() {
    return this._getTabbedPane().getSelectedIndex();
  },

  setActiveIndex: function(tabIndex, bPainted) {
    var t = this.getTab(tabIndex);
    if (t) {
      try {
        veto = this.doEvent("onbeforetabchange", {currentTab:this.getActiveTab(),targetTab:t});
      }
      catch (e) {
        this.getLogger().error("Error in Before Tab Change event: " + e);
      }
      if (t && (veto !== false)) {
        t.doShow();
        var tabs = this.getTabCount();
        for (var i = 0; i < tabs; i++) {
          this._setBtnState(this._getBtn(i), i == tabIndex);
        }
      }
    }
  },

  scrollActiveTabToView: function(tabIndex) {
    tabIndex = tabIndex || this.getActiveIndex();
    var intTabWidths = this._getBtnBar().getRendered().offsetWidth ;
    var intAvailWidth = this._getBtnContainer().getRendered().offsetWidth;
    if(intAvailWidth < intTabWidths) {
      var left = -this._getBtn(tabIndex).getRendered().offsetLeft;
      var width = this._getBtn(tabIndex).getRendered().offsetWidth;
      var currentLeft = this._getBtnBar().getRendered().offsetLeft;
      if(left<currentLeft && -left+width<=-currentLeft+intAvailWidth) return;
      if(left< -intTabWidths + intAvailWidth) {
        left = -intTabWidths + intAvailWidth;
      }
      this._getBtnBar().getRendered().style.left = left + "px";
      this._getBtnContainer().getChild(1).getRendered().style.display = (parseInt(left, 10) <0) ? "" : "none";
      this._getBtnContainer().getChild(2).getRendered().style.display = (left != -intTabWidths + intAvailWidth) ? "" : "none";
    } else {
      //nothing
    }
  },

  getTabCount: function() {
    return this._getTabbedPane().getChildren().length;
  },

  getActiveTab: function() {
    return this._getTabbedPane().getChild(this.getActiveIndex());
  },

  addTab: function(tabName, index) {
    var objTab;
    if(typeof(tabName) == "object" && tabName.instanceOf && tabName.instanceOf("jsx3.gui.Tab")) {
        objTab = tabName;
    } else {
      if(typeof(tabName) == "object" && tabName.id) {
          objTab = new jsx3.gui.Tab(tabName.id, tabName.name || tabName.text);
      }
      if(typeof(tabName) == "string") {
          objTab = new jsx3.gui.Tab("tab", tabName);
      }
    }
    if(objTab && this._getTabbedPane()) {
        this.overrideTabSetText(objTab);
//        objTab.getFirstChild().setBackgroundColor("#FFFFFF");
        objTab.getFirstChild().setPadding("20");

        index = parseInt(index, 10);
        if(!isNaN(index) && index>=0 && index<=this.getTabCount()-2) {
            if(index<= this.getActiveIndex()) {
                this._getTabbedPane().setSelectedIndex(this.getActiveIndex()+1, false);
            }
            this._getTabbedPane().insertBefore(objTab, this.getTab(index));
        } else {
            this._getTabbedPane().setChild(objTab, jsx3.app.Model.PERSISTEMBED);
        }
        this._getTabbedPane().paintChild(objTab);
        if(!jsx3.IDE) this._processChild(objTab, index);
        this._getBtnBar().repaint();
        this._updateAutoScrollDisplay();
        return objTab;
    }
    else {
    alert("no tabbed pane: " + this._getTabbedPane());
    }
    return null;
  },

  deleteTab: function(tabIndex) {
      if(this._getTabbedPane() && this._getTabbedPane().getChild(tabIndex)) {
          this._getBtnBar().removeChild(tabIndex);
          this._getTabbedPane().removeChild(tabIndex);
          this._getBtnBar().repaint();
          this._updateAutoScrollDisplay();
      }
  },

  removeTab : function(tabIndex) {
      return this.deleteTab(tabIndex);
  },

  removeTabs : function() {
      if(this._getTabbedPane()) {
          this._getBtnBar().removeChildren();
          this._getTabbedPane().removeChildren();
          this._getBtnBar().repaint();
          this._updateAutoScrollDisplay();
      }
  },

  showTab: function(tabIndex) {
      if(this._getTabbedPane() && this._getTabbedPane().getChild(tabIndex)) {
          this._getTabbedPane().getChild(tabIndex).setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true);
          this._getBtnBar().getChild(tabIndex).setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true);
          this._getBtnBar().repaint();
          this._updateAutoScrollDisplay();
      }
  },

  hideTab: function(tabIndex) {
      if(this._getTabbedPane() && this._getTabbedPane().getChild(tabIndex)) {
          this._getTabbedPane().getChild(tabIndex).setDisplay(jsx3.gui.Block.DISPLAYNONE, true);
          this._getBtnBar().getChild(tabIndex).setDisplay(jsx3.gui.Block.DISPLAYNONE, true);
          if(this.getActiveIndex() == tabIndex) {
              this.setActiveIndex(0);
          }
          this._getBtnBar().repaint();
          this._updateAutoScrollDisplay();
      }
  },

  isHiddenTab: function(tabIndex) {
      if(this._getTabbedPane() && this._getTabbedPane().getChild(tabIndex)) {
          return this._getTabbedPane().getChild(tabIndex).getDisplay() == jsx3.gui.Block.DISPLAYNONE
      }
      return null;
  },

  _getLayout: function() {
    return this.getChild(0);
  },

  _getBtnContainer: function() {
    var l = this._getLayout();
    return l ? l.getChild(0) : null;
  },

  _getBtnBar: function() {
    var l = this._getLayout();
    return l ? l.getChild(0).getChild(0) : null;
  },

  _getTabbedPane: function() {
    var l = this._getLayout();
    return l ? l.getChild(1) : null;
  },

  _getBtn: function(intIndex) {
    var bb = this._getBtnBar();
    return bb ? bb.getChild(intIndex) : null;
  },

  getTab: function(intIndex) {
    var tp = this._getTabbedPane();
    return tp ? tp.getChild(intIndex) : null;
  }

});

});

})(this);

