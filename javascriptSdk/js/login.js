$(function() {
	Parse.$ = jQuery;
	// Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("QBkCojCbQL4BNam3E30NmrzmlZDakOVcfPJO2oGu", "VpYXcEF1uNBtDP14bVcIpKTCu2kzYfx8ER0yb5gv");
});

/* Save Parse Object to Parse.com */ 
$("#target").submit(function(e) {
    e.preventDefault();     
   
    /* User Registration Verification  */
    // var user = new Parse.User();
    // var subscriptionSelection = $('input[name = subscription]:checked').val(); 
    // var dob = new Date( "2015"+"-"+"02" +"-"+ "03"); 
    // user.set("username", document.getElementById('name').value);
    // user.set("password", document.getElementById('password').value);
    // user.set("email", document.getElementById('mail').value);
    // user.set("firstname", "Sexy");
    // user.set("lastname", "King");
    // user.set("dob", "fuck");
    // user.set("registeredFromGame", "HFTR");
    // user.set("type", "ConventionCitys");
    // user.set("country", "US");

    
    // if(subscriptionSelection == "true") {
    //     user.set("isSubscribedToNewsletter", true);
    //     user.set("gender", "Male");
    // } 
    // else if (subscriptionSelection == "false") {
    //     user.set("isSubscribedToNewsletter", false);
    //     user.set("gender", "Female");
    // }
    // // Parse beforeSave will be called before the object is saved. 
    // user.signUp(null, {
    //   success: function(user) {
    //     alert(document.getElementById('name').value + "is saved" );
    //   },
    //   error: function(user, error) {
    //     // Show the error message somewhere and let the user try again.
    //     alert("Error: " + error.code + " " + error.message);
    //   }
    // });

    /* Testing HFTRAward Verificatoin*/
    // var HFTRAward = Parse.Object.extend("HFTRAward");
    // var awardObject = new HFTRAward();

    // awardObject.set("name", document.getElementById('name').value);
    // awardObject.set("dateActivated", document.getElementById('mail').value);

    // awardObject.save(null, {
    //   success: function(awardObject) {
    //     // Execute any logic that should take place after the object is saved.
    //     alert('New object created with objectId: ' + gameScore.id);
    //   },
    //   error: function(awardObject, error) {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     alert('Failed to create new object, with error code: ' + error.message);
    //   }
    // });


    /* Testing HFTRUserEarnedAward Verificatoin*/
    // var HFTRAward = Parse.Object.extend("HFTRAward");
    // var awardObject = new HFTRAward();    
    // var HFTRUserEarnedAward = Parse.Object.extend("HFTRUserEarnedAward");
    // var userAwardObject = new HFTRUserEarnedAward();
    // var user = new Parse.User.current();
    // var dob = new Date( "2015"+"-"+"02" +"-"+ "03"); 

    // awardObject.set("name", "ultimate award");
    // awardObject.set("dateActivated", dob);

    // awardObject.save(null, {
    //   success: function(awardObject) {
    //        // alert("Success baby");
    //   },
    //   error: function(awardObject, error) {
    //     alert('Failed to create award object, with error code: ' + error.message);
    //   }
    // });

    // userAwardObject.set("associatedUser", user);
    // userAwardObject.set("associatedAward", awardObject);

    // /* TODO: this code should not create class with column when the beforeSave return error! */
    // userAwardObject.save(null, {
    //   success: function(userAwardObject) {
    //     // Execute any logic that should take place after the object is saved.
    //     alert('New object created with objectId: ' + userAwardObject.id);
    //   },
    //   error: function(userAwardObject, error) {
    //     // Execute any logic that should take place if the save fails.
    //     // error is a Parse.Error with an error code and message.
    //     alert('Failed to create new user earned award object, with error code: ' + error.message);
    //   }
    // });

    /* Testing for GeoFence */
     var HFTGeofence = Parse.Object.extend("HFTRGeofence"); 
     var geoFenceObject = new HFTGeofence(); 
     var dob = new Date( "2015"+"-"+"02" +"-"+ "03"); 


     var point = new Parse.GeoPoint(30.0, -20.0);
     geoFenceObject.set("type", "ConventionCenter");
     geoFenceObject.set("group", "Yolo");
     geoFenceObject.set("name", "zzingkko");
     geoFenceObject.set("geoLocation", "point");
     geoFenceObject.set("geoRadius", "2");
     geoFenceObject.set("dateDeactivated", dob);

    geoFenceObject.save(null, {
        success: function(geoFenceObject) {

        },
        error: function(geoFenceObject, error) {
            alert(error.message);
        }
    });
    /* Testing for HFTRBeacon*/
    // var HFTRBeacon = Parse.Object.extend("HFTRBeacon");
    // var beaconObject = new HFTRBeacon(); 

    // var HFTRAward = Parse.Object.extend("HFTRAward");
    // var awardObject = new HFTRAward(); 

    // var HFTGeofence = Parse.Object.extend("HFTRGeofence"); 
    // var geoFenceObject = new HFTGeofence(); 

    // var dob = new Date( "2015"+"-"+"02" +"-"+ "03"); 

    // awardObject.set("name", "ultimate award");
    // awardObject.set("dateActivated", dob);

    // awardObject.save(null, {
    //   success: function(awardObject) {
    //   },
    //   error: function(awardObject, error) {
    //     alert('Failed to create award object, with error code: ' + error.message);
    //   }
    // });

    // geoFenceObject.set("type", "ConventionCenter");
    // geoFenceObject.set("group", "Yolo");
    // geoFenceObject.set("name", "zzingkko");

    // geoFenceObject.save(null, {
    //     success: function(geoFenceObject) {

    //     },
    //     error: function(geoFenceObject, error) {

    //     }
    // });

    // beaconObject.set("uuid", "Something");
    // beaconObject.set("associatedAward", awardObject);
    // beaconObject.set("associatedGeofence", geoFenceObject);
    // beaconObject.save(null, {
    //     success: function(beaconObject) {
    //         alert("Yolo! Success!");
    //     },
    //     error: function(beaconObject, error) {
    //         alert('Failed: ' + error.message);
    //     }
    // })     
});

/* Verify the user credntial and lets the user to login */
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