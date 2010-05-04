//jsx3.require("tibco.uxcore.gui.ListContainerButton");
jsx3.lang.Class.defineClass("tibco.uxcore.gui.ActionButton",
        tibco.uxcore.gui.ListContainerButton, null,
        function(BUTTON, button) {


            /*
            * instance initializer
            * @param strName {String} ?unique name distinguishing this object from all other JSX GUI objects in the JSX application
            * @param intWidth {int} ?width (in pixels) of the object; not required if button is one of: jsx3.gui.Button.SYSTEMOPEN, jsx3.gui.Button.DIALOGCLOSE, jsx3.gui.Button.DIALOGALPHA, jsx3.gui.Button.DIALOGSHADE
            * @param strText {String} ?text to display in the given button; if null JSXTABLEHEADERCELL.DEFAULTTEXT is used
            */
            button.init = function(strName,a,b,c,d) {
                this.jsxsuper(strName,a,b,c,d);
            };

            button.setActionId = function(strActionId) {
                this.jsxactionid = strActionId;
            };

            button.getActionId = function() {
                return this.jsxactionid || 'Action';
            };

            /**
             * Set default style (font, color and background images) for this button, this function will be called at init or onAfterAssemble function.
             */
            button.setDefaultStyle = function() {
                this.setDefaultProperty(this, {
                    "jsxfontname" : "@uxcore10@Btn Font Name",
                    "jsxfontsize" : "@uxcore10@Btn Font Size",
                    "jsxheight"   : "@uxcore10@Btn Height",
                    "affordance"  : "@uxcore10@ToolBtn Affordance",
                    "jsxmargin"   : "@uxcore10@ActionBtn Margin",
                    "jsxpadding"  : "@uxcore10@ActionBtn Padding",
                    "jsxdownimage": "@uxcore10@ActionBtn DownImg",
                    "jsxoverimage": "@uxcore10@ActionBtn OverImg"
                }, true, true);
                this.setType(tibco.uxcore.gui.Button.TYPE_NORMAL);
                this.unsubscribe(jsx3.gui.Interactive.EXECUTE, this, this.doAction);
                this.subscribe(jsx3.gui.Interactive.EXECUTE, this, this.doAction);

            };

            /*
            * will publish the action id of this button. Listcontainer publish the action id and the selected ids in the list view
            *
            * @param strActionId {string}
            * @return {boolean}
            */
            button.doAction = function() {
                if(this.getListContainer()) {
                    return this.getListContainer().onAction(this.jsxactionid, this)
                }
            };

            /*
            * sets the named attribute on the cdf records that maps to status of the action button
            * @param strStatusAttr {Sting} named attribute on the cdf records
            */
            button.setStatusAttribute = function(strStatusAttr) {
                this._strStatusAttr = strStatusAttr;
            };

            /*
            * get the named attribute on the cdf records that maps to status of the action button
            * @return strStatusAttr {Sting}
            */
            button.getStatusAttribute = function() {
                return this._strStatusAttr;
            };

            /*
            * set status value or a list of status values that triggers disabling of this button based on selected CDF records.
            * @param strStatusValue {String | Array<String>} ?status value that will trigger disabling this button
            */
            button.setDisabledStatusValues = function(strStatusValue){
              this._strStatusValue = strStatusValue;
            };

           /*
            * returns status value or a list of status values that triggers disabling of this button based on selected CDF records.
            * @return {String | Array<String>} ?status value that will trigger disabling this button
            */
            button.getDisabledStatusValues = function(){
              return this._strStatusValue;
            };


            /*
            * Sets the function literal for which of the disable state  be implemented. A function literal can also be passed.
            * @param handler {Function} ?Function literal with the signature, function(strStatusAttr){}.
            */
            button.stateHandler = function(handler){

            };

        });