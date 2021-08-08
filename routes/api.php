<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AuthController;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('login', [AuthController::class, 'login']);
Route::post('logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function(){
    Route::apiResource('companies', CompanyController::class);

    Route::get('company/{company}/mainAdmin', [CompanyController::class, 'mainAdminContact']);
    Route::get('company/{company}/itHead', [CompanyController::class, 'itHeadContact']);
    Route::get('company/{company}/customerManager', [CompanyController::class, 'customerManagerContact']);
    Route::post('company/update', [CompanyController::class, 'update']);
    Route::get('company/{company}/departments', [CompanyController::class, 'companyDepartments']);
    Route::get('company/{company}/roles', [CompanyController::class, 'companyRoles']);
    Route::get('company/{company}/teams', [CompanyController::class, 'companyTeams']);
});
