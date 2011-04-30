<html>
    <head>
        <title>Time2Tweet :: Schedule your tweets</title>
        <link rel="stylesheet" type=text/css href="/css/main.css"/>
    </head>
    <body>
        <div id = "header">
            <div class = "left-pane" style ="margin-left : 2em; width : auto; background:url('/images/logo.png') no-repeat">
                <img class = "logo-text" src = "/images/twitter-logo.png" alt = "TweetLater">
                </img>
            </div>
            <div class = "clear"></div>
        </div>
        <div style='height:18px;padding:4px 34px;color:#36c;font-weight:bold;background:#E5ECF9;'>Admin</div>
        <div class = "main-area">
            <div class = "nav">
                <ul>
                    <li>
                        <a href = "#" class='selected'>User Management</a>
                    </li>
                     <li>
                        <a href = "#">Parameters Setting</a>
                    </li>
                </ul>
            </div>
            <div class = "admin-content">
                <div id='users' class="main">
                   <#include 'user.ftl'/>
                </div>
                <div id='setting' style='display:none'>
                   <#include 'setting.ftl'/>
               </div>
            </div>
             <div id = "footer"></div>
        </div>
        <iframe id = "resultFrame" name = "resultFrame" style ="width : 100%; display:none">
        </iframe>
    </body>
    <script src = "http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js" type = "text/javascript">
    </script>
    <script src = "/js/date.js" type = "text/javascript">
    </script>
    <script src="/js/TwitteyBot.js" type="text/javascript">
    </script>
</html>
