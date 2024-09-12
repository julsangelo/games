<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route::post('/submit-register', [AuthController::class,'submitRegister'])->name('submitRegister')->middleware('auth:sanctum');
// Route::post('/submit-login', [AuthController::class,'submitLogin'])->name('submitLogin');