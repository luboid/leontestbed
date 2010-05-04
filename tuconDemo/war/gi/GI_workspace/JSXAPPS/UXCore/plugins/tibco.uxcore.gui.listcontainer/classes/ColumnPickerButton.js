(function(plugIn) {

jsx3.lang.Class.defineClass("tibco.uxcore.gui.ColumnPickerButton",
        tibco.uxcore.gui.LCToggleIconButton, null, function(BUTTON, button) {

    /**
     * Set default style (font, color and background images) for this button,
     * this function will be called at init or onAfterAssemble function.
     */
    button.setDefaultStyle = function() {
        this.jsxsuper();
        this.setType(tibco.uxcore.gui.Button.TYPE_TOGGLE);
        this.jsxstate = tibco.uxcore.gui.Button.STATE_OFF;
        this.setDefaultProperty(this, {
            "jsxwidth"    : "@uxcore10@ColumnPickerButton Width",
            "jsxheight"   : "@uxcore10@ColumnPickerButton Height",
            "jsximage"    : "@uxcore10@ColumnPickerButton Image OFF",
            "jsxonimage"  : "@uxcore10@ColumnPickerButton Image ON",
            "jsxdownimage": "@uxcore10@ColumnPickerButton Image ON"
        }, true, true);
    };

    button.onSetParent = function(objParent) {
        var ret = this.jsxsuper(objParent);
        this.subscribe(jsx3.gui.Interactive.EXECUTE, this, this.doExecute);
        return ret;
    };

    button.checkUnique = function() {
        var columnPickerType = this.getListContainer().getColumnPickerType();
        var allColumns = this.getListContainer().getAllColumns();
        if(columnPickerType == "jsxpath") {
            for(var i=0; i< allColumns.length-1; i++) {
              if(allColumns[i].getPath() == "") return false;
              for(var j=i+1; j< allColumns.length; j++) {
                if(allColumns[i].getPath()==allColumns[j].getPath()) return false;
              }
            }
        } else {
            for(var i=0; i< allColumns.length-1; i++) {
              if(allColumns[i].getName() == "") return false;
              for(var j=i+1; j< allColumns.length; j++) {
                if(allColumns[i].getName()==allColumns[j].getName()) return false;
              }
            }          
        }
        return true;
    };

    button.doExecute = function() {
        if(jsx3.IDE && this.checkUnique() === false) {
          var columnPickerType = this.getListContainer().getColumnPickerType();
          this.getLogger().error("Please make " + columnPickerType +" of all columns different.");
        }
        var newState = this.getState() == tibco.uxcore.gui.Button.STATE_ON ? true : false;
        
        if(newState) {
            if (this._jsxclosing) {
                this.setState(tibco.uxcore.gui.Button.STATE_OFF);
                return;
            }
            plugIn.getResource("columnPicker_xml").load().when(jsx3.$F(function() {
                try{
                    var root = (jsx3.IDE ? jsx3.IDE : plugIn.getServer()).getRootBlock();
                    this.cpBlock = root.loadXML(plugIn.getResource("columnPicker_xml").getData());
                    this.cpBlock.setButton(this);
                    this.cpBlock.initialize(this.jsxexcluded, this.jsxuneditable);
                }catch(e) {
                    this.getLogger().error("load columnPicker prototype error: " + e);
                }
            }).bind(this));
        } else {
            if(this.cpBlock) {
                this.cpBlock.close();
            }
        }

    };
    
    button.columnPickerClosed = function(arrNewAtts) {
        setTimeout(jsx3.$F(function() {
            this.setState(tibco.uxcore.gui.Button.STATE_OFF);
            //Publish change message ...
            if(arrNewAtts) this.getListContainer().changeColumns(arrNewAtts, this);
        }).bind(this),0);
        this._jsxclosing = true;
        setTimeout(jsx3.$F(function() {
            this._jsxclosing = false;
        }).bind(this), 100);
        delete this.cpBlock;
    };

    button.setExclusionColumns = function(cols) {
        this.jsxexcluded = cols;
    };

    button.setUneditableColumns = function(cols) {
        this.jsxuneditable = cols;
    };
});

})(this);