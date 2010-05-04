/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

//jsx3.require("tibco.uxcore.gui.AbstractBlock");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.ListContainer", tibco.uxcore.gui.AbstractBlock, null,
        function(CONTAINER, container) {

            /* Part Zero, Constants and utility funciton */

            //Supported messages
            CONTAINER.LIST_RECORD_EDITED             = "jsxedit";
            CONTAINER.LIST_SEARCH_REQUESTED          = "jsxsearch";
            CONTAINER.LIST_VIEW_CHANGED              = "jsxviewchanged";
            CONTAINER.LIST_ACTION_REQUESTED          = "jsxaction";
            CONTAINER.LIST_VISIBILITY_CHANGED        = "jsxvisibilitychanged";
            CONTAINER.LIST_REFRESH_REQUESTED         = "jsxrefresh";
            CONTAINER.LIST_COLUMNS_CHANGED           = "jsxcolumnschanged";
            CONTAINER.LIST_DATA_CHANGED              = "jsxdatachanged";
            CONTAINER.LIST_PAGE_CHANGE_REQUESTED     = "jsxpagechange";
            CONTAINER.LIST_RESET                     = "jsxreset";
            CONTAINER.LIST_SELECTION_CHANGED         = "jsxselectionchanged";
            CONTAINER.LIST_REVERTED                  = "jsxreverted";

            //shortcut of all necessary accessories class name
            CONTAINER.ILISTACCESSORY          = "tibco.uxcore.gui.IListAccessory";
            CONTAINER.ILISTVIEW               = "tibco.uxcore.gui.IListView";
            CONTAINER.ILISTSEARCH             = "tibco.uxcore.gui.IListSearch";

            CONTAINER.BROWSELISTVIEW          = "tibco.uxcore.gui.BrowseView";
            CONTAINER.ACCUMULATORLISTVIEW     = "tibco.uxcore.gui.Accumulator";
            CONTAINER.FILMSTRIPLISTVIEW       = "tibco.uxcore.gui.FilmstripListView";
            CONTAINER.TABLELISTVIEW           = "tibco.uxcore.gui.TableListView";
            CONTAINER.TABLELISTBUILDER        = "tibco.uxcore.gui.TableListBuilder";
            CONTAINER.TREELISTBUILDER         = "tibco.uxcore.gui.TreeListBuilder";
            CONTAINER.TABLESELECTOR           = "tibco.uxcore.gui.TableSelector";

            CONTAINER.FILTER                  = "tibco.uxcore.gui.FilterSearch";
            CONTAINER.SIMPLESEARCH            = "tibco.uxcore.gui.SimpleSearch";
            CONTAINER.ADVANCEDSEARCH          = "tibco.uxcore.gui.AdvancedSearch";

            CONTAINER.BUTTON                  = "tibco.uxcore.gui.Button";
            CONTAINER.CONTAINERBUTTON         = "tibco.uxcore.gui.ListContainerButton";

            CONTAINER.ICONBUTTON              = "tibco.uxcore.gui.IconButton";
            CONTAINER.COLUMNPICKERBUTTON      = "tibco.uxcore.gui.ColumnPickerButton";
            CONTAINER.REFRESHBUTTON           = "tibco.uxcore.gui.RefreshButton";
            CONTAINER.HIDESHOWBUTTON          = "tibco.uxcore.gui.HideShowButton";
            CONTAINER.PERMISSIONSBUTTON       = "tibco.uxcore.gui.PermissionsButton";
            CONTAINER.ACTIONBUTTON            = "tibco.uxcore.gui.ActionButton";
            CONTAINER.ACTIONBUTTONLIST        = "tibco.uxcore.gui.ActionButtonList";
            CONTAINER.VIEWBUTTON              = "tibco.uxcore.gui.ViewButton";

            CONTAINER.LISTPAGINATOR           = "tibco.uxcore.gui.ListPaginator";

            CONTAINER.MASK                    = "tibco.uxcore.gui.ListContainer.MaskBlock";

            CONTAINER.ACTIONBAR_BG_HIDDEN = 1;
            CONTAINER.ACTIONBAR_BG_SHOWN = 0;

            container.jsxhideactionbar = 0;
            container.jsxhideactionbg = 0;
            container.jsxvisibility = true;

            var Block = jsx3.gui.Block;
            var Interactive = jsx3.gui.Interactive;

            /**
             * @private
             */
            container._vetoLoop = function(vetoFun, vetoArgs) {
                var accessories = this.getAllAccessories();
                for(var i = 0; i < accessories.length; i++) {
                    try {
                        if(accessories[i][vetoFun]) {
                            if(!accessories[i][vetoFun].apply(accessories[i], vetoArgs)) {
                                this.getLogger().info(accessories[i].getClass() + " veto :false ");
                                return false;
                            }
                        }
                    }
                    catch(ex) {
                        this.getLogger().error("Error in" + accessories[i] + " " + vetoFun + "::" + ex);
                    }
                }
                return true;
            };

            container.isDirty = function() {
                return this.getView().isDirty();
            }

            container.onChange = function(type) {
                var me = this;
                var parent = this.getParent();
                this._publishEvent("jsxchange", {target: me, isDirty: this.isDirty(), type: type});
                if(parent && (parent.instanceOf("tibco.uxcore.gui.ListContainerFormField"))) {
                    jsx3.sleep(function() {parent.childContentChanged(this.isDirty(), type);},null,this);
                }
            }

            /**
             * @private
             */
            container._requestedLoop = function(reqFun, reqArgs) {
                var accessories = this.getAllAccessories();
                jsx3.$A(this.getAllAccessories()).each(jsx3.$F(function(accessory) {
                    try {
                        accessory[reqFun] && accessory[reqFun].apply(accessory, reqArgs);
                    }
                    catch (e) {
                        this.getLogger().error("Error in" + accessory + " " + reqFun + "::" + e);
                    }
                }).bind(this));
                return true;
            };

            /**
             * @private
             */
            container._requestedLoopNonViews = function(reqFun, reqArgs) {
                var accessories = this.getAllAccessories();
                jsx3.$A(this.getAllAccessories()).each(jsx3.$F(function(accessory) {
                    try {
                        if(!accessory.instanceOf("tibco.uxcore.gui.IListView")) {
                            accessory[reqFun] && accessory[reqFun].apply(accessory, reqArgs);
                        }
                    }
                    catch (e) {
                        this.getLogger().error("Error in" + accessory + " " + reqFun + "::" + e);
                    }
                }).bind(this));
                return true;
            };

            /**
             * @private
             */
            container._vetoAndRequestedLoop = function(vetoFun, reqFun, vetoArgs, msgContent, beforeMsgId, afterMsgId) {
                if(this._vetoLoop(vetoFun, vetoArgs)) {
                    var retResult = this._publishEvent(beforeMsgId, msgContent);
                    if(retResult === false) {
                        return false;
                    }
                    this._requestedLoop(reqFun, vetoArgs);
                    this._publishEvent(afterMsgId, msgContent);
                    return true;
                }
                return false;
            };

            /**
             * doEvent wrapped funciton with try-catch sentence.
             * @private
             */
            container._publishEvent = function(topicId, objContent) {
                try {
                    return this.doEvent(topicId, objContent);
                }
                catch(ex) {
                    this.getLogger().error("publishEvent error, with topicId=" + topicId + " :" + ex);
                    return false;
                }
            };

            /**
             * Return iterator object from accessories array or single accessory.
             * @param {Object|Array<Object>} accessorie(s) list
             * @private
             */
            container.getIterator = function(obj) {
                if(obj && obj instanceof Array) return new jsx3.util.List(obj).iterator();
                if(!obj) return new jsx3.util.List([]).iterator();
                return new jsx3.util.List([obj]).iterator();
            };

            /* Part I, Layout related constants and functions ----------------------- */

            //predefined size of some accessories, such as filer, action bar, paginator.
            CONTAINER.complex = {};
            CONTAINER.complex.f_height = container.getDynamicValue("@uxcore10@listContainer@filterBarHeight") || 23;
            CONTAINER.complex.a_height = container.getDynamicValue("@uxcore10@listContainer@actionBarHeight") || 28;
            CONTAINER.complex.p_height = container.getDynamicValue("@uxcore10@listContainer@paginatorBarHeight") || 23;

            //rules for allowing or disallowing child to be added to container
            CONTAINER.checkRules = [
                [ CONTAINER.ILISTSEARCH,        ["checkUnique"]                 ],
                [ CONTAINER.ACCUMULATORLISTVIEW,["checkUnique", "checkListView"]],
                [ CONTAINER.BROWSELISTVIEW,     ["checkUnique", "checkListView"]],
                [ CONTAINER.FILMSTRIPLISTVIEW,  ["checkUnique", "checkListView"]],
                [ CONTAINER.TABLELISTVIEW,      ["checkUnique", "checkListView"]],
                [ CONTAINER.COLUMNPICKERBUTTON, ["checkUnique"]                 ],
                [ CONTAINER.REFRESHBUTTON,      ["checkUnique"]                 ],
                [ CONTAINER.HIDESHOWBUTTON,     ["checkUnique"]                 ],
                [ CONTAINER.PERMISSIONSBUTTON,  ["checkUnique"]                 ],
                [ CONTAINER.LISTPAGINATOR,      ["checkUnique"]                 ],
                [ CONTAINER.ACTIONBUTTONLIST,   ["checkUnique"]                 ]
            ];

            //assistant function for checking setting of children
            CONTAINER.checkFunctions = {

                //check wether child is a instance of special interface/class
                checkExist : function(objParent, objChild, strClassName) {
                    var ret = jsx3.lang.Class.forName(strClassName) && objChild.instanceOf(strClassName);
                    return ret;
                },

                //check whether child to be added is unique in container
                checkUnique : function(objParent, objChild, strClassName) {
                    if(objParent.getFirstChildOfType(strClassName) != null) {
                        if(jsx3.IDE) objParent.getLogger().warn("Only ONE " + strClassName + " may exist in ListContainer");
                        return false;
                    }
                    return true
                },

                //check special rule for listview
                checkListView : function(objParent, objChild, strClassName) {
                    var strWarning = CONTAINER.BROWSELISTVIEW + " objects must not exist as children at the same time as any other ListView objects";
                    if(strClassName == CONTAINER.BROWSELISTVIEW) {
                        if(objParent.getFirstChildOfType(CONTAINER.ILISTVIEW)) {
                            if(jsx3.IDE) objParent.getLogger().warn(strWarning)
                            return false;
                        }
                        return true;
                    }
                    else {
                        if(jsx3.lang.Class.forName(CONTAINER.BROWSELISTVIEW) && objParent.getFirstChildOfType(CONTAINER.BROWSELISTVIEW)) {
                            if(jsx3.IDE) objParent.getLogger().warn(strWarning)
                            return false;
                        }
                        return true;
                    }
                }
            };

            var NotInstanceOf = function(obj, strType) {
                if(!jsx3.Class.forName(strType)) return true;
                return !obj.instanceOf(strType);
            };

            container.init = function(strName) {
                this.jsxsuper(strName);
            };

            container.onSetParent = function(parent) {
                var ret = this.jsxsuper(parent);
                // this is where you can look for child IListView implementations and generate ViewButtons for them (only when there are 2 or more)
                // Generated ViewButtons should use the FRAGMENT namespace so that they are not serialized

                //Set default jsxview value
                if(!this.jsxview || !this.getDescendantOfName(this.jsxview)
                        || !this.getDescendantOfName(this.jsxview).instanceOf(CONTAINER.ILISTVIEW)) {
                    this.jsxview = ((this.getAllViews().length > 0) ? this.getAllViews()[0].getName() : null);
                }

                if(this.getHideShowButton()) {
                    this.getHideShowButton().jsxstate = (this.jsxvisibility) ? "0" : "1";
                }

                this._setButtonMargin();

                //hidden Paginator
                this._jsxShowPaginator = false;
                return ret;
            };

            container._setButtonMargin = function() {
                //Set margin of IconButtons
                var btns = jsx3.$A([].concat(
                        this.getCustomIconButtons() || [],
                        this.getColumnPickerButton() || [],
                        this.getRefreshButton() || [],
                        this.getHideShowButton() || [])).each(function(btn) {
                    if(btn.disabledynmargin) return;
                    if(btn.instanceOf(CONTAINER.HIDESHOWBUTTON)) {
                        btn.setDynamicProperty("jsxmargin", "@uxcore10@HideShowButton Margin", true);
                    }
                    else if(btn.instanceOf(CONTAINER.COLUMNPICKERBUTTON)) {
                        btn.setDynamicProperty("jsxmargin", "@uxcore10@ColumnPickerButton Margin", true);
                    }
                    else {
                        btn.setDynamicProperty("jsxmargin", "@uxcore10@IconBtn Margin", true);
                    }
                });
                var search = null;
                if(search = this.getSimpleSearch()) {
                    search.setDynamicProperty("jsxmargin", "@uxcore10@simpleSearch@margin", true);
                }
            };

            container.onSetChild = function(objChild) {
                var strClass, arrRules;
                // allow/disallow children to be added based on logical rules in spec document.
                if(CONTAINER.checkFunctions.checkExist(this, objChild, CONTAINER.ILISTACCESSORY)) {
                    for(var i = 0; i < CONTAINER.checkRules.length; i++) {
                        strClass = CONTAINER.checkRules[i][0];
                        arrRules = CONTAINER.checkRules[i][1];
                        if(CONTAINER.checkFunctions.checkExist(this, objChild, strClass)) {
                            for(var j = 0; j < arrRules.length; j++) {
                                if(!CONTAINER.checkFunctions[arrRules[j]](this, objChild, strClass)) {
                                    this.getLogger().info("Class:" + strClass + " Rules:" + arrRules[j]);
                                    return false
                                }
                            }
                        }
                    }
                    return true;
                }
                else {
                    if(CONTAINER.checkFunctions.checkExist(this, objChild, CONTAINER.BUTTON)) {
                        return true;
                    }
                    if(CONTAINER.checkFunctions.checkExist(this, objChild, CONTAINER.MASK)) {
                        return true;
                    }
                }
                return false;
            };

            container.setValidator = function(strScriptlet) {
                this.setProperty("validator", strScriptlet);
            }

            container.getValidator = function() {
                return this.validator;
            }

            container.validate = function(formfield, bRequired) {
                if(this.validator) {
                    return  jsx3.eval(this.validator,{objJSX:this, formfield:formfield, bRequired:bRequired});
                }
                else {
                    if(bRequired) {
                        var ids = this.getSelectedRecordIds();
                        var val = ids && (ids.length > 0);
                        return val ? val : "There must be at least one selected record";
                    }
                    return true;
                }
            }

            container.setEnabled = function(intEnabled) {
                if(!this.getAncestorOfType("tibco.uxcore.gui.ListContainerFormField")) {
                if(intEnabled) {
                    this.hideMask();
                    delete this._showingMask;
                }
                else if(!intEnabled) {
                    this.showMask();
                    var arr = this.getChildren();
                    var child = arr[arr.length - 1];
                    child.setDynamicProperty("jsxbgcolor", null);
                    child.setBackgroundColor("white", true);
                    child.setDynamicProperty("jsxcursor", null);
                    child.setCursor("default",true);
                    this._showingMask = true;
                }
                this.repaint();
                }
            }

            container.setChild = function(objChild, intPersist, strSourceURL, strNS) {
                var ret = this.jsxsuper(objChild, intPersist, strSourceURL, strNS);
                // be sure to add ViewButtons as needed here
                if(!objChild._jsxisamask) this.remakeLayout();
                return ret;
            };

            container.adoptChild = function(objChild, bRepaint, bForce) {
                var ret = this.jsxsuper(objChild, bRepaint, bForce);
                // be sure to add ViewButtons as needed here
                if(!objChild._jsxisamask) this.remakeLayout();
                return ret;
            };

            container.onRemoveChild = function(objChild, intIndex) {
                var ret = this.jsxsuper(objChild, intIndex);
                // remove ViewButtons as needed here
                if(!objChild._jsxisamask) this.remakeLayout();
                return ret;
            };

            /**
             * Repaint layout when user add or remove accessories of list containter,
             * ONLY available in GI build for better performance
             */
            container.remakeLayout = function() {
                if(!jsx3.IDE) return;
                this._setButtonMargin();
                if(this._jsxtimer) window.clearTimeout(this._jsxtimer);
                this._jsxtimer = window.setTimeout(jsx3.$F(function() {
                    try {
                        if(!this.onbeforepaint) return;
                        this.recalcBox();
                        this.repaint();
                    }
                    catch(ex1) {
                        this.getLogger().error(ex1);
                    }
                    ;
                }).bind(this), 10);
            };

            /**
             * Calculate height of list view object
             * @param {parentHeight} the height of parent object of list view
             * @return {String} height of list view
             */
            container.getViewHeight = function(parentHeight) {
                var viewHeight = "100%";
                if(parentHeight) {
                    viewHeight = parentHeight -
                                 (this.getFilterPaneDisplay() ? CONTAINER.complex.f_height : 0) -
                                 (this.getActionBarPaneDisplay() ? CONTAINER.complex.a_height : 0) -
                                 (this.getPaginatorPaneDisplay() ? CONTAINER.complex.p_height : 0);
                    this._jsxviewheight = viewHeight;
                }
                return viewHeight;
            };

            container.getFilterPaneDisplay = function() {
                return (this.getFilterSearch() != null);
            };

            container.setActionBarPaneDisplay = function(display) {
                this.jsxhideactionbar = (display === jsx3.gui.Block.DISPLAYNONE || display === false) ? 1 : 0;
                this.syncProperty(["viewChange", "viewHeight"]);
            };

            container.getActionBarPaneDisplay = function() {
                if (this.jsxhideactionbar == 0 && !this._showingMask) {
                    return jsx3.$A(this.getAllAccessories()).filter(function(obj) {
                        return (!obj.instanceOf(CONTAINER.ILISTVIEW) &&
                          !obj.instanceOf(CONTAINER.LISTPAGINATOR) &&
                          !obj.instanceOf(CONTAINER.FILTER));
                    }).length > 0 || this.getNormalButtons().length > 0;
                }
                return false;
            };

            container.getViewPaneDisplay = function() {
                return this.getAllViews().length > 0;
            };

            container.getPaginatorPaneDisplay = function() {
                return (this.getListPaginator() != null) && (jsx3.IDE || this._jsxShowPaginator) !== false;
            };

            container.getPaneSpace = function(flag, dimension) {
                var name = flag + "_" + dimension;
                return this[name] ? this[name] : CONTAINER.complex[name];
            };

            /**
             * @private
             */
            container._getCurrentTableListView = function() {
                //ONLY available for TableListView
                var view = this.getView();
                if(view && view.instanceOf(CONTAINER.TABLELISTVIEW)) {
                    return view;
                }
                return null;
            };

            /**
             * Sets the edit mode for table list view.
             * @param mode {String|Boolean}
             *  <code>true</code> or tibco.uxcore.gui.TableListView.EDITMODE to enter edit mode and
             *  <code>false</code> or tibco.uxcore.gui.TableListView.NORMALMODE to exit edit mode.
             */
            container.setEditMode = function(mode, bRepaint) {
                var view = this.getView();
                if(view && view.setEditMode) {
                    view.setEditMode(mode, bRepaint);
                }
                this._requestedLoopNonViews("editModeChanged", [(jsx3.Boolean.valueOf(mode) == jsx3.Boolean.TRUE)]);
                return this;
            };

            container.onModelChanged = function(intModel) {
                this._requestedLoopNonViews("modelChanged", [intModel]);
            }

            container.onCanSortChanged = function(bCanSort) {
                this._requestedLoopNonViews("canSortChanged", [bCanSort]);
            }

            /**
             * Gets the edit mode from table list view.
             * @param mode {String} tibco.uxcore.gui.TableListView.EDITMODE or
             *  tibco.uxcore.gui.TableListView.NORMALMODE
             */
            container.getEditMode = function(mode) {
                var view = this.getView();
                if(view && view.getEditMode) {
                    return view.getEditMode();
                }
                return null;
            };

            /**
             * Set show/hide background of ActionBar
             * @param bHidden
             */
            container.setHideActionBarBG = function(bHidden, bRepaint) {
                this.jsxhideactionbg = bHidden;
                if(bRepaint) this.repaint();
                return this;
            };

            container.setColumnPickerType = function(type) {
                this.jsxcolumnpickertype = type;
                return this;
            };

            container.getColumnPickerType = function() {
                return this.jsxcolumnpickertype || "jsxpath";
            };

            /* PART II, Interface functions ------------------------------------------*/

            container.onEditRecord = function(strRecordId, strAction, entityRecord, strInsertBefore, callerObj) {
                var veto = this._vetoAndRequestedLoop("onEditRecord", "recordEdited",
                        arguments, {strRecordId: strRecordId, strAction: strAction, entityRecord: entityRecord, strInsertBefore: strInsertBefore, callerObj: callerObj}, "jsxbeforeedit", CONTAINER.LIST_RECORD_EDITED);
                var parent = this.getParent();
                if(veto && parent && (parent.instanceOf("tibco.uxcore.gui.ListContainerFormField"))) {
                    jsx3.sleep(function() {parent.recordEdited(this.isDirty(), strRecordId, strAction);},null,this);
                }
                return veto;
            };

            /**
             * Used to notify all accessories that a record selection change is being requested.
             * @param arrRecordIds {Array} - array of the jsxids of the records to be selected.
             * This should represent the final set of selected Ids, not just those to be added to selection
             */
            container.onSelectRecordIds = function(arrRecordIds, auxId, callerObj) {
                var veto = this._vetoAndRequestedLoop("onSelectRecordIds", "recordsSelected",
                        arguments, {arrRecordIds: arrRecordIds, auxId: auxId, callerObj: callerObj}, "jsxbeforeselect", CONTAINER.LIST_SELECTION_CHANGED);
                return veto;
            }

            container.setSelectedRecordIds = function(strIds, auxId, bMergeToInitialData) {
                if(typeof(strIds) == "string") strIds = [strIds];
                var views = this.getAllViews();
                if(views.length > 0) {
                    for(var i = 0; i < views.length; i++) {
                        views[i].setSelectedRecordIds(strIds, auxId, bMergeToInitialData);
                    }
                    var arrRecordIds = this.getSelectedRecordIds(auxId);
                    this._requestedLoopNonViews("recordsSelected", [arrRecordIds, auxId]);
                    this._publishEvent(CONTAINER.LIST_SELECTION_CHANGED, {arrRecordIds: arrRecordIds, auxId: auxId});
                }
            };

            /**
             * Returns the collection of selected record ids.
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to get selected record ids for
             *
             * @return {Array<String>} - jsxid attribute of selected record(s), or null if none are selected
             */
            container.getSelectedRecordIds = function(auxId) {
                return this.getView() ? this.getView().getSelectedRecordIds(auxId) : [];
            };

            /**
             * selects CDF records within the List. Both the view and the data model (CDF) will be updated.  This does not replace the previous selections,
             * but rather adds these to the current selection.
             * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to select records in
             * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            container.selectRecords = function(strIds, auxId, bMergeToInitialData) {
                if(typeof(strIds) == "string") strIds = [strIds];
                var views = this.getAllViews();
                if(views.length > 0) {
                    for(var i = 0; i < views.length; i++) {
                        views[i].selectRecords(strIds, auxId, bMergeToInitialData);
                    }
                    var arrRecordIds = this.getSelectedRecordIds(auxId);
                    this._requestedLoopNonViews("recordsSelected", [arrRecordIds, auxId]);
                    this._publishEvent(CONTAINER.LIST_SELECTION_CHANGED, {arrRecordIds: arrRecordIds, auxId: auxId});
                }
            };

            /**
             * deselects CDF records within the List. Both the view and the data model (CDF) will be updated
             * @param strIds {String | Array<String>}  jsxid attribute for the CDF record(s) to select
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to deselect records in
             * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            container.deselectRecords = function(strIds, auxId, bMergeToInitialData) {
                if(typeof(strIds) == "string") strIds = [strIds];
                var views = this.getAllViews();
                if(views.length > 0) {
                    for(var i = 0; i < views.length; i++) {
                        views[i].deselectRecords(strIds, auxId, bMergeToInitialData);
                    }
                    var arrRecordIds = this.getSelectedRecordIds(auxId);
                    this._requestedLoopNonViews("recordsSelected", [arrRecordIds, auxId]);
                    this._publishEvent(CONTAINER.LIST_SELECTION_CHANGED, {arrRecordIds: arrRecordIds, auxId: auxId});
                }
            };

            /**
             * Returns the collection of selected records.  These are actual references to the records, not clones.
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to get selected records for
             *
             * @return {jsx3.util.List<jsx3.xml.Entity>}  list of selected Entity objects (records), or null if none are selected
             */
            container.getSelectedRecords = function(auxId) {
                return this.getView() ? this.getView().getSelectedRecords(auxId) : new jsx3.util.List();
            };

            /**
             * Clears CDF document from list view
             * @param strId {String} This parameter is used for brows type.
             *                 Specifies the browse component to be cleared
             * @param bMergeToInitialData {boolean} when not set to 'false' (default is 'true'), a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            container.clearData = function(auxId, bMergeToInitialData) {
                var views = this.getAllViews();
                if(views.length > 0) {
                    for(var i = 0; i < views.length; i++) {
                        views[i].clearData(auxId, bMergeToInitialData !== false);
                    }
                    this._requestedLoopNonViews("dataChanged", [null,0,0,null])
                }
            };

            /**
             * Clears the list selections
             * @param auxId {String} This parameter is used for brows type.
             *                 Specifies the browse component to be cleared
             * @param bMergeToInitialData {boolean} when 'true', a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            container.clearSelectedRecords = function(auxId, bMergeToInitialData) {
                var views = this.getAllViews();
                if(views.length > 0) {
                    for(var i = 0; i < views.length; i++) {
                        views[i].clearSelectedRecords(auxId, bMergeToInitialData);
                    }
                    var arrRecordIds = this.getSelectedRecordIds(auxId);
                    this._requestedLoopNonViews("recordsSelected", [arrRecordIds, auxId]);
                    this._publishEvent(CONTAINER.LIST_SELECTION_CHANGED, {arrRecordIds: arrRecordIds, auxId: auxId});
                }
            };

            /**
             * Sets CDF document of list view
             * @param dataCDF {jsx3.xml.CDF.Document} - the cdf data.
             * @param intCurrentPage {int} - the page number of the data, with respect to the whole data set
             * @param intTotalPages {int} - the total pages in the data set of which this data represents a single page
             * @param auxId {String} This parameter is used for browse type. Specifies the browse component id that this cdf blongs to
             * @param bMergeToInitialData {boolean} when not set to 'false' (default is 'true'), a snapshot of the data will be taken after this operation to be used as the
             *                 initial data state of the list view (what will be reverted back to on a revert action)
             */
            container.setData = function(dataCDF, intCurrentPage, intTotalPages, auxId, bMergeToInitialData) {
                var objContent = {
                    dataCDF : dataCDF,
                    intCurrentPage : intCurrentPage,
                    intTotalPages : intTotalPages,
                    auxId : auxId,
                    bMergeToInitialData: (bMergeToInitialData !== false)
                };
                var views = this.getAllViews();
                if(views.length > 0) {
                    for(var i = 0; i < views.length; i++) {
                        views[i].setData(dataCDF, intCurrentPage, intTotalPages, auxId, bMergeToInitialData !== false);
                    }
                    this._requestedLoopNonViews("dataChanged", [dataCDF, intCurrentPage, intTotalPages, auxId])
                    if(this.getListPaginator()) {
                        this._jsxShowPaginator = (intTotalPages > 1);
                        this.syncProperty(["viewChange", "viewHeight"]);
                    };
                }
            };

            /**
             * Gets CDF document from list view
             * @param strId {String} This parameter is used for brows type.
             *                 Specifies the browse component to be cleared
             */
            container.getData = function(auxId) {
                return this.getView() ? this.getView().getData(auxId) : null;
            };

            /**
             * reverts changes
             */
            container.revert = function() {
                var views = this.getAllViews();
                if(views.length > 0) {
                    var pag = this.getListPaginator();
                    var curr = null;
                    if(pag) {
                        pag.setCurrentPageNumber(1);
                        curr = pag.getCurrentPageNumber();
                    }
                    for(var i = 0; i < views.length; i++) {
                        views[i].revert();
                    }
                    this._requestedLoopNonViews("dataChanged", [views[0] ? views[0].getData() : null, curr, this.getTotalPages(), null])
                }
                this._publishEvent(CONTAINER.LIST_REVERTED, {});
            };

            container.onSearch = function(queryXML, callerObj) {
                // iterate all IListAccessory children and allow them to veto
                // if none veto, publish the search, then iterate them again and notify them of the searchRequest
                var veto;
                if(veto = this._vetoAndRequestedLoop("onSearch", "searchRequested",
                        [queryXML, callerObj], {queryXML:queryXML, callerObj: callerObj},
                        "jsxbeforesearch", CONTAINER.LIST_SEARCH_REQUESTED)) {
                    this._jsxqueryxml = queryXML;
                }
                return veto;
            };

            container.getSearchXML = function() {
                return this._jsxqueryxml || null;
            };

            container.onAction = function(strActionId, callerObj) {
                // iterate all IListAccessory children and allow them to veto
                // if none veto, publish the action, then iterate them again and notify them of the actionRequest
                var veto = this._vetoAndRequestedLoop("onAction", "actionRequested",
                        [strActionId, callerObj], {strActionId: strActionId, callerObj: callerObj},
                        "jsxbeforeaction", CONTAINER.LIST_ACTION_REQUESTED);
                return veto;
            };

            container.refresh = function() {
                // iterate all IListAccessory children and allow them to veto
                // if none veto, publish the refresh, then iterate them again and notify them of the refreshRequest
                var veto = this._vetoAndRequestedLoop("onRefresh", "refreshRequested",
                        [], {}, "jsxbeforerefresh", CONTAINER.LIST_REFRESH_REQUESTED);
                return veto;
            };

            /**
             * Sets display list view and iterate all IListAccessory children and
             * allow them to veto, if none veto, publish viewChanged message
             * @param strNewListViewId {String} the id of the view that was switched to
             * @param callerObj {Object}
             */
            container.setView = function(strNewListViewId, callerObj) {

                if(!this.getDescendantOfName(strNewListViewId)) return false;
                if(!this.getDescendantOfName(strNewListViewId).instanceOf(CONTAINER.ILISTVIEW)) return false;

                var strOldListViewId = this.jsxview ? this.jsxview : null;
                var objContext = {strNewListViewId:strNewListViewId, strOldListViewId:strOldListViewId, callerObj: callerObj};

                this.jsxview = strNewListViewId;
                var veto = this._vetoAndRequestedLoop("onViewChange", "viewChanged",
                        [strNewListViewId, strOldListViewId, callerObj], objContext,
                        "jsxbeforeviewchange", CONTAINER.LIST_VIEW_CHANGED);
                if(!veto) {
                    this.jsxview = strOldListViewId;
                }
                return veto;
            };

            /**
             * Gets current display list view object
             * @return {Object}
             */
            container.getView = function() {
                return this.getDescendantOfName(this.jsxview);
            };

            /**
             * Sets visibility of list view and iterate all IListAccessory  children and
             * allow them to veto, if none veto, publish visibiltyChanged message
             * @param bVisibility {Boolean} the visibility state to be set (<code>true</code> for visible, <code>false</code> for hidden
             * @param callerObj {Object} callerObj is a instance of button when called by Hide/Show button.
             */
            container.setVisibility = function(bVisibility, callerObj) {
                var objContext = {bVisible:bVisibility, callerObj: callerObj};

                var veto = this._vetoAndRequestedLoop("onVisibilityChange", "visibilityChanged",
                        [bVisibility, callerObj], objContext,
                        "jsxbeforevisibilitychange", CONTAINER.LIST_VISIBILITY_CHANGED);
                if(veto) {
                    this.jsxvisibility = bVisibility;
                    var strClassName = "jsx3.gui.Splitter";

                    if(jsx3.lang.Class.forName(strClassName) && this.getAncestorOfType(strClassName)) {
                        try {
                            var md = this.getAncestorOfType(strClassName);
                            if(md.getOrientation() == jsx3.gui.Splitter.ORIENTATIONH) return veto;
                            var mdpane = this.findAncestor(function(o) {
                                return (o.getClass().equals(jsx3.gui.Block.jsxclass) && o.getId() === md.getChild(0).getId())
                            });
                            if(!mdpane) return veto;
                            if(!bVisibility) {
                                this.jsxmdstate = (md.getEnabled() === undefined || md.getEnabled() == jsx3.gui.Form.STATEENABLED);
                                this._jsxrestoreheight = this.getAbsolutePosition().H;
                                this._jsxtoggledheight = this._jsxrestoreheight - this._jsxviewheight -
                                                         (this.getPaginatorPaneDisplay() ? CONTAINER.complex.p_height : 0);
                                this.jsxpaneheight = md.getSubcontainer1Pct();

                                this.setHeight(this._jsxtoggledheight);
                                if(this.jsxmdstate) {
                                    md.setEnabled(jsx3.gui.Form.STATEDISABLED);
                                }
                                md.setSubcontainer1Pct((mdpane.getAbsolutePosition().H - this._jsxrestoreheight + this._jsxtoggledheight) + ",*", true);
                                //md.repaint();
                            }
                            else {
                                this.setHeight("100%");
                                if(this.jsxmdstate) {
                                    md.setEnabled(jsx3.gui.Form.STATEENABLED);
                                }
                                this.jsxpaneheight = this.jsxpaneheight || "50%";
                                if(this.jsxpaneheight) md.setSubcontainer1Pct(this.jsxpaneheight, true);
                                //md.repaint();
                                delete this.jsxmdstate;
                                delete this._jsxrestoreheight;
                                delete this._jsxtoggledheight;
                                delete this.jsxpaneheight;
                            }
                        }
                        catch(e) {
                            this.getLogger().error("Hide/Show Error" + e);
                        }
                    }
                    else {
                        if(!bVisibility) {
                            this._jsxrestoreheight = this.getAbsolutePosition().H;
                            this._jsxtoggledheight = this._jsxrestoreheight - this._jsxviewheight -
                                                     (this.getPaginatorPaneDisplay() ? CONTAINER.complex.p_height : 0);
                            this.setHeight(this._jsxtoggledheight, true);
                        }
                        else {
                            this.setHeight("100%", true);
                            delete this._jsxrestoreheight;
                            delete this._jsxtoggledheight;
                        }
                    }
                }
                return veto;
            };

            /**
             * Return visibility of list view contained in this list container.
             * @return {Boolean} visibility of current list view.
             */
            container.getVisibility = function() {
                return this.jsxvisibility || true;
            };

            /**
             * ColumnSelector uses this method to notify all accessories that column change is being requested.
             * @param arrNewAtts {Array<String>} array of Strings representing the jsxattribute names for the columns to be shown in the list
             * @param callerObj {Object} callerObj is a instance of ColumnPicker whick call this function
             */
            container.changeColumns = function(arrNewAtts, callerObj) {
                if(!arrNewAtts) return;
                //only available for TableListView
                var arrOldAtts = this._jsxVisibleColumns || [];
                if(!(arrNewAtts instanceof Array)) {
                    arrNewAtts = arrNewAtts.split(",");
                    this.getLogger().info(arrNewAtts);
                }
                var objContent = {arrNewAtts: arrNewAtts, arrOldAtts: arrOldAtts, callerObj: callerObj};
                var veto = this._vetoAndRequestedLoop("onColumnsChange", "columnsChanged",
                        [arrNewAtts, arrOldAtts, callerObj], objContent,
                        "jsxbeforecolumnschanged", CONTAINER.LIST_COLUMNS_CHANGED);
                if(veto) {
                    this._jsxVisibleColumns = jsx3.$A(arrNewAtts).clone();
                    this.jsxcolumns = jsx3.$A(arrNewAtts).join(",");
                }
            };

            /**
             * Gets all visible columns of TableListView ONLY when current displayed view is an
             * instance of TableListView.
             * @return {Array<String>} all Ids of visible columns in Table list view.
             */
            container.getVisibleColumns = function() {
                return !this.jsxcolumns ? "" : this.jsxcolumns;
            };

            /**
             * Gets all visible columns of TableListView ONLY when current displayed view is an
             * instance of TableListView.
             * @return {Array<jsx3.gui.Matrix.Column>} all visible columns of Table list view.
             */
            container.getVisibleColumnObjects = function() {
                //only available for TableListView
                return jsx3.$A(this.getAllColumns()).filter(function(column) {
                    return (column.getDisplay() == jsx3.gui.Block.DISPLAYBLOCK)
                });
            };

            /**
             * Gets all columns of TableListView ONLY when current displayed view is an
             * instance of TableListView.
             * @return {Array<jsx3.gui.Matrix.Column>} all columns of Table list view.
             */
            container.getAllColumns = function() {
                //only available for TableListView
                var view = this.getView();
                if(view && view.instanceOf(CONTAINER.TABLELISTVIEW)) {
                    return view.getDescendantsOfType("jsx3.gui.Matrix.Column");
                }
                return [];
            };

            /**
             * Paginator uses this method to notify all accessories that page change is being requested.
             * @param intNewPage {Integer} - the page to change to
             * @param intOldPage {Integer} - the page being changed from (or 0 if no previous page was set)
             * @param intTotalPages {Integer} - the total number of pages in the data set
             */
            container.onPageChange = function(intNewPage, intOldPage, intTotalPages) {
                // iterate all IListAccessory children and allow them to veto
                // if none veto, publish the pageChange, then iterate them again and notify them of the pageChangeRequest
                var objContext = {intNewPage:intNewPage, intOldPage:intOldPage, intTotalPages:intTotalPages};

                var veto = this._vetoAndRequestedLoop("onPageChange", "pageChangeRequested",
                        arguments, objContext, "jsxbeforepagechange", CONTAINER.LIST_PAGE_CHANGE_REQUESTED);
                return veto
            };

            /**
             * Gets current page number of paginator, <code>null</code> when list container cannot find paginator object.
             * @return {Integer} current page number
             */
            container.getCurrentPage = function() {
                return this.getListPaginator() ? this.getListPaginator().getCurrentPageNumber() : null;
            };

            /**
             * Gets the total page number.
             * @return {Integer} total page number.
             */
            container.getTotalPages = function() {
                return this.getListPaginator() ? this.getListPaginator().getTotalPages() : null;
            };

            /**
             * Used to notify all accessories that a reset is being requested.
             */
            container.reset = function() {
                var veto = this._vetoAndRequestedLoop("onReset", "resetRequested",
                        [], {}, "jsxbeforereset", CONTAINER.LIST_RESET);
                return veto;
            };

            /* Part III, Utility getter API functions to access accessories in ListContainer for final developer */

            /**
             * @private
             */
            container._getSingleChildOfType = function(strType) {
                if(!jsx3.Class.forName(strType)) return null;
                return this.getFirstChildOfType(strType);
            };

            /**
             * @private
             */
            container._getMultiChildOfType = function(strType) {
                if(!jsx3.Class.forName(strType)) return [];
                return this.getDescendantsOfType(strType, true);
            };

            /**
             * Return all accessories contained in ListContainer
             * @return {Array<Object>} array of all accessories
             */
            container.getAllAccessories = function() {
                return this._getMultiChildOfType(CONTAINER.ILISTACCESSORY);
            };

            /**
             * Return all buttons located in right pane of action bar
             * @return {Array<Object>} array of accessories in right pane
             */
            container.getRightPaneAccessories = function() {
                //return [];
                var arr = [].concat(
                        this.getFilterSearch() ? [] : this.getAllSearches(),
                        this.getCustomIconButtons(),
                        this.getViewButtons(),
                        this.getPermissionsButtons(),
                        this.getColumnPickerButton() || [],
                        this.getRefreshButton() || [],
                        this.getHideShowButton() || [],
                        this.getNormalButtons() || []);
                return arr;
            };

            /**
             * Return all accessories located in left pane of action bar
             * @return {Array<Object>} array of accessories in left pane
             */
            container.getLeftPaneAccessories = function() {
                return arr = [].concat(
                          this.getActionButtons(),
                          this.getActionButtonList() || []
                );
            };

            /**
             * Return all listView objects contained in ListContainer
             * @return {Array<Object>} array of all listView objects
             */
            container.getAllViews = function() {
                return this._getMultiChildOfType(CONTAINER.ILISTVIEW);
            };

            /**
             * Return all search objects (Filter, SimpleSearch and AdvancedSearch) contained in ListContainer
             * @return {Array<Object>} array of all search objects
             */
            container.getAllSearches = function() {
                return this._getMultiChildOfType(CONTAINER.ILISTSEARCH);
            };

            /**
             * Return filter search contained in ListContainer
             * @return {tibco.uxcore.gui.FilterSearch} filter search object.
             */
            container.getFilterSearch = function() {
                return this._getSingleChildOfType(CONTAINER.FILTER);
            };
            /**
             * Return simple search contained in ListContainer
             * @return {tibco.uxcore.gui.SimpleSearch} simple search object.
             */
            container.getSimpleSearch = function() {
                return this._getSingleChildOfType(CONTAINER.SIMPLESEARCH);
            };
            /**
             * Return advanced search contained in ListContainer
             * @return {tibco.uxcore.gui.AdvancedSearch} advanced search object.
             */
            container.getAdvancedSearch = function() {
                return this._getSingleChildOfType(CONTAINER.ADVANCEDSEARCH);
            };

            /**
             * Return all action buttons contained in ListContainer
             * @return {Array<tibco.uxcore.gui.ActionButton>} array of all action buttons
             */
            container.getActionButtons = function() {
                return this._getMultiChildOfType(CONTAINER.ACTIONBUTTON);
            };

            container.getActionButtonList = function() {
                return this._getSingleChildOfType(CONTAINER.ACTIONBUTTONLIST);
            };

            /**
             * Return all view buttons contained in ListContainer
             * @return {Array<tibco.uxcore.gui.ViewButton>} array of all view buttons
             */
            container.getViewButtons = function() {
                return this._getMultiChildOfType(CONTAINER.VIEWBUTTON);
            };

            /**
             * Return HideShowButton contained in ListContainer
             * @returen {tibco.uxcore.gui.HideShowButton} HideShowButton if exist, <code>null</code> if not exist.
             */
            container.getHideShowButton = function() {
                return this._getSingleChildOfType(CONTAINER.HIDESHOWBUTTON);
            };

            /**
             * Return RefreshButton contained in ListContainer
             * @returen {tibco.uxcore.gui.RefreshButton} RefreshButton if exist, <code>null</code> if not exist.
             */
            container.getRefreshButton = function() {
                return this._getSingleChildOfType(CONTAINER.REFRESHBUTTON);
            };

            /**
             * Return ColumnPickerButton contained in ListContainer
             * @returen {tibco.uxcore.gui.ColumnPickerButton} ColumnPickerButton if exist, <code>null</code> if not exist.
             */
            container.getColumnPickerButton = function() {
                return this._getSingleChildOfType(CONTAINER.COLUMNPICKERBUTTON);
            };

            /**
             * Return ListPaginator contained in ListContainer
             * @returen {tibco.uxcore.gui.ListPaginator} ListPaginator if exist, <code>null</code> if not exist.
             */
            container.getListPaginator = function() {
                return this._getSingleChildOfType(CONTAINER.LISTPAGINATOR);
            };

            /**
             * Return all permission buttons contained in ListContainer
             * @return {Array<tibco.uxcore.gui.PermissionsButton>} array of all permission buttons
             */
            container.getPermissionsButtons = function() {
                return this._getMultiChildOfType(CONTAINER.PERMISSIONSBUTTON);
            };

            /**
             * Return all custom icon buttons contained in ListContainer
             * @return {Array<tibco.uxcore.gui.IconButton>} array of all  custom icon buttons
             */
            container.getCustomIconButtons = function() {
                return jsx3.$A(this._getMultiChildOfType(CONTAINER.ICONBUTTON)).
                        filter(function(obj) {
                          return (NotInstanceOf(obj, CONTAINER.HIDESHOWBUTTON) &&
                                  NotInstanceOf(obj, CONTAINER.VIEWBUTTON) &&
                                  NotInstanceOf(obj, CONTAINER.COLUMNPICKERBUTTON) &&
                                  NotInstanceOf(obj, CONTAINER.REFRESHBUTTON) &&
                                  NotInstanceOf(obj, CONTAINER.PERMISSIONSBUTTON));
                        });
            };

            /**
             * Return all Normal buttons contained in ListContainer
             * @return {Array<tibco.uxcore.gui.Button>} array of all normal buttons.
             */
            container.getNormalButtons = function() {
                return jsx3.$A(this._getMultiChildOfType(CONTAINER.BUTTON)).
                        filter(function(obj) {
                            return (NotInstanceOf(obj, CONTAINER.CONTAINERBUTTON));
                        });
            };

            /**
             * Return BrowseListView contained in ListContainer
             * @returen {tibco.uxcore.gui.BrowseListView} BrowseListView if exist, <code>null</code> if not exist.
             */
            container.getBrowseView = function() {
                return this._getSingleChildOfType(CONTAINER.BROWSELISTVIEW);
            };

            /**
             * Return TableListView contained in ListContainer
             * @returen {tibco.uxcore.gui.TableListView} TableListView if exist, <code>null</code> if not exist.
             */
            container.getTableListView = function() {
                return this._getSingleChildOfType(CONTAINER.TABLELISTVIEW);
            };

            /**
             * Return TableListBuilder view contained in ListContainer
             * @returen {tibco.uxcore.gui.TableListBuilder} TableListBuilder if exist, <code>null</code> if not exist.
             */
            container.getTableListBuilder = function() {
                return this._getSingleChildOfType(CONTAINER.TABLELISTBUILDER);
            };

            /**
             * Return TableListBuilder view contained in ListContainer
             * @returen {tibco.uxcore.gui.TableListBuilder} TableListBuilder if exist, <code>null</code> if not exist.
             */
            container.getTreeListBuilder = function() {
                return this._getSingleChildOfType(CONTAINER.TREELISTBUILDER);
            };

            /**
             * Return TableSelector view contained in ListContainer
             * @returen {tibco.uxcore.gui.TableSelector} TableSelector if exist, <code>null</code> if not exist.
             */
            container.getTableSelector = function() {
                return this._getSingleChildOfType(CONTAINER.TABLESELECTOR);
            };

            /**
             * Return FilmstripListView contained in ListContainer
             * @returen {tibco.uxcore.gui.FilmstripListView} FilmstripListView if exist, <code>null</code> if not exist.
             */
            container.getFilmstripView = function() {
                return this._getSingleChildOfType(CONTAINER.FILMSTRIPLISTVIEW);
            };

            container.getAccumulator = function() {
                return this._getSingleChildOfType(CONTAINER.ACCUMULATORLISTVIEW);
            };

            container.getMaskBlock = function() {
                return this._getSingleChildOfType(CONTAINER.MASK);
            };

            /**
             *
              * @param strMessage
             */
            container.showMask = function(strMessage) {
                var MaskBlock = tibco.uxcore.gui.ListContainer.MaskBlock;
                //delete any existing mask
                if (this._jsxmaskid) this.hideMask();

                //is there an onscreen instance
                var objGUI;
                if(objGUI = this.getRenderedBox("viewPane")) {
                    //get the true height of the block to mask
                    var intHeight = this.getRenderedBox("viewPane").offsetHeight;

                    //add/replace "onfocus" method for view (this way there is no problem when serializing the model)
                    if (objGUI.onfocus)
                    /* @jsxobf-clobber */
                      objGUI._jsxonfocus = objGUI.onfocus;

                    jsx3.html.addEventListener(objGUI,"onfocus",CONTAINER._focusMask);

                    //add/replace "tabIndex" setting (also for view)
                    if (objGUI.tabIndex) objGUI._jsxtabindex = objGUI.tabIndex;
                    objGUI.tabIndex = 0;

                    //create the mask child (a jsx3.gui.Block instance) and insert directly into the view
                    /* @jsxobf-clobber */
                    this._jsxmaskid  = this.getId() + "_mask";
                    var objMask = (new MaskBlock(this._jsxmaskid,0,0,"100%","100%",strMessage)).setOverflow(Block.OVERFLOWHIDDEN).setFontWeight(Block.FONTBOLD).setTextAlign(Block.ALIGNCENTER).setIndex(0).setRelativePosition(0).setZIndex(32000).setDynamicProperty("jsxbgcolor","@Solid Shadow").setDynamicProperty("jsxbg","@Mask 70%").setDynamicProperty("jsxcursor","@Wait");
                    objMask._jsxisamask = true;
                    objMask.setWidth("100%");
                    objMask.setHeight("100%");
                    objMask.setPadding(parseInt(intHeight / 2));
                    objMask.setEvent("if (objEVENT.tabKey() && objEVENT.shiftKey()) { this.getParent().focus(); }",Interactive.JSXKEYDOWN);
                    objMask.setAttribute("onfocus", "var objEVENT = jsx3.gui.Event.wrap(event); if (objEVENT.shiftKey()) { jsx3.GO(this.id).getParent().focus(); }");
                    this.setChild(objMask);
                    this.paintChild(objMask);
                    objMask.focus(); // In case focus is still on one of the masked form control.
                }
            };

            CONTAINER._focusMask = function(evt) {
                var me = jsx3.GO(this.id);
                if (me) {
                    var objEvent = Event.wrap(evt || window.event); // evt for Fx, window.event for IE
                    if (! objEvent.shiftKey()) {
                        if (me.getChildren().length)
                            me.getLastChild().focus();
                    }
                }
            };

            container.hideMask = function() {
                var objMask;
                if(objMask = this.getChild(this._jsxmaskid)) {
                    //update model
                    this.removeChild(objMask);
                    delete this._jsxmaskid;

                    //update view
                    var objGUI;
                    if(objGUI = this.getRenderedBox("viewPane")) {
                        //remove/replace tabIndex setting used to support masking
                        if (objGUI._jsxtabindex) {
                            objGUI.tabIndex = objGUI._jsxtabindex;
                        } else {
                            objGUI.removeAttribute("tabIndex");
                        }

                        //remove/replace onfocus method used to support masking
                        jsx3.html.removeEventListener(objGUI,"onfocus",Block._focusMask);
                        if(objGUI._jsxonfocus) {
                            objGUI.onfocus = objGUI._jsxonfocus;
                            delete objGUI._jsxonfocus;
                        } else {
                            //objGUI.onfocus = null;
                        }
                    }
                }
            };

            container._needBorder = function() {
                return this.getBrowseView() || this.getAccumulator() ? false : true;
            };

            //For debugger
            //jsx3.gui.Template.precompile("CONTAINER", "container", "tibco.uxcore.gui.ListContainer");
            container.loadTemplate("listcontainer");
});

jsx3.lang.Class.defineClass("tibco.uxcore.gui.ListContainer.MaskBlock", jsx3.gui.Block, null,
function(BLOCK, block) {
});