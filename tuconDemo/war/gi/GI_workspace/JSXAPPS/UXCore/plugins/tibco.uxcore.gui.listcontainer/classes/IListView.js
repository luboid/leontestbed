/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

/**
 * TList view interface.
 */
jsx3.lang.Class.defineInterface(
        "tibco.uxcore.gui.IListView",
        null,
        function(LISTVIEW, listview) {

            listview.getListContainer = function() {
                return this.getAncestorOfType(tibco.uxcore.gui.ListContainer);
            }

            /**
             * will publish an array of jsxids of edited records for auto-row tables
             *
             * @param strId {String}  jsxid attribute for the edited CDF record(s)
             * @param strAction {String} enum{edited,deleted,added}
             */
            listview.doEditRecord = function(strId, strAction, entityRecord, strInsertBefore) {
                var allow = true;
              if(tibco.uxcore.gui.ListContainer) {
                var con = this.getListContainer();
                if(con) {
                    allow = con.onEditRecord(strId, strAction, entityRecord, strInsertBefore, this);
                }
              }
                return allow;
            };

            /**
             * Will publish an array of selected jsxids and an auxiliary object
             *
             * @param strId {String | Array<String>} jsxid attribute of slected CDF record(s)
             * @param auxId {Object} an Auxiliary object
             */
            listview.doSelectRecordIds = function(strIds, auxId) {
                var allow = true;
                var con = this.getListContainer();
                if(con) {
                    allow = con.onSelectRecordIds(strIds, auxId, this);
                }
                return allow;
            }

            /**
             * Will notify the parent ListContainer if there is a change in state
             */
            listview.doChange = function(type) {
                var con = this.getListContainer();
                if(con) {
                    con.onChange(type);
                }
            }

            /**
             * Sets the value of this list. Deselects all existing selections. Scrolls the first record into view.
             * @param strId {String | Array<String>}  jsxid attribute for the CDF record(s) to select
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to set selection on
             * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            listview.setSelectedRecordIds = jsx3.lang.Method.newAbstract("strIds", "auxId", "bMergeToInitialData");

            /**
             * Returns resolved url to list view icon
             *
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to get selected record ids for
             *
             * @return {Array<String>} - jsxid attribute of selected record(s), or null if none are selected
             */
            listview.getSelectedRecordIds = jsx3.lang.Method.newAbstract("auxId");

            /**
             * selects CDF records within the List. Both the view and the data model (CDF) will be updated.  This does not replace the previous selections,
             * but rather adds these to the current selection.
             * @param strId {String | Array<String>} jsxid attribute for the CDF record(s) to select
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to select records in
             * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            listview.selectRecords = jsx3.lang.Method.newAbstract("strId", "auxId", "bMergeToInitialData");

            /**
             * deselects CDF records within the List. Both the view and the data model (CDF) will be updated
             * @param strId {String | Array<String>}  jsxid attribute for the CDF record(s) to select
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to deselect records in
             * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            listview.deselectRecords = jsx3.lang.Method.newAbstract("strId", "auxId", "bMergeToInitialData");

            /**
             * Returns the collection of selected records.  These are actual references to the records, not clones.
             *
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to get selected records for
             *
             * @return {jsx3.util.List<jsx3.xml.Entity>}  list of selected Entity objects (records), or null if none are selected
             */
            listview.getSelectedRecords = jsx3.lang.Method.newAbstract("auxId");

            /**
             * Clears the list selections
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to be cleared
             * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            listview.clearSelectedRecords = jsx3.lang.Method.newAbstract("auxId", "bMergeToInitialState");

            /**
             * Clears CDF document from this object
             * @param strId {String} This parameter is used for brows type.
             *                 Specifies the browse component to be cleared
             * @param bMergeToInitialData {boolean} when not set to 'false' (default is 'true'), a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            listview.clearData = jsx3.lang.Method.newAbstract("auxId", "bMergeToInitialState");

            /**
             * Sets CDF document of this object.
             * @param cdf {jsx3.xml.CDF.Document} - the cdf data.
             * @param intCurrentPage {int} - the page number of the data, with respect to the whole data set
             * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
             * @param auxId {String} This parameter is used for browse type.
             *                 Specifies the browse component id that this cdf blongs to
             * @param bMergeToInitialData {boolean} when not set to 'false' (default is 'true'), a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            listview.setData = jsx3.lang.Method.newAbstract("cdf", "intCurrentPage", "intTotalPages", "auxId", "bMergeToInitialData");

            /**
             * Gets CDF document of this object.
             * @param auxId {String} This parameter is used for browse type.
             *                 Specifies the browse component id that this cdf blongs to
             */
            listview.getData = jsx3.lang.Method.newAbstract("auxId");

            /**
             * reverts changes
             */
            listview.revert = jsx3.lang.Method.newAbstract();

            /**
             * Returns resolved url to list view icon (used in the ViewButton for this ListView)
             * @return {String}
             */
            listview.getIcon = jsx3.lang.Method.newAbstract();

            listview._getCacheData = function(auxId) {
                return this._cacheData;
            }

            listview.isDirty = function() {
                return !tibco.uxcore.util.MatrixHelper.isCDFDataEqual(this._getCacheData(),this.getData(),["jsxdisabled","jsxopen","isModified","isNewRecord"],false,true);
            }
        });