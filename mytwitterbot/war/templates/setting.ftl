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
   Operation Settings
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
    </table>
       
</div>
<br/>

<div class='header'>
   Paypal Settings
</div>
<div>
    <table>
        <tr height='30px'>
            <td>
                Owner's paypal account
            </td>
            <td>
                <input name = "payee_account" style="width:360px;" value = '${payee_account!""}'>
            </td>
        </tr>        
        <tr height='30px'>
            <td>
                Use PayPal TestBed
            </td>
            <td>
                <input name = "usePayPalTestBed" style="width:360px;" value = '${usePayPalTestBed!"true"}'>
            </td>
        </tr>	     
        <tr height='10px'>
        		<td colspan="2" align="left"><span style="color:blue">NOTE: need enable Instant payment Notification in Paypal's Profile Setting</span></td>
        </tr> 
        
    </table>
</div>
<br/>

<div class='header'>
   Application Settings
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
        <tr height='10px'>
        		<td colspan="2" align="right"><span style="color:blue">(To register this application with Twitter as a consumer)</span></td>
        </tr>                                             
        <tr height='30px'>
            <td>
                Google URL Shortener Service URL
            </td>
            <td>
                <input name = "shortener_url" style="width:360px;" value = '${shortener_url!"https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyATndQS1kC3cEMRKPgNL30LJnc2E2VM2MI"}'>
            </td>
        </tr>   
        <tr height='30px'>
            <td>
                Site Administrator Email 
            </td>
            <td>
                <input name = "adminEmail" style="width:360px;" value = '${adminEmail!""}'>
            </td>
        </tr> 
        <tr height='10px'>
        		<td colspan="2" align="right"><span style="color:blue">(used in Password Reset Email. Must be added to owner of this AppEngine application)</span></td>
        </tr>
        <tr height='30px'>
            <td>
                Site Administrator Name 
            </td>
            <td>
                <input name = "adminName" style="width:360px;" value = '${adminName!"Administrator of test.com"}'>
            </td>
        </tr>
        <tr height='10px'>
        		<td colspan="2" align="right"><span style="color:blue">(used as SenderName of the Password Reset Email)</span></td>
        </tr>        
        <tr height='30px'>
            <td>
                Site Name 
            </td>
            <td>
                <input name = "siteName" style="width:360px;" value = '${siteName!"test.com"}'>
            </td>
        </tr>
        <tr height='10px'>
        		<td colspan="2" align="right"><span style="color:blue">(used as Subject of the Password Reset Email)</span></td>
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