jsx3.lang.Class.defineClass('com.tibco.cmi.participants.Participant',
  jsx3.gui.Block,
	null,
	function(PARTICIPANT,instance){
	 
	 var dwrEngine = com.tibco.cmi.dwr.Engine;
	 var dwrService = com.tibco.cmi.dwr.Service;
	 var intervalId ='';
	
	  var systemUtil = com.tibco.cmi.system.util;
	  instance.onRsrcLoad = function(){
		   setTimeout(jsx3.$F(function(){this.init();
			 setInterval(function(){PARTICIPANT.me.getParticipants();},5000);
			 }).bind(this),500);
			 
		};
		
		instance.init = function(){
			 PARTICIPANT.me = this;
		   PARTICIPANT.layout = this.getDescendantOfName('seplayout');
			 PARTICIPANT.mtxpa = this.getDescendantOfName('mtxparticipants');
			 PARTICIPANT.participant = this.getDescendantOfName('participant');
			 PARTICIPANT.general = this.getDescendantOfName('blkgeneral');
			 PARTICIPANT.location = this.getDescendantOfName('blklocation');
			 PARTICIPANT.credential = this.getDescendantOfName('blkcredentials');
			 PARTICIPANT.protocal = this.getDescendantOfName('blkprotocal');
		   PARTICIPANT.ADD = 1;
			 PARTICIPANT.EDIT = 0;
			 PARTICIPANT.DOMAINID_EDIT_OR_ADD = '';
			 PARTICIPANT.LOCATION_EDIT_OR_ADD = '';
			 PARTICIPANT.CONTACT_EDIT_OR_ADD = '';
			 PARTICIPANT.EDIT_OR_ADD = '';
			 PARTICIPANT.currentPaId = '';
		};
		
		instance.getParticipants = function(){
		    var service = dwrEngine.loadService('PARTNER','getPAList',[]);
				service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getParticipants_onSccess);
				service.doCall();
		};
		
		instance._callback_getParticipants_onSccess = function(objEvent){
		    var list = objEvent.data;
				var cdfdoc = jsx3.xml.CDF.Document.newDocument();
				if(list&&list.length>0){
				    for(var i=0;i<list.length;i++){
						   list[i].jsxid = jsx3.xml.CDF.getKey();
							 cdfdoc.insertRecord(list[i]);
						}
						PARTICIPANT.mtxpa.setSourceXML(cdfdoc);
						PARTICIPANT.mtxpa.repaintData();
				};
		};
		
		instance.editParticipant = function(action){
		   var generalcdf = jsx3.xml.CDF.Document.newDocument();
			 generalcdf.insertRecord({jsxid:'general'},'jsxroot');
			 PARTICIPANT.general.getDescendantOfName('cdfgeneral').setSourceXML(generalcdf); 
		   if(action == PARTICIPANT.ADD){
			    PARTICIPANT.general.getDescendantOfName('cdfgeneral').read();
			    PARTICIPANT.EDIT_OR_ADD = PARTICIPANT.ADD;
					PARTICIPANT.currentPaId = '';
			 }
			 else if(action == PARTICIPANT.EDIT){
			    PARTICIPANT.EDIT_OR_ADD = PARTICIPANT.EDIT;
					var currentPA = PARTICIPANT.mtxpa.getSelectedNodes().get(0);
					PARTICIPANT.currentPaId = currentPA.getAttribute('binindex');
					this.getPAGeneralInfo(currentPA);
			 }
			 PARTICIPANT.layout.setSubcontainer1Pct('150,*',true);
		   
		};
		
		instance.removePA = function(){
		  // var list = PARTICIPANT.mtxpa.getXML().selectNodes("//record[@checked='1']");
			// if(list.size()>0){
			    // var ids = [];
					// for(var i =0;i<list.size();i++){
					  // ids.push(list.get(i).getAttribute('binindex'));
					// }
					// this.removeParticipants(ids,list);
			// }
			var items = this.getRemoveIds(PARTICIPANT.mtxpa);
			if(items){
			   this.removeParticipants(items.ids,items.list);
			}
			 
		};
		
		instance.getRemoveIds = function(mtx){
		   var list = mtx.getXML().selectNodes("//record[@checked='1']");
			if(list.size()>0){
			    var ids = [];
					for(var i =0;i<list.size();i++){
					  ids.push(list.get(i).getAttribute('binindex'));
					}
					return {ids:ids,list:list}
			}
			return null;
		}
		
		instance.removeParticipants = function(ids,PAs){
		   var service = dwrEngine.loadService('PARTNER','removePA',[ids]);
			 service.subscribe(dwrService.ON_SUCCESS,function(objEvent){PARTICIPANT.me._callback_removeParticipants_onSeccess(objEvent,PAs)});
			 service.doCall();
		   
		};
		
		instance._callback_removeParticipants_onSeccess = function(objEvent,PAs){
		      for(var i =0;i<PAs.size();i++){
					  PARTICIPANT.mtxpa.deleteRecord(PAs.get(i).getAttribute('jsxid'));
					}
					PARTICIPANT.mtxpa.repaintData();
					
		
		    
		}
		
		instance.getLocationList = function(){
		   if(PARTICIPANT.EDIT_OR_ADD == PARTICIPANT.EDIT){
					var PAid = PARTICIPANT.currentPaId;
					var service = dwrEngine.loadService('LOCATION','getLocListByPA',[PAid]);
					service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getLocationList_onSuccess);
					service.doCall();
			}
		   
		};
		
		instance._callback_getLocationList_onSuccess = function(objEvent){
		    var list = objEvent.data;
				var cdfdoc = jsx3.xml.CDF.Document.newDocument();
				if(list&&list.length>0){
				    for(var i=0;i<list.length;i++){
						   if(list[i].name == 'Headquarters'){
							    list[i].jsxnomask = '1';
							 }
						   list[i].jsxid = jsx3.xml.CDF.getKey();
							 list[i].locationorcontact = 'location';
							 cdfdoc.insertRecord(list[i],'jsxroot');
						}
						PARTICIPANT.location.getDescendantOfName('mtxlocation').setSourceXML(cdfdoc);
						PARTICIPANT.location.getDescendantOfName('mtxlocation').repaintData();
				};
		};
		
		instance.loadLocationDlg = function(){
		   PARTICIPANT.LOCATION_EDIT_OR_ADD = PARTICIPANT.ADD;
		   var container = this.getServer().getBodyBlock();
		   var dlg = this.getPlugIn().loadRsrcComponent('Location_xml',container);
			 var cdf = jsx3.xml.CDF.Document.newDocument();
			 cdf.insertRecord({jsxid:'location'});
			 dlg.getDescendantOfName('cdflocation').setSourceXML(cdf);
			 dlg.getDescendantOfName('cdflocation').read();
			 return dlg;
		};
		instance.editLocation = function(){
		   var dlg = this.loadLocationDlg();
			 PARTICIPANT.LOCATION_EDIT_OR_ADD = PARTICIPANT.EDIT;
			 dlg.getDescendantOfName('txtname').setEnabled(0,1);
			 var location = PARTICIPANT.location.getDescendantOfName('mtxlocation').getSelectedNodes().get(0);
			 var objlocation = PARTICIPANT.location.getDescendantOfName('mtxlocation').getRecord(location.getAttribute('jsxid'));
			 objlocation['jsxid'] = 'location';
			 dlg.getDescendantOfName('cdflocation').getXML().insertRecord(objlocation,'jsxroot');
			 dlg.getDescendantOfName('cdflocation').read();
			 
			 
			 //var service = 
		}
		
		instance.saveLocation = function(dlg){
		   var cdfcontainer = dlg.getDescendantOfName('cdflocation');
			 cdfcontainer.write();
			 var cdf = cdfcontainer.getXML();
			 var location = cdf.getRecord('location');
			 location['tpBinindex'] = PARTICIPANT.currentPaId;
			 //add;
			 delete location['jsxid'];
			 delete location['locationorcontact'];
			 delete location['jsxselected'];
			 delete location['lastmodified'];
			 if(PARTICIPANT.LOCATION_EDIT_OR_ADD == PARTICIPANT.ADD){
			     location['binindex'] = '';
			 }
			 var service = dwrEngine.loadService('LOCATION','saveLoc',[location]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_saveLocation_onSuccess);
			 service.doCall();
			 dlg.doClose();
		};
		
		instance._callback_saveLocation_onSuccess = function(objEvent){
		   this.getLocationList();
		}
		
		instance.getContact = function(){
		   var locId = PARTICIPANT.location.getDescendantOfName('mtxlocation').getSelectedNodes().get(0).getAttribute('binindex');
			 var jsxid = PARTICIPANT.location.getDescendantOfName('mtxlocation').getSelectedNodes().get(0).getAttribute('jsxid');
			 //window.alert('getContact: locId='+locId);
		   var service = dwrEngine.loadService('CONTACT','getContListByLoc',[locId]);
			 service.subscribe(dwrService.ON_SUCCESS,function(objEvent){PARTICIPANT.me._callback_getContact_onSuccess(objEvent,jsxid)});
			 service.doCall();
		};
		
		instance._callback_getContact_onSuccess = function(objEvent,locRecordId){
		   var mtx = PARTICIPANT.location.getDescendantOfName('mtxlocation');
		   
		   //window.alert('_callback_getContact_onSuccess: locRecordId='+locRecordId);
		   var locRec = mtx.getRecord(locRecordId);
		   // remove existing
		   var existlist = mtx.getRecordIds();
		   var found = false;
		   for(var j=0;j<existlist.length;j++){
		   	  var rec = mtx.getRecord(existlist[j]);
		   	  
		   	  //alert('rec.locationorcontact='+rec.locationorcontact+', jsxid='+rec.jsxid);
		   	  if(rec.jsxid == locRecordId) {
		   	  	// hit the target location, mark start
		   	  	found = true;
		   	  	continue;
		   	  }
		   	  if(found && rec.locationorcontact == 'contact') {
		   	  	// delete contacts under target location
		   	  	mtx.deleteRecord(existlist[j], true);	
		   	  	continue;
		   	  }
		   	  if(found && rec.locationorcontact != 'contact') {
		   	  	// hit next location, break;
		   	  	break;
		   	  }
		   		
		   }
		   
		   //window.alert('matrix size:'+mtx.getRecordIds().length);
		   var list = objEvent.data;
			 if(list&&list.length>0){
			     for(var i=0;i<list.length;i++){
					    list[i].jsxid=jsx3.xml.CDF.getKey();
							list[i].locationorcontact = 'contact';
							mtx.insertRecord(list[i],locRecordId);
							
					 }
					 //window.alert('matrix size:'+mtx.getRecordIds().length);
					 mtx.repaintData();
			 }
		};
		
		instance.addContact = function(){
		    PARTICIPANT.CONTACT_EDIT_OR_ADD = PARTICIPANT.ADD;
				var container = this.getServer().getBodyBlock();
				var mtx = PARTICIPANT.location.getDescendantOfName('mtxlocation');
				var locId = mtx.getSelectedNodes().get(0).getAttribute('binindex');
				
				var cdf = jsx3.xml.CDF.Document.newDocument();
				var contact = {jsxid:'contact', LBinindex:locId};
				cdf.insertRecord(contact);
				
				var dlg = this.getPlugIn().loadRsrcComponent('Contact_xml',container);
				
				dlg.getDescendantOfName('cdfcontact').setSourceXML(cdf);
				dlg.getDescendantOfName('cdfcontact').read();
				
				
		   return dlg;
		}
		
		instance.editContact = function(){
		    var dlg = this.addContact();
				PARTICIPANT.CONTACT_EDIT_OR_ADD = PARTICIPANT.EDIT;
				var mtx = PARTICIPANT.location.getDescendantOfName('mtxlocation');
				var locId = mtx.getRecord(mtx.getSelectedNodes().get(0).getAttribute('jsxid')).binindex;
		    var locRecordId = mtx.getSelectedNodes().get(0).getAttribute('jsxid');
				var contact = mtx.getRecord(locRecordId);
				contact.jsxid='contact';
				contact.LBinindex = locId;
				dlg.getDescendantOfName('cdfcontact').getXML().insertRecord(contact,'jsxroot');
				dlg.getDescendantOfName('cdfcontact').read();
				
		};
		
		instance.saveContact = function(dlg){
		    dlg.getDescendantOfName('cdfcontact').write();
				var contact = dlg.getDescendantOfName('cdfcontact').getXML().getRecord('contact');
				if(PARTICIPANT.CONTACT_EDIT_OR_ADD == PARTICIPANT.ADD){
				   contact['binindex'] = '';
				}
				contact['name'] = contact['FNale']+contact['LName'];
				delete contact['jsxid'];
			  delete contact['locationorcontact'];
			  delete contact['jsxselected'];
			  delete contact['lastmodified'];
				var service = dwrEngine.loadService('CONTACT','saveCont',[contact]);
				service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_saveContact_onSuccess);
				service.doCall();
				dlg.doClose();
		   
		};
		
		instance._callback_saveContact_onSuccess = function(objEvent){
		    this.getContact();
		   
		}
		
		instance.getPAGeneralInfo = function(PA){
		   var isactive = (PA.getAttribute('isActive')=='true')?1:0;
		   PARTICIPANT.general.getDescendantOfName('txtpaname').setValue(PA.getAttribute('name'),true);
			 PARTICIPANT.general.getDescendantOfName('chkpaisactivie').setChecked(isactive,true);
			 PARTICIPANT.general.getDescendantOfName('selpatype').setValue(PA.getAttribute('category'),true);
			 
		};
		
		instance.getCertList = function(){
		   var service = dwrEngine.loadService('PKISTOREITEM','getCredList',[PARTICIPANT.currentPaId]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getCertList_onSuccess);
			 service.doCall();
		};
		
		instance._callback_getCertList_onSuccess = function(objEvent){
		   
		   
		   //delete existing:
		   var mtx = PARTICIPANT.credential.getDescendantOfName('mtxcert');
			 var existlist = mtx.getRecordIds();
			 for(var j=0;j<existlist.length;j++) {
			 		mtx.deleteRecord(existlist[j], true);
			 }
			 
			 var list = objEvent.data;
			 var cdf = jsx3.xml.CDF.Document.newDocument();
			 if(list&&list.length>0){
			    for(var i=0;i<list.length;i++){
					   list[i].jsxid = jsx3.xml.CDF.getKey();
						 cdf.insertRecord(list[i],'jsxroot');
					}
					PARTICIPANT.credential.getDescendantOfName('mtxcert').setSourceXML(cdf);
					PARTICIPANT.credential.getDescendantOfName('mtxcert').repaintData();
			 }
		   
		}
		
		instance.removeCredentials = function(){
		   var items = this.getRemoveIds(PARTICIPANT.credential.getDescendantOfName('mtxcert'));
			 if(items){
			     this.removeCred(items.ids,items.list)
			 }
		};
		
		instance.removeCred = function(ids,list){
		    var service = dwrEngine.loadService('PKISTOREITEM','removeCred',[ids]);
				service.subscribe(dwrService.ON_SUCCESS,function(objEvent){PARTICIPANT.me._callback_removeCred_onSuccess(objEvent,list)});
				service.doCall();
		};
		
		instance._callback_removeCred_onSuccess = function(objEvent,list){
		     for(var i =0;i<list.size();i++){
					  PARTICIPANT.credential.getDescendantOfName('mtxcert').deleteRecord(list.get(i).getAttribute('jsxid'));
					}
					PARTICIPANT.credential.getDescendantOfName('mtxcert').repaintData();
		}
		
		instance.newCertFile = function(){
		   var container = this.getServer().getBodyBlock();
		   this.getPlugIn().loadRsrcComponent('certUploadDlg_xml',container);
		};
		
		instance.uploadCertFile = function(dlg){
		   var form = document.getElementById('certform');
		   	form.action = '/war/upload';
			 var file = document.getElementById('certfile');
			 var url = document.createElement('input');
			 url.name = 'url';
			 url.style.display = 'none';
			 url.value = file.value.substring(file.value.lastIndexOf('/')+1);
			 
			 var binindex = document.createElement('input');
			 binindex.name = 'tpBinindex';
			 binindex.value = PARTICIPANT.currentPaId;
			 binindex.style.display = 'none';
			 var alias = document.createElement('input');
			 alias.name = 'name';
			 alias.value = dlg.getDescendantOfName('txtalias').getValue();
			 alias.style.display = 'none';
			 form.appendChild(url);
			 form.appendChild(binindex);
			 form.appendChild(alias);
			 form.submit();
			 intervalId = setInterval(function(){PARTICIPANT.me.minitorUpload()},100);
		};
		
		instance.getProtocal = function(){
		   var service = dwrEngine.loadService('PROTOCOL','getEnabledProtocolList',[PARTICIPANT.currentPaId]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getProtocal_onSuccess);
			 service.doCall();
		};
		
		instance._callback_getProtocal_onSuccess = function(objEvent){
		   var list = objEvent.data;
			 PARTICIPANT.protocolList = list;
			 var mtx = PARTICIPANT.protocal.getDescendantOfName('mtxprotocal');
       var cdf = jsx3.xml.CDF.Document.newDocument(); 			 
			 if(list&&list.length>0){
			    for(var i=0;i<list.length;i++){
					   list[i].jsxid = jsx3.xml.CDF.getKey();
						 cdf.insertRecord(list[i],'jsxroot');
					}
					mtx.setSourceXML(cdf);
					mtx.repaintData();
			 }
		   
		};
		
		instance.enableProtocal = function(){
		   var container = this.getServer().getBodyBlock();
			 var dlg = this.getPlugIn().loadRsrcComponent('DisabledProtocalDlg_xml',container);
			 var mtx = dlg.getDescendantOfName('mtxprotocal');
			 this.getDisabledProtocal();
			 
			 
		};
		
		instance.getDisabledProtocal = function(){
		   var service = dwrEngine.loadService('PROTOCOL','getDisabledProtocolList',[PARTICIPANT.currentPaId]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getDisabledProtocal_onSuccess);
			 service.doCall();
		};
		
		instance._callback_getDisabledProtocal_onSuccess = function(objEvent){
		   var list = objEvent.data;
			 var mtx = this.getServer().getBodyBlock().getDescendantOfName('mtxdisprotocal');
			 var cdf = jsx3.xml.CDF.Document.newDocument();
			 if(list&&list.length>0){
			    for(var i=0;i<list.length;i++){
					   var protocal = {jsxid:jsx3.xml.CDF.getKey(),name:list[i]};
						 cdf.insertRecord(protocal,'jsxroot');
					}
					mtx.setSourceXML(cdf);
					mtx.repaintData();
			 }
			 
		};
		
		instance.chooseProtocal = function(dlg){
		   var mtx = dlg.getDescendantOfName('mtxdisprotocal');
			 var nodes =  mtx.getXML().selectNodes("//record[@checked='1']");
			 if(nodes.size()>0){
				 var names = [];
				 for(var i= 0;i<nodes.size();i++){
				    names.push(nodes.get(i).getAttribute('name'));
				 }
				 this.enableProt(names);
			 }
			 dlg.doClose();
			 
		};
		
		instance.enableProt = function(names){
		   var service = dwrEngine.loadService('PROTOCOL','enableProtocols',[PARTICIPANT.currentPaId,names]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_enableProt_onSuccess);
			 service.doCall();
		
		};
		instance._callback_enableProt_onSuccess = function(objEvent){
		   
		   this.getProtocal();
		   
		};
		
		instance.disableProtocal = function(){
		   var mtx = PARTICIPANT.protocal.getDescendantOfName('mtxprotocal');
			 var nodes = mtx.getXML().selectNodes("//record[@checked='1']");
			 if(nodes.size()>0){
				 var ids = [];
				 for(var i= 0;i<nodes.size();i++){
				    ids.push(nodes.get(i).getAttribute('binindex'));
				 }
				 this.disableProt(ids);
			 }
		};
		
		instance.disableProt = function(ids){
		   var service = dwrEngine.loadService('PROTOCOL','disableProtocols',[ids]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_disableProt_onSuccess);
			 service.doCall();
		};
		
		instance._callback_disableProt_onSuccess = function(){
		   this.getProtocal();
		}
		
		
		instance.save = function(){
		   this.savePartner();
			 PARTICIPANT.layout.setSubcontainer1Pct('*,0',true);
		};
		
		instance.savePartner = function(){
		   var name = PARTICIPANT.general.getDescendantOfName('txtpaname').getValue();
			 var isactive = (PARTICIPANT.general.getDescendantOfName('chkpaisactivie').getChecked()==1);
			 var type = PARTICIPANT.general.getDescendantOfName('selpatype').getValue();
			 var partner = {name:name,isActive:isactive,category:type,binindex:PARTICIPANT.currentPaId};
			 var service = dwrEngine.loadService('PARTNER','savePA',[partner]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_savePartner_onSuccess);
			 service.doCall();

		};
		
		instance._callback_savePartner_onSuccess = function(){
		   this.getParticipants();
		}
		
		instance.cancel = function(){
		   PARTICIPANT.layout.setSubcontainer1Pct('*,0',true);
		};
		
		instance.getIdentityList = function(){
			var service = dwrEngine.loadService('DOMAINID','getDomainIdListByParentID',[PARTICIPANT.currentPaId]);
			service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getDomainIdList_onSuccess);
			service.doCall();
		}
		
		instance._callback_getDomainIdList_onSuccess = function(objEvent){
			var list = objEvent.data;
			
			var cdf = new jsx3.xml.Document();
			var root = cdf.createDocumentElement("data");
			root.setAttribute("jsxid", "jsxroot");
			for(var i = 0; i < list.length; i++) {
				var domainId = list[i];
				var record = root.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
				var domain = domainId.domaintype;
				var identity = domainId.CDomid;
				var id = domainId.binindex;
				
				record.setAttribute("jsxid", jsx3.xml.CDF.getKey());
				record.setAttribute("domainId",id);
				record.setAttribute("domain", domain);
				record.setAttribute("identity", identity);
				record.setAttribute("checked",0);
					
				root.appendChild(record);
			}
			this.getDescendantOfName('mtxidentifierlist').setSourceXML(cdf);
			this.getDescendantOfName('mtxidentifierlist').repaintData();
		};
		
		instance.loadIdentityDlg = function(){
		   var container = this.getServer().getBodyBlock();
		   var dlg = this.getPlugIn().loadRsrcComponent('IdentityDlg_xml',container);
			 
			 var service = dwrEngine.loadService('DOMAIN','getDomainList',[]);
				service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getDomainList_onSuccess);
				service.doCall();
			
			 return dlg;
		};
		
		instance._callback_getDomainList_onSuccess = function(objEvent){
			var list = objEvent.data;
			
			var cdf = new jsx3.xml.Document();
			var root = cdf.createDocumentElement("data");
			root.setAttribute("jsxid", "jsxroot");
			for(var i = 0; i < list.length; i++) {
				var domain = list[i];
				var record = root.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
				
				record.setAttribute("jsxid", domain);
				record.setAttribute("jsxtext", domain);					
				root.appendChild(record);
			}
			
			systemUtil.getServer().getJSXByName("selDomain").setSourceXML(cdf);
			systemUtil.getServer().getJSXByName("selDomain").repaint();
		};
		
		instance.saveDomainId = function(dlg){
			var domain = systemUtil.getServer().getJSXByName("selDomain").getValue();
			var identity = systemUtil.getServer().getJSXByName("txtIdentity").getValue();
			var domainId = new Object;
			domainId.domid = identity;
			domainId.CDomid = identity;
			domainId.domaintype = domain;
			domainId.PBinindex = PARTICIPANT.currentPaId;
			//domainId.PBinindex = parentId;
			
			var service = dwrEngine.loadService('DOMAINID','saveDomainId',[domainId]);
			service.subscribe(dwrService.ON_SUCCESS, function(){PARTICIPANT.me.getIdentityList()});
			service.doCall();	
			dlg.doClose();
		};
		
		instance.minitorUpload = function(){
				iframe_upload
				var iframe;
				var IFrameInnerHTML = '';
				iframe = frames["iframe_upload"];
			  var content = iframe.status;
				if(content == 'OK'){
				   systemUtil.getServer().getJSXByName("dlgupload").doClose();
					 if(intervalId){
					     clearInterval(intervalId);
					 }
					 this.getCertList();
				}

       
		}
		
		
		instance.removeDomainId = function(){
			var mtx = PARTICIPANT.mtxidentifierlist;
			var xml = mtx.getXML();
			var itemList = xml.selectNodes("//record[@checked='1']");
			
			var dis = [];
				for(var i = 0; i < itemList.size(); i++) {
					var item = itemList.get(i);
					dis.push(item.getAttribute("domainId"));
				}
				
				var service = dwrEngine.loadService('DOMAINID','removeDomainId',[dis]);
				service.subscribe(dwrService.ON_SUCCESS, function(){PARTICIPANT.me.getIdentityList()});
				service.doCall();
		};
		
		instance.editProtocol = function(){
			systemUtil.getServer().getJSXByName("editProtocolLayout"). setSubcontainer1Pct("0%",true);
			var mtx = systemUtil.getServer().getJSXByName("mtxprotocal");
			
			var protocolId = mtx.getSelectedNodes().get(0).getAttribute("binindex");
			for(var i = 0; i < PARTICIPANT.protocolList.length;i++) {
				if(PARTICIPANT.protocolList[i].binindex == protocolId){
					PARTICIPANT.selectedProtocol = PARTICIPANT.protocolList[i];
					break;
				}
			}
			
			var service ;
			if(PARTICIPANT.selectedProtocol.name == "EZComm") {
				systemUtil.getServer().getJSXByName("lalIdentityTitle").setText("AS2 Identifier",true)
				service = dwrEngine.loadService('DOMAINID','getDomainIdListByAS2Flag',[PARTICIPANT.currentPaId,true]);
			}
			else {
				systemUtil.getServer().getJSXByName("lalIdentityTitle").setText("Identifier",true)
			  service = dwrEngine.loadService('DOMAINID','getDomainIdListByParentID',[PARTICIPANT.currentPaId]);
			}
			service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getDomainIdList_onSuccess_editProtocol);
			service.doCall();

			if(PARTICIPANT.selectedProtocol.emailId) {
				PARTICIPANT.hasEmail = true;
				var emailService = dwrEngine.loadService('EMAILMONIKER','getEmailByID',[PARTICIPANT.selectedProtocol.emailId]);
				emailService.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getEmailByID_onSuccess);
				emailService.doCall();
			}
			else {
				PARTICIPANT.hasEmail = false;
				systemUtil.getServer().getJSXByName("txtEmailList").setValue("",true);
			}
		}
		
		instance._callback_getDomainIdList_onSuccess_editProtocol = function(objEvent){
			var list = objEvent.data;
			var cdf = new jsx3.xml.Document();
			var root = cdf.createDocumentElement("data");
			root.setAttribute("jsxid", "jsxroot");
			
			for(var i = 0; i < list.length; i++) {
				var domain = list[i];
				var record = root.createNode(jsx3.xml.Entity.TYPEELEMENT, "record");
				
				var domainId = domain.binindex;
				var display = domain.domaintype + "-" + domain.CDomid;
				
				record.setAttribute("jsxid", domainId);
				record.setAttribute("jsxtext", display);					
				root.appendChild(record);
			}
			
			systemUtil.getServer().getJSXByName("selIdentifier").setSourceXML(cdf);
			
			if(PARTICIPANT.selectedProtocol.name == "EZComm")
				systemUtil.getServer().getJSXByName("selIdentifier").setValue(PARTICIPANT.selectedProtocol.as2Binindex);
			else
			  systemUtil.getServer().getJSXByName("selIdentifier").setValue(PARTICIPANT.selectedProtocol.DBinindex);
			
		}
		
		instance._callback_getEmailByID_onSuccess = function(objEvent) {
			var emailList = objEvent.data.email;
			PARTICIPANT.email = objEvent.data;
			systemUtil.getServer().getJSXByName("txtEmailList").setValue(emailList,true);
		}
		
		instance.saveProtocol = function(){
			var emailList = systemUtil.getServer().getJSXByName("txtEmailList").getValue();
			var email;
			if(PARTICIPANT.hasEmail) {
				email = PARTICIPANT.email;
				email.email = emailList;
			}
			else {
				email = new Object;
				email.EBinindex = PARTICIPANT.selectedProtocol.binindex;
				email.tpBinindex = PARTICIPANT.selectedProtocol.tpBinindex;
				email.email = emailList;
			}
			
			var emailService = dwrEngine.loadService('EMAILMONIKER','saveEmail',[email]);
			emailService.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_saveEmail_onSuccess);
			emailService.doCall();
		}
		
		instance._callback_saveEmail_onSuccess = function(objEvent) {
			var email = objEvent.data;
			var emailId = email.binindex;
			var domainIDBinindex = systemUtil.getServer().getJSXByName("selIdentifier").getValue();
			
			PARTICIPANT.selectedProtocol.emailId = emailId;
			
			if(domainIDBinindex) {
				if(PARTICIPANT.selectedProtocol.name == "EZComm")
					PARTICIPANT.selectedProtocol.as2Binindex = domainIDBinindex;
				else
					PARTICIPANT.selectedProtocol.DBinindex = domainIDBinindex;
			}
			
			var protocolList = [PARTICIPANT.selectedProtocol];
			protocolList.push()
			var service = dwrEngine.loadService('PROTOCOL','enableProtocols',[protocolList]);
			service.subscribe(dwrService.ON_SUCCESS, function(){PARTICIPANT.me.showProtocolList()});
			service.doCall();
		}

		instance.showProtocolList = function(){
			systemUtil.getServer().getJSXByName("editProtocolLayout"). setSubcontainer1Pct("100%",true);
		};
		
		instance.getTransport = function(){
		   var protocalId = PARTICIPANT.selectedProtocol.binindex;
		   var service = dwrEngine .loadService('TRANSPORT','getTransportList',[protocalId]);
			 service.subscribe(dwrService.ON_SUCCESS,function(objEvent){PARTICIPANT.me._callback_getTransport_onSuccess(objEvent);})
			 service.doCall();
		};
		
		instance._callback_getTransport_onSuccess = function(objEvent){
		   var list = objEvent.data;
			 var mtx = systemUtil.getServer().getJSXByName("mtxtransport");
			 var cdf = jsx3.xml.CDF.Document.newDocument();
			 if(list&&list.length>0){
			     for(var i= 0;i<list.length;i++){
					    list[i].jsxid = jsx3.xml.CDF.getKey();
							cdf.insertRecord(list[i]);
					 } 
					 mtx.setSourceXML(cdf);
			 }
			 mtx.repaintData();
		}
		
		instance.addTransport = function(){
		   var container = this.getServer().getBodyBlock();
			 var protId = PARTICIPANT.selectedProtocol.binindex;
			 var dlg = this.getPlugIn().loadRsrcComponent('TransportEdit_xml',container);
			 var cdfcontainer = dlg.getDescendantOfName('cdftransport');
			 var cdf = jsx3.xml.CDF.Document.newDocument();
			 cdf.insertRecord({jsxid:'transport',type:'FILE',status:1,fileprocessing:'File Mask',EBinindex:protId});
			 cdfcontainer.setSourceXML(cdf);
			 cdfcontainer.read();  
			 return dlg;
		};
		
		instance.editTransport = function(){
		   var dlg = this.addTransport();
			 var cdfcontainer = dlg.getDescendantOfName('cdftransport');
			 var mtx = systemUtil.getServer().getJSXByName("mtxtransport");
			 var record = mtx.getRecord(mtx.getSelectedNodes().get(0).getAttribute('jsxid'));
			 record['jsxid'] = 'transport';
			 cdfcontainer.getXML().insertRecord(record,'jsxroot');
			 cdfcontainer.read();
			 var type = dlg.getDescendantOfName('seltype').getValue();
			 this.selectTranportType(type);
		};
		
		instance.selectTranportType = function(id){
		    var dlg = systemUtil.getServer().getJSXByName("dlgtransport");
				if(id == 'HTTP'){
				   dlg.getDescendantOfName('httpPane').setDisplay(jsx3.gui.Block.DISPLAYBLOCK,true);
				}
				else {
				    dlg.getDescendantOfName('httpPane').setDisplay(jsx3.gui.Block.DISPLAYNONE,true);
				}
				
		}
		
		instance.saveTransport = function(){
		   debugger;
		   var dlg = systemUtil.getServer().getJSXByName("dlgtransport");
			 var cdfcontainer = dlg.getDescendantOfName('cdftransport');
			 cdfcontainer.write();
			 var record = cdfcontainer.getRecord('transport');
			 delete record['jsxid'];
			 delete record['jsxselected'];
			 delete record['lastmodified'];
			 var service = dwrEngine.loadService('TRANSPORT','saveTransport',[record]);
			 service.subscribe(dwrService.ON_SUCCESS,function(objEvent){PARTICIPANT.me._callback_saveTransport_onSuccess(objEvent)});
			 service.doCall();
			 dlg.doClose();
		};
		instance._callback_saveTransport_onSuccess = function(objEvent){
		   this.getTransport();
		}
		

		
		
	}

)