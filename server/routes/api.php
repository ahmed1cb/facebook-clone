<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FriendsController;
use App\Http\Controllers\PostController;
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


Route::prefix('requests')->middleware('auth.facebook')->controller(RequestsController::class)->group(function () {

    Route::post('/{userId}/toggle', 'toggleFriendRequest');

    Route::post('/{userId}/accept', 'acceptFriendRequest');

    Route::post('/{userId}/reject', 'rejectFriendRequest');



});


Route::prefix('friends')->middleware('auth.facebook')->controller(FriendsController::class)->group(function () {

    Route::get('/{userId}/', 'getFriendData');
    Route::delete('/{userId}/', 'deleteFriend');

});


Route::prefix('posts')->middleware('auth.facebook')->controller(PostController::class)->group(function () {

    Route::get('/{postId}', 'getPostDetails');

    Route::post('/', 'uploadPost');

    Route::put('/{postId}', 'updatePost');

    Route::delete('/{postId}', 'deletePost');


});

