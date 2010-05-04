/**
 * PendingOperationsHandler - This class handles the display of the number of pending operations (service calls with a
 * request sent that are still awaiting a response.  This is automatically done for you if you are making your service
 * calls using the ActiveMatrix addin's <code>tibco.uxcore.net.Service</code> object for your calls (instantiable via the
 * <code>tibco.uxcore.System.loadService()</code> function).
 *
 * When there are no pending operations, the indicator labels and image will be hidden from view via the css <code>display: none</code>,
 * and shown again when there are pending operations.
 *o
 * @see tibco.uxcore.net.Service
 * @see tibco.uxcore.System
 */
jsx3.lang.Class.defineClass('tibco.uxcore.util.PendingOperationsHandler',
        jsx3.lang.Object,
        null,
        function(pendingOperationsHandler) {

            /**
            * {jsx3.gui.Block} gui object that will contain the text indicating the number of pending operations
            * @private
            */
            pendingOperationsHandler.pendingOperationsLabel = null;

            /**
             * {jsx3.gui.Block} gui object that contains the prefix label string to the number of pending operations
             * @private
             */
            pendingOperationsHandler.pendingOperationsLabelStart = null;

            /**
             * {jsx3.gui.Image} gui object that dispolays the image indicating that there are pending operations ('working' image)
             * @private
             */
            pendingOperationsHandler.pendingOperationsImage = null;

            /**
             * Field containing the next id to assign to an operation
             * @private
             */
            pendingOperationsHandler.nextId = 1;

            /**
             * Associative array of pending operation display strings (shown in the tooltip), indexed by the id
             * @private
             */
            pendingOperationsHandler.operations = new Array(0);

            /**
             * Adds an operation to the list of pending operations
             *
             * @param operationText {String} the name of the operation, or some other display string to show in the tooltip
             *                               list of pending operations.
             *
             * @return {int} the id assigned to this operation.  This si the id that should be passed into the <code>removeOperation</code>
             *               function when removing this operation fromthe list of pending operations
             */
            pendingOperationsHandler.addOperation = function(operationText) {
                var op = new Object();
                op.id = pendingOperationsHandler.nextId++;
                op.text = operationText;
                pendingOperationsHandler.operations.push(op);
                if(pendingOperationsHandler.operations.length == 1) {
                    tibco.uxcore.System.getServer().getRootBlock().setCursor("progress", true);
                }
                if (pendingOperationsHandler.pendingOperationsLabel == null) {
                    pendingOperationsHandler.pendingOperationsLabel = tibco.uxcore.System.getServer().getJSXByName("pendingOperationsLabel");
                }
                if(pendingOperationsHandler.pendingOperationsLabelStart == null) {
                    pendingOperationsHandler.pendingOperationsLabelStart = tibco.uxcore.System.getServer().getJSXByName("pendingOperationsLabelStart");
                }
                if (pendingOperationsHandler.pendingOperationsImage == null) {
                    pendingOperationsHandler.pendingOperationsImage = tibco.uxcore.System.getServer().getJSXByName("pendingOperationsImage");
                }
                if(pendingOperationsHandler.pendingOperationsLabel) {
                    pendingOperationsHandler.pendingOperationsLabel.setText("(" + pendingOperationsHandler.operations.length + ")",true);
                    pendingOperationsHandler.pendingOperationsLabel.setVisibility(jsx3.gui.Block.VISIBILITYVISIBLE, true);
                }
                if(pendingOperationsHandler.pendingOperationsLabelStart) {
                    pendingOperationsHandler.pendingOperationsLabelStart.setVisibility(jsx3.gui.Block.VISIBILITYVISIBLE, true);
                }
                if(pendingOperationsHandler.pendingOperationsImage) {
                    pendingOperationsHandler.pendingOperationsImage.setVisibility(jsx3.gui.Block.VISIBILITYVISIBLE,true);
                }
                return op.id;
            }

            /**
             * The function to remove a particular operation fromthe list of pending operations, once its response has
             * come back.
             *
             * @param operationId {int} the id of the operation to remove from the list. This must match teh id assinged
             *                          to this operation, and returned from the <code>addOperation</code> function.
             */
            pendingOperationsHandler.removeOperation = function(operationId) {
                for (var i = 0; i < pendingOperationsHandler.operations.length; i++) {
                    var op = pendingOperationsHandler.operations[i];
                    if (op.id == operationId) {
                        pendingOperationsHandler.operations.splice(i, 1);
                        break;
                    }
                }
                var len = pendingOperationsHandler.operations.length;
                if (len == 0) {
                    tibco.uxcore.System.getServer().getRootBlock().setCursor("default", true);
                    if(pendingOperationsHandler.pendingOperationsLabel) {
                        pendingOperationsHandler.pendingOperationsLabel.setText("",true);
                        pendingOperationsHandler.pendingOperationsLabel.setVisibility(jsx3.gui.Block.VISIBILITYHIDDEN, true);
                    }
                    if(pendingOperationsHandler.pendingOperationsLabelStart) {
                        pendingOperationsHandler.pendingOperationsLabelStart.setVisibility(jsx3.gui.Block.VISIBILITYHIDDEN, true);
                    }
                    if(pendingOperationsHandler.pendingOperationsImage) {
                        pendingOperationsHandler.pendingOperationsImage.setVisibility(jsx3.gui.Block.VISIBILITYHIDDEN,true);
                    }
                }
                else {
                    if(pendingOperationsHandler.pendingOperationsLabel) {
                        pendingOperationsHandler.pendingOperationsLabel.setText("(" + len + ")",true);
                    }
                }
            }

            /**
             * This function gets formatted text for use in spyglasses for your components used for display to the user
             * of the pending operations.
             *
             * @return {String} an HTML format string for use in spyglasses
             */
            pendingOperationsHandler.getSpyglassText = function() {
                jsx3.log("Getting text");
                var text = "<div style='width:200px;overflow:expand'><ul style='left:0px; margin-left:0px; padding-left:0px;>";
                for (var i = 0; i < pendingOperationsHandler.operations.length; i++) {
//                                        if(i != 0) {
//                                            text += "<br/>";
//                                        }
                    text += "<li>" + pendingOperationsHandler.operations[i].text + "</li>";
                }
                text += "</ul></div>";
                return text;
            }

        }
        )