<form action="<#if (testBed) >https://www.sandbox.paypal.com<#else>https://www.paypal.com</#if>/cgi-bin/webscr" method="post" target="paypal" >
<input type="hidden" name="cmd" value="_xclick">
<input type="hidden" name="business" value="${seller}">
<input type="hidden" name="item_name" value="${goodsName}">
<input type="hidden" name="amount" value="${amount}">
<input type="hidden" name="currency_code" value="${currency}">
<input type="hidden" name="lc" value="${location}">
<input type="hidden" name="return" value="${returnUrl}">
<input type="hidden" name="notify_url" value="${notifyUrl}">
<input type="image" src="https://www.paypal.com/en_US/i/btn/x-click-but23.gif" border="0" name="submit" alt="Make payments with PayPal - it's fast, free and secure!">
</form>