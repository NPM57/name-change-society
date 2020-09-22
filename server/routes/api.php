<?php

use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('users', 'UserController@index');
// Route::get('users/{id}', 'UserController@getUserById');
// Route::post('users', 'UserController@createNewUser');
// Route::put('users/{id}', 'UserController@updateUserById');
// Route::delete('users/{id}', 'UserController@deleteUserById');

Route::post('login', 'AuthController@login');
Route::get('user/nearexpire', 'UserController@getUserNameNearlyExpire');

Route::group(['middleware' => ['auth:api']], function () {

    Route::get('user', 'UserController@user');
    Route::get('user/names', 'UserController@getHistoricalName');
    Route::put('user/info', 'UserController@updateInfo');
    

    Route::apiResource('users', 'UserController');
    Route::apiResource('roles', 'RoleController');
});

