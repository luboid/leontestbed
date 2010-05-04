//jsx3.require("jsx3.gui.Template");

/** Event handler for mouse wheel event.
 */
if(!window.wheel) {
window.wheel = function(event){
//    jsx3.log("Target: " + event.target);
    if(event.target) {
    var objJSX = jsx3.html.getJSXParent(event.target);
//    jsx3.log("objJSX: " + objJSX);
    if(objJSX) {
        var delta = 0;
//        if (!event) /* For IE. */
//                event = window.event;
//        if (event.wheelDelta) { /* IE/Opera. */
//                delta = event.wheelDelta/120;
                /** In Opera 9, delta differs in sign as compared to IE.
                 */
//                if (window.opera)
//                        delta = -delta;
//        } else if (event.detail) { /** Mozilla case. */
        if (event.detail) { /** Mozilla case. */
                /** In Mozilla, sign of delta is different than in IE.
                 * Also, delta is multiple of 3.
                 */
                delta = -event.detail;
        }
        if(!delta) {
            return;
        }
        if(objJSX.instanceOf("jsx3.gui.Matrix")) {
            var rend = objJSX.getRendered();
            var panel = rend ? rend.childNodes[2] : null;
            if(panel) {
//                jsx3.log("scrollTop: " + panel.scrollTop);
//                jsx3.log("height: " + panel.clientHeight);
//                jsx3.log("scrollHeight: " + panel.scrollHeight);
//                jsx3.log("to be less than: " + (panel.clientHeight - panel.scrollHeight));
//                jsx3.log("evals to: " + (panel.scrollTop < (panel.scrollHeight - panel.clientHeight)))
//                jsx3.log("delta: " + delta);
                if(delta < 0) {
                    if(panel.scrollTop < (panel.scrollHeight - panel.clientHeight)) {
//                        jsx3.log("returning");
                        return;
                    }
                }
                else if (panel.scrollTop > 0) {
//                    jsx3.log("returning 2");
                    return;
                }
//                jsx3.log("continuing");
            }
//            else { jsx3.log("no scrollpane"); }
        }
        var form = objJSX.getAncestorOfType("tibco.uxcore.gui.FormGroup");
        if(!form){
           form = objJSX.getAncestorOfType("tibco.uxcore.gui.Form");
        }
//            jsx3.log("Form: " + form);
            if(form) {
                window.handle(form,-3 * delta);
            }
        }
    }
}

window.handle = function(form,delta) {
//    var focussed = null;
//    var forms = tibco.uxcore.gui.Form.getAllForms();
//    for(var i=0; i<forms.length; i++) {
//        if(forms[i].hasFocus()) {
//            focussed = forms[i];
//            break;
//        }
//    }
//    if(focussed) {
        form.scroll(delta);
//    }
}

    /** Initialization code.
 * If you use your own event management code, change it as required.
 */
if (window.addEventListener)
        /** DOMMouseScroll is for mozilla. */
        window.addEventListener('DOMMouseScroll', window.wheel, false);
/** IE/Opera. */
//window.onmousewheel = document.onmousewheel = wheel;
}


