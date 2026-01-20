<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\PlaceOrderController;
use App\Http\Controllers\AuthController;

Route::get('/test', function () {
    return response()->json(['message' => 'API working']);
});

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::post('/order', [OrderController::class, 'placeOrder']);
Route::post('/products', [ProductController::class, 'store']);
Route::post('/place-order', [PlaceOrderController::class, 'store']);
Route::get('/admin/orders', [PlaceOrderController::class, 'index']);

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Protected routes
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::get('/admin/orders', [PlaceOrderController::class, 'index']);
});

// Route::middleware('auth:sanctum')->group(function () {
// Route::put('/products/{id}', [ProductController::class, 'update']);    
// });


// Route::post('/login', [LoginController::class, 'login']);
// Route::post('/register', [LoginController::class, 'register']);
