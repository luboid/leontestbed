/*
 * Copyright (c) 2001-2008, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

(function(plugIn) {

jsx3.lang.Class.defineClass("tibco.uxcore.gui.ActionButtonList", jsx3.gui.Select, [tibco.uxcore.gui.IListAccessory],
    function(LIST, list) {

    	var Interactive = jsx3.gui.Interactive;

        /**
         * instance initializer
         * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
         * @param strHTML {String} Text/HTML markup to place in the jsx3.gui.Block instance
         */
        list.init = function(strName, strHTML) {
            // note that top, left, width and height are removed.  These shall be controlled by the parent container.
            this.jsxsuper(strName,strHTML);
            this._ensureIntegrity();
        };

        list.getLogger = function() {
            return jsx3.util.Logger.getLogger(this.getClass().getName());
        };

        /**
         * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
         * @param objJSX {Object}
         * @param objSetting {Array} properties list
         * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
         */
        list.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
            for(var i in objSetting) {
                objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
            };
            return objJSX;
        };

        list.onSetParent = function(objParent){
            var ret=this.jsxsuper(objParent);
            ret = !!objParent.instanceOf("tibco.uxcore.gui.ListContainer");
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only ListContainer is valid parent of " + this.getClass().getName());
            }
            return ret;
        };

        list.onAfterAssemble = function() {
            this.jsxsuper();
            this._ensureIntegrity();
        };

        list.onAfterPaint = function() {
            if(jsx3.IDE && this.getXML().selectNodes("//record").size() == 0) {
                //attach sample items
            	this.setActionList([
            	   {id: "Install", img: "jsxplugin://tibco.uxcore.gui.listcontainer/images/installed.gif"},
                   {id: "UnInstall", img: "jsxplugin://tibco.uxcore.gui.listcontainer/images/uninstall.gif"},
                   {id: "Deploy", img: "jsxplugin://tibco.uxcore.gui.listcontainer/images/deploy.gif"},
                   {id: "UnDeploy", img: "jsxplugin://tibco.uxcore.gui.listcontainer/images/undeploy.gif"}
            	])
            }
        };

        list._ensureIntegrity = function() {
            this.setWidth(89);
            this.setDefaultText("More Actions");
            this.subscribe(Interactive.BEFORE_SELECT, this, this._onSelect);
            this.setDefaultProperty(this, {
                    "jsxheight": "@uxcore10@selectBox Height",
                    "jsxborder": "@uxcore10@selectBox Border",
                    "jsxstyleoverride": "@uxcore10@selectBox styleoverride"
            }, false);
            this.setXSLParam("jsx_img_resolve", "0");

        }

        list._onSelect = function(objMessage) {
        	this.getLogger().info(objMessage.context.strRECORDID);
        	if(this.getListContainer()) {
        	   return this.getListContainer().onAction(objMessage.context.strRECORDID, this);
        	}
        };

        /**
         * hook the doEvent to process the event for Matrix
         */
        list.doEvent = function(strType, objContext){
        	Interactive.prototype.doEvent.apply(this, arguments);
            if(strType == Interactive.BEFORE_SELECT) {
            	return false;
            };
        };

        list.setActionListByCDF = function(cdf) {
        	if(cdf && cdf.instanceOf && cdf.instanceOf("jsx3.xml.Document")) {
                this.setSourceXML(cdf);
                this.repaint();
        	}
        	return cdf;
        };

        /**
         * Sets drop-down menu of ActionButtonList
         * @param listArray {Array<String>|Array<Object>} A list to be set into drop-down menu of ActionButtonList, where
         * listArray support two types, array of text(String) or JSON object. if text, this value will be set as jsxid and jsxtext in record
         * if JSON object, it support four attributes: id, text, img and tip, see jsx3.gui.Select doc for detail
         * jsxid (with same meaning of strActionId in ActionButton) will be publish to ListContainer by event
         * LIST_ACTION_REQUESTED as a content variable strActionId
         * @see tibco.uxcore.gui.ListContainer.onAction
         */
        list.setActionList = function(listArray) {
        	if(listArray) {
        	   var cdf = jsx3.xml.CDF.Document.newDocument();
        	   jsx3.$A(listArray).each(function(item){
        	       if(typeof(item) == "object" && item.id) {
        	       	   if(item.img) item.img = jsx3.resolveURI(item.img);
        	       	   cdf.insertRecord({jsxid: item.id, jsxtext: item.text || item.id, jsximg: item.img || "", jsxtip: item.tip || ""});
        	       } else {
        	       	   cdf.insertRecord({jsxid: item, jsxtext: item});
        	       }
        	   });
        	   return this.setActionListByCDF(cdf);
        	}
        };

        list.recordEdited = function(strRecordId, strAction, entityRecord, strInsertBefore, objCaller) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.searchRequested = function(searchXML) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.viewChanged = function(strNewListViewId, strOldListViewId) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.actionRequested = function(actionId) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.visibilityChanged = function(bVisible) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.refreshRequested = function() {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.columnsChanged = function(arrNewAtts, arrOldAtts) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.dataChanged = function(dataCDF, intCurrentPage, intTotalPages, strId) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.pageChangeRequested = function(intNewPage, intOldPage, intTotalPages) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.reset = function() {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.recordsSelected = function(arrRecordIds) {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }

        list.selectionCleared = function() {
            // do nothing...empty implementation to comply with IListAccessoryInterface
        }
    }
);

})(this);