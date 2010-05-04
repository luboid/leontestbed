(function(plugIn) {
    jsx3.lang.Class.defineClass("tibco.uxcore.gui.TreeListBuilder", tibco.uxcore.gui.GenericTableView, null,
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

                listbuilder.paintButton = function() {
                    //do nothing
                }

                listbuilder.myInit = function() {
                    delete this.isInToggle;
                    this.loadDefaultProperty();
                    this.clearCurrentId();
                    this.setEditMode(tibco.uxcore.gui.GenericTableView.NORMAL_MODE);
                    var me = this;
                    this.subscribe(Interactive.DRAG, me, me.onDrag);
                    this.subscribe(Interactive.BEFORE_DROP, me, me.onBeforeDrop);
                    this.subscribe(Interactive.DROP, me, me.onDrop);
                    this.subscribe(Interactive.BEFORE_EDIT, me, me.onBeforeEdit);
                    this.subscribe(Interactive.AFTER_EDIT, me, me.onAfterEdit);
                    this.subscribe(Interactive.TOGGLE, me, me.onToggle);
                    this.setSelectionModel(this.getUserSelectionModel());
                }


                listbuilder.findPos = function(obj) {
                    var orig = obj;
                    var curleft = curtop = 0;
                    if(obj.offsetParent) {
                        do {
                            curleft += (obj.offsetLeft - obj.scrollLeft);
                            curtop += (obj.offsetTop - obj.scrollTop);
                        }
                        while(obj = obj.offsetParent);
                        return [curleft,curtop,orig.offsetWidth,orig.offsetHeight];
                    }
                }

                listbuilder.doEvent = function(strType, objContext) {
//                    jsx3.log("doEvent - type: " + strType);
                    delete this._testEvent;
                    var ok = this.jsxsupermix(strType, objContext);
//                    jsx3.log("ok: " + ok);
//                    jsx3.log("testEvent: " + this._testEvent);
                    var ret = ((ok !== false) && (this._testEvent !== false));
//                    jsx3.log("ret: " + ret);

                    if(ret) {
                        ret = ok;
                    }
                    delete this._testEvent;
//                    jsx3.log("Returning: " + ret);
                    return ret;
                };

                listbuilder.allowDrop = function(recordId, refId, bInsert) {
//                    jsx3.log("Allow drop")
//                    jsx3.log("insert: " + bInsert);
//                    jsx3.log("record to drop: " + recordId);
//                    jsx3.log("Target record: " + refId);
                    if(recordId == refId) {
//                        jsx3.log("Drop record and target record are the same...canceling");
                        return false;
                    }
                    var record = this.getRecordNode(recordId);
                    if(record.getAttribute("uxcore_deleted") || record.getAttribute("uxcore_parentDeleted")) {
                        return false;
                    }
                    var refNode = refId ? this.getRecordNode(refId) : null;
                    if(!refNode) {
//                        jsx3.log("Reference id not found for drop event");
                        return false;
                    }
                    var parent = record.getParent();
                    var parentId = parent.getAttribute("jsxid");
//                    jsx3.log("Parent record: " + parentId);
                    if((refId == parentId) && !bInsert) {
                        if(parent.getAttribute("uxcore_deleted") || parent.getAttribute("uxcore_parentDeleted")) {
                            return false;
                        }
//                        jsx3.log("adding to same parent...checking for being in last position already")
                        // adding to same parent, check if same index.
                        var lastRecordId = parent.getLastChild().getAttribute("jsxid");
//                        jsx3.log("Last record id: " + lastRecordId);
                        if(lastRecordId == recordId) {
//                            jsx3.log("Is in last position");
                            // appending when it is already the last child in this parent
                            return false;
                        }
//                        jsx3.log("Is not already in last position");
                    }
                    else if(bInsert) {
//                        jsx3.log("Inserting before target");
                        var refParent = refNode.getParent();
                        if(refParent.getAttribute("uxcore_deleted") || refParent.getAttribute("uxcore_parentDeleted")) {
                            return false;
                        }
                        var nextSib = record.getNextSibling();
//                        jsx3.log("Next sibling: " + nextSib);
                        if(nextSib && (nextSib.getAttribute("jsxid") == refId)) {
//                            jsx3.log("Insert is requested to be before next sibling...not moving, cancelling");
                            // trying to add before same sibling it is already before
                            return false;
                        }
                    }
                    else {
                        if(refNode.getAttribute("uxcore_deleted") || refNode.getAttribute("uxcore_parentDeleted")) {
                            return false;
                        }
                    }
                    if(this.getRenderingModel() != jsx3.gui.Matrix.REND_HIER) {
                        if(this.getCanSort() !== jsx3.Boolean.FALSE) {
//                           jsx3.log("Cannot insert in a sortable list");
                           return false;
                        }
                        else if(!bInsert) {
//                            jsx3.log("Canot append in non-hierarchical modes");
                            return false;
                        }
                    }
                    else {
                        if((this.getCanSort() !== jsx3.Boolean.FALSE) && bInsert) {
//                           jsx3.log("Cannot insert in a sortable list");
                           return false;
                        }
                    }
                    return true;
                }

                listbuilder.allowDropAll = function(recordIds, newParentId, bInsert) {
                    for(var i=0; i<recordIds.length; i++) {
                        var allow = this.allowDrop(recordIds[i],newParentId,bInsert);
                        if(!allow) {
                            return false;
                        }
                    }
                    return true;
                }

                listbuilder.onBeforeDrop = function(obj) {
                    this.endEditSession();
                    var objNode = obj.context.objEVENT.toElement();
                    while (objNode.getAttribute("jsxtype") != "record") {
                      objNode = objNode.parentNode;
                      if (!objNode.tagName || objNode.tagName.toLowerCase() == "body" || objNode.id == this.getId()) {
                        objNode = null;
                        break;
                      }
                    }
                    var insertBefore = (this.getRenderingModel() != jsx3.gui.Matrix.REND_HIER) ||
                                       (this.getAbsolutePosition(this.getRendered(obj.context.objEVENT),objNode).H/3 > obj.context.objEVENT.getOffsetY());
                    this._testEvent = this.allowDropAll(obj.context.strDRAGIDS,obj.context.strRECORDID, insertBefore);
                    return this._testEvent;
                }

                listbuilder.onDrop = function(obj) {
                    this._testEvent = this.allowDropAll(obj.context.strDRAGIDS,obj.context.strRECORDID,obj.context.bINSERTBEFORE);
                    if(this._testEvent) {
                    for(var i=0; i<obj.context.strDRAGIDS.length; i++) {
                        var record = this.getRecordNode(obj.context.strDRAGIDS[i]);
                        if(record) {
                            this.doEditRecord(obj.context.strDRAGIDS[i],"moved",record.cloneNode(),obj.context.bINSERTBEFORE);
                        }
                    }
                    }
                    return this._testEvent;
                }

                listbuilder.onBeforeEdit = function(obj) {
                    var ret = true;
                    if(this._editMode !== tibco.uxcore.gui.GenericTableView.EDIT_MODE) {
                        this._testEvent = false;
                        ret = false;
                    }
                    var record = this.getRecordNode(obj.context.strRECORDID);
                    if(!record || record.getAttribute("uxcore_deleted") || record.getAttribute("uxcore_parentDeleted")) {
                        this._testEvent = false;
                        ret = false;
                    }
                    return ret;
                }

                listbuilder.onAfterEdit = function(obj) {
                    this.handleEdit(obj.context.strRECORDID);
                }

                listbuilder.onDrag = function(obj) {
                    delete this.isInToggle;
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
                                        var me = this;
                                        this.isInToggle = true;
                                        this.endEditSession();
                                        setTimeout(function() {
                                            if(!me.toggled) {
                                                me.toggleItem(strDRAGID);
                                                me.endEditSession();
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

                listbuilder.clearCurrentId = function() {
                    delete this.complex.currentId;
                }

                listbuilder.moveUp = function(strId, bRepaint) {
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row up - cannot find row with id " + strId);
                        return;
                    }
                    if(record.getAttribute("uxcore_deleted") || record.getAttribute("uxcore_parentDeleted")) {
                        return
                    }
                        var parent = record.getParent();
                        if(!parent) {
                            jsx3.log("Cannot move row up - row with id " + strId + " has no parent");
                            return;
                        }
                            var sib = record.getPreviousSibling();
                            while(sib && (sib.getAttribute("uxcore_deleted") || sib.getAttribute("uxcore_parentDeleted"))) {
                                sib = sib.getPreviousSibling();
                            }
                            if(!sib) {
                                var parentSib = parent.getPreviousSibling();
                                while(parentSib && (parentSib.getAttribute("uxcore_deleted") || parentSib.getAttribute("uxcore_parentDeleted"))) {
                                    parentSib = parentSib.getPreviousSibling();
                                }
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
                    this.updateLastDoc();
                    this._handleMerge(false, "datachange");
                }

                listbuilder.moveDown = function(strId, bRepaint) {
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row down - cannot find row with id " + strId);
                        return;
                    }
                    if(record.getAttribute("uxcore_deleted") || record.getAttribute("uxcore_parentDeleted")) {
                        return
                    }
                        var parent = record.getParent();
                        if(!parent) {
                            jsx3.log("Cannot move row down - row with id " + strId + " has no parent");
                            return;
                        }
                            var sib = record.getNextSibling();
                            while(sib && (sib.getAttribute("uxcore_deleted") || sib.getAttribute("uxcore_parentDeleted"))) {
                                sib = sib.getNextSibling();
                            }
                            if(!sib) {
                                var parentSib = parent.getNextSibling();
                                while(parentSib && (parentSib.getAttribute("uxcore_deleted") || parentSib.getAttribute("uxcore_parentDeleted"))) {
                                    parentSib = parentSib.getNextSibling();
                                }
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
                    this.updateLastDoc();
                    this._handleMerge(false, "datachange");
                }

                listbuilder.moveIn = function(strId, bRepaint) {
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row in - cannot find row with id " + strId);
                        return;
                    }
                    if(record.getAttribute("uxcore_deleted") || record.getAttribute("uxcore_parentDeleted")) {
                        return
                    }
                        var sib = record.getPreviousSibling();
                        while(sib && (sib.getAttribute("uxcore_deleted") || sib.getAttribute("uxcore_parentDeleted"))) {
                            sib = sib.getPreviousSibling();
                        }
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
                    this.updateLastDoc();
                    this._handleMerge(false, "datachange");
                }

                listbuilder.moveOut = function(strId, bRepaint) {
                    var record = this.getRecordNode(strId);
                    if(!record) {
                        jsx3.log("Cannot move row out - cannot find row with id " + strId);
                        return;
                    }
                    if(record.getAttribute("uxcore_deleted") || record.getAttribute("uxcore_parentDeleted")) {
                        return
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
                            if(gparent.getAttribute("uxcore_deleted") || gparent.getAttribute("uxcore_parentDeleted")) {
                                return
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
                    this.updateLastDoc();
                    this._handleMerge(false, "datachange");
                }

                listbuilder.doFocusRecord = function(strId,type,actionId) {
                    var record = this.getRecordNode(strId);
                    if(record) {
                        var index = this.doEvent("onfocusrecord",{strRECORDID:strId,objRECORD:record,type:type,action:actionId});
                        if(index) {
                            this.focusCellByIndex(strId,index);
                        }
                        else {
                            this.focusRowById(strId);
                        }
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
                    if(!actionId && this.getCurrentId()) {
                            var me = this;
                            setTimeout(function() {
                                me.doFocusRecord(me.getCurrentId(),"refocusNewRecord",actionId);
                            }, 0);
                            return;
                    }
                    if(actionId && (actionId.indexOf("Move") == 0)) {
                        var sel = this.getSelectedIds();
                        if(!sel || (sel.length == 0)) {
                            jsx3.log("Cannot move row - no rows selected");
                        }
                        else if(this.getCanSort() !== jsx3.Boolean.FALSE) {
                                jsx3.log("Cannot add move rows in a sortable list");
                        }
                        else {
                            if(actionId == "MoveUp") {
                                for(var i = 0; i < sel.length; i++) {
                                    var id = sel[i];
                                    var bRepaint = (i == (sel.length - 1));
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
                            if(this.getCurrentId()) {
                                var rec = this.getRecord(this.getCurrentId());
                                if(rec && (rec.getParent().getAttribute("jsxid") == parentId)) {
                                    var me = this;
                                    setTimeout(function() {
                                        me.doFocusRecord(me.getCurrentId(),"refocusNewRecord",actionId);
                                    }, 0);
                                    return;
                                }
                                else {
                                    this.deleteRecord(this.getCurrentId());
                                    this.clearCurrentId();
                                }
                            }
                        }
                        else if(actionId == "AddRow") {
                            if(this.getCurrentId()) {
                                var rec = this.getRecordNode(this.getCurrentId());
                                if(rec && (rec.getParent().getAttribute("jsxid") == "jsxroot")) {
                                  var me = this;
                                  setTimeout(function() {
                                      me.doFocusRecord(me.getCurrentId(),"refocusNewRecord",actionId);
                                  }, 0);
                                  return;
                                }
                                else {
                                    this.deleteRecord(this.getCurrentId());
                                    this.clearCurrentId();
                                }
                            }
                        }
                        else {
                            return;
                        }
                        this.addRow(parentId,actionId);
                    }
                    else if(actionId && (actionId == "DeleteRows")) {
                        var sel = this.getSelectedIds();
                        if(!sel || (sel.length == 0)) {
                            jsx3.log("Cannot delete rows - no rows selected");
                        }
                        else {
                            this.deleteRows(sel);
                        }
                    }
                }

                listbuilder.deleteRows = function(sel) {
                    for(var i = sel.length - 1; i >= 0; i--) {
                        this.deleteRecord(sel[i], true);
                    }
                    var me = this;
                    setTimeout(function() {
                        me.updateLastDoc();
                        me._handleMerge(false, "datachange");
                    }, 0);
                }

                listbuilder.addRow = function(strParentId,actionId) {
                    this.generateCurrentId();
                    var passed = this._publishEvent(LISTBUILDER.BEFORE_ADD_ROW, {objRECORD:this.getCurrentId()});
                    if(!passed) {
                        this.clearCurrentId();
                        return;
                    }
                    this.insertRecord({jsxid:this.getCurrentId(),jsxstyle:"background-color: #FBF89F;"}, strParentId);
                    this.setSelectionModel(jsx3.gui.Matrix.SELECTION_UNSELECTABLE);
                    this.getListContainer().clearSelectedRecords();
                    this.repaintData();
                    var me = this;
                    setTimeout(function() {
                        me.doFocusRecord(me.getCurrentId(),"focusNewRecord",actionId);
                    }, 0);
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
                        var newRow = (strRecordId == this.getCurrentId());
//                        jsx3.log("newRow: " + newRow);
                        record.setAttribute("isModified", "true");
                        if(newRow) {
                            record.setAttribute("isNewRecord", "true");
                            record.setAttribute("jsxstyle", null);
                            var passed = this._publishEvent("jsxbeforeadd",{objRECORD:strRecordId});
                            if(passed) {
                                passed = this.doEditRecord(strRecordId,"added",record.cloneNode(),false);
                            }
                            if(passed) {
                                this._handleMerge(false, "datachange");
                                if(this.getCurrentId()) {
                                    this.clearCurrentId();
                                    this.setSelectionModel(this.getUserSelectionModel());
                                }
                            }
                            else {
                                var me = this;
                                setTimeout(function() {
//                                    jsx3.log("reapplying last doc");
                                    me.reapplyLastDoc();
                                },0);
//                                jsx3.log("returning false");
                                return false;
                            }
                        }
                        else {
//                            var passed = this._publishEvent("jsxbeforeedit",{objRECORD:strRecordId});
                            var passed = this.doEditRecord(strRecordId,"edited",record.cloneNode(),false);
                            if(!passed) {
                                var me = this;
                                setTimeout(function() {
//                                    jsx3.log("reapplying last doc");
                                    me.reapplyLastDoc();
                                },0);
//                                jsx3.log("returning false");
                                return false;
                            }
                        }
//                        jsx3.log("continuing");
                        if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
                            if(this.getSelectionModel() != jsx3.gui.Matrix.SELECTION_UNSELECTABLE) {
//                                jsx3.log("Selecting record");
                                this.getListContainer().selectRecords(strRecordId);
                            }
                        }
                        else {
//                            jsx3.log("Repainting data");
                            jsx3.sleep(function(){this.repaintData();},null,this);
                        }
                        if(newRow && (this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER)) {
//                            jsx3.log("queing revel record");
                            jsx3.sleep(function() {this.revealRecord(strRecordId);}, null, this);
                        }
//                        jsx3.log("Updating last doc");
                        this.updateLastDoc();
                        this.ignoreDataChange = true;
//                        jsx3.log("Queing events");
                        jsx3.sleep(
                                function() {
                                    if(!newRow) {
//                                        jsx3.log("merge edit");
                                       this._handleMerge(false, "edit");
                                    }
                                    else {
                                        if(this.getSelectionModel() != jsx3.gui.Matrix.SELECTION_UNSELECTABLE) {
//                                            jsx3.log("merge select");
                                            this._handleMerge(false, "select");
                                        }
                                    }
                                    if(newRow) {
                                        this.redrawRecord(strRecordId, jsx3.xml.CDF.UPDATE);
                                    }
                                },null, this);
                    }
//                    jsx3.log("Returning true");
                    return true;
                }

                listbuilder.revealRecord = function(strId,b) {
                    return this.jsxsuper(strId,b);
                }

                listbuilder.repaint = function() {
                    return this.jsxsuper();
                }

                listbuilder.selectRecords = function(strIds, auxId, bMergeToInitialData) {
                    this.jsxsuper(strIds,auxId,bMergeToInitialData);
                    if(strIds && strIds.length > 0) {
                        var me = this;
                        setTimeout(function() {
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

                listbuilder.onClickBuilderButton = function(type, recordId) {
                    this.deleteRecord(recordId);
                }

                listbuilder.markChildrenDeleted = function(node) {
                    var iter = node.getChildIterator();
                    while(iter.hasNext()) {
                        var child = iter.next();
                        child.setAttribute("uxcore_parentDeleted","1");
                        this.markChildrenDeleted(child);
                    }
                }

                listbuilder.deleteRecord = function(recordId, bIgnoreMerge) {
                    var recordNode = false;
                    var caller = jsx3.lang.getCaller().jsxmethod + "";
                    if(caller == "jsx3.xml.CDF.adoptRecord") {
                        return this.jsxsuper(recordId);
                    }
                    var record = this.getRecord(recordId);
                    var bRepaint = false;
                    if(this._publishEvent(LISTBUILDER.BEFORE_DELETE_ROW, {objRECORD:record})) {
                        if(this.doEditRecord(recordId, "deleted", record, null)) {
                            if(!this._getCacheData() || !this._getCacheData().selectSingleNode("//record[@jsxid='" + recordId + "']")) {
                                recordNode = this.jsxsuper(recordId);
                            }
                            else {
                                recordNode = this.getRecordNode(recordId);
                                recordNode.setAttribute("uxcore_deleted","1");
                                this.markChildrenDeleted(recordNode);
                                bRepaint = true;
                            }
                            if(recordId == this.getCurrentId()) {
                                this.clearCurrentId();
                            }
                            if(!bIgnoreMerge) {
                                var me = this;
                                setTimeout(function() {
                                    jsx3.log("Handle data change");
                                    me.updateLastDoc();
                                    me._handleMerge(false, "datachange");
                                }, 0);
                            }
                        }
                    }
                    if(bRepaint) {
                        this.repaintData();
                    }
                    return recordNode;
                }

                listbuilder.getModifiedRecords = function() {
                    return this.getXML().selectNodes("//record[@isModified='true']");
                }

                listbuilder.getNewRecords = function() {
                    return this.getXML().selectNodes("//record[@isNewRecord='true']");
                }

                listbuilder.adoptRecordBefore = function(strSourceId, strRecordId, strSiblingRecordId, bRedraw) {
                    var ret = jsx3.xml.CDF.prototype.adoptRecordBefore.apply(this,arguments);
                    this.repaintData();
                    this.updateLastDoc();
                    this._handleMerge(false, "datachange");
                    return ret;
                }

                listbuilder.adoptRecord = function(strSourceId, strRecordId, strParentRecordId, bRedraw) {
                    var ret = jsx3.xml.CDF.prototype.adoptRecord.apply(this,arguments);
                    this.repaintData();
                    this.updateLastDoc();
                    this._handleMerge(false, "datachange");
                    return ret;
                }

                listbuilder.insertRecord = function(objRecord, strParentRecordId, bRedraw) {
                    try {
                        if(objRecord != null) {
                            var origId = objRecord.jsxid;
                            var newRow = (origId == this.getCurrentId());
                            var hasData = false;
                            var children = this.getChildren();
                            for(var i = 0; i < children.length; i++) {
                                var path = children[i].getPath ? children[i].getPath() : null;
                                if(path && (path != "") && (path != "jsxid")) {
                                    var att = objRecord[path];
                                    if(att && (att != "")) {
//                                        jsx3.log("Data!  path: '" + att + "'");
                                        hasData = true;
                                        break;
                                    }
                                }
                            }
                            if(!hasData && !newRow) {
                                return null;
                            }
                            var insertedRecord = null;
                            try {
                                insertedRecord = jsx3.gui.Matrix.prototype.insertRecord.call(this, objRecord, strParentRecordId, false);
                            }
                            catch(ex) {
                                return false;
                            }
                            if(!newRow) {
                            var passed = this.doEditRecord(insertedRecord.jsxid, "added", insertedRecord.cloneNode(), bRedraw);
                            if(passed) {
                                if(bRedraw) {
                                    this.repaintData();
                                    this.updateLastDoc();
                                    this._handleMerge(false, "datachange");
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
                            }
                            return insertedRecord;
                        }
                        else {
                            return false;
                        }
                    }
                    catch(e) {
                        this.getLogger().error("insertRecord error : " + jsx3.lang.NativeError.wrap(e).printStackTrace());
                        return false;
                    }
                }

                listbuilder.onAfterPaint = function(objGUI) {
                    this.jsxsuper(objGUI);
                    jsx3.sleep(function() {this.onAfterRepaintData();}, null, this);
                }

                listbuilder.repaintData = function() {
                    this.jsxsuper();
                    jsx3.sleep(function() {this.onAfterRepaintData();}, null, this);
                }

                listbuilder.onAfterRepaintData = function() {
                    if(this.getCurrentId() && (jsx3.CLASS_LOADER.getType().indexOf("ie") != -1)) {
                        var strId = this.getId() + "_jsx_" + this.getCurrentId();
                        var objDoc = this.getDocument();
                        var elem = objDoc.getElementById(strId);
                        if(elem) {
                            elem.style.backgroundColor = null;
                            this.findCells(elem);
                        }
                    }
                    if(this.getCurrentId()) {
                        jsx3.sleep(function() {
                            this.doFocusRecord(this.getCurrentId(),"focusOnRepaint",null);
                        }, null, this);
                    }
                }

                listbuilder.findCells = function(elem) {
                    for(var i=0; i<elem.childNodes.length; i++) {
                        if(elem.childNodes[i].className == "jsx30matrixcolumn_cell") {
                            elem.childNodes[i].style.backgroundColor = "";
                        }
                        else {
                            this.findCells(elem.childNodes[i]);
                        }
                    }
                }

                listbuilder.setRenderingModel = function(MODEL, bSuppressRepaint) {
                    this.jsxsuper(MODEL, bSuppressRepaint);
                    this.getListContainer().onModelChanged(MODEL);
                };

                listbuilder.setCanDrag = function(intDrag) {
                    return jsx3.gui.Interactive.prototype.setCanDrag.call(this, jsx3.Boolean.TRUE);
                }

                listbuilder.setSortPath = function(strPath) {
                    return this.jsxsuper(strPath);
                }

                listbuilder.setCanSort = function(bCanSort) {
                    var ret = this.jsxsuper(bCanSort);
                    if(!bCanSort) {
                        this.setSortPath(null);
                        this.setSortDirection(null);
                    }
                    this.repaint();
                    this.repaintData();
                    this.getListContainer().onCanSortChanged(bCanSort);
                    return ret;
                }

                /**
                 * doEvent wrapped funciton with try-catch sentence.
                 * @private
                 */
                listbuilder._publishEvent = function(topicId, objContent) {
                    try {
                        var result = this.doEvent(topicId, objContent);
                        return result !== false;
                    }
                    catch(ex) {
                        this.getLogger().error("publishEvent error, with topicId=" + topicId + " :" + ex);
                        return false;
                    }
                };

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

                listbuilder.setData = function(cdf, intCurrentPage, intTotalPages, strId, bMergeToInitialData) {
                    // set the data on the matrix
                    if(!this._cacheData) {
                        bMergeToInitialData = true;
                    }
                    this.setXMLString(cdf ? cdf.getXML() : null);
                    this.resetXmlCacheData();
                    this.preProcessData();
                    var records = this.getXML().selectNodes("//record[@jsxselected='1']");
                    jsx3.$A(records.toArray()).each(function(record){
                        record.setAttribute("jsxselected", "0");
                    });
                    this._handleMerge(bMergeToInitialData !== false,"datachange");
                    this.repaintData();
                }

                listbuilder.setUserSelectionModel = function(intModel) {
                    this.userselectionmodel = intModel;
                }

                listbuilder.getUserSelectionModel = function() {
                    return this.userselectionmodel ? this.userselectionmodel : jsx3.gui.Matrix.SELECTION_MULTI_ROW;
                }

                /**
                 * set the edit mode for table list
                 */
                listbuilder.setEditMode = function(mode, bRepaint) {
                    this.setBuilderMode(mode, true);
                    this.preProcessData();
                    this.updateLastDoc();
                    if(bRepaint) {
                        this.repaint();
                        this.repaintData();
                    }
                    return this;
                }

                listbuilder.isDirty = function() {
                    return !tibco.uxcore.util.MatrixHelper.isCDFDataEqual(this._getCacheData(),this.getData(),["jsxdisabled","jsxopen","isModified","isNewRecord","jsxselected"],true,true);
                }

            }
            );

})(this);