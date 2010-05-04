/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

jsx3.lang.Class.defineInterface("tibco.uxcore.gui.IListAccessory", null,
    function(ACCESSORY, accessory) {

        /*
         * Utility function to get the parent ListContainer of this search gui object.
         *
         * @return {tibco.uxcore.gui.ListContainer} - the parent ListContainer of this search gui object
         */
        accessory.getListContainer = function() {
            return this.getAncestorOfType("tibco.uxcore.gui.ListContainer");
        }

        accessory.onEditRecord = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
            return true;
        }

        accessory.recordEdited = jsx3.lang.Method.newAbstract("strRecordId","strAction","entityRecord","strInsertBefore","objCaller");

        /**
         * Used to notify this accessory that a record selection change is being requested.
         * Is called before the ListContainer performs the actual record selection change.
         *
         * @param arrRecordIds {Array} - array of the jsxids of the records to be selected.  This should represent the
         * final set of selected Ids, not just those to be added to selection
         * @param auxId {Object} an Auxiliary object Id
         * @return {boolean} <code>true</code> to allow the record selection change, <code>false</code> to veto it.
         */
        accessory.onSelectRecordIds = function(arrRecordIds, auxId, objCaller) {
            return true;
        }

        /**
         * Used to notify this accessory that a record selection change was performed.
         *
         * @param arrRecordIds {Array} - array of the jsxids of the records that are currently selected in the list.
         * This could be the same as the record ids in the <code>onSelectRecordIds</code> function, or it could be different,
         * depending on whether the selection event added to the existing selection, or replaced it.
         * @param auxId {Object} an Auxiliary object Id
         */
        accessory.recordsSelected = jsx3.lang.Method.newAbstract("arrRecordIds", "auxId", "objCaller");

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
        accessory.onDataChange = function(dataCDF, intCurrentPage, intTotalPages, strId) {
            return true;
        }

        /**
         * Used to notify this accessory that a data change was performed.++
         *
         * @param dataCDF {jsx3.xml.CDF.Document} - the CDF document of new data, null indicates data was cleared,
         *        while empty document indicates query returned no results.
         * @param intCurrentPage {int} - the page number of the data, with respect to the whole data set
         * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
         * @param strId {String} - and auxilliary id for the target of the data
         */
        accessory.dataChanged = jsx3.lang.Method.newAbstract('dataCDF', 'intCurrentPage', 'intTotalPages', 'strId');

        /**
         * Used to notify this accessory that a search query is being requested.
         * Is called before the ListContainer publishes the actual search request.
         *
         * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
         *
         * @return {boolean} <code>true</code> to allow the search request, <code>false</code> to veto it.
         */
        accessory.onSearch = function(searchXML) {
            return true;
        }

        /**
         * Used to notify this accessory that a search query was requested.
         *
         * @param searchXML {jsx3.xml.Document} - The XML representation of the search criteria to be applied to the query.
         */
        accessory.searchRequested = jsx3.lang.Method.newAbstract('searchXML');

        /**
         * Used to notify this accessory that a view change is being requested.
         * Is called before the ListContainer performs the view change.
         *
         * @param strNewListViewId {String} - the id of the view being switched to
         * @param strOldListViewId {String} - the id of the view being switched away from
         *
         * @return {boolean} <code>true</code> to allow the view change, <code>false</code> to veto it.
         */
        accessory.onViewChange = function(strNewListViewId, strOldListViewId) {
            return true;
        }

        /**
         * Used to notify this accessory that a view change was performed.
         *
         * @param strNewListViewId {String} - the id of the view that was switched to
         * @param strOldListViewId {String} - the id of the view that was switched away from
         */
        accessory.viewChanged = jsx3.lang.Method.newAbstract('strNewListViewId', 'strOldListViewId');

        /**
         * Used to notify this accessory that an ActionButton action is being requested.
         * Is called before the ListContainer publishes the actual action request.
         *
         * @param actionId {String} - the id of the action being requested
         *
         * @return {boolean} <code>true</code> to allow the action request, <code>false</code> to veto it.
         */
        accessory.onAction = function(actionId) {
            return true;
        }

        /**
         * Used to notify this accessory that an ActionButton action was requested.
         *
         * @param actionId {String} - the id of the action that was requested
         */
        accessory.actionRequested = jsx3.lang.Method.newAbstract('actionId');

        /**
         * Used to notify this accessory that a visibility (Hide/Show) change is being requested.
         * Is called before the ListContainer performs the actual visibility change.
         *
         * @param bVisible {boolean} - the visibility state to be set (<code>true</code> for visible, <code>false</code> for hidden
         *
         * @return {boolean} <code>true</code> to allow the visibility change, <code>false</code> to veto it.
         */
        accessory.onVisibilityChange = function(bVisible) {
            return true;
        }

        /**
         * Used to notify this accessory that a visibility (Hide/Show) change was performed.
         *
         * @param bVisible {boolean} - the current visibility state (<code>true</code> for visible, <code>false</code> for hidden
         */
        accessory.visibilityChanged = jsx3.lang.Method.newAbstract('bVisible');

        /**
         * Used to notify this accessory that a data refresh is being requested.
         * Is called before the ListContainer publishes the actual data refresh request.
         *
         * @return {boolean} <code>true</code> to allow the data refresh request, <code>false</code> to veto it.
         */
        accessory.onRefresh = function() {
            return true;
        }

        /**
         * Used to notify this accessory that a data refresh was requested.
         */
        accessory.refreshRequested = jsx3.lang.Method.newAbstract();

        /**
         * Used to notify this accessory that a columns change is being requested.
         * Is called before the ListContainer performs the actual columns change.
         *
         * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns to be shown in the list
         *
         * @return {boolean} <code>true</code> to allow the columns change, <code>false</code> to veto it.
         */
        accessory.onColumnsChange = function(arrNewAtts, arrOldAtts) {
            return true;
        }

        /**
         * Used to notify this accessory that a columns change was performed.
         *
         * @param arrNewAtts {Array} - array of Strings representing the jsxattribute names for the columns now shown in the list
         */
        accessory.columnsChanged = jsx3.lang.Method.newAbstract('arrNewAtts', 'arrOldAtts');

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
        accessory.onPageChange = function(intNewPage, intOldPage, intTotalPages) {
            return true;
        }

        /**
         * Used to notify this accessory that a page change was requested.
         *
         * @param intNewPage {int} - the page to change to
         * @param intOldPage {int} - the page being changed from (or 0 if no previous page was set)
         * @param intTotalPages {int} - the total number of pages in the data set
         */
        accessory.pageChangeRequested = jsx3.lang.Method.newAbstract('intNewPage', 'intOldPage', 'intTotalPages');

        /**
         * Used to notify this accessory that a reset is being requested.
         * Is called before the ListContainer performs the actual reset.
         *
         * @return {boolean} <code>true</code> to allow the reset, <code>false</code> to veto it.
         */
        accessory.onReset = function() {
            return true;
        }

        /**
         * Used to tell the accessory to reset itself.  Should be implemented by each accessory to reset their own state.
         */
        accessory.reset = jsx3.lang.Method.newAbstract();

        accessory.editModeChanged = function(isEditMode) {
            // do nothing
        }

        accessory.modelChanged = function(intModel) {
            // do nothing
        }

        accessory.canSortChanged = function(bCanSort) {
            // do nothing
        }
    }
);