jsx3.lang.Class.defineClass('com.tibco.cmi.participants.Participant',
  jsx3.gui.Block,
	null,
	function(PARTICIPANT,instance){
	
	  var systemUtil = com.tibco.cmi.system.util;
	  instance.onRsrcLoad = function(){
		   this.init();
			 this.getParticipants();
		};
		
		instance.init = function(){
		   PARTICIPANT.layout = this.getDescendantOfName('seplayout');
			 PARTICIPANT.mtxpa = this.getDescendantOfName('mtxparticipants');
			 PARTICIPANT.participant = this.getDescendantOfName('participant');
		   PARTICIPANT.PARTNER_ADD = 1;
			 PARTICIPANT.PARTNER_EDIT = 0;
			 
		};
		
		instance.getParticipants = function(){
		   
		   var cdfdoc = jsx3.xml.CDF.Document.wrap(systemUtil.getServer().getCache().openDocument('jsxplugin://com.tibco.cmi.participants/xml/partners.xml'));
			 // var newListcdf = jsx3.xml.CDF.Document.newDocument();
			 // newListcdf.insertRecord({name:'aaa',isActive:'true',type:'host',desc:'aaaaaaaaaa'});
			  PARTICIPANT.mtxpa.setSourceXML(cdfdoc);
				//PARTICIPANT.listContainer.getView().repaintData();
			 // PARTICIPANT.listContainer.getView().setSourceXML(cdfdoc);
			 // PARTICIPANT.listContainer.getView().repaintData();
		}
		
		instance.editParticipant = function(action){
		    alert(action);
		   if(action == PARTICIPANT.PARTNER_ADD){
			    
			 }
			 else if(action == PARTICIPANT.PARTNER_EDIT){
			 
			 }
			 PARTICIPANT.layout.setSubcontainer1Pct('150,*',true);
		   
		};
		
		instance.save = function(){
		   //DWR SAVE
			 PARTICIPANT.layout.setSubcontainer1Pct('*,0',true);
		};
		
		instance.cancel = function(){
		   PARTICIPANT.layout.setSubcontainer1Pct('*,0',true);
		}
		
		
	}

)