<?php

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

Route::get('/signup', 'ParseController@signUp');

Route::get('/login', 'ParseController@logIn');

Route::get('/logout', 'ParseController@logOut');

Route::get('/checkCredential', 'ParseController@checkCredential'); 

Route::get('/showEditPage', 'ParseController@showEditPage'); 

Route::get('/update', 'ParseController@update'); 

Route::get('token', function() {
    echo csrf_token();
});



