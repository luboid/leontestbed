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
		  <th class='header'>Twitter Account</td>
		  <th class='header'>User Account</th>
		  <th class='header'>No. of Txns Paid</th>
		  <th class='header'>No. of Txns UnPaid</th>
		  <th class='header'>No. of tweets Paid</th>
		  <th class='header'>Total Amount Paid</th>
      </tr>  
      <#list usList as us>
      <tr>
        <!--td class='col-checkbox' align='center'><input type='checkbox'></td-->
        <td align='center'>${us.twitterName}</td>
        <td align='center'>${us.user}</td>
        <td align='center'>${us.noOfPaidTxn}</td>
        <td align='center'>${us.noOfUnpaidTxn}</td>
        <td align='center'>${us.noOfTweetsPaid}</td>
        <td align='center'>${us.totalAmountPaid}</td>
      </tr>
      </#list>
      
      <!--tr>
        <td class='col-checkbox' align='center'><input type='checkbox'></td>
        <td align='center'>zouljs1@gmail.com</td>
        <td align='center'>zouljisi1</td>
        <td align='center'>10</td>
        <td align='center' class='action'>
            <a href='#'>Suspend</a>|<a href='#'>Delete</a>
        </td>
      </tr-->
   </table>
   </div>
</div>

<script>
    //top.AppAdmin.onUserLoad(document.getElementById("results").innerHTML, <#if (TheTxn??)>${TheTxn.keyId?c}<#else>-1</#if>);
</script>