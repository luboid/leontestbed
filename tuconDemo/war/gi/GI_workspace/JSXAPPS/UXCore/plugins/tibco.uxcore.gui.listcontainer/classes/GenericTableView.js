jsx3.lang.Class.defineClass("tibco.uxcore.gui.GenericTableView", tibco.uxcore.gui.Matrix, [tibco.uxcore.gui.IListView, tibco.uxcore.gui.IListAccessory],
    function(TABLEVIEW, tableview) {

        //All TableView support EditMode
        TABLEVIEW.EDIT_MODE = 1;
        TABLEVIEW.NORMAL_MODE = 0;

        tableview._cacheData = null; // cached data for table list view,for revert
        tableview._editMode = TABLEVIEW.NORMAL_MODE; // mode for table list view, edit mode or normal


        var Interactive = jsx3.gui.Interactive;

        tableview.onEditRecord = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
//            jsx3.log("onEdit");
            return this._allowUpdateData();
        }

        tableview._getCacheData = function(auxId) {
            return this._cacheData;
        }

        tableview.recordEdited = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
//            jsx3.log("record edited");
            if(objCaller != this) {
                var cdf = this.getXML();
                if(entityRecord) {
                    if(strAction == "added") {
                        var newNode = entityRecord.cloneNode(true);
                        var nextRecord = cdf.selectSingleNode("//record[@jsxid='" + strInsertBefore, "']");
                        if(nextRecord) {
                            cdf.insertBefore(newNode,nextRecord);
                        }
                        else {
                            cdf.appendChild(newNode);
                        }
                    }
                    else if(strAction == "edited") {
                        var oldRecord = cdf.selectSingleNode("//record[@jsxid='" + strRecordId + "']");
                        if(oldRecord) {
                            cdf.replaceNode(entityRecord.cloneNode(true),oldRecord);
                        }
                        else {
                            cdf.appendChild(entityRecord.cloneNode(true));
                        }
                    }
                }
                else if(strAction == "deleted") {
                    var deleteRecord = cdf.selectSingleNode("//record[@jsxid='" + strRecordId + "']");
                    if(deleteRecord) {
                        if(this._cacheData.getRecordNode(strRecordId)) {
                            deleteRecord.setAttribute("uxcore_deleted","1");
                        }
                        cdf.removeChild(deleteRecord);
                    }
                }
                else if(strAction == "moved") {
                    var movedRecord = cdf.selectSingleNode("//record[@jsxid='" + strRecordId + "']");
                    var recordAfter = cdf.selectSingleNode("//record[@jsxid='" + strInsertBefore + "']");
                    if(movedRecord && recordAfter) {
                        cdf.insertBefore(movedRecord, recordAfter);
                    }
                }
                this.repaintData();
            }
        }

        /**
         * Used to notify this accessory that a record selection change is being requested.
         * Is called before the ListContainer performs the actual record selection change.
         *
         * @param arrRecordIds {Array} - array of the jsxids of the records to be selected
         *
         * @return {boolean} <code>true</code> to allow the record selection change, <code>false</code> to veto it.
         */
        tableview.onSelectRecordIds = function(arrRecordIds, auxId, objCaller) {
            //return false if there is any reason this table list view should not have its selection changed at this time
            return this._allowUpdateData();
        }

        /**
         * Used to notify this accessory that a record selection change was performed.
         *
         * @param arrRecordIds {Array} - array of the jsxids of the records that are currently selected in the list.
         * This could be the same as the record ids in the <code>onSelectRecordIds</code> function, or it could be different,
         * depending on whether the selection event added to the existing selection, or replaced it.
         */
        tableview.recordsSelected = function(arrRecordIds, auxId, objCaller) {
            // synchronize the selection in the table list with that in arrRecordIds if they do not already match.  Do not send notification of the change
            if((objCaller != this) && (this.getSelectedRecordIds().sort().join("*") != arrRecordIds.sort().join("*"))){
                this.setSelectedRecordIds(arrRecordIds, auxId);
            }
        }

        /**
         * Sets the value of this list. Deselects all existing selections. Scrolls the first record into view.
         * @param strId {String | Array<String>} jsxid attribute for the CDF record(s) to select
         * @param auxId {String} not used
         * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
         *                 initial data state of the list view (what will be reverted back to on a revert action)
         */
        tableview.setSelectedRecordIds = function(strIds, auxId, bMergeToInitialData) {
            // select these records (and ONLY these records) in the Matrix and report that the selection has changed
            this.deselectAllRecords();
            for(var i=0;i<strIds.length;i++){
                this.selectRecord(strIds[i]);
            }
            this._handleMerge(bMergeToInitialData, "select");
        }

        /**
         * Returns selected record ids of this list
         * @param auxId {String} not used
         *
         * @return {Array<String>}  jsxid attribute of selected record(s), or null if none are selected
         */
        tableview.getSelectedRecordIds = function(auxId) {
            // return an array of the ids of the selected objects, or null if none are selected
            return this.getSelectedIds();
        }

        /**
         * Returns the collection of selected records.  These are actual references to the records, not clones.
         *
         * @param auxId {String} not used
         *
         * @return {jsx3.util.List<jsx3.xml.Entity>}  list of selected Entity objects (records), or null if none are selected
         */
        tableview.getSelectedRecords = function(auxId) {
            // return a jsx3.util.List of the records that are selected (not clones)
            return this.getSelectedNodes();
        }

        /**
         * selects CDF records within the List. Both the view and the data model (CDF) will be updated.  This does not replace the previous selections,
         * but rather adds these to the current selection.
         * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
         * @param auxId {String} not used
         * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
         *                 initial data state of the list view (what will be reverted back to on a revert action)
         */
        tableview.selectRecords = function(strIds, auxId, bMergeToInitialData) {
            // add the provided id(s) to the current selection.  DO NOT clear the previous selection first.  Notify that selection has changed.
            for(var i=0;i<strIds.length;i++){
                this.selectRecord(strIds[i]);
            }
            this._handleMerge(bMergeToInitialData,"select");
        }

        /**
         * deselects CDF records within the List. Both the view and the data model (CDF) will be updated
         * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
         * @param auxId {String} not used
         * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
         *                 initial data state of the list view (what will be reverted back to on a revert action)
         */
        tableview.deselectRecords = function(strIds, auxId, bMergeToInitialData) {
            // remove the indicated ids from the current selection.  Notify that selection has changed
            for(var i=0;i<strIds.length;i++){
                this.deselectRecord(strIds[i]);
            }
            this._handleMerge(bMergeToInitialData,"select");
        }

        tableview._mergeData = function() {
            this._cacheData = this.getData().cloneDocument();
            this.updateLastDoc();
//            this._isDirty = false;
            this.doChange("datachange");
        }

        tableview._handleMerge = function(bMergeToInitialData,type) {
            if(bMergeToInitialData) {
                this._mergeData();
            }
            else {
//                this._isDirty = true;
                this.doChange(type ? type : "select");
            }
        }

        /**
         * Clears the list selections
         * @param auxId {String} not used
         * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
         *                 initial data state of the list view (what will be reverted back to on a revert action)
         */
        tableview.clearSelectedRecords = function(auxId, bMergeToInitialData) {
            // clear all record selections in the Matrix, and report that the selection has changed
            this.deselectAllRecords();
            this._handleMerge(bMergeToInitialData,"select");
        }

        /**
         * Clears CDF document from this object
         * @param strId {String} not used
         * @param bMergeToInitialData {boolean} when not set to 'false' (default is 'true'), a snapshot of the data will be taken after this operation to be used as the
         *                 initial data state of the list view (what will be reverted back to on a revert action)
         */
        tableview.clearData = function(strId, bMergeToInitialData) {
            // clear the data in the matrix and display the default text for null data
            this.setXMLString(null);
            this.resetXmlCacheData();
            this.repaintData();
            this._handleMerge(bMergeToInitialData,"datachange");
        }

        /**
         * veto function for parent vote process
         * @private
         */
        tableview._allowUpdateData = function(){
            return this.isEditMode();
        }

        /**
         * instance initializer
         * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
         */
        tableview.init = function(strName) {
            this.jsxsuper(strName);
//            this._isDirty = false;
            this.subscribe("jsxbeforeselect", this, this.onBeforeSelect);
            this.subscribe(Interactive.SELECT, this, this.onSelectionChange);
        }

        tableview.onAfterAssemble = function(objParent) {
            this.jsxsuper();
//            this._isDirty = false;
            this.subscribe("jsxbeforeselect", this, this.onBeforeSelect);
            this.subscribe(Interactive.SELECT, this, this.onSelectionChange);
        }

        tableview.onBeforeSelect = function(obj) {
//            jsx3.log("before select");
            return this._allowUpdateData();
        }

        tableview.onSelectionChange = function(objContent) {
            var me = this;
            setTimeout(function() {
                if(me.doSelectRecordIds(me.getSelectedIds(),null)) {
                    me.updateLastDoc();
                    me._handleMerge(false,"select");
                }
                else {
                    me.reapplyLastDoc();
                }
            },0);
        }

        tableview.updateLastDoc = function() {
            var xml = this.getXML();
            this._lastDoc = xml ? xml.cloneDocument() : null;
            this.setXMLString(this._lastDoc ? this._lastDoc.getXML() : null)
        }

        tableview.reapplyLastDoc = function() {
            this.setXMLString(this._lastDoc ? this._lastDoc.getXML() : null);
            this.resetXmlCacheData();
            this.repaintData();
        }

        /**
         * hook the doEvent to process the event for Matrix
         */
        tableview.doEvent = function(strType,objContext){
            if(strType == Interactive.BEFORE_EDIT){
                if(!this.isEditMode())
                    return false;
            }
            return Interactive.prototype.doEvent.apply(this, arguments);
        }

        tableview.prepareSelectionModel = function(mode) {
            if(mode) {
                this.setSelectionModel(jsx3.gui.Matrix.SELECTION_MULTI_ROW);
            }
            else {
                this.setSelectionModel(jsx3.gui.Matrix.SELECTION_UNSELECTABLE);
                this.repaint();
            }
        }

        /**
         * set the edit mode for table list
         */
        tableview.setEditMode = function(mode, bRepaint){
            if(mode === true) {
                mode = TABLEVIEW.EDIT_MODE;
            }
            if(mode === false) {
                mode = TABLEVIEW.NORMAL_MODE;
            }
            this.prepareSelectionModel(mode);
            this._editMode = mode;
            this.preProcessData();
            this.updateLastDoc();
            if(bRepaint) {
                this.repaint();
                this.repaintData();
            }
            return this;
        }

        tableview.isEditMode = function() {
            return this._editMode == TABLEVIEW.EDIT_MODE;
        }

        /**
         * get the edit mode for table list
         */
        tableview.getEditMode = function(){
            return this._editMode;
        }

        tableview.enableRecords = function(bRepaintData) {
            var records = this.getXML().selectNodes("//record");
            jsx3.$A(records.toArray()).each(function(record){
                record.setAttribute("jsxdisabled", "0");
            });
            if(bRepaintData) this.repaintData();
        };

        tableview.disableRecords = function(bRepaintData) {
            var records = this.getXML().selectNodes("//record");
            jsx3.$A(records.toArray()).each(function(record){
                record.setAttribute("jsxdisabled", "1");
            });
            if(bRepaintData) this.repaintData();
        };

        tableview.preProcessData = function(bRepaintData) {
            if(this.isEditMode()) {
                this.enableRecords(bRepaintData);
            } else {
                this.disableRecords(bRepaintData);
            }
        };

        /**
         * reverts changes
         */
        tableview.revert = function() {
            // revert any edits made (but remain in the edit mode)
            if(this.isEditMode()){
                this.setXMLString(this._cacheData ? this._cacheData.getXML() : null);
                this.resetXmlCacheData();
                this.preProcessData();
                this.repaintData();
//                this._isDirty = false;
                this.doChange("revert");
            }
        }

        /**
         * Sets CDF document of this object.
         * @param cdf {jsx3.xml.CDF.Document} - the cdf data.
         * @param intCurrentPage {int} - the page number of the data, with respect to the whole data set
         * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
         * @param strId {String} not used
         * @param bMergeToInitialData {boolean} when not set to 'false' (default is 'true'), a snapshot of the data will be taken after this operation to be used as the
         *                 initial data state of the list view (what will be reverted back to on a revert action)
         */
        tableview.setData = function(cdf, intCurrentPage, intTotalPages, strId, bMergeToInitialData) {
            // set the data on the matrix
            if(!this._cacheData) {
                bMergeToInitialData = true;
            }
            this.setXMLString(cdf ? cdf.getXML() : null);
            this.resetXmlCacheData();
            this.preProcessData();
            this.repaintData();
            this._handleMerge(bMergeToInitialData !== false,"datachange");
        }

        /**
         * Gets CDF document of this object.
         * @param auxId {String} Not used. This parameter is used for browse type.
         *                 Specifies the browse component id that this cdf blongs to
         */
        tableview.getData = function(auxId) {
            var xml = this.getXML();
            var ret = null;
            if(xml) {
                ret = xml.cloneDocument();
                var iter = ret.selectNodeIterator("//record[@uxcore_deleted='1']");
                while(iter.hasNext()) {
                    var node = iter.next();
                    var parent = node.getParent();
                    if(parent) {
                        parent.removeChild(node);
                    }
                }
            }
            return ret;
        };

        /**
         * Returns resolved url to list view icon (used in the ViewButton for this ListView)
         * @return {String}
         */
        tableview.getIcon = function() {
            // return the resolved url to the icon image
        }


        /**
         * Used to notify this accessory that a search query was requested.
         *
         * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
         */
        tableview.searchRequested = function(searchXML) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        /**
         * Used to notify this accessory that a view change was performed.
         *
         * @param strNewListViewId {String} - the id of the view that was switched to
         * @param strOldListViewId {String} - the id of the view that was switched away from
         */
        tableview.viewChanged = function(strNewListViewId, strOldListViewId) {
            // can be used to determine when this table list view has come into view, or gone out of view
        }

        /**
         * Used to notify this accessory that an ActionButton action was requested.
         *
         * @param actionId {String} - the id of the action that was requested
         */
        tableview.actionRequested = function(actionId) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        /**
         * Used to notify this accessory that a visibility (Hide/Show) change was performed.
         *
         * @param bVisible {boolean} - the current visibility state (<code>true</code> for visible, <code>false</code> for hidden
         */
        tableview.visibilityChanged = function(bVisible) {
            // can be used to determine when this (and all other list views) have been hidden (collpased)
        }

        /**
         * Used to notify this accessory that a data refresh is being requested.
         * Is called before the ListContainer publishes the actual data refresh request.
         *
         * @return {boolean} <code>true</code> to allow the data refresh request, <code>false</code> to veto it.
         */
        tableview.onRefresh = function() {
            //return false if there is any reason this table list view should not be refreshed at this time
            return !this._allowUpdateData();
        }

        /**
         * Used to notify this accessory that a data refresh was requested.
         */
        tableview.refreshRequested = function() {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        /**
         * Used to notify this accessory that a columns change is being requested.
         * Is called before the ListContainer performs the actual columns change.
         *
         * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns to be shown in the list
         *
         * @return {boolean} <code>true</code> to allow the columns change, <code>false</code> to veto it.
         */
        tableview.columnsChanged = function(arrNewAtts, arrOldAtts) {
            //return false if there is any reason this table list view should not have its columns changed at this time
        }

        /**
         * Used to notify this accessory that a columns change was performed.
         *
         * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns now shown in the list
         */
        tableview.columnsChanged = function(arrNewAtts, arrOldAtts) {

            var columnPickerType = this.getListContainer().getColumnPickerType();
            // hide and show columns as needed to make the visible columns match those in arrNewAtts
            var cols = this.getDescendantsOfType(jsx3.gui.Matrix.Column), index, sorted;
            for(var i=0;i<cols.length;i++){
                index = jsx3.$A(arrNewAtts).indexOf(columnPickerType == "jsxpath" ? cols[i].getPath() : cols[i].getName());
                cols[i]._jsxsortindex = index;
                if(index > -1){
                    cols[i].setDisplay(jsx3.gui.Block.DISPLAYBLOCK);
                }else{
                    cols[i].setDisplay(jsx3.gui.Block.DISPLAYNONE);
                }
            }
            for(var i=0;i<cols.length;i++){
                if(cols[i]._jsxsortindex == -1) continue;
                for(var j=i+1;j<cols.length;j++){
                    if(cols[j]._jsxsortindex == -1) continue;
                    if(cols[j]._jsxsortindex < cols[i]._jsxsortindex) {
                        this.insertBefore(cols[j], cols[i], false);
                        cols = this.getDescendantsOfType(jsx3.gui.Matrix.Column)
                        sorted = true;
                    }
                }
            }
            if(sorted) this.setDynamicProperties(false);
            this.repaint();
        }

        /**
         * Used to notify this accessory that a data change is being requested.
         * Is called before the ListContainer publishes the actual search request.
         *
         * @param dataCDF {jsx3.xml.CDF.Document} - the CDF document of data to be set, null indicates data is being cleared,
         *        while empty document indicates query returning no results.
         * @param intCurrentPage {int} - the page number of the data being set
         * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
         * @param strId {String} - and auxilliary id for the target of the data
         *
         * @return {boolean} <code>true</code> to allow the data change, <code>false</code> to veto it.
         */
        tableview.onDataChange = function(dataCDF, intCurrentPage, intTotalPages, strId) {
            //return false if there is any reason this table list view should not have its data changed at this time
            return !this._allowUpdateData() || !this._cacheData || (intCurrentPage !== this._currentPage);
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
        tableview.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, strId) {
            // update the data in the Matrix with that in dataCDF. notify that selection has changed.
            // set the data on the matrix
            this._currentPage = intCurrentPage;
            this.setXMLString(dataCDF ? dataCDF.getXML() : null);
            this.resetXmlCacheData();
            this.preProcessData();
            this.repaintData();
            if(!this._cacheData) {
                this._mergeData()
            }
        }

        /**
         * Used to notify this accessory that a page change was requested.
         *
         * @param intNewPage {int} - the page to change to
         * @param intOldPage {int} - the page being changed from (or 0 if no previous page was set)
         * @param intTotalPages {int} - the total number of pages in the data set
         */
        tableview.pageChangeRequested = function(intNewPage, intOldPage, intTotalPages) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        /**
         * Used to notify this accessory that a reset is being requested.
         * Is called before the ListContainer performs the actual reset.
         *
         * @return {boolean} <code>true</code> to allow the reset, <code>false</code> to veto it.
         */
        tableview.onReset = function() {
            //return false if there is any reason this table list view should not be reset at this time
            return !this._allowUpdateData();
        }

        /**
         * Used to tell the accessory to reset itself.  Should be implemented by each accessory to reset their own state.
         */
        tableview.reset = function() {
            // reset the table to have no data, and display the default message when the data is null. notify that selection has changed.
            this.setXMLString(null);
            this.resetXmlCacheData();
            this.preProcessData();
            this.repaintData();
            this._handleMerge(true,"reset");
//            this._isDirty = false;
        }


        /**
         * Used to notify this accessory that a clear of selection is being requested.
         * Is called before the ListContainer performs the actual clear of the selection.
         *
         * @return {boolean} <code>true</code> to allow the clear of selection, <code>false</code> to veto it.
         */
        tableview.onClearSelectedRecordIds = function() {
            //return false if there is any reason this table list view should not have its selection  changed at this time
            return true;
        }

        /**
         * Used to notify this accessory that list selection was cleared.
         */
        tableview.selectionCleared = function() {
            // clear all selection in the table list.  do not send notification of the selection change.
            this.deselectAllRecords();
        }


        tableview.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            if(!objParent.instanceOf("tibco.uxcore.gui.ListContainer")) {
                ret = false;
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only ListContainer is valid parent of " + this.getClass().getName());
            }
            return ret;
        }

        tableview.getCellColor = function(id,att) {
            var node = this.getRecordNode(id);
            if(node) {
                if(node.getAttribute("uxcore_deleted") || node.getAttribute("uxcore_parentDeleted")) {
                    return "#DEDEDE";
                }
                else if(!this._cacheData || !this._cacheData.selectSingleNode("//record[@jsxid='" + id + "']")) {
                    return "#0000FF";
                }
                else {
                    var val = node.getAttribute(att);
                    var val2 = null;
                    if(this._cacheData) {
                        var orig = this._cacheData.selectSingleNode("//record[@jsxid='" + id + "']");
                        if(orig) {
                            val2 = orig.getAttribute(att);
                        }
                    }
                    return this.valuesEqual(val, val2) ? null : "#0000FF";
                }
            }
            return null;
        }

        tableview.valuesEqual = function(a, b) {
            var aNull = (a == null) || (typeof a == "undefined");
            var bNull = (b == null) || (typeof b == "undefined");
            if(a == "") {
                aNull = true;
            }
            if(b == "") {
                bNull = true;
            }
            if(aNull != bNull) {
                return false;
            }
            else if(aNull && bNull) {
                return true;
            }
            return (("" + a) == ("" + b));
        }

        tableview.postformat = function(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer) {
            // do nothing...this just allows an override
            var color = this.getCellColor(strCDFKey, objMatrixColumn.getPath());
            if(color) {
                objDiv.innerHTML = '<span style="color:' + color + ';">' + objDiv.innerHTML + '</span>';
            }
        }

    }
);