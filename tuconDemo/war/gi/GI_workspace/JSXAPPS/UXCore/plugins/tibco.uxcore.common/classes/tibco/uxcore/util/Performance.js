/**
 * Class for Performance/Benchmark Logging.  Benchmarking logging will only occur in the loggers configured to display DEBUG level messages.
 */
jsx3.lang.Class.defineClass("tibco.uxcore.util.Performance", null, null,
        function(perf) {

            /**
             * {boolean} Flag indicating if indentation should be used for successive logging calls (indicating baenchmarks begun
             * that are nested inside of other benchmarks).
             * @private
             */
            perf.indent = true;

            /**
             * {Array} Associative array of bending benchmarks (benchmarks begun, that haven't been ended), indexed by id.
             * @private
             */
            perf.pendingBenchmarks = new Array(0);

            /**
             * {int} The next id to assign to a benchmark when it is begun
             */
            perf.nextId = 1;

            /**
            * Begin benchmarking of a section of code
            *
            * @param text {String} brief text string identifying what is being benchmarked (printed out in each line in the benchmarking log)
            *
            * @return {String} the id of this benchmark, to be used when ending this benchmark
            */
            perf.beginBenchmark = function(text) {
                if (perf.isLoggable) {
                    var bm = new Object();
                    bm.startTime = (new Date()).getTime();
                    bm.text = text;
                    bm.id = perf.nextId++;
                    bm.count = perf.pendingBenchmarks.length;
                    perf.pendingBenchmarks.push(bm);
                    return bm.id;
                }
            };

            /**
             * End benchmarking of a section of code
             *
             * @param id {String} the id of this benchmark, as returned from the <code>beginBenchmark</code> function
             *                    when this benchmark was begun
             */
            perf.endBenchmark = function(id) {
                if (perf.isLoggable) {
                    var endTime = (new Date()).getTime();
                    var item = null;
                    var count = perf.pendingBenchmarks.length;
                    for (var i = 0; i < count; i++) {
                        var bm = perf.pendingBenchmarks[i];
                        if (bm.id == id) {
                            item = bm;
                            perf.pendingBenchmarks.splice(i, 1);
                            break;
                        }
                    }
                    if (item) {
                        var prefix = "";
                        if (this.indent) {
                            for (var i = 0; i < bm.count; i++) {
                                prefix += "  ";
                            }
                        }
                        tibco.uxcore.util.Log.BENCHMARK.debug(prefix + "BENCHMARK (" + bm.startTime + " - " + endTime + "): " + bm.text + ": elapsed time " + (endTime - bm.startTime) + "ms (" + bm.count + " others at start, " + (count - 1) + " others at end)");
                    }
                    else {
                        tibco.uxcore.util.Log.BENCHMARK.debug("ERROR: Could not locate performance benchmark item with id: " + id);
                    }
                }
            };

            /**
            * Determines if logging should be done for benchmarking,depending on the log level of the Benchmarking logger.
            * @private
            */
            perf.initializeTrace = function() {
                perf.isLoggable = (tibco.uxcore.util.Log.BENCHMARK.isLoggable(jsx3.util.Logger.DEBUG)) ? true : false;
            }
            perf.initializeTrace();
        }
        );
