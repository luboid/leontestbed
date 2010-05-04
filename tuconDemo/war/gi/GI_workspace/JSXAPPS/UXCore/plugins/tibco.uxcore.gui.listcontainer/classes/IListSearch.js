/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

/**
 * Interface for all Search component contained in ListContainer, such as FilterSearch, SimpleSearch and AdvancedSearch
 */
jsx3.lang.Class.defineInterface("tibco.uxcore.gui.IListSearch", null,
    function(SEARCH, search) {
        
        /**
         * Set id for search object.
         *
         * @param strId {String} the string id to be setted
         */
        search.setSearchId = function(strId) {
            this.jsxsearchid = strId;
        }

        /**
         * Gets id from search object.
         * @return {String} the id of this search object
         */
        search.getSearchId = function() {
            return this.jsxsearchid;
        }
        
        /*
         * Utility function to get the parent ListContainer of this search gui object.
         *
         * @return {tibco.uxcore.gui.ListContainer} - the parent ListContainer of this search gui object
         */
        search.getListContainer = function() {
            return this.getAncestorOfType("tibco.uxcore.gui.ListContainer");
        }

        /*
         * To be called whenever the currrently selected/created search should be applied to the List gui.
         */
        search.executeSearch = function() {
            var query = this.buildQuery();
            this.getListContainer().onSearch(query);
        }

        search.getSearchXML = function() {
            return this.buildQuery();
        }

        /*
         * Build the search definition XML document.
         *
         * @return {jsx3.xml.Document} - the search definition document.
         */
        search.buildQuery = jsx3.lang.Method.newAbstract();

        /*
         * Set the attribute(s) this search is intended to be used for.
         *
         * @param strAttributes {String | Array<String>} - The name or Array of names of the attribute(s) this search is intended to be used for.
         */
        search.setAttributes = jsx3.lang.Method.newAbstract("strAttributes");

        /*
         * Set the cdf document to be used to populate any Select list used in this GUI object.
         *
         * @param cdf {jsx3.xml.CDF.Document} - the cdf document used to set the Select list.
         */
        search.setListCDF = jsx3.lang.Method.newAbstract("cdf");
    }
);