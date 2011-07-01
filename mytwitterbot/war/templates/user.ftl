<div>
   <!--div class='toolbar'>
       <div style='font-weight:bold;width:30%;float:left;padding-top:4px;'>User List</div>
       <ul style='float:right'>
          <li><input type='button' value='Delete'/></li>
          <li><input type='button' value='Suspend'/></li>
       </ul>
       <div style='clear:both'></div>
   </div-->
   <div class='mytable'>
   <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
		  <!--th><input type='checkbox'></th-->
		  <th class='header'>User</td>
		  <th class='header'>TwitterAcct</th>
		  <th class='header'>Txns Paid</th>
		  <th class='header'>Txns UnPaid</th>
		  <th class='header'>tweets Paid</th>
		  <th class='header'>Total Amount Paid</th>
		  <th class='header'>State</th>
		  <th class='header'>PayType</th>
		  <th class='header'>Action</th>
      </tr>  
      <#list usList as us>
      <tr>
        <!--td class='col-checkbox' align='center'><input type='checkbox'></td-->
        <td align='center'>${us.appUser.userName!""}</td>
        <td align='center'>${us.twitterNames!""}</td>
        <td align='center'>${us.noOfPaidTxn}</td>
        <td align='center'>${us.noOfUnpaidTxn}</td>
        <td align='center'>${us.noOfTweetsPaid}</td>
        <td align='center'>${us.totalAmountPaid}</td>
        <td align='center'>
        <a href='/admin?action=changeState&state=ACTIVE&uid=${us.appUser.keyId?c}' style="<#if (us.appUser.state=="ACTIVE")>font:bold color:blue</#if>">Active</a>
        <a href='/admin?action=changeState&state=SUSPENDED&uid=${us.appUser.keyId?c}' style="<#if (us.appUser.state=="SUSPENDED")>font:bold color:blue</#if>">Suspended</a>
        <a href='/admin?action=changeState&state=BANNED&uid=${us.appUser.keyId?c}' style="<#if (us.appUser.state=="BANNED")>font:bold color:blue</#if>">Banned</a>
        </td>
        <td align='center'>
        <a href='/admin?action=changePayType&type=PAY&uid=${us.appUser.keyId?c}' style="<#if (us.appUser.payType=="PAY")>font:bold color:blue</#if>">Pay</a>
				<a href='/admin?action=changePayType&type=FREE&uid=${us.appUser.keyId?c}' style="<#if (us.appUser.payType=="FREE")>font:bold color:blue</#if>">Free</a>        
        </td>        
        <td align='center' class='action'>
            <a href='/admin?action=deleteUser&uid=${us.appUser.keyId?c}'>Delete</a>
            <!--|<a href='/admin?action=resetUser&uid=${us.appUser.keyId?c}'>Reset Passwd</a>-->
        </td>        
    
      </tr>
      </#list>
   </table>
   </div>
</div>

<script>
    //top.AppAdmin.onUserLoad(document.getElementById("results").innerHTML, <#if (TheTxn??)>${TheTxn.keyId?c}<#else>-1</#if>);
</script>