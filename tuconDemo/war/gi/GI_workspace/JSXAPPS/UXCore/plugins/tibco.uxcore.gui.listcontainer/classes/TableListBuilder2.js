(function(plugIn) {
    jsx3.lang.Class.defineClass("tibco.uxcore.gui.TableListBuilder2", tibco.uxcore.gui.GenericTableView, null,
            function(LISTBUILDER, listbuilder) {

                //static fields
                LISTBUILDER.BEFORE_DELETE_ROW = "jsxbeforedelete";
                LISTBUILDER.BEFORE_ADD_ROW = "jsxbeforeadd";

                listbuilder._cacheData = null; // cached data for table list view,for revert
                listbuilder._editMode = tibco.uxcore.gui.GenericTableView.NORMAL_MODE; // mode for table list view, edit mode or normal

                listbuilder._jsxNextid = 1;
                var Interactive = jsx3.gui.Interactive;

                listbuilder.init = function(strName) {
                    this.jsxsuper(strName);
                    this.myInit();
                };

                listbuilder.myInit = function() {
                    this.loadDefaultProperty();
                    this.setEditMode(tibco.uxcore.gui.GenericTableView.NORMAL_MODE);
                    this.subscribe(Interactive.DRAG, this, this.onDrag);
                    this.subscribe(Interactive.BEFORE_DROP, this, this.onBeforeDrop);
                    this.subscribe(Interactive.BEFORE_EDIT, this, this.onBeforeEdit);
                    this.subscribe(Interactive.AFTER_EDIT, this, this.onAfterEdit);
                    this.subscribe(Interactive.TOGGLE, this, this.onToggle);
                    this.setSelectionModel(jsx3.gui.Matrix.SELECTION_UNSELECTABLE);
                }

                listbuilder.findPos = function(obj) {
                    var orig = obj;
                    var curleft = curtop = 0;
                    if(obj.offsetParent) {
                        do {
                            curleft += obj.offsetLeft;
                            curtop += obj.offsetTop;
                        }
                        while(obj = obj.offsetParent);
                        return [curleft,curtop,orig.offsetWidth,orig.offsetHeight];
                    }
                }

                listbuilder.onBeforeDrop = function(obj) {
                    this.endEditSession();
                    return true;
                }

                listbuilder.onBeforeEdit = function(obj) {
                    var ret = true;
                    if((obj.context.strRECORDID != this.getCurrentId()) && this.getCurrentId()) {
                        this.actionRequested();
                        ret = false;
                    }
                    return ret;
                }

                listbuilder.onAfterEdit = function(obj) {
                    this.handleEdit(obj.context.strRECORDID);
                }

                listbuilder.onDrag = function(obj) {
                    var objEVENT = obj.context.objEVENT;
                    var strDRAGID = obj.context.strDRAGID;
                    var mousePos = {L:objEVENT.clientX(),T:objEVENT.clientY()};
                    var toggle = objEVENT.srcElement();
                    var jsxtype = toggle.getAttribute("jsxtype");
                    if(jsxtype && (jsxtype == "plusminus")) {
                        var togglePos = this.findPos(toggle);
                        if(mousePos.T > togglePos[1]) {
                            if(mousePos.L > togglePos[0]) {
                                if(mousePos.T < (togglePos[1] + togglePos[3])) {
                                    if(mousePos.L < (togglePos[0] + togglePos[2])) {
                                        this.endEditSession();
                                        var me = this;
                                        setTimeout(function() {
                                            if(!me.toggled) {
                                                me.toggleItem(strDRAGID);
                                            }
                                            else {
                                                delete me.toggled;
                                            }
                                        }, 0);
                                    }
                                }
                            }
                        }
                    }
                }

                listbuilder.onToggle = function(obj) {
                    this.toggled = true;
                }

                listbuilder.getCurrentId = function() {
                    return this.complex.currentId;
                }

                listbuilder.generateCurrentId = function() {
                    if(!this.complex.currentId) {
                        this.complex.currentId = jsx3.xml.CDF.getKey();
                    }
                    return this.complex.currentId;
                }

                listbuilder.clearCurrrentId = function() {
                    delete this.complex.currentId;
                }

                listbuilder.moveUp = function(strId, bRepaint) {
                    jsx3.log("Move up requested with strId: " + strId + ", bRepaint: " + bRepaint);
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row up - cannot find row with id " + strId);
                        return;
                    }
                        var parent = record.getParent();
                        if(!parent) {
                            jsx3.log("Cannot move row up - row with id " + strId + " has no parent");
                            return;
                        }
                            var sib = record.getPreviousSibling();
                            if(!sib) {
                                var parentSib = parent.getPreviousSibling();
                                if(!parentSib) {
                                    jsx3.log("Cannot move row up - row with id " + strId + " has no previous sibling and parent has no previous sibling");
                                }
                                else {
                                    parentSib.appendChild(record);
                                    if(bRepaint) {
                                        this.repaintData();
                                        var me = this;
                                        setTimeout(function() {
                                            me.revealRecord(strId);
                                        }, 0);
                                    }
                                    else {
                                        parentSib.setAttribute("jsxopen","1");
                                    }
                                }
                            }
                            else {
                                parent.insertBefore(record, sib);
                                if(bRepaint) {
                                    this.repaintData();
                                    var me = this;
                                    setTimeout(function() {
                                        me.revealRecord(strId);
                                    }, 0);
                                }
                                else {
                                    parent.setAttribute("jsxopen","1");
                                }
                            }
                }

                listbuilder.moveDown = function(strId, bRepaint) {
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row down - cannot find row with id " + strId);
                        return;
                    }
                        var parent = record.getParent();
                        if(!parent) {
                            jsx3.log("Cannot move row down - row with id " + strId + " has no parent");
                            return;
                        }
                            var sib = record.getNextSibling();
                            if(!sib) {
                                var parentSib = parent.getNextSibling();
                                if(!parentSib) {
                                    jsx3.log("Cannot move row down - row with id " + strId + " has no next sibling and parent has no next sibling");
                                }
                                else {
                                    var firstChild = parentSib.getFirstChild();
                                    if(firstChild) {
                                        parentSib.insertBefore(record, firstChild);
                                    }
                                    else {
                                        parentSib.appendChild(record);
                                    }
                                    if(bRepaint) {
                                        this.repaintData();
                                        var me = this;
                                        setTimeout(function() {
                                            me.revealRecord(strId);
                                        }, 0);
                                    }
                                    else {
                                        parentSib.setAttribute("jsxopen","1");
                                    }
                                }
                            }
                            else {
                                var nextSib = sib.getNextSibling();
                                if(nextSib) {
                                    parent.insertBefore(record, nextSib);
                                }
                                else {
                                    parent.appendChild(record);
                                }
                                if(bRepaint) {
                                    this.repaintData();
                                    var me = this;
                                    setTimeout(function() {
                                        me.revealRecord(strId);
                                    }, 0);
                                }
                                else {
                                    parent.setAttribute("jsxopen","1");
                                }
                            }
                }

                listbuilder.moveIn = function(strId, bRepaint) {
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row in - cannot find row with id " + strId);
                        return;
                    }
                        var sib = record.getPreviousSibling();
                        if(!sib) {
                            jsx3.log("Cannot move row in - row with id " + strId + " has no previous sibling");
                            return;
                        }
                            sib.appendChild(record);
                            if(bRepaint) {
                                this.repaintData();
                                var me = this;
                                setTimeout(function() {
                                    me.revealRecord(strId);
                                }, 0);
                            }
                    else {
                                sib.setAttribute("jsxopen","1");
                            }
                }

                listbuilder.moveOut = function(strId, bRepaint) {
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row out - cannot find row with id " + strId);
                        return;
                    }
                        var parent = record.getParent();
                        if(!parent) {
                            jsx3.log("Cannot move row out - row with id " + strId + " has no parent");
                            return;
                        }
                        else if(parent.getAttribute("jsxid") == "jsxroot") {
                            jsx3.log("Cannot move row out - row with id " + strId + " is already at the root level");
                            return;
                        }
                            var gparent = parent.getParent();
                            if(!gparent) {
                                jsx3.log("Cannot move row out - row with id + " + strId + " has not grandparent");
                                return;
                            }
                                var uncle = parent.getNextSibling();
                                if(uncle) {
                                    gparent.insertBefore(record, uncle);
                                }
                                else {
                                    gparent.appendChild(record);
                                }
                    if(bRepaint) {
                                this.repaintData();
                                var me = this;
                                setTimeout(function() {
                                    me.revealRecord(record.getAttribute("jsxid"));
                                }, 0);
                    }
                }

                /**
                 * Used to notify this accessory that an ActionButton action was requested.
                 *
                 * @param actionId {String} - the id of the action that was requested
                 */
                listbuilder.actionRequested = function(actionId) {
                    if(!this._allowUpdateData()) {
                        jsx3.log("Cannot move rows or create new rows in view mode.");
                        return;
                    }
                    if(this.getCurrentId()) {
                        jsx3.log("Cannot move rows or create a new row.  A new row already exists.");
                        var me = this;
                        setTimeout(function() {
//                            me.revealRecord(me.getCurrentId());
                            me.focusRowById(me.getCurrentId());
                        }, 0);
                        return;
                    }
jsx3.log("actionId: " + actionId);
                    jsx3.log("indexof Move: " + actionId.indexOf("Move"));
                    jsx3.log("indexof Add: " + actionId.indexOf("Add"));
                    if(actionId && (actionId.indexOf("Move") == 0)) {
                        jsx3.log("move request");
                        var sel = this.getSelectedIds();
                        jsx3.log("sel: " + sel);
                        if(!sel || (sel.length == 0)) {
                            jsx3.log("Cannot move row - no rows selected");
                        }
                        else {
                            if(actionId == "MoveUp") {
                                jsx3.log("Got move up request");
                                for(var i = 0; i < sel.length; i++) {
                                    jsx3.log("myi: " + i);
                                    var id = sel[i];
                                    var bRepaint = (i == (sel.length - 1));
                                    jsx3.log("id: " + id);
                                    jsx3.log("bRepaint: " + bRepaint);
                                    this.moveUp(id, true); //bRepaint);
                                }
                            }
                            if(actionId == "MoveDown") {
                                for(var i = sel.length - 1; i >= 0; i--) {
                                    this.moveDown(sel[i], true); //i == 0);
                                }
                            }
                            if(actionId == "MoveIn") {
                                for(var i = 0; i < sel.length; i++) {
                                    this.moveIn(sel[i], true); //i == (sel.length - 1));
                                }
                            }
                            if(actionId == "MoveOut") {
                                for(var i = 0; i < sel.length; i++) {
                                    this.moveOut(sel[i], true); //i == (sel.length - 1));
                                }
                            }
                        }
                    }
                    else if(actionId && (actionId.indexOf("Add") == 0)) {
                        var parentId = null;
                        if(actionId == "AddChild") {
                            parentId = this.getSelectedIds()[0];
                        }
                        this.addRow(parentId);
                    }
                }

                listbuilder.addRow = function(strParentId) {
                    this.generateCurrentId();
                    var passed = this._publishEvent(LISTBUILDER.BEFORE_ADD_ROW, {objRECORD:this.getCurrentId()});
                    if(!passed) {
                        this.clearCurrrentId();
                        return;
                    }
                    this.insertRecord({jsxid:this.getCurrentId(),jsxstyle:"background-color: #FBF89F;"}, strParentId);
                    this.setSelectionModel(jsx3.gui.Matrix.SELECTION_UNSELECTABLE);
                    this.getListContainer().clearSelectedRecords();
//                    this.deselectAllRecords();
//                    var sel = this.getXML().selectNodes("//record[@jsxselected='1']");
//                    for(var i = 0; i < sel.size(); i++) {
//                        sel.get(i).setAttribute("jsxselected", "0");
//                    }
                    this.repaintData();
                    var me = this;
                    setTimeout(function() {
//                        me.revealRecord(me.getCurrentId());
                        me.focusRowById(me.getCurrentId());
                    }, 0);
                }

                listbuilder.prepareSelectionModel = function(mode) {
                    if(mode) {
                        this.setSelectionModel(this.getDefaultSelectionModel());
                    }
                    else {
                        this.setSelectionModel(jsx3.gui.Matrix.SELECTION_UNSELECTABLE);
                        if(this.getRendered()) {
                            this.getListContainer().clearSelectedRecords();
                        }
//                        this.deselectAllRecords();
                    }
                }

                listbuilder.handleEdit = function(strRecordId) {
                    var record = this.getRecordNode(strRecordId);
                    var hasData = false;
                    if(record) {
                        var children = this.getChildren();
                        for(var i = 0; i < children.length; i++) {
                            var path = children[i].getPath ? children[i].getPath() : null;
                            if(path && (path != "")) {
                                var att = record.getAttribute(path);
                                if(att && (att != "")) {
                                    hasData = true;
                                    break;
                                }
                            }
                        }
                    }
                    else {
                        jsx3.log("Cannot handle edit.  Record '" + strRecordId + "' not found.");
                    }
                    if(hasData) {
                        var datachange = (strRecordId == this.getCurrentId());
                        record.setAttribute("isModified", "true");
                        if(datachange) {
                            record.setAttribute("isNewRecord", "true");
                            jsx3.log("Resetting style");
                            record.setAttribute("jsxstyle", null);
                            this.redrawRecord(strRecordId, jsx3.xml.CDF.UPDATE);
                        }
//                        var strId = this.getId() + "_jsx_" + strRecordId;
//                        var objDoc = this.getDocument();
//                        var elem = objDoc.getElementById(strId);
//                        elem.style.backgroundColor = null;
                        if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
                            this.setSelectionModel(this.getDefaultSelectionModel());
                            this.getListContainer().selectRecords(strRecordId);
//                            this.selectRecord(strRecordId);
                        }
                        else {
//                            this.repaintData();
                        }
                        if(datachange && (this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER)) {
                            var me = this;
                            jsx3.sleep(function() {this.revealRecord(strRecordId);}, null, this);
                        }
//                        this.revealRecord(strRecordId);
                        this.updateLastDoc();
                        this.ignoreDataChange = true;
                        this._handleMerge(false, datachange ? "datachange" : "edit");
                        if(datachange) {
                            this._handleMerge(false, "select");
                            this.clearCurrrentId();
                        }
                    }
                    return true;
                }

                listbuilder.revealRecord = function(strId,b) {
                    jsx3.log("Reveal record called from: " + (new jsx3.lang.Exception("reveal")).printStackTrace());
                    return this.jsxsuper(strId,b);
                }

                listbuilder.repaint = function() {
                    jsx3.log("repaint");
                    return this.jsxsuper();
                }

                listbuilder.selectRecords = function(strIds, auxId, bMergeToInitialData) {
                    this.jsxsuper(strIds,auxId,bMergeToInitialData);
                    if(strIds && strIds.length > 0) {
                        var me = this;
                        setTimeout(function() {
                            jsx3.log("revealing: " + strIds[strIds.length-1]);
                            me.revealRecord(strIds[strIds.length-1]);
                        },1000);
                    }
                }

                listbuilder.onAfterAssemble = function(objParent) {
                    this.jsxsuper();
                    var children = this.getChildren();
                    for(var i; i < children.length; i++) {
                        var child = children[i];
                        if(child.getPath && (child.getPath() == "jsxid")) {
                            child.setPath(null, true);
                        }
                    }
                    /**
                     this.subscribe(Interactive.AFTER_EDIT, this, function(objContext) {
                     if(objContext.context.strRECORDID){
                     var recordNode = this.getRecordNode(objContext.context.strRECORDID);
                     if(recordNode) {
                     recordNode.setAttribute("isModified",true);
                     recordNode = recordNode.cloneNode();
                     recordNode.setAttribute(objContext.context.objCOLUMN.getPath(),objContext.context.strNEWVALUE);
                     if(objContext.context.strRECORDID != "jsxautorow") {
                     if(this.doEditRecord(objContext.context.strRECORDID,"edited", recordNode, null)) {
                     var me = this;
                     setTimeout(function() {
                     me.updateLastDoc();
                     me._handleMerge(false,"edit");
                     },0);
                     }
                     else {
                     var me = this;
                     setTimeout(function() {
                     me.reapplyLastDoc();
                     },0);
                     }
                     }
                     else {
                     var me = this;
                     setTimeout(function() {
                     me.updateLastDoc();
                     },0);
                     }
                     }
                     else {
                     // try from the cached doc...
                     if(this._lastDoc) {
                     recordNode = this._lastDoc.selectSingleNode("//record[@jsxid='" + objContext.context.strRECORDID + "']");
                     }
                     if(recordNode) {
                     recordNode.setAttribute("isModified",true);
                     }
                     else {
                     return; // do not ask about edits for an uncommited autorow.  That will be done via an add request.
                     }
                     recordNode = recordNode.cloneNode();
                     recordNode.setAttribute(objContext.context.objCOLUMN.getPath(),objContext.context.strNEWVALUE);
                     if(objContext.context.strRECORDID != "jsxautorow") {
                     if(this.doEditRecord(objContext.context.strRECORDID,"edited", recordNode, null)) {
                     var me = this;
                     setTimeout(function() {
                     me.updateLastDoc();
                     me._handleMerge(false,"edit");
                     },0);
                     }
                     else {
                     var me = this;
                     setTimeout(function() {
                     me.reapplyLastDoc();
                     },0);
                     }
                     }
                     else {
                     var me = this;
                     setTimeout(function() {
                     me.updateLastDoc();
                     },0);
                     }
                     }
                     }
                     });
                     **/
                    this.myInit();
                }

                listbuilder.loadDefaultProperty = function() {
                    this.complex = {};
                    this.complex.addImg = this.getDynamicURL("@uxcore10@listBuilder@addButton");
                    this.complex.deleteImg = plugIn.getServer().resolveURI("jsx:///images/list/delete.gif");
                }

                /**
                 * Get the real path of address setted in dynamic property
                 * @param strPropName {String} dynamic property name
                 */
                listbuilder.getDynamicURL = function(strPropName) {
                    var value = plugIn.getServer().getDynamicProperty(strPropName);
                    return value ? plugIn.getServer().resolveURI(value) : null;
                };

                listbuilder.paintButton = function(element, cdfkey, matrix, column, rownumber, server) {
                    //            if(cdfkey == "jsxautorow"){
                    //                  element.innerHTML = '<span style="position: relative; display: -moz-inline-box; width: 16px; height: 16px; cursor: pointer;" onkeydown="jsx3._eb(event,this,\'_ebKeyDown\',0);" onclick="jsx3.html.getJSXParent(this).onClickBuilderButton(\'add\');" jsxtabindex="0" tabindex="0" label="imageButtonMask"><div style="position: relative; height: 16px;"><img src="'+matrix.complex.addImg+'"/></div></span>'
                    //            }
                }

                listbuilder.onClickBuilderButton = function(type, recordId) {
                    var record = this.getRecord(recordId);
                    if(this._publishEvent(LISTBUILDER.BEFORE_DELETE_ROW, {objRECORD:record})) {
                        if(this.doEditRecord(recordId, "deleted", record, null)) {
                            this.deleteRecord(recordId);
                            if(recordId == this.getCurrentId()) {
                                if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
                                    this.setSelectionModel(this.getDefaultSelectionModel());
                                }
                                this.clearCurrrentId();
                            }
                            var me = this;
                            setTimeout(function() {
                                me.updateLastDoc();
                                me._handleMerge(false, "datachange");
                            }, 0);
                        }
                    }
                }

                listbuilder.getModifiedRecords = function() {
                    return this.getXML().selectNodes("//record[@isModified='true']");
                }

                listbuilder.getNewRecords = function() {
                    return this.getXML().selectNodes("//record[@isNewRecord='true']");
                }

                listbuilder.insertRecord = function(objRecord, strParentRecordId, bRedraw) {
                    try {
                        if(objRecord != null) {
                            var origId = objRecord.jsxid;
                            var hasData = false;
                            var children = this.getChildren();
                            for(var i = 0; i < children.length; i++) {
                                var path = children[i].getPath ? children[i].getPath() : null;
                                if(path && (path != "")) {
                                    var att = objRecord[path];
                                    if(att && (att != "")) {
                                        hasData = true;
                                        break;
                                    }
                                }
                            }
                            if(!hasData) {
                                return null;
                            }
                            var insertedRecord = jsx3.gui.Matrix.prototype.insertRecord.call(this, objRecord, strParentRecordId, bRedraw);
                            var passed = this.doEditRecord(insertedRecord.jsxid, "added", insertedRecord.cloneNode(), bRedraw);
                            if(passed) {
                                if(bRedraw) {
                                    this.repaintData();
                                }
                            }
                            else {
                                if(bRedraw) {
                                    var me = this;
                                    setTimeout(function() {
                                        me.reapplyLastDoc();
                                    }, 0);
                                }
                                insertedRecord = null;
                            }
                            return insertedRecord;
                        }
                        else {
                            return false;
                        }
                    }
                    catch(e) {
                        this.getLogger().error("insertRecord error : " + e);
                        return false;
                    }
                }

                listbuilder.onAfterPaint = function(objGUI) {
                    this.jsxsuper(objGUI);
                }

                listbuilder.setRenderingModel = function(MODEL, bSuppressRepaint) {
                    this.jsxsuper(MODEL, true);
                    if(MODEL == jsx3.gui.Matrix.REND_HIER) {
                        this.setSortPath(null);
                        this.setCanSort(jsx3.Boolean.FALSE);
                        this.setSelectionModel(this.getDefaultSelectionModel());
                    }
                    else {
                        this.setSelectionModel(jsx3.gui.Matrix.SELECTION_UNSELECTABLE);
                        if(this.getRendered()) {
                            this.getListContainer().clearSelectedRecords();
                        }
//                        this.deselectAllRecords();
//                        var sel = this.getXML().selectNodes("//record[@jsxselected='1']");
//                        for(var i = 0; i < sel.size(); i++) {
//                            sel.get(i).setAttribute("jsxselected", "0");
//                        }
                    }
                    if(!bSuppressRepaint) {
                        this.repaintData();
                        this.repaint();
                    }
                };

                listbuilder.setSelectionModel = function(intType) {
                    if(this._allowUpdateData() && (intType != jsx3.gui.Matrix.SELECTION_UNSELECTABLE) &&
                       (this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER)) {
                        jsx3.log("setting default model: " + this.getDefaultSelectionModel());
                        return this.jsxsuper(this.getDefaultSelectionModel());
                    }
                    jsx3.log("setting unselectable");
                    return this.jsxsuper(jsx3.gui.Matrix.SELECTION_UNSELECTABLE);
                }

                listbuilder.setDefaultSelectionModel = function(intType) {
                    this.defaultSelectionModel = intType;
                }

                listbuilder.getDefaultSelectionModel = function() {
                    if((this.defaultSelectionModel == null) || (typeof this.defaultSelectionModel == "undefined") ||
                       (this.defaultSelectionModel === jsx3.gui.Matrix.SELECTION_UNSELECTABLE)) {
                        jsx3.log("returning multirow: " + jsx3.gui.Matrix.SELECTION_MULTI_ROW);
                        return jsx3.gui.Matrix.SELECTION_MULTI_ROW;
                    }
                    jsx3.log("returning " + this.defaultSelectionModel);
                    return this.defaultSelectionModel;
                }

                listbuilder.setSortPath = function(strPath) {
                    if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
                        return this.jsxsuper(null);
                    }
                    return this.jsxsuper(strPath);
                }

                listbuilder.setCanSort = function(bCanSort) {
                    if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
                        return this.jsxsuper(jsx3.Boolean.FALSE);
                    }
                    return this.jsxsuper(bCanSort);
                }

                /**
                 * doEvent wrapped funciton with try-catch sentence.
                 * @private
                 */
                listbuilder._publishEvent = function(topicId, objContent) {
                    try {
                        var result = this.doEvent(topicId, objContent);
                        return result === false ? false : true;
                    }
                    catch(ex) {
                        this.getLogger().error("publishEvent error, with topicId=" + topicId + " :" + ex);
                        return false;
                    }
                };

                /**
                 * Get a logger instance with class name as identity
                 */
                /*listbuilder.getLogger = function() {
                 return jsx3.util.Logger.getLogger(this.getClass().getName());
                 };*/

                listbuilder.setBuilderMode = function(isBuilderMode, bNoRepaint) {
                    var col = this.getDescendantOfName("imageButtonColumn");
                    if(isBuilderMode) {
                        this._editMode = tibco.uxcore.gui.GenericTableView.EDIT_MODE;
                        if(col) {
                            col.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);
                        }
                    }
                    else {
                        this._editMode = tibco.uxcore.gui.GenericTableView.NORMAL_MODE;
                        if(col) {
                            col.setDisplay(jsx3.gui.Block.DISPLAYNONE);
                        }
                    }
                    if(!bNoRepaint) {
                        this.repaintData();
                    }
                    return this;
                }

                /**
                 * veto function for parent vote process
                 * @private
                 */
                listbuilder._allowUpdateData = function() {
                    return this.isEditMode();
                }

                /**
                 * set the edit mode for table list
                 */
                listbuilder.setEditMode = function(mode, bRepaint) {
                    this.setBuilderMode(mode, true);
                    this.prepareSelectionModel(mode);
                    this.preProcessData();
                    this.updateLastDoc();
                    if(bRepaint) {
                        this.repaint();
                        this.repaintData();
                    }
                    return this;
                }

            }
            );

})(this);