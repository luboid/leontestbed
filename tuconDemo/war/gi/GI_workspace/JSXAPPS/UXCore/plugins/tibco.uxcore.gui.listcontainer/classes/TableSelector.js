(function(plugIn) {

    //jsx3.require("jsx3.gui.Template", "jsx3.gui.CheckBox", "jsx3.gui.RadioButton", "jsx3.gui.Matrix.Column");

    jsx3.lang.Class.defineClass("tibco.uxcore.gui.TableSelector", tibco.uxcore.gui.GenericTableView, null,
            function(SELECTOR, selector) {

                SELECTOR.MULTI_SELECTION = 1;
                SELECTOR.SINGLE_SELECTION = 0;

                SELECTOR.HIDECOLUMN = 1;
                SELECTOR.SHOWCOLUMN = 0;

                SELECTOR.ATTR_CHECKBOX_COLUMN = "jsxchecked";
                SELECTOR.HEAD_HTML_CHECKED = "<input checked type=\"checkbox\" onclick=\"jsx3.html.getJSXParent(this).getAncestorOfType('tibco.uxcore.gui.TableSelector').doToggleAllRecords(this.checked);\" style=\"" + (jsx3.CLASS_LOADER.FX ? "margin:1px 0px 0px 4px;" : "margin:-2px 0px 0px -1px;")  +"\"/>";
                SELECTOR.HEAD_HTML_UNCHECKED = "<input type=\"checkbox\" onclick=\"jsx3.html.getJSXParent(this).getAncestorOfType('tibco.uxcore.gui.TableSelector').doToggleAllRecords(this.checked);\" style=\"" + (jsx3.CLASS_LOADER.FX ? "margin:1px 0px 0px 4px;" : "margin:-2px 0px 0px -1px;") + "\"/>";

                SELECTOR.FILTERXSL = '<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"><xsl:template match="data"><xsl:copy><xsl:copy-of select="@*"/><xsl:apply-templates select="record[@jsxchecked=\'1\']"/></xsl:copy></xsl:template><xsl:template match="record"><xsl:copy-of select="."/></xsl:template></xsl:stylesheet>';

                SELECTOR.FITERXSLCACHEID = "tibco.uxcore.gui.TableSelector.FILTERXSLCACHE";

                SELECTOR.FITERXSLOBJ = (new jsx3.xml.XslDocument()).loadXML(SELECTOR.FILTERXSL);
                plugIn.getServer().getCache().setDocument("tibco.uxcore.gui.TableSelector.FILTERXSLCACHE", SELECTOR.FITERXSLOBJ);

                selector._editMode = tibco.uxcore.gui.GenericTableView.NORMAL_MODE;
                selector.jsxhidecheckcolumn = SELECTOR.HIDECOLUMN;
                selector.jsxselectiontype = SELECTOR.MULTI_SELECTION;

                /**
                 * instance initializer
                 * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
                 */
                selector.init = function(strName) {
                    this.jsxsuper(strName);
                    this._ensureIntegrity();
                };

                selector.onAfterAttach = function() {
                    this.jsxsuper();
                    this._ensureIntegrity();
                };

                selector.recordEdited = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
                    // do nothing
                }

                /**
                 * Clears the list selections
                 * @param auxId {String} not used
                 * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
                 *                 initial data state of the list view (what will be reverted back to on a revert action)
                 */
                selector.clearSelectedRecords = function(auxId, bMergeToInitialData) {
                    // clear all record selections in the Matrix, and report that the selection has changed
                    if(!this.isEditMode()) {
                        this.setEditMode(true);
                        this.uncheckAllRecords();
                        this.setEditMode(false, true);
                        this._handleMerge(bMergeToInitialData,"select");
                    }
                    else {
                        this.uncheckAllRecords();
                        this._handleMerge(bMergeToInitialData,"select");
                    }
                }

                /**
                 * Sets the value of this list. Deselects all existing selections. Scrolls the first record into view.
                 * @param strId {String | Array<String>} jsxid attribute for the CDF record(s) to select
                 * @param auxId {String} not used
                 */
                selector.setSelectedRecordIds = function(strIds, auxId, bMergeToInitialData) {
                    // select these records (and ONLY these records) in the Matrix and report that the selection has changed
                    if(!this.isEditMode()) {
                        this.setEditMode(true);
                        this.clearSelectedRecords(auxId);
                        this.selectRecords(strIds, auxId);
                        this._handleMerge(bMergeToInitialData,"select");
                        this.setEditMode(false, true);
                    }
                    else {
                        this.clearSelectedRecords(auxId);
                        this.selectRecords(strIds, auxId);
                        this._handleMerge(bMergeToInitialData,"select");
                    }
                }

                /**
                 * Returns selected record ids of this list
                 * @param auxId {String} not used
                 *
                 * @return {Array<String>}  jsxid attribute of selected record(s), or null if none are selected
                 */
                selector.getSelectedRecordIds = function(auxId) {
                    // return an array of the ids of the selected objects, or null if none are selected
                    return this.getCheckedRecordIds();
                }

                /**
                 * Returns the collection of selected records.  These are actual references to the records, not clones.
                 *
                 * @param auxId {String} not used
                 *
                 * @return {jsx3.util.List<jsx3.xml.Entity>}  list of selected Entity objects (records), or null if none are selected
                 */
                selector.getSelectedRecords = function(auxId) {
                    // return a jsx3.util.List of the records that are selected (not clones)
                    return new jsx3.util.List(this.getCheckedRecords());
                }

                /**
                 * selects CDF records within the List. Both the view and the data model (CDF) will be updated.  This does not replace the previous selections,
                 * but rather adds these to the current selection.
                 * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
                 * @param auxId {String} not used
                 */
                selector.selectRecords = function(strIds, auxId, bMergeToInitialData) {
                    if((this.getSelectionType() == SELECTOR.SINGLE_SELECTION) && (typeof strIds != "string")) {
                        this.clearSelectedRecords(auxId);
                        strIds = [strIds[strIds.length - 1]];
                    }
            // add the provided id(s) to the current selection.  DO NOT clear the previous selection first.  Notify that selection has changed.
                    if(!this.isEditMode()) {
                        this.setEditMode(true);
                        if(strIds instanceof String) {
                            strIds = [strIds];
                        }
                        this.checkRecords(strIds);
                        this._handleMerge(bMergeToInitialData,"select");
                        this.setEditMode(false, true);
                    }
                    else {
                        if(strIds instanceof String) {
                            strIds = [strIds];
                        }
                        this.checkRecords(strIds);
                        this._handleMerge(bMergeToInitialData,"select");
                    }
                }

                /**
                 * deselects CDF records within the List. Both the view and the data model (CDF) will be updated
                 * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
                 * @param auxId {String} not used
                 */
                selector.deselectRecords = function(strIds, auxId, bMergeToInitialData) {
                    // remove the indicated ids from the current selection.  Notify that selection has changed
                    if(!this.isEditMode()) {
                        this.setEditMode(true);
                        if(strIds instanceof String) {
                            strIds = [strIds];
                        }
                        this.uncheckRecords(strIds);
                        this._handleMerge(bMergeToInitialData,"select");
                        this.setEditMode(false, true);
                    }
                    else {
                        if(strIds instanceof String) {
                            strIds = [strIds];
                        }
                        this.uncheckRecords(strIds);
                        this._handleMerge(bMergeToInitialData,"select");
                    }
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
                selector.onPageChange = function(intNewPage, intOldPage, intTotalPages) {
                    return false;
                }

                selector.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, strId) {
                    var cache = plugIn.getServer().getCache();
                    if(cache.getDocument(this.getXMLId() + "_BAK")) {
                        cache.clearById(this.getXMLId() + "_BAK");
                    }
                    this.jsxsuper(dataCDF, intCurrentPage, intTotalPages, strId);
                    this.createDataView();
                    this.preProcessData();
                    this.updateLastDoc();
                    this.repaintData();
                };

                selector.setData = function(cdf, intCurrentPage, intTotalPages, strId, bMergeToInitialData) {
                    var cache = plugIn.getServer().getCache();
                    if(cache.getDocument(this.getXMLId() + "_BAK")) {
                        cache.clearById(this.getXMLId() + "_BAK");
                    }
                    this.jsxsuper(cdf, intCurrentPage, intTotalPages, strId, bMergeToInitialData);
                    this.createDataView();
                    this.preProcessData();
                    this.updateLastDoc();
                    this.repaintData();
                }

                selector.createDataView = function() {
                    if(!this.getServer()) {
                        var me = this;
                        setTimeout(function() {
                            me.createDataView();
                        },0);
                        return;
                    }
                    var column = this.getCheckColumn();
                    var cache = plugIn.getServer().getCache();
                    if(column) {
                        try {
                            if(!this.isEditMode()) {
                                column.setText("");
                                if(this.jsxhidecheckcolumn == SELECTOR.HIDECOLUMN) {
                                    if(!cache.getDocument(this.getXMLId() + "_BAK")) {
                                        cache.setDocument(this.getXMLId() + "_BAK", this.getXML().cloneDocument());
                                        this.setXMLString(SELECTOR.FITERXSLOBJ.transform(this.getXML()).toString());
                                        this.resetCacheData();
                                    }
                                    column.setDisplay(jsx3.gui.Block.DISPLAYNONE, true);
                                }
                                else {
                                    if(cache.getDocument(this.getXMLId() + "_BAK")) {
                                        this.setXMLString(cache.getDocument(this.getXMLId() + "_BAK").toString());
                                        this.resetCacheData();
                                        cache.clearById(this.getXMLId() + "_BAK");
                                    }
                                    column.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true);
                                }
                            }
                            else {
                                column.setText((this.getSelectionType() == SELECTOR.MULTI_SELECTION) ? SELECTOR.HEAD_HTML_UNCHECKED : "");
                                column.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true);
                                if(this.jsxhidecheckcolumn == SELECTOR.HIDECOLUMN) {
                                    if(cache.getDocument(this.getXMLId() + "_BAK")) {
                                        this.setXMLString(cache.getDocument(this.getXMLId() + "_BAK").toString());
                                        this.resetCacheData();
                                        cache.clearById(this.getXMLId() + "_BAK");
                                    }
                                }
                            }
                        }
                        catch(ex) {
                            tibco.uxcore.System.logException(ex);
                        }
                    }
                }

                selector.setEditMode = function(mode, bRepaint) {
                    this.jsxsuper(mode, false);
                    this.createDataView();
                    this.preProcessData();
                    this.updateLastDoc();
                    if(bRepaint) {
                        this.repaintData();
                    }
                    return this;
                };

                selector.setSelectionType = function(intSelectionType, bRepaint) {
                    if(this.jsxselectiontype != intSelectionType) {
                        this.jsxselectiontype = intSelectionType;
                        this._repaintCheckColumn();
                    }
                    if(bRepaint) {
                        this.repaint();
                    }
                };

                selector.getSelectionType = function() {
                    return this.jsxselectiontype;
                };

                selector.setHideCheckColumn = function(intHide, bRepaint) {
                    if(this.jsxhidecheckcolumn != intHide) {
                        this.jsxhidecheckcolumn = intHide;
                        this.setEditMode(this.getEditMode(), false);
                    }
                    if(bRepaint) {
                        this.repaint();
                    }
                };

                selector.getHideCheckColumn = function(hide) {
                    return this.jsxhidecheckcolumn;
                };

                /**
                 * Only avaiable in Multi-Selection mode, select all records in matrix.
                 */
                selector.checkAllRecords = function() {
                    if(this.getSelectionType() == SELECTOR.MULTI_SELECTION) {
                        this.toggleAllRecords(true);
                    }
                };

                /**
                 * Only avaiable in Multi-selection mode, deselect all records in matrix.
                 */
                selector.uncheckAllRecords = function() {
                    if(this.getSelectionType() == SELECTOR.MULTI_SELECTION) {
                        this.toggleAllRecords(false);
                    }
                    else {
                        if(!this.isEditMode()) {
                            this.setEditMode(true);
                            this.toggleAllRecords(false);
                            this._handleMerge(false,"select");
                            this.setEditMode(false);
                        }
                        else {
                            this.toggleAllRecords(false);
                            this._handleMerge(false,"select");
                        }
                        this.repaintData();
                    }
                };

                selector.doToggleAllRecords = function(checked) {
                    this.toggleAllRecords(checked);
                    if(this.doSelectRecordIds(this.getCheckedRecordIds(), null)) {
                        this.updateLastDoc();
                        this._handleMerge(false,"select");
                    }
                    else {
                        this.reapplyLastDoc();
                    }
                }

                selector.toggleAllRecords = function(checked) {
                    checked = checked && checked != "false" && checked != "0" ? "1" : "0";
                    var records = this.getXML().selectNodes("//record");
                    jsx3.$A(records.toArray()).each(function(record) {
                        record.setAttribute(SELECTOR.ATTR_CHECKBOX_COLUMN, checked);
                    });
                    this.repaintData();
                };

                /**
                 * Check records which jsxid in ids array. For single row, only last one is checked.
                 */
                selector.checkRecords = function(ids) {
                    jsx3.$A(ids).each(jsx3.$F(function(id) {
                        var record = this.getXML().selectSingleNode("//record[@jsxid='" + id + "']");
                        if(record) record.setAttribute(SELECTOR.ATTR_CHECKBOX_COLUMN, "1");
                    }).bind(this));
                    this.repaintData();
                };

                /**
                 * UnCheck records which jsxid in ids array.
                 */
                selector.uncheckRecords = function(ids) {
                    jsx3.$A(ids).each(jsx3.$F(function(id) {
                        var record = this.getXML().selectSingleNode("//record[@jsxid='" + id + "']");
                        if(record) record.setAttribute(SELECTOR.ATTR_CHECKBOX_COLUMN, "0");
                    }).bind(this));
                    this.repaintData();
                };

                /**
                 * Get all checked records
                 * @return <Array>
                 */
                selector.getCheckedRecords = function() {
                    return this.getXML().selectNodes("//record[@" + SELECTOR.ATTR_CHECKBOX_COLUMN + "='1']");
                };

                /**
                 * Get id array of all checked records
                 */
                selector.getCheckedRecordIds = function() {
                    return jsx3.$A(this.getCheckedRecords().toArray()).map(function(record) {
                        return record.getAttribute("jsxid");
                    });
                };

                selector.getCheckColumn = function() {
                    var column = this.getChild(0);
                    return (!column || !column.jsxcheckcolumn) ? null : column;
                };

                /**
                 * @private
                 */
                selector._ensureIntegrity = function() {
                    try {
                        var column = this.getChild(0);
                        var isNew = false;
                        if(!column || !column.jsxcheckcolumn) {
                            isNew = true;
                            column = new jsx3.gui.Matrix.Column("checkColumn");
                            column.setWidth(42);
                            column.setValueTemplate("@empty");
                            column.setPath(SELECTOR.ATTR_CHECKBOX_COLUMN);
                            column.setCanSort(jsx3.Boolean.FALSE);
                            column.setResizable(jsx3.Boolean.FALSE);
                            column.setCellTextAlign(jsx3.gui.Block.ALIGNCENTER);
                            column.jsxcheckcolumn = 1;
                            if(this.getSelectionType() == SELECTOR.MULTI_SELECTION) {
                                column.setText((!this.isEditMode()) ? "" : SELECTOR.HEAD_HTML_UNCHECKED);
                            }
                            else {
                                column.setText("");
                            }
                            this.setChild(column, jsx3.app.Model.PERSISTEMBED);
                            if(this.getChild(1)) {
                                this.insertBefore(column, this.getChild(0), true)
                            }
                            this.setColumnProperties(column, false, true);
                        }
                        if(!column.getChild(0)) {
                            if(this.getSelectionType() == SELECTOR.MULTI_SELECTION) {
                                var child = new jsx3.gui.CheckBox("checkBox");
                                column.setChild(child);
                                child.subscribe("jsxtoggle", this, this._trySelect);
                            }
                            else {
                                var child = new jsx3.gui.RadioButton("radio");
                                column.setChild(child);
                                child.subscribe("jsxselect", this, this._trySelect);
                            }
                        }
                        this.preProcessData();
                        this.setDynamicProperties(true);
                        this.repaint();
                    }
                    catch(ex) {
                        tibco.uxcore.System.logException(ex);
                    }
                };

                selector._trySelect = function(objEvent) {
                    var column = this.getCheckColumn();
                    if(column) {
                        var es = column.getChild(0).emGetSession();
                        if (es) {
                            if(this.getSelectionType() == SELECTOR.MULTI_SELECTION) {
                                var intChecked = objEvent.context.intCHECKED;
                                this.jsxchecked = intChecked;
                                var record = this.getXML().selectSingleNode("//record[@jsxid='" + es.recordId + "']");
                                if(record) record.setAttribute(SELECTOR.ATTR_CHECKBOX_COLUMN, intChecked.toString());
                            } else {
                                var path = es.column.getPath();
                                var i = es.matrix.getXML().selectNodeIterator("//record[@" + SELECTOR.ATTR_CHECKBOX_COLUMN + "='1']");
                                while (i.hasNext()) {
                                  var node = i.next();
                                  node.removeAttribute(SELECTOR.ATTR_CHECKBOX_COLUMN);
                                }

                                var record = this.getXML().selectSingleNode("//record[@jsxid='" + es.recordId + "']");
                                if(record) record.setAttribute(SELECTOR.ATTR_CHECKBOX_COLUMN, "1");                              
                            }
                        }                        
                    }
                    if(this.doSelectRecordIds(this.getCheckedRecordIds(), null)) {
                        this.updateLastDoc();
                        this._handleMerge(false,"select");
                    }
                    else {
                        this.reapplyLastDoc();
                    }
                }

                selector.onSelectionChange = function(objContent) {
                    //override parent
                }

                selector._repaintCheckColumn = function() {
                    var column = this.getCheckColumn();
                    if(column) {
                        column.removeChildren();
                        if(this.getSelectionType() == SELECTOR.MULTI_SELECTION) {
                            column.setText((!this.isEditMode()) ? "" : SELECTOR.HEAD_HTML_UNCHECKED);
                            column.setChild(new jsx3.gui.CheckBox("checkBox"));
                        }
                        else {
                            column.setText("");
                            column.setChild(new jsx3.gui.RadioButton("radio"));
                        }
                        this.resetCacheData();
                        this.toggleAllRecords(false);
                        this.preProcessData();
                        this.repaintData();
                    }
                    else {
                        this._ensureIntegrity();
                    }
                };
            }
            );

})(this);