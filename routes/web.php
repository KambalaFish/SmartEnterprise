<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/{query}', function (){
    return view('app');
})->where('query', '((?!api).)*$');

Route::get('/api/tap', function (){
//    \Illuminate\Support\Facades\Log::channel('stderr')->error('hello, log!');
//    Log::debug('tapping');

//   $departments = \App\Models\Company::find(10)->departments;

//    $companies = \App\Models\Company::where('country', 'Congo')->get();
//    $companies->map(function ($x){ logger($x->departments);});

//    $departments = \App\Models\Department::where('users_number','=', 10)->get();
//    $departments->map(function ($x) {
//        logger($x->company->id.' '.$x->company->name);
//    });

//    $company = \App\Models\Company::find(9);
//    $bigdep = $company->biggestDepartment;
//    logger('department name: '.$bigdep->name);
//    logger('users_number: '.$bigdep->users_number);
//    logger('company_id: '. $bigdep->company_id);
//    logger('company_name: '.$company->name);

//    $mainAdmin = \App\Models\Contacts\MainAdminContact::find(1);
//    logger('company_id: '. $mainAdmin->company_id);
//    $departments = $mainAdmin->departments;
//    $departments->map(function ($x){logger($x);});

//    $department = \App\Models\Department::find(1);
//    logger('department: '.$department);
//        $department->staff()->where('status', 'on_vacation')->get()->map(function($item){return logger(
////        $department->staff->map(function($item){return logger(
//        PHP_EOL.
//        'staff id: '.$item->id.PHP_EOL
//        .'first name: '.$item->first_name.PHP_EOL
//        .'email: '. $item->email.PHP_EOL
//        .'status: '. $item->status.PHP_EOL
//        .'department id: '.$item->pivot->department_id.PHP_EOL
//        .'company id: '. $item->company_id
//        .PHP_EOL);});

//    retrieve departments which has at least 2 staff with company_id = 1
//    $department = \App\Models\Department::whereHas('staff', function (Illuminate\Database\Eloquent\Builder $query){
//       $query->where('company_id', '=', 1);
//    }, '>=', 2)->get();
//    $department->map(function($x){
//       logger($x);
//    });

//    $department = \App\Models\Department
//    ::withCount(['staff as stuffNumber' => function(\Illuminate\Database\Eloquent\Builder $query){
//        $query->where('status', 'illness');
//    }])
//    ->where('id',4)
//    ->get();
//    logger($department);

//    $department = \App\Models\Department::find(1);
//    $department->loadCount(['staff' => function($query){$query->where('status', 'works');}]);
//    logger('department: '.$department);

//    $departments = \App\Models\Department::withMax('staff', 'id')->get();
//    $departments->map(function ($x){logger($x);});

////    eager loading:
//    $departments = \App\Models\Department::with('staff')->get();
//    $departments->map(function ($dep){$dep->staff->map(function ($x){logger($x->first_name.' '.$x->last_name);});});

////    eager loading specific columns
////    $departments = \App\Models\Department::with('staff:email,status')->get();
//    $departments = \App\Models\Department::with(['staff:id,email,status,company_id' => function($query){
//        $query->where('status', 'works');
//    }])->get();
//    $departments->map(function ($dep){$dep->staff->map(function ($x){logger($x);});});

});

Route::fallback(function (){
    return 'This is fallback page. Input correct URL!';
});
