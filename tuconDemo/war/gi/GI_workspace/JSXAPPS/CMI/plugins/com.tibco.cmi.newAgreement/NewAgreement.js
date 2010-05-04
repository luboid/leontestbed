jsx3.lang.Class.defineClass("com.tibco.cmi.newAgreement.NewAgreement",
    jsx3.gui.Block,
    null,
    function(NewAgreement,instance){
			instance.saveAgreement = function(){
				this.getServer().publish({subject:"showAgreementsList"});				
			}
			
			instance.cancel = function() {
				this.getServer().publish({subject:"showAgreementsList"});	
			}
    })