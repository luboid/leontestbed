//jsx3.require("jsx3.gui.Template");

(function(plugIn) {

jsx3.lang.Class.defineInterface("tibco.uxcore.gui.FormContainer", null,
        function(CONTAINER, container) {
            if(jsx3.ide) {
                jsx3.log("about to load Forms catalogs");
                jsx3.ide.loadTemplateCatalog("prop", "properties/catalog.xml", plugIn);
                jsx3.ide.loadTemplateCatalog("event", "events/catalog.xml", plugIn);
                jsx3.log("loaded catalog");
            }

            container.isDirty = function() {
                var isDirty = this.getArgs().isDirty;
                if(typeof isDirty == "undefined") {
                    return this.updateDirtyState();
                }
                return isDirty;
            }

            container.updateDirtyState = function() {
                var args = this.getArgs();
                args.isDirty = false;
                var arr = this.getFormChildren();
                for(var i=0; i<arr.length; i++) {
                    args.isDirty = arr[i].isDirty();
                    if(args.isDirty) {
                        break;
                    }
                }
                this.afterUpdateDirtyState(args.isDirty);
                return args.isDirty;
            }

            container.afterUpdateDirtyState = function() {

            }

            container.childContentChanged = function(objChild, formField, isDirty, type) {
                var dirty = this.getArgs().isDirty = isDirty ? isDirty : this.updateDirtyState();
                var parent = this.getParent() ? this.getParent() : null;
                if(parent) {
                    parent.childContentChanged(this, formField, dirty, type);
                }
            }

            container.setEditMode = function(bEditMode, bRepaint) {
                if(bEditMode != this.getArgs().editMode) {
                    this.getArgs().editMode = bEditMode;
                    var arr = this.getFormChildren();
                    for(var i=0; i<arr.length; i++) {
                        if(arr[i].setEditMode) {
                            arr[i].setEditMode(bEditMode);
                        }
                    }
                    if(bRepaint) {
                        jsx3.sleep(function(){this.recalcBox();},"recalcBox"+this.getId(),this);
                        jsx3.sleep(function(){this.repaint();},"repaint" + this.getId(),this);
                    }
                }
            }

            container.isEditMode = function() {
                return this.getArgs().editMode;
            }

            container.getFormChildren = function() {
                return this.getChildren();
            }

            // scans children to find the largest minimum width among them
            container._doScan = function() {
                delete this.getArgs().targets;
                var parent = this.getParent ? this.getParent() : null;
                try {
                    // temporarily cache the previous value
                    var prevMin = this.getArgs().minChildWidth;
                    // reset the current min to 0
                    this.getArgs().minChildWidth = 0;
                    // iterate all children to find the largest minimum width
                    var children = this.getFormChildren();
                    if(children) {
                        for(var i = 0; i < children.length; i++) {
                            var val = children[i].getMinWidth();
                            if(val) {
                                this.getArgs().minChildWidth = Math.max(this.getArgs().minChildWidth, val);
                            }
                        }
                    }
                    var bRepaint = true;
                    // notify any parent containers to rescan as well, since this child may have changed it's minimum width
                    if(parent && parent.rescanChildren) {
                        bRepaint = false;
                        parent.rescanChildren((this.getArgs().minChildWidth != prevMin));
                    }
                        try {
                                if(bRepaint) {
                                    jsx3.sleep(function(){this.recalcBox();},"recalcBox"+this.getId(),this);
                                    jsx3.sleep(function(){this.repaint();},"repaint" + this.getId(),this);
                                }
                            }
                            catch(ex1) {
                            }
                }
                catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
            }

            // clear existing values
            container.rescanChildren = function() {
                delete this.getArgs().childWidth;
//                delete this.lastParentWidth;
                // in a timeout (so that successive calls to rescan collapse into a single rescan),
                // rescan children for minimum width changes
                this._doScan();
//                jsx3.sleep(function() { this._doScan(); }, "_jsxrescanChildren." + this.getId(), this);
            }

            // returns the greatest of the children's minimum widths
            container.getMinChildWidth = function() {
                return this.getArgs().minChildWidth;
            }

            // returns this container's minimum width (as determined by children'sminimum widths and any other renderings required by this container)
            container.getMinWidth = function() {
                return (this.getArgs().minChildWidth * this.getFormChildren().length);
            }

            //returns the padding space between rendered children
            container.getChildSpacing = function() {
                return 0;
            }

            container.getSectionHeight = function(parentHeight, adjust) {
                if(!parentHeight) {
                    return '100%-' + adjust;
                }
                return parentHeight - adjust;
            }

            // given a parent width, returns the width at which to render each child
            container.getChildWidth = function(parentWidth) {
                if(!parentWidth) {
                    return 0;
                }
                try {
                    delete this.getArgs().childWidth;
//                    this.lastParentWidth = parentWidth;
                    // default to not using ctonrollers until it is determined that they are required (based on child widths)
                    if(parentWidth == 0) {
                        // if no parent width is specified, just set child width to the same as the greatest of the children'smin widths
                        this.getArgs().childWidth = this.getArgs().minChildWidth;
                    }
                    else {
                        var childCount = this.getFormChildren().length;
                        if(childCount == 0) {
                            // if no children, then just return 0
                            this.getArgs().childWidth = 0;
                        }
                        else {
                            // find out how many children (at the greatest of their min widths) can fit inside the given parent width
                            var spacing = this.getChildSpacing();
                            if(!spacing) {
                                spacing = 0;
                            }
                            var fits = Math.floor((parentWidth + spacing)/(this.getArgs().minChildWidth + spacing));
                            if(fits < 1) {
                                // must allow at least 1 to render
                                fits = 1;
                            }
                            var spacingPad = 0;
                            if(fits >= childCount) {
                                // calculate the spacing padding between the children
                                spacingPad = (childCount - 1) * spacing;
                                // all children can fit in the parent's space,
                                // so subtract the spacing from the parent width and divide equally among the children
                                this.getArgs().childWidth = Math.floor((parentWidth - spacingPad) / childCount);
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
                    return this.getArgs().childWidth;
                }
                catch(ex) {
                    tibco.uxcore.logException(ex);
                }
            }

            container.validate = function() {
                var arr = this.getFormChildren();
                var ret = true;
                for(var i = 0; i < arr.length; i++) {
                    var valid = arr[i].validate();
                    if(!valid) {
                        ret = false;
                    }
                }
                return ret;
            }

            container.readCDF = function(cdf, isRevert) {
                var arr = this.getFormChildren();
                for(var i = 0; i < arr.length; i++) {
                    arr[i].readCDF(cdf, isRevert);
                }
                this.updateDirtyState();
            }

            container.writeCDF = function(cdf) {
                var arr = this.getFormChildren();
                for(var i = 0; i < arr.length; i++) {
                    arr[i].writeCDF(cdf);
                }
            }
        }
        );

})(this);