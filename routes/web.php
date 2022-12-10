<?php

use Illuminate\Support\Facades\Route;
use App\Models\Post;


//DB::listen(function($query) {
//    var_dump($query->sql, $query->bindings);
//});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');


//Route::get('/posts', function () {
//    $posts = Post::with('user')->get();
//});
