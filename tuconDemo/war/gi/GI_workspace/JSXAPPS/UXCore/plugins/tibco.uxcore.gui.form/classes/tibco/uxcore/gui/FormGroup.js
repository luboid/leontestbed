jsx3.lang.Class.defineClass("tibco.uxcore.gui.FormGroup", tibco.uxcore.gui.GenericFormContainer, [tibco.uxcore.gui.IActionVeto,tibco.uxcore.gui.FormContainer],
    function(FORM, form) {

        FORM.globalErrorText = "There are errors in the form";
        FORM.saveSuccessText = "Your changes were successfully saved";
        FORM.savingText = "Saving Data...";

        FORM.TYPE_GLOBAL_ERROR = 0;
        FORM.TYPE_ERROR = 1;
        FORM.TYPE_SUCCESS = 2;
        FORM.TYPE_SAVING = 3;

        form.toggleEditModeOnLoseFocus = jsx3.Boolean.TRUE;
        form.confirmEditsOnLoseFocus = jsx3.Boolean.TRUE;

        form.init = function(strName) {
            this.jsxsuper(strName);
            this.showGlobalErrors = jsx3.Boolean.TRUE;
            this.toggleEditModeOnLoseFocus = jsx3.Boolean.TRUE;
            this.confirmEditsOnLoseFocus = jsx3.Boolean.TRUE;
            delete this.errortext;
            this.initAndRegister();
        }

//        form.setEditMode = function(bEditMode, bRepaint) {
//            return tibco.uxcore.gui.FormContainer.prototype.setEditMode.apply(this, arguments);
//        }
//
        form.getFormChildren = function() {
            return this.getDescendantsOfType("tibco.uxcore.gui.Form");
        }

        form.setToggleEditModeOnLoseFocus = function(intToggle) {
            this.toggleEditModeOnLoseFocus = (intToggle === jsx3.Boolean.FALSE) ? jsx3.Boolean.FALSE : jsx3.Boolean.TRUE;
        }

        form.getToggleEditModeOnLoseFocus = function() {
            return (typeof this.toggleEditModeOnLoseFocus != "undefined") ? this.toggleEditModeOnLoseFocus : jsx3.Boolean.TRUE;
        }

        form.setConfirmEditsOnLoseFocus = function(intConfirm) {
            this.confirmEditsOnLoseFocus = (intConfirm === jsx3.Boolean.FALSE) ? jsx3.Boolean.FALSE : jsx3.Boolean.TRUE;
        }

        form.getConfirmEditsOnLoseFocus = function() {
            return (typeof this.confirmEditsOnLoseFocus != "undefined") ? this.confirmEditsOnLoseFocus : jsx3.Boolean.TRUE;
        }

        form._ignoreLoseFocus = function() {
            if(this.getArgs().ignoreLoseFocus) {
                return true;
            }
            var forms = this.getFormChildren();
            for(var i = 0; i<forms.length; i++) {
                if(forms[i].getArgs().ignoreLoseFocus) {
                    return true;
                }
            }
            return false
        }

        form._setIgnoreLoseFocus = function(bIgnore) {
            this.getArgs().ignoreLoseFocus = bIgnore;
        }

        form.mayConfirm = function() {
            return this.isDirty() && !this._ignoreLoseFocus() && tibco.uxcore.System.confirmEditsOnLoseFocus() && this.getConfirmEditsOnLoseFocus();
        }

        form.mayToggleOnLoseFocus = function() {
            return !this.isDirty() && tibco.uxcore.System.toggleEditModeOnLoseFocus()  && this.getToggleEditModeOnLoseFocus();
        }

        form.cancelLoseFocus = function() {
//            jsx3.log("Cancelling lose focus");
            if(this.getArgs().loseFocusTimeout) {
//                jsx3.log("Clearing existing timeout");
                clearTimeout(this.getArgs().loseFocusTimeout);
                delete this.getArgs().loseFocusTimeout;
            }
            else {
//                jsx3.log("Flagging to cancel next lose focus");
                this.getArgs().cancelNextLoseFocus = true;
            }
        }

        form.onLoseFocus = function() {
            if(tibco.uxcore.gui.IFocusManager.focussing) {
                return;
            }
            // use a timeout to give the fields a moment to update their values if needed.
            jsx3.sleep(function(){this._onLoseFocus();},"loseFocus" + this.getId(),this);
        }

        form._onLoseFocus = function() {
//            jsx3.log("Lose Focus at: " + (new jsx3.lang.Exception("")).printStackTrace());
            if(this._ignoreLoseFocus()) {
                return;
            }
            if(this.getArgs().cancelNextLoseFocus) {
//                jsx3.log("returning due to cancel next lose focus flag");
                this.getArgs().cancelNextLoseFocus = false;
                return;
            }
//            jsx3.log("Creating lose focus timeout");
            var meForm = this;
            this.getArgs().loseFocusTimeout = setTimeout(function() {
//                jsx3.log("Applying for lost focus: " + meForm._ignoreLoseFocus());
            if(meForm.mayConfirm()) {
//                jsx3.log("1");
                meForm._setIgnoreLoseFocus(true);
//                jsx3.log("2");
                meForm.showConfirm();
//                jsx3.log("3");
//                jsx3.sleep(function() {this.showConfirm();},null,this);
            }
            else if(meForm.mayToggleOnLoseFocus()) {
//                jsx3.log("4");
                meForm.setEditMode(false,true);
//                jsx3.log("5");
            }
//                jsx3.log("6");
                delete meForm.getArgs().loseFocusTimeout;
            },0);
        }

        form.onAfterPaint = function() {
            var ret = this.jsxsuper(arguments);
            jsx3.gui.Event.unsubscribeLoseFocus(this);
            jsx3.gui.Event.subscribeLoseFocus(this, this.getRendered(), "onLoseFocus");
            return ret;
        }

        form.onAfterAssemble = function() {
            this.jsxsuper();
            if((typeof this.showGlobalErrors == "undefined") || this.showGlobalErrors == null) {
                this.showGlobalErrors = jsx3.Boolean.TRUE;
            }
            if((typeof this.toggleEditModeOnLoseFocus == "undefined") || this.toggleEditModeOnLoseFocus == null) {
                this.toggleEditModeOnLoseFocus = jsx3.Boolean.TRUE;
            }
            if((typeof this.confirmEditsOnLoseFocus == "undefined") || this.confirmEditsOnLoseFocus == null) {
                this.confirmEditsOnLoseFocus = jsx3.Boolean.TRUE;
            }
        }

        form.onAfterAttach = function() {
            this.jsxsuper();
            this.initAndRegister();
        }

        form.scroll = function(intAmount) {
            if(intAmount) {
                var pane = this.getRenderedBox("contentpane");
                pane.scrollTop = pane.scrollTop + intAmount;
            }
        }

form.getScrollbarWidth = function() {
    try {
    if(!this.getArgs().sBarWidth) {
  this.getArgs().sBarWidth = 0;
  var scr = null;
  var inn = null;

  if (jsx3.CLASS_LOADER.getType().indexOf("ie") >= 0) {
    // create form
    scr = document.createElement('form');

    // move form off screen so no one can see it
    scr.style.position = 'absolute';
    scr.style.top = '-1000px';
    scr.style.left = '-1000px';

    // create a text area
    inn = document.createElement('textarea');

    //set id so we can grab it later
    inn.setAttribute('id', 'ta');

    // add textarea to form
    scr.appendChild(inn);

    // add the element to the document
    document.getElementsByTagName("body")[0].appendChild(scr);

    // grab the text area by id
    var tarea = document.getElementById('ta');

    // turn scroll bars off
    tarea.wrap = 'off';

    // get height
    this.getArgs().sBarWidth = tarea.offsetHeight;

    // turn scroll bars on
    tarea.wrap = 'soft';

    // get difference
    this.getArgs().sBarWidth -= tarea.offsetHeight;
  } else {
    var wNoScroll = 0;
    var wScroll = 0;

    // Outer scrolling div
    scr = document.createElement('div');

    // move form off screen so no one can see it
    scr.style.position = 'absolute';
    scr.style.top = '-1000px';
    scr.style.left = '-1000px';

    // set binding height and width
    scr.style.width = '100px';
    scr.style.height = '50px';

    // Start with no scrollbar
    scr.style.overflow = 'hidden';

    // Inner content div
    inn = document.createElement('div');
    inn.style.width = '100%';
    inn.style.height = '200px';

    // Put the inner div in the scrolling div
    scr.appendChild(inn);

    // Append the scrolling div to the doc
    document.body.appendChild(scr);

    // Width of the inner div sans scrollbar
    wNoScroll = inn.offsetWidth;

    // Add the scrollbar
    scr.style.overflow = 'auto';

    // Width of the inner div width scrollbar
    wScroll = inn.offsetWidth;

    // Pixel width of the scrolbar
    this.getArgs().sBarWidth = ((wNoScroll - wScroll) + 2);
  }

  // Remove the scrolling div from the doc
  document.body.removeChild(document.body.lastChild);
        if(!this.getArgs().sBarWidth || (this.getArgs().sBarWidth <= 0)) {
            this.getArgs().sBarWidth = 22;
        }
    }
    } catch(ex) {
        jsx3.log(jsx3.lang.NativeError.wrap(ex).printStackTrace());
        this.getArgs().sBarWidth = 22;
    }
//    jsx3.log("Returning scrollbar width: " + this.getArgs().sBarWidth);
  return this.getArgs().sBarWidth;
}

//        form.repaint = function() {
//                this.jsxsuper();
//        }

        form.rescanChildren = function() {
            // do nothing
        }

        form.getLastChildWidth = function() {
            var w = this.getArgs().lastChildWidth;
            return w ? w : 0;
        }

        form.getChildWidth = function(parentWidth) {
            this.getArgs().lastChildWidth = 0;
//            jsx3.log("------------------------------------Form getting child width");
            if(!parentWidth) {
//                jsx3.log("*****************************Returning 0")
                return 0;
            }
            this.getArgs().lastChildWidth = (parentWidth - this.getScrollbarWidth()) - 5;
            return this.getArgs().lastChildWidth;
        }

        form.setChild = function(objChild, intPersist, strSourceURL, strNS) {
            this._checkForButtons(objChild);
            return this.jsxsuper(objChild, jsx3.app.Model.PERSISTEMBED, strSourceURL, strNS);
        }

        form._checkForButtons = function(obj) {
            if(obj.instanceOf("tibco.uxcore.gui.FormButton")) {
            var events = obj.getEvents();
            if(events) {
                var execute = events["jsxexecute"];
                if(execute) {
                    if(execute.indexOf("doSave") != -1) {
                        this.getArgs().saveButton = obj;
                        jsx3.sleep(function() {obj.setEnabled(jsx3.gui.Form.STATEDISABLED,true);obj.repaint();},"changeEnabled" + obj.getId(),this);
                    }
                    else if(execute.indexOf("doRevert") != -1) {
                        this.getArgs().revertButton = obj;
                        jsx3.sleep(function() {obj.setEnabled(jsx3.gui.Form.STATEDISABLED,true);obj.repaint();},"changeEnabled" + obj.getId(),this);
                    }
                }
            }
            }
        }

        form.adoptChild = function(objChild, bRepaint, bForce) {
            this._checkForButtons(objChild);
            return this.jsxsuper(objChild, bRepaint, bForce);
        }

        form.onSetChild = function(objChild) {
            if(objChild.setEditMode) {
                try {
                    objChild.setEditMode(this.isEditMode());
                } catch(ex) {tibco.uxcore.System.logException(ex);}
            }
            return true;
        }

        form.fieldEdited = function(formfield,strOldValue,strNewValue,isDirty) {
            jsx3.log("fieldEdited: " + formfield);
//            jsx3.log("     oldVal: " + strOldValue);
//            jsx3.log("     newVal: " + strNewValue);
//            jsx3.log("     isDirty: " + isDirty);
            if(!this.getArgs().saveButton || !this.getArgs().revertButton) {
            var buttons = this.getDescendantsOfType("tibco.uxcore.gui.FormButton",true);
            for(var i=0; i<buttons.length; i++) {
                var events = buttons[i].getEvents();
                if(events) {
                    var execute = events["jsxexecute"];
                    if(execute) {
                        if(execute.indexOf("doSave") != -1) {
                            this.getArgs().saveButton = buttons[i];
                        }
                        else if(execute.indexOf("doRevert") != -1) {
                            this.getArgs().revertButton = buttons[i];
                        }
                    }
                }
            }
            }
            if(this.getArgs().saveButton || this.getArgs().revertButton) {
            var dirty = isDirty;
            if(!dirty) {
                dirty = this.isDirty();
            }
            if(dirty) {
                this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
            }
            else {
                this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
            }
//                jsx3.log("     form isDirty: " + dirty);
            var state = dirty ? jsx3.gui.Form.STATEENABLED : jsx3.gui.Form.STATEDISABLED;
//                jsx3.log("     setting enabled state: " + state);
            if(this.getArgs().saveButton) {
                this.getArgs().saveButton.setEnabled(state);
                this.getArgs().saveButton.repaint()
            }
                if(this.getArgs().revertButton) {
                    this.getArgs().revertButton.setEnabled(state);
                    this.getArgs().revertButton.repaint()
                }
            }
        }

        form.setCDF = function(cdf,isRevert,isSuccess,bNoRepaint) {
            if(cdf) {
                this.getArgs().originalCDF = cdf.cloneDocument();
            }
            if(!this.getArgs().originalCDF) {
                this.getArgs().originalCDF = jsx3.xml.CDF.Document.newDocument();
            }
            var arr = this.getFormChildren();
            for(var i=0; i<arr.length; i++) {
                if(isRevert) {
                    arr[i].setCDF(null, true, false, bNoRepaint);
                }
                else {
                    arr[i].setCDF(this.getArgs().originalCDF, isRevert, isSuccess, true);
                }
            }
            var bRepaint = false;
            if(this.getArgs().errortext && (this.getArgs().errortext != FORM.globalErrorText)) {
                bRepaint = true;
                this.setErrorText(null,false);
            }
            if(isSuccess) {
                this.doSuccess();
            }
            else if(this.getArgs().successtext) {
                bRepaint = true;
                this.setSuccessText(null,false);
            }
            this.updateDirtyState();
            if(bRepaint && !bNoRepaint) {
                this.repaint();
            }
        }

        form.afterUpdateDirtyState = function(dirty) {
            this.fieldEdited(null,null,null,dirty);
        }


        form.setTitleText = function(strText, bRepaint) {
            this.setProperty("titletext", strText);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        form.getTitleText = function() {
            return this.titletext;
        }

        form.closeError = function() {
            var type = FORM.TYPE_SUCCESS;
            var text = this.getArgs().successtext;
            if(this.getArgs().errortext) {
                text = this.getArgs().errortext;
                if(this.getArgs().errortext == FORM.globalErrorText) {
                    type = FORM.TYPE_GLOBAL_ERROR;
                }
                else {
                    type = FORM.TYPE_ERROR;
                }
            }
            else if(this.getArgs().successtext) {
                if(this.getArgs().successtext == FORM.savingText) {
                    type = FORM.TYPE_SAVING;
                }
            }
            var val;
            try {
                val = this.doEvent("onCloseMessage",{intTYPE:type,strMESSAGE:text});
            }
            catch(ex) {
                jsx3.log("Error in event handler for onCloseMessage");
                tibco.uxcore.System.logException(ex);
            }
            if(val || (typeof val == "undefined")) {
                this.setErrorText(null,false);
                this.setSuccessText(null,true);
            }
//            else {
//                jsx3.log("Vetoed close message");
//            }
        }

        form.onMouseOver = function(objEVENT) {
            var text = this.getArgs().successtext;
            if(this.getArgs().errortext) {
                text = this.getArgs().errortext;
            }
            this.showSpy(text,objEVENT);
        }

        form.onMouseOverError = function(objEVENT) {
            var text = this.getArgs().successtext;
            if(this.getArgs().errortext) {
                text = this.getArgs().errortext;
            }
            this.showSpy(text,objEVENT);
        }

        form.onMouseOverInstructions = function(objEVENT) {
            var text = this.instructionstext;
            this.showSpy(text,objEVENT);
        }

        form.onMouseOut = function() {
            jsx3.gui.Interactive.hideSpy();
        }

        form.onMouseOverClose = function(objEVENT) {
            var text = "Close message";
            this.showSpy(text,objEVENT);
        }

        form.isNextPanelId = function() {
            var arr = this.getFormChildren();
            for(var i=0; i<arr.length; i++) {
                if(arr[i].getArgs().nextPanelId) {
                    return true;
                }
            }
            return false;
        }

        form.releaseNextPanelId = function() {
            var arr = this.getFormChildren();
            for(var i=0; i<arr.length; i++) {
                if(arr[i].getArgs().nextPanelId) {
                    arr[i].getArgs().panelId = arr[i].getArgs().nextPanelId;
                    delete arr[i].getArgs().nextPanelId;
                }
            }
        }

        form.clearNextPanelId = function() {
            var arr = this.getFormChildren();
            for(var i=0; i<arr.length; i++) {
                if(arr[i].getArgs().nextPanelId) {
                    delete arr[i].getArgs().nextPanelId;
                }
            }
        }

        form.setErrorText = function(strText, bRepaint) {
            this.getArgs().errortext = strText;
            if(strText && this.isNextPanelId()) {
                this.clearNextPanelId();
                this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
            }
            else if(!strText) {
                this.setStatus(this.isDirty() ? tibco.uxcore.gui.IActionVeto.STATUS_CANCEL : tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
            }
            delete this.getArgs().successtext;
//            this.setProperty("errortext", strText);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        form.setSuccessText = function(strText, bRepaint) {
            if(strText && (strText != FORM.savingText) && this.isNextPanelId()) {
                this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
                this.releaseNextPanelId();
            }
            else if(!strText) {
                this.setStatus(this.isDirty() ? tibco.uxcore.gui.IActionVeto.STATUS_WAIT : tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
            }
            this.getArgs().successtext = strText;
            delete this.getArgs().errortext;
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        form.getErrorText = function() {
            return this.getArgs().errortext;
        }

        form.getSuccessText = function() {
            return this.getArgs().successtext;
        }

        form.doSuccess = function() {
            this.setSuccessText(FORM.saveSuccessText,true);
        }

        form._doSaving = function() {
            this.setSuccessText(FORM.savingText,true);
        }

        form.setShowGlobalErrors = function(bShow) {
            this.setProperty("showGlobalErrors", bShow);
            if(bShow === jsx3.Boolean.TRUE) {
                this.checkForErrors();
            }
            else if(this.getErrorText() == FORM.globalErrorText) {
                this.setErrorText(null, true);
            }
        }

        form.getShowGlobalErrors = function() {
            return this.showGlobalErrors;
        }

        form.checkForErrors = function(bNoRepaint) {
            jsx3.log("Checking for errors")
            var hasErrors = false;
            if(this.showGlobalErrors === jsx3.Boolean.TRUE) {
//                jsx3.log("is global");
                var fields = this.getDescendantsOfType("tibco.uxcore.gui.FormField");
                for(var i = 0; i<fields.length; i++) {
                    jsx3.log("Checking field " + i);
                    if(fields[i].getErrorText()) {
                        hasErrors = true;
//                        jsx3.log("has error");
                        break;
                    }
                }
//                jsx3.log("1")
                if(hasErrors && !this.getErrorText()) {
//                    jsx3.log("2")
                    this.setErrorText(FORM.globalErrorText, !bNoRepaint);
                }
                else if(!hasErrors && (this.getErrorText() == FORM.globalErrorText)) {
//                    jsx3.log("3")
                    this.setErrorText(null, !bNoRepaint);
                }
//                jsx3.log("4")
            }
            return hasErrors;
        }

        form.setInstructionsText = function(strText, bRepaint) {
            this.setProperty("instructionstext", strText);
            if(bRepaint) {
                this.repaint();
            }
            return this;
        }

        form.getInstructionsText = function() {
            return this.instructionstext;
        }

        form.onDestroy = function(objParent) {
            this.unregister();
            this.jsxsuper();
        }

        form.showConfirm = function(yesFctn,cancelFctn,revertFctn,strMessage) {
            this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
            var me = this;
            if(!yesFctn) {
                yesFctn = function(dialog) {
                    me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                    me.doSave();
                    dialog.doClose();
                    jsx3.sleep(function(){me._setIgnoreLoseFocus(false);},null,me);
                }
            }
            if(!cancelFctn) {
                cancelFctn = function(dialog) {
//                    jsx3.log("Cancel");
                    me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CANCEL);
//                    jsx3.log("Cancel status set")
                    me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
//                    jsx3.log("wait status set");
                    dialog.doClose();
//                    jsx3.log("dialog closed");
//                    me.repaint();
//                    jsx3.log("Repainted");
                    jsx3.sleep(function(){me._setIgnoreLoseFocus(false);},null,me)
//                    jsx3.log("no longer ignoring lose focus")
                }
            }
            if(!revertFctn) {
                revertFctn = function(dialog) {
                    me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                    me._doRevert(true);
                    dialog.doClose();
                    if(me.mayToggleOnLoseFocus()) {
                        me.setEditMode(false,true);
                    }
                    me._setIgnoreLoseFocus(false);
                }
            }
            if(!strMessage) {
                var titleString = (this.getTitleText() && (this.getTitleText() != "")) ? (" in form group'" + this.getTitleText() + "'") : "in the form";
                strMessage = "There are unsaved changes" + titleString + ".  Would you like to save your changes before continuing?";
            }
            tibco.uxcore.System.confirm("Unsaved Changes",strMessage,
                    yesFctn,cancelFctn,"Save","Cancel",2,
                    revertFctn,"Revert",{noCloseButton:true});
        }

        form.linkClicked = function(objEvent,objGUI,form) {
            var valid = (!form.isEditMode() || (form.isEditMode() && form.validateCurrentLinkPanel(true)));
            if(valid) {
                if(this.isEditMode() && (form.isDirty() && !form.currentPanelIsLiveSave())) {
                    this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                    var panelid = objGUI.getAttribute("panelid");
//                    jsx3.log("to: " + panelid);
                    var me = this;
                    var titleString = (form.getTitleText() && (form.getTitleText() != "")) ? (" in form '" + form.getTitleText() + "'") : "";
                    var message = "There are unsaved changes" + titleString + ".  Would you like to save your changes before switching panels?";
                    this.showConfirm(function(dialog) {
                                         me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                                         me._setIgnoreLoseFocus(false);
                                         form.getArgs().nextPanelId = objGUI.getAttribute("panelid");
                                         me.doSave();
                                         dialog.doClose();
                                     },
                                     function(dialog) {
                                         me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CANCEL);
                                         me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                                         me._setIgnoreLoseFocus(false);
                                         dialog.doClose();
                                         me.repaint();
                                     },
                                     function(dialog) {
                                         me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                                         me._setIgnoreLoseFocus(false);
                                         me._doRevert(true);
                                         if(form.validateCurrentLinkPanel(true)) {
                                             form.getArgs().panelId = panelid;
                                         }
                                         me.checkForErrors(true);
                                         dialog.doClose();
                                         me.repaint();
                                     },
                                     message)
                }
                else {
                    this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
                }
            }
            var bRepaint = true;
            if(objGUI) {
                var newId = objGUI.getAttribute("panelid");
                var oldId = form.getArgs().panelId;
                form.getArgs().panelId = newId;
                bRepaint = (newId != oldId);
            }
            else {
                delete form.getArgs().panelId;
            }
            this.checkForErrors(bRepaint);
            if(bRepaint) {
                form.repaint();
            }
        }

        form.getButtons = function() {
            return this.getDescendantsOfType("tibco.uxcore.gui.FormButton",true);
        }

        form.getNonButtonChildren = function() {
            var ret = [];
            var children = this.getChildren();
            for(var i=0; i<children.length; i++) {
                var child = children[i];
                if(!child.instanceOf("tibco.uxcore.gui.FormButton")) {
                    ret.push(child);
                }
            }
            return ret;
        }

        form.validate = function() {
            jsx3.log("Validate");
            var arr = this.getFormChildren();
            var ret = true;
            for(var i = 0; i < arr.length; i++) {
                var cForm = arr[i];
                var valid = false;
                if(cForm.getLayout() == tibco.uxcore.gui.Form.LINK_LAYOUT) {
                    valid = cForm.validateCurrentLinkPanel();
                }
                else {
                    valid = cForm.validate();
                }
                if(!valid) {
                    ret = false;
                }
            }
            this.checkForErrors();
            return ret;
        }

        form.getEditedCDF = function(bAllAttributes) {
            var cdf = null;
            var valid = this.validate();
            if(valid) {
                if(bAllAttributes) {
                    cdf = this.getArgs().originalCDF ? this.getArgs().originalCDF.cloneDocument() : jsx3.xml.CDF.Document.newDocument();
                }
                else {
                    cdf = jsx3.xml.CDF.Document.newDocument();
                    if(this.getArgs().originalCDF) {
                        var iter = this.getArgs().originalCDF.selectNodeIterator("//record");
                        while(iter.hasNext()) {
                            var record = iter.next();
                            cdf.insertRecord({jsxid:record.getAttribute("jsxid"), jsxtext:record.getAttribute("jsxtext")});
                        }
                    }
                }
                if(!cdf.selectNodeIterator("//record").hasNext()) {
                    cdf.insertRecord({jsxid:jsx3.xml.CDF.getKey()});
                }
                var arr = this.getFormChildren();
                for(var i=0; i<arr.length; i++) {
                    cdf = arr[i].getEditedCDF(false,cdf,true);
                }
            }
            return cdf;
        }

        form.doSave = function() {
            var ret = true;
            var arr = this.getFormChildren();
            for(var i = 0; i < arr.length; i++) {
                var cForm = arr[i];
                var valid = false;
                if(cForm.getLayout() == tibco.uxcore.gui.Form.LINK_LAYOUT) {
                    valid = cForm.validateCurrentLinkPanel();
                }
                else {
                    valid = cForm.validate();
                }
                if(!valid) {
                    ret = false;
                }
            }
            if(ret) {
            try {
                this._doSaving();
                var me = this;
                setTimeout(function() {
                    me.doEvent("saveclicked", {});
                },0);
            } catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
            }
            else {
                this.checkForErrors();
            }
            return ret;
        }

        form.cycleFocus = function() {
            return false;
        }

        form.focusNextChild = function() {

        }

        form.focusPreviousChild = function() {

        }

        form.focusLost = function() {

        }

        form.focusTaken = function() {

        }

        form._doRevert = function(bNoRepaint) {
            this.getArgs().isReverting = true;
            this.setCDF(null,true,false,bNoRepaint);
            var forms = this.getFormChildren();
            for(var i=0; i<forms.length; i++) {
                var cForm = forms[i];
                var arr = tibco.uxcore.gui.IListView ? cForm.findDescendants(function(obj){return obj.instanceOf("tibco.uxcore.gui.IListView")}, true, true, false, false) : [];
                for(var j=0; j<arr.length; j++) {
                    arr[j].revert();
                }
            }
            try {
                this.doEvent("contentreverted", {});
            } catch(ex) {
                tibco.uxcore.System.logException(ex);
            }
            var me = this;
            setTimeout(function() {
                me.getArgs().isReverting = false;
                me.childContentChanged(null,null,me.isDirty(),"revert");
                me.fieldEdited(null,null,null,false);
            },0);
        }

        form.doRevert = function(parentContainer, bNoConfirm) {
            if(!bNoConfirm) {
            var me = this;
						var alerter = parentContainer || tibco.uxcore.System;
                this._setIgnoreLoseFocus(true);
            alerter.confirm("Discard edits?", "Are you sure you wish to discard your edits?",function(dialog) {
                me._doRevert(bNoConfirm);
                dialog.doClose();
                jsx3.sleep(function(){me._setIgnoreLoseFocus(false);},null,me);
            },
            function(dialog) {
                me.focus();
                dialog.doClose();
                jsx3.sleep(function(){me._setIgnoreLoseFocus(false);},null,me);
            });
            }
            else {
                this._doRevert()
            }
        }

        form.childContentChanged = function(objChild, formField, isDirty, type) {
            // publish change event
            try {
//                jsx3.log("got child content changed");
                var dirty = this.updateDirtyState();
                if(!this.getArgs().isReverting) {
                    if(dirty) {
                        this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                    }
                    else {
                        this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
                    }
                    this.doEvent("jsxchange", {target: this, formfield: formField, isDirty: dirty, type: type});
                }
            }
            catch(ex) {
                jsx3.log("Form publishEvent error, with topicId=jsxchange: " + ex);
                return false;
            }
        }

        FORM.templateXML = tibco.uxcore.System.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.form/templates/formgroup.xml","formGroupTemplate","xml").toString();
        if(jsx3.CLASS_LOADER.getType() == "fx2") {
            FORM.templateXML = FORM.templateXML.replace(/inlinebox/g, "div");
        }
        jsx3.gui.Template.compile(FORM.templateXML,FORM.jsxclass);
    }
);