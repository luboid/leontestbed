(function(plugIn) {

    //jsx3.require("jsx3.gui.Block");
    /**
     * Prototype class object to create a specialized block object for TabbedNav
     **/
    jsx3.Class.defineClass(
            "tibco.uxcore.gui.TabbedNavPane",
            jsx3.gui.Block,
            null,
            function (BLOCK, block) {


                /**
                 * instance initializer
                 * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
                 * @param vntLeft {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param vntTop {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param vntWidth {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param vntHeight {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
                 * @param strHTML {String} Text/HTML markup to place in the jsx3.gui.Block instance
                 */
                block.init = function(strName, vntLeft, vntTop, vntWidth, vntHeight, strHTML) {
                    //call constructor for super class (the super expects the name of the object and the function that it is an instance of)
                    this.jsxsuper(strName, vntLeft, vntTop, vntWidth, vntHeight, strHTML);
                };

                block.onSetChild = function (objChild) {
                    return  (objChild.instanceOf("tibco.uxcore.gui.TabbedNavMenuButton") || objChild.instanceOf("tibco.uxcore.gui.TabbedNavPane")) ? false : objChild;
                }

                block._setTabIndex = function(index) {
                    this._index = index
                }

                block._getTabIndex = function() {
                    return  this._index
                }

                block.onSetParent = function(objParent) {
                    try {
                        this.setWidth("100%")
                        this.setHeight("100%")
                        this.setOverflow(jsx3.gui.Block.OVERFLOWSCROLL)
                    }
                    catch(e) {
                        jsx3.log(e);
                    }
                    return true
                }

            }
            )

})(this);