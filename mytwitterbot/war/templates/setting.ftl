<div class='setting'>
<form method = "POST" action="/admin?action=add">
<div class='header'>
    Unit-Price Setting
</div>
<div class='content'>
   Dollor per Tweet  <input type='text' value='0'/>
</div>
<div class='header'>
   Twitter Configuration
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