$(function() {
	Parse.$ = jQuery;
	// Replace this line with the one on your Quickstart Guide Page
	Parse.initialize("ZgbU37amr8Uz4Rcqs2hEs1wGX34OiWtviiFkNyfb", "Qev5nvacT12l0zvbaKEx2AjYmlaTrU95RGwvHJSY");	// The main view for the app
});

$('.form-signin').on('submit', function(e) {
    // Prevent Default Submit Event
    e.preventDefault();
    // Get data from the form and put them into variables
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var EditView = Parse.View.extend({
    	template: Handlebars.compile($('#user-tpl').html()),
    	render: function(user) {
    		this.$el.html(this.template(user.toJSON()));
    	}

    });
    // Call Parse Login function with those variables
    Parse.User.logIn(username, password, {
        // If the username and password matches
        success: function(user) {
        	alert("You are signed in!");
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