<?php namespace App\Http\Controllers;

use Parse\ParseClient;
use Parse\ParseObject; 
use Parse\ParseUser; 
use Illuminate\Http\Request;
use Parse\ParseSessionStorage;
use \Input; 

class ParseController extends Controller
{
	public function __construct()
    {
    	session_start();
    	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
    	ParseClient::setStorage( new ParseSessionStorage() );
    }

	public function index() 
	{
		return view('signup');
	}

	public function signup() 
	{
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
	}

	public function login() 
	{
		/* if logged in, return to welcome page */
		$user = ParseUser::getCurrentUser();
		if($user) {						// redirects to welcome page if user is logged in 
			return view('welcome', [
				'name' => $user->get('username')
			]);
		} else {		// user not logged in 
			return view('login');
		}
	}

	public function logout() 
	{
		ParseUser::logOut();
		return view('login');
	}

	public function welcome(Request $request) 
	{
		$name = $request->input('username');
		$password = $request->input('password');

		ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
		try {
		  $user = ParseUser::logIn($name, $password);
		} catch (ParseException $error) {
			// handle error in login 
		}
		return view('welcome', [
				'name' => $name
		]);
	}

	public function edit() 
	{
		$user = ParseUser::getCurrentUser();
		$name = $user->get('username'); 
		$email = $user->get('email');
		return view('edit', [
			'name' => $name, 
			'email' => $email
		]);
	}

	public function update(Request $request) 
	{
		$name = $request->input('username');
		$password = $request->input('password');
		$email = $request->input('email');
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
	}

}