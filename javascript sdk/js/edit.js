$(function() {
	Parse.$ = jQuery;
	// Replace this line with the one on your Quickstart Guide Page
	Parse.initialize("ZgbU37amr8Uz4Rcqs2hEs1wGX34OiWtviiFkNyfb", "Qev5nvacT12l0zvbaKEx2AjYmlaTrU95RGwvHJSY");	// The main view for the app
	var user = Parse.User.current();
    $('#username').attr("placeholder",user.getUsername());
    $('#email').attr("placeholder", user.getEmail());

});

/* Update user info on parse */
$('.form-change').on('submit', function(e) {
	e.preventDefault();
	var user = Parse.User.current();

	var username = document.getElementById('username').value;
	var email = document.getElementById('email').value; 
	var password = document.getElementById('password').value; 
	// update info
    user.set("username", username);  // attempt to change username
    user.set("email", email);
    user.set("password", password);
    
    user.save(null, {
      success: function(user) {
        alert("Your information was succesfully changed!");
        location.reload();
      }
    });

});
