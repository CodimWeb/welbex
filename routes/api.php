<?php

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout',  [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
});

//public
Route::post('/registration', [UserController::class, 'create']);
Route::get('/posts', [PostController::class, 'getAll']);

// auth
Route::group(['middleware' => 'jwt.auth'], function () {
    Route::get('/me', [UserController::class, 'getMe']);
    Route::post('/post', [PostController::class, 'create']);
    Route::get('/post/{id}', [PostController::class, 'getPost']);
    Route::post('/post/update', [PostController::class, 'updatePost'])->middleware('author');
    Route::delete('/post/{id}', [PostController::class, 'delete'])->middleware('author');
});
