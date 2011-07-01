<html>
    <head>
        <title>Time2Tweet :: Schedule your tweets</title>
        <link rel="stylesheet" type=text/css href="/css/main.css"/>
    </head>
    <body>
    <#include "logo.ftl"/>
    <a href="/">Back to Home</a>
    <div>
        <form action="/user" method="post">
        <table>
           <tr>
               <td><span>User Name</span></td>
               <td><input type='text' name='sign_up_name' value='${userName!""}'/></td>
               <td><span style="color:#ff0000">${errorMessage!""}<span></td>
           </tr>
           <tr>    
               <td><span>Password</span></td>
               <td><input type='password' name='sign_up_password' value='${password!""}'/></td>
               <td><a href="#" onclick="javascript: onForgot();">Forgot password?</a>
           </tr>
				</table>           
					<input type="hidden" name="action" value="signin" />
        	<input type='button' name="a" value="signin" onclick="javascript: onSign();" />
        </form>
    </div>
    </body>
    
<script>
	function onForgot() {
		if(document.forms[0].sign_up_name.value=='') {
				alert('Please fill user name.');
				return;
		}
		document.forms[0].action.value="reset";
		document.forms[0].submit();
	};
	
	function onSign() {
		if(document.forms[0].sign_up_name.value=='') {
				alert('Please fill user name.');
				return;
		}		
		document.forms[0].action.value="signin";
		document.forms[0].submit();		
	};
</script>    