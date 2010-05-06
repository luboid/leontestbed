jsx3.lang.Class.defineClass("com.tibco.cmi.editAgreement.EditAgreement",
    jsx3.gui.Block,
    null,
    function(EditAgreement,instance){
			var systemUtil = com.tibco.cmi.system.util;
      var server = systemUtil.getServer();
			var dwrEngine = com.tibco.cmi.dwr.Engine;
			var dwrService = com.tibco.cmi.dwr.Service;
			//var interval;
			
			instance.onRsrcLoad = function(){
				this.getServer().subscribe("showEditAgreement", this, this.showEditAgreement);
				this.getServer().subscribe("editAgreement.getBAid",this, this.getBAid);
			};
			
			instance.getBAid = function(objEvent){
				EditAgreement.BAID = objEvent.BAid;
				var baName = objEvent.name;
				server.getJSXByName("blkEditAgreementTitle").setText("Edit Agreement: " + baName, true);
				
				var names = baName.split("-");
				var hostName = names[1];
				var partnerName = names[0];
				server.getJSXByName("blkHostName").setText(hostName, true);
				server.getJSXByName("blkPartnerName").setText(partnerName, true);
				
				this.getBAInfo();
				//EditAgreement.interval = setInterval(this.getProtocolBinding,5000);
				this.getProtocolBinding();	
			}
			
			instance.getBAInfo = function() {
				var me = this;
				var service = dwrEngine.loadService('BIZAGREEMENT','getBAByID',[EditAgreement.BAID]);
				service.subscribe(dwrService.ON_SUCCESS, me, me._callback_getBAByID_onSuccess);
				service.doCall();
			}
			
			instance._callback_getBAByID_onSuccess = function(objEvent) {
				var baInfo = objEvent.data;
				EditAgreement.BA = baInfo;
				var isValid = baInfo.isValid;
				
				if(isValid)
					server.getJSXByName("isValid").setChecked(1);
				else
					server.getJSXByName("isValid").setChecked(0);
			}
			
			instance.getProtocolBinding = function() {
				var me = server.getJSXByName("blkEditAgreement");
				var service = dwrEngine.loadService('PROTBINDING','getProtBindingList',[EditAgreement.BAID]);
				service.subscribe(dwrService.ON_SUCCESS, me, me._callback_getProtBindingList_onSuccess);
				service.doCall();
			}
			
			instance._callback_getProtBindingList_onSuccess = function(objEvent) {
				var mtx = server.getJSXByName("mtxProtocolBinding");
				var selectId = mtx.getSelectedIds()[0];
				
				var protocolBindingList = objEvent.data;
				EditAgreement.protocolBinding = protocolBindingList;
				var protocolBindingcdf = new jsx3.xml.Document();
				var root = protocolBindingcdf.createDocumentElement("data");
				root.setAttribute("jsxid", "jsxroot");
				
				for(var i = 0;i < protocolBindingList.length;i++) {	
					var record = root.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
					var item = protocolBindingList[i];
					var protocolBindingId = item.binindex;
					var name = item.protName;
					
					record.setAttribute("jsxid", protocolBindingId);
					record.setAttribute("checked",0);
					record.setAttribute("protocolName", name);
					
					root.appendChild(record);
				}
				mtx.setSourceXML(protocolBindingcdf);
			  mtx.repaint();
				
				if(selectId && mtx.getRecord(selectId))	{
				  mtx.selectRecord(selectId);
				}
			}
			
			instance.remove = function() {
				var selectItems = this.getSelectedItem();
				var pbs = [];
				for(var i = 0; i < selectItems.size(); i++) {
					item = selectItems.get(i);
					pbs.push(item.getAttribute("jsxid"));
				}
				
				var service = dwrEngine.loadService('PROTBINDING','removeProtBinding',[pbs]);
				service.subscribe(dwrService.ON_SUCCESS, function(){
																									server.getJSXByName("blkEditAgreement").getProtocolBinding();																			
																								});
				service.doCall();
			}
			
			instance.editProtocol = function() {
				//clearInterval(EditAgreement.interval);
        var masterDetail = server.getJSXByName("editAgreementLayout");
        masterDetail.setSubcontainer1Pct("0",true);
				
				var objContainer = this.getDescendantOfName("blkEditContainer");
				var extPoint = "editProtocol";
				this.getPlugIn().getExtPoint(extPoint).processExts(jsx3.$F(function(ext,xml){
            var uiId = xml.attr("uiId");
            var extPlugIn = ext.getPlugIn();
            extPlugIn.load().when(function(){
                extPlugIn.loadRsrcComponent(uiId,objContainer)});
								var mtx = server.getJSXByName("mtxProtocolBinding");
								var protBindingId = mtx.getSelectedIds()[0];
								var a = mtx.getSelectedNodes()
								var protName = (mtx.getSelectedNodes().get(0)).getAttribute("protocolName");
								setTimeout(function(){server.publish({subject:"editProtocolBinding.getProtBindingid", protBindingId:protBindingId, protName:protName});},500);
            }).bind(this)); 
      }
			
			instance.newProtocol = function() {
				//clearInterval(EditAgreement.interval);
        var masterDetail =server.getJSXByName("editAgreementLayout");
        masterDetail.setSubcontainer1Pct("0",true);
				
				var objContainer = this.getDescendantOfName("blkEditContainer");
				var extPoint = "newProtocol";
				this.getPlugIn().getExtPoint(extPoint).processExts(jsx3.$F(function(ext,xml){
            var uiId = xml.attr("uiId");
            var extPlugIn = ext.getPlugIn();
            extPlugIn.load().when(function(){
                extPlugIn.loadRsrcComponent(uiId,objContainer)});
								setTimeout(function(){server.publish({subject:"newProtocolBinding.getBA", BA:EditAgreement.BA, protocolBinding:EditAgreement.protocolBinding});},500);
            }).bind(this)); 
      }
			
			instance.saveAgreement = function(){
				if(server.getJSXByName("isValid").getChecked())
					EditAgreement.BA.isValid = "true";
				else
					EditAgreement.BA.isValid = "false";
				delete EditAgreement.BA.lastmodified;				
				
				var service = dwrEngine.loadService('BIZAGREEMENT','saveBA',[EditAgreement.BA]);
				service.subscribe(dwrService.ON_SUCCESS, function(){server.publish({subject:"showAgreementsList"});	});
				service.doCall();
								
			}
			
			instance.cancel = function() {
				//clearInterval(EditAgreement.interval);
				this.getServer().publish({subject:"showAgreementsList"});	
			}
			
			instance.showEditAgreement = function() {
				server.getJSXByName("blkEditContainer").removeChildren();
				var masterDetail = com.tibco.cmi.getJSXByName("editAgreementLayout");
        masterDetail.setSubcontainer1Pct("100%",true);
				//EditAgreement.interval = setInterval(this.getProtocolBinding,5000);
				setTimeout(function(){server.getJSXByName("blkEditAgreement").getProtocolBinding();},1000);
			}
			
			instance.setEnabled = function(btnEnable, btnRemove) { 
				var mtx = com.tibco.cmi.getJSXByName("mtxProtocolBinding");
				if(btnEnable.getText() == "Enable All") {
					for(var i = 0; i < mtx.getSortedIds().length; i++){
						var recordId = mtx.getSortedIds()[i];
						var record = mtx.getRecordNode(recordId);
						record.setAttribute("checked",1);
						mtx.redrawRecord(recordId, jsx3.xml.CDF.UPDATE);
					}
					btnEnable.setText("Disable All",true);
					btnRemove.setEnabled(1);
				}
				
				else {
					for(var i = 0; i < mtx.getSortedIds().length; i++){
						var recordId = mtx.getSortedIds()[i];
						var record = mtx.getRecordNode(recordId);
						record.setAttribute("checked",0);
						mtx.redrawRecord(recordId, jsx3.xml.CDF.UPDATE);
					}
					btnEnable.setText("Enable All",true);
					btnRemove.setEnabled(0);
				}		
			}
			
			instance.changeState = function(btn) {
				if(this.getSelectedItem().size() == 0)
					btn.setEnabled(0);
				else
				  btn.setEnabled(1);
			}
			
			instance.getSelectedItem = function() {
				var mtx = com.tibco.cmi.getJSXByName("mtxProtocolBinding");
				var xml = mtx.getXML();
				var itemList = xml.selectNodes("//record[@checked='1']");
				return itemList;
			}
    })