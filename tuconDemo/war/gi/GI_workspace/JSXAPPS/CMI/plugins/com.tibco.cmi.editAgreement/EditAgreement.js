jsx3.lang.Class.defineClass("com.tibco.cmi.editAgreement.EditAgreement",
    jsx3.gui.Block,
    null,
    function(EditAgreement,instance){
		
			instance.onRsrcLoad = function(){
				this.getServer().subscribe("showEditAgreement", this, this.showEditAgreement);
			};
			
			instance.editProtocol = function() {
        var server = com.tibco.cmi;
        var masterDetail = com.tibco.cmi.getJSXByName("editAgreementLayout");
        masterDetail.setSubcontainer1Pct("0",true);
				
				var objContainer = this.getDescendantOfName("blkEditContainer");
				var extPoint = "editProtocol";
				this.getPlugIn().getExtPoint(extPoint).processExts(jsx3.$F(function(ext,xml){
            var uiId = xml.attr("uiId");
            var extPlugIn = ext.getPlugIn();
            extPlugIn.load().when(function(){
                extPlugIn.loadRsrcComponent(uiId,objContainer)});
            }).bind(this)); 
      }
			
			instance.newProtocol = function() {
        var server = com.tibco.cmi;
        var masterDetail = com.tibco.cmi.getJSXByName("editAgreementLayout");
        masterDetail.setSubcontainer1Pct("0",true);
				
				var objContainer = this.getDescendantOfName("blkEditContainer");
				var extPoint = "newProtocol";
				this.getPlugIn().getExtPoint(extPoint).processExts(jsx3.$F(function(ext,xml){
            var uiId = xml.attr("uiId");
            var extPlugIn = ext.getPlugIn();
            extPlugIn.load().when(function(){
                extPlugIn.loadRsrcComponent(uiId,objContainer)});
            }).bind(this)); 
      }
			
			instance.saveAgreement = function(){
				this.getServer().publish({subject:"showAgreementsList"});				
			}
			
			instance.cancel = function() {
				this.getServer().publish({subject:"showAgreementsList"});	
			}
			
			instance.showEditAgreement = function() {
				this.getDescendantOfName("blkEditContainer").removeChildren();
				var masterDetail = com.tibco.cmi.getJSXByName("editAgreementLayout");
        masterDetail.setSubcontainer1Pct("100%",true);
			}
    })