<div id = "results">
    
    <div> 
    	<#if (TheTxn??)>
    			This transaction contains ${TheTxn.numberOfStatus} tweets, total cost $${TheTxn.amount} ($${TheTxn.unitPrice} each)
    			<#if (!banned) >
    			${TheTxn.paypalButton!""}
    			<!--form name = "paypalForm" method = "POST" action = "/pages/paypal" target = "paybox" 
    				onsubmit="window.open('about:blank','paybox','');">
    					<input type = "hidden" name = "Payment_Amount" value = "${TheTxn.amount}" />
    					<input type = "Submit" name = "action" value = "Pay with Paypal" class = "button"/>
    			</form-->

    			<!-- TODO: this is form within another form, not sure if will cause problem??-->
    			<form name = "paypalForm" method = "POST" action = "/pages/transaction" target = "resultFrame" >
    					<input type = "hidden" name = "action" value = "CancelOneTxn" />
    					<input type = "hidden" name = "screenName" value = "${TheTxn.twitterScreenName}" />
    					<input type = "hidden" name = "txnId" value = "${TheTxn.keyId?c}" />
    					<input type = "Submit" name = "xxx" value = "Cancel this Txn (tweets will be deleted)" class = "button"/>
    			</form>    			
    			<form name = "paypalForm" method = "POST" action = "/pages/transaction" target = "resultFrame" >
    					<input type = "hidden" name = "action" value = "show" />
    					<input type = "hidden" name = "screenName" value = "${TheTxn.twitterScreenName}" />
							<input type = "Submit" name = "xxx" value = "Back" class = "button"/>
    			</form>    			
    			</#if>
    			
    	</#if>
    </div> 
    <div class = "pagination">
        <a href = "#" class = "pagination-prev">&#171; prev</a>&nbsp;<a href = "#" class = "pagination-next">next  &#187;</a>
    </div>
    
    <input type = "hidden" name = "txnId" value = "<#if (TheTxn??)>${TheTxn.keyId?c}</#if>" />
    
    <!--<#assign totalItems = "0"><#list statuses as item><#assign totalItems = item_index>-->
    <div class = "tweetLine">
        <div class = "hidden-fields" style ="display:none">

            <input type = "text" class = "actual-time" id = "updatedTime_${item_index}" name = "updatedTime_${item_index}" value = "${item.time!""}"/>
            <input type = "text" class = "tweet-key" id = "key_${item_index}" name = "key_${item_index}" value = "<#if (item.keyId??)>${item.keyId?c}</#if>"/>
            <input type = "text" class = "tweet-source" id = "source_${item_index}" name = "source_${item_index}" value = "${item.source}"/>
        </div>
        <div class = "left-pane" style ="width:2%">
            <!--${item_index}-->
            <input type = "checkbox" id = "item_${item_index}" name = "item_${item_index}" class = "item-index" value = "on"/>
        </div>
        <div class = "right-pane" style ="width:97%">
            <textarea id = "status_${item_index}" name = "status_${item_index}" class = "multiline-text tweetText">${item.status}</textarea>
        </div>
        <div class = "clear bottom-line">
            <div class = "left-pane single-line-list" style ="right; padding : 0.5em;">
                <span class = "screenName" id = "screenName_${item_index}">
                    ${item.twitterScreenName}
                </span>
                <span class = "source" id = "source_${item_index}">
                    <span style ="color : #000000">
                        | 
                    </span>
                    ${item.source} 
                    <span style ="color : #000000">
                        | 
                    </span>
                </span>
                <span>
                    <input title = "click to edit" class = "time" id = "time_${item_index}" />
                </span>
            </div>
            <div class = "right-pane" style ="width : 30%; text-align : right; padding : 0.5em; color:#3366CC">
                <span id = "length_${item_index}" class = "length">
                </span>
                characters
            </div>
            <div class = "clear">
            </div>
        </div>
    </div>
    <!--</#list>-->
    <div class = "pagination">
        <a href = "#" class = "pagination-prev">&#171; prev</a>&nbsp;<a href = "#" class = "pagination-next">next  &#187;</a>
    </div>
    <br/>
    <div>
        <input type = "hidden" name = "totalItems" id = "totalItems" value = "${totalItems}" />
        <input type = "hidden" name = "page-start" id = "page-start" value = "${start}" />
        <input type = "hidden" name = "page-end" id = "page-end" value = "${end}" />
    </div>
    <input id = "responseMessage" title = "${level!""}" style = "display:none" value ='${message!""}'/>
</div>
<script>
    top.TwitteyBot.onStatusLoad(document.getElementById("results").innerHTML, <#if (TheTxn??)>${TheTxn.keyId?c}<#else>-1</#if>);
</script>
