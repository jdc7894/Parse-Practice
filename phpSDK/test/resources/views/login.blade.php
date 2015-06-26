
<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>
        <link rel="stylesheet" href="<?php echo asset('css/bootstrap.min.css')?>" type="text/css"> 
  		<link rel="stylesheet" href="<?php echo asset('css/signin.css')?>" type="text/css"> 
    </head>
    <body>
      <div id="login">
      	<div class="container">
        	<form class="form-signin" role="form" action="/checkCredential" method="get">
          		<h2 class="form-signin-heading"> Please sign in </h2>
	            <input type="text" id = "username" name="username" class="form-control" placeholder="Username" required="" autofocus="">
	            <input type="password" id = "password" name="password" class="form-control" placeholder="Password" required="">
	            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        	</form>
      	</div>
	  </div>
    </body>
</html>
