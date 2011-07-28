<html>
    <head>
        <title>Time2Tweet :: Schedule your tweets</title>
        <link rel="stylesheet" type=text/css href="/css/main.css"/>
    </head>
    <body>
        <div id = "header" class="header">
            <div style="float:left;width:30%;">
                <img class = "logo-text" src = "/images/twitter-logo.png" alt = "TweetLater">
                </img>
            </div>
            <div style="float:left;width:40%;padding-top:20px;text-align:center">
             <span id = "message">
                    </span>
            </div>
            <div class = "right-pane" style ="width :30%;text-align:right; padding:25px 0 0 0">
                <div class = "single-line-list">
                    <span>
                        <strong>${username!""}</strong>
                        | 
                    </span>
                    <#if (banned)> <span style="color:green;"> You are Banned.</span>
                    <#elseif (suspended)> <span style="color:green;"> You are Suspended.</span></#if>
                    <span>
                        <a href = "/help.html">Help</a>
                        | 
                    </span>
                    <#if ("true"==isRegUser)>
                    <span>
                    		<#if (banned)>
                        <a href = "#" >Change Password</a>
                        <#else>
                        <a href = "#" onclick="javascript: window.open('/user?action=showChangePwd', '_blank', 'width=400,height=300');">Change Password</a>
                        </#if>
                        | 
                    </span>
                    </#if>
                    <span>
                        <a href = "${logoutUrl}">Sign Out</a>
                    </span>                    
                </div>
             
            </div>
            <div class = "clear">
            </div>
        </div>
        <div id = "content">
            <div id = "addTwitterAccount">
                <div class="wrapper">
            
                <div style="padding-left:180px;position:relative;">
                    <div id = "twitterScreenName" class="screen_name">
                       Not Loaded
                    </div>
                    <ul style="height:100%;padding:6px 0;list-style-type: none;">
                        <li style="float:left"><a href = "<#if (banned)>#<#else>/pages/manageTwitterAccount?action=Add</#if>">New Twitter Account</a></li>
                        <li style="float:left"><span class="separator"></span></li>
                        <li style="float:left"><a href = "#deleteAccountForm" id = "deleteAccountButton">Delete Twitter Account </a></li>
                        <li style="float:left"> <span class="separator"></span></li>
                        <li style="float:left"><a href = "#" id = "showPaidTweetsLink" class="selected-menu-bar" >Scheduled Messages </a></li>
                        <li style="float:left"> <span class="separator"></span></li>
                        <a href = "#" id = "showTxnsLink" class="unselected-menu-bar" >Unpaid Transactions </a>
                    </ul>
                </div>
                <div class = "right-pane" style ="text-align:center">
                   
                </div>
                <div class = "clear">
                </div>
                </div>
            </div>
            <div class="wrapper">
            <div class = "left">
                <div style="border-bottom:2px groove #fff;padding:0px 0px 15px 10px;">
                <div class="menu_title">Twitter Account List</div>
                <ul id = "twitterAccountList">
                    <#list accounts as item>
                    <li>
                        <a href = "/pages/status?action=show&screenName=${item.twitterScreenName}">${item.twitterScreenName}</a>
                    </li>
                    </#list>
                </ul>
                </div>
                <div id = "scheduler" style="border-bottom:2px groove #fff;padding:0px 0px 15px 10px;">
                    <div class="menu_title">
                        Tweet Scheduler
                    </div>
                    <form>
                        Start at&nbsp;
                        <span id = "scheduleStart">
                            <a href= "#" display : none></a>
                            <input type = "text" style ="width : 10em" value = "today at 10:10"/>
                        </span>
                      
                        <input checked = "true" type = "radio" name = "betweenOptions" value = "scheduleInterval"/>

                        send tweets in intervals of 
                        <input type = "text" id = "scheduleInterval" style ="margin-left:18px;width:140px;" value = "40 minutes"/>
  
                        <input type = "radio" name = "betweenOptions" value = "scheduleSpan"/>

                        <span>send all tweets within a time limit of </span>
       
                        <input id = "scheduleSpan" style ="margin-left:18px;width:140px;" type = "text" value = "2040 minutes"/>
             
                        <center>
                            <input <#if (banned)>disabled="true"</#if> type="Submit" value = "Schedule Tweets" />
                        </center>
                    </form>
                </div>
                <div id = "shrinker" style="border-bottom:2px groove #fff;padding:0px 0px 15px 10px;">
                    <div class="menu_title">
                        Tweet Shrinker
                    </div>
                    For tweets that are greater than 140 characters, 
                    <center>
                        <input <#if (banned)>disabled="true"</#if> type = "button" value = "Remove Vowels" id = "shrinker-removeVowels" style ="width : 80%"/>
                        <input <#if (banned)>disabled="true"</#if> type = "button" value = "Break into more Tweets" id = "shrinker-wrapTweet" style ="width:80%"/>
                    </center>
                </div>
            </div>
            <div class = "right-pane" style="float:none;padding-left:180px;">
                <div id = "twitterAccount" class="mac-border">
                    <div class = "actionBar">
                        <div>
                            <ul id = "actionList">
                            	<ul>
	                                <li>
	                                    Upload Tweets from a file on
	                                </li>
	                                <li>
	                                    <a href = "#fetchFileForm" id="actionFetchFile">the internet</a>
	                                </li>
	                                <li>
	                                    &nbsp;|&nbsp;<a href = "#uploadFileForm" id="actionUploadFile"> your computer</a>
	                                </li>
									<li>
											&nbsp;&nbsp;<input <#if (banned)>disabled="true"</#if> type = "button" id = "OneTweet" value = "Schedule One Tweet" class = "button"/>
									</li>
						       </ul>

                            </ul>
                            <div id = "fetchFileForm" style="display:none">
                                <form target = "resultFrame" action = "#" method = "POST" name = "uploadFile">
                                    <input type = "text" name = "source_" class = "button" value = "http://localhost:7777/china.xml"/>
                                    &nbsp;
                                    <input <#if (banned)>disabled="true"</#if> type = "submit" value = "Upload" class = "button"/>
                                    &nbsp;
                                    <input type = "reset" value = "Cancel" class = "button"/>
                                </form>
                            </div>
                            <div id = "uploadFileForm" style="display:none">
                                <form target = "resultFrame" action = "#" method = "POST" name = "uploadFile" encType="multipart/form-data">
                                    <input type = "file" name = "fileName" class = "button"/>
                                    &nbsp;
                                    <input type = "checkbox" id = "csvFile"/> CSV File
									&nbsp;
                                    <input <#if (banned)>disabled="true"</#if> type = "submit" value = "Upload" class = "button"/>
                                    &nbsp;
                                    <input type = "reset" value = "Cancel" class = "button"/>
                                </form>
                            </div>
                            <div id = "deleteAccountForm" style="display:none">
                                <form action = "#/pages/manageTwitterAccount" method = "POST" name = "deleteTwitterAccount">
                                    Are you sure you want to unlink this account ?
                                    <input <#if (banned)>disabled="true"</#if> type = "submit" value = "Yes" class = "button"/>
                                    &nbsp;
                                    <input type = "reset" value = "No" class = "button"/>
                                </form>
                            </div>
                        </div>
                        <div class = "clear">
                        </div>
                    </div>
                    <div id = "twitterContent" class = "">
                        <form id="updateFormId" name = "updateForm" method = "POST" action = "/pages/status" target = "resultFrame">
                            <input name = "screenName" type = "hidden" id = "screenName"/>
                            <div id = "toolbar">
                                <div class = "left-pane">
                                    Select&nbsp;
                                    <div class = "single-line-list" style ="text-align:left">
                                        <span>
                                            <a href = "#" id = "selectAllStatus">All</a>, 
                                        </span>
                                        <span>
                                            <a href = "#" id = "selectNoneStatus">None</a>
                                        </span>
                                    </div>
                                </div>
                                <div class = "right-pane" style ="text-align : right">
                                		<div id = "txnButtons">
                                				<!-- NOT in use...
                                				<input type = "Submit" name = "action" value = "PayTxn" class = "button"/>
                                				&nbsp;
                                				<input type = "Submit" name = "action" value = "CancelTxn" class = "button"/>
                                				-->
                                		</div>
                                    <div id = "otherButtons">
                                        <input <#if (banned)>disabled="true"</#if> type = "Submit" name = "action" value = "Update" class = "button"/>
                                        &nbsp;
                                        <input <#if (banned)>disabled="true"</#if> type = "submit" name = "action" value = "Delete" class = "button"/>
                                    </div>
                                    <div id = "uploadButtons">
                                        <input <#if (banned)>disabled="true"</#if> id = "AddTransaction" type = "Submit" name = "action" value = "Add" class = "button">
                                        &nbsp;
                                        <input type = "reset" value = "Cancel" class = "button"/>
                                    </div>
                                </div>
                                <div class = "clear">
                                </div>
                            </div>
                            <div id = "twitterStatus">
                            </div>
                        </form>
                    </div>
										<div id = "transactionContent" class = "content-window">
                        <form name = "transactionForm" method = "POST" action = "/pages/transaction" target = "resultFrame">
                            <input name = "screenName" type = "hidden" id = "screenNameTxn"/>
                            <div id = "txntoolbar">
                                <div class = "left-pane">
                                    Select&nbsp;
                                    <div class = "single-line-list" style ="text-align:left">
                                        <span>
                                            <a href = "#" id = "selectAllTxn">All</a>, 
                                        </span>
                                        <span>
                                            <a href = "#" id = "selectNoneTxn">None</a>
                                        </span>
                                    </div>
                                </div>
                                <div class = "right-pane" style ="text-align : right">
                                    <div id = "transactionButtons">
                                    		<input <#if (banned)>disabled="true"</#if> type = "Submit" name="action" value = "MergeTxn" class = "button"/>
                                        <input <#if (banned)>disabled="true"</#if> type = "Submit" name="action" value = "CancelTxn" class = "button"/>
                                    </div>
                                </div>
                                <div class = "clear">
                                </div>
                            </div>
                            <div id = "transactionDetail">
                            </div>
                        </form>
                    </div>                        
                    <div id = "showLoading" style ="display:none" class ="content-window">
                        <div style ="text-align:center; padding : 3em">
                            <span style ="font-weight : bold; font-size : 3em; color : white; text-shadow : 0px 0px 20px  #000000">
                                Loading
                            </span>
                            <br/>
                            <br/>
                            <img src = "/images/loading.gif"/>
                        </div>
                    </div>
                    <div id = "noTweets" class = "content-window">
                        To start scheduling tweets, please upload a file. Use the links above.
                        <br/>
                        <sub>
                            Every line in the file is a tweet.
                        </sub>
                        <br/>
                        <br/>
                        Or
                        <br/>
                        <a style ="display : block; font-size : 1.3em; padding : 0.3em; background-color : #EEEEEE; -moz-border-radius : 5px" href = "#" id = "sampleTweets">Show me some sample tweets.</a>
                    </div>
                    
                    <div id = "noTxns" class = "content-window">
                        No transaction yet. To start a transaction, please upload a file. Use the links above.
												<br/>
                        <br/><br/><br/><br/><br/>
                    </div>                    
                    
                </div>
            </div>
            <div class = "clear">
            </div>
            </div>
        </div>
        <div id = "footer">
        </div>
        <iframe id = "resultFrame" name = "resultFrame" style ="width : 100%; display:none "> <!--  -->
        </iframe>
    </body>
    <script src = "/js/jquery.min.js" type = "text/javascript">
    </script>
    <script src = "/js/date.js" type = "text/javascript">
    </script>
    <script src="/js/TwitteyBot.js" type="text/javascript">
    </script>
</html>
