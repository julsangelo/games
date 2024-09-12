<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Route;

Route::get("/user", function (Request $request) {
    return $request->user();
});

Route::post('/submit-register', [AuthController::class,'submitRegister']);
Route::post('/submit-login', [AuthController::class,'submitLogin']);
Route::post('/submit-logout', [AuthController::class,'submitLogout']);
Route::put('/submit-edit', [UserController::class,'editProfile']);
Route::post('/search', [GameController::class, 'searchGames']);
Route::post('/recently-clicked', [GameController::class,'recentlyClicked']);

Route::get('/games', [GameController::class, 'getGames']);

Route::get('/redisconnect', function() {
    try {
        $redis = Redis::connection("default");
        $redis = Redis::connection("cache");
        return "Redis connection is okay.";
    } catch (Exception $e){
        return "Redis connection is not okay.";
    }
});

Route::get('/csrf', function() {
    return csrf_token();
});

Route::view('/{path?}', 'index');