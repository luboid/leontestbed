(function(plugIn) {

jsx3.Class.defineClass("tibco.uxcore.gui.ColumnPicker", jsx3.gui.Block, null, function(BLOCK, block) {

    BLOCK.MENUITEM_HEIGHT = 20;
    BLOCK.MENUITEM_WIDTH_PADDING = 40;
    BLOCK.MENUITEM_MAXWIDTH = 250;
    BLOCK.MENUITEM_MINWIDTH = 100;

    block._jsxmaxwidth = BLOCK.MENUITEM_MINWIDTH;

    /**
     * Get a logger instance named as class name
     */
    block.getLogger = function() {
        return jsx3.util.Logger.getLogger(this.getClass().getName());
    };
    
    /**
     * Create relationship between ColumnPicker object and ColumnPickerButton
     * @param objButton {tibco.uxcore.gui.ColumnPickerButton} an instance which load this ColumnPicker block 
     */
    block.setButton = function(objButton) {
        this._jsxbutton = objButton;
    };
    
    /**
     * Get corresponding ColumnPicker button
     * @return {tibco.uxcore.gui.ColumnPickerButton}
     */
    block.getButton = function() {
        return this._jsxbutton || null;
    };
    
    /**
     * Gets list container object which hold a ColumnPicker button
     */
    block.getListContainer = function() {
        return this._jsxbutton.getListContainer();
    };

    /**
     * A wrap function, gets all Columns from list container, if list container has a table list view accessory
     */
    block.getAllColumns = function() {
        return this.getListContainer().getAllColumns();
    };
    
    /**
     * Gets column list, which show all changeable columns in current matrix object.
     */
    block.getList = function() {
        return this.getFirstChild();
    };

    /**
     * initialize function, get columns from list container, attach necessary interactive event, 
     * and calculate proper position to show columnpicker block. called by ColumnPickerButton
     */
    block.initialize = function(excludedCols, uneditableCols) {
        this._jsxoldstyle = false;
        this._jsxchanged = false;
        this.clearOtherInstances();

        this._jsxuneditable = jsx3.$A(uneditableCols ? uneditableCols.split(/\s*,\s*/g) : []);
        this._jsxexcluded = jsx3.$A(excludedCols ? excludedCols.split(/\s*,\s*/g) : []);
        if(this.setListData()) {
            this.attachEvent();
            this._jsxmaxwidth = BLOCK.MENUITEM_MINWIDTH;
            this.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true);
            this.getList().repaintData();
            this.calculatePosition();
            this.setDisplay(jsx3.gui.Block.DISPLAYBLOCK, true);
            this.repaint();
            this.focus();
        } else {
            this.close()
        }
    };
    
    /**
     * Remove other columnPicker block instance from global root block.
     */
    block.clearOtherInstances = function() {
        var root = (jsx3.IDE ? jsx3.IDE : plugIn.getServer()).getRootBlock();
        var uniqueId = this.getId();
        jsx3.$A(root.getDescendantsOfType("tibco.uxcore.gui.ColumnPicker", true)).each(function(instance){
            if(instance.getId() != uniqueId) {
                instance.close();
            }
        });
    };
    
    /**
     * Close columnPicker block and publish columnChanged message to ListContainer
     */
    block.close = function() {
        jsx3.gui.Event.unsubscribeLoseFocus(this);
        this.getList().setSuppressVScroller(jsx3.Boolean.TRUE, false);
        var arrNewAtts = null, arrHiddenAtts = [];
        var allColumns = this.getAllColumns();
        var columnPickerType = this.getListContainer().getColumnPickerType();

        if(!this._jsxoldstyle && this._jsxchanged) {
            arrNewAtts = jsx3.$A(this.getList().getXML().selectNodes("//record[@selected='true']").toArray()).map(function(record){
                return columnPickerType == "jsxpath" ? record.getAttribute("jsxattr") : record.getAttribute("jsxname");
            });
            for(var i=allColumns.length-1; i>=0; i--) {
                if(this._jsxexcluded.contains(allColumns[i].getName()) && allColumns[i].getDisplay() != jsx3.gui.Block.DISPLAYNONE) {
                    arrHiddenAtts.push(columnPickerType == "jsxpath" ? allColumns[i].getPath() : allColumns[i].getName());
                };
            };
            this.getLogger().info("arrNewAtts:" + arrHiddenAtts.concat(arrNewAtts));
            this.getButton().columnPickerClosed(arrHiddenAtts.concat(arrNewAtts));
        } else {
            this.getButton().columnPickerClosed();
        }
        this.getParent().removeChild(this);
    };
    
    /**
     * @private
     */
    block.getColumnText = function(col) {
        //TODO: check dynamic property and use jss to store default string....
        var text = col.getText();
        if(!text) {
            var dp = col.getDynamicProperty("jsxtext");
            if(dp) {
                  text = col.getServer().getDynamicProperty(dp);
                  if(!text) {
                      text = "";
                  }
            }
        }
        return text || "(untitled column)";
    };

    /**
     * @private
     */    
    block.calculatePosition = function() {
        //Set picker list's size according to the matrix column count
        var height = (this.itemCount || this.getAllColumns().length) * BLOCK.MENUITEM_HEIGHT + 2;
        if(this._jsxmaxwidth) {
            if(this._jsxmaxwidth < BLOCK.MENUITEM_MAXWIDTH) {
                this.setWidth(this._jsxmaxwidth + 20, false);
            } else {
                this.setWidth(BLOCK.MENUITEM_MAXWIDTH + 20, false);
            }
            //jsx3.log(this._jsxmaxwidth);
        }
        this.setHeight(height, false);

        var objGUI = this._jsxbutton.getRendered();
        var objRoot = ((jsx3.IDE ? jsx3.IDE : plugIn.getServer()).getRootBlock()).getRendered(objGUI);
        var winPos = ((jsx3.IDE ? jsx3.IDE : plugIn.getServer()).getRootBlock()).getAbsolutePosition();
        
        var position = jsx3.html.getRelativePosition(objRoot, objGUI);
        var bY = position.T + position.H;
        var bX = position.L;
        if((bX+this.getWidth()) > (winPos.W - 5)) {
            bX = bX - this.getWidth() + position.W;
        }

        if(bY + height + 5 > winPos.H) {
            bY = bY - height - position.H;
            if (bY<5) {
                bY = position.T + position.H;
                height = winPos.H - bY;
                this.getList().setSuppressVScroller(0,false);
                this.setMargin("0 25 0 0");
                this.setHeight(height,true);
            }
        }
        
        this.setLeft(bX, false);
        this.setTop(bY, false);
        return;
    };

    /**
     * @private
     */    
    block.attachEvent = function() {
        jsx3.gui.Event.subscribeLoseFocus(this, this, this.close);
        this.getList().subscribe(jsx3.gui.Interactive.DROP, this, this.changeOrder);

        //this.getList().getChild(0).setValueTemplate(plugIn.getServer().getDynamicProperty("@uxcore10@ColumnPicker Icon ValueTemplate"));
        this.getList().getChild(0).setFormatHandler(jsx3.$F(this.iconFormatHandler).bind(this));
        this.getList().getChild(1).setFormatHandler(jsx3.$F(this.textFormatHandler).bind(this));
    };

    /**
     * @private
     */    
    block.changeOrder = function(objMsg) {
        this._jsxchanged = true;
        if(!this._jsxoldstyle) return;
        var table = null, columnA, columnB;
        if(table = this.getListContainer().getTableListView()) {
            columnA = this.columnsHash[objMsg.context.strDRAGIDS[0]];
            columnB = this.columnsHash[objMsg.context.strRECORDID];
            table.insertBefore(columnA, columnB, true);
        }
    };

    /**
     * Gets Columns information
     * @private
     */    
    block.setListData = function() {
        this.getList().getXML().removeChildren();
        this.columnsHash = {};
        var allColumns = this.getAllColumns();
        var count = 0;
        for(var i=0; i< allColumns.length; i++) {
            var id = allColumns[i].getId();
            var name = allColumns[i].getName();
            this.columnsHash[id] = allColumns[i];

            if(!this._jsxexcluded.contains(name)) {
                count = count + 1;
                var display = allColumns[i].getDisplay() != jsx3.gui.Block.DISPLAYNONE;
                var text = this.getColumnText(allColumns[i]);
                
                var record = this.getList().getXML().createNode(jsx3.xml.Entity.TYPEELEMENT, "record", "");
                record.setAttribute("jsxid", id);
                record.setAttribute("jsxname", name);
                record.setAttribute("columnName", text);
                record.setAttribute("selected", display);
                if(this._jsxuneditable.contains(allColumns[i].getName())) {
                    record.setAttribute("jsxdisabled","1");
                }
                record.setAttribute("jsxattr", allColumns[i].getPath())
                this.getList().getXML().appendChild(record);
            }
        };
        this.itemCount = count;
        return allColumns.length > 0;
    };
    
    /**
     * formatHandler for icon column, show a checked sign before column text if the column is visible 
     * @private
     */    
    block.iconFormatHandler = function(element, cdfkey, matrix, column, rownumber, server) {
        try {
            var html = element.innerHTML, record = matrix.getRecordNode(cdfkey);
            if (record.getAttribute("selected") == "true") {
                if(record.getAttribute("jsxdisabled") != "1") {
                  html = "<img src='" + jsx3.resolveURI('jsxplugin://tibco.uxcore.gui.listcontainer/images/columnpicker/selected.gif') + "'/>";
                } else {
                  html = "<img src='" + jsx3.resolveURI('jsxplugin://tibco.uxcore.gui.listcontainer/images/columnpicker/unselectable.gif') + "'/>";
                }
            } else {
                html = "";
            }
            element.innerHTML = [
                    "<div style='width:100%;height:100%'",
                        " onclick=\"jsx3.html.getJSXParent(this).getAncestorOfName('blkColumnPicker').onSelectList(",
                        "'" + record.getAttribute("jsxid") + "',",
                        "'" + record.getAttribute("selected") + "'",
                        ");\">",
                            html,
                    "</div>"
                ].join("");
        }
        catch (e) {
            this.getLogger().error(e);
        }       
    };

    /**
     * formatHandler for text column, show column text
     * @private
     */    
    block.textFormatHandler = function(element, cdfkey, matrix, column, rownumber, server) {
        try {
            var html = element.innerHTML, record = matrix.getRecordNode(cdfkey);
            if (record.getAttribute("jsxdisabled") == "1") {
                html = "<span style='color:gray'>" + html + "</span>";
            }
            element.innerHTML = [
                    "<span style='height:100%'",
                        " onclick=\"jsx3.html.getJSXParent(this).getAncestorOfName('blkColumnPicker').onSelectList(",
                        "'" + record.getAttribute("jsxid") + "',",
                        "'" + record.getAttribute("selected") + "'",
                        ");\">",
                            html,
                    "</span>"
                ].join("");
           if(!this._jsxmaxwidth || element.childNodes[0].offsetWidth + BLOCK.MENUITEM_WIDTH_PADDING> block._jsxmaxwidth) {
              this._jsxmaxwidth = element.childNodes[0].offsetWidth + BLOCK.MENUITEM_WIDTH_PADDING;
           }
        }
        catch (e) {
            this.getLogger().error(e);
        }
    };

    /**
     * Event handler, repaint column icon when user change visibility of columns
     * @private
     */    
    block.onSelectList = function(id, selected) {
        if(selected !== undefined) {
            var node = this.getList().getXML().selectSingleNode("//record[@jsxid='"+id+"']");
            if(this._jsxuneditable.contains(node.getAttribute("jsxname"))) {
                return;
            }
            selected = node.getAttribute("selected");
        }
        node.setAttribute("selected", selected != "true" ? "true" : "false");
        this.getList().redrawRecord(id, jsx3.xml.CDF.UPDATE);
        this._jsxchanged = true;

        if(this.columnsHash && this._jsxoldstyle) {
            this.columnsHash[node.getAttribute("jsxid")].setDisplay(
                selected != "true" ? jsx3.gui.Block.DISPLAYBLOCK : jsx3.gui.Block.DISPLAYNONE, true);
            this.columnsHash[node.getAttribute("jsxid")].getParent().repaintData();
        }
    };
    
    block.onDestroy = function() {
        delete this.columnsHash;
    };


});

})(this);