$(function() {
	Parse.$ = jQuery;
	// Replace this line with the one on your Quickstart Guide Page
	Parse.initialize("ZgbU37amr8Uz4Rcqs2hEs1wGX34OiWtviiFkNyfb", "Qev5nvacT12l0zvbaKEx2AjYmlaTrU95RGwvHJSY");	// The main view for the app
	var EditView = Parse.View.extend({
	    // Instead of generating a new element, bind to the existing skeleton of
	    // the App already present in the HTML.
	    el: $("#login"),

	    initialize: function() {
	      this.render();
	    },

	    render: function() {
	      if (Parse.User.current()) {
	        new EditProfileView();
	      } else {
	        new LogInView();
	      }
	    }
	  });  
});

$('.form-signin').on('submit', function(e) {
    // Prevent Default Submit Event
    e.preventDefault();
    // Get data from the form and put them into variables
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var EditView = Parse.View.extend({
    	template: Handlebars.compile($('#blogs-tpl').html()),
    	render: function(user) {
    		this.$el.html(this.template(user.toJSON()));
    	}

    });
    alert("inside submit");
    // Call Parse Login function with those variables
    Parse.User.logIn(username, password, {
        // If the username and password matches
        success: function(user) {
        	alert("success");
            var editView = new EditView();
            editView.render(Parse.User.current()); 
            $('.container').html(editView.el);
        },
        // If there is an error
        error: function(user, error) {
        	alert("Failed!");
            console.log(error);s
        }
    });
});

/* Update user info on parse */
$('.form-change').on('submit', function(e) {
	e.preventDefault();
	var user = Parse.User.current();
	$('#username').attr("placeholder",user.getUsername());
	$('#email').attr("placeholder", user.getEmail());

	var username = document.getElementById('username').value;
	var email = document.getElementById('email').value; 
	var password = document.getElementById('password').value; 
	console.log(username);
	// update info
    user.set("username", username);  // attempt to change username
    user.set("email", email);
    user.set("password", password);
    
    user.save(null, {
      success: function(user) {
        // This succeeds, since the user was authenticated on the device
        var query = new Parse.Query(Parse.User);
        query.get(user.objectId, {
          success: function(userAgain) {
            userAgain.set("username", "another_username");
            userAgain.save(null, {
              error: function(userAgain, error) {
                // This will error, since the Parse.User is not authenticated
              }
            });
          }
        });
      }
    });

});