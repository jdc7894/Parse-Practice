<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Parse\ParseClient;
use Parse\ParseObject; 
use Parse\ParseUser; 
use Parse\ParseSessionStorage;


class User extends Model {

	public function __construct() 
	{
		session_start();
    	ParseClient::initialize('QPFTtheMPSYYm4mOuVXme3Ta49DE0l2jFIyT3zzI', 'eKqJ5BZrp1N9jafT28JphRlvVKO05Az1aNWLN5XU', 'PNKKkWglhjvgYQnpIiShd37kL7t7nhbVMS7Swhpa');
    	ParseClient::setStorage( new ParseSessionStorage() );

	}

	public function signUp($name, $password, $email) 
   	{
   		$user = new ParseUser();
		$user->set("username", $name);
		$user->set("password", $password);
		$user->set("email", $email);
		try {
		  $user->signUp();
		} catch (ParseException $ex) {
		  echo "Error: " . $ex->getCode() . " " . $ex->getMessage();
		}

		return $user->get('username'); 
   	}

	public function logIn($name, $password)
	{
		try {
	  	$user = ParseUser::logIn($name, $password);
	} 	catch (ParseException $ex) {
	  	echo "Error: " . $ex->getCode() . " " . $ex->getMessage();
	}
		return $user->get('username');
	}

	public function logOut()
	{
		ParseUser::logOut();
	}

	public function updateInfo($name,$password,$email)
	{
		$currentUser = ParseUser::getCurrentUser();
		
		if($currentUser) {
			if($name) {
			$currentUser->set("username", $name);  
			}
			if($password) {
			$currentUser->set("password", $password);
			}
			if($email) {
			$currentUser->set("email", $email);
			}
			$currentUser->save();
			return $currentUser; 
		}	else {
			return null;
		}
	}

	public function getCurrentUser() {
		return ParseUser::getCurrentUser();
	}
}