
(function(plugIn){

//jsx3.require("jsx3.gui.Dialog", "jsx3.gui.ImageButton");

/**
 * Renders a dialog window. A dialog can contain other DOM objects; usually a dialog contains one child of type
 * <code>jsx3.gui.WindowBar</code> and one child of type <code>jsx3.gui.Block</code>.
 */
jsx3.Class.defineClass("tibco.uxcore.gui.Dialog", jsx3.gui.Dialog, [jsx3.gui.Alerts], function(DIALOG, dialog) {

    DIALOG.MAX_BUTTON_NAME   = "btnMaximize";
    DIALOG.MIN_BUTTON_NAME   = "btnMinimize";
    DIALOG.CLOSE_BUTTON_NAME = "btnClose";

    DIALOG.MAX_BUTTON_TYPE   = "MAX";
    DIALOG.MIN_BUTTON_TYPE   = "MIN";
    DIALOG.CLOSE_BUTTON_TYPE = "CLOSE";

    var Interactive = jsx3.gui.Interactive;

    dialog.getLogger = function() {
        return jsx3.util.Logger.getLogger(this.getClass().getName());
    };

    dialog.getDynamicProperty = function(key) {
        return plugIn.getServer().getDynamicProperty(key);
    };

	/**
	 * Get the real path of address setted in dynamic property
	 * @param propName {String} dynamic property name
	 */
    dialog.getDynamicURL = function(propName) {
        var value = plugIn.getServer().getDynamicProperty(propName);
        if(value) return plugIn.getServer().resolveURI(value);
    };

    /**
     * It is a utility funciton to set multiple (list them in objSetting:property) dynamic properties together
     * @param objJSX {Object}
     * @param objSetting {Array} properties list
     * @param bNotSave {Boolean} if <code>true</code>,this value will not be saved to GUI
     */
    dialog.setDefaultProperty = function(objJSX, objSetting, bNotSave) {
        for(var i in objSetting) {
            if(objJSX[i] || objJSX.getDynamicProperty(i)) continue;
            objJSX.setDynamicProperty(i, objSetting[i], bNotSave);
        };
        return objJSX;
    };

    dialog._getDialogButton = function(TYPE) {
        var jButton = null;
        if(jsx3.lang.Class.forName("jsx3.gui.ImageButton")) {
            jButton = jsx3.$A(this.getDescendantsOfType("jsx3.gui.ImageButton")).find(function(btn) {
                return btn.jsxdlgbtntype == tibco.uxcore.gui.Dialog[TYPE + "_BUTTON_TYPE"];
            });
            if(jButton) return jButton;
        }
        return this.getDescendantOfName(DIALOG[TYPE + "_BUTTON_NAME"]);
    };

    dialog._setButtonStyle = function() {
        //Set default dynamic properties and those properties only exist at runtime.
        var jButton;
        if(jButton = this._getDialogButton("MIN")) {
            this.setDefaultProperty(jButton, {
               "jsxwidth": "@uxcore10@dialog@buttonWidth",
               "jsxheight": "@uxcore10@dialog@buttonHeight",
               "jsxstyleoverride": "@uxcore10@dialog@buttonOverride",
               "jsximage":"@uxcore10@dialog@minBtnImg",
               "jsxtip":"@Min Tip",
               "jsxmargin": "@uxcore10@dialog@buttonMargin"
            }, true);
            jButton.jsxdlgbtntype = DIALOG.MIN_BUTTON_NAME;
            jButton.subscribe(Interactive.EXECUTE, this, this.doToggleState);
        }
        if(jButton = this._getDialogButton("MAX")) {
            this.setDefaultProperty(jButton, {
               "jsxwidth": "@uxcore10@dialog@buttonWidth",
               "jsxheight": "@uxcore10@dialog@buttonHeight",
               "jsxstyleoverride": "@uxcore10@dialog@buttonOverride",
               "jsximage":"@uxcore10@dialog@maxBtnImg",
               "jsxtip":"@Max Tip",
               "jsxmargin": "@uxcore10@dialog@buttonMargin"
            }, true);
            jButton.jsxdlgbtntype = DIALOG.MAX_BUTTON_NAME;
            jButton.subscribe(Interactive.EXECUTE, this, this.doMaximize);
        }
        if(jButton = this._getDialogButton("CLOSE")) {
            this.setDefaultProperty(jButton, {
               "jsxwidth": "@uxcore10@dialog@buttonWidth",
               "jsxheight": "@uxcore10@dialog@buttonHeight",
               "jsxstyleoverride": "@uxcore10@dialog@buttonOverride",
               "jsximage":"@uxcore10@dialog@closeBtnImg",
               "jsxtip":"@Close Tip",
               "jsxmargin": "@uxcore10@dialog@buttonMargin"
            }, true);
            jButton.jsxdlgbtntype = DIALOG.CLOSE_BUTTON_NAME;
            jButton.subscribe(Interactive.EXECUTE, this, this.doClose);
        }
    };

    /**
     * set those specific visual styles by dynamic properties during deserialization of the dialog
     */
    dialog.onAfterAssemble = function(objParent, objServer) {
        this.jsxsuper(objParent, objServer);
        this._setButtonStyle();

        if(this.getCaptionBar()) {
            var captionBar = this.getCaptionBar();

            if(jsx3.IDE) {
                captionBar.onSetChild = function(objChild) {
                    if(objChild.instanceOf("jsx3.gui.ImageButton") && objChild.jsxdlgbtntype) {
                        var existed = jsx3.$A(this.getParent().getDescendantsOfType("jsx3.gui.ImageButton")).find(function(btn) {
                            return btn.jsxdlgbtntype == objChild.jsxdlgbtntype;
                        });
                        if(existed) {
                            this.getParent().getLogger().warn("Only one " + objChild.getName() + " Button for a dialog");
                            return false;
                        }

                    }

                    setTimeout(jsx3.$F(function() {
                        this.getParent()._setButtonStyle();
                        this.clearBoxProfile(true);
                        this.repaint();
                    }).bind(this),100);

                    return true;
                };
            }

            if(!captionBar._setText) {
                captionBar._setText = captionBar.setText;
                //sync windowsBar and caption's title
                captionBar.setText = function(text, bRepainted) {
                    var ret = this._setText(text, bRepainted);
                    return ret;
                }
            }
            if(!captionBar._jsxsetOnAfterPaint) {
            	captionBar._jsxtitlestyle = this.getDynamicProperty("@uxcore10@dialog@title");
                captionBar._jsxtitleshadowstyle = this.getDynamicProperty("@uxcore10@dialog@titleShadow");
                captionBar.onAfterPaint = function() {
                    //Hack: change hardcode title position of captionbar and append a shadow label
                    var shadow = this.getRendered().childNodes[0];
                    var label = shadow.cloneNode(true);
                    label.className = "jsx30windowbar_lbl_shadow";
                    jsx3.html.DOM.setStyles(label, this._jsxtitlestyle);
                    jsx3.html.DOM.setStyles(shadow, this._jsxtitleshadowstyle);
                    this.getRendered().appendChild(label);
                }
                captionBar._jsxsetOnAfterPaint = true;
            }

            this.setDefaultProperty(captionBar, {
                "jsxborder": "@uxcore10@dialog@headerBorder",
                "jsxbg": "@uxcore10@dialog@headerBackgroundImage",
                "jsxfontname": "@uxcore10@Title Font Name",
                "jsxfontsize": "@uxcore10@Title Font Size",
                "jsxfontweight": "@uxcore10@Title Font Weight",
                "jsxpadding": "@uxcore10@dialog@headerPadding"
            }, true);
        }

        if(this.getDescendantOfName("content")) {
            this.setDefaultProperty(this.getDescendantOfName("content"), {
                "jsxpadding": "@uxcore10@dialog@contentPadding"
            }, true);
        }
        this.setDefaultProperty(this, {
            "jsxbuffer": "@uxcore10@dialog@buffer",
            "jsxborder": "@uxcore10@dialog@border",
            "jsxcontentborder": "@uxcore10@dialog@contentBorder",
            "jsxbg": "@uxcore10@dialog@BackgroundImage"
        }, true);
        return true;
    };

    dialog.focus = function(bTimeout) {
        var ret = null;
        try {
            ret = this.jsxsuper(bTimeout);
            jsx3.log("Focussed: " + ret);
        }
        catch(ex) {jsx3.log(ex.printStackTrace())};
        return ret;
    }

    dialog.onAfterPaint = function() {
        //Hack: change handle image
        try{
            if(this.getResize() == jsx3.gui.Dialog.RESIZABLE) {
                var handle = this.getRendered().childNodes;
                if(this.getModal() != jsx3.gui.Dialog.NONMODAL ) {
                    handle = handle[1].childNodes;
                }
                handle = handle[handle.length-1];
                if(handle.style.backgroundImage != "") {
                    handle.style.background = "url('" + this.getDynamicURL("@uxcore10@dialog@handleImage") + "')";
                }
            }
        } catch(e) {}

    };

    dialog.doMaximize = function(objBtn) {
        //TODO: if we need to change max icon at maxinum state, we should
        /*
        if(objBtn) {
            objBtn.setDynamicProperty("jsximage","@uxcore10@dialog@maxBtnImg", true);
            objBtn.setDynamicProperty("jsxtip","@Max Tip", true).repaint();
        }
        */
        return this.jsxsuper();
    };

    dialog.doToggleState = function(objBtn) {
        return this.jsxsuper();
    };

    /**
     * Show an alert dialog.  The signature and usage is identical to that in the standard GI alert function, but it gives
     * an alert dialog that uses the MatrixAdmin Visual Style.
     *
     * @param strTitle {String} the title of the dialog
     * @param strMessage {String} the message to display
     * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strOk {String} the text of the ok button, can be false to remove button from display
     * @param objParams {objParams} argument to configureAlert()
     */
    DIALOG.alert = function(strTitle, strMessage, fctOnOk, strOk, objParams) {
        var server = eval(tibco.uxcore.System.getServer().getEnv("namespace"));
        var objDialog = server.getRootBlock().loadAndCache('jsxplugin://tibco.uxcore.gui.dialog/components/alertDialog.xml', false);
//        jsx3.log("Alert Dialog: " + objDialog);
        var ok = objDialog.getDescendantOfName('ok');

        if(strTitle == null) {
            strTitle =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@AlertDialog Default Title");
        }
        objDialog.getDescendantOfName('title').setText(strTitle);
        if(strMessage == null) {
            strMessage =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@AlertDialog Default Alert Text");
        }
        objDialog.getDescendantOfName('message').setText(strMessage);

        if(strOk === false)
            objDialog.hideButton();
        else {
            if(strOk == null) {
                strOk = tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@Btn OK");
            }
            ok.setText(strOk);
            ok.setTip((objParams || {}).strOkTip || strOk);
        }

        if(fctOnOk != null) {
            var onExecute = "_onExecute";
            ok._onExecute = fctOnOk;
            ok.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", jsx3.gui.Interactive.EXECUTE);
        }

        this.configureAlert(objDialog, objParams);
        server.getRootBlock().paintChild(objDialog);
        ok.focus();
        return objDialog;
    }

    /**
     * Show a confirm dialog.  The signature and usage is identical to that in the standard GI confirm function, but it gives
     * a confirm dialog that uses the MatrixAdmin Visual Style.
     *
     * @param strTitle {String} the title of the dialog
     * @param strMessage {String} the message to display
     * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param fctOnCancel {Function} callback function on pressing cancel button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strOk {String} the text of the ok button
     * @param strCancel {String} the text of the cancel button
     * @param intBtnDefault {int} the bold button that receives return key, 1:ok, 2:cancel, 3:no
     * @param fctOnNo {Function} callback function on pressing no button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strNo {String} the text of the no button
     * @param objParams {objParams} argument to configureAlert()
     */
    DIALOG.confirm = function(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, intBtnDefault,
                                        fctOnNo, strNo, objParams) {
        var server = eval(tibco.uxcore.System.getServer().getEnv("namespace"));
        var objDialog = server.getRootBlock().loadAndCache('jsxplugin://tibco.uxcore.gui.dialog/components/confirmDialog.xml', false);
        var ok = objDialog.getDescendantOfName('ok');
        var cancel = objDialog.getDescendantOfName('cancel');
        var no = objDialog.getDescendantOfName('no');
        var buttons = [ok, cancel, no];
        intBtnDefault = intBtnDefault != null ? intBtnDefault - 1 : 1;

        if(strTitle == null) {
            strTitle =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@ConfirmDialog Default Title");
        }
        objDialog.getDescendantOfName('title').setText(strTitle);
        if(strMessage == null) {
            strMessage =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@ConfirmDialog Default Alert Text");
        }
        objDialog.getDescendantOfName('message').setText(strMessage);
        if(strOk == null) {
            strOk =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@Btn OK");
        }
        ok.setText(strOk);
        ok.setTip((objParams || {}).strOkTip || strOk);
        if(strCancel == null) {
            strCancel =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@Btn Cancel");
        }
        cancel.setText(strCancel);
        cancel.setTip((objParams || {}).strCancelTip || strCancel);
        if(fctOnCancel != null) {
            var onExecute = "_onExecute";
            cancel._onExecute = fctOnCancel;
            cancel.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", jsx3.gui.Interactive.EXECUTE);
        }
        if(fctOnOk != null) {
            var onExecute = "_onExecute";
            ok._onExecute = fctOnOk;
            ok.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", jsx3.gui.Interactive.EXECUTE);
        }
        if(fctOnNo != null || strNo != null || intBtnDefault == 3) {
            if(strNo == null) {
                strNo =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@Btn No");
            }
            no.setText(strNo);
            no.setTip((objParams || {}).strNoTip || strNo);
            if(fctOnNo) {
                var onExecute = "_onExecute";
                no._onExecute = fctOnNo;
                no.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", jsx3.gui.Interactive.EXECUTE);
            }
            no.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);
        }

        var defaultBtn = buttons[intBtnDefault];
        if(defaultBtn) {
//            defaultBtn.setFontWeight(tibco.uxcore.System.getServer().getDynamicProperty('@uxcore10@Btn Font Weight'));
//
            objDialog.registerHotKey(function(objEvent) {
                if(objEvent.enterKey()) {
                    this.getDescendantOfName(defaultBtn.getName()).doExecute(objEvent);
                    objEvent.cancelBubble();
                }
            }, jsx3.gui.Event.KEY_ENTER, false, false, false);
        }

        this.configureAlert(objDialog, objParams);
        server.getRootBlock().paintChild(objDialog);
//        var defaultBtn = buttons[intBtnDefault];
//        setTimeout(function() {
            if(defaultBtn) {
                defaultBtn.focus();
            }
        return objDialog;
    }

    /**
     * Show a textbox input prompt dialog.  The signature and usage is identical to that in the standard GI prompt function, but it gives
     * a textbox input prompt dialog that uses the MatrixAdmin Visual Style.
     *
     * @param strTitle {String} the title of the dialog
     * @param strMessage {String} the message to display
     * @param fctOnOk {Function} callback function on pressing ok button, receives the dialog as an argument, and the value of the text input as a second argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param fctOnCancel {Function} callback function on pressing cancel button, receives the dialog as an argument; if null the dialog will close itself; if defined must explicitly close the dialog
     * @param strOk {String} the text of the ok button
     * @param strCancel {String} the text of the cancel button
     * @param objParams {objParams} argument to configureAlert()
     */
    DIALOG.prompt = function(strTitle, strMessage, fctOnOk, fctOnCancel, strOk, strCancel, objParams) {
        var server = eval(tibco.uxcore.System.getServer().getEnv("namespace"));
        var objDialog = server.getRootBlock().loadAndCache('jsxplugin://tibco.uxcore.gui.dialog/components/promptDialog.xml', false);
        var ok = objDialog.getDescendantOfName('ok');
        var cancel = objDialog.getDescendantOfName('cancel');

        if(strTitle == null) {
            strTitle =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@PromptDialog Default Title");
        }
        objDialog.getDescendantOfName('title').setText(strTitle);
        if(strMessage == null) {
            strMessage =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@PromptDialog Default Alert Text");
        }
        objDialog.getDescendantOfName('message').setText(strMessage);
        if(strOk == null) {
            strOk =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@Btn OK");
        }
        ok.setText(strOk);
        ok.setTip((objParams || {}).strOkTip || strOk);
        if(strCancel == null) {
            strCancel =  tibco.uxcore.System.getServer().getDynamicProperty("@uxcore10@Btn Cancel");
        }
        cancel.setText(strCancel);
        cancel.setTip((objParams || {}).strCancelTip || strCancel);
        if(fctOnOk != null) {
            var onExecute = "_onExecute";
            ok._onExecute = fctOnOk;
            ok.setEvent("var d = this.getAncestorOfType(jsx3.gui.Dialog); this." + onExecute + "(d, d.getDescendantOfName('value').getValue());", jsx3.gui.Interactive.EXECUTE);
        }
        if(fctOnCancel != null) {
            var onExecute = "_onExecute";
            cancel._onExecute = fctOnCancel;
            cancel.setEvent("this." + onExecute + "(this.getAncestorOfType(jsx3.gui.Dialog));", jsx3.gui.Interactive.EXECUTE);
        }

        this.configureAlert(objDialog, objParams);
        server.getRootBlock().paintChild(objDialog);
        jsx3.sleep(function() {
            objDialog.getDescendantOfName('value').focus();
        });
        return objDialog;
    };

    /**
    * Internal function used to configure an alert dialog.
    *
    * @param objDialog {jsx3.gui.Dialog} the dialog to be configured.
    * @param objParams {Object} an object containing any of the following (optional) fields:
    *        <ul><li><code>width</code> - the width to set for the dialog</li>
    *        <li><code>height</code> - the height to set for the dialog</li>
    *        <li><code>noTitle</code> - if exists, hides the dialog's title bar (be sure to include a close button!</li>
    *        <li><code>nonModal</code> - if exists, makes sure the dialog is not modal</li></ul>

    * @private
    */
    DIALOG.configureAlert = function(objDialog, objParams) {
        if(objParams == null) return;

        if(objParams.width)
            objDialog.setWidth(objParams.width, false);
        if(objParams.height)
            objDialog.setHeight(objParams.height, false);

        if(objParams.noTitle) {
            objDialog.setDefaultProperty(objDialog, {
                "jsxbg": "@uxcore10@dialog@BackgroundImageNoHeader"
            }, true);
            objDialog.removeChild(objDialog.getChild('title'));
        }
        if(objParams.noCloseButton) {
            objDialog.getCaptionBar().removeChild(objDialog._getDialogButton("CLOSE"));
        }

        if(objParams.nonModal)
            objDialog.setModal(jsx3.gui.Dialog.NONMODAL);
    };

});
})(this);
