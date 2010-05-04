/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn) {

jsx3.lang.Class.defineClass("tibco.uxcore.gui.AdvancedSearch", tibco.uxcore.gui.AbstractBlock, 
      [tibco.uxcore.gui.IListSearch, tibco.uxcore.gui.IListAccessory],
    function(SEARCH, search) {              
        search.jsxattributes = null;
        search.jsxcontrolVeto = true;
        search._jsxisWorking = false;
    
        search.setControlVeto = function(value){
            this.jsxcontrolVeto = value;
        }

        search.getControlVeto = function() {
            return this.jsxcontrolVeto;
        }
        
        /**
         * instance initializer
         * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
         * @param strHTML {String} Text/HTML markup to place in the jsx3.gui.Block instance
         */
        search.init = function(strName, strHTML) {
            // note that top, left, width and height are removed.  These shall be controlled by the parent container.
            this.jsxsuper(strName,strHTML);
        };

        search.onSetParent = function(objParent){
            var ret=this.jsxsuper(objParent);
            if(!objParent.instanceOf("tibco.uxcore.gui.ListContainer")) {
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only ListContainer is valid parent of " + this.getClass().getName());
            }
            return ret;
            if(!this.getDescendantOfName("selSearch")) {
                var select = new tibco.uxcore.gui.Select("selSearch");
                select.setWidth(this.jsxselectwidth || this.getDynamicValue("@uxcore10@simpleSearch@selectWidth"));
                //select.jsxideinvisible = 1;
                this.setChild(select, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                this.select = select;
                this.select.subscribe(jsx3.gui.Interactive.SELECT, this, this.onClickSelect);
            }

            if(!this.getDescendantOfName("btnSearch")) {
                var searchButton = new jsx3.gui.ImageButton("btnSearch", 0, 0, 20, 18);
                this.setDefaultProperty(searchButton, {
                    "jsximage": "@uxcore10@listContainer@searchButton",
                    "jsxdownimage": "@uxcore10@listContainer@searchButtonDown",
                    "jsxmargin" : "@uxcore10@listContainer@filedMargin"
                }, false);
                //searchButton.jsxideinvisible = 1;
                this.setChild(searchButton, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                this.searchButton = searchButton;
                this.searchButton.subscribe(jsx3.gui.Interactive.EXECUTE,this,this.onClickSearch);
            }

            if(!this.getDescendantOfName("btnClear")) {
                var clearButton = new jsx3.gui.ImageButton("btnClear", 0, 0, 20, 18);
                this.setDefaultProperty(clearButton, {
                    "jsximage": "@uxcore10@listContainer@clearButton",
                    "jsxdownimage": "@uxcore10@listContainer@clearButtonDown",
                    "jsxmargin" : "@uxcore10@listContainer@filedMargin"
                }, false);
                //clearButton.jsxideinvisible = 1;
                this.setChild(clearButton, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                this.clearButton = clearButton;
                this.clearButton.subscribe(jsx3.gui.Interactive.EXECUTE,this,this.onClear);
            }

            if(!this.getDescendantOfName("btnSave")) {
                var saveButton = new jsx3.gui.ImageButton("btnSave", 0, 0, 20, 18);
                this.setDefaultProperty(saveButton, {
                    "jsximage": "@uxcore10@listContainer@saveButton",
                    "jsxdownimage": "@uxcore10@listContainer@saveButtonDown"
                }, false);
                //saveButton.jsxideinvisible = 1;
                this.setChild(saveButton, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                this.saveButton = saveButton;
                this.saveButton.subscribe(jsx3.gui.Interactive.EXECUTE,this,this.onSave);
            }

            if(!this.getDescendantOfName("btnSaveAs")) {
                var asButton = new jsx3.gui.ImageButton("btnAs", 0, 0, 10, 18);
                this.setDefaultProperty(asButton, {
                    "jsximage": "@uxcore10@listContainer@saveAsButton",
                    "jsxdownimage": "@uxcore10@listContainer@saveAsButtonDown",
                    "jsxmargin" : "@uxcore10@listContainer@lastFiledMargin"
                }, false);
                //saveButton.jsxideinvisible = 1;
                this.setChild(asButton, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                this.asButton = asButton;
                this.asButton.subscribe(jsx3.gui.Interactive.EXECUTE,this,this.onSaveAs);
            }

            return ret;
        }
        
        search.onClickSelect = function(){
          //this.repaint();
        }
        
        search.onClickSearch = function() {
        }
        
        search.onClear = function() {
        }
        
        search.onSearch = function() {
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }

        search.onSave = function(objMessage) {
            var objEvent = objMessage.context.objEVENT;
            var objRoot = ((jsx3.IDE ? jsx3.IDE : plugIn.getServer()).getRootBlock()).getRendered();
            var position = jsx3.html.getRelativePosition(objRoot, this.saveButton.getRendered());
            var offsetX = objEvent.getTrueX() - position.L;
        }

        search.onSaveAs = function() {
        }

        //----------------------------------------------------------------------
        // Class methods
        //----------------------------------------------------------------------

        search._getIterator = function(obj) {
            if(obj && obj instanceof Array) return new jsx3.util.List(obj).iterator();
            if(!obj) return new jsx3.util.List([]).iterator();
            return new jsx3.util.List([obj]).iterator();
        };  

        //----------------------------------------------------------------------
        // Interface methods
        //----------------------------------------------------------------------
        
        /*
         * Build the search definition XML document.
         *
         * @return {jsx3.xml.Document} - the search definition document.
         */
        search.buildQuery = function() {
            return result;
        }

        /*
         * Set the attribute(s) this search is intended to be used for.
         *
         * @param strAttributes {String | Array<String>} - The name or Array of names of the attribute(s) this search is intended to be used for.
         */
        search.setAttributes = function(strAttributes) {
            this.jsxattributes = strAttributes;
        }

        /*
         * Set the cdf document to be used to populate the Select list used in this GUI object (if used).
         *
         * @param cdf {jsx3.xml.CDF.Document} - the cdf document used to set the Select list.
         */
        search.setListCDF = function(cdf) {
        }


        /**
         * Used to notify this accessory that a search query was requested.
         *
         * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
         */
        search.searchRequested = function(searchXML) {
            // notifies this component that the search was requested...does NOT guarantee proper application of the search query
            // by the developer
            this._jsxisWorking = true;
        }

        search.viewChanged = function(strNewListViewId, strOldListViewId) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        search.actionRequested = function(actionId) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        search.visibilityChanged = function(bVisible) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        search.refreshRequested = function() {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        search.columnsChanged = function(arrNewAtts, arrOldAtts) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        /**
         * Used to notify this accessory that a data change was performed.
         *
         * @param dataCDF {jsx3.xml.CDF.Document} - the CDF document of new data, null indicates data was cleared,
         *        while empty document indicates query returned no results.
         * @param intCurrentPage {int} - the page number of the data, with respect to the whole data set
         * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
         * @param strId {String} - and auxilliary id for the target of the data
         */
        search.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, strId) {
            // can be used to know when a search has been applied.  The first time this is called after a notification on the searchRequested
            // function should (at least in theory) be the results after applying the search
            this._jsxisWorking = false;
        }

        search.pageChangeRequested = function(intNewPage, intOldPage, intTotalPages) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        /**
         * Used to notify this accessory that a reset is being requested.
         * Is called before the ListContainer performs the actual reset.
         *
         * @return {boolean} <code>true</code> to allow the reset, <code>false</code> to veto it.
         */
        search.onReset = function() {
            // return false if there is any reason this search component should not be reset at this time
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }

        /**
         * Used to tell the accessory to reset itself.  Should be implemented by each accessory to reset their own state.
         */
        search.reset = function() {
            this.onClear();
        }

        search.onViewChange = function(strNewListViewId, strOldListViewId){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }

        search.onAction = function(actionId){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }
            
        search.onVisibilityChange = function(bVisible){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }
            
        search.onRefresh = function(){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }
            
        search.onColumnsChange = function(arrNewAtts, arrOldAtts){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }
            
        search.onSelectRecordIds = function(arrRecordIds){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }
            
        search.onDeselectRecordIds = function(arrRecordIds){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }
            
        search.onClearSelectedRecordIds = function(){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }

        search.recordsSelected = function(arrRecordIds) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        search.recordsDeselected = function(arrRecordIds) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        search.selectionCleared = function() {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        //For debugger
        //jsx3.gui.Template.precompile("CONTAINER", "container", "tibco.uxcore.gui.ListContainer");
        search.loadTemplate("advancedsearch");
    }
);

jsx3.lang.Class.defineClass("tibco.uxcore.gui.AdvancedSearch.FormRow", tibco.uxcore.gui.FormRow, [], 
    function(FORMROW, formrow) {

        formrow.getDynamicValue = function(strPropName, strToken) {
            return plugIn.getServer().getDynamicProperty(strPropName, strToken);
        };

        formrow.clickRemove = function() {
            return;
        };

        FORMROW.templateXML = plugIn.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.listcontainer/classes/templates/extformrow.xml","formRowTemplate","xml").toString();
        jsx3.gui.Template.compile(FORMROW.templateXML,FORMROW.jsxclass);
    }
);

jsx3.lang.Class.defineClass("tibco.uxcore.gui.AdvancedSearch.Button", tibco.uxcore.gui.Button, [],
    function(BUTTON, button) {
        /*
        * instance initializer
        * @param strName {String} ?unique name distinguishing this object from all other JSX GUI objects in the JSX application
        * @param intWidth {int} ?width (in pixels) of the object; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
        * @param strText {String} ?text to display in the given button; if null JSXTABLEHEADERCELL.DEFAULTTEXT is used
        */
        button.init = function(strName, intWidth, strText) {
            this.jsxsuper(strName, intWidth, strText);
            this.setDefaultStyle();
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

        button.onAfterAssemble = function() {
            this.jsxsuper();
            this.setDefaultStyle();
        };

        button.onAfterPaint = function() {
            this.jsxsuper();
            this.applyDynamicProperties(true);
        };

        button.setDefaultStyle = function() {
            this.setDefaultProperty(this, {
                "jsxwidth"    : "@uxcore10@AdvSearchButton Width",
                "jsxheight"   : "@uxcore10@AdvSearchButton Height",
                "jsximage"    : "@uxcore10@AdvSearchButton Image",
                "jsxonimage"  : "@uxcore10@AdvSearchButton Image",
                "jsxdownimage": "@uxcore10@AdvSearchButton Image",
                "affordance"  : "@uxcore10@AdvSearchButton Affordance",
                "jsxmargin"   : "@uxcore10@AdvSearchButton Margin",
                "jsxpadding"  : "@uxcore10@AdvSearchButton Padding"
            }, true);
            this.focusstyle = 0;
            this.setType(tibco.uxcore.gui.Button.TYPE_NORMAL);
            this.subscribe(jsx3.gui.Interactive.EXECUTE, this, this.doClick);    
        };        

        button.doClick = function() {
        };
    }
);

})(this);