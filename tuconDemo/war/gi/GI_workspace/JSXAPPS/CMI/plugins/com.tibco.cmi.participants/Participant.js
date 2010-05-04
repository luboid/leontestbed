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
			 PARTICIPANT.protocal = this.getDescendantOfName('blkprotocal');
			 PARTICIPANT.mtxlocation = PARTICIPANT.location.getDescendantOfName('mtxlocation');
		   PARTICIPANT.PARTNER_ADD = 1;
			 PARTICIPANT.PARTNER_EDIT = 0;
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
		   if(action == PARTICIPANT.PARTNER_ADD){
			    PARTICIPANT.EDIT_OR_ADD = PARTICIPANT.PARTNER_ADD;
			 }
			 else if(action == PARTICIPANT.PARTNER_EDIT){
			    PARTICIPANT.EDIT_OR_ADD = PARTICIPANT.PARTNER_EDIT;
					var currentPA = PARTICIPANT.mtxpa.getSelectedNodes().get(0);
					PARTICIPANT.currentPaId = currentPA.getAttribute('binIndex');
					this.getPAGeneralInfo(currentPA);
			 }
			 PARTICIPANT.layout.setSubcontainer1Pct('150,*',true);
		   
		};
		
		instance.removePA = function(){
		  var list = PARTICIPANT.mtxpa.getXML().selectNodes("//record[@checked]='true'");
			if(list.size()>0){
			    var ids = [];
					for(var i =0;i<list.size();i++){
					  ids.push(list.get(i).getAttribute('binindex'));
					}
					this.removeParticipants(ids,list);
			}
			 
		}
		
		instance.removeParticipants = function(ids,PAs){
		   var service = dwr.loadService('PARTNER','removePA',[ids]);
			 service.subscribe(dwrService.ON_SUCCESS,function(objEvent){PARTICIPANT.me._callback_removeParticipants_onSeccess(objEvent,PAs)});
			 service.doCall();
		   
		};
		
		instance._callback_removeParticipants_onSeccess = function(objEvent,PAs){
		      for(var i =0;i<list.size();i++){
					  PARTICIPANT.mtxpa.deleteRecord(PAs.get(i).getAttribute('jsxid'));
					}
					PARTICIPANT.mtxpa.repaintData();
					
		
		    
		}
		
		instance.getLocationList = function(){
		   if(PARTICIPANT.EDIT_OR_ADD == PARTICIPANT.PARTNER_EDIT){
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
						   list[i].jsxid = jsx3.xml.CDF.getKey();
							 cdfdoc.insertRecord(list[i]);
						}
						PARTICIPANT.mtxlocation.setSourceXML(cdfdoc);
						PARTICIPANT.mtxlocation.repaintData();
				};
		};
		
		instance.loadLocationDlg = function(){
		   var container = this.getServer().getBodyBlock();
		   var dlg = this.getPlugIn().loadRsrcComponent('Location_xml',container);
			 var cdf = jsx3.xml.CDF.Document.newDocument();
			 cdf.insertRecord({jsxid:'location'});
			 dlg.getDescendantOfName('cdflocation').setSourceXML(cdf);
			 return dlg;
		};
		instance.editLocation = function(){
		   this.loadLocationDlg();
			 //var service = 
		}
		
		instance.saveLocation = function(dlg){
		   var cdfcontainer = dlg.getDescendantOfName('cdflocation');
			 cdfcontainer.write();
			 var cdf = cdfcontainer.getXML();
			 alert(cdf);

		}
		
		
		instance.getPAGeneralInfo = function(PA){
		   var isactive = (PA.getAttribute('isActive')=='true')?1:0;
		   PARTICIPANT.general.getDescendantOfName('txtpaname').setValue(PA.getAttribute('name'),true);
			 PARTICIPANT.general.getDescendantOfName('chkpaisactivie').setChecked(isactive,true);
			 PARTICIPANT.general.getDescendantOfName('selpatype').setValue(PA.getAttribute('category'),true);
			 
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