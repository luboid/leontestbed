/**
 * A wrapper class for Publish and Subscribe.  Allows the ability to switch out different underlying mechanisms for
 * pub/sub (GI's internal, PageBus, etc.).  Also provides a framework that allows for retained messages (last message
 * for a given subject is cached, and new/late subscribers will get it immediately upon subscribing).  Retension of
 * messages can be toggled off on a per-message basis if needed.
 */
jsx3.Class.defineClass(
        "tibco.uxcore.PubSub",
        null,
        null,
        function (broker) {

            /**
            * A flag indicating whether to use GI's internal pub/sub mechanism, or the alternative (not yet implemented).
            * Will remain private until such time as an alternative mechanism is implemented.
            *
            * @private
            */
            broker.useGI = true;

            /**
            * Internal associative array of cached messages (indexed by subject)
            *
            * @private
            */
            broker._msgList = new  Object();

            /**
            * The number of messages to keep in the cache before pruning the oldest messages.
            *
            * @private
            */
            broker._messageLimit = 100;

            /**
            * The current count of the number of cached messages
            *
            * @private
            */
            broker._messageCount = 0;

            /**
            * Internal field holding the jsx3.util.EventDispatcher object that this class wraps
            *
            * @private
            */
            broker._DISPATCHER = jsx3.util.EventDispatcher.jsxclass.newInnerClass();

            /**
            * Set the number of messages that may be cached at any given time before pruing of the oldest ones begins.
            *
            * @param limit {int} the number of messages to cache
            */
            broker.setMessageLimit = function(limit) {
                broker._messageLimit = limit;
            }

            /**
            * Resets the PubSub mechanism.  Clears all previous messages fromthe cache, and resets the count of stored messages to zero.
            */
            broker.reset = function() {
                delete broker._msgList;
                broker._msgList = new Object();
                broker._messageCount = 0;
            }

            /**
            * Gets the current number of cahed messages.
            *
            * @return {int} the number of cached messages
            */
            broker.getMessageCount = function() {
                return broker._messageCount;
            }

            /**
            * Debugging function to print a list of the subjects for all of the currently cached messages
            */
            broker.printMessageSubjects = function() {
                for (var subject in broker._msgList) {
                    jsx3.log("Message retained with subject: '" + subject + "'");
                }
            }

            /**
             * Subscribes an object or function to a type of event published by this object.
             * @param strEventId {String} – the event type.
             * @param objHandler {Object | String | Function} – if an object, the instance to notify of events (objFunction is required); if a string, the JSX id of the instance to notify of events (objFunction is required), must exist in the same Server; if a function, the function to call to notify of events (objFunction ignored)
             * @param objFunction {Function | String} – if objHandler is a string or object then the function to call on that instance. either a function or a string that is the name of a method of the instance
             * @see jsx3.util.EventDispatcher#subscribe()
             * @throws {jsx3.lang.Exception}
             */
            broker.subscribe = function(strEventId, objHandler, objFunction) {
                try {
                    var msg = broker._msgList[strEventId]
                    if (msg) {
                        msg.isRetained = true;
                        broker.publishToSubscriber(msg, objHandler, objFunction)
                    }
                    if (broker.useGI) {
                        broker._DISPATCHER.subscribe(strEventId, objHandler, objFunction);
                        return null;
                    }
                    else {
                      //  alert(" -1 ")
                        return -1
                    }
                }
                catch(e) {
                    throw new jsx3.Exception("Error in tibco.uxcore.PubSub.subscribe... ", jsx3.NativeError.wrap(e));
                }

            };

            /**
            * Internal function used to publish cached messages to late-subscribers at the time of their subscription.
            *
            * @param objEvent {Object} the message to publish
            * @param objHandler {Object} the object to publish to
            * @param objFunction {Object} the function to call on the handler object
            *
            * @private
            */
            broker.publishToSubscriber = function(objEvent, objHandler, objFunction) {
                try {
                var type1 = typeof(objHandler);
                var type2 = typeof(objFunction);
                if (type1 == "object") {
                    if (type2 == "function") {
                        objFunction.call(objHandler, objEvent);
                    } else if (type2 == "string") {
                        objHandler[objFunction](objEvent);
                    }
                } else if (type1 == "string") {
                    if (type2 == "function") {
                        var objJSX = tibco.uxcore.System.getServer().getJSX(objHandler);
                        if (objJSX)
                            objFunction.call(objJSX, objEvent);
                    } else if (type2 == "string") {
                        var ns = tibco.uxcore.System.getServer().getEnv('namespace');
                        var objJSX = jsx3.GO(target, ns);
                        if (objJSX)
                            objJSX[objFunction](objEvent);
                    }
                } else if (type1 == "function") {
                    objHandler.call(null, objEvent);
                }
                } catch (ex) {
                    tibco.uxcore.System.logException(ex);
                }
            }

            /**
             * Unsubscribe an object or function from an event published by this object.
             * @param strEventId {String} – the event type.
             * @param objHandler {Object | string,function} – the value of objHandler passed to subscribe
             * @see jsx3.util.EventDispatcher#unsubscribe()
             * @throws {jsx3.lang.Exception}
             */
            broker.unsubscribe = function(strEventId, objHandler) {
                try {
                    var myreturn = null
                    if (broker.useGI) {
                        broker._DISPATCHER.unsubscribe(strEventId, objHandler);
                    }
                    else {
                        myreturn =  -1
                    }
                    return myreturn
                }
                catch(e) {
                    throw new jsx3.Exception("Error in tibco.uxcore.PubSub.unsubscribe... ", jsx3.NativeError.wrap(e));
                }
            };

            /**
             * Unsubscribes all subscribed objects to a type of event published by this object. Does not remove any
             * cached message for that subject from the message cache.  Clear it by publishing a message with that
             * subject that has no other fields bound to it.  The subscribers (if written well) should detect that there
             * is no data in the message and treat it accordingly.
             * @param  strEventId {String} – the event type
             * @see jsx3.util.EventDispatcher#unsubscribeAll()
             * @throws {jsx3.lang.Exception}
             */
            broker.unsubscribeAll = function(strEventId) {
                try {
                    var myreturn = null
                    if (broker.useGI) {
                        broker._DISPATCHER.unsubscribeAll(strEventId);
                    }
                    else {
                        myreturn = -1
                    }
                    //delete broker._msgList[strEventId];
                    return myreturn
                }
                catch(e) {
                    throw new jsx3.Exception("Error in tibco.uxcore.PubSub.unsubscribeAll... ", jsx3.NativeError.wrap(e));
                }

            };

            /**
             * Publishes an event to all subscribed objects.
             * @param  objEvent {Object} – the event, should have at least a field 'subject' that is the event id, another common field is 'target' (target will default to this instance)
             * @see jsx3.util.EventDispatcher#publish()
             * @throws {jsx3.lang.Exception}
             */
            broker.publish = function(objEvent) {
                try {
                    objEvent.pubSubTimestamp = (new Date()).getTime();
                    var old = broker._msgList[objEvent.subject];
                    broker._msgList[objEvent.subject] = objEvent;
                    if (!old) {
                        broker._messageCount += 1;
                    }
                    if (broker._messageCount > broker._messageLimit) {
                        setTimeout(broker.purge, 50);
                    }
                    if (broker.useGI) {
                        return  broker._DISPATCHER.publish(objEvent);
                    }
                    else {
                        return -1
                    }
                }
                catch(e) {
                    jsx3.lang.NativeError.wrap(e).printStackTrace();
                    throw new jsx3.Exception("Error in tibco.uxcore.PubSub.publish... ", jsx3.NativeError.wrap(e));
                }
            }

            /**
            * Internal function to purge the oldest message from the cache.  Called anytime a new message has increased
            * the cache size beyond the threshold of allowable cached messages.
            *
            * @private
            */
            broker.purge = function() {
                var id = tibco.uxcore.util.Performance.beginBenchmark("Purge PubSub");
                var subject = null;
                var timestamp = null;
                for (msgSubject in broker._msgList) {
                    if (!timestamp) {
                        subject = msgSubject;
                        timestamp = broker._msgList[msgSubject].pubSubTimestamp;
                    }
                    else {
                        var msgTimestamp = broker._msgList[msgSubject].pubSubTimestamp;
                        if (msgTimestamp < timestamp) {
                            timestamp = msgTimestamp;
                            subject = msgSubject;
                        }
                    }
                }
                delete broker._msgList[subject];
                broker._messageCount -= 1;
                tibco.uxcore.util.Performance.endBenchmark(id);
            }

        });