<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EntryController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\UserController;
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

// API Group Routes
Route::group(['prefix' => 'v1'], function () {
    /*
     * Guest area
     */
    Route::post('auth/login', [AuthController::class, 'login']);
    Route::post('auth/register', [AuthController::class, 'register']);

    /*
     * Authenticated area
     */
    Route::group(['middleware' => 'auth:sanctum'], function () {
        Route::get('dashboard/data', [DashboardController::class, 'data']);
        Route::get('dashboard/admin-data', [DashboardController::class, 'adminData']);

        Route::get('user/me', [UserController::class, 'me']);
        Route::resource('user', UserController::class, ['except' => ['create', 'store', 'edit']]);

        Route::get('entry/all', [EntryController::class, 'all']);
        Route::resource('entry', EntryController::class, ['except' => ['create', 'edit']]);

        Route::get('report/weekly', [ReportController::class, 'weekly']);
    });
});
