//jsx3.require("jsx3.gui.Template");

(function(plugIn) {

jsx3.lang.Class.defineClass("tibco.uxcore.gui.TitleBox", jsx3.gui.Template.Block, [],
function(TITLEBOX, titlebox) {

    if(jsx3.ide) {
        jsx3.ide.loadTemplateCatalog("prop", "properties/catalog.xml",plugIn);
    }

    titlebox.init = function(strName) {
        this.jsxsuper(strName);
    };

    titlebox.setTitle = function(title, bRepaint) {
        this.setProperty("title",title);
        if(bRepaint && this.getParent()) this.getParent().repaint();
        return this;
    }

    titlebox.getTitle = function() {
        return this.title || plugIn.getServer().getDynamicProperty("@uxcore@titleBox@defaultTitle");
    }

    titlebox.setDescription = function(description, bRepaint) {
        this.setProperty("description",description);
        this.setProperty("descriptionDisplay", description ? "block" : "none");
        if(this.getParent()) {
            if(bRepaint) {
                this.getParent().repaint();
                return this;
            }
            if(this.getParent().syncProperties) {
                this.getParent().syncProperties();
            }            
        }
        return this;
    }

    titlebox.getDescription = function() {
        return this.description;
    }

    titlebox.setTitleFontSize = function(titleFontSize, bRepaint) {
        this.setProperty("titleFontSize", titleFontSize);
        if(this.getParent()) {
            if(bRepaint) {
                this.getParent().repaint();
                return this;
            }
            if(this.getParent().syncProperties) {
                this.getParent().syncProperties();
            }            
        }
        return this;
    }

    titlebox.getTitleFontSize = function() {
        return this.titleFontSize||16;
    }

    titlebox.setInfo = function(title, description, fontSize, bRepaint) {
        if(title) this.setProperty("title",title);
        if(fontSize) this.setProperty("titleFontSize", fontSize);
        if(description) {
            this.setProperty("description",description);
            this.setProperty("descriptionDisplay", description ? "block" : "none");
        } 
        if(this.getParent()) {
            if(bRepaint) {
                this.getParent().repaint();
                return this;
            }
            if(this.getParent().syncProperties) {
                this.getParent().syncProperties();
            }            
        }
        return this;
    }

    titlebox.iterButtons = function() {
        return (new jsx3.util.List(this.getChildren())).iterator();
    }

    TITLEBOX.templateXML = plugIn.getServer().loadInclude("jsxplugin://tibco.uxcore.gui.section/titleBox.xml", "titleBox", "xml").toString();
    jsx3.gui.Template.compile(TITLEBOX.templateXML, TITLEBOX.jsxclass);
});

})(this);