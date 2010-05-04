jsx3.require("jsx3.util.Logger");

/**
* Logging Utility Class
*/
jsx3.lang.Class.defineClass("tibco.uxcore.util.Log",null, null,
        function(log) {

            log.addErrorMessage = function(objEvent) {
                // ToDo for ramin
            }

            /**
            * @private
            */
            log.ServLOGGER = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.ServiceCalls");
            // Set the level of this Logger.
            log.ServLOGGER.setLevel(jsx3.util.Logger.INFO);

            /**
             * General system Logger
             */
            log.SYSTEM = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log");

            /**
             * Common logger for UX Core UI
             */
            log.COMMON = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.Common");

            /**
             * Logger for Resources (Enterprise Assets) area of UX Core UI
             */
            log.RESOURCES = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.Resources");

            /**
             * Logger for Environments area of UX Core UI
             */
            log.ENVIRONMENT = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.Environment");

            /**
             * Logger for Service class and Service calls
             */
            log.SERVICE = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.Service");

            /**
             * Logger for Deployment area of UX Core UI
             */
            log.DEPLOYMENT = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.Deployment");

            /**
             * Logger for User Management area of UX Core UI
             */
            log.USERMGT = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.UserMgt");

            /**
             * Logger for Benchmarking in UX Core UI
             */
            log.BENCHMARK = jsx3.util.Logger.getLogger("tibco.uxcore.util.Log.Benchmark");



        }
        )