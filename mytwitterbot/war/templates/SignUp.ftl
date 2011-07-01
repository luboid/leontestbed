<html>
    <head>
        <title>Time2Tweet :: Schedule your tweets</title>
        <link rel="stylesheet" type=text/css href="/css/main.css"/>
    </head>
    <body>
    <#include "logo.ftl"/>
    <a href="/">Back to Home</a>
    <div>
        <form action="/user?action=signup" method="post">
        	<table>
           <tr>
               <td><span>User Name</span></td>
               <td><input type='text' name='sign_up_name' value='${userName!""}'/></td>
               <td><span style="color:#ff0000">${errorMessage!""}</span></td>
           </tr>
           <tr>    
               <td><span>Email</span></td>
               <td><input type='text' name='sign_up_email' value='${email!""}'/></td>
               <td><span>NOTE: This need to be a valid email address in order to reset your password.</td>
           </tr>
           <tr>    
               <td><span>Repeat Email</span></td>
               <td><input type='text' name='repeat_sign_up_email' value=''/></td>
           </tr>           
           <tr>    
               <td><span>Password</span></td>
               <td><input type='password' name='sign_up_password' value='${password!""}'/></td>
           </tr>
           <tr>    
               <td><span>Repeat Password</span></td>
               <td><input type='password' name='repeat_sign_up_password' value=''/></td>
           </tr>           
           </table>
           <input type='button' name="a" value="signup" onclick="javascript: onSubmit();"/>
        </form>
    </div>
    </body>
    
<script>
    function onSubmit() {
    
        if(document.forms[0].sign_up_password.value=='') {
    			alert('password should not be empty');
    			return false;
    		}
    		
    		if(document.forms[0].sign_up_password.value!=document.forms[0].repeat_sign_up_password.value) {
    			alert('passwords entered twice are not the same.');
    			return false;
    		}
    		
    		if(document.forms[0].sign_up_email.value=='') {
    			alert('Email should not be empty');
    			return false;
    		}
    		
    		if(document.forms[0].sign_up_email.value!=document.forms[0].repeat_sign_up_email.value) {
    			alert('Emails entered twice are not the same.');
    			return false;
    		}
    		document.forms[0].submit();
    		
    }
</script>