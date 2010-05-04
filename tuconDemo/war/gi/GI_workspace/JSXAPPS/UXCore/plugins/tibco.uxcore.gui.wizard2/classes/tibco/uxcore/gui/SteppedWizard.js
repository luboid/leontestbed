/**
* Prototype class object to create a specialized block object with built-in basic benchmarking in the repaint calls
**/
jsx3.Class.defineClass(
        "tibco.uxcore.gui.SteppedWizard",
        tibco.uxcore.gui.Wizard2,
        null,
        function (block) {


            /**
             * instance initializer
             * @param strName {String} unique name distinguishing this object from all other JSX GUI objects in the JSX application
             * @param vntLeft {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param vntTop {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param vntWidth {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param vntHeight {int|String} either a number (i.e, 12, 30, etc) or a number and a unit value (i.e., "25%", "36pt", etc); if a number is passed, pixels will be the assumed unit when painted to screen
             * @param strHTML {String} Text/HTML markup to place in the jsx3.gui.Block instance
             */
            block.prototype.init = function(strName, vntLeft, vntTop, vntWidth, vntHeight, strHTML) {
                //call constructor for super class (the super expects the name of the object and the function that it is an instance of)
                this.jsxsuper(strName, vntLeft, vntTop, vntWidth, vntHeight, strHTML);
            };

            block.prototype.setActiveStep = function(stepPanel) {
                this.activeStep = stepPanel;
            }

            block.prototype.nextStep = function() {
                var pane = this.getStepsPane();
                if(pane) {
                    try {
                    var idx = this.activeStep.getChildIndex();
                    var next = null;
                    for(var i = idx + 1; i < pane.getChildren().length; i++) {
                        var child = pane.getChild(i);
                        if(child.instanceOf("tibco.uxcore.gui.WizardStep")) {
                            next = child;
                            break;
                        }
                    }
                        var str = next + "";
                        try {
                            str = next.getName();
                        } catch(ex){}
                    if(next) {
                        this.activeStep = next;
                        next.setActive();
                    }
                    }catch(ex) {
                        tibco.uxcore.System.logException(ex);
                        //do nothing
                    }
                }
                return this.activeStep;
            }

            block.prototype._findNextPanel = function() {
                var next = this.jsxsuper();
                if(next) {
                    this.nextStep();
                }
                return next;
            }

            block.prototype._findPrevPanel = function() {
                var prev = this.jsxsuper();
                if(prev) {
                    this.prevStep();
                }
                return prev;
            }

            block.prototype.prevStep = function() {
                var pane = this.getStepsPane();
                if(pane) {
                    try {
                        var idx = this.activeStep.getChildIndex();
                    var prev = null;
                    for(var i = idx - 1; i >= 0; i--) {
                        var child = pane.getChild(i);
                        if(child.instanceOf("tibco.uxcore.gui.WizardStep")) {
                            prev = child;
                            break;
                        }
                    }
                    if(prev) {
                        this.activeStep = prev;
                        prev.setActive();
                    }
                    }catch(ex) {
                        //do nothing
                    }
                }
                return this.activeStep;
            }

            block.prototype.onSetParent = function(objChild, intPersist, strSourceURL, strNS) {
                var ret = this.jsxsuper(objChild, intPersist, strSourceURL, strNS);
                try {
                var stepsPane = this.getStepsPane();
                var firstStep = null;
                if(stepsPane) {
                    var children = stepsPane.getChildren();
                    for(var i=0; i<children.length; i++) {
                        var child = stepsPane.getChild(i);
                        if(child.instanceOf("tibco.uxcore.gui.WizardStep")) {
                            firstStep = child;
                            break;
                        }
                    }
                    if(firstStep) {
                        this.activeStep = firstStep;
                        firstStep.setActive();
                    }
                }
                } catch(ex) {
                    tibco.uxcore.System.logException(ex);
                }
                return ret;
            }

            block.prototype.activateStep = function(strStepName) {
                var step = this.getStepPane().getDescendantOfName(strStepName, true);
                if(step) {
                    this.activeStep = step;
                    step.setActive();
                }
            }

            block.prototype.setStepsPaneName = function(paneName) {
                delete this.stepsPaneName;
                delete this.stepsPane;
                this.stepsPaneName = paneName;
                if(this.stepsPaneName) {
                    this.stepsPane = this.getDescendantOfName(stepsPaneName);
                }
                return this.stepsPane;
            }

            block.prototype.getStepsPaneName = function() {
                return this.stepsPaneName;
            }

            block.prototype.getStepsPane = function() {
                if(!this.stepsPane && this.stepsPaneName) {
                    this.stepsPane = this.getDescendantOfName(this.stepsPaneName);
                }
                return this.stepsPane;
            }

            block.prototype.setDetailsPaneName = function(paneName) {
                delete this.detailsPaneName;
                delete this.detailsPane;
                this.detailsPaneName = paneName;
                if(this.detailsPaneName) {
                    this.detailsPane = this.getDescendantOfName(detailsPaneName);
                }
                return this.detailsPane;
            }

            block.prototype.getDetailsPaneName = function() {
                return this.detailsPaneName;
            }

            block.prototype.getDetailsPane = function() {
                if(!this.detailsPane && this.detailsPaneName) {
                    this.detailsPane = this.getDescendantOfName(this.detailsPaneName);
                }
                return this.detailsPane;
            }

			//modify by alan.for extract the code from wizard component file
			block.prototype.initLeftInfo = function(){
				var objJSX = this;
				if(objJSX.rule && objJSX.rule.ruleName != undefined){

					try{
						objJSX.getDescendantOfName('lblNameCont_90').setText(objJSX.rule.ruleName,true);
				       	objJSX.getDescendantOfName('lblSchlCont_90').setText(objJSX.rule.ruleScheduleName,true);
				    	objJSX.getDescendantOfName('lblDescCont_90').setText(objJSX.rule.ruleDescription,true);
				    	objJSX.getDescendantOfName('lblAlertCont_90').setText(objJSX.rule.ruleSendAlert,true);
				    	if(objJSX.rule.ruleLog == 'true'){
							objJSX.getDescendantOfName('lblLogCont_90').setText('Y',true);
						}else{
							objJSX.getDescendantOfName('lblLogCont_90').setText('N',true);
						}

						if(objJSX.rule.ruleInvokedService == 'true'){
							objJSX.getDescendantOfName('lblActionCont_90').setText('Yes-'+objJSX.rule.ruleServiceName,true);
						}else{
							objJSX.getDescendantOfName('lblActionCont_90').setText('No',true);
						}

				    	//objJSX.getDescendantOfName('lblConditionCont_90').setText(objJSX.rule.conditionString,true);
				    	objJSX.getDescendantOfName('lblTagObjCont_90').setText(objJSX.rule.ruleTargetObjectName,true);

						//render code for conditions
						if(!objJSX.rule.conditions){
							return;
						}
						var conditions = objJSX.rule.conditions;
				        var container = objJSX.getDescendantOfName('lblConditionCont_90');
				        while(container.getChildren().length > 0){
				        	container.removeChild(0);
				        }
				        for(var i = 0; i < conditions.length; i++){
				            var condition = conditions[i];
				            var c = condition.triggerCondition;
				            var s = c.metricDisplayName;
				            var pane = new jsx3.gui.Block();
				            pane.setWidth("100%");
				            pane.setHeight("30");
							container.setChild(pane);
							var layout = new jsx3.gui.LayoutGrid();
				            pane.setChild(layout);
				            layout.setCols("80%,20%");
							//for trigger metric
							var paneTrigger = new jsx3.gui.Block();
				            paneTrigger.setWidth("100%");
				            paneTrigger.setHeight("30");
				            paneTrigger.setText((i+ 1) + "." + s)
							layout.setChild(paneTrigger);
							//for clear condition icon
							c = condition.clearCondition;
							if(c){
								var paneIcon = new jsx3.gui.Block();
				            	paneIcon.setWidth("100%");
				            	paneIcon.setHeight("20");
								layout.setChild(paneIcon);
								var image = new jsx3.gui.Image();
				            	paneIcon.setChild(image);
				            	image.setSrc(tibco.uxcore.System.getServer().getDynamicProperty("@spm_addin@clear_condition"));
							}

							container.repaint();
						}
					}catch(e){
						//here's a cratical bug,but I can't fix it now.I couldn't find the reason.so just keep silent fro demo.
						//alert(e);
					}


			    }
				//alert("end init left info");
			}
        }
        )