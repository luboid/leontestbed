jsx3.lang.Class.defineClass("com.tibco.cmi.newAgreement.NewAgreement",
    jsx3.gui.Block,
    null,
    function(NewAgreement,instance){
			var systemUtil = com.tibco.cmi.system.util;
      var server = systemUtil.getServer();
			var dwrEngine = com.tibco.cmi.dwr.Engine;
			var dwrService = com.tibco.cmi.dwr.Service;
			
			instance.onRsrcLoad = function(){
				NewAgreement.block = server.getJSXByName("blkNewAgreement");
				this.getServer().subscribe("newAgreement.getBALIST",this, this.getBAList);
				this.getPartnerList();
			};
			
			instance.getBAList = function(objEvent) {
				NewAgreement.BALIST = objEvent.BALIST;
			}
			
			instance.getPartnerList = function() {
				var me = this;
				var hostService = dwrEngine.loadService('PARTNER','getHostPAList',[]);
				hostService.subscribe(dwrService.ON_SUCCESS, me, me._callback_getHostPAList_onSuccess);
				hostService.doCall();
				
				var partnerService = dwrEngine.loadService('PARTNER','getPartnerPAList',[]);
				partnerService.subscribe(dwrService.ON_SUCCESS, me, me._callback_getPartnerPAList_onSuccess);
				partnerService.doCall();
			}
			
			instance._callback_getHostPAList_onSuccess = function(objEvent) {
				var partnerList = objEvent.data;
				
				var hostCDF = new jsx3.xml.Document();
				var hostRoot = hostCDF.createDocumentElement("data");
				hostRoot.setAttribute("jsxid", "jsxroot");
				
				if(partnerList){
					for(var i = 0;i < partnerList.length;i++) {					
						var item = partnerList[i];
						var type = item.category;
						var name = item.name;
						var id = item.binindex;
						
						var record = hostRoot.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
						record.setAttribute("jsxid", jsx3.xml.CDF.getKey());
						record.setAttribute("id", id);
						record.setAttribute("radioed", 0);
						record.setAttribute("name", name);
						record.setAttribute("type", type);
						hostRoot.appendChild(record);
					}
					server.getJSXByName("mtxHost").setSourceXML(hostCDF);
					server.getJSXByName("mtxHost").repaint();
					
					for(var j = 0;j < partnerList.length;j++) {					
						var item = partnerList[j];
						var type = item.category;
						var partnerId = item.binindex;
						
						var service = dwrEngine.loadService('PROTOCOL','getEnabledProtocolList',[partnerId]);
						service.subscribe(dwrService.ON_SUCCESS, function(objEvent){
																										   var protocolList = objEvent.data;
																											 if(protocolList)
																											   NewAgreement.block.setProtocol(protocolList, hostCDF, server.getJSXByName("mtxHost"));
																										 });
						service.doCall();
					}
				}				
			}
			
			instance._callback_getPartnerPAList_onSuccess = function(objEvent) {
				var partnerList = objEvent.data;
				
				var partnerCDF = new jsx3.xml.Document();
				var partnerRoot = partnerCDF.createDocumentElement("data");
				partnerRoot.setAttribute("jsxid", "jsxroot");
				
				if(partnerList){
					for(var i = 0;i < partnerList.length;i++) {					
						var item = partnerList[i];
						var type = item.category;
						var name = item.name;
						var id = item.binindex;
						
						var record = partnerRoot.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
						record.setAttribute("jsxid", jsx3.xml.CDF.getKey());
						record.setAttribute("id", id);
						record.setAttribute("radioed", 0);
						record.setAttribute("name", name);
						record.setAttribute("type", type);
						partnerRoot.appendChild(record);
					}
					server.getJSXByName("mtxPartner").setSourceXML(partnerCDF);
					server.getJSXByName("mtxPartner").repaint();
					
					for(var j = 0;j < partnerList.length;j++) {					
						var item = partnerList[j];
						var type = item.category;
						var partnerId = item.binindex;
						
						var service = dwrEngine.loadService('PROTOCOL','getEnabledProtocolList',[partnerId]);
						service.subscribe(dwrService.ON_SUCCESS, function(objEvent){
																										   var protocolList = objEvent.data;
																											 if(protocolList)
																											   NewAgreement.block.setProtocol(protocolList, partnerCDF, server.getJSXByName("mtxPartner"));
																										 });
						service.doCall();
					}
				}				
			}
			
			instance.setProtocol = function(protocolList, cdf, mtx) {
			  var partnerId;
				var displayProtocol="";
				for(var i = 0; i < protocolList.length; i++) {
					var protocol = protocolList[i];
					partnerId = protocol.tpBinindex;
					var name = protocol.name;
					displayProtocol += name;
					
					if(i != protocolList.length - 1)
						displayProtocol += ",";
				}
				
				var itemList = cdf.selectNodes("//record[@id='" + partnerId + "']");
				for(var j = 0; j < itemList.size(); j++) {
					var item = itemList.get(j);
					item.setAttribute("protocol", displayProtocol);
					var recordID = item.getAttribute("jsxid");
					mtx.redrawRecord(recordID, jsx3.xml.CDF.UPDATE);	
				}
			}
			
			instance.saveAgreement = function(){
				var mtxHost = com.tibco.cmi.getJSXByName("mtxHost");
				var xml = mtxHost.getXML();
				var hostParty = xml.selectNodes("//record[@radioed='1']");
				var hostPartyId;
				if(hostParty.size() > 0)
					hostPartyId = hostParty.get(0).getAttribute("id");
				
				var mtxPartner = com.tibco.cmi.getJSXByName("mtxPartner");
				var xml = mtxPartner.getXML();
				var partnerParty = xml.selectNodes("//record[@radioed='1']");
				var partnerPartyId;
				if(partnerParty.size() > 0)
					partnerPartyId = partnerParty.get(0).getAttribute("id");
				
				if(hostParty.size() > 0 && partnerParty.size() > 0) {
					var BA = new Object;
					BA.HBinindex = hostPartyId;
					BA.tpBinindex = partnerPartyId;
					
					var isExist = 0;
					var baList = NewAgreement.BALIST;
					for(var i = 0; i < baList.length; i++) {
						var ba = baList[i];
						if(hostPartyId == ba.HBinindex && partnerPartyId == ba.tpBinindex) {
							isExist = 1;
							break;
						}
					}
					
					if(isExist)
						alert("Failed to create new Agreement: . Agreement already exisits between participants :host and partner ");
					
					else {
						var service = dwrEngine.loadService('BIZAGREEMENT','saveBA',[BA]);
						service.subscribe(dwrService.ON_SUCCESS, function(){server.publish({subject:"showAgreementsList"});	});
						service.doCall();		
					}					
					
				} else {
					alert("Host or Partner party is not selected")
				}
							
			}
			
			instance.cancel = function() {
				this.getServer().publish({subject:"showAgreementsList"});	
			}
			
			instance.getProtocolList = jsx3.$Y(function(cb){
				var partnerId = cb.args()[0];
				var service = dwrEngine.loadService('PROT','getProtocolList',[partnerId]);
				service.subscribe(dwrService.ON_SUCCESS, function(objEvent){
																									var protocol = objEvent.data;
																									cb.done(protocol);
																								});
				service.doCall();
			})
    })