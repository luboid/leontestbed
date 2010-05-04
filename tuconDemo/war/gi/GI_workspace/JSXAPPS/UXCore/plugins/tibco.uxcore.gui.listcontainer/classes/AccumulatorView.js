//(function(plugIn) {

//if(jsx3.ide) {
//    jsx3.ide.loadTemplateCatalog("prop", "jsxplugin://tibco.uxcore.gui.accumulator/properties/catalog.xml",plugIn);
//}

jsx3.Class.defineClass("tibco.uxcore.gui.Accumulator", jsx3.gui.Block , [tibco.uxcore.gui.IListView, tibco.uxcore.gui.IListAccessory], function(ACCUMULATORVIEW, accumulatorview) {

    var Interactive = jsx3.gui.Interactive;

	ACCUMULATORVIEW.REND_DEEP = "deep";
	ACCUMULATORVIEW.REND_SHALLOW = "shallow";
	ACCUMULATORVIEW.REND_HIER = "hierarchical";
    ACCUMULATORVIEW.EDIT_MODE = 1;
    ACCUMULATORVIEW.NORMAL_MODE = 0;
    ACCUMULATORVIEW.LEFT_MATRIX_ID = "left";
    ACCUMULATORVIEW.RIGHT_MATRIX_ID = "right";


    accumulatorview._editMode = ACCUMULATORVIEW.NORMAL_MODE; // mode for table list view, edit mode or normal

    /**
     * Get a logger instance with class name as identity
     */
    accumulatorview.getLogger = function() {
        return jsx3.util.Logger.getLogger(this.getClass().getName());
    };

    accumulatorview.prepare = function() {
        this.leftMatrix = this.getDescendantOfName("leftMatrix");
        this.leftMatrix.getParent().setBackgroundColor("#FFFFFF");
        this.leftMatrix.subscribe(Interactive.EXCUTE, this, "_onExecute");
        this.rightMatrix = this.getDescendantOfName("rigthMatrix");
        this.rightMatrix.getParent().setBackgroundColor("#FFFFFF");
        this.leftTitleBox = this.getDescendantOfName("leftTitle");
        this.rightTitleBox = this.getDescendantOfName("rightTitle");
        this.btnMoveRight = this.getDescendantOfName("btnMoveRight");
        this.btnMoveRight.subscribe(jsx3.gui.Interactive.EXECUTE, this, function() {
            this.onclickMove(this.leftMatrix,this.rightMatrix);
        });
        this.btnMoveLeft = this.getDescendantOfName("btnMoveLeft");
        this.btnMoveLeft.subscribe(jsx3.gui.Interactive.EXECUTE, this, function() {
            this.onclickMove(this.rightMatrix,this.leftMatrix);
        });
        this.setEditMode(false,true);
    }

    accumulatorview._getMatrix = function(strId) {
        if(strId == ACCUMULATORVIEW.LEFT_MATRIX_ID) {
            return this.leftMatrix;
        }
        else if(strId == ACCUMULATORVIEW.RIGHT_MATRIX_ID) {
            return this.rightMatrix;
        }
        return null;
    }

    accumulatorview.init = function(strName) {
        this.jsxsuper(strName,"0","0","100%","100%");
        this.prepare();
    }

    accumulatorview.onAfterAssemble = function(objParent) {
        this.prepare()
    }

    accumulatorview.recordEdited = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * veto function for parent vote process
     * @private
     */
    accumulatorview._allowUpdateData = function(){
        return this.isEditMode();
    }

    /**
     * hook the doEvent to process the event for Matrix
     */
    accumulatorview.doEvent = function(strType,objContext){
        if(strType == Interactive.BEFORE_EDIT){
            return false;
        }
        return Interactive.prototype.doEvent.apply(this, arguments);
    }

    /**
     * set the edit mode for table list
     */
    accumulatorview.setEditMode = function(mode, bRepaint){
        if(mode === true) {
            mode = ACCUMULATORVIEW.EDIT_MODE;
        }
        if(mode === false) {
            mode = ACCUMULATORVIEW.NORMAL_MODE;
        }
        this._editMode = mode;
        this.getChild(0).setCols(this.isEditMode() ? "*,38,*" : "0,0,*", (bRepaint == true));
        return this;
    }

    /**
     * get the edit mode for table list
     */
    accumulatorview.getEditMode = function(){
        return this._editMode;
    }

    accumulatorview.isEditMode = function() {
        return this._editMode == ACCUMULATORVIEW.EDIT_MODE;
    }

    /**
     * reverts changes
     */
    accumulatorview.revert = function() {
        // revert any edits made (but remain in the edit mode)
        if(this.isEditMode()) {
            this.setData(this._cacheData,null,null,null,true,true);
            this.doChange("revert");
        }
    }

    accumulatorview.setData = function(objCdf, intCurrentPage, intTotalPages, strAux, bMergeToInitialData, bSuppressNotify) {
        try {
        var leftMtx = this._getMatrix(ACCUMULATORVIEW.LEFT_MATRIX_ID);
        var rightMtx = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID);
        if(!this._cacheData) {
            bMergeToInitialData = true;
        }
        if(bMergeToInitialData !== false) {
            this._isDirty = false;
            this._cacheData = objCdf ? objCdf.cloneDocument() : objCdf;
        }
        if(leftMtx) {
            if(rightMtx) {
                var doc = objCdf ? jsx3.xml.CDF.Document.newDocument() : null;
                if(doc) {
                    var selected = objCdf.selectNodes("//record[@jsxselected='1']");
                    for(var i = 0; i < selected.size(); i++) {
                        selected.get(i).setAttribute("jsxselected", "0");
                    }
                    rightMtx.setXMLString(doc ? doc.getXML() : null);
                    rightMtx.resetXmlCacheData();
                    rightMtx.repaintData();
                    this.insertRecordNodesHier(selected, leftMtx, rightMtx);
                }
                else {
                    rightMtx.clearXmlData();
                    rightMtx.repaintData();
                }
            }
            if(objCdf) {
                leftMtx.setXMLString(objCdf ? objCdf.getXML() : null);
                leftMtx.resetXmlCacheData();
            }
            else {
                leftMtx.clearXmlData();
            }
            leftMtx.repaintData();
        }
        if(bMergeToInitialData === false) {
            this._isDirty = true;
        }
        if(!bSuppressNotify) {
            this.doChange("datachange");
        }
        this.repaint();
        }catch(ex) {jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace())};
    };

    accumulatorview.doSelectRecordIds = function(strIds, auxId) {
        var allow = true;
        try {
            var con = this.getAncestorOfType("tibco.uxcore.gui.ListContainer");
            if(con) {
                var me = this;
                allow = con.onSelectRecordIds(strIds, auxId, me);
            }
        }
        catch(e) {
            jsx3.log("Error in Accumulator control: " + e);
        }
        return allow;
    };

    accumulatorview.getData = function(strAux) {
      var mtx = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID);
      return mtx ? mtx.getXML().cloneDocument() : null;
    };

    accumulatorview.clearData = function(strAux, bMergeToInitialState) {
        this.setData(null, null, null, strAux, bMergeToInitialState === true);
    };

    accumulatorview.getSelectedRecordIds = function(auxId) {
        var objMatrix = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID);
        if(objMatrix) {
            var doc = objMatrix.getXML();
            var selection = doc ? doc.selectNodeIterator("//record") : null;
            if(selection && selection.hasNext()) {
                var arr = new Array();
                while(selection.hasNext()) {
                    arr.push(selection.next().getAttribute("jsxid"));
                }
                return arr;
            }
            else {
                return null;
            }
        }
        return null;
    }

    accumulatorview.markInitialState = function() {
        this._isDirty = false;
        var temp = this._getMatrix(ACCUMULATORVIEW.LEFT_MATRIX_ID).getXML();
        if(temp) {
            temp = temp.cloneDocument();
            var sel1 = temp.selectNodeIterator("//record[@jsxselected='1']");
            while(sel1.hasNext()) { // clear selections from the intitial doc
                sel1.next().setAttribute("jsxselected","0");
            }
            //merge selected items into doc, with jsxselected set to 1
            var temp2 = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID).getXML();
            if(temp2) {
                var children = temp2.getChildIterator();
                while(children.hasNext()) {
                    var child = children.next().cloneNode(true);
                    child.setAttribute("jsxselected","1");
                    var pid = child.getAttribute("jsxparentid");
                    if(pid) {
                        var parent = temp.selectSingleNode("//record[@jsxid='" + pid + "']");
                        if(parent) {
                            parent.appendChild(child);
                        }
                        else {
                            temp.appendChild(child);
                        }
                    }
                    else {
                        temp.appendChild(child);
                    }
                }
            }
        }
        this._cacheData = temp;
    }

    /**
     * Returns the collection of selected records.  These are actual references to the records, not clones.
     *
     * @param auxId {String} not used
     *
     * @return {jsx3.util.List<jsx3.xml.Entity>}  list of selected Entity objects (records), or null if none are selected
     */
    accumulatorview.getSelectedRecords = function(auxId) {
        var ret = new jsx3.util.List(0);
        var objMatrix = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID);
        if(objMatrix) {
            var doc = objMatrix.getXML();
            var selection = doc ? doc.selectNodeIterator("//record") : null;
            if(selection && selection.hasNext()) {
                while(selection.hasNext()) {
                    ret.add(selection.next());
                }
            }
        }
        return ret;
    }

    /**
     * Clears the list selections
     * @param auxId {String} not used
     * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
     *                 initial data state of the list view (what will be reverted back to on a revert action)
     */
    accumulatorview.clearSelectedRecords = function(auxId, bMergeToInitialData) {
        var rightMtx = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID);
        var leftMtx = this._getMatrix(ACCUMULATORVIEW.LEFT_MATRIX_ID);
        var doc = rightMtx.getXML();
        if(doc) {
            var list = doc.getChildNodes();
//            if(leftMtx.getRenderingModel() == jsx3.gui.Matrix.REND_HIER){
                this.insertRecordNodesHier(list,rightMtx,leftMtx);
//            } else{
//                this.insertRecordNodes(list,rightMtx,leftMtx);
//            }
            if(bMergeToInitialData) {
                this.markInitialState();
            }
            else {
                this._isDirty = true;
                this.doChange("select");
            }
        }
        else if(bMergeToInitialData) {
            this.markInitialState();
        }

    }

    /**
     * selects CDF records within the List. Both the view and the data model (CDF) will be updated.  This does not replace the previous selections,
     * but rather adds these to the current selection.
     * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
     * @param auxId {String} not used
     */
    accumulatorview.selectRecords = function(strIds, auxId, bMergeToInitialData) {
        // add the provided id(s) to the current selection.  DO NOT clear the previous selection first.  Notify that selection has changed.
        var leftMtx = this._getMatrix(ACCUMULATORVIEW.LEFT_MATRIX_ID);
        var rightMtx = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID);
        if(typeof strIds == "string") {
            strIds = [strIds];
        }
        var list = new jsx3.util.List(0);
        for(var i = 0; i < strIds.length; i++) {
            var node = leftMtx.getRecordNode(strIds[i]);
            if(node) {
                list.add(node);
            }
        }
        if(list) {
//            if(rightMtx.getRenderingModel() == jsx3.gui.Matrix.REND_HIER){
                this.insertRecordNodesHier(list,leftMtx,rightMtx);
//            } else{
//                this.insertRecordNodes(list,leftMtx,rightMtx);
//            }
            if(bMergeToInitialData) {
                this.markInitialState();
            }
            else {
                this._isDirty = true;
                this.doChange("select");
            }
        }
        else if(bMergeToInitialData) {
            this.markInitialState();
        }
    }

    accumulatorview.deselectRecords = function(strIds, auxId, bMergeToInitialData) {
        // add the provided id(s) to the current selection.  DO NOT clear the previous selection first.  Notify that selection has changed.
        var leftMtx = this._getMatrix(ACCUMULATORVIEW.LEFT_MATRIX_ID);
        var rightMtx = this._getMatrix(ACCUMULATORVIEW.RIGHT_MATRIX_ID);
        if(typeof strIds == "string") {
            strIds = [strIds];
        }
        var list = new jsx3.util.List(0);
        for(var i = 0; i < strIds.length; i++) {
            var node = rightMtx.getRecordNode(strIds[i]);
            if(node) {
                list.add(node);
            }
        }
        if(list) {
//            if(leftMtx.getRenderingModel() == jsx3.gui.Matrix.REND_HIER){
                this.insertRecordNodesHier(list,rightMtx,leftMtx);
//            } else{
//                this.insertRecordNodes(list,rightMtx,leftMtx);
//            }
            if(bMergeToInitialData) {
                this.markInitialState();
            }
            else {
                this._isDirty = true;
                this.doChange("select");
            }
        }
        else if(bMergeToInitialData) {
            this.markInitialState();
        }
    }

    /**
     * Used to notify this accessory that a search query was requested.
     *
     * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
     */
    accumulatorview.searchRequested = function(searchXML) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a view change was performed.
     *
     * @param strNewId {String} - the id of the view that was switched to
     * @param strOldId {String} - the id of the view that was switched away from
     */
    accumulatorview.viewChanged = function(strNewId, strOldId) {
        // can be used to determine when this table list view has come into view, or gone out of view
    }

    /**
     * Used to notify this accessory that an ActionButton action was requested.
     *
     * @param actionId {String} - the id of the action that was requested
     */
    accumulatorview.actionRequested = function(actionId) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a visibility (Hide/Show) change was performed.
     *
     * @param bVisible {boolean} - the current visibility state (<code>true</code> for visible, <code>false</code> for hidden
     */
    accumulatorview.visibilityChanged = function(bVisible) {
        // can be used to determine when this (and all other list views) have been hidden (collpased)
    }

    /**
     * Used to notify this accessory that a data refresh is being requested.
     * Is called before the ListContainer publishes the actual data refresh request.
     *
     * @return {boolean} <code>true</code> to allow the data refresh request, <code>false</code> to veto it.
     */
    accumulatorview.onRefresh = function() {
        //return false if there is any reason this table list view should not be refreshed at this time
        return !this._allowUpdateData();
    }

    /**
     * Used to notify this accessory that a data refresh was requested.
     */
    accumulatorview.refreshRequested = function() {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a columns change was performed.
     *
     * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns now shown in the list
     */
    accumulatorview.columnsChanged = function(arrNewAtts, arrOldAtts) {
        // hide and show columns as needed to make the visible columns match those in arrNewAtts
    }

    /**
     * Used to notify this accessory that a data change was performed.
     *
     * @param dataCDF {jsx3.xml.CDF.Document} - the CDF document of new data, null indicates data was cleared,
     *        while empty document indicates query returned no results.
     * @param intCurrentPage {int} - the page number of the data, with respect to the whole data set
     * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
     * @param auxId {String} - and auxilliary id for the target of the data
     */
    accumulatorview.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, auxId) {
        this.setData(dataCDF, intCurrentPage, intTotalPages, auxId);
    }

    /**
     * Used to notify this accessory that a page change is being requested.
     * Is called before the ListContainer publishes the actual page change request.
     *
     * @param intNewPage {int} - the page to change to
     * @param intOldPage {int} - the page being changed from (or 0 if no previous page was set)
     * @param intTotalPages {int} - the total number of pages in the data set
     *
     * @return {boolean} <code>true</code> to allow the page change request, <code>false</code> to veto it.
     */
    accumulatorview.onPageChange = function(intNewPage, intOldPage, intTotalPages) {
        //return false if there is any reason this table list view does not want the page to change at this time
        return false;
    }

    /**
     * Used to notify this accessory that a page change was requested.
     *
     * @param intNewPage {int} - the page to change to
     * @param intOldPage {int} - the page being changed from (or 0 if no previous page was set)
     * @param intTotalPages {int} - the total number of pages in the data set
     */
    accumulatorview.pageChangeRequested = function(intNewPage, intOldPage, intTotalPages) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a reset is being requested.
     * Is called before the ListContainer performs the actual reset.
     *
     * @return {boolean} <code>true</code> to allow the reset, <code>false</code> to veto it.
     */
    accumulatorview.onReset = function() {
        //return false if there is any reason this table list view should not be reset at this time
        return !this._allowUpdateData();
    }

    /**
     * Used to tell the accessory to reset itself.  Should be implemented by each accessory to reset their own state.
     */
    accumulatorview.reset = function() {
        // reset the table to have no data, and display the default message when the data is null.
        this.setData(null, null, null, this.getPanelIds([])[0], true, true);
        this.doChange("reset");
    };

    /**
     * Used to notify this accessory that a record selection change is being requested.
     * Is called before the ListContainer performs the actual record selection change.
     *
     * @param arrRecordIds {Array} - array of the jsxids of the records to be selected
     *
     * @return {boolean} <code>true</code> to allow the record selection change, <code>false</code> to veto it.
     */
    accumulatorview.onSelectRecordIds = function(arrRecordIds, auxId) {
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
    accumulatorview.recordsSelected = function(arrRecordIds, auxId, objCaller) {
        // synchronize the selection in the table list with that in arrRecordIds if they do not already match.  Do not send notification of the change
        if(objCaller != this) {
            this.setSelectedRecordIds(arrRecordIds, auxId);
        }
    }

    /**
     * Sets the value of this list. Deselects all existing selections. Scrolls the first record into view.
     * @param strId {String | Array<String>} jsxid attribute for the CDF record(s) to select
     * @param auxId {String} not used
     */
    accumulatorview.setSelectedRecordIds = function(strIds, auxId, bMergeToInitialData) {
        this.clearSelectedRecords(auxId,false);
        this.selectRecords(strIds,auxId,bMergeToInitialData);
    }

    accumulatorview.onAdopt = function(fromMtx, strRecordId, targetCDF) {
        if(targetCDF.getRecord(strRecordId) != null){// drag to itself
            return false;
        }
        var toMtx = fromMtx.getName()=="leftMatrix"? this.rightMatrix : this.leftMatrix;
        this.onclickMove(fromMtx,toMtx);
        return false;// returning false to prevent the default logic of adoption provided by GI matrix
    }

    accumulatorview.setRightTitle = function(strValue) {
        if(this.rightTitleBox){
            this.rightTitleBox.setText(strValue,true);
            this.rightTitle = strValue;
        }
    }

    accumulatorview.setLeftTitle = function(strValue) {
        if(this.leftTitleBox){
            this.leftTitleBox.setText(strValue,true);
            this.leftTitle = strValue;
        }
    }

    accumulatorview.getRightTitle = function() {
        if(this.rightTitleBox){
            return this.rightTitleBox.getText();
        }
    }

    accumulatorview.getLeftTitle = function() {
        if(this.leftTitleBox){
            return this.leftTitleBox.getText();
        }
    }

    accumulatorview.onclickMove = function(fromMtx,toMtx) {
        try{
            var arr = new Array();
            if(fromMtx == this._getMatrix(ACCUMULATORVIEW.LEFT_MATRIX_ID)) {
                arr = fromMtx.getSelectedIds();
            }
            else {
                var selected = new jsx3.util.List(fromMtx.getSelectedIds());
                var doc = fromMtx.getXML();
                if(doc) {
                var iter = doc.selectNodeIterator("//record");
                while(iter.hasNext()) {
                    var id = iter.next().getAttribute("jsxid")
                    if(!selected.contains(id)) {
                        arr.push(id);
                    }
                }
                }
            }
            if(this.doSelectRecordIds(arr,null)) {
                var selectedRecordNodes = fromMtx.getSelectedNodes();
//                if(toMtx.getRenderingModel() == jsx3.gui.Matrix.REND_HIER){
                    this.insertRecordNodesHier(selectedRecordNodes,fromMtx,toMtx);
//                } else{
//                    this.insertRecordNodes(selectedRecordNodes,fromMtx,toMtx);
//                }
                this._isDirty = true;
                this.doChange("select");
            }
        }catch(e){
            this.getLogger().error("moving error : " + e);
            return false;
        }
    }

    accumulatorview.insertRecordNodesHier = function(recordNodes, fromMtx, toMtx) {
        if(recordNodes){
            toMtx.deselectAllRecords();
            for(var i=0; i<recordNodes.size(); i++){
                var recordNode = recordNodes.get(i);
                var parentNode = recordNode.getParent();
                var recordId = recordNode.getAttribute("jsxid");
                var moveToRecordId = null;
                if(fromMtx == this._getMatrix(ACCUMULATORVIEW.LEFT_MATRIX_ID)) {
//                    jsx3.log("LtR");
                    if(parentNode && (parentNode.getAttribute("jsxid") != "jsxroot")) {
//                        jsx3.log("parentId: " + parentNode.getAttribute("jsxid"));
                        recordNode.setAttribute("jsxparentid", parentNode.getAttribute("jsxid"));
//                        jsx3.log("set");
                    }
                }
                else {
                    if(parentNode && (parentNode.getAttribute("jsxid") != "jsxroot")) {
                        // must move out all other children and then move the parent;
                        var list = parentNode.getChildNodes();
                        var pid = parentNode.getAttribute("jsxid");
                        var grandparent = parentNode.getParent();
                        var gpid = grandparent ? grandparent.getAttribute("jsxid") : null;
                        if(gpid == "jsxroot") {
                            gpid = null;
                        }
                        for(var j = list.size() - 1; j >= 0; j--) {
                            var child = list.get(j);
                            if(child.getAttribute("jsxid") != recordId) {
//                                jsx3.log("moving child to gp: " + child);
//                                jsx3.log("gp: " + gpid);
                                child.setAttribute("jsxparentid",pid);
                                fromMtx.deleteRecord(child.getAttribute("jsxid"));
                                fromMtx.insertRecordNode(child, gpid, false);
                            }
                        }
//                        jsx3.log("fromMtx: " + fromMtx.getXML());
//                        jsx3.log("parentNode: " + parentNode);
                        // other children are now removed
                        recordNode = parentNode;
                        recordId = parentNode.getAttribute("jsxid");
                    }
                    moveToRecordId = recordNode.getAttribute("jsxparentid");
                }

//                jsx3.log("record: " + recordNode);
                jsx3.log(this._cacheData);
//                jsx3.log("moveToRecordId: " + moveToRecordId);
                var cachedRecordNode = this._cacheData.selectSingleNode("//record[@jsxid='" + recordId + "']").cloneNode(true);
                var childIterator = cachedRecordNode.getChildIterator();
                // get all existing children
                while(childIterator.hasNext()){
                    var childRecordId = childIterator.next().getAttribute("jsxid");
//                    jsx3.log("child: " + childRecordId);
                    var rec = toMtx.deleteRecord(childRecordId);
//                    jsx3.log("Removed: " + rec);
                    if(rec) {
                        // if they already exist in the target matrix, move them to the record node.
                        recordNode.appendChild(rec);
//                        jsx3.log("existing child added: " + childRecordId);
                    }
                }
//                var appendedParentId = recordNode.getAttribute("jsxparentid");
//                if(appendedParentId == null && parentNode != null){
//                    appendedParentId = parentNode.getAttribute("jsxid");
//                    cachedRecordNode.setAttribute("jsxparentid",appendedParentId);
//                }
//                jsx3.log("final record: " + recordNode);
                toMtx.insertRecordNode(recordNode,moveToRecordId,false);
            }
//            for(var i=0; i<recordNodes.size(); i++){
//                var recordNode = recordNodes.get(i);
//                fromMtx.deleteRecord(recordNode.getAttribute("jsxid"));
//            }
            toMtx.repaintData();
            fromMtx.repaintData();
        }
    }

    accumulatorview.insertRecordNodes = function(recordNodes, fromMtx, toMtx) {
        if(recordNodes){
            toMtx.deselectAllRecords();
            for(var i=0; i<recordNodes.size(); i++){
                var recordNode = recordNodes.get(i).cloneNode(false);
                toMtx.insertRecordNode(recordNode,null,false);
            }
            for(var i=0; i<recordNodes.size(); i++){
                var recordNode = recordNodes.get(i).cloneNode(true);
                var childIterator = recordNode.getChildIterator();
                fromMtx.deleteRecord(recordNode.getAttribute("jsxid"));
                while(childIterator.hasNext()){
                    var childRecord = childIterator.next();
                    fromMtx.insertRecordNode(childRecord,null,false);
                }
            }
            toMtx.repaintData();
            fromMtx.repaintData();
        }
    }

    accumulatorview.onSetParent = function(objParent) {
        var ret = this.jsxsuper(objParent);
        if(!objParent.instanceOf("tibco.uxcore.gui.ListContainer")) {
            ret = false;
        }
        if(!ret && jsx3.IDE) {
            this.getLogger().error("Building Error: Only ListContainer is valid parent of " + this.getClass().getName());
        }
        return ret;
    };
});
