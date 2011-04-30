<div class='setting'>
<form method = "POST" action="/admin?action=add">
<!--div class='header'>
    Unit-Price Setting
</div>
<div class='content'>
   Dollor per Tweet  <input type='text' value='0'/>
</div-->

<div class='header'>
   Setting
</div>
<div>

    <table>
        <tr height='30px'>
            <td>
                Unit-Price (Doller per tweet)
            </td>
            <td>
                $<input name = "unitPrice" style="width:360px;" value = '0.01'>
            </td>
        </tr>
        <tr height='30px'>
            <td>
                Owner's paypal account
            </td>
            <td>
                <input name = "accountId" style="width:360px;" value = 'myPaypalAccountId'>
            </td>
        </tr>
	
    </table>
       
</div>
<br/>
<div class='header'>
   Application Configuration (To register this application with Twitter as a consumer)
</div>
<div>

    <table>
        <tr height='30px'>
            <td>
                Consumer Key
            </td>
            <td>
                <input name = "consumer_key" style="width:360px;" value = '${consumer_key!""}'>
            </td>
        </tr>
        <tr height='30px'>
            <td>
                Consumer Secret
            </td>
            <td>
                <input name = "consumer_secret" style="width:360px;" value = '${consumer_secret!""}'>
            </td>
        </tr>
	
    </table>
       
</div>
<div><input type = "submit" value = "Save"></div>
 </form>
</div>