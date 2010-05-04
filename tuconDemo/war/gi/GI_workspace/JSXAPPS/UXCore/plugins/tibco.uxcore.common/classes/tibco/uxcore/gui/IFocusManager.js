//jsx3.require("jsx3.gui.Template");

jsx3.lang.Class.defineInterface("tibco.uxcore.gui.IFocusManager", null,
    function(MANAGER, manager) {

        manager.getArgs = function() {
            if(!this.complex) {
                this.complex = new Object();
            }
            return this.complex;
        }

        manager.hasFocus = function() {
            return (this.getArgs().focusIndex != null) && (typeof this.getArgs().focusIndex != "undefined") && (this.getArgs().focusIndex >= 0);
        }

        manager.getFocusTargets = function() {
            if(!this.getArgs().targets) {
            var children = this.getChildren();
            var ret = new Array();
            for(var i=0; i<children.length; i++) {
                if(children[i].instanceOf("tibco.uxcore.gui.IFocusTarget")) {
                    ret.push(children[i]);
                }
            }
            this.getArgs().targets = ret;
            }
            return this.getArgs().targets;
//            return this.findDescendants(function(obj){return obj.instanceOf("tibco.uxcore.gui.IFocusTarget")}, false, true, true, false);
        }

        manager.isManager = function(obj) {
            return (obj && obj.instanceOf("tibco.uxcore.gui.IFocusManager") && !obj.instanceOf("tibco.uxcore.gui.FormGroup"));
        }

        manager.focusTaken = function(child) {
//jsx3.log(this + " focussing is " + MANAGER.focussing);
if(MANAGER.focussing) return;
//            jsx3.log(this + " - focusTaken: " + child);
            var index = this.getArgs().focusIndex;
            var indexValid = (index != null) && (typeof index != "undefined") && (index != -1);
            var children = this.getFocusTargets();
            if(!indexValid || (child != children[index])) {
            for(var i=0; i<children.length; i++) {
                var iChild = children[i];
//jsx3.log("iChild: " + iChild);
//jsx3.log("child: " + child);
                if(iChild == child) {
//                    jsx3.log(this + " - focusIndex: " + i);
                    this.getArgs().focusIndex = i;
                }
                else {
                    iChild.clearFocus();
                }
            }
            }
            var parent = this.getParent();
            if(this.isManager(parent)) {
                parent.focusTaken(this);
            }        }

        manager.focusLost = function(child) {
            var children = this.getFocusTargets();
            var index = this.getArgs().focusIndex;
            var indexValid = (index != null) && (typeof index != "undefined") && (index != -1);
            if(indexValid && (child == children[index])) {
                delete this.getArgs().focusIndex;
                var parent = this.getParent();
                if(this.isManager(parent)) {
                    parent.focusLost(this);
                }
            }
        }

        manager.focusNextChild = function(start) {
//jsx3.log(this + "begin focussing");
MANAGER.focussing = true;
            var me = this;
            setTimeout(function() {
                me._focusNextChild(start);
            },0)
        }

        manager._focusNextChild = function(start) {
//            jsx3.log(this + " - _focusNextChild called");
//            jsx3.log(this + " - current focusIndex: " + this.getArgs().focusIndex);
//            jsx3.log(this + " - start: " + start);
            var children = this.getFocusTargets();
            if(this.getArgs().focusIndex == null) {
//                jsx3.log(this + " - focus index null, resetting to -1");
                this.getArgs().focusIndex = -1;
            }
            this.getArgs().focusIndex++;
//            jsx3.log(this + " - new focusIndex: " + this.getArgs().focusIndex);
            if(start) {
                if(start == this.getArgs().focusIndex) {
//                    jsx3.log(this + " - isStart")
                    return;
                }
            }
            else {
                start = 0;
            }
            if(this.getArgs().focusIndex > (children.length - 1)) {
                var parent = this.getParent();
                if(this.isManager(parent)) {
//                    jsx3.log(this + " - reached end, clearing index");
                    delete this.getArgs().focusIndex;
                    parent._focusNextChild()
                }
                else  {
//                    jsx3.log(this + " reached end, resetting index")
                    delete this.getArgs().focusIndex;
                    if(this.cycleFocus())
                        this._focusNextChild();
			  else {
//jsx3.log(this + "end focussing");
delete MANAGER.focussing;
}
                }
            }
            else {
                var child = children[this.getArgs().focusIndex];
                if(child.acceptFocus()) {
                    if(!this.showChild || this.showChild(child)) {
//                        jsx3.log(this + " - preparing to focus: " + child)
                        var me = this;
//                        setTimeout(function() {
//                            jsx3.log(me + " - focusing child: " + child);
                            if(me.isManager(child)) {
                                child._focusNextChild();
                            }
                            else {
                            	if(child.getEnabled && !child.getEnabled()) {
                            		if(child.getFocusManager())
                            		  child.getFocusManager()._focusNextChild();
                            	} else {
//jsx3.log(this + "end focussing");
delete MANAGER.focussing;
                            		child.focus(null,null,false);
                            	}
                            }
//                        },0);
                    }
                }
                else {
//                    jsx3.log(this + " - skipping to next child");
                    this._focusNextChild(start);
                }
            }
        }

        manager.cycleFocus = function() {
            return true;
        }

        manager.focusPreviousChild = function(start) {
            var me = this;
            //setTimeout(function() {
                me._focusPreviousChild(start);
            //},0)
        }

        manager._focusPreviousChild = function(start) {
//            jsx3.log(this + " - _focusPreviousChild called");
//            jsx3.log(this + " - current focusIndex: " + this.getArgs().focusIndex);
//            jsx3.log(this + " - start: " + start);
            var children = this.getFocusTargets();
            if(this.getArgs().focusIndex == null) {
//                jsx3.log(this + " - focus index null, resetting to " + children.length);
                this.getArgs().focusIndex = children.length;
            }
            this.getArgs().focusIndex--;
//            jsx3.log(this + " - new focusIndex: " + this.getArgs().focusIndex);
            if(start) {
                if(start == this.getArgs().focusIndex) {
//                    jsx3.log(this + " - isStart")
                    return;
                }
            }
            else {
                start = children.length - 1;
            }
            if(this.getArgs().focusIndex < 0) {
                var parent = this.getParent();
                if(this.isManager(parent)) {
//                    jsx3.log(this + " - reached end, clearing index");
                    delete this.getArgs().focusIndex;
                    parent._focusPreviousChild()
                }
                else if(this.getArgs().focusIndex == -1) {
//                    jsx3.log(this + " reached end, resetting index to " + children.length);
                    delete this.getArgs().focusIndex;
                    if(this.cycleFocus()) {
                        this._focusPreviousChild();
                    }
			  else {
//jsx3.log(this + "end focussing");
delete MANAGER.focussing;
}
                }
            }
            else {
                var child = children[this.getArgs().focusIndex];
                if(child.acceptFocus()) {
                    if(!this.showChild || this.showChild(child)) {
                        var me = this;
//                        jsx3.log(this + " - preparing to focus: " + child)
//                        setTimeout(function() {
                            if(me.isManager(child)) {
                                child._focusPreviousChild();
                            }
                            else {
                                if(child.getEnabled && !child.getEnabled()) {
                                    if(child.getFocusManager())
                                      child.getFocusManager()._focusPreviousChild();
                                } else {
//jsx3.log(this + "end focussing");
                                    child.focus(null, null, true);
                                    delete MANAGER.focussing;
                                }
                            }
//                        },0);
                    }
                }
                else {
//                    jsx3.log(this + " - skipping to previous child");
                    this._focusPreviousChild(start);
                }
            }
        }
    }
);