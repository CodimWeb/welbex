<?php

use Illuminate\Support\Facades\Route;
use App\Models\Post;

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');
