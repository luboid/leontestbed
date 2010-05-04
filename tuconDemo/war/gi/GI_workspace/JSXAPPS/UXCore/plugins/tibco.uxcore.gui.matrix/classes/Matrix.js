(function(plugIn) {

    if(jsx3.ide) {
    jsx3.ide.loadTemplateCatalog("prop", "jsxplugin://tibco.uxcore.gui.matrix/properties/catalog.xml",plugIn);
//    jsx3.ide.loadTemplateCatalog("event", "jsxplugin://tibco.uxcore.gui.martrix/events/catalog.xml",plugIn);
}

    //jsx3.require("jsx3.gui.Matrix");

/**
 * Extension of the <code>jsx3.gui.Matrix</code> class, for use in the Uxcore Plugin Framework,
 * to provide a benchmarking hook for paint calls.
 */
jsx3.Class.defineClass("tibco.uxcore.gui.Matrix", jsx3.gui.Matrix, null, function (matrix) {

    matrix.prototype.jsxsloaddefaultproperties = jsx3.Boolean.TRUE;

    /**
     * instance initializer
     * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
     */
    matrix.prototype.init = function(strName) {
        this.jsxsuper(strName);
    };

    /**
    matrix.childrenSizeEqual = function(entity1, entity2) {
        var childCount1 = 0;
        var childCount2 = 0;
        if(entity1) {
            childCount1 = entity1.getChildNodes().size();
        }
        if(entity2) {
            childCount2 = entity2.getChildNodes().size();
        }
        return (childCount1 == childCount2);
    }
    **/

    matrix.prototype.setLoadDefaultProperties = function(intLoad) {
        if(intLoad == "true") {
            intLoad = jsx3.Boolean.TRUE;
        }
        else if(intLoad == "false") {
            intLoad = jsx3.Boolean.FALSE;
        }
        if((intLoad == null) || (typeof intLoad == "undefined")) {
            intLoad = jsx3.Boolean.TRUE;
        }
        this.jsxsloaddefaultproperties = intLoad;
    }

    matrix.prototype._uxGetRowById = function(strCdfId) {
      var strId = this.getId() + "_jsx_" + strCdfId;
      var objDoc = this.getDocument();
      return objDoc.getElementById(strId);
    };

    matrix.prototype._uxGetPanelForRow = function(objRow) {
      if (objRow.parentNode.tagName.toLowerCase() == "table") return objRow.parentNode;
      return objRow.parentNode.parentNode;
    };

    matrix.prototype._uxGetCellByIndex = function(strCdfId,intCellIndex) {
      var objRow = this._uxGetRowById(strCdfId);
      return objRow ? objRow.childNodes[intCellIndex] : null;
    };

    matrix.prototype._uxGetStructureById = function(strCdfId) {
      var objRow = this._uxGetRowById(strCdfId);
      return (objRow) ? this._uxGetPanelForRow(this._uxGetRowById(strCdfId)).parentNode : null;
    };

    matrix.prototype._uxDrawStructure = function(strRecordId,intContentIndex) {
      return this.doTransform({jsx_mode:"record",jsx_panel_css:"position:relative;",
                               jsx_column_widths:this._uxGetViewPaneWidth(),
                               jsx_context_index:intContentIndex?intContentIndex:1,
                               jsx_rendering_context:this.getRecordNode(strRecordId).getParent().getAttribute("jsxid"),
                               jsx_rendering_context_child:strRecordId});
    };

    matrix.prototype._uxGetViewPaneWidth = function(objWidthArray) {
      if (!objWidthArray) objWidthArray = this._uxGetColumnWidths();
      return eval(objWidthArray.join("0+")+"0")/10;
    };

    matrix.prototype._uxGetViewPortWidth = function() {
        try {
      var intDrawSpaceWidth = this.getParent().getClientDimensions(this).parentwidth;
      return (this.getSuppressVScroller(0) == 1) ? intDrawSpaceWidth : intDrawSpaceWidth - (jsx3.gui.Painted.Box.getScrollSize());
        } catch(ex) {
            return 0;
        }
    };

    matrix._uxDisplayedChildFilter = function(objColumn) {
      return objColumn && (objColumn.getDisplay() != jsx3.gui.Block.DISPLAYNONE);
    };

    matrix.prototype._uxGetDisplayedChildren = function() {
      return this.getChildren().filter(matrix._uxDisplayedChildFilter);
    };

    matrix.prototype._uxShaveScaledColumns = function(objWidthArray,objPriorityArray,intExcessWidth) {
      //this tracks how much more will need to be shaved still after this pass
      var intShy = 0;

      //get the amount that each wildcard column should be decremented
      var intCurDec = parseInt(intExcessWidth / objPriorityArray.length);

      //loop to decrement each wildard-type column by the given amount
      for (var i=0;i<objPriorityArray.length;i++) {
        //resolve the index of the item in the width array to decrement from
        var intIndex = objPriorityArray[i];

        //make sure totals to 100pct (round last iteration)
        if (i == objPriorityArray.length-1) intCurDec = intExcessWidth - ((objPriorityArray.length - 1) * intCurDec);

        //decrement the column's width
        if ((objWidthArray[intIndex] - intCurDec)  < jsx3.gui.Matrix.MINIMUM_COLUMN_WIDTH) {
          //this column was already too small and can't be decremented further. track how much was not able to be shaved
          intShy += jsx3.gui.Matrix.MINIMUM_COLUMN_WIDTH - (objWidthArray[intIndex] - intCurDec);
          objWidthArray[intIndex] = jsx3.gui.Matrix.MINIMUM_COLUMN_WIDTH;
        } else {
         objWidthArray[intIndex] -= intCurDec;
        }
      }

      return intShy;
    };

    matrix.prototype.uxGetBoxClientWidth = function(box) {
        var expl;
        for(var name in box) {
            var obj = box[name];
            var val = obj.pwidth;
            if(typeof val != "undefined") {
                expl = obj;
            }
        }
        return expl ? expl.clientwidth : 0;
    }

    matrix.prototype._uxGetColumnWidths = function(intViewPortWidth) {
      if (typeof(this._jsxtruecolumnwidths) == "object") {
        return this._jsxtruecolumnwidths.truewidths;
      } else {
        if (!intViewPortWidth) {
          intViewPortWidth = this._uxGetViewPortWidth();
          //decrement the viewport's width according to the width of the body border
          var o1d = {width:1000,height:10};
          var bor = this.getBodyBorder();
          if (bor != null && bor != "") o1d.border = bor;
          intViewPortWidth-=(o1d.width - this.uxGetBoxClientWidth(new jsx3.gui.Painted.Box(o1d)));
        }

        //get the width array
        var objWidthArray = [];

        var intTotal = 0;
        var myVal;
        var intWildcard = 0;

        //only assume existence of those children that have a visual display
        var objChildren = this._uxGetDisplayedChildren();

        //the 'priority' array rank-orders columns according to which ones should be shaved first. this only applies when in scalewidth mode
        var objPriority = {percent:[],wildcard:[],pixel:[]};

        //1) get the developer-specified widths and store in an array. Resolve pixel, wildcard, and percentage values to real numbers
        for (var i = 0;i<objChildren.length;i++) {
          var vntWidth = objChildren[i].getWidth();
          if (jsx3.util.strTrim(String(vntWidth)).search(/\d*%/) == 0) {
            objPriority.percent.unshift(i);
            myVal = parseInt((parseInt(vntWidth) / 100) * intViewPortWidth);
          } else if (!isNaN(vntWidth)) {
            objPriority.pixel.unshift(i);
            myVal = Number(vntWidth);
          } else {
            objPriority.wildcard.unshift(i);
            if (this.getScaleWidth()) {
              intWildcard++;
              myVal = "*";
            } else {
              myVal = jsx3.gui.Matrix.Column.DEFAULT_WIDTH;
            }
          }
          if (!isNaN(myVal)) intTotal += myVal;
          objWidthArray.push(myVal);
        }

        //2) adjust the developer-specified values if in  scalewidth mode
        if (this.getScaleWidth()) {

          //2a) evenly distribute what remains in the viewport's width among the wilcard columns
          var intRemaining = intViewPortWidth - intTotal;
          var intLastPortion;
          if (intWildcard && intRemaining >= 0 && parseInt(intRemaining / intWildcard) > jsx3.gui.Matrix.MINIMUM_COLUMN_WIDTH) {
            //there is sufficient width remaining to distribute among the wildcard columns
            var intTempCard = intWildcard;

            //divide the available space into even amounts
            var intMyPortion = intRemaining / intWildcard;
            if (intMyPortion > parseInt(intMyPortion)) {
              intMyPortion = parseInt(intMyPortion);
              intLastPortion = intRemaining - ((intWildcard - 1) * intMyPortion);
            } else {
              intLastPortion = intMyPortion;
            }

            //replace wildcards
            for (var i=0;i<objWidthArray.length;i++) {
              if (objWidthArray[i] == "*") {
                objWidthArray[i] = (intWildcard == 1) ? intLastPortion : intMyPortion;
                intWildcard--;
              }
            }

            intWildcard = intTempCard;
          } else if (intWildcard) {
            //there are wildcard columns, but no remaining width in the viewport. simply force each wildcard column to the minimum acceptable width
            for (var i=0;i<objWidthArray.length;i++)
              if (objWidthArray[i] == "*")
                objWidthArray[i] = jsx3.gui.Matrix.MINIMUM_COLUMN_WIDTH;
          }

          //2b) if summed width of all columns is greater than what is available in the viewport, start shaving columns
          var intCurTtl = this._uxGetViewPaneWidth(objWidthArray);
          var intExcessWidth = intCurTtl - intViewPortWidth;
          if (intExcessWidth > 0) {

            //2b.1) shave wildcard columns first
            var intShy = intExcessWidth;
            if (objPriority.wildcard.length)
              intShy = this._uxShaveScaledColumns(objWidthArray,objPriority.wildcard,intExcessWidth);

            //2b.2) shave percentage columns second
            if (objPriority.percent.length && intShy > 0)
              intShy = this._uxShaveScaledColumns(objWidthArray,objPriority.percent,intShy);

            //2b.3) shave pixel columns third
            if (objPriority.pixel.length && intShy > 0)
              intShy = this._uxShaveScaledColumns(objWidthArray,objPriority.pixel,intShy);

          }
        }

        //3) ensure no column less than the mimimum allowed width (applies to both scalewidth and non-scalewidth modes)
        for (var i=0;i<objWidthArray.length;i++) {
          if (objWidthArray[i] < jsx3.gui.Matrix.MINIMUM_COLUMN_WIDTH)
            objWidthArray[i] = jsx3.gui.Matrix.MINIMUM_COLUMN_WIDTH;
        }

        //4) make sure to at least fill the viewport by making last column larger (applies ot both scalewidth and non-scalewidth modes)
        var intCurTtl = this._uxGetViewPaneWidth(objWidthArray);
        var intRemaining = intViewPortWidth - intCurTtl;
        if (intRemaining > 0)
          objWidthArray[objWidthArray.length - 1] += intRemaining;

        /* @jsxobf-clobber */
        this._jsxtruecolumnwidths = {truewidths:objWidthArray};
        return objWidthArray;
      }
    };

    matrix.prototype._uxGetTR = function(strRecordId) {
      //generate a TR XML Node using XSLT
      var objParams = {};
      objParams.jsx_column_widths = this._uxGetViewPaneWidth();
      objParams.jsx_rendering_context = this.getRecordNode(strRecordId).getParent().getAttribute("jsxid");
      objParams.jsx_rendering_context_child = strRecordId;
      objParams.jsx_mode = "record";
      var strXHTML = this.doTransform(objParams);
      var objDoc = new jsx3.xml.Document();
      objDoc.loadXML(strXHTML);
      return objDoc.getRootNode();
    };

    matrix.uxConvertStyleToStyles = function(objDOM,strValue,csstype) {
      if (strValue) {
        //apply the style(s)
        var objStyles = jsx3.util.strTrim(strValue).split(/\s*;\s*/g);
        for (var i = 0; i < objStyles.length; i++) {
          var curStyle = objStyles[i];
          if (curStyle == "") continue;
          var objStyle = curStyle.split(/\s*:\s*/);
          if (objStyle && objStyle.length == 2) {
            var strStyleName = objStyle[0].replace(/(-\S)/gi,function($0,$1){ return $1.substring(1).toUpperCase(); });
            objDOM.style[strStyleName] = objStyle[1];
          }
        }
      } else if (csstype) {
        //remove the styles
        var a = ["Top","Right","Bottom","Left"];
        for (var i=0;i<4;i++) {
          var strStyleName = csstype + a[i];
          objDOM.style[strStyleName] = "";
        }
      }
    };

    matrix.uxConvertXMLToDOM = function(objEntity,objDOM,bBox) {
      var names = objEntity.getAttributeNames();
      var re = /^(on(?:mousedown|click|focus|blur|mouseup|mouseover|mouseout|dblclick|scroll|keydown|keypress))/i;
      var re_style = /(?:border:|border-top|border-left|border-bottom|border-right|padding|height|width|background-color)[^;]*;/gi;
      for (var i = 0; i < names.length; i++) {
        var strName = names[i];
        var strValue = objEntity.getAttribute(strName);

        //note that these are not all events, but rather those events that are/may be implemented by the matrix control
        if (strName.match(re)) {
          //attach the event
          jsx3.html.addEventListener(objDOM, strName.toLowerCase(), strValue);
        } else if (strName == "class") {
          objDOM.className = strValue;
        } else if (strName == "style") {
          matrix.uxConvertStyleToStyles(objDOM, bBox ? strValue : strValue.replace(re_style,""));
        } else {
          objDOM.setAttribute(strName,strValue);
        }
      }
    };

    matrix.prototype._uxUpdateTD = function(objTRXML,objTR,intCellIndex) {
      //update a single TD with the generated XHTML
      var objTDXML = objTRXML.selectSingleNode("*[" + (intCellIndex+1) + "]");
      var objTD = objTR.childNodes[intCellIndex];
      matrix.uxConvertXMLToDOM(objTDXML,objTD,false);
      objTD.innerHTML = objTDXML.getFirstChild().getXML();
      return objTD;
    };

    matrix.prototype._uxGetFormatHandler = function(objCol) {
        if(!objCol._jsxuxfh) {
        objCol._jsxuxfh = new jsx3.gui.Matrix.ColumnFormat();

        objCol._jsxuxfh.format = function(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer) {
            var fh = objMatrixColumn._oldGetFormatHandler();
            if(fh && typeof(fh.format) == "function") {
                try {
                    fh.format(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer);
                }
                catch(ex) {
                    // log exception here
                }
            }
            var parent = objMatrixColumn.getParent();
            if(parent && typeof(parent.postformat) == "function") {
                parent.postformat(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer);
            }
        };
        }

        return objCol._jsxuxfh;
    };

    matrix.prototype.redrawCell = function(strRecordId,objColumn,bSuppressTriggers,objTRXML) {
        try {
            this.jsxsuper(strRecordId,objColumn,bSuppressTriggers,objTRXML);
        }
        catch(ex) {
            jsx3.log("Error redrawing cell, trying override redraw cell instead");
            jsx3.sleep(function() {this.myRedrawCell(strRecordId,objColumn,bSuppressTriggers,objTRXML);},null,this);
        }
    }

    matrix.prototype.myRedrawCell = function(strRecordId,objColumn,bSuppressTriggers,objTRXML) {
        var intCellIndex = objColumn.getDisplayIndex();
        var objCell = this._uxGetCellByIndex(strRecordId,intCellIndex);
        if (objCell) {
          var objDiv;
          if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
            var objMyGUI = this._uxGetStructureById(strRecordId);
            var objContent = objMyGUI.parentNode;
            var strXHTML = this._uxDrawStructure(strRecordId,objContent.getAttribute("jsxcontextindex"));
            var objDoc = new jsx3.xml.Document();
            if(!objTRXML) {
              objTRXML = objDoc.loadXML(strXHTML);
              while(objTRXML && objTRXML.getBaseName() != "tr")
                objTRXML = objTRXML.getFirstChild();
              if(!objTRXML)
                return;
            }
            if(objColumn.getChildIndex() == 0  && this.getRenderNavigators(1) != 0) {
              var objtrxml = objTRXML.getFirstChild();
              while(objtrxml && objtrxml.getBaseName() != "tr")
                objtrxml = objtrxml.getFirstChild();
              var objTR=objCell.childNodes[0]; // cell content
              while (objTR && objTR.tagName.toLowerCase() != "tr")
                objTR = objTR.childNodes[0];
              if(!objtrxml || !objTR)
                return;
              objDiv = this._uxUpdateTD(objtrxml,objTR,2);
            } else {
              objDiv = this._uxUpdateTD(objTRXML,objCell.parentNode,intCellIndex);
            }
          } else {
            var objTR = objCell.parentNode;
            if(!objTRXML)
              objTRXML = this._uxGetTR(strRecordId);
            if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
              while(objTRXML && objTRXML.getBaseName() != "tr")
                objTRXML = objTRXML.getFirstChild();
              if(!objTRXML)
                return;
            }
            objDiv = this._uxUpdateTD(objTRXML,objTR,intCellIndex);
          }
          objDiv = objDiv.childNodes[0];

          //perform the 2-pass, using the formthandler (if it exists)
          var objFormatHandler = this._uxGetFormatHandler(objColumn);
          if (objFormatHandler) {
            var objRow = objCell.parentNode;
            objFormatHandler.format(objDiv, objRow.getAttribute("jsxid"), this, objColumn,
                objRow.getAttribute("jsxrownumber") ,this.getServer());
          }

          //call any sibling cells in this row that specify a trigger equal to the column's path
          if (!bSuppressTriggers) {
            var oKids = this._uxGetDisplayedChildren();
            var re = new RegExp("\\b(" + objColumn.getPath() + ")\\b");
            for (var i=0;i<oKids.length;i++) {
              var strTriggers = oKids[i].getTriggers() + "";
              if (oKids[i] != objColumn && (oKids[i].getPath() == objColumn.getPath() || strTriggers.search(re) >= 0))
                this.redrawCell(strRecordId,oKids[i],true,objTRXML);
            }
          }
        }
    }

    matrix.prototype.getLoadDefaultProperties = function() {
        if((this.jsxsloaddefaultproperties == "true") || (this.jsxsloaddefaultproperties == true)) {
            this.jsxsloaddefaultproperties = jsx3.Boolean.TRUE;
        }
        else if((this.jsxsloaddefaultproperties == "false") || (this.jsxsloaddefaultproperties == false)) {
            this.jsxsloaddefaultproperties = jsx3.Boolean.FALSE;
        }

        return this.jsxsloaddefaultproperties;
    }

    /**
     * Hook function when gi assemble current object and its children. we apply special styles for matrix
     * with dynamic properties.
     */
    matrix.prototype.onAfterAssemble = function() {
        if (this.jsxsloaddefaultproperties) this.setDynamicProperties(true);
        return this.jsxsuper();
    };


    /**
     * Get a logger instance with class name as identity
     */
    matrix.prototype.getLogger = function() {
        return jsx3.util.Logger.getLogger(this.getClass().getName());
    };

    // ***********************************************+
    // **************** BENCMARK LOGIC ***************|
    // ***********************************************+

    /**
     * Updates the view of this object by calling <code>paint()</code> and replacing the current view with the
     * returned HTML. This method has no effect if this object is not currently displayed.  Also logs basic benchmarking
     * of the repaint to the BENCHMARK logger, at the debug log level.
     * @return {String} the result of calling <code>paint()</code> or <code>null</code> if this object is not displayed.
     * @see #paint()
     */
    matrix.prototype.repaint = function() {
        var before = new Date().getTime();
        var dump = this.jsxsuper();
        var since = new Date().getTime() - before
        this.getLogger().debug("BENCHMARK: Repainting the matrix " + this.getName() + " takes about " + since + " ms");
        return dump
    };


    // ***********************************************+
    // ************** EMPTY MATRIX LOGIC *************|
    // ***********************************************+


    /**
     * Paints only the data rows.
     * Call our function when the data body has been repainted.
     */
    matrix.prototype.repaintData = function() {
        this.getLogger().debug(this.getName() + "  repaintData");
        this.jsxsuper();
        this.updateNullListMessageBlock();
    };

    /**
     * A hook that subclasses of Painted may override in order to perform additional manipulation of the HTML DOM created by the paint method.
     * Call our function when the whole matrix has been repainted.
     */
    matrix.prototype.onAfterPaint = function(objGUI) {
        this.getLogger().debug(this.getName() + " onAfterPaint");
        this.updateNullListMessageBlock();
        this.jsxsuper(objGUI);
    };


    /**
     * This function is called upon a each paint
     * Determine whether there is no row. If so, show a message on top of the matrix.
     */
    matrix.prototype.updateNullListMessageBlock = function() {
        this.getLogger().debug(this.getName() + " updateNullListMessageBlock");

        //get our parent (this should be a block)
        var objParent = this.getParent();

        //if the paging model use 2 paints (one for the outterbox, then the other one for the data)
        //skip the first paint because at the first paint, the date is not loaded and therefore we cannot
        //know the number of records.
        if ((this.getPagingModel() != jsx3.gui.Matrix.PAGING_OFF)
                && !this._firstPaint && this.getDynamicProperty("jsxnulllistmessage")) {
            this.getLogger().debug(this.getName() + " this is the first paint of a 2-pass matrix. skip it");
            this._firstPaint = true;
            return;
        }

        //get the number of row (there is no provided better way to get the number of rows from the Matrix)
        //this calls a XSLT Tranform operation
        if (this.getSortedIds().length > 0) {
            //the matrix is not empty, remove the mask if it's present
            if (objParent._masked) {
                this.getLogger().debug(this.getName() + " Removing the mask since the record count > 0.");
                objParent._masked = false;
                objParent.hideMask();
            }
        }
        else {
            //the matrix is empty -> create or update the mask

            this.getLogger().debug(this.getName() + " Record count is 0, Checking whether a NullList Message exists for this matrix.");

            //get the div containing the message
            var objNullListMessage = this._getFormattedNullListMessage();

            if (objNullListMessage != null) {

                this.getLogger().debug(this.getName() + " NullList Message exists. Inserting the message as the record count is 0.");

                // double check the matrix list length, or jump out
                if (this.getSortedIds().length > 0) {
                    return;
                }
                //show the mask
                objParent.showMask();
                objParent._masked = true;

                //customize the mask (no background, no busy cursor)
                var objMask = objParent.getLastChild();
                if(objMask.getName().toString().indexOf("_mask")>0) {
                    objMask
                        .setDynamicProperty("jsxbg",null)
                        .setPadding("")
                        .setColor("#7F7F7F")
                        .setFontSize(12)
                        .setFontName("Arial")
                        .setBackground("")
                        .setDynamicProperty("jsxbgcolor")
                        .setBackgroundColor("")
                        .setHeight("20%")
                        .setWidth("50%")
                        .setTop("40%")
                        .setLeft("25%")
                        .setDynamicProperty("jsxcursor", null)
                        .setCursor("")
                        .setText(objNullListMessage, false);
                    //repaint the mask
                    objMask.repaint();
                }
            }
            else {
                objParent.hideMask();
                objParent._masked = false;
            }
        }
    };

   /**
    * Returns the message shown when the matrix is empty (when there is not row to be shown)
    * Can be null if it is not set.
    * @return {String} or null
   */
    matrix.prototype.getNullListMessage = function() {
        return this.jsxnulllistmessage;
    };

   /**
    * Set the message shown when the matrix is empty (when there is not row to be shown)
    * Set null to disable the message.
    * @return {String} or null
   */
    matrix.prototype.setNullListMessage = function(strNullListMessage) {
        this.jsxnulllistmessage = strNullListMessage;
        //update the formatted message
        this._createFormattedNullListMessage();
    };

   /**
    * Get the XML DIV object shown when the matrix is empty (when there is not row to be shown)
    * @return {jsx3.xml.Document}
    * @private
   */
   matrix.prototype._getFormattedNullListMessage = function() {
        if (this.getNullListMessage() != null) {
            this._createFormattedNullListMessage();
            return this._formattedNullListMessage;
        }
        else {
            return null;
        }
    };

   /**
    * Update the XML DIV object shown when the matrix is empty (when there is not row to be shown)
    * @param strNullListMessage  {String} the null list message
    * @private
    */
    matrix.prototype._createFormattedNullListMessage = function() {

        this._formattedNullListMessage =  new jsx3.xml.Document().loadXML(
            '<div style="height:100%; width:100%; top:50%; left:0" >' +
                this.getNullListMessage() +
            '</div>');
    };

    // ***********************************************+
    // **************** SPYGLASS LOGIC ***************|
    // ***********************************************+

    /**
     * Displays a basic default spyglass for a hovered cell (if called from the spy event).  The format of this spyglass
     * is <code>ATTRIBUTE: VALUE</code>.  Override this function, or call a custom function from the spy event for customized
     * spyglass behavior.
     * @param strRECORDID  {String} CDF record id for spied row
     * @param objCOLUMN  {jsx3.gui.Matrix.Column} - the column that received the spy action
     * @return {String}
     */
    matrix.prototype.spyRecord = function(strRECORDID, objCOLUMN) {
        var record = this.getXML().selectSingleNode("//record[@jsxid = '" + strRECORDID + "']") ;
        if (!record)
            return false;
        var path = objCOLUMN.getPath();
        if (path == "checked")
            return  false;
        var dummy = this.getContentElement(strRECORDID, objCOLUMN.getPath()).
                innerHTML.replace(/&nbsp;\s*$/ig, "").replace(/name=/ig, "").replace(/id=/ig, "");
        if (!dummy)
            return false;

        var UA = navigator.userAgent.toLowerCase();
        var isOpera = UA.indexOf("opera")!=-1;
        var isIE = UA.indexOf("msie")!=-1&&(document.all&&!isOpera);
        var isKon = UA.indexOf("konqueror")!=-1;
        var isSafari = UA.indexOf("safari")!=-1||isKon;
        var tempText = "<b>" + objCOLUMN.getText() + "</b>: " + dummy;

        function escapeSpecialChars(strText)
        {
            return strText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }

        function escapeEntities(strText)
        {
            return strText.replace(/&lt;/ig, "<").replace(/&gt;/ig, ">").replace(/&amp;/ig, "&");
        }

        if(isOpera || isSafari) {
            var tempText = tempText.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>").
            replace(/((\s*<[^\/][^>]*>\s*)*)([^<]*)((\s*<\/[^>]*>\s*)*)/g,
            function ($0, $1, $2, $3, $4, $5)
            {
                // Break long word to a new line, and include special chars.
                return $1 + escapeSpecialChars(escapeEntities($3).replace(/([^\s]{14})/g, "$1\n")).replace(/\n/g, "&#8203;") + $4;
            });
        }
        else if (!isIE) {
            var tempText = tempText.replace(/\r\n/g, "<br>").replace(/\n/g, "<br>").
            replace(/((\s*<[^\/][^>]*>\s*)*)([^<]*)((\s*<\/[^>]*>\s*)*)/g,
            function ($0, $1, $2, $3, $4, $5)
            {
                // Break long word to a new line, and include special chars.
                return $1 + escapeSpecialChars(escapeEntities($3).replace(/([^\s]{14})/g, "$1\n")).replace(/\n/g, "<wbr/>") + $4;
            });
        }

        return "<div style='width:250px;word-break:break-all;word-wrap:break-word;white-space:-moz-pre-wrap;overflow:hidden;' >" + tempText + "</div>";

    };

    matrix.prototype.setColumnProperties = function(column, bLastOne, bNoSave) {
        column.setDynamicProperty("jsxfontname", "@uxcore10@MatrixC Font Name", bNoSave);
        column.setDynamicProperty("jsxfontsize", "@uxcore10@MatrixC Font Size", bNoSave);
        column.setDynamicProperty("jsxfontweight", "@uxcore10@MatrixC Font Weight", bNoSave);
        column.setDynamicProperty("jsxcolor", "@uxcore10@MatrixC Color", bNoSave);
        column.setDynamicProperty("jsxbgcolor", "@uxcore10@MatrixC BGColor", bNoSave);
        column.setDynamicProperty("jsxbg", "@uxcore10@MatrixC BackGround", bNoSave);
        column.setDynamicProperty("jsxpadding", "@uxcore10@MatrixC Padding", bNoSave);
        column.setDynamicProperty("jsxborder", "@uxcore10@MatrixC Border", bNoSave);

        column.setDynamicProperty("jsxcellfontname", "@uxcore10@MatrixCell Font Name", bNoSave);
        column.setDynamicProperty("jsxcellfontsize", "@uxcore10@MatrixCell Font Size", bNoSave);
        column.setDynamicProperty("jsxcellfontweight", "@uxcore10@MatrixCell Font Weight", bNoSave);
        column.setDynamicProperty("jsxcellcolor", "@uxcore10@MatrixCell Color", bNoSave);
        column.setDynamicProperty("jsxcellbgcolor", "@uxcore10@MatrixCell BGColor", bNoSave);
        column.setDynamicProperty("jsxcellpadding", "@uxcore10@MatrixCell Padding", bNoSave);
        if (bLastOne) {
            column.setDynamicProperty("jsxcellborder", "@uxcore10@MatrixCell Border Last", bNoSave);
        }
        else {
            column.setDynamicProperty("jsxcellborder", "@uxcore10@MatrixCell Border", bNoSave);
        }
        // If it has a button mask
        var mask = column.getFirstChild()
        if (mask && jsx3.lang.Class.forName("jsx3.gui.Button")) {
            if (mask.instanceOf(jsx3.gui.Button)) {
                mask.setDynamicProperty("jsxfontname", "@uxcore10@MatrixBTMask Font Name", bNoSave);
                mask.setDynamicProperty("jsxfontsize", "@uxcore10@MatrixBTMask Font Size", bNoSave);
                mask.setDynamicProperty("jsxfontweight", "@uxcore10@MatrixBTMask Font Weigh", bNoSave);
                mask.setDynamicProperty("jsxcolor", "@uxcore10@MatrixBTMask Color", bNoSave);
                mask.setDynamicProperty("jsxdisabledcolor", "@uxcore10@MatrixBTMask Disabled Color", bNoSave);
                mask.setDynamicProperty("jsxbgcolor", "@uxcore10@MatrixBTMask BGColor", bNoSave);
                mask.setDynamicProperty("jsxdisabledbgcolor", "@uxcore10@MatrixBTMask Disabled BGColor", bNoSave);
                mask.setDynamicProperty("jsxpadding", "@uxcore10@MatrixBTMask Padding", bNoSave);
                mask.setDynamicProperty("jsxborder", "@uxcore10@MatrixBTMask Border", bNoSave);
                mask.setDynamicProperty("jsxclassname", "@uxcore10@MatrixBTMask Css Rule Name", bNoSave);
                mask.setDynamicProperty("jsxstyleoverride", "@uxcore10@MatrixBTMask Css Override", bNoSave);
            }
        }
    }

    /**
     * Apply style dynamic properties to matrix.
     * @param bNoSave {Boolean} if true, setted dynamic properties won't be serialized into GUI file.
     */
    matrix.prototype.setDynamicProperties = function(bNoSave) {

        // \set the dynamic property for this matrix
        this.setDynamicProperty("jsxbgcolor", "@uxcore10@Matrix BG", bNoSave);
        this.setDynamicProperty("jsxbg", "@uxcore10@Matrix BG Image", bNoSave);
        this.setDynamicProperty("jsxheaderheight", "@uxcore10@Matrix HeaderHeight", bNoSave);
        this.setDynamicProperty("jsxrowheight", "@uxcore10@Matrix RowHeight", bNoSave);
        this.setDynamicProperty("jsxheaderborder", "@uxcore10@Matrix HeaderBorder", bNoSave);
        this.setDynamicProperty("jsxbodyborder", "@uxcore10@Matrix BodyBorder", bNoSave);
        this.setDynamicProperty("jsxfocusstyle", "@uxcore10@Matrix Focus Style", bNoSave);
        this.setDynamicProperty("jsxselectionbg", "@uxcore10@Matrix Selection BG", bNoSave);
        this.setDynamicProperty("jsxspystyle", "@uxcore10@Matrix Spy Style", bNoSave);

        //Set the XSL parameter
        //New rowstrip color method is not avariable for Paged matrix, use xsl method instead.
        if(this.getPagingModel() == jsx3.gui.Matrix.PAGING_PAGED) {
            this.setXSLParam("jsx_rowbg1", "#F8F8F8");
            this.setXSLParam("jsx_rowbg2", "#FFFFFF");
        }

        if(this.getRenderingModel() == jsx3.gui.Matrix.REND_HIER) {
            this.setXSLParam("jsx_treehead_bgcolor", "");
            this.setXSLParam("jsx_treehead_fontweight", "normal");
            this.setXSLParam("jsx_icon", "");
        }

        //Set the spy glass
        if (!this.getCanSpy()) {
            this.setCanSpy = "true"
            if (!this.hasEvent("jsxspy"))
                this.setEvent("this.spyRecord(strRECORDID, objCOLUMN)","jsxspy");
        }

        // Set the properties for columns
        var clArry = this.getChildren();
        for (i = 0; i < clArry.length; i++) {
            if (clArry[i].instanceOf(jsx3.gui.Matrix.Column)) {
                this.setColumnProperties(clArry[i], i == clArry.length - 1, bNoSave);
            }
        }
    };

    matrix.prototype.postformat = function(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer) {
        // do nothing...this just allows an override in subclasses
    }

});

var cp = jsx3.gui.Matrix.Column.prototype;
for(var name in cp) {
    var f = cp[name];
    try {
    if(f.toString().indexOf("jsx3.gui.Matrix.ColumnFormat.getInstance") != -1) {
        cp._oldGetFormatHandler = f;
        cp[name] = function() {
            if(!this._jsxuxfh) {
            this._jsxuxfh = new jsx3.gui.Matrix.ColumnFormat();

            this._jsxuxfh.format = function(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer) {
                var fh = objMatrixColumn._oldGetFormatHandler();
                if(fh && typeof(fh.format) == "function") {
                    try {
                        fh.format(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer);
                    }
                    catch(ex) {
                        // log exception here
                    }
                }
                var parent = objMatrixColumn.getParent();
                if(parent && typeof(parent.postformat) == "function") {
                    parent.postformat(objDiv, strCDFKey, objMatrix, objMatrixColumn, intRowNumber, objServer);
                }
            };
            }

            return this._jsxuxfh;
        }
        break;
    }
    } catch(ex) {}
}

})(this);
