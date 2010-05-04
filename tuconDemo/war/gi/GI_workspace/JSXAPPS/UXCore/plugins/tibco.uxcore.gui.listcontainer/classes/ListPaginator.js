/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */


//jsx3.require("tibco.uxcore.gui.AbstractBlock");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.ListPaginator", tibco.uxcore.gui.AbstractBlock, [tibco.uxcore.gui.IListAccessory],
function(PAGINATOR, paginator){

    /* The follow code update by Kenna and Sean */
    paginator.intTotalPageNumber = 100;
    paginator.currentPageNumber = 1;

    //default width of page number textbox
    paginator.jsxtextwidth = 40;
    paginator.jsxcontrolVeto = true;
    paginator._jsxisWorking = false;

    paginator.init = function(strName){
        this.jsxsuper(strName);
        this.loadDefaultProperty();
    };

    paginator.onAfterAssemble = function(objParent, objServer) {
        //this.getLogger().info("enter onAfterAssemble...........");
        this.loadDefaultProperty();
        return this.jsxsuper(objParent, objServer);
    };

    paginator.loadDefaultProperty = function() {
        this.complex = {};
        this.complex.jsxFirstImg     = this.getDynamicURL("@uxcore10@paginator@fristImg");
        this.complex.jsxLastImg      = this.getDynamicURL("@uxcore10@paginator@lastImg");
        this.complex.jsxNextImg      = this.getDynamicURL("@uxcore10@paginator@nextImg");
        this.complex.jsxBackImg      = this.getDynamicURL("@uxcore10@paginator@backImg");
        this.complex.jsxFirstImgDown = this.getDynamicURL("@uxcore10@paginator@fristImgDown");
        this.complex.jsxLastImgDown  = this.getDynamicURL("@uxcore10@paginator@lastImgDown");
        this.complex.jsxNextImgDown  = this.getDynamicURL("@uxcore10@paginator@nextImgDown");
        this.complex.jsxBackImgDown  = this.getDynamicURL("@uxcore10@paginator@backImgDown");

        this.complex.jsxButtonSytle  = this.getDynamicValue("@uxcore10@pagenation@buttonSytle");

        this.complex.jsxFirstTip     = this.getDynamicValue("@uxcore10@pagenation@fristTip");
        this.complex.jsxBackTip      = this.getDynamicValue("@uxcore10@pagenation@backTip");
        this.complex.jsxNextTip      = this.getDynamicValue("@uxcore10@pagenation@nextTip");
        this.complex.jsxLastTip      = this.getDynamicValue("@uxcore10@pagenation@lastTip");

        this.complex.jsxPageCaption  = this.getDynamicValue("@uxcore10@pagenation@pageCaption");
    };

    paginator.onSetParent = function(objParent) {
        var ret = this.jsxsuper(objParent);
        if(!objParent.instanceOf("tibco.uxcore.gui.ListContainer")) {
            ret = false;
        }
        this.listContainer = objParent;
        if(!ret && jsx3.IDE) {
            this.getLogger().warn("Building Error: Only ListContainer is valid parent of ListPaginator");
        }
        return ret;
    };

    paginator.getTotalPageCaption = function() {
        if(!this._jsxtotalPageCaption){
            this._jsxtotalPageCaption = this.getDynamicValue("@uxcore10@pagenation@totalPageCaption",this.intTotalPageNumber);
        }
        return this._jsxtotalPageCaption;
    };

    paginator.setCurrentPageNumber = function(value){
        if(value<1) value = 1;
        if(value>this.intTotalPageNumber) value = this.intTotalPageNumber;
        this.currentPageNumber = value;
    };

    paginator.getCurrentPageNumber = function() {
        return this.currentPageNumber;
    };

    paginator.onclick = function(objEvent,objGUI) {
        var strFun = "to" + objGUI.getAttribute("jsxtype").replace("button", "");
        if(this[strFun]) this[strFun]();
    };

    paginator.onmousedown = function(objEvent,objGUI) {
        var imageSrc = "jsx" + objGUI.getAttribute("jsxtype").replace("button", "ImgDown");
        if(this.complex[imageSrc]) objGUI.src = this.complex[imageSrc];
    }

    paginator.onmouseup = function(objEvent,objGUI) {
        var imageSrc = "jsx" + objGUI.getAttribute("jsxtype").replace("button", "Img");
        if(this.complex[imageSrc]) objGUI.src = this.complex[imageSrc];
    };

    paginator.onkeydown = function(objEvent, objGUI) {
        this._inputCheck(objEvent, objGUI);
    };

    paginator._inputCheck = function(e, o) {
        if(e.tabKey() || e.isArrowKey() || e.backspaceKey() || e.deleteKey() || e.escapeKey() || e.endKey() || e.homeKey()) {
            return;
        } else if(e.enterKey()) {
            this.jumpTo(o.value, o);
        } else if(e.keyCode()<jsx3.gui.Event.KEY_0 || e.keyCode()>jsx3.gui.Event.KEY_9 || e.shiftKey()){
            e.cancelKey();
        }
    };

    paginator.toFirst = function() {
        var intNewPage = 1;
        var intOldPage = this.currentPageNumber;
        var intTotalPages = this.intTotalPageNumber;
        if(intNewPage == intOldPage){
            return;
        }
        if(this.listContainer){
           this.listContainer.onPageChange(intNewPage, intOldPage, intTotalPages);
        }
    };

    paginator.toBack = function() {
        var page = this.currentPageNumber;
        var intTotalPages = this.intTotalPageNumber;
        if(page == 1){
            return;
        }
        if(this.listContainer){
           this.listContainer.onPageChange(page-1, page, intTotalPages);
        }
    };

    paginator.toNext = function() {
        var page = this.currentPageNumber;
        var intTotalPages = this.intTotalPageNumber;
        if(page == intTotalPages){
            return;
        }
        if(this.listContainer){
            this.listContainer.onPageChange(page+1, page, intTotalPages);
        }
    };

    paginator.toLast = function() {
        var intNewPage = this.intTotalPageNumber;
        var intOldPage = this.currentPageNumber;
        var intTotalPages = this.intTotalPageNumber;
        if(intNewPage == intOldPage){
            return;
        }
        if(this.listContainer){
            this.listContainer.onPageChange(intNewPage, intOldPage, intTotalPages);
        }
    };

    paginator.jumpTo = function(intNewPage, o) {
        var intOldPage = this.currentPageNumber;
        var intTotalPages = this.intTotalPageNumber;
        if(isNaN(intNewPage)) intNewPage = 1;
        if(parseInt(intNewPage,10)>intTotalPages) intNewPage = intTotalPages;
        if(parseInt(intNewPage, 10) <=0) intNewPage = 1;
        o.value = intNewPage;
        if(intNewPage == intOldPage){
           return;
        }
        if(this.listContainer){
            this.listContainer.onPageChange(intNewPage, intOldPage, intTotalPages);
        }
    };

    /**
     * sets the total page number.
     * @param intTotalPageNumber {int}
     */
    paginator.setTotalPages = function(intTotalPageNumber){
        this.intTotalPageNumber = intTotalPageNumber;
        this._jsxtotalPageCaption = this.getDynamicValue("@uxcore10@pagenation@totalPageCaption",intTotalPageNumber);
    };

    /**
     * returns the total page number.
     * @return {int}
     */
    paginator.getTotalPages = function(){
        return this.intTotalPageNumber;
    };

    /**
     * Sets width of page number inputBox
     * @param width {Integer} the width to be setted
     * @param bUpdateView {Boolean} <code>true</code to update view
     */
    paginator.setTextWidth = function(width, bUpdateView) {
        this.jsxtextwidth = width;
        this.syncProperty("jsxtextwidth",bUpdateView == true);
        return this;
    };

    /**
     * Gets width of number input box
     */
    paginator.getTextWidth = function() {
        return this.jsxtextwidth;
    };

    paginator.setControlVeto = function(value){
        this.jsxcontrolVeto = value;
    };

    paginator.getControlVeto = function() {
        return this.jsxcontrolVeto;
    };

    paginator.loadTemplate("pagination");

    /* IListAccessory Interface Part------------------------------------------*/

    paginator.recordEdited = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
        // do nothing...empty implementation to comply with IListAccessoryInterface
    }

    paginator.onPageChange = function(intNewPage, intOldPage, intTotalPages){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.pageChangeRequested = function(intNewPage, intOldPage, intTotalPages){
        this._jsxisWorking = true;
        return true;
    };

    paginator.onDataChange = function(dataCDF, intCurrentPage, intTotalPages, strId){
        return true;
    };

    paginator.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, strId){
        this._jsxisWorking = false;
        this.setTotalPages(intTotalPages);   // by kenna
        this.setCurrentPageNumber(intCurrentPage);
        this.syncProperty(["currentPageNumber","allPageNumber"], true);
    };

    paginator.onReset = function(){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.reset = function(){
    };

    paginator.onSearch = function(searchXML){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.searchRequested = function(searchXML){
    };

    paginator.onViewChange = function(strNewListViewId, strOldListViewId){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.viewChanged = function(strNewListViewId, strOldListViewId){
    };

    paginator.onAction = function(actionId){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.actionRequested = function(actionId){
    };

    paginator.onVisibilityChange = function(bVisible){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.visibilityChanged = function(bVisible){
    };

    paginator.onRefresh = function(){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.refreshRequested = function(){
    };

    paginator.onColumnsChange = function(arrNewAtts, arrOldAtts){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.columnsChanged = function(arrNewAtts, arrOldAtts){
    };

    paginator.onSelectRecordIds = function(arrRecordIds){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.recordsSelected = function(arrRecordIds){
    };

    paginator.onClearSelectedRecordIds = function(){
        return (!this.jsxcontrolVeto || !this._jsxisWorking);
    };

    paginator.selectionCleared = function(){
    };

});