jsx3.lang.Class.defineClass("tibco.uxcore.gui.Form", tibco.uxcore.gui.GenericFormContainer, [tibco.uxcore.gui.IActionVeto],
    function(FORM, form) {

        FORM.globalErrorText = "There are errors in the form";
        FORM.saveSuccessText = "Your changes were successfully saved";
        FORM.savingText = "Saving Data...";

        FORM.STACKED_LAYOUT = 0;
        FORM.LINK_LAYOUT = 1;

        FORM.TYPE_GLOBAL_ERROR = 0;
        FORM.TYPE_ERROR = 1;
        FORM.TYPE_SUCCESS = 2;
        FORM.TYPE_SAVING = 3;

        FORM.getAllForms = function() {
            if(!FORM.allForms) {
                FORM.allForms = [];
            }
            return FORM.allForms;
        }

        form.toggleEditModeOnLoseFocus = jsx3.Boolean.TRUE;
        form.confirmEditsOnLoseFocus = jsx3.Boolean.TRUE;

        form.init = function(strName) {
            this.jsxsuper(strName);
            if(!FORM.allForms) {
                FORM.allForms = [];
            }
            FORM.allForms.push(this);
            this.showGlobalErrors = jsx3.Boolean.TRUE;
            this.toggleEditModeOnLoseFocus = jsx3.Boolean.TRUE;
            this.confirmEditsOnLoseFocus = jsx3.Boolean.TRUE;
            delete this.errortext;
            this.initAndRegister();
        }

        form.setEditMode = function(bEditMode, bRepaint) {
            var ret = tibco.uxcore.gui.FormContainer.prototype.setEditMode.apply(this, arguments);
            if(this.isEditMode()) {
                this.setActive(true);
            }
            return ret;
        }

        form.prepareForm = function() {
            if(this.parentIsFormGroup()) {
                this.overflow = "visible";
                this.setHeight(null,false);
            }
            else {
                this.setHeight("100%",false);
            }
//            jsx3.log("form height: " + this.jsxheight);
//            jsx3.log("form width: " + this.jsxwidth);
//            jsx3.log("form overflow: " + this.overflow);
        }

        form.parentIsFormGroup = function() {
            var ret = false;
            var parent = this.getParent();
            if(parent && parent.instanceOf("tibco.uxcore.gui.FormGroup")) {
                ret = true;
            }
            return ret;
        }

        form.getPanelsPaneOverflow = function() {
            var ret = "auto";
            if(this.parentIsFormGroup()) {
                ret = "visible";
            }
            return ret;
        }

        form.getPanelsPaneHeight = function(parentHeight, headerHeight) {
            var ret = "";
            if(!this.parentIsFormGroup()) {
                ret = this.getSectionHeight(parentHeight - headerHeight,(this.isEditMode() && (this.getButtons().length > 0)) ? 53 : 0);
            }
            return ret;
        }

        form.hasFormGroupParent = function() {
            if(this.getFormGroupParent()) {
                return true;
            }
            return false;
        }

        form.getFormGroupParent = function() {
            return this.getAncestorOfType("tibco.uxcore.gui.FormGroup");
        }

        form.paint = function() {
            this.prepareForm();
            return this.jsxsuper();
        }

        form.setToggleEditModeOnLoseFocus = function(intToggle) {
            this.toggleEditModeOnLoseFocus = (intToggle === jsx3.Boolean.FALSE) ? jsx3.Boolean.FALSE : jsx3.Boolean.TRUE;
        }

        form.getToggleEditModeOnLoseFocus = function() {
            if(this.hasFormGroupParent()) {
                return false;
            }
            return (typeof this.toggleEditModeOnLoseFocus != "undefined") ? this.toggleEditModeOnLoseFocus : jsx3.Boolean.TRUE;
        }

        form.setConfirmEditsOnLoseFocus = function(intConfirm) {
            this.confirmEditsOnLoseFocus = (intConfirm === jsx3.Boolean.FALSE) ? jsx3.Boolean.FALSE : jsx3.Boolean.TRUE;
        }

        form.getConfirmEditsOnLoseFocus = function() {
            if(this.hasFormGroupParent()) {
                return false;
            }
            return (typeof this.confirmEditsOnLoseFocus != "undefined") ? this.confirmEditsOnLoseFocus : jsx3.Boolean.TRUE;
        }

        form._ignoreLoseFocus = function() {
            var parent = this.getFormGroupParent();
            if(parent) {
                return parent._ignoreLoseFocus();
            }
            return this.getArgs().ignoreLoseFocus;
        }

        form._setIgnoreLoseFocus = function(bIgnore) {
            var parent = this.getFormGroupParent();
            if(parent) {
                return parent._setIgnoreLoseFocus(bIgnore);
            }
            else {
                this.getArgs().ignoreLoseFocus = bIgnore;
            }
        }

        form.mayConfirm = function() {
            if(this.hasFormGroupParent()) {
                return false;
            }
            return this.isDirty() && !this._ignoreLoseFocus() && tibco.uxcore.System.confirmEditsOnLoseFocus() && this.getConfirmEditsOnLoseFocus();
        }

        form.mayToggleOnLoseFocus = function() {
            if(this.hasFormGroupParent()) {
                return false;
            }
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
                var group = this.getFormGroupParent();
                if(group) {
                    group.cancelLoseFocus();
                }
                else {
                    this.getArgs().cancelNextLoseFocus = true;
                }
            }
        }

        form.onLoseFocus = function() {
            if(this.hasFormGroupParent()) {
                return;
            }
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
            if(!this.hasFormGroupParent()) {
                jsx3.gui.Event.subscribeLoseFocus(this, this.getRendered(), "onLoseFocus");
            }
            return ret;
        }

        form.onAfterAssemble = function() {
            this.jsxsuper();
            if(!FORM.allForms) {
                FORM.allForms = [];
            }
            FORM.allForms.push(this);
            delete this.sBarWidth;
            delete this.errortext;
            delete this.originalCDF;
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
            var group = this.getFormGroupParent();
            if(group && (this.isEditMode() != group.isEditMode())) {
                this.setEditMode(group.isEditMode(),false)
            }
            this.jsxsuper();
            this.initAndRegister();
        }

        form.scroll = function(intAmount) {
            if(intAmount) {
                var pane = this.getRenderedBox("panelspane");
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

        form.getChildWidth = function(parentWidth) {
//            jsx3.log("------------------------------------Form getting child width");
            if(!parentWidth) {
//                jsx3.log("*****************************Returning 0")
                return 0;
            }
            try {
                delete this.getArgs().childWidth;
//                    this.lastParentWidth = parentWidth;
                // default to not using ctonrollers until it is determined that they are required (based on child widths)
                if(parentWidth == 0) {
                    // if no parent width is specified, just set child width to the same as the greatest of the children'smin widths
                    this.getArgs().childWidth = this.getArgs().minChildWidth;
//                    jsx3.log("**********************using default min width")
                }
                else {
                    var childCount = this.getFormChildren().length;
                    if(childCount == 0) {
                        // if no children, then just return 0
                        this.getArgs().childWidth = 0;
//                        jsx3.log("*****************************Returning 0 for no children")
                    }
                    else {
                        if((parentWidth - this.getScrollbarWidth()) >= this.getArgs().minChildWidth) {
                            this.getArgs().childWidth = parentWidth - (this.parentIsFormGroup() ? 0 : this.getScrollbarWidth());
                        }
                        else if(parentWidth >= this.getArgs().minChildWidth) {
                            this.getArgs().childWidth = parentWidth;
                        }
                        else {
                            this.getArgs().childWidth = this.getArgs().minChildWidth;
                        }
                    }
                }
                if(this.getArgs().childWidth < this.getArgs().minChildWidth) {
                    // cannot go below greatest of children's min widths
                    this.getArgs().childWidth = this.getArgs().minChildWidth;
                }
//                jsx3.log("**********************Returning: " + this.getArgs().childWidth);
                return this.getArgs().childWidth;
            }
            catch(ex) {
//                jsx3.log("*****************************Exception!!!! " + ex.printStackTrace())
                tibco.uxcore.logException(ex);
            }
        }

        form.setChild = function(objChild, intPersist, strSourceURL, strNS) {
            if(objChild.instanceOf("tibco.uxcore.gui.FormPanel")) {
                if(this.getFormChildren().length == 0) {
                    this.getArgs().firstPanel = objChild;
//                    jsx3.log("Setting initial panel to " + objChild);
                }
            }
            else {
                this._checkForButtons(objChild);
            }
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
            if(objChild.instanceOf("tibco.uxcore.gui.FormPanel")) {
                if(this.getFormChildren().length == 0) {
                    this.getArgs().firstPanel = objChild;
//                    jsx3.log("Setting initial panel to " + objChild);
                }
            }
            else {
                this._checkForButtons(objChild);
            }
            return this.jsxsuper(objChild, bRepaint, bForce);
        }

        form.onSetChild = function(objChild) {
            var ret = objChild.instanceOf("tibco.uxcore.gui.FormPanel");
            if(!ret) {
                ret = objChild.instanceOf("tibco.uxcore.gui.FormButton");
            }
            if(!ret && jsx3.IDE) {
                this.getLogger().error("Building Error: Only UX Core Form Panels and Form Buttons are valid children of Forms");
                //tibco.uxcore.System.alert("Building Error", "Only UX Core Form Panels and Form Buttons are valid children of Forms")
            }
            if(ret && objChild.setEditMode) {
                try {
                    objChild.setEditMode(this.isEditMode());
                } catch(ex) {tibco.uxcore.System.logException(ex);}
            }
            return ret;
        }

        form.fieldEdited = function(formfield,strOldValue,strNewValue,isDirty) {
//            jsx3.log("fieldEdited: " + formfield);
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
            var group = this.getFormGroupParent();
            if(group) {
                group.fieldEdited(formfield,strOldValue,strNewValue,dirty);
            }
            else {
            if(dirty) {
                this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
            }
            else {
                this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
            }
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
               arr[i].readCDF(this.getArgs().originalCDF, isRevert);
            }
            var bRepaint = false;
            if(!this.hasFormGroupParent() && this.getArgs().errortext && (this.getArgs().errortext != FORM.globalErrorText)) {
                bRepaint = true;
                this.setErrorText(null,false);
            }
            if(!this.hasFormGroupParent()) {
                if(isSuccess) {
                    this.doSuccess();
                }
                else if(this.getArgs().successtext) {
                    bRepaint = true;
                    this.setSuccessText(null,false);
                }
            }
            this.updateDirtyState();
            if(!this.hasFormGroupParent() && bRepaint && !bNoRepaint) {
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
            if(this.hasFormGroupParent()) {
                return;
            }
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
            if(this.hasFormGroupParent()) {
                return;
            }
            var text = this.getArgs().successtext;
            if(this.getArgs().errortext) {
                text = this.getArgs().errortext;
            }
            this.showSpy(text,objEVENT);
        }

        form.onMouseOverError = function(objEVENT) {
            if(this.hasFormGroupParent()) {
                return;
            }
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

        form.setErrorText = function(strText, bRepaint) {
            var group = this.getFormGroupParent();
            if(group) {
                return;
            }
            this.getArgs().errortext = strText;
            if(strText && this.getArgs().nextPanelId) {
                delete this.getArgs().nextPanelId;
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
            var group = this.getFormGroupParent();
            if(group) {
                return;
            }
            if(strText && (strText != FORM.savingText) && this.getArgs().nextPanelId) {
                this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE);
                this.getArgs().panelId = this.getArgs().nextPanelId;
                delete this.getArgs().nextPanelId;
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
            var group = this.getFormGroupParent();
            if(group) {
                return null;
            }
            return this.getArgs().errortext;
        }

        form.getSuccessText = function() {
            var group = this.getFormGroupParent();
            if(group) {
                return null;
            }
            return this.getArgs().successtext;
        }

        form.doSuccess = function() {
            var group = this.getFormGroupParent();
            if(group) {
                return;
            }
            this.setSuccessText(FORM.saveSuccessText,true);
        }

        form._doSaving = function() {
            var group = this.getFormGroupParent();
            if(group) {
                return;
            }
            this.setSuccessText(FORM.savingText,true);
        }

        form.setShowGlobalErrors = function(bShow) {
            var group = this.getFormGroupParent();
            if(group) {
                return;
            }
            this.setProperty("showGlobalErrors", bShow);
            if(bShow === jsx3.Boolean.TRUE) {
                this.checkForErrors();
            }
            else if(this.getErrorText() == FORM.globalErrorText) {
                this.setErrorText(null, true);
            }
        }

        form.getShowGlobalErrors = function() {
            var group = this.getFormGroupParent();
            if(group) {
                return false;
            }
            return this.showGlobalErrors;
        }

        form.checkForErrors = function(bNoRepaint) {
            var group = this.getFormGroupParent();
            if(group) {
                return group.checkForErrors(bNoRepaint);
            }
//            jsx3.log("Checking for errors")
            var hasErrors = false;
            if(this.showGlobalErrors === jsx3.Boolean.TRUE) {
//                jsx3.log("is global");
                var fields = this.getDescendantsOfType("tibco.uxcore.gui.FormField");
                for(var i = 0; i<fields.length; i++) {
//                    jsx3.log("Checking field " + i);
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

        form.getFormChildren = function() {
            var arr = this.getDescendantsOfType("tibco.uxcore.gui.FormContainer",true);
            if(!arr) {
                arr = [];
            }
            return arr;
        }

        form.getCurrentPanel = function() {
            var ret = null;
            if(this.getLayout() === FORM.LINK_LAYOUT) {
                ret = this.getServer().getJSXById(this.getArgs().panelId);
                if(!ret) {
                    ret = this.getFormChildren()[0];
                }
            }
            return ret;
        }

        form.getCurrentPaintPanel = function() {
//            jsx3.log("Getting current paint panel");
            if(!this.getArgs().currentPaintPanel) {
//                jsx3.log("no current paint panel index, setting to 0");
                return [];
            }
            var ret = [this.getServer().getJSXById(this.getArgs().currentPaintPanel)];
//            jsx3.log("Ret: " + ret);
            return ret;
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
                var titleString = (this.getTitleText() && (this.getTitleText() != "")) ? (" in form '" + this.getTitleText() + "'") : "in the form";
                strMessage = "There are unsaved changes" + titleString + ".  Would you like to save your changes before continuing?";
            }
            tibco.uxcore.System.confirm("Unsaved Changes",strMessage,
                    yesFctn,cancelFctn,"Save","Cancel",2,
                    revertFctn,"Revert",{noCloseButton:true});
        }

        form.linkClicked = function(objEvent,objGUI) {
            var group = this.getFormGroupParent();
            if(group) {
                group.linkClicked(objEvent,objGUI,form);
            }
            else {
//            jsx3.log("Switching away from panel: " + this.getPanelId());
            var valid = (!this.isEditMode() || (this.isEditMode() && this.validateCurrentLinkPanel(true)));
            if(valid) {
                if(this.isEditMode() && (this.isDirty() && !this.currentPanelIsLiveSave())) {
                    this.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                    var panelid = objGUI.getAttribute("panelid");
//                    jsx3.log("to: " + panelid);
                    var me = this;
                    var titleString = (this.getTitleText() && (this.getTitleText() != "")) ? (" in form '" + this.getTitleText() + "'") : "";
                    var message = "There are unsaved changes" + titleString + ".  Would you like to save your changes before switching panels?";
                    this.showConfirm(function(dialog) {
                                         me.setStatus(tibco.uxcore.gui.IActionVeto.STATUS_WAIT);
                                         me._setIgnoreLoseFocus(false);
                                         me.getArgs().nextPanelId = objGUI.getAttribute("panelid");
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
                                         if(me.validateCurrentLinkPanel(true)) {
                                             me.getArgs().panelId = panelid;
                                         }
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
                var oldId = this.getArgs().panelId;
                this.getArgs().panelId = newId;
                bRepaint = (newId != oldId);
            }
            else {
                delete this.getArgs().panelId;
            }
            if(bRepaint) {
                this.repaint();
            }
            }
        }

        form.setLayout = function(intLayout) {
            this.layout = intLayout;
            this.recalcBox();
            this.repaint();
        }

        form.getLayout = function() {
            return this.layout ? this.layout : FORM.STACKED_LAYOUT;
        }

        form.getPanelId = function() {
            var ret = null;
            if(this.getLayout() === FORM.LINK_LAYOUT) {
                ret = this.getArgs().panelId;
                if(!ret) {
                    var panel = this.getFormChildren()[0];
                    if(panel) {
                        ret = this.getArgs().panelId = panel.getId();
                    }
                }
            }
            return ret;
        }

        form.getFormPanels = function() {
            if(this.getLayout() === FORM.LINK_LAYOUT) {
                var arr = new Array();
                if(this.getPanelId()) {
//                    jsx3.log("getting form panel: " + this.getPanelId());
                    var panel = tibco.uxcore.System.getServer().getJSXById(this.getPanelId());
                    if(panel) {
//                        jsx3.log("got it")
                        arr.push(panel);
                    }
                }
                if(arr.length == 0) {
//                    jsx3.log("current panel not found")
                    var panel = this.getFormChildren()[0];
                    if(panel) {
//                        jsx3.log("using first panel");
                        this.getArgs().panelId = panel.getId();
                        arr.push(panel);
                    }
                }
                return arr;
            }
            return this.getFormChildren();
        }

        form.getButtons = function() {
            return this.getDescendantsOfType("tibco.uxcore.gui.FormButton",true);
        }

        form.validate = function() {
            var arr = this.getFormChildren();
            var ret = true;
            for(var i = 0; i < arr.length; i++) {
                var child = arr[i];
//                if(child.isEditable() && child.isEditMode()) {
                if(child.isEditMode()) {
                    var valid = child.validate();
                    if(!valid) {
                        ret = false;;
                    }
                }
            }
            if(!this.hasFormGroupParent()) {
                this.checkForErrors();
            }
            return ret;
        }

        form.getEditedCDF = function(bAllAttributes, cdf, bForce) {
            var valid = bForce ? bForce : false;
            if(!valid) {
            if(this.getLayout() === FORM.LINK_LAYOUT) {
                valid = this.validateCurrentLinkPanel();
            }
            else {
                valid = this.validate();
            }
            }
            if(valid) {
                if(!cdf) {
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
                }
                if(!cdf.selectNodeIterator("//record").hasNext()) {
                    cdf.insertRecord({jsxid:jsx3.xml.CDF.getKey()});
                }
                var arr = this.getFormChildren();
                for(var i=0; i<arr.length; i++) {
                    arr[i].writeCDF(cdf);
                }
            }
            return cdf;
        }

        form.validateCurrentLinkPanel = function(bNoRepaint) {
            var valid = false;
            var panel = this.getCurrentPanel();
            if(panel) {
                valid = panel.validate();
            }
            if(!this.hasFormGroupParent()) {
                this.checkForErrors(bNoRepaint);
            }
            return valid;
        }

        form.currentPanelIsLiveSave = function() {
            var live = false;
            var panel = this.getCurrentPanel();
            if(panel) {
                live = panel.isLiveSave();
            }
            return live;
        }

        form.doSave = function() {
            var group = this.getFormGroupParent();
            if(group) {
                return group.doSave();
            }
            var ret = true;
            if(this.getLayout() === FORM.LINK_LAYOUT) {
                ret = this.validateCurrentLinkPanel();
            }
            else {
                var children = this.getDescendantsOfType("tibco.uxcore.gui.FormField");
            for(var i=0; i<children.length; i++) {
                var child = children[i];
                if(child.isEditable() && child.isEditMode()) {
                    var valid = child.validate();
                    if(!valid) {
                        ret = false;;
                    }
                }
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

        form._doRevert = function(bNoRepaint) {
            this.getArgs().isReverting = true;
            this.setCDF(null,true,false,bNoRepaint);
            var arr = tibco.uxcore.gui.IListView ? this.findDescendants(function(obj){return obj.instanceOf("tibco.uxcore.gui.IListView")}, true, true, false, false) : [];
            for(var i=0; i<arr.length; i++) {
                arr[i].revert();
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
                var group = this.getFormGroupParent();
                if(group) {
                    group.childContentChanged(this, formField, dirty, type);
                }
            }
            catch(ex) {
                jsx3.log("Form publishEvent error, with topicId=jsxchange: " + ex);
                return false;
            }
        }

        FORM.templateXML = tibco.uxcore.System.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.form/templates/form.xml","formTemplate","xml").toString();
        if(jsx3.CLASS_LOADER.getType() == "fx2") {
            FORM.templateXML = FORM.templateXML.replace(/inlinebox/g, "div");
        }
        jsx3.gui.Template.compile(FORM.templateXML,FORM.jsxclass);
    }
);