/**
 * Utility function for validation of form fields
 */
jsx3.lang.Class.defineClass("tibco.uxcore.util.Validation",
        jsx3.lang.Object,
        null,
        function(validation) {
            /**
             * doValidate() -- alerts user if the textbox value does not pass validation
             */
//            validation.doValidate = function(objText, objEvent) {
//                if (objText.doValidate() == 0) {
//                    objText.setBackgroundColor("yellow", true);
//                }
//                else {
//                    objText.setBackgroundColor("#FFFFFF", true);
//                }
//            };

            /**
             * Sets the background color and tooltip for a form field, depoending on whether it has passed validation or not
             *
             * @param objText {jsx3.gui.Painted} the field jsx object that was validated
             * @param passed {boolean} whether or not it passed the validation (optional, default is <code>false</code>)
             * @param message {String} optional string to be shown in the tooltip (only used when <code>passed</code> is <code>false</code>
             */
            validation.actionOnValidation = function(objText, passed, message) {
                if (!passed) {
                    // give a _notifiedColor to target control will be used as the notified color
                    objText.setErrorText((message) ? message : "Invalid Data", true);
                }
                else {
                    // Set the trimmed value for node
                    objText.setErrorText(null, true);
                }
            };

            /**
            * Validates a select box {jsx3.gui.Select} to ensure it is selected.
            *
            * @param objText {jsx3.gui.Select} the select box to validate
            * @param strName {String} the name of the form field being validated, for display to the user
            * @param bAllowEmpty {boolean} if <code>true</code>, indicates that an empty value returned from the select
            *                              box should be considered valid (useful for combo-style select boxes), for a
            *                              field that is considered optional
            *
            * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
            */
            validation.doValidateSelectBox = function(objText, strName, bAllowEmpty) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if (!objText.getValue()) {
                    if(bAllowEmpty) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                    else {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Select Box Empty", strName));
                        return false;
                    }
                }
                else {
                    //if searcehd index higher than 0 then ignore
                    if (validation.trimAll(objText.getValue()).search(new RegExp("- Select -", "ig")) == 0) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Select Box Unselected", strName));
                        return false;
                    }
                    else {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                }
            }

            /**
             * Validates a field to ensure it is not empty (null or an empty string).
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param strName {String} the name of the form field being validated, for display to the user
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidateNotEmpty = function(objText, strValue, strName) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = objText.getValue();
                }
                if (!strValue || (strValue == "")) {
                    validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Field Empty", strName));
                    return false;
                }
                else {
                    if(strValue.length == this.trimAll(strValue).length) {
                        validation.actionOnValidation(objText, true);
                        return true;
                    }
                    else {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation No Leading Or Trailing Spaces", strName, strValue));
                        return false;
                    }
                }
            }

            /**
             * Validates a field to ensure it is not empty (null or an empty string), and contains no whitespace (spaces
             * not allowed in the string value).
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param strName {String} the name of the form field being validated, for display to the user
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidateNotEmptyNoWhSpace = function(objText, strValue, strName) {
                return validation.doValidateNoWhSpace(objText, strValue, strName, true);
            }

            validation.doValidateNoLeadingOrTrailingWhSpace = function(objText, strValue, strName) {
//                jsx3.log(objText + " strValue: '" + strValue + "'");
                if(!strValue) {
                    strValue = objText.getValue();
                }
//                jsx3.log(objText + " Validating '" + strValue + "'")
                if(!strValue || (strValue == "") || (strValue.length == this.trimAll(strValue).length)) {
                    validation.actionOnValidation(objText, true);
                    return true;
                }
                else {
//                    jsx3.log(objText + " trimmed value has leading or trailing whitespace");
                    validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation No Leading Or Trailing Spaces", strName, strValue));
                    return false;
                }
            }

            /**
             * Validates a field to ensure it contains no whitespace (spaces not allowed in the string value).
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param strName {String} the name of the form field being validated, for display to the user
             * @param bDisallowEmpty {boolean} if <code>true</code>, indicates that an empty (null or empty string) value
             *                                 returned from the form field object box should be considered invalid (i.e.,
             *                                 the field is a required field)
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidateNoWhSpace = function(objText, strValue, strName, bDisallowEmpty) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                try {
                if(!strValue) {
                    strValue = objText.getValue();
                }
                if (!strValue || (strValue == "")) {
                    if(!bDisallowEmpty) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                    else {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Field Empty", strName))
                        return false;
                    }
                }
                else {
                    var reg = new RegExp("\\s", "ig");
                    var searchedIndex = strValue.search(reg)
                    //is searcehd index higer than 0 then reject
                    if (searchedIndex != -1) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Whitespace In Id Label", strName, strValue));
                        return false;
                    }
                    else {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                }
                } catch(ex) {
                    jsx3.log("Exception validating '" + objText + "': " + ex);
                    tibco.uxcore.System.logException(ex);
                    validation.actionOnValidation(objText, true)
                    return true;
                }
            }

            validation.doValidateLengthGreaterThan = function(objText, strValue, strName, intSize) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                try {
                    if(!strValue) {
                        strValue = objText.getValue();
                    }
                    if (!strValue || (strValue == "")) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                strName = (strName)? strName : null;
                if (strValue.length <= intSize) {
                    validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Length Greater Than", strName, "" + intSize));
                    return false;
                }
                else {
                    validation.actionOnValidation(objText, true)
                    return true;
                }
                } catch(ex) {
                    jsx3.log("Exception validating '" + objText + "': " + ex);
                    tibco.uxcore.System.logException(ex);
                    validation.actionOnValidation(objText, true)
                    return true;
                }
            }

            validation.doValidateLengthLessThan = function(objText, strValue, strName, intSize) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                try {
                if(!strValue) {
                    strValue = objText.getValue();
                }
                    if (!strValue || (strValue == "")) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                if (strValue.length >= intSize) {
                    validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Length Less Than", strName, "" + intSize));
                    return false;
                }
                else {
                    validation.actionOnValidation(objText, true)
                    return true;
                }
                } catch(ex) {
                    jsx3.log("Exception validating '" + objText + "': " + ex);
                    tibco.uxcore.System.logException(ex);
                    validation.actionOnValidation(objText, true)
                    return true;
                }
            }

            validation.doValidateLengthEquals = function(objText, strValue, strName, intSize) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                try {
                if(!strValue) {
                    strValue = objText.getValue();
                }
                    if (!strValue || (strValue == "")) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                if (strValue.length != intSize) {
                    validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Length Equals", strName, "" + intSize));
                    return false;
                }
                else {
                    validation.actionOnValidation(objText, true)
                    return true;
                }
                } catch(ex) {
                    jsx3.log("Exception validating '" + objText + "': " + ex);
                    tibco.uxcore.System.logException(ex);
                    validation.actionOnValidation(objText, true)
                    return true;
                }
            }

            /**
             * Validates a field for a valid port number
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param bAllowEmpty {boolean} if <code>true</code>, indicates that an empty (null or empty string) value
             *                                 returned from the form field object box should be considered valid (i.e.,
             *                                 the field is an optional field)
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidatePort = function(objText, strValue, strName, bAllowEmpty) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = objText.getValue();
                }
                var valid = validation.doValidateNumbersOnly(objText, strValue, null, bAllowEmpty);
                if(valid) {
                    valid = (strValue > 0) && (strValue < 65536);
                    if(!valid) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Port Number", strName));
                    }
                    else {
                        validation.actionOnValidation(objText, true)
                    }
                }
                return valid;
            }

            /**
             * Validates a field for a value that contains only digit characters
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param strName {String} the name of the form field being validated, for display to the user
             * @param bAllowEmpty {boolean} if <code>true</code>, indicates that an empty (null or empty string) value
             *                                 returned from the form field object box should be considered valid (i.e.,
             *                                 the field is an optional field)
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidateNumbersOnly = function(objText, strValue, strName, bAllowEmpty) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = objText.getValue();
                }
                if (!strValue || (strValue == "")) {
                    if(bAllowEmpty) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                    else {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Field Empty", strName))
                        return false;
                    }
                }
                else {
                    if(strValue.length != this.trimAll(strValue).length) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation No Leading Or Trailing Spaces", strName, strValue));
                        return false;
                    }
                    var regnospace = new RegExp("\\s", "ig")
                    var regnumber = new RegExp("\\D", "ig")
                    if (strValue.search(regnospace) != -1) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Only Digits", strName, strValue))
                        return false;
                    }
                    else if (strValue.search(regnumber) != -1) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Only Digits", strName, strValue))
                        return false;
                    }
                    else {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                }
            }

            /**
             * Validates a field for a value that parses as a valid IP address format (i.e. only digit characters and
             * dot (.) characters, and 3 dots are required
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param strName {String} the name of the form field being validated, for display to the user
             * @param bAllowEmpty {boolean} if <code>true</code>, indicates that an empty (null or empty string) value
             *                                 returned from the form field object box should be considered valid (i.e.,
             *                                 the field is an optional field)
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidateIPAddress = function(objText, strValue, strName, bAllowEmpty) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = objText.getValue();
                }
                if (!strValue || (strValue == "")) {
                    if(bAllowEmpty) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                    else {
                       validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Field Empty", strName))
                       return false;
                    }
                }
                else {
                    if(strValue.length != this.trimAll(strValue).length) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation No Leading Or Trailing Spaces", strName, strValue));
                        return false;
                    }
                    var regnospace = new RegExp("\\s", "ig")
                    var regipbegin = new RegExp("^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", "ig")
                    var regipend = new RegExp("(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$", "ig")
                    var begin = strValue.search(regipbegin);
                    var end = strValue.search(regipend);
                    //var regip = new RegExp("\\b\\d{1,3}[.]\\d{1,3}[.]\\d{1,3}[.]\\d{1,3}\\b", "ig")
                    if (strValue.search(regnospace) != -1) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Whitespace In Number Label", strName, strValue))
                        return false;
                    }
                    else if ((begin == -1) || (end == -1)) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not An IP Label", strName, strValue))
                        return false;
                    }
                    else if (begin != end) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not An IP Label", strName, strValue))
                        return false;
                    }
                    else {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                }
            }

            /**
             * Validates a field for a value that is a valid URL format (i.e. a protocol, followed by '://', followed
             * by a hostname and an optional ":" and port number comprised solely of digit characters
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param strName {String} the name of the form field being validated, for display to the user
             * @param bAllowEmpty {boolean} if <code>true</code>, indicates that an empty (null or empty string) value
             *                                 returned from the form field object box should be considered valid (i.e.,
             *                                 the field is an optional field)
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidateURL = function(objText, strValue, strName, bAllowEmpty) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = objText.getValue();
                }
                if (!strValue || (strValue == "")) {
                    if(bAllowEmpty) {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                    else {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Field Empty", strName))
                        return false;
                    }
                }
                else {
                    if(strValue.length != this.trimAll(strValue).length) {
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation No Leading Or Trailing Spaces", strName, strValue));
                        return false;
                    }
                    var regURL = new RegExp("^(\\w+):\\/\\/([^/:]+)(:\\d+){0,1}$", "i");
                     if (!regURL.test(strValue)) { //if not an url  then reject
                        validation.actionOnValidation(objText, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not An URL Label", strName, strValue))
                        return false;
                    }
                    else {
                        validation.actionOnValidation(objText, true)
                        return true;
                    }
                }
            }

            /**
            * Utility function that trims off any whitespace from the beginning of a string
            *
            * @param sString {String} the string to trim
            *
            * @return {String} the input string, trimmed of any whitespace at the beginning
            */
            validation.leftTrim = function (sString) {
                while (sString.substring(0, 1) == ' ')
                {
                    sString = sString.substring(1, sString.length);
                }
                return sString;
            }

            /**
             * Utility function that trims off any whitespace from the end of a string
             *
             * @param sString {String} the string to trim
             *
             * @return {String} the input string, trimmed of any whitespace at the end
             */
            validation.rightTrim = function(sString) {
                while (sString.substring(sString.length - 1, sString.length) == ' ')
                {
                    sString = sString.substring(0, sString.length - 1);
                }
                return sString;
            }

            /**
             * Utility function that trims off any whitespace from the beginning and/or end of a string
             *
             * @param sString {String} the string to trim
             *
             * @return {String} the input string, trimmed of any whitespace at the beginning and/or end
             */
            validation.trimAll = function(sString) {
                return jsx3.util.strTrim(sString);
            }

            /**
             * Validates a field for a value can be parsed as a valid number, using <code>!isNAN()</code>
             *
             * @param txtNum {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param bAllowEmpty {boolean} if <code>true</code>, indicates that an empty (null or empty string) value
             *                                 returned from the form field object box should be considered valid (i.e.,
             *                                 the field is an optional field)
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.validateNumeric = function(txtNum, strValue, strName, bAllowEmpty, asInt) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = txtNum.getValue();
                }
                if (!strValue || (strValue == "")) {
                    if(bAllowEmpty) {
                        validation.actionOnValidation(txtNum, true);
                        return true;
                    }
                    else {
                        validation.actionOnValidation(txtNum, false, tibco.uxcore.System.getServer().getDynamicProperty("@Validation Field Empty", strName, strValue));
                        return false;
                    }
                }
                else if((strValue.length != this.trimAll(strValue).length) || !validation.isNumeric(strValue, asInt)) {
                    validation.actionOnValidation(txtNum, false, asInt ? tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not An Integer Label", strName, strValue) : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not A Number Label", strName, strValue));
                    return false;
                }
                else {
                    validation.actionOnValidation(txtNum, true);
                    return true;
                }
            };

            /**
             * Validates a field for a value that can be parsed as a valid non-negative number (greater than or equal to 0)
             *
             * @param objText {jsx3.gui.Painted} the form field object to validate
             * @param strValue {String} (optional) the new value of the form field object being validated (for use with events
             *                          that are triggered before the value has been set, such as <code>jsxincchange</code>, which is
             *                          the recommended usage of calls to this function)
             * @param bAllowEmpty {boolean} if <code>true</code>, indicates that an empty (null or empty string) value
             *                                 returned from the form field object box should be considered valid (i.e.,
             *                                 the field is an optional field)
             * @param asFloat {boolean} <code>true</code> indicates that the input should be validated as a floating
             *                          point number (optional, default is <code>false</code>
             *
             * @return {boolean} <code>true</code> if the field passed validation, else <code>false</code>
             */
            validation.doValidatePositiveNumbers = function(objText, strValue, strName, bAllowEmpty, asFloat) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = objText.getValue();
                }
                if (validation.doValidateNoWhSpace(objText, strValue, "", !bAllowEmpty)) {
                    if (((!strValue || (strValue == "")) && bAllowEmpty) || (asFloat ? validation.isPositiveFloatingPoint(strValue) : validation.isPositiveNumeric(strValue))) {
                        validation.actionOnValidation(objText, true);
                        return true;
                    } else {
                        validation.actionOnValidation(objText, false, asFloat ? (tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not A Positive Float Label", strName, strValue)) : (tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not A Positive Number Label", strName, strValue)))
                    }
                }
                return false;
            }

            validation.doValidateNegativeNumbers = function(objText, strValue, strName, bAllowEmpty, asFloat) {
                strName = strName ? strName : tibco.uxcore.System.getServer().getDynamicProperty("@Validation Default Field Name");
                if(!strValue) {
                    strValue = objText.getValue();
                }
                if (validation.doValidateNoWhSpace(objText, strValue, "", !bAllowEmpty)) {
                    if (((!strValue || (strValue == "")) && bAllowEmpty) || (asFloat ? validation.isNegativeFloatingPoint(strValue) : validation.isNegativeNumeric(strValue))) {
                        validation.actionOnValidation(objText, true);
                        return true;
                    } else {
                        validation.actionOnValidation(objText, false, asFloat ? (tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not A Negative Float Label", strName, strValue)) : (tibco.uxcore.System.getServer().getDynamicProperty("@Validation Not A Negative Number Label", strName, strValue)))
                    }
                }
                return false;
            }

            /**
             * Utility function that determines if a string can be parsed as a non-negative (greater than or equal to 0)
             * floating point number.
             *
             * @param sNum {String} the string to test
             *
             * @return {boolean} <code>true</code> if the string can be successfully parsed as a non-negative floating point number
             */
            validation.isPositiveFloatingPoint = function(sNum) {
                return !isNaN(sNum) && sNum >= 0
                        && sNum < 2147483647;
            }

            /**
             * Utility function that determines if a string can be parsed as a non-negative (greater than or equal to 0),
             * non-floating point number.
             *
             * @param sNum {String} the string to test
             *
             * @return {boolean} <code>true</code> if the string can be successfully parsed as a non-negative, non-floating point number
             */
            validation.isPositiveNumeric = function(sNum) {
                return !isNaN(sNum) && sNum >= 0
                            && Math.abs(sNum) == sNum
                            && Math.ceil(sNum) == sNum
                            && sNum < 2147483647;
            }

            /**
             * Utility function that determines if a string can be parsed as a non-negative (greater than or equal to 0)
             * floating point number.
             *
             * @param sNum {String} the string to test
             *
             * @return {boolean} <code>true</code> if the string can be successfully parsed as a non-negative floating point number
             */
            validation.isNegativeFloatingPoint = function(sNum) {
                return !isNaN(sNum) && sNum <= 0
                        && sNum > -2147483647;
            }

            /**
             * Utility function that determines if a string can be parsed as a non-negative (greater than or equal to 0),
             * non-floating point number.
             *
             * @param sNum {String} the string to test
             *
             * @return {boolean} <code>true</code> if the string can be successfully parsed as a non-negative, non-floating point number
             */
            validation.isNegativeNumeric = function(sNum) {
                return !isNaN(sNum) && sNum <= 0
                            && (Math.abs(sNum) == (-1 * sNum))
                            && Math.floor(sNum) == sNum
                            && sNum > -2147483647;
            }

            /**
             * Utility function that determines if a string can be parsed as a non-negative (greater than or equal to 0),
             * non-floating point number.
             *
             * @param sNum {String} the string to test
             *
             * @return {boolean} <code>true</code> if the string can be successfully parsed as a non-negative, non-floating point number
             */
            validation.isInteger = function(sNum) {
                return !isNaN(sNum)
                        && (sNum < 2147483647)
                        && (sNum > -2147483647)
                        && (((Math.abs(sNum) == (-1 * sNum)) && (Math.floor(sNum) == sNum)) || ((Math.abs(sNum) == sNum) && (Math.ceil(sNum) == sNum)));

            }

            /**
             * Utility function that determines if a string can be parsed as a non-negative (greater than or equal to 0)
             * number (floating point or non-floating point).
             *
             * @param sNum {String} the string to test
             *
             * @return {boolean} <code>true</code> if the string can be successfully parsed as a non-negative number
             */
            validation.isNumeric = function(sNum, asInt) {
                return asInt ? this.isInteger(sNum) : !isNaN(sNum);
            };

        }
        );
