
//jsx3.require("tibco.uxcore.gui.ListContainerButton");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.LCIconButton",
    tibco.uxcore.gui.ListContainerButton, null,
    function(BUTTON, button) {

        // todo replace values with dynamic properties
        // Width and height should be hidden from developer
        BUTTON.DEFAULTHEIGHT = 16;
        BUTTON.DEFAULTWIDTH = 16;
        BUTTON.DEFAULTINTLEFT = 0;
        BUTTON.DEFAULTINTTOP = 0;
        BUTTON.DEFAULT_AFFORDANCE = "0 0 0 0";
        BUTTON.FOCUS_STYLE = 0;

        button.setDefaultStyle = function() {
            this.jsxsuper();
            this.setDefaultProperty(this, {
                "jsxwidth"   : "@uxcore10@IconBtn Width",
                "jsxheight"  : "@uxcore10@IconBtn Height",
                "affordance" : "@uxcore10@IconBtn Affordance"
            }, true);
        };
});