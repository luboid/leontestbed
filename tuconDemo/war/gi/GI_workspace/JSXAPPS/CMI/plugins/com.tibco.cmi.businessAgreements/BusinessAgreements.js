jsx3.lang.Class.defineClass("com.tibco.cmi.businessAgreements.BusinessAgreements",
    jsx3.gui.Block,
    null,
    function(BusinessAgreements,instance){
			
			var systemUtil = com.tibco.cmi.system.util;
      var server = systemUtil.getServer();
			var dwrEngine = com.tibco.cmi.dwr.Engine;
			var dwrService = com.tibco.cmi.dwr.Service;

			instance.onRsrcLoad = function(){				
				this.getServer().subscribe("showAgreementsList", this, this.showAgreementsList);
				this.getAgreementList();
			};
		
			instance.getAgreementList = function(){
				var me = this;
				var service = dwrEngine.loadService('BIZAGREEMENT','getBAList',[]);
				service.subscribe(dwrService.ON_SUCCESS, me, me._callback_getBAList_onSuccess);
				service.doCall();
			}
			
			instance._callback_getBAList_onSuccess = function(objEvent) {
				var agreementList = objEvent.data;
				var agreementcdf = new jsx3.xml.Document();
				var root = agreementcdf.createDocumentElement("data");
				root.setAttribute("jsxid", "jsxroot");
				
				for(var i = 0;i < agreementList.length;i++) {	
					var record = root.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
					var item = agreementList[i];
					var agreementId = item.binindex;
					var displayName = item.displayName;
					var isValid = item.isValid;
					var status;
					if(isValid)
						status = "Active";
					else
						status = "Inactive";
					
					record.setAttribute("jsxid", jsx3.xml.CDF.getKey());
					record.setAttribute("checked",0);
					record.setAttribute("agreementId", agreementId);
					record.setAttribute("name", displayName);
					record.setAttribute("status", status);
					
					root.appendChild(record);
				}
				server.getJSXByName("mtxAgreements").setSourceXML(agreementcdf);
			  server.getJSXByName("mtxAgreements").repaint();
			}
		
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
				this.getAgreementList();
				server.getJSXByName("blkAddEdit").removeChildren();
				var masterDetail = com.tibco.cmi.getJSXByName("mainLayout");
        masterDetail.setSubcontainer1Pct("100%",true);
			}
			
			instance.deleteBA = function() {
				var itemList = this.getSelectedItem();
				var BAs = [];
				for(var i = 0; i < itemList.size(); i++) {
					var item = itemList.get(i);
					BAs.push(item.getAttribute("agreementId"));
				}
				
				var service = dwrEngine.loadService('BIZAGREEMENT','removeBA',[BAs]);
				service.subscribe(dwrService.ON_SUCCESS, function(){server.getJSXByName("blkBusinessAgreements").getAgreementList()});
				service.doCall();
			}
			
			instance.setEnabled = function(btnEnable, btnRemove) { 
				var mtx = com.tibco.cmi.getJSXByName("mtxAgreements");
				var idList = mtx.getSortedIds();
				var enabled = 0;
				for(var j=0;j<idList.length;j++){
					var recordID = idList[j];
					var item = mtx.getRecordNode(recordID);
					if(item.getAttribute("checked") == 0) {
						enabled = 1;				
						break;
					}					
				}
				
				for(var i = 0; i < idList.length;i++) {
					var recordID = idList[i];
					var item = mtx.getRecordNode(recordID);
					item.setAttribute("checked",enabled);
					mtx.redrawRecord(recordID, jsx3.xml.CDF.UPDATE);	
				}		
					
				btnRemove.setEnabled(enabled);
				if(enabled) { 					
					btnEnable.setText("Disable All");	
				}
				else {
					btnEnable.setText("Enable All");
				}					
			}
			
			instance.changeState = function(btn) {
				if(this.getSelectedItem().size() == 0)
					btn.setEnabled(0);
				else
				  btn.setEnabled(1);
			}
			
			instance.getSelectedItem = function() {
				var mtx = com.tibco.cmi.getJSXByName("mtxAgreements");
				var xml = mtx.getXML();
				var itemList = xml.selectNodes("//record[@checked='1']");
				return itemList;
			}
    })