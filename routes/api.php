<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\AuthController;
use \App\Http\Controllers\StaffController;
use \App\Http\Controllers\RoleController;
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
    Route::get('company/{company}/info', [CompanyController::class, 'info']);
    Route::get('company/{company}/departments', [CompanyController::class, 'companyDepartments']);
    Route::get('company/{company}/roles', [CompanyController::class, 'companyRoles']);
    Route::get('company/{company}/teams', [CompanyController::class, 'companyTeams']);
    Route::post('staff/companyAdmin/create', [StaffController::class, 'createCompanyAdmin']);
    Route::get('company/all', [CompanyController::class, 'indexAll']);
    Route::get('staff/companyAdmins', [StaffController::class, 'companyAdmins']);
    Route::delete('staff/{staff}', [StaffController::class, 'destroy']);
    Route::get('staff/{staff}', [StaffController::class, 'show']);
    Route::put('staff/{staff}', [StaffController::class,'update']);
    Route::post('company/{company}/role', [RoleController::class, 'store']);
});
