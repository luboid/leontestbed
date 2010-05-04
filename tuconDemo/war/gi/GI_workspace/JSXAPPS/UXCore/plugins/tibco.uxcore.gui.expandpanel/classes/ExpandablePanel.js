/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn){

//jsx3.require("jsx3.gui.Block");

if(jsx3.ide) {
    jsx3.ide.loadTemplateCatalog("event", "jsxplugin://tibco.uxcore.gui.expandpanel/events/catalog.xml",plugIn);
}

/**
 * A wizard. Provided by the <code>jsx3.amp.util.wizard</code> plug-in.
 */
jsx3.Class.defineClass("tibco.uxcore.gui.ExpandablePanel", jsx3.gui.Block, null, function(SwapPane, SwapPane_prototype) {

  var Block = jsx3.gui.Block;

  SwapPane.DEFAULT_MILLIS = 800;
  SwapPane._MILLIS_PER_STEP = 75;

  SwapPane.EVENT_BEFORE_SWAP = "jsxbeforeswap"; //onBeforeSwap
  SwapPane.EVENT_AFTER_SWAP  = "jsxafterswap";   //onAfterSwap

  SwapPane.HORIZONTAL = 0;
  SwapPane.VERTICAL = 1;

  SwapPane.RELATIVE = 0;
  SwapPane.FORWARD = -1;
  SwapPane.BACKWARD = 1;

jsx3.$O(SwapPane_prototype).extend({

  swap: function(inc, bLoop) {
    var index = this.getActiveIndex() + inc;
    if(bLoop) {
      var count = this.getChildren().length;
      index = (index >=0) ? index%count : (index%count+count)
    }
    if (this.getChildren()[index]) {
      this.setActivePane(index);
      return true;
    }
    return false;
  },

  swapNext: function(bLoop) {
    return this.swap(1, bLoop);
  },

  swapPrevious: function(bLoop) {
    return this.swap(-1, bLoop);
  },

  setDirection : function(intDirection) {
    this.jsxdirection = (intDirection !== 1 && intDirection !== -1) ? 0 : intDirection;
    return this;
  },

  getDirection : function() {
    return this.jsxdirection || 0;
  },

  setOrientation : function(intOrientation) {
    this.jsxorientation = (intOrientation === 1) ? 1 : 0;
    return this;
  },

  getOrientation : function() {
    return this.jsxorientation || 0;
  },

  getActiveIndex: function() {
    var numChildren = this.getChildren().length;
    if (numChildren == 0)
      return -1;

    if (this.activeindex == null)
      this.activeindex = 0;

    return Math.max(0, Math.min(this.activeindex, numChildren - 1));
  },

  getActivePane: function() {
    return this.getChildren()[this.getActiveIndex()];
  },

  onAfterAttach: function() {
    this.jsxsuper();

    var activeIndex = this.getActiveIndex();

    var c = this.getChildren();
    for (var i = 0; i < c.length; i++) {
      c[i].setWidth("100%");
      c[i].setHeight("100%");
      c[i].setDisplay(i == activeIndex ? Block.DISPLAYBLOCK : Block.DISPLAYNONE);
    }

    this.setOverflow(Block.OVERFLOWHIDDEN);
  },

  /**
   * Set the active pane in the swap pane by swiping the active one out and
   * @param intIndex
   * @param intMillis
   */
  setActivePane: function(intIndex, intMillis) {
    if (intMillis == null)
      intMillis = SwapPane.DEFAULT_MILLIS;

    var activeIndex = this.getActiveIndex();
    if (activeIndex != intIndex) {
      var newChild = this.getChildren()[intIndex];

      if (newChild) {
        var oldChild = this.getChildren()[activeIndex];

        var retReturn = this.doEvent(tibco.uxcore.gui.ExpandablePanel.EVENT_BEFORE_SWAP, {intNewIndex: intIndex, intOldIndex: activeIndex});
        if(retReturn === false) return;
        if (oldChild) {
          var direction = activeIndex > intIndex ? 1 : -1;
          this._animate(newChild, oldChild, direction, intMillis);
        } else {
          newChild.setDisplay(Block.DISPLAYBLOCK, true);
          newChild.recalcBox();
          newChild.repaint();
          this.doEvent(tibco.uxcore.gui.ExpandablePanel.EVENT_AFTER_SWAP, {intNewIndex: intIndex, intOldIndex: activeIndex});
        }

        this.activeindex = intIndex;
      }
    }
  },

  _animate: function(newChild, oldChild, direction, intMillis) {
    newChild.setRelativePosition(Block.ABSOLUTE, true);
    
    direction = (this.getDirection() !== 0) ? this.getDirection() : direction;

    if(this.getOrientation() === SwapPane.VERTICAL) {
      newChild.getRendered().style.top = (direction * 100) + "%";
    } else {
      newChild.getRendered().style.left = (direction * 100) + "%";
    }
    
    newChild.setDisplay(Block.DISPLAYBLOCK, true);

    oldChild.setRelativePosition(Block.ABSOLUTE, true);

    var numSteps = Math.ceil(intMillis / SwapPane._MILLIS_PER_STEP);
    this._step(newChild, oldChild, direction, 1, numSteps, SwapPane._MILLIS_PER_STEP);
  },

  _step: jsx3.$F(function(newChild, oldChild, direction, intStep, intTotalSteps, intTimeout) {
    var ratio = this._getRatioDone(intStep, intTotalSteps);
    var pct = Math.round(100 * ratio);
    
    if(this.getOrientation() === SwapPane.VERTICAL) {
      if(oldChild.getRendered()) oldChild.getRendered().style.top = (direction * pct) + "%";
      if(newChild.getRendered()) newChild.getRendered().style.top = (-1 * direction * (100 - pct)) + "%";
    } else {
      if(oldChild.getRendered()) oldChild.getRendered().style.left = (direction * pct) + "%";
      if(newChild.getRendered()) newChild.getRendered().style.left = (-1 * direction * (100 - pct)) + "%";
    }

    if (intStep == intTotalSteps) {
      oldChild.setDisplay(Block.DISPLAYNONE, true);
      oldChild.setRelativePosition(Block.RELATIVE, true);
      if(this.getOrientation() === SwapPane.VERTICAL) {
        oldChild.setTop(0, true);
      } else {
        oldChild.setLeft(0, true);
      }

      newChild.setRelativePosition(Block.RELATIVE, true);
      var intNewIndex = newChild.getChildIndex();
      var intOldIndex = oldChild.getChildIndex();
      newChild.recalcBox();
      newChild.repaint();
      this.doEvent(tibco.uxcore.gui.ExpandablePanel.EVENT_AFTER_SWAP, {intNewIndex: intNewIndex, intOldIndex: intOldIndex});
    } else {
      var newParams = [newChild, oldChild, direction, intStep + 1, intTotalSteps, intTimeout];
      window.setTimeout(this._step.bind(this, newParams), intTimeout);
    }
  }),

  _getRatioDone: function(intDone, intTotal) {
    // Modify this method for easing...
    return intDone / intTotal;
  }

});

});

})(this);
