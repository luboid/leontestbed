if(window.tibco && tibco.uxcore && tibco.uxcore.gui)
    delete tibco.uxcore.gui.BrowseView;

//jsx3.require("jsx3.gui.Template");

/**
 * Class BrowseView
 *
 * This control uses template language to render.
 */
jsx3.lang.Class.defineClass("tibco.uxcore.gui.BrowseView", jsx3.gui.Template.Block, [tibco.uxcore.gui.IListView, tibco.uxcore.gui.IListAccessory], function(BROWSEVIEW, browseview) {

    var Event = jsx3.gui.Event;
    var Interactive = jsx3.gui.Interactive;

    BROWSEVIEW.EDIT_MODE = 1;
    BROWSEVIEW.NORMAL_MODE = 0;

    browseview._editMode = BROWSEVIEW.NORMAL_MODE; // mode for table list view, edit mode or normal

    browseview.recordEdited = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * veto function for parent vote process
     * @private
     */
    browseview._allowUpdateData = function() {
        return this.isEditMode();
    }

    browseview.onAfterAssemble = function(objParent) {
        this.jsxsuper();
        this.selections = [];
    }

    /**
     * hook the doEvent to process the event for Matrix
     */
    browseview.doEvent = function(strType, objContext) {
        return Interactive.prototype.doEvent.apply(this, arguments);
    }

    /**
     * set the edit mode for table list
     */
    browseview.setEditMode = function(mode) {
        if(mode === true) {
            mode = BROWSEVIEW.EDIT_MODE;
        }
        if(mode === false) {
            mode = BROWSEVIEW.NORMAL_MODE;
        }
        this._editMode = mode;
        return this;
    }

    browseview.isEditMode = function() {
        return this._editMode == BROWSEVIEW.EDIT_MODE;
    }

    /**
     * get the edit mode for table list
     */
    browseview.getEditMode = function() {
        return this._editMode;
    }

    /**
     * reverts changes
     */
    browseview.revert = function() {
        // revert any edits made (but remain in the edit mode)
        if(this.isEditMode()) {
            var panelIds = this.getPanelIds([]);
            for(var i = 0; i < panelIds.length; i++) {
                var doc = this["_cacheData" + panelIds[i]];
                this.setData(doc ? doc.cloneDocument() : null, null, null, panelIds[i], false, true);
            }
            this._isDirty = false;
            this.doChange("revert");
        }
    }

  //Constructor
    browseview.init = function(strName) {
        this.jsxsuper(strName);
        this.selections = [];
    };

    browseview.complex = {};
    browseview.complex.hpad = 8;
    browseview.complex.vpad = 8;
    browseview.complex.panelwidth = 200;
    browseview.complex.imgoff = "jsx:///images/icons/fade_v.gif";
    browseview.complex.imgon = "jsxplugin://tibco.uxcore.gui.matrix/images/row_Highlight.jpg";

    //only one panel exists at a time. It is cloned as needed to create additional panels
    browseview.onAfterAttach = function() {
        while(this.getChildren().length > 1)
            this.removeChild(this.getLastChild());
        var objPanel = this.getFirstChild();
        var mtx = objPanel ? objPanel.getDescendantsOfType("jsx3.gui.Matrix")[0] : null;
        if(mtx) {
            var arr = mtx.getChildren();
            for(var i=0; i<arr.length; i++) {
                var col = arr[i];
                if(col.getPath() != "jsximg") {
                    col.setCellPadding("2 5 2 10");
                }
            }
            objPanel.setCSSOverride("float:left;");
            objPanel.setBackgroundColor("#FFFFFF");
            objPanel.getPanelId = function() {
                return this.getParent()._getMyPanelId(this);
            }
            this._configureSubs(objPanel);
            this._applySelector(objPanel, false);
        }
        else {
            jsx3.log("missing matrix panel child...get from plugin.");
        }
    };

    browseview._getMatrix = function(objPanel) {
        return objPanel ? objPanel.getDescendantsOfType("jsx3.gui.Matrix")[0] : null;
    };

    browseview._configureSubs = function(objPanel) {
        objM = this._getMatrix(objPanel);
        objM.setEvent("1;", Interactive.CHANGE);
        objM.subscribe(Interactive.CHANGE, this, "_onSelect");
    };

    browseview._removeSubs = function(objPanel) {
        var objM = objPanel.getDescendantsOfType("jsx3.gui.Matrix")[0];
        objM.unsubscribeAll(Interactive.CHANGE);
    };

    browseview.setPanelWidths = function(panelwidths, bRepaint) {
        this.jsxpanelwidths = panelwidths;
        delete this._jsxcachedpanelwidths;
        if(bRepaint) this.repaint();
    };

    browseview.getPanelWidths = function() {
        return this.jsxpanelwidths || [this.complex.panelwidth];
    };

    browseview._getTrueWidthArray = function(intSize) {
        if(intSize) this.cacheparentwidth = intSize;
        intSize = intSize || this.cacheparentwidth;
        if(this._jsxcachedpanelwidths) return this._jsxcachedpanelwidths;
        if(!intSize) return [this.complex.panelwidth];

        var intTotal = 0;
        var intWild = 0;

        var divs = this.getPanelWidths();

        if(!(divs instanceof Array))
            divs = divs != null ? divs.split(/\s*,\s*/g) : [];
        var objNew = new Array(divs.length);

        //loop through implicit dimensions to create exlicit version
        for(var i = 0; i < divs.length; i++) {
            var div = divs[i];
            if(div == "*") {
                objNew[i] = "*";
            }
            else if(typeof(div) == "string" && div.indexOf("%") >= 0) {
                var intVal = parseFloat(div);
                objNew[i] = isNaN(intVal) ? "*" : (intVal / 100) * intSize;
            }
            else {
                var intVal = parseInt(div);
                objNew[i] = isNaN(intVal) ? "*" : intVal;
            }

            if(objNew[i] == "*") intWild++;
            else intTotal += objNew[i];
        }

        if(intWild > 0) {
            var wildSize = Math.max(0, intSize - intTotal - 2) / intWild;

            for(var i = 0; i < objNew.length; i++)
                if(objNew[i] == "*") objNew[i] = wildSize;
        }

        // Round each row/col to an integer and distribute the remainder as full pixels among the rows/cols.
        // This algorithm will not necessarily distribute pixels to the most "deserving" rows/cols.
        //     (e.g. [10.9, 1.1] will give the extra pixel to the 1.1).
        var decimal = 0, sum = 0;
        for(var i = 0; i < objNew.length; i++) {
            decimal += objNew[i] % 1;
            objNew[i] = Math.floor(objNew[i]);
            if(decimal >= 1 || (i == objNew.length - 1 && decimal > 0.5)) {
                objNew[i]++;
                decimal--;
            }
            sum += objNew[i];
        }
        if(this.getPanelIds([]).length > objNew.length) {
            sum = sum + objNew[0]*(this.getPanelIds([]).length - objNew.length)
        }
        this._jsxcachedpanelwidths = objNew;
        this._jsxviewportwidth = sum;
        return objNew;

    };


    //get the template XML
    browseview.getTemplateXML = function() {
        return ['',
            '<transform xmlns="http://gi.tibco.com/transform/" xmlns:u="http://gi.tibco.com/transform/user" version="1.0">',
            '<template recalc="true" onbeforepaint="this._synchChildCount()" onbeforeresize="delete this._jsxcachedpanelwidths" >',
            //outer-most box
            '<inlinebox style="position:{$position};left:{$left};top:{$top};width:100%;height:100%;display:{$display};visibility:{$visibility};overflow:hidden;">',
            '<var id="panelwidths">this._getTrueWidthArray($$parentwidth)</var>',
            '<var id="viewportwidth">this._jsxviewportwidth</var>',
            '<var id="viewportheight">(viewportwidth &gt; $$parentwidth ? $$parentheight - (jsx3.gui.Template.Box.getScrollSize()) : $$parentheight) - 2</var>',
            //viewport
            '<div u:id="viewport" style="z-index:2;position:absolute;top:1px;left:1px;height:100%-2;width:100%-2;white-space:nowrap;overflow-y:hidden;overflow-x:auto">',
            //viewpane
            '<div u:id="viewpane" style="position:absolute;top:0px;left:0px;height:{viewportheight};width:{viewportwidth};white-space:nowrap;">',
            '<var id="titleHeight">this._hasTitle() ? 24 : 0</var>',
            '<var id="contentHeight">viewportheight - titleHeight</var>',
            '<var id="matrixHeight">contentHeight - 2</var>',
            '<var id="contentTop">titleHeight</var>',
            //title row (optional)
            '<div u:id="title" style="position:absolute;top:8px;padding:0px 0px 0px 0px;left:0px;;width:100%;font-size:11px;font-weight:bold;font-family:Arial;color:#000000;white-space:nowrap;">',
            '<attach select="this.iterTitlePanels()">',
            '<drawspace width="this._getTrueWidthArray(this.cacheparentwidth)[$$target.reIndex] || this._getTrueWidthArray(this.cacheparentwidth)[0]"/>',
            '</attach>',
            '</div>',
            //content (the matrix children)
            '<div u:id="content" style="position:absolute;top:{contentTop};left:0px;height:{matrixHeight};width:100%;white-space:nowrap;">',
            '<attach select="this.iterMatrixPanels()">',
            '<drawspace width="this._getTrueWidthArray(this.cacheparentwidth)[$$target.getChildIndex()] || this._getTrueWidthArray(this.cacheparentwidth)[0]" height="$$parentheight" />',
            '</attach>',
            '</div>',
            '</div>',
            '</div>',
            //borderbox
            '<div u:id="borderbox" style="z-index:1;position:absolute;top:{contentTop};left:0px;height:{contentHeight};width:100%;overflow:hidden;border:solid 1px #555555;">&amp;#160;</div>',
            //left/right borders (need to use, since the title how doesn't use borders)
            //'<div u:id="rightline" style="position:absolute;top:{contentTop};right:1px;height:{contentHeight};width:1px;overflow:hidden;background-color:#555555">&amp;#160;</div>',
            '</inlinebox>',
            '</template>',
            '</transform>'].join("");
    };

    //called before painting to ensure there are enough child panels to handle the configurations/settings
    browseview._synchChildCount = function(bPaintChild) {
        this._remTitlePanels();
        var intLength = this.getPanelIds([]).length;
        if(intLength == 0) {
            //when this control does not have any panel ids, it means the control will cursor the same CDF document, with each contained matrix using the same CDF, but
            if(intLength > this.getChildren().length) {
                this._addPanels(intLength, bPaintChild);
            }
            else if(intLength < this.getChildren().length) {
                this._remPanels(intLength - 1);
            }
        }
        else if(intLength > this.getChildren().length) {
            this._addPanels(intLength, bPaintChild);
        }
        else if(intLength < this.getChildren().length) {
            this._remPanels(intLength - 1);
        }
        this._addTitlePanels(bPaintChild);
    };

    browseview._remPanels = function(intKeepIndex) {
        var intEnd = this.getChildren().length - 1; //2
        if(intEnd > intKeepIndex) {
            for(var i = intEnd; i > intKeepIndex; i--) {
                var objChild = this.getChild(i);
                if(!objChild.getChild(0)) return;
                this._removeSubs(objChild);
                this.removeChild(objChild);
            }
        }
    };

    browseview._clearPanels = function(intKeepIndex) {
        var intEnd = this.getChildren().length - 1; //2
        if(intEnd > intKeepIndex) {
            for(var i = intEnd; i > intKeepIndex; i--) {
                var objChild = this.getChild(i);
                if(objChild && objChild.getChild(0)) {
                    var mtx = objChild.getDescendantsOfType("jsx3.gui.Matrix")[0];
                    if(mtx) {
                        mtx.clearXmlData();
                        mtx.repaintData();
                    }
                }
            }
        }
    };

    browseview._addPanels = function(intMax, bPaintChild) {
        var intBegin = this.getChildren().length; //3
        if(intBegin < intMax) {
            for(var i = intBegin; i < intMax; i++) {
                var objClone = this.getFirstChild().doClone();
                objClone.getDescendantsOfType("jsx3.gui.Matrix")[0].clearXmlData();
                objClone.getPanelId = function() {
                    return this.getParent()._getMyPanelId(this);
                }
                this._configureSubs(objClone);
                if(bPaintChild)
                    this.paintChild(objClone);
            }
        }
    };

    browseview._remTitlePanels = function() {
        var intEnd = this.getChildren().length - 1;
        for(var i=intEnd; i>0; i--) {
            objChild = this.getChild(i);
            if(objChild.getChild(0)) return;
            this.removeChild(objChild);
        }
    };

    browseview._addTitlePanels = function(bPaintChild) {
        var panelLabels = this.getPanelLabels([]);
        jsx3.$A(panelLabels).each(jsx3.$F(function(o){
            var oBlock = new jsx3.gui.Block("titlePanel", 0, 0, null, null, o);
            this.setChild(oBlock);
            if(bPaintChild)
                this.paintChild(oBlock);
        }).bind(this));
    };

    browseview.getPanelChildren = function() {
        return jsx3.$A(this.getChildren()).filter(function(obj){
            return !!obj.getChild(0);
        });
    };

    browseview.getLastPanelChild = function() {
        var panels = this.getPanelChildren();
        return panels.length>0 ? panels[panels.length-1] : null;
    };

    browseview.getPanelLabels = function(strDefault) {
        if(typeof(this.panellabels) == "string") {
            this.panellabels = this.panellabels.split(",");
        }
        return this.panellabels || strDefault;
    };

    browseview.setPanelLabels = function(arrLabels, bRepaint) {
        if(typeof(arrLabels) == "string") {
            arrLabels = arrLabels.split(",");
        }
        this.panellabels = arrLabels;
        if(bRepaint) this.repaint();
    };

    browseview.iterTitlePanels = function() {
        var reIndex = 0;
        return jsx3.util.List.wrap(
          jsx3.$A(this.getChildren()).filter(function(obj){
            if(!obj.getChild(0)) {
                obj.reIndex = reIndex++;
                return true;
            } else {
                return false;
            }
          })
        ).iterator();
    };

    browseview.iterMatrixPanels = function() {
        return jsx3.util.List.wrap(jsx3.$A(this.getChildren()).filter(function(obj){
            return !!obj.getChild(0);
        })).iterator();
    };

    browseview.getPanelIds = function(strDefault) {
        if(typeof(this.panelids) == "string") {
            this.panelids = this.panelids.split(",");
        }
        return this.panelids || strDefault;
    };

    browseview.setPanelIds = function(arrIds) {
        if(typeof(arrIds) == "string") {
            arrIds = arrIds.split(",");
        }
        this.panelids = arrIds;
        this._synchChildCount(true);
        this.recalc();
    };

    browseview.iterPanelIds = function() {
        return new jsx3.util.List(this.getPanelIds([])).iterator();
    };

    browseview._onSelect = function(objEvent, bSuppressNotify, bNoSetDirty) {
        try {
            var strId = objEvent.target.getSelectedIds();
            var allow = true;
            var pids = this.getPanelIds([]);
            var objPanel = objEvent.target;
            while(objPanel.getParent().getClass().getName() != this.getClass().getName()) {
                objPanel = objPanel.getParent();
            }
            var idx = objPanel.getChildIndex();
            var strAux = (idx < pids.length) ? pids[idx] : null;
            if(!bSuppressNotify) {
                allow = this.doSelectRecordIds(strId, strAux);
            }
            if(allow) {
                if(!bNoSetDirty) {
                    this._isDirty = true;
                    this.doChange("select");
                }
                this._applySelector(objPanel, true);

                if((objPanel == this.getLastPanelChild()) && (idx < (pids.length - 1))) {
                    var objClone = objPanel.doClone();
                    objClone.getPanelId = function() {
                        return this.getParent()._getMyPanelId(this);
                    }
                    var objM = this._getMatrix(objClone);
                    objM.getServer().getCache().setDocument(objM.getXMLId(), null);
                    this._configureSubs(objClone);
                    this.paintChild(objClone);
                    this.recalc();
                }
                else {
                    var intIndex = objPanel.getChildIndex();
                    this._clearPanels(intIndex);
                    this.recalc();
                }
            }
        }
        catch(ex) {
            jsx3.log(ex.printStackTrace());
        }
    };

    browseview.updateSelections = function(panelId, val) {
        var list = new jsx3.util.List();
        if(val instanceof String) {
            list.add(val);
        }
        else {
            list.addAll(val);
        }
        this.selections[panelId] = list;
    }

    browseview.restoreSelections = function(panelId) {
        var list = this.selections[panelId];
        if(!list) list = new jsx3.util.List();
        var mtx = this._getMatrix(this.getPanel(panelId));
        var doc = mtx.getXML();
        var iter = doc.selectNodeIterator("//record");
        while(iter.hasNext()) {
            var node = iter.next();
            node.setAttribute("jsxselected", list.contains(node.getAttribute("jsxid")) ? "1" : "0");
        }
        mtx.repaintData();
    }

    /**
     * Will publish an array of selected jsxids and an auxiliary object
     *
     * @param strId {String | Array<String>} jsxid attribute of slected CDF record(s)
     * @param auxId {Object} an Auxiliary object
     */
    browseview.doSelectRecordIds = function(strIds, auxId) {
        var allow = true;
        try {
            var con = this.getAncestorOfType("tibco.uxcore.gui.ListContainer");
            if(con) {
                var me = this;
                allow = con.onSelectRecordIds(strIds, auxId, me);
                var objPanel = !auxId ? this.getFirstChild() : this.getPanel(auxId);
                if(!allow) {
                    this.restoreSelections(this.getPanelIds([])[objPanel.getChildIndex()]);
                }
                else {
                    var objMatrix = objPanel ? this._getMatrix(objPanel) : null;
                    this.updateSelections(this.getPanelIds([])[objPanel.getChildIndex()], objMatrix.getSelectedIds());
                }
            }
        }
        catch(e) {
            jsx3.log("Error in BrowseView control: " + e);
        }

        //TODO: remove the following test code (this simulates a refetch of data)
        if(this.testmode && this.getPanelIds([]).length) {
            jsx3.log('this instance of the browseview control is in test mode, because its testmode flag is set');
            var objP = jsx3.GO(auxId).getParent();
            jsx3.log(objP);
            if(objP.getNextSibling()) {
                jsx3.log(objP.getNextSibling());
                var objM = this._getMatrix(objP);
                jsx3.sleep(function() {
                    this.setData(objM.getXML().cloneDocument(), null, null, this.getPanelIds([])[objP.getChildIndex() + 1]);
                }, null, this);
            }
        }
        return allow;
    };

    browseview.getData = function(strAux) {
        var objPanel = !strAux ? this.getFirstChild() : this.getPanel(strAux);
        return objPanel ? this._getMatrix(objPanel).getXML() : null;
    };

    browseview.clearData = function(strAux, bMergeToInitialState) {
        this.setData(jsx3.xml.CDF.Document.newDocument(), null, null, strAux, bMergeToInitialState === true);
    };

    browseview.setData = function(objCdf, intCurrentPage, intTotalPages, strAux, bMergeToInitialData, bSuppressNotify) {
        var intIndex;
        var objMatrix;
        if(!jsx3.util.strEmpty(strAux)) {
            var panelIds = this.getPanelIds([]);
            intIndex = jsx3.util.List.wrap(panelIds).indexOf(strAux);
            if(intIndex + 1 > this.getPanelChildren().length) {
                this._addPanels(intIndex + 1, true);
                objMatrix = this._getMatrix(this.getLastPanelChild());
                this.recalc();
            }
            else if(intIndex == -1) {
                jsx3.log("An aux id was passed (" + strAux + ") that is not listed in the array of panel ids (" + this.getPanelIds([]) + ")")
                return false;
            }
            else {
                objMatrix = this._getMatrix(this.getChild(intIndex));
                this._clearPanels(intIndex);
            }
        }
        else {
            intIndex = 0;
            objMatrix = this._getMatrix(this.getFirstChild());
            this._clearPanels(0);
        }
        if(objMatrix) {
            if(objCdf) {
                objMatrix.setSourceXML(objCdf);
            }
            else {
                objMatrix.clearXmlData();
            }
            objMatrix.repaintData();
        }
        if((bMergeToInitialData !== false) || ((intIndex == 0) && !this["_cacheData" + this.getPanelIds([])[0]])) {
            this.markInitialState();
        }
        else {
            this._isDirty = true;
            if(!bSuppressNotify) {
                this.doChange("datachange");
            }
        }
        //this.repaint();
    };

    browseview.getCacheData = function(auxId) {
        return this["_cacheData" + auxId];
    }

    browseview.markInitialState = function() {
        this._isDirty = false;
        var panelIds = this.getPanelIds([]);
        var childLength = this.getPanelChildren().length;
        for(var i = 0; i < panelIds.length; i++) {
            if(i < childLength) {
                var objMatrix = this._getMatrix(this.getChild(i));
                if(objMatrix) {
                    var doc = objMatrix.getXML();
                    if(doc && doc.selectSingleNode("//record")) {
                        this["_cacheData" + panelIds[i]] = doc.cloneDocument();
                    }
                    else {
                        delete this["_cacheData" + panelIds[i]];
                    }
                }
                else {
                    delete this["_cacheData" + panelIds[i]];
                }
            }
            else {
                delete this["_cacheData" + panelIds[i]];
            }
        }
    }

    /**
     * Returns selected record ids of this list
     * @param auxId {String} not used
     *
     * @return {Array<String>}  jsxid attribute of selected record(s), or null if none are selected
     */
    browseview.getSelectedRecordIds = function(auxId) {
        // return an array of the ids of the selected objects, or null if none are selected
        var objPanel = !auxId ? this.getFirstChild() : this.getPanel(auxId);
        var objMatrix = objPanel ? this._getMatrix(objPanel) : null;
        if(objMatrix) {
            return objMatrix.getSelectedIds();
        }
        return null;
    }

    /**
     * Returns the collection of selected records.  These are actual references to the records, not clones.
     *
     * @param auxId {String} not used
     *
     * @return {jsx3.util.List<jsx3.xml.Entity>}  list of selected Entity objects (records), or null if none are selected
     */
    browseview.getSelectedRecords = function(auxId) {
        // return a jsx3.util.List of the records that are selected (not clones)
        var objPanel = !auxId ? this.getFirstChild() : this.getPanel(auxId);
        var objMatrix = objPanel ? this._getMatrix(objPanel) : null;
        if(objMatrix) {
            return objMatrix.getSelectedNodes();
        }
    }

    /**
     * Clears the list selections
     * @param auxId {String} not used
     * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
     *                 initial data state of the list view (what will be reverted back to on a revert action)
     */
    browseview.clearSelectedRecords = function(auxId, bMergeToInitialData) {
        // clear all record selections in the Matrix, and report that the selection has changed
        var objPanel = !auxId ? this.getFirstChild() : this.getPanel(auxId);
        var objMatrix = objPanel ? this._getMatrix(objPanel) : null;
        if(objMatrix) {
            objMatrix.deselectAllRecords();
            this._onSelect({target: objMatrix}, true, true);
            if(bMergeToInitialData) {
                this.markInitialState();
            }
            else {
                this._isDirty = true;
                this.doChange("select");
            }
        }
    }

    /**
     * selects CDF records within the List. Both the view and the data model (CDF) will be updated.  This does not replace the previous selections,
     * but rather adds these to the current selection.
     * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
     * @param auxId {String} not used
     */
    browseview.selectRecords = function(strIds, auxId, bMergeToInitialData) {
        if(typeof strIds == "string") {
            strIds = [strIds];
        }
        // add the provided id(s) to the current selection.  DO NOT clear the previous selection first.  Notify that selection has changed.
        var objPanel = !auxId ? this.getFirstChild() : this.getPanel(auxId);
        var objMatrix = objPanel ? this._getMatrix(objPanel) : null;
        if(objMatrix) {
            for(var i = 0; i < strIds.length; i++) {
                objMatrix.selectRecord(strIds[i]);
            }
            this._onSelect({target: objMatrix}, true, true);
            if(bMergeToInitialData) {
                this.markInitialState();
            }
            else {
                this._isDirty = true;
                this.doChange("select");
            }
            this.updateSelections(this.getPanelIds([])[objPanel.getChildIndex()], objMatrix.getSelectedIds());
        }
    }

    /**
     * deselects CDF records within the List. Both the view and the data model (CDF) will be updated
     * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
     * @param auxId {String} not used
     */
    browseview.deselectRecords = function(strIds, auxId, bMergeToInitialData) {
        // remove the indicated ids from the current selection.  Notify that selection has changed
        var objPanel = !auxId ? this.getFirstChild() : this.getPanel(auxId);
        var objMatrix = objPanel ? this._getMatrix(objPanel) : null;
        if(objMatrix) {
            for(var i = 0; i < strIds.length; i++) {
                objMatrix.deselectRecord(strIds[i]);
            }
            this._onSelect({target: objMatrix}, true, true);
            if(bMergeToInitialData) {
                this.markInitialState();
            }
            else {
                this._isDirty = true;
                this.doChange("select");
            }
            this.updateSelections(this.getPanelIds([])[objPanel.getChildIndex()], objMatrix.getSelectedIds());
        }

    }

    /**
     * Used to notify this accessory that a search query was requested.
     *
     * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
     */
    browseview.searchRequested = function(searchXML) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a view change was performed.
     *
     * @param strNewbrowseviewId {String} - the id of the view that was switched to
     * @param strOldbrowseviewId {String} - the id of the view that was switched away from
     */
    browseview.viewChanged = function(strNewbrowseviewId, strOldbrowseviewId) {
        // can be used to determine when this table list view has come into view, or gone out of view
    }

    /**
     * Used to notify this accessory that an ActionButton action was requested.
     *
     * @param actionId {String} - the id of the action that was requested
     */
    browseview.actionRequested = function(actionId) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a visibility (Hide/Show) change was performed.
     *
     * @param bVisible {boolean} - the current visibility state (<code>true</code> for visible, <code>false</code> for hidden
     */
    browseview.visibilityChanged = function(bVisible) {
        // can be used to determine when this (and all other list views) have been hidden (collpased)
    }

    /**
     * Used to notify this accessory that a data refresh is being requested.
     * Is called before the ListContainer publishes the actual data refresh request.
     *
     * @return {boolean} <code>true</code> to allow the data refresh request, <code>false</code> to veto it.
     */
    browseview.onRefresh = function() {
        //return false if there is any reason this table list view should not be refreshed at this time
        return !this._allowUpdateData();
    }

    /**
     * Used to notify this accessory that a data refresh was requested.
     */
    browseview.refreshRequested = function() {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a columns change was performed.
     *
     * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns now shown in the list
     */
    browseview.columnsChanged = function(arrNewAtts, arrOldAtts) {
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
    browseview.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, auxId) {
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
    browseview.onPageChange = function(intNewPage, intOldPage, intTotalPages) {
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
    browseview.pageChangeRequested = function(intNewPage, intOldPage, intTotalPages) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    /**
     * Used to notify this accessory that a reset is being requested.
     * Is called before the ListContainer performs the actual reset.
     *
     * @return {boolean} <code>true</code> to allow the reset, <code>false</code> to veto it.
     */
    browseview.onReset = function() {
        //return false if there is any reason this table list view should not be reset at this time
        return !this._allowUpdateData();
    }

    /**
     * Used to tell the accessory to reset itself.  Should be implemented by each accessory to reset their own state.
     */
    browseview.reset = function() {
        // reset the table to have no data, and display the default message when the data is null.
        this.setData(null, null, null, this.getPanelIds([])[0], true, false);
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
    browseview.onSelectRecordIds = function(arrRecordIds, auxId) {
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
    browseview.recordsSelected = function(arrRecordIds, auxId, objCaller) {
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
    browseview.setSelectedRecordIds = function(strIds, auxId, bMergeToInitialData) {
        // select these records (and ONLY these records) in the Matrix and report that the selection has changed
        var objPanel = !auxId ? this.getFirstChild() : this.getPanel(auxId);
        var objMatrix = objPanel ? this._getMatrix(objPanel) : null;
        if(objMatrix) {
            objMatrix.deselectAllRecords();
            for(var i = 0; i < strIds.length; i++) {
                objMatrix.selectRecord(strIds[i]);
            }
            this._onSelect({target: objMatrix}, true, true);
            if(bMergeToInitialData) {
                this.markInitialState();
            }
            else {
                this._isDirty = true;
                this.doChange("select");
            }
            this.updateSelections(this.getPanelIds([])[objPanel.getChildIndex()], objMatrix.getSelectedIds());
        }
    }

    browseview.getPanel = function(strAux) {
        return this.getChild(jsx3.util.List.wrap(this.getPanelIds([])).indexOf(strAux));
    };

    browseview.getMatrix = function(strAux) {
        return this._getMatrix(this.getPanel(strAux))
    };

    browseview._getMyPanelId = function(panel) {
        if(panel.getChildIndex) {
            return jsx3.util.List.wrap(this.getPanelIds([])).get(panel.getChildIndex())
        }
        return "";
    };

    browseview._applySelector = function(objPanel, bRepaint) {
        var objM = this._getMatrix(objPanel);
        objM.setSelectionBG(this.complex.imgon);
        if(bRepaint !== false)
            objM.repaintData();
        if(objPanel.getPreviousSibling()) {
            var objPM = this._getMatrix(objPanel.getPreviousSibling());
            objPM.setSelectionBG(this.complex.imgoff);
            if(bRepaint !== false)
                objPM.repaintData();
        }
    };

    browseview._hasTitle = function() {
        return this.panellabels && this.panellabels.length > 0;
    };

    browseview.setPanelWidth = function(intWidth) {
        this.panelwidth = intWidth;
    };

    browseview.getPanelWidth = function(strDefault) {
        return this.panelwidth || strDefault;
    };

    browseview.setNullListMessage = function(strNullListMessage, panelId) {
        panelId = panelId || jsx3.util.List.wrap(this.getPanelIds([])).get(0);
        if(panelId && this.getMatrix(panelId)) {
              var objM = this.getMatrix(panelId);
              if(objM.setNullListMessage) {
                  objM.setNullListMessage(strNullListMessage || null);
                  objM.updateNullListMessageBlock();
              }
        }
    };

    browseview.getLogger = function() {
        return jsx3.util.Logger.getLogger(this.getClass().getName());
    };

    browseview.onSetParent = function(objParent) {
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
