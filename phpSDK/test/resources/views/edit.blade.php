<!DOCTYPE html>
<html>
    <head>
        <title>Laravel</title>
        <link rel="stylesheet" href="<?php echo asset('css/bootstrap.min.css')?>" type="text/css"> 
      <link rel="stylesheet" href="<?php echo asset('css/signin.css')?>" type="text/css"> 
    </head>
    <body>
        <form class="form-change" role="form" action="/update" method="get">
        <fieldset>
          <div id="legend">
            <legend class="">Change your profile </legend>
          </div>
          <div class="control-group">
            <!-- Username -->
            <label class="control-label" for="username">Username</label>
            <div class="controls">
              <input type="text" id="username" name="username" placeholder={{$name}} class="input-xlarge">
            </div>
          </div>
       
          <div class="control-group">
            <!-- E-mail -->
            <label class="control-label" for="email">E-mail</label>
            <div class="controls">
              <input type="text" id="email" name="email" placeholder={{$email}} class="input-xlarge">
            </div>
          </div>
       
          <div class="control-group">
            <!-- Password-->
            <label class="control-label" for="password">Password</label>
            <div class="controls">
              <input type="password" id="password" name="password" placeholder="" class="input-xlarge">
              <p class="help-block">Password should be at least 4 characters</p>
            </div>
          </div>
       
          <div class="control-group">
            <!-- Button -->
            <div class="controls">
              <button class="btn btn-success" type="submit">Register</button>
            </div>
          </div>
        </fieldset>
      </form>
    </body>
</html>

 