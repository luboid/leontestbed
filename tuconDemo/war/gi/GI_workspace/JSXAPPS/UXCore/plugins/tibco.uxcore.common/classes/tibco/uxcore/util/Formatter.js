/**
* Class to provide special formatting utility functions
*/
jsx3.lang.Class.defineClass("tibco.uxcore.util.Formatter", null, null, function(formatter) {

    /**
    * Number of milliseconds in a second
    * @private
    */
    formatter.SECOND = 1000;

    /**
     * Number of milliseconds in a minute
     * @private
     */
    formatter.MINUTE = formatter.SECOND * 60;

    /**
     * Number of milliseconds in an hour
     * @private
     */
    formatter.HOUR = formatter.MINUTE * 60;

    /**
     * Number of milliseconds in a day
     * @private
     */
    formatter.DAY = formatter.HOUR * 24;

    /**
     * String to replace with the number of milliseconds in the elapsed time
     * @private
     */
    formatter.MILLISECONDS_TAG = "<MILLISECONDS>";

    /**
     * String to replace with the number of seconds in the elapsed time
     * @private
     */
    formatter.SECONDS_TAG = "<SECONDS>";

    /**
     * String to replace with the number of minutes in the elapsed time
     * @private
     */
    formatter.MINUTES_TAG = "<MINUTES>";

    /**
     * String to replace with the number of hours in the elapsed time
     * @private
     */
    formatter.HOURS_TAG = "<HOURS>";

    /**
     * String to replace with the number of days in the elapsed time
     * @private
     */
    formatter.DAYS_TAG = "<DAYS>";

    /**
     * Function that formats the given number of milliseconds into and elapsed time of a format of your choice.
     *
     * This function parses the string <code>strFormat</code> and replaces the following with real numeric values:
     * <code><ul><li>&lt;DAYS&gt; - the number of days in the elapsed time</li>
     * <li>&lt;HOURS&gt; - the number of hours in the elapsed time</li>
     * <li>&lt;MINUTES&gt; - the number of minutes in the elapsed time</li>
     * <li>&lt;SECONDS&gt; - the number of seconds in the elapsed time</li>
     * <li>&lt;MILLISECONDS&gt; - the number of milliseconds in the elapsed time</li></ul></code>
     *
     * This formatting is relatively intelligent.  If <code>&lt;HOURS&gt;</code> is not specified, the value is converted
     * the next-smallest value that is found in the format string, and added to its value.
     *
     * @param strFormat {String} the formatting string
     * @param intMillis {int} length of time in milliseconds (as given by the difference between 2 calls to the
     *                        <code>getTime()</code> function of 2 <code>Date</code> objects
     * @return {String} the formatted value of the elapsed time
     */
    formatter.formatElapsedTime = function(strFormat, intMillis) {
        var match = "gi";
        var format = strFormat;
        var millis = intMillis;
        if(format.search(new RegExp(this.DAYS_TAG, "i")) != -1) {
            format = format.replace(new RegExp(this.DAYS_TAG, match), Math.floor(millis / this.DAY))
            millis %= this.DAY;
        }
        if(format.search(new RegExp(this.HOURS_TAG, "i")) != -1) {
            format = format.replace(new RegExp(this.HOURS_TAG, match), this.parseAndPadInt(Math.floor(millis / this.HOUR), 2))
            millis %= this.HOUR;
        }
        if(format.search(new RegExp(this.MINUTES_TAG, "i")) != -1) {
            format = format.replace(new RegExp(this.MINUTES_TAG, match), this.parseAndPadInt(Math.floor(millis / this.MINUTE), 2))
            millis %= this.MINUTE;
        }
        if(format.search(new RegExp(this.SECONDS_TAG, "i")) != -1) {
            format = format.replace(new RegExp(this.SECONDS_TAG, match), this.parseAndPadInt(Math.floor(millis / this.SECOND), 2))
            millis %= this.SECOND;
        }
        format = format.replace(new RegExp(this.MILLISECONDS_TAG, match), this.parseAndPadInt(millis, 3));
        return format;
    }

    /**
    * Utility function to parse an integer value from an object, and pad it with zeros as necessary to make it a certain
    * number of digits when formatted into a string.
    *
    * @param val {Object} the value of the integer (can be any object that will return a valid integer when passed into
    *                     a call to <code>parseInt()</code>
    * @param size {int} the minimum number of digits in the formatted string representation of the int. Default value is '2'.
    *
    * @return {String} string representation of the int value padded with zeros as necessary to match the requested format.
    */
    formatter.parseAndPadInt = function(val, size) {
        if(!size) {
            size = 2;
        }
        var ret = "" + parseInt(val);
        var diff = size - ret.length;
        if(diff > 0) {
            for(var i = 0; i < diff; i++) {
                ret = "0" + ret;
            }
        }
        return ret;
    }

});