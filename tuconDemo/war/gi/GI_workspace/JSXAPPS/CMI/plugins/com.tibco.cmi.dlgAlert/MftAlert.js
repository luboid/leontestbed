jsx3.lang.Class.defineClass("tibco.mft.xconsole.dlgAlert.MftAlert",
    tibco.uxcore.gui.Dialog,
    null,
    function(KLASS,instance){
    	KLASS.Detail_toggle = "off";
    	instance.showDetails = function(){
    		if(KLASS.Detail_toggle == "off"){
    			this.setHeight(this.getHeight()+102,true);
    			KLASS.Detail_toggle = "on";
    		}
    		else {
    			this.setHeight(this.getHeight()-102,true);
    			KLASS.Detail_toggle = "off";
    		}
    	}
     })