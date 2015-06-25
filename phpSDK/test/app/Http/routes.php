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


Route::get('/', function () {
    return view('welcome');
});

Route::get('/index', 'ParseController@index');

Route::get('/signup', 'ParseController@signup');

Route::get('/login', 'ParseController@login');

Route::get('logout', 'ParseController@logout');

Route::get('/welcome', 'ParseController@welcome'); 

Route::get('/edit', 'ParseController@edit'); 

Route::get('/update', 'ParseController@update'); 

Route::get('token', function() {
    echo csrf_token();
});



