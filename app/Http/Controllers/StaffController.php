<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCompanyAdminRequest;
use App\Http\Resources\StaffResource;
use App\Http\Resources\StaffResourceCollectionWithCompanyName;
use App\Models\Company;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    public function createCompanyAdmin(CreateCompanyAdminRequest $request){
        $validated = $request->validated();
        logger($validated);
        if ($request->input('password')!=$request->input('passwordConfirmation'))
            return response('password and password confirmation don`t match', 422);
        try {
            $companyAdmin = Staff::create([
                'name' => $request->input('name'),
                'phoneNumber' => $request->input('phoneNumber'),
                'email' => $request->input('email'),
                'status' => $request->input('status'),
                'login' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'companyId' => $request->input('companyId'),
                'usertype' => 'companyAdmin'
            ]);
            return response(StaffResource::make($companyAdmin));
        } catch (\PDOException $e) {
            if ($e->errorInfo[1] == 1062)
                return response(['message' => 'Company admin entity with '.$request->input('email').' email already exists'], 500);
            throw $e;
        }
    }

    public function companyAdmins(Request $request){
        $queryRaw = json_decode(json_encode($request->query()));
        if (isset($queryRaw->status)){
            if ($queryRaw->status=='any')
                $queryRaw->status='';
        }
        unset($queryRaw->page);
        $query = array('usertype' => 'companyAdmin');
        foreach ($queryRaw as $key => $value){
            if ($value){
                array_push($query, [$key, $value]);
            }
        }
        return StaffResourceCollectionWithCompanyName::make(Staff::where($query)->paginate(5));
    }
}
