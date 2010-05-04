(function(plugIn) {

  jsx3.$O(plugIn).extend({

    paint: function(objContainer) {
      var layout = this.loadRsrcComponent("layout", objContainer);
      this._layout = layout;
    }
    
  });

})(this);
