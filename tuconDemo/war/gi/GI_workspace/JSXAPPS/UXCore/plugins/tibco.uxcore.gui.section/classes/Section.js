//jsx3.require("jsx3.gui.Template");

(function(plugIn) {

jsx3.lang.Class.defineClass("tibco.uxcore.gui.Section", jsx3.gui.Template.Block, [],
function(SECTION, section) {

    if(jsx3.ide) {
        jsx3.ide.loadTemplateCatalog("prop", "properties/catalog.xml",plugIn);
    }

    section.init = function(strName) {
        this.jsxsuper(strName);
    }

    section.onSetParent = function(objParent) {
        this._jsxheight = this.getHeight();
        return objParent;
    }

    section.syncProperties = function() {
        //jsx3.log("syncProperties");
        this.repaint();
//        this.syncProperty(["statusDisplay", "titleBoxDisplay", "contentAreaDisplay", "contentDisplay", "titleBoxHeight"]);
    }

    section.onSetChild = function(objChild) {
        //jsx3.log("onSetChild");
        if(!objChild.instanceOf("tibco.uxcore.gui.TitleBox") || !this.iterTitleBox().hasNext()) {
            if(jsx3.IDE) setTimeout(jsx3.$F(function(){this.syncProperties()}).bind(this), 0);
//            this.repaint();
            return objChild;
        } else {
            if(jsx3.IDE) jsx3.log(plugIn.getServer().getDynamicProperty("@uxcore@section@titleBoxDuplicatedError"));
            return false;
        }
    }

    section.onRemoveChild = function(objChild) {
        //jsx3.log("onRemoveChild");
        setTimeout(jsx3.$F(function(){this.syncProperties()}).bind(this), 0);
//        this.repaint();
        return objChild;
    }

    section.setStatusEnabled = function(display) {
        this.setProperty("statusEnabled", display);
        this.syncProperties();
//        this.repaint();
        return this;
    }

    section.getStatusEnabled = function() {
        return this.statusEnabled || jsx3.Boolean.FALSE;
    }

    section.setStatusMessage = function(strStatusMessage) {
        this.setProperty("strStatusMessage", strStatusMessage);
        return this;
    }

    section.getStatusMessage = function() {
        return this.strStatusMessage || plugIn.getServer().getDynamicProperty("@uxcore@section@defaultStatusMessage");
    }

    section.getInstruction = function() {
        return plugIn.getServer().getDynamicProperty("@uxcore@section@instruction");
    }

    section.getContentDisplay = function() {
        return this.iterContent().hasNext() ? 'block' : 'none';
    }

    section.getTitleBoxHeight = function() {
        if(this.iterTitleBox().hasNext()){
            var tb = this.iterTitleBox().next();
            //if(tb.getAbsolutePosition().H!=0) {
            //    return tb.getAbsolutePosition().H + 5;
            //} else {
                var h = 0;
                h += parseInt(tb.getTitleFontSize()) + 10;
                h += tb.getDescription() ? 33 : 0;
                return h;
            //}
        } else {
            return 0;
        }
    }

    section.iterTitleBox = function() {
        return (new jsx3.util.List(this.getDescendantsOfType("tibco.uxcore.gui.TitleBox",true))).iterator();
    }

    section.iterContent = function() {
        var listChildren = new jsx3.util.List(this.getChildren());
        listChildren.remove(this.iterTitleBox().next());
        return listChildren.iterator();
    }

    SECTION.templateXML = plugIn.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.section/section.xml", "section", "xml").toString();
    jsx3.gui.Template.compile(SECTION.templateXML, SECTION.jsxclass);
    section.getTemplateXML = function() {
        return SECTION.templateXML;
    }
});

})(this);