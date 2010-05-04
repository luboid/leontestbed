jsx3.lang.Class.defineInterface("tibco.uxcore.gui.IActionVeto", null,
    function(VETO, veto) {

        VETO.STATUS_OFFLINE = 0;
        VETO.STATUS_CANCEL = 1;
        VETO.STATUS_WAIT = 2;
        VETO.STATUS_CONTINUE = 3;

//        veto.shouldVeto = function() {
//            if(!this.force!this.getArgs().parentChecked)
//        }

        veto.getMergedStatus = function() {
            var merged = this._jsxstatus;
            if(merged == VETO.STATUS_CANCEL) {
                return merged;
            }
            var children = this.getChildVetoers();
            for(var i=0; i<children.length; i++) {
                var cStatus = children[i].getVetoStatus();
                if(cStatus > 0) {
                    if(cStatus < merged) {
                        merged = cStatus;
                    }
                    if(merged == VETO.STATUS_CANCEL) {
                        return merged;
                    }
                }
            }
            return merged;
        }

        veto.getStatus = function() {
            return this._jsxstatus;
        }

        veto.getVetoStatus = function() {
            if(this.getChildVetoers().length > 0) {
                return this.getMergedStatus();
            }
            return this._jsxstatus;
        }

        veto.setStatus = function(intStatus) {
//            jsx3.log("IActionVeto " + this + " setting status to " + intStatus);
            this._jsxstatus = intStatus;
            this._updateStatus();
        }

        veto.updateChildVetoerStatus = function(objChild, intStatus) {
            this._updateStatus();
        }

        veto._updateStatus = function() {
            var parent = this.getAncestorVetoer();
            if(parent) {
                parent.updateChildVetoerStatus(this, this.getVetoStatus());
            }
            else if(this._jsxregistered) {
                tibco.uxcore.System.updateVetoerStatus(this, this.getVetoStatus());
            }
        }

        veto.isActive = function() {
            if(this.getChildVetoers().length > 0) {
                return this.getMergedActive();
            }
            return this._jsxactive;
        }

        veto.getActive = function() {
            return this._jsxactive;
        }

        veto.getMergedActive = function() {
            if(this._jsxactive) {
                return true;
            }
            var children = this.getChildVetoers();
            for(var i=0; i<children.length; i++) {
                var cActive = children[i].isActive();
                if(cActive) {
                    return true;
                }
            }
            return false;
        }

        veto.setActive = function(bActive) {
            this._jsxactive = bActive ? true : false;
            this._updateActive();
        }

        veto._updateActive = function() {
            var parent = this.getAncestorVetoer();
            if(parent) {
                parent.updateChildVetoerActiveState(this, this.isActive());
            }
            else if(this._jsxregistered) {
                tibco.uxcore.System.updateVetoerActiveState(this, this.isActive());
            }
        }

        veto.updateChildVetoerActiveState = function(objChild, bActive) {
            this._updateActive();
        }

        veto.initAndRegister = function() {
            if(!this.getArgs) {
                this.getArgs = function() {
                    if(!this.complex) {
                        this.complex = new Object();
                    }
                    return this.complex;
                }
            }
            this._jsxstatus = VETO.STATUS_CONTINUE;
            this._jsxactive = false;
            this._jsxregistered = false;
            this.register();
        }

        veto.register = function() {
//            jsx3.log("Attempting to register IActionVetoer " + this);
            var parent = this.getAncestorVetoer();
            if(!parent) {
                this.unregisterChildVetoers();
                tibco.uxcore.System.registerActionVetoer(this);
                this._jsxregistered = true;
//                jsx3.log("Registered IActionVetoer " + this);
            }
//            else {
//                jsx3.log("Already has a parent vetoer");
//            }
        }

        veto.unregister = function() {
//            jsx3.log("Unregistering IActionVetoer " + this);
            tibco.uxcore.System.unregisterActionVetoer(this);
            this._jsxregistered = false;
        }

        veto.getChildVetoers = function() {
            return this.findDescendants(function(obj){return obj.instanceOf("tibco.uxcore.gui.IActionVeto")}, false, true, false, false);
        }

        veto.getAncestorVetoer = function() {
            return this.findAncestor(function(obj){return obj.instanceOf("tibco.uxcore.gui.IActionVeto")}, false);
        }

        veto.unregisterChildVetoers = function() {
            var children = this.getChildVetoers();
            for(var i=0; i<children.length; i++) {
                children[i].unregister();
            }
        }
    }
);