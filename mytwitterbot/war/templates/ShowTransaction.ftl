<div id = "results">
    <div class = "pagination">
        <a href = "#" class = "pagination-prev">&#171; prev</a>&nbsp;<a href = "#" class = "pagination-next">next  &#187;</a>
    </div>
    <div id="txnLines">
    <!--<#assign totalItems = "0"><#list txnList as item><#assign totalItems = item_index>-->    
    <div class = "tweetLine" >
        <div class = "hidden-fields" style ="display:none">

        </div>
        <div class = "left-pane" style ="width:2%">
            <!--${item_index}-->
            <input type = "checkbox" id = "item_${item_index}" name = "item_${item_index}" class = "item-index" value = "on"/>
        </div>
        <div class = "right-pane" style ="width:97%">
            This transaction contains ${item.numberOfStatus} tweets, total cost $${item.amount} ($${item.unitPrice} each tweet), Status=${item.txnState}
        </div>
        <div class = "clear bottom-line">
            <div class = "left-pane single-line-list" style ="right; padding : 0.5em;">
                <span class = "screenName" id = "screenName_{item_index}">
                    ${item.twitterScreenName}
                </span>
                <span class = "source" id = "source_{item_index}">
                    <span style ="color : #000000">
                        | 
                    </span>
                    {item.source} 
                </span>
                <span>
                    <span style ="color : #000000">
                        | 
                    </span>                
                		<a href="#" onClick="javascript: top.TwitteyBot.showTweetsOfTxn(${item.keyId});">Edit Detail</a>
                </span>                		
                <span>
                    <span style ="color : #000000">
                        | 
                    </span>                                		
                    <a href="/pages/paypal?Payment_Amount=${item.amount}" >Pay with Paypal</a>
                </span>                    
                <span>
                    <span style ="color : #000000">
                        | 
                    </span>                                		
                    <!--a href="/pages/transaction?action=CancelTxn&screenName=${item.twitterScreenName}&txnId=${item.keyId}" >Cancel Txn</a-->
                    <a href="#" onClick="javascript: top.TwitteyBot.cancelTxn(${item.keyId});">Cancel Txn2</a>
                </span>
                
                <span>
                    <span style ="color : #000000">
                        | 
                    </span>
                    <a href="#" onClick="javascript: top.TwitteyBot.payTxn(${item.keyId});">Mark this Txn as Paid (Test only)</a>
                </span>             
            </div>
            <div class = "right-pane" style ="width : 30%; text-align : right; padding : 0.5em; color:#3366CC">
                No. of Tweets
            </div>
            <div class = "clear">
            </div>
        </div>
    </div>
    <!--</#list>-->
    </div> <!-- id="txnLines" -->
    <div class = "pagination">
        <a href = "#" class = "pagination-prev">&#171; prev</a>&nbsp;<a href = "#" class = "pagination-next">next  &#187;</a>
    </div>
    <br/>
    <div>
        <input type = "hidden" name = "totalItems" id = "totalItems" value = "{totalItems}" />
        <input type = "hidden" name = "page-start" id = "page-start" value = "{start}" />
        <input type = "hidden" name = "page-end" id = "page-end" value = "{end}" />
    </div>
    <input id = "responseMessage" title = "${level!""}" style = "display:none" value ='${message!""}'/>
</div>
<script>
    top.TwitteyBot.onTxnLoad(document.getElementById("results").innerHTML);
</script>
