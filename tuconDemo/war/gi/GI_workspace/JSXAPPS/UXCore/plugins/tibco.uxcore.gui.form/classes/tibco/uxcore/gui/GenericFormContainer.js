//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineClass("tibco.uxcore.gui.GenericFormContainer", jsx3.gui.Template.Block, [tibco.uxcore.gui.FormContainer, tibco.uxcore.gui.IFocusManager],
    function(CONTAINER, container) {

        container.repaint = function() {
//            if(this.getArgs().repaintTimeout) {
//                clearTimeout(this.getArgs().repaintTimeout);
//                delete this.getArgs().repaintTimeout;
//            }
//            if(bForce) {
                this.jsxsuper();
            var children = this.getChildren();
            for(var i=0; i<children.length; i++) {
                var child = children[i];
                if(child.onAfterFormRepainted) {
                    child.onAfterFormRepainted();
                }
            }
//            }
//            else {
//                var me = this;
//                this.getArgs().repaintTimeout = setTimeout(function() {
//                    me.repaint(true);
//                },0);
//            }
        }

        container.onAfterFormRepainted = function() {
            var children = this.getChildren();
            for(var i=0; i<children.length; i++) {
                var child = children[i];
                if(child.onAfterFormRepainted) {
                    child.onAfterFormRepainted();
                }
            }
        }

        container.init = function(strName) {
            this.getArgs().minChildWidth = 0;
            this.setEditMode(false,false);
            this.jsxsuper(strName);
        }

        container.setDisplay = function(intDisplay, bRepaint) {
            var ret = this.jsxsuper(intDisplay, bRepaint);
            if(jsx3.CLASS_LOADER.IE && (intDisplay == jsx3.gui.Block.DISPLAYBLOCK)) {
                try {
                    var parent = this.instanceOf("tibco.uxcore.gui.Form") ? this : this.getAncestorOfType("tibco.uxcore.gui.Form");
                    if(parent) {
                        jsx3.sleep(function(){parent.repaint();},"repaint" + parent.getId(),this);
                    }
                }
                catch(ex) {
                    jsx3.log("Error repainting parent of " + this + " in setDisplay call");
                }
            }
            return ret;
        }

        container.onAfterAssemble = function() {
            if(!this.cleaned) {
            for(var name in this) {
                if(name.indexOf("rescanChildren.") != -1) {
                    delete this[name];
                }
                else if(name.indexOf("recalc.") != -1) {
                    delete this[name];
                }
            }
                delete this.enableControllersUsage;
                delete this.allowControllers;
                delete this.lastParentWidth;
                delete this.fits;
                delete this.targets;
                delete this.focusIndex;
            delete this.minChildWidth;
            delete this.childWidth;
                delete this.editMode;
                delete this.useControllers;
                delete this._adjustWidth;
                this.cleaned = true;
            }
            this.getArgs().minChildWidth = 0;
            this.setEditMode(false,false);
            this.jsxsuper();
        }

        container.getLogger = function() {
            return jsx3.util.Logger.getLogger(this.getClass().getName());
        }

        container.setChild = function(objChild, intPersist, strSourceURL, strNS) {
            var ret = this.jsxsuper(objChild, jsx3.app.Model.PERSISTEMBED, strSourceURL, strNS);
            if(this.isEditMode() && objChild.setEditMode) {
                objChild.setEditMode(this.isEditMode());
            }
            this.rescanChildren();
            return ret;
        }

        container.adoptChild = function(objChild, bRepaint, bForce) {
            var ret = this.jsxsuper(objChild, bRepaint, bForce);
            if(this.isEditMode() && objChild.setEditMode) {
                objChild.setEditMode(this.isEditMode());
            }
            this.rescanChildren();
            return ret;
        }

        container.onKeyDown = function(objEvent, objGUI) {
            // empty implementation for IFocusTarget interface
        }

        container.onRemoveChild = function(objChild, intIndex) {
            var ret = this.jsxsuper(objChild, intIndex);
            this.rescanChildren();
            return ret;
        }

        container.removeChildren = function(children) {
            var ret = this.jsxsuper(children);
            this.rescanChildren();
            return ret;
        }

        container.onSetParent = function(objParent) {
            var ret = this.jsxsuper(objParent);
            this.setEditMode(false,false);
//            this.getArgs().editMode = false;
            return ret;
        }

//        CONTAINER.templateXML = tibco.uxcore.System.getServer().loadInclude("jsxaddin://user!UXCore/classes/tibco/uxcore/gui/templates/genericformcontainer.xml","formPanelTemplate","xml").toString();
//        jsx3.gui.Template.compile(CONTAINER.templateXML,CONTAINER.jsxclass);
    }
);