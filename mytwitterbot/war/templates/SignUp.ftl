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
           <div>
               <span>User Name</span>
               <input type='text' name='sign_up_name' value='${userName!""}'/>
               <span style="color:#ff0000">${errorMessage!""}<span>
           </div>
           <div>    
               <span>Password</span>
               <input type='password' name='sign_up_password' value='${password!""}'/>
           </div>
           <input type='submit' name="action" value="${action!"signup"}"/>
        </form>
    </div>
    </body>