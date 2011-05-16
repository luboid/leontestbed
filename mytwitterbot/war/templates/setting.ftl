<div class='setting'>
<B>${error!""}</B>
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
                $<input name = "unit_price" style="width:360px;" value = '${unit_price!""}'>
            </td>
        </tr>
        <tr height='30px'>
            <td>
                Owner's paypal account
            </td>
            <td>
                <input name = "payee_account" style="width:360px;" value = '${payee_account!""}'>
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
                <input name = "consumer_key" style="width:360px;" value = '${consumer_key!"zPK00Krdr67O1dLJhbtphw"}'>
            </td>
        </tr>
        <tr height='30px'>
            <td>
                Consumer Secret
            </td>
            <td>
                <input name = "consumer_secret" style="width:360px;" value = '${consumer_secret!"DG1OrxZZq8UJtsVPwoth5y8n03mKBmI8EFaXnovTg"}'>
            </td>
        </tr>
        <tr height='30px'>
            <td>
                Is Testing
            </td>
            <td>
                <input name = "is_test" style="width:360px;" value = '${is_test!"false"}'>
            </td>
        </tr>	
    </table>
       
</div>
<div><input type = "submit" value = "Save"></div>
 </form>
</div>