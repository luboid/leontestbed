(function(plugIn) {
    /*
    * This class publishes the following model event:
    * - linkbuttonclick - on a clcik on the Link Button. Developer needs to subscribe to this event on the Link button object by calling linkbuttonObj.subscribe("linkbuttonclick" , your call back function)
    *
    */

    //jsx3.require("jsx3.gui.Template");

    jsx3.lang.Class.defineClass("tibco.uxcore.gui.Linkbutton", jsx3.gui.Template.Block, [jsx3.gui.Form,tibco.uxcore.gui.IActionTrigger],
            function(LINKBUTTON, linkbutton) {

                linkbutton.init = function(strName) {
                    this.jsxsuper(strName);
                    jsx3.sleep(function(){this.initAndRegister()},null,this,false);
                };

                linkbutton.onAfterAttach = function() {
                    this.initAndRegister();
                }
                /*
                *  this function decide the Linkbutton component do not contain the child component.
                */
                linkbutton.onSetChild = function(objChild) {
                    jsx3.log("Linkbutton can not contain the child");
                    return false;
                }

                /**
                 * sets the Application hook's name
                 *
                 * @return {null}
                 */
                linkbutton.setAPPhook = function(value) {
                    this.getRenderedBox("hookName").firstChild.nodeValue = value;
                    this.hookname = value;
                }

                /**
                 * get the Application hook's name
                 *
                 * @return {String} the name for this Application hook
                 */
                linkbutton.getAPPhook = function() {
                    return this.getRenderedBox("hookName").firstChild.nodeValue
                }

                /**
                 * Invokes the EXECUTE model event of this button
                 * @param  objEvent {jsx3.gui.Event} ?the browser event that caused the execution of this button. This argument is optional and should only be provided if the execute of this button is the result of a browser event. This parameter will be passed along to the model event as objEVENT.
                 */
                linkbutton.clickHook = function(objEvent, objGUI) {
                    var hookname = this.getAPPhook();
                    this.doEvent("linkbuttonclick", {objEVENT:objEvent,strHOOK:hookname});
                }

                linkbutton.onSetParent = function(objParent) {
                    this.compileTemplate()
                    return true
                }

                linkbutton.compileTemplate = function() {
                    var clazz = eval(this.getClass().getName());
                    if (!clazz.templateXML) {
                        clazz.templateXML = plugIn.getServer().loadInclude(plugIn.getServer().resolveURI("jsxplugin://tibco.uxcore.gui.desktop/templates/linkbutton.xml"), "linkbutton", "xml").toString();
                        jsx3.gui.Template.compile(clazz.templateXML, clazz.jsxclass);
                    }
                }

            }
            );

})(this);
