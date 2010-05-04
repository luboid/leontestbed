jsx3.lang.Class.defineInterface("tibco.uxcore.gui.IActionTrigger", null,
    function(TRIGGER, trigger) {

        TRIGGER.STANDARD_QUEUEING = 0;
        TRIGGER.FORCE_QUEUEING = 1;
        TRIGGER.FORCE_NO_QUEUEING = 2;

        trigger.queueing = TRIGGER.STANDARD_QUEUEING;

        trigger.getQueueingModel = function() {
            return this.queueing ? this.queueing : TRIGGER.STANDARD_QUEUEING;
        }

        trigger.setQueueingModel = function(intModel) {
            if((intModel < 0) || (intModel > TRIGGER.FORCE_NO_QUEUEING)) {
                intModel = TRIGGER.STANDARD_QUEUEING;
            }
            this.queueing = intModel;
        }

        trigger.shouldQueue = function() {
            if(!tibco.uxcore.System.queueEvents()) {
                return false;
            }
//            jsx3.log(this + " Checking shouldQueue");
//            jsx3.log(this + " queueing: " + this.queueing);
//            jsx3.log(this + " queueing > 0: " + (this.queueing > 0));
            if(this.queueing > 0) {
//                jsx3.log(this + " checking for special queueing");
//                jsx3.log(this + " Force: " + TRIGGER.FORCE_QUEUEING);
//                jsx3.log(this + " Equal: " + (this.queueing == TRIGGER.FORCE_QUEUEING));
                return (this.queueing == TRIGGER.FORCE_QUEUEING);
            }
            return !this.hasVetoerParent();
        }

        trigger.onDestroy = function() {
            this.flushEvents();
            this.killTimer();
            this.unregister();
        }

        trigger.hasVetoerParent = function() {
            if(this.getParent()) {
                var parent = this.getAncestorVetoer();
                if(parent) {
                    return true;
                }
            }
            return false;
        }

        trigger.getAncestorVetoer = function() {
            return this.findAncestor(function(obj){return obj.instanceOf("tibco.uxcore.gui.IActionVeto")}, false);
        }

        trigger.initAndRegister = function() {
            if(!this.getArgs) {
                this.getArgs = function() {
                    if(!this.complex) {
                        this.complex = new Object();
                    }
                    return this.complex;
                }
            }
            this._jsxcoreeventsqueue = new Array();
            this._jsxregistered = false;
            this.register();
            this.patchDoEvent();
        }

        trigger.register = function() {
            if(this.shouldQueue()) {
//                jsx3.log("Attempting to register IActionTrigger " + this);
                tibco.uxcore.System.registerActionTrigger(this);
                this._jsxregistered = true;
//                jsx3.log("Registered IActionTrigger " + this);
            }
        }

        trigger.unregister = function() {
//            jsx3.log("Unregistering IActionTrigger " + this);
            tibco.uxcore.System.unregisterActionTrigger(this);
            this._jsxregistered = false;
        }

        trigger.restartTimer = function() {
            this.killTimer()
            if(this.shouldQueue() && this.getArgs) {
            var me = this;
            this.getArgs().eventsQueueTimer = setTimeout(function() {
                var status = tibco.uxcore.System.getActionVetoStatus();
                if(status == tibco.uxcore.gui.IActionVeto.STATUS_CANCEL) {
                    me.flushEvents();
                }
                else if(status == tibco.uxcore.gui.IActionVeto.STATUS_CONTINUE) {
                    me.fireEvents();
                }
                else if(me._jsxcoreeventsqueue.length > 0) {
//                    jsx3.log(this + " restarting timer");
                    me.restartTimer();
                }
            },tibco.uxcore.System.getTriggerPeriod());
            }
            else {
                this.fireEvents();
            }
        }

        trigger.killTimer = function() {
            if(this.getArgs) {
                clearTimeout(this.getArgs().eventsQueueTimer);
            }
        }

        trigger.queueEvent = function(strType,objEvent) {
//            jsx3.log("Trigger " + this + " queueing " + strType + " event: " + objEvent);
            this._jsxcoreeventsqueue.push({type:strType,event:objEvent});
            this.restartTimer();
        }

        trigger.fireEvent = function(strType,objEvent) {
            try {
//                jsx3.log(this + " fire event: " + objEvent);
                var ret = this.Interactive.prototype.doEvent.apply(this, arguments);
                if(objEvent.fctnRETURN) {
                    objEvent.fctnRETURN.apply(this, [ret])
                }
                return ret;
            }
            catch(ex) {
                jsx3.log("Error firing event: " + jsx3.lang.NativeError.wrap(ex).printStackTrace());
            }
        }

        trigger.fireEvents = function() {
            while(this._jsxcoreeventsqueue.length > 0) {
                var evt = this._jsxcoreeventsqueue.shift();
                this.fireEvent(evt.type,evt.event);
            }
            this.killTimer();
        }

        trigger.flushEvents = function() {
//            jsx3.log(this + " flushing events");
            this._jsxcoreeventsqueue = new Array();
            this.killTimer();
        }

        trigger.patchDoEvent = function() {
            this.Interactive = jsx3.gui.Interactive;
            this.doEvent = function(type,objContext) {
//                jsx3.log(this + " doEvent for type " + type + ": " + objContext);
//                jsx3.log(this + " Should queue: " + this.shouldQueue());
//                jsx3.log(this + " Queueing: " + this.queueing);
                if(this.shouldQueue() && ((type == this.Interactive.JSXMOUSEDOWN) || (type == this.Interactive.EXECUTE) || (type == this.Interactive.JSXFOCUS) || (type == this.Interactive.TOGGLE) || (type == "linkbuttonclick") || (type == "MENUEXECUTE") || (type == "jsxclick"))) {
//                    jsx3.log(this + " Queing event")
                    this.queueEvent(type,objContext);
                }
                else {
//                    jsx3.log(this + " fireing event")
                    return this.fireEvent(type,objContext);
                }
            }
        }
    }
);