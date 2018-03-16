<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::post('/user_logout', 'UserController@logout');

Route::get('{reactRoutes}', 'HomeController@index')->name('home')->where('reactRoutes', '^((?!api).)*$');

//Route::get('{reactRoutes}', function () {
//    return view('welcome'); // your start view
//})->where('reactRoutes', '^((?!api).)*$'); // except 'api', 'login' word
