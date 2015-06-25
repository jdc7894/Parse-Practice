<?php

use Parse\ParseClient;
use Parse\ParseObject; 
use Parse\ParseUser; 
use Illuminate\Http\Request;
use Parse\ParseSessionStorage;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

session_start();

Route::get('/', function () {
    return view('welcome');
});

Route::get('/index', 'ParseController@index');

Route::get('/signup', function () {
	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
	$name = Input::get('user_name');
	$email = Input::get('user_email');
	$password = Input::get('user_password');

	// save info to parse 
	$user = new ParseUser();
	$user->set("username", $name);
	$user->set("password", $password);
	$user->set("email", $email);

	try {
	  $user->signUp();
	  // Hooray! Let them use the app now.
	} catch (ParseException $ex) {
	  // Show the error message somewhere and let the user try again.
	  echo "Error: " . $ex->getCode() . " " . $ex->getMessage();
	}
	return view('welcome', [
			'name' => $name
	]);
});

Route::get('/login', function () {
	/* if logged in, return to welcome page */
	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
	$user = ParseUser::getCurrentUser();
	if($user) {						// redirects to welcome page if user is logged in 
		return view('welcome', [
			'name' => $user->get('username')
		]);
	} else {		// user not logged in 
		return view('login');
	}
});

Route::get('logout', function() {
	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
	ParseUser::logOut();
	return view('login');
});

Route::get('/welcome', function (Request $request) {
	$name = $request->input('username');
	$password = $request->input('password');

	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
	ParseClient::setStorage( new ParseSessionStorage() );
	try {
	  $user = ParseUser::logIn($name, $password);
	  // Do stuff after successful login.
	} catch (ParseException $error) {
	  // The login failed. Check error to see why.
	}
	return view('welcome', [
			'name' => $name
	]);
}); 


Route::get('/edit', function () {
	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
	$user = ParseUser::getCurrentUser();
	$name = $user->get('username'); 
	$email = $user->get('email');
	return view('edit', [
		'name' => $name, 
		'email' => $email
	]);
}); 

Route::get('/update', function (Request $request) {

	$name = $request->input('username');
	$password = $request->input('password');
	$email = $request->input('email');
	
	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
	$user = ParseUser::getCurrentUser();
	if ($user) {							// update user info
		if($name) {
			$user->set("username", $name);  
		}
		if($password) {
			$user->set("password", $password);
		}
		if($email) {
			$user->set("email", $email);
		}
		$user->save();
		return view('welcome', [
			'name' => $name 
		]);
	} else {									// redirect to login page 
		return view('login');
	}
}); 

Route::get('token', function() {
    echo csrf_token();
});



