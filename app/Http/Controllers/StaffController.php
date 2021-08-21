<?php

namespace App\Http\Controllers;

use App\Http\Requests\CompanyAdmin\CreateCompanyAdminRequest;
use App\Http\Requests\CompanyAdmin\UpdateCompanyAdminRequest;
use App\Http\Resources\StaffResource;
use App\Http\Resources\StaffResourceCollectionWithCompanyName;
use App\Http\Resources\StaffResourceWithCompanyName;
use App\Models\Staff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StaffController extends Controller
{
    public function createCompanyAdmin(CreateCompanyAdminRequest $request){
        try {
        $validatedData = $request->validated();
        $validatedData['password'] = Hash::make($validatedData['password']);
        unset($validatedData['passwordConfirmation']);
        $validatedData['login'] = $validatedData['email'];
        $validatedData['usertype'] = 'companyAdmin';
        logger($validatedData);
        $companyAdmin = Staff::create($validatedData);
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

    public function destroy(Staff $staff){
        $name = $staff->name;
        $usertype = $staff->usertype;
        switch ($usertype){
            case 'systemAdmin':
                $usertype = 'System administrator';
                break;
            case 'companyAdmin':
                $usertype = 'Company administrator';
                break;
            case 'manager':
                $usertype = 'Manager';
                break;
        }
        $staff->delete();
        return response($usertype.' '.$name.' was deleted successfully');
    }

    //тут нужно применить полиси авторизейшн, чтобы этот метод был доступен только системному админу
    public function show(Staff $staff){
        return response(StaffResourceWithCompanyName::make($staff));
    }

    public function update(UpdateCompanyAdminRequest $request, Staff $staff){
        $validatedData = $request->validated();
        $password = $validatedData['password'];
        unset($validatedData['passwordConfirmation']);
        if (!is_null($password)){
            $validatedData['password'] = Hash::make($password);
        }
        $updateQuery = array();
        foreach ($validatedData as $key => $val){
            if (!is_null($val)){
                $updateQuery[$key] = $val;
            }
        }
        logger($updateQuery);
        $staff->update($updateQuery);
        return response(StaffResourceWithCompanyName::make($staff));
    }

}
