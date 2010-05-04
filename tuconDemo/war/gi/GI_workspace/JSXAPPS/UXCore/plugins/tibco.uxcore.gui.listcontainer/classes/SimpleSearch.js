/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn) {

jsx3.lang.Class.defineClass("tibco.uxcore.gui.SimpleSearch", jsx3.gui.Block, [tibco.uxcore.gui.IListSearch, tibco.uxcore.gui.IListAccessory],
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
        
        search.setSelectBoxWidth = function(width) {
            this.jsxselectwidth = width;
            if(this.getDescendantOfName("selSearch")) {
                this.getDescendantOfName("selSearch").setWidth(width, true);
            }
            return this;
        };

        search.getSelectBoxWidth = function() {
            return this.jsxselectwidth;
        };
        
        search.setTextBoxWidth = function(width) {
            this.jsxtextboxwidth = width;
            if(this.getDescendantOfName("txtKeyword")) {
                this.getDescendantOfName("txtKeyword").setWidth(width, true);
            }
            return this;
        };

        search.getTextBoxWidth = function() {
            return this.jsxtextboxwidth;
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

        search.onSetParent = function(objParent){
            var ret=this.jsxsuper(objParent);     
            var ideinvisible = 1;
            if(objParent.instanceOf("tibco.uxcore.gui.ListContainer")) {
                if(!this.getDescendantOfName("lblTitle")) {
                    var title = new jsx3.gui.Block("lblTitle");
                    title.setRelativePosition(jsx3.gui.Block.RELATIVE);
                    title.setOverflow(2);
                    title.jsxideinvisible = ideinvisible;
                    this.setDefaultProperty(title, {
                        "jsxstyleoverride" : "@uxcore10@listContainer@labelStyle",
                        "jsxtext"          : "@uxcore10@simpleSearch@title"
                    }, false);
                    this.setChild(title, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                }
                
                if(!this.getDescendantOfName("selSearch")) {
                    var select = new tibco.uxcore.gui.Select("selSearch");
                    select.setWidth(this.jsxselectwidth || this.getDynamicValue("@uxcore10@simpleSearch@selectWidth"));
                    select.setDisplay(jsx3.gui.Block.DISPLAYNONE);                           
                    select.jsxideinvisible = ideinvisible;
                    this.setChild(select, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                    this.select = select;
                    this.select.subscribe(jsx3.gui.Interactive.SELECT, this, this.onClickSelect);
                }
                if(!this.getDescendantOfName("txtKeyword")) {            
                    var textBox = new tibco.uxcore.gui.TextBox("txtKeyword");
                    textBox.setWidth(this.jsxtextboxwidth || this.getDynamicValue("@uxcore10@simpleSearch@textboxWidth"));
                    textBox.setHeight(this.getDynamicValue("@uxcore10@simpleSearch@selectHeight"));
                    textBox.jsxideinvisible = ideinvisible;
                    this.setChild(textBox, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                    this.textBox = textBox;
                }
                if(!this.getDescendantOfName("btnSearch")) {
                    var searchButton = new jsx3.gui.ImageButton("btnSearch", 0, 0, 20, 18);
                    this.setDefaultProperty(searchButton, {
                        "jsximage": "@uxcore10@listContainer@searchButton",
                        "jsxdownimage": "@uxcore10@listContainer@searchButtonDown",
                        "jsxmargin" : "@uxcore10@listContainer@ssfiledMargin"
                    }, false);
                    searchButton.jsxideinvisible = ideinvisible;
                    this.setChild(searchButton, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                    this.searchButton = searchButton;
                    this.searchButton.subscribe(jsx3.gui.Interactive.EXECUTE,this,this.onClickSearch);
                }
                if(!this.getDescendantOfName("btnClear")) {
                    var clearButton = new jsx3.gui.ImageButton("btnClear", 0, 0, 20, 18);
                    this.setDefaultProperty(clearButton, {
                        "jsximage": "@uxcore10@listContainer@clearButton",
                        "jsxdownimage": "@uxcore10@listContainer@clearButtonDown",
                        "jsxmargin" : "@uxcore10@listContainer@sslastFiledMargin"
                    }, false);
                    clearButton.jsxideinvisible = ideinvisible;
                    this.setChild(clearButton, jsx3.app.Model.PERSISTNONE, null, jsx3.app.Model.FRAGMENTNS);
                    this.clearButton = clearButton;
                    this.clearButton.subscribe(jsx3.gui.Interactive.EXECUTE,this,this.onClear);
                }
            }else{
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only ListContainer is valid parent of SimpleSearch")
            }                   
            return ret;
        }
        
        search.onClickSelect = function(){
          //this.repaint();
        }
        
        search.onClickSearch = function() {
            var currentValue = this.textBox.getValue();
            if(currentValue!=null && currentValue.trim().length>0){
                this.executeSearch();
            }            
        }
        
        search.onClear = function() {
            if(this.firstRecordId){
                this.select.setValue(this.firstRecordId);
            }
            this.textBox.setValue(null);
            this.executeSearch();
        }
        
        search.onSearch = function() {
            return (!this.jsxcontrolVeto || !this._jsxisWorking);
        }
        
        /*
         * Build the search definition XML document.
         *
         * @return {jsx3.xml.Document} - the search definition document.
         */
        search.buildQuery = function() {
            var result = null;
            var keyWord = this.textBox.getValue();
            if(keyWord==null || keyWord.trim().length==0){
                return null;
            } 
            var arrayattribute = null;
            if(this.select.getDisplay() == jsx3.gui.Block.DISPLAYNONE){
                arrayattribute = this.jsxattributes.split(",");
            }else{
                var recordid = this.select.getValue();
                var oRecord = this.select.getRecord(recordid);
                var sAttribute = oRecord.attributes;
                if(sAttribute){
                    jsx3.log(sAttribute);
                    arrayattribute = sAttribute.split(",");                     
                }else{
                    jsx3.log("error in select CDF: the attributes property is mandatory");
                    return;
                }
            }
            if(arrayattribute && arrayattribute.length>0){
                result = new jsx3.xml.Document();
                var root = result.createDocumentElement("search");
                root.setAttribute("type","simpleSearch");
                /*var id = this.getId();
                if(id){
                    root.setAttribute("id",id);
                }*/
                var secondNode = root.createNode(jsx3.xml.Entity.TYPEELEMENT,"or");
                root.appendChild(secondNode);
                
                var matchNode = secondNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"match");
                secondNode.appendChild(matchNode);
                matchNode.setAttribute("value",keyWord);
                                
                var attributesNode =  matchNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"attributes");
                matchNode.appendChild(attributesNode);
                                
                var orAndNode =  attributesNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"or");
                attributesNode.appendChild(orAndNode);
                                
                for(var j=0;j<arrayattribute.length;j++){
                    var attributeNode = orAndNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"attribute");
                    orAndNode.appendChild(attributeNode);
                    attributeNode.setValue(arrayattribute[j]);
                }
            }else{
                jsx3.log("no arrayattributes");
                return;
            }
                        
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
            /*var xslURI=jsx3.resolveURI("jsxaddin://user!UXCore/xml/defaultSelectRecords.xml");
              var doc = jsx3.xml.CDF.Document.newDocument().load(xslURI);
              jsx3.log(doc.toString());*/
            if(cdf){                
                var firstRecord = cdf.getFirstChild();
                var recordId = firstRecord.getAttribute("jsxid");
                this.firstRecordId = recordId;
                this.select.setXMLString(cdf);
                this.select.resetCacheData();
                this.select.setValue(recordId);
                this.select.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);
                this.select.repaint();
            }else{
                return;
            }   
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