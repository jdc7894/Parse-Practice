
<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>
        <link href="//fonts.googleapis.com/css?family=Lato:100" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="<?php echo asset('css/normalize.css')?>" type="text/css"> 
    </head>
    <body>
        <div class="user-welcome">
        <h2>Hey, {{$name}} </a></h2>
        <p><a href="/showEditPage">Edit your profile here </p>
        <p><a href="/logout">Click here to logout </p>
    </div>
    </body>
</html>
