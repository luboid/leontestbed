jsx3.lang.Class.defineClass('com.tibco.cmi.participants.Participant',
  jsx3.gui.Block,
	null,
	function(PARTICIPANT,instance){
	 
	 var dwrEngine = com.tibco.cmi.dwr.Engine;
	 var dwrService = com.tibco.cmi.dwr.Service;
	
	  var systemUtil = com.tibco.cmi.system.util;
	  instance.onRsrcLoad = function(){
		   setTimeout(jsx3.$F(function(){this.init();
			 this.getParticipants();
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
		   debugger;
		   this.getLocationList();
		}
		
		instance.getContact = function(){
		   var locId = PARTICIPANT.location.getDescendantOfName('mtxlocation').getSelectedNodes().get(0).getAttribute('binindex');
			 var jsxid = PARTICIPANT.location.getDescendantOfName('mtxlocation').getSelectedNodes().get(0).getAttribute('jsxid');
		   var service = dwrEngine.loadService('CONTACT','getContListByLoc',[locId]);
			 service.subscribe(dwrService.ON_SUCCESS,function(objEvent){PARTICIPANT.me._callback_getContact_onSuccess(objEvent,jsxid)});
			 service.doCall();
		};
		
		instance._callback_getContact_onSuccess = function(objEvent,locRecordId){
		debugger;
		   var mtx = PARTICIPANT.location.getDescendantOfName('mtxlocation');
		   var list = objEvent.data;
			 if(list&&list.length>0){
			     for(var i=0;i<list.length;i++){
					    list[i].jsxid=jsx3.xml.CDF.getKey();
							list[i].locationorcontact = 'contact';
							mtx.insertRecord(list[i],locRecordId);
					 }
					 mtx.repaintData();
			 }
		};
		
		instance.addContact = function(){
		debugger;
		    PARTICIPANT.CONTACT_EDIT_OR_ADD = PARTICIPANT.ADD;
				var container = this.getServer().getBodyBlock();
				var cdf = jsx3.xml.CDF.Document.newDocument();
				cdf.insertRecord({jsxid:'contact'});
				var dlg = this.getPlugIn().loadRsrcComponent('Contact_xml',container);
				
				dlg.getDescendantOfName('cdfcontact').setSourceXML(cdf);
				dlg.getDescendantOfName('cdfcontact').read();
		   return dlg;
		}
		
		instance.editContact = function(){
		    var dlg = this.addContact();
				PARTICIPANT.CONTACT_EDIT_OR_ADD = PARTICIPANT.EDIT;
				var mtx = PARTICIPANT.location.getDescendantOfName('mtxlocation');
				var locId = mtx.getSelectedNodes().get(0).getAttribute('binindex');
		    var locRecordId = mtx.getSelectedNodes().get(0).getAttribute('jsxid');
				var contact = mtx.getRecord(locRecordId);
				contact.jsxid='contact';
				dlg.getDescendantOfName('cdfcontact').getXML().insertRecord(contact,'jsxroot');
				dlg.getDescendantOfName('cdfcontact').read();
				
		};
		
		instance.saveContact = function(dlg){
		    debugger;
		    dlg.getDescendantOfName('cdfcontact').write();
				var contact = dlg.getDescendantOfName('cdfcontact').getXML().getRecord('contact');
				if(ARTICIPANT.CONTACT_EDIT_OR_ADD == PARTICIPANT.ADD){
				   contact['binindex'] = '';
				}
				delete contact['jsxid'];
			  delete contact['locationorcontact'];
			  delete contact['jsxselected'];
			  delete contact['lastmodified'];
				var service = dwrEngine.loadService('CONTACT','saveCont',[contact]);
				service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_saveContact_onSuccess);
				service.doCall();
		   
		};
		
		instance._callback_saveContact_onSuccess = function(objEvent){
		debugger;
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
			 dlg.doClose();
		};
		
		instance.getProtocal = function(){
		   debugger;
		   var service = dwrEngine.loadService('PROTOCOL','getEnabledProtocolList',[PARTICIPANT.currentPaId]);
			 service.subscribe(dwrService.ON_SUCCESS,PARTICIPANT.me,PARTICIPANT.me._callback_getProtocal_onSuccess);
			 service.doCall();
		};
		
		instance._callback_getProtocal_onSuccess = function(objEvent){
		   var list = objEvent.data;
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
		}
		
		
	}

)