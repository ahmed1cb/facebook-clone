<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RequestsController;
use Illuminate\Support\Facades\Route;


Route::prefix('auth')->group(function () {

    Route::middleware('auth.facebook')->group(function () {

        Route::get('user', [AuthController::class, 'getUserDetails']);
        Route::post('user/edit', [ProfileController::class, 'editProfile']);
    });

    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);

});


Route::prefix('requests')->middleware('auth.facebook')->group(function () {

    Route::post('/{userId}/toggle', [RequestsController::class, 'toggleFriendRequest']);

    Route::post('/{userId}/accept', [RequestsController::class, 'acceptFriendRequest']);
    Route::post('/{userId}/reject', [RequestsController::class, 'rejectFriendRequest']);

});
