(function(plugIn) {
jsx3.lang.Class.defineClass("tibco.uxcore.gui.TableListBuilder", tibco.uxcore.gui.GenericTableView, null,
    function(LISTBUILDER, listbuilder) {

        //static fields
        LISTBUILDER.BEFORE_DELETE_ROW = "jsxbeforedelete";
        LISTBUILDER.BEFORE_ADD_ROW = "jsxbeforeadd";

        listbuilder._cacheData = null; // cached data for table list view,for revert
        listbuilder._editMode = tibco.uxcore.gui.GenericTableView.NORMAL_MODE; // mode for table list view, edit mode or normal

        listbuilder._jsxNextid = 1;
        var Interactive = jsx3.gui.Interactive;

        listbuilder.init = function(strName){
            this.jsxsuper(strName);
            this.loadDefaultProperty();
            this._editMode = tibco.uxcore.gui.GenericTableView.EDIT_MODE;
        };

        listbuilder.onAfterAssemble = function(objParent) {
            this.jsxsuper();
            var children = this.getChildren();
            for(var i; i<children.length; i++) {
                var child = children[i];
                if(child.getPath && (child.getPath() == "jsxid")) {
                    child.setPath(null, true);
                }
            }
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
            this._editMode = tibco.uxcore.gui.GenericTableView.EDIT_MODE;
            this.loadDefaultProperty();
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
            if(cdfkey == "jsxautorow"){
                  element.innerHTML = '<span style="position: relative; display: -moz-inline-box; width: 16px; height: 16px; cursor: pointer;" onkeydown="jsx3._eb(event,this,\'_ebKeyDown\',0);" onclick="jsx3.html.getJSXParent(this).onClickBuilderButton(\'add\');" jsxtabindex="0" tabindex="0" label="imageButtonMask"><div style="position: relative; height: 16px;"><img src="'+matrix.complex.addImg+'"/></div></span>'
            }
        }

        listbuilder.onClickBuilderButton = function(type,recordId){
            if(type == 'add'){
                var jis = this.getAutoRowSession();
                var oldId = jis.jsxid;
                if(this._publishEvent(LISTBUILDER.BEFORE_ADD_ROW,{objRECORD:jis})){
                    this.commitAutoRowSession();
                }
            }
            else{
                var record = this.getRecord(recordId);
                if(this._publishEvent(LISTBUILDER.BEFORE_DELETE_ROW,{objRECORD:record})){
                    if(this.doEditRecord(recordId,"deleted",record,null)) {
                        this.deleteRecord(recordId);
                        var me = this;
                        setTimeout(function() {
                            me.updateLastDoc();
                            me._handleMerge(false,"datachange");
                        },0);
                    }
                }
            }
        }

        listbuilder.getModifiedRecords = function(){
            return this.getXML().selectNodes("//record[@isModified='true']");
        }

        listbuilder.getNewRecords = function(){
            return this.getXML().selectNodes("//record[@isNewRecord='true']");
        }

        listbuilder.insertRecord = function(objRecord, strParentRecordId, bRedraw) {
            try{
                if(objRecord != null){
                    var origId = objRecord.jsxid;
                    var hasData = false;
                    for(var name in objRecord) {
                        if((name != "jsxid") && objRecord[name] && (objRecord[name] != "")) {
                            hasData = true;
                            break;
                        }
                    }
                    if(!hasData) {
                        return null;
                    }
                    if(!((objRecord.jsxid == "jsxautorow") && !bRedraw))
                        objRecord.jsxid = 'jsx_' + this.getNextJsxId();
                    objRecord.isModified = true;
                    objRecord.isNewRecord = true;
                    var insertedRecord = jsx3.gui.Matrix.prototype.insertRecord.call(this, objRecord, strParentRecordId, bRedraw);
                    var passed = this._publishEvent(LISTBUILDER.BEFORE_ADD_ROW,{objRECORD:insertedRecord.jsxid})
                    if(passed) {
                        passed = this.doEditRecord(insertedRecord.jsxid,"added",insertedRecord.cloneNode(),bRedraw);
                    }
                    if(passed) {
                        if(bRedraw) {
                            delete this.complex.autorowsession;
                            this.complex.dataChange = true;
                            this.complex.dataChangeOrigId = origId;
                            this.repaintData();
                        }
                    }
                    else {
                        if(origId == "jsxautorow") {
                            objRecord.jsxid = "jsxautorow";
                            delete objRecord.isModified;
                            delete objRecord.isNewRecord;
                            this.complex.autorowsession = {};
                            for(var name in objRecord) {
                                this.complex.autorowsession[name] = objRecord[name];
                            }
                        }
                        if(bRedraw) {
                            var me = this;
                            setTimeout(function() {
                                me.reapplyLastDoc();
                                me.reapplyAutoRow();
                            },0);
                        }
                        insertedRecord = null;
                    }
                    return insertedRecord;
                }
                else {
                    return false;
                }
            }catch(e){
                this.getLogger().error("insertRecord error : " + e);
                return false;
            }
        }

        listbuilder.onAfterPaint = function(objGUI) {
            this.jsxsuper(objGUI);
            this.reapplyAutoRow();
            if(this.complex.dataChange) {
                this.repaintData();
            }
        }

        listbuilder.reapplyAutoRow = function() {
            if(this.complex.autorowsession) {
                this.complex.autorowsession.jsxid = "jsxautorow";
                var record = this.getAutoRowSession();
                for(var name in this.complex.autorowsession) {
                    record[name] = this.complex.autorowsession[name];
                }
                var childNodes = document.getElementById(this.getId() + "_jsx_jsxautorow").childNodes;
                for(var i=0; i<childNodes.length; i++) {
                    var childNode = childNodes[i];
                    var col = this.getChild(i);
                    if(col) {
                        var att = col.getPath();
                        if(att && (att != "jsxid")) {
                            var val = record[att];
                            if(val) {
                                childNode.childNodes[0].innerHTML = val;
                            }
                        }
                    }
                }
            }
        }

        listbuilder.repaintData = function() {
            this.jsxsuper();
            if(this.complex.dataChange) {
                this.updateLastDoc();
                if(this.complex.dataChangeOrigId != "jsxautorow"){
                    this._handleMerge(false,"datachange");
                }
                delete this.complex.dataChange;
                delete this.complex.dataChangeOrigId;
            }
        }

        /**
         * doEvent wrapped funciton with try-catch sentence.
         * @private
         */
        listbuilder._publishEvent = function(topicId, objContent) {
            try {
                var result =  this.doEvent(topicId, objContent);
                return result === false ? false : true;
            } catch(ex) {
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

        listbuilder.getNextJsxId = function(){
            return this._jsxNextid++;
        }

        listbuilder._preGetNextJsxId = function(){
            return this._jsxNextid;
        }

        listbuilder.setBuilderMode = function(isBuilderMode, bNoRepaint){
            var col = this.getDescendantOfName("imageButtonColumn");
            if(isBuilderMode){
                this.jsxautorow=2;
                this._editMode = tibco.uxcore.gui.GenericTableView.EDIT_MODE;
                if(col) {
                    col.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);
                }
            }else{
                this.jsxautorow=0;
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
        listbuilder.setEditMode = function(mode, bRepaint){
            this.setBuilderMode(mode, true);
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