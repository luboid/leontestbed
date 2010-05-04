jsx3.lang.Class.defineClass("com.tibco.cmi.businessAgreements.BusinessAgreements",
    jsx3.gui.Block,
    null,
    function(BusinessAgreements,instance){
      // var systemUtil = com.tibco.cmi.system.util;
      // var server = systemUtil.getServer();

			instance.onRsrcLoad = function(){
				this.getServer().subscribe("showAgreementsList", this, this.showAgreementsList);
			};
		
      instance.newAgreements = function() {
        var server = com.tibco.cmi;
        var masterDetail = com.tibco.cmi.getJSXByName("mainLayout");
        masterDetail.setSubcontainer1Pct("0",true);
				
				var objContainer = this.getDescendantOfName("blkAddEdit");
				var extPoint = "newAgreement";
				this.getPlugIn().getExtPoint(extPoint).processExts(jsx3.$F(function(ext,xml){
            var uiId = xml.attr("uiId");
            var extPlugIn = ext.getPlugIn();
            extPlugIn.load().when(function(){
                extPlugIn.loadRsrcComponent(uiId,objContainer)});
            }).bind(this)); 
      }
			
			instance.editAgreements = function() {
        var server = com.tibco.cmi;
        var masterDetail = com.tibco.cmi.getJSXByName("mainLayout");
        masterDetail.setSubcontainer1Pct("0",true);
				
				var objContainer = this.getDescendantOfName("blkAddEdit");
				var extPoint = "editAgreement";
				this.getPlugIn().getExtPoint(extPoint).processExts(jsx3.$F(function(ext,xml){
            var uiId = xml.attr("uiId");
            var extPlugIn = ext.getPlugIn();
            extPlugIn.load().when(function(){
                extPlugIn.loadRsrcComponent(uiId,objContainer)});
            }).bind(this)); 
      }
			
			instance.showAgreementsList = function() {
				this.getDescendantOfName("blkAddEdit").removeChildren();
				var masterDetail = com.tibco.cmi.getJSXByName("mainLayout");
        masterDetail.setSubcontainer1Pct("100%",true);
			}
    })