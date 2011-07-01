<html>
    <head>
        <title>Change password</title>
        <link rel="stylesheet" type=text/css href="/css/main.css"/>
    </head>
    <body>
    <#include "logo.ftl"/>
    <div>
        <form action="/user?action=changePwd" method="post">
        	<input type="hidden" name="userId" value="${userId?c}" />
        	<table>
           <tr>    
               <td colspan="2"><span style='background-color:#97F098;'>${errorMessage!""}</span></td>
           </tr>        	
           <tr>    
               <td><span>Old Password</span></td>
               <td><input type='password' name='old_password' value='${password!""}'/></td>
           </tr>           
           <tr>    
               <td><span>New Password</span></td>
               <td><input type='password' name='sign_up_password' value='${password!""}'/></td>
           </tr>
           <tr>    
               <td><span>Repeat New Password</span></td>
               <td><input type='password' name='repeat_sign_up_password' value=''/></td>
           </tr>
         </table>           
           <input type='button' name="a" value="Submit" onclick="javascript: onSubmit();"/>
           <input type='button' name="b" value="Close" onclick="javascript: window.close();"/>
        </form>
    </div>
    </body>
    
<script>
    function onSubmit() {
    		if( document.forms[0].sign_up_password.value!=document.forms[0].repeat_sign_up_password.value) {
    			alert('password not match!');
    			return false;
    		}else {
    			document.forms[0].submit();
    		}
    }
</script>