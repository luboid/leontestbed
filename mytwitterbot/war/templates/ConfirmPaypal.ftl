<#if (TheTxn??) >
Your transaction [id=${TheTxn.keyId?c}] [total amount=${TheTxn.amount}] had been paid. Once payment is confirmed, your tweets will be ready to go.
<#else>
The transaction being confirmed is not found. Some error happens.
</#if>
<br/>
<input type="button" onClick="javascript: window.close();" value="Close">