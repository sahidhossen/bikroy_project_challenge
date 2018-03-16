<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user','UserController@getCurrentUser');
Route::middleware('auth:api')->get('/logout', 'UserController@logout');

/*
 * Employee CRUD Routes
 */
Route::middleware('auth:api')->get('/employee','UserController@getAllEmployee');
Route::middleware('auth:api')->post('/employee/create','UserController@create');
Route::middleware('auth:api')->post('/employee/update','UserController@update');
Route::middleware('auth:api')->post('/employee/delete','UserController@delete');

/*
 * Performance Reviews
 */
Route::middleware('auth:api')->get('/reviews','PerformanceReviewController@getAllReviewByCompanyId');
Route::middleware('auth:api')->post('/review/create','PerformanceReviewController@create');
Route::middleware('auth:api')->post('/review/update','PerformanceReviewController@update');

/*
 * User Feedback List
 */
Route::middleware('auth:api')->get('/feedbacks','PerformanceReviewController@reviewFeedbackByAssigned');
Route::middleware('auth:api')->post('/feedback/create','FeedbackController@create');
Route::middleware('auth:api')->get('/feedback/review','PerformanceReviewController@reviewFeedbackByReviewer');

