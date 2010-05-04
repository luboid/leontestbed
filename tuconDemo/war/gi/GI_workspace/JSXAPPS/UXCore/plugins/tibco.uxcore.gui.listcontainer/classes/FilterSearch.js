/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn) {


//jsx3.require("jsx3.gui.Select", "tibco.uxcore.gui.IListSearch", "tibco.uxcore.gui.IListAccessory");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.FilterSearch", jsx3.gui.Block, [tibco.uxcore.gui.IListSearch, tibco.uxcore.gui.IListAccessory],
    function(SEARCH, search) {

        search.jsxcontrolVeto = true;
        search._jsxisWorking = false;

        search.setControlVeto = function(value){
            this.jsxcontrolVeto = value;
            return this;
        };

        search.getControlVeto = function() {
            return this.jsxcontrolVeto;
        };

        search.setFilterBoxWidth = function(width) {
            this.jsxfilterboxwidth = width;
            if(this.getDescendantOfName("selFilter")) {
                this.getDescendantOfName("selFilter").setWidth(width, true);
            }
            return this;
        };

        search.getFilterBoxWidth = function() {
            return this.jsxfilterboxwidth;
        };

        search.getLogger = function() {
            return jsx3.util.Logger.getLogger(this.getClass().getName());
        };

       /**
        * Returns the value of the dynamic property @strPropName
        * @param strPropName {String} id for this dynamic property among all properties
        * @param strToken {String...} if present tokens such as {0}, {1}, {n} will be replaced with the nth element of this vararg array
        * @return {String} value of the property
        */
        search.getDynamicValue = function(strPropName, strToken) {
            return plugIn.getServer().getDynamicProperty(strPropName, strToken);
        };

        /**
         * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
         * @param objJSX {Object}
         * @param objSetting {Array} properties list
         * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
         */
        search.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
            };
            return objJSX;
        };

        /**
         * instance initializer
         * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
         * @param strHTML {String} Text/HTML markup to place in the jsx3.gui.Block instance
         */
        search.init = function(strName, strHTML) {
            // note that top, left, width and height are removed.  These shall be controlled by the parent container.
            this.jsxsuper(strName,strHTML);
        };

        //functions of Filter self
        search.onSetParent = function(objParent){
            var ret=this.jsxsuper(objParent);
            if(objParent.instanceOf("tibco.uxcore.gui.ListContainer")) {
                if(!this.getDescendantOfName("lblTitle")) {
                    var label = new jsx3.gui.Block("lblTitle");
                    label.setRelativePosition(jsx3.gui.Block.RELATIVE);
                    label.setOverflow(2);
                    label.jsxideinvisible = 1;
                    this.setDefaultProperty(label, {
                        "jsxstyleoverride" : "@uxcore10@listContainer@labelStyle",
                        "jsxtext"          : "@uxcore10@filterSearch@labelText"
                    }, false);
                    this.setChild(label, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                }

                if(!this.getDescendantOfName("selFilter")) {
                    var select = new tibco.uxcore.gui.Select("selFilter");
                    select.setWidth(this.jsxfilterboxwidth || this.getDynamicValue("@uxcore10@filterSearch@selectWidth"));
                    select.jsxideinvisible = 1;
                    this.setChild(select, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                    this.select = select;
                    this.select.subscribe(jsx3.gui.Interactive.SELECT, this, this.onFilter);
                }
            }else{
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only ListContainer is valid parent of FilterSearch")
            }
            return ret;
        };

        search.onFilter = function(){
            this.executeSearch();
        };

        /*
         * Build the search definition XML document.
         *
         * @return {jsx3.xml.Document} - the search definition document.
         */
        search.buildQuery = function() {
            var result = null;
            var currentValue = this.select.getText();
            if(currentValue.toUpperCase()=="ALL"){
                return null;
            }else{
                var recordid = this.select.getValue();
                var oRecord = this.select.getRecord(recordid);
                if(oRecord){
                    var arrayattribute = null;
                    var arrayValues = null
                    var sAttribute = oRecord.attributes;
                    var sValues = oRecord.values;
                    if(sAttribute){
                        this.getLogger().info(sAttribute);
                        arrayattribute = sAttribute.split(",");
                    }
                    if(arrayattribute == null || arrayattribute.length==0){
                        if(this.jsxattributes){
                            var jsxattriArray = this.jsxattributes.split(",");
                            if(jsxattriArray.length>0 && jsxattriArray[0].length>0){
                                arrayattribute = jsxattriArray;
                            }else{
                                this.getLogger().warn("no jsxattributes is found");
                                return null;
                            }
                        }else{
                            this.getLogger().warn("jsxattributes is null");
                            return null;
                        }
                    }
                    if(sValues){
                        this.getLogger().info(sValues);
                        try{
                            arrayValues = JSON.parse(sValues);
                        }catch(e){
                            arrayValues = [sValues];
                        }
                    }else{
                        arrayValues = [currentValue];
                    }

                    result = new jsx3.xml.Document();
                    var root = result.createDocumentElement("search");
                    root.setAttribute("type","filter");
                    /*var id = this.getId();
                    if(id){
                        root.setAttribute("id",id);
                    }*/
                    var secondNode = root.createNode(jsx3.xml.Entity.TYPEELEMENT,"or");
                    root.appendChild(secondNode);
                    for(var i=0;i<arrayValues.length;i++){
                        var matchNode = secondNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"match");
                        secondNode.appendChild(matchNode);
                        matchNode.setAttribute("value",arrayValues[i]);

                        var attributesNode =  matchNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"attributes");
                        matchNode.appendChild(attributesNode);

                        var orAndNode =  attributesNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"or");
                        attributesNode.appendChild(orAndNode);

                        for(var j=0;j<arrayattribute.length;j++){
                            var attributeNode = orAndNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"attribute");
                            orAndNode.appendChild(attributeNode);
                            attributeNode.setValue(arrayattribute[j]);
                        }
                    }//end of the first for
                }//end of if(oRecord)
            }

            return result;
        }

        /*
         * Set the attribute(s) this search is intended to be used for.
         *
         * @param strAttributes {String | Array<String>} - The name or Array of names of the attribute(s) this search is intended to be used for.
         */
        search.setSearchAttributes = function(strAttributes) {
            this.getLogger().info("setSearchAttributes :"+ strAttributes);
            this.jsxattributes = strAttributes;
        }

        search.getSearchAttributes = function() {
            this.getLogger().info("getSearchAttributes");
            return this.jsxattributes;
        }

        /*
         * Set the cdf document to be used to populate the Select list used in this GUI object.
         *
         * @param cdf {jsx3.xml.CDF.Document} - the cdf document used to set the Select list.
         */
        search.setListCDF = function(cdf) {
              /*var xslURI=jsx3.resolveURI("jsxaddin://user!UXCore/xml/defaultSelectRecords.xml");
              var doc = jsx3.xml.CDF.Document.newDocument().load(xslURI);
              jsx3.log(doc.toString());*/
              if(cdf){
                var firstRecord = cdf.getFirstChild();
                var recordId = firstRecord.getAttribute("jsxid");
                this.select.setXMLString(cdf);
                this.select.resetCacheData();
                this.select.repaint();
                this.select.setValue(recordId);
              }else{
                return;
              }
        }

        search.onSearch = function(searchXML){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
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

        search.recordEdited = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
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
         * Used to tell the accessory to reset itself.  Should be implemented by each accessory to reset their own state.
         */
        search.reset = function() {
            this.select.setValue(null);
            this.executeSearch();
        }

        /**
         * Used to notify this accessory that a reset is being requested.
         * Is called before the ListContainer performs the actual reset.
         *
         * @return {boolean} <code>true</code> to allow the reset, <code>false</code> to veto it.
         */
        search.onReset = function() {
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
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

        search.onClearSelectedRecordIds = function(){
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }

        search.recordsSelected = function(arrRecordIds) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        search.selectionCleared = function() {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }
    }
);

})(this);