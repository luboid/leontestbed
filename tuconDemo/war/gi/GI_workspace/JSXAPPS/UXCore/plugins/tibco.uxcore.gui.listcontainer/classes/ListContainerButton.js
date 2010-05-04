/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn) {

//jsx3.require("tibco.uxcore.gui.Button");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.ListContainerButton",
        tibco.uxcore.gui.Button, [tibco.uxcore.gui.IListAccessory],
        function(BUTTON, button) {

            /*
            * instance initializer
            * @param strName {String} ?unique name distinguishing this object from all other JSX GUI objects in the JSX application
            * @param intWidth {int} ?width (in pixels) of the object; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
            * @param strText {String} ?text to display in the given button; if null JSXTABLEHEADERCELL.DEFAULTTEXT is used
            */
            button.init = function(strName,a,b,c,d) {
                this.jsxsuper(strName,a,b,c,d);
                //this.setHeight(BUTTON.DEFAULTHEIGHT)
                if(this.setDefaultStyle) this.setDefaultStyle();
            };

            button.recordEdited = function(strRecordId, strAction, entityRecordNode, strInsertBefore, objCaller) {
                // do nothing...empty implementation to comply with IListAccessoryInterface
            }

            button.getLogger = function() {
                return jsx3.util.Logger.getLogger(this.getClass().getName());
            };

            button.onAfterAssemble = function() {
                this.jsxsuper();
                if(this.setDefaultStyle) this.setDefaultStyle();
            };

            button.setDefaultStyle = function() {
            };

            /**
             * Used to notify this button that a search query is being requested.
             * Is called before the ListContainer publishes the actual search request.
             *
             * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
             *
             * @return {boolean} <code>true</code> to allow the search request, <code>false</code> to veto it.
             */
            button.onSearch = function(searchXML) {
                return true;
            };

            /**
             * Used to notify this button that a search query was requested.
             *
             * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
             */
            button.searchRequested = function(searchXML){

            };

            /**
             * Used to notify this button that a view change is being requested.
             * Is called before the ListContainer performs the view change.
             *
             * @param strNewListViewId {String} - the id of the view being switched to
             * @param strOldListViewId {String} - the id of the view being switched away from
             *
             * @return {boolean} <code>true</code> to allow the view change, <code>false</code> to veto it.
             */
            button.onViewChange = function(strNewListViewId, strOldListViewId) {
                return true;
            };

            /**
             * Used to notify this button that a view change was performed.
             *
             * @param strNewListViewId {String} - the id of the view that was switched to
             * @param strOldListViewId {String} - the id of the view that was switched away from
             */
            button.viewChanged = function(strNewListViewId, strOldListViewId) {

            };

            /**
             * Used to notify this button that an ActionButton action is being requested.
             * Is called before the ListContainer publishes the actual action request.
             *
             * @param actionId {String} - the id of the action being requested
             *
             * @return {boolean} <code>true</code> to allow the action request, <code>false</code> to veto it.
             */
            button.onAction = function(actionId) {
                return true;
            };

            /**
             * Used to notify this button that an ActionButton action was requested.
             *
             * @param actionId {String} - the id of the action that was requested
             */
            button.actionRequested = function(actionId){

            };

            /**
             * Used to notify this button that a visibility (Hide/Show) change is being requested.
             * Is called before the ListContainer performs the actual visibility change.
             *
             * @param bVisible {boolean} - the visibility state to be set (<code>true</code> for visible, <code>false</code> for hidden
             *
             * @return {boolean} <code>true</code> to allow the visibility change, <code>false</code> to veto it.
             */
            button.onVisibilityChange = function(bVisible) {
                return true;
            };

            /**
             * Used to notify this button that a visibility (Hide/Show) change was performed.
             *
             * @param bVisible {boolean} - the current visibility state (<code>true</code> for visible, <code>false</code> for hidden
             */
            button.visibilityChanged = function(bVisible){

            };

            /**
             * Used to notify this button that a data refresh is being requested.
             * Is called before the ListContainer publishes the actual data refresh request.
             *
             * @return {boolean} <code>true</code> to allow the data refresh request, <code>false</code> to veto it.
             */
            button.onRefresh = function() {
                return true;
            };

            /**
             * Used to notify this button that a data refresh was requested.
             */
            button.refreshRequested = function(){

            };

            /**
             * Used to notify this button that a columns change is being requested.
             * Is called before the ListContainer performs the actual columns change.
             *
             * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns to be shown in the list
             *
             * @return {boolean} <code>true</code> to allow the columns change, <code>false</code> to veto it.
             */
            button.onColumnsChange = function(arrNewAtts, arrOldAtts) {
                return true;
            };

            /**
             * Used to notify this button that a columns change was performed.
             *
             * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns now shown in the list
             */
            button.columnsChanged = function(arrNewAtts, arrOldAtts){

            };

            /**
             * Used to notify this button that a data change is being requested.
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
            button.onDataChange = function(dataCDF, intCurrentPage, intTotalPages, strId) {
                return true;
            };

            /**
             * Used to notify this button that a data change was performed.
             *
             * @param dataCDF {jsx3.xml.CDF.Document} - the CDF document of new data, null indicates data was cleared,
             *        while empty document indicates query returned no results.
             * @param intCurrentPage {int} - the page number of the data, with respect to the whole data set
             * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
             * @param strId {String} - and auxilliary id for the target of the data
             */
            button.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, strId){

            };

            /**
             * Used to notify this button that a page change is being requested.
             * Is called before the ListContainer publishes the actual page change request.
             *
             * @param intNewPage {int} - the page to change to
             * @param intOldPage {int} - the page being changed from (or 0 if no previous page was set)
             * @param intTotalPages {int} - the total number of pages in the data set
             *
             * @return {boolean} <code>true</code> to allow the page change request, <code>false</code> to veto it.
             */
            button.onPageChange = function(intNewPage, intOldPage, intTotalPages) {
                return true;
            };

            /**
             * Used to notify this button that a page change was requested.
             *
             * @param intNewPage {int} - the page to change to
             * @param intOldPage {int} - the page being changed from (or 0 if no previous page was set)
             * @param intTotalPages {int} - the total number of pages in the data set
             */
            button.pageChangeRequested = function(intNewPage, intOldPage, intTotalPages){

            };

            /**
             * Used to notify this button that a reset is being requested.
             * Is called before the ListContainer performs the actual reset.
             *
             * @return {boolean} <code>true</code> to allow the reset, <code>false</code> to veto it.
             */
            button.onReset = function() {
                return true;
            };

            /**
             * Used to tell the button to reset itself.  Should be implemented by each button to reset their own state.
             */
            button.reset = function(){

            };

            /**
             * Used to notify this button that a record selection change is being requested.
             * Is called before the ListContainer performs the actual record selection change.
             *
             * @param arrRecordIds {Array} - array of the jsxids of the records to be selected
             *
             * @return {boolean} <code>true</code> to allow the record selection change, <code>false</code> to veto it.
             */
            button.onSelectRecordIds = function(arrRecordIds) {
                return true;
            };

            /**
             * Used to notify this button that a record selection change was performed.
             *
             * @param arrRecordIds {Array} - array of the jsxids of the records that are currently selected in the list.
             * This could be the same as the record ids in the <code>onSelectRecordIds</code> function, or it could be different,
             * depending on whether the selection event added to the existing selection, or replaced it.
             */
            button.recordsSelected = function(arrRecordIds){

            };

            /**
             * Used to notify this button that a clear of selection is being requested.
             * Is called before the ListContainer performs the actual clear of the selection.
             *
             * @return {boolean} <code>true</code> to allow the clear of selection, <code>false</code> to veto it.
             */
            button.onClearSelectedRecordIds = function() {
                return true;
            };

            /**
             * Used to notify this button that list selection was cleared.
             */
            button.selectionCleared = function(){

            };

            button.onSetParent = function(objParent) {
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

})(this);