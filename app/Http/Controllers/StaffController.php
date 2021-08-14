<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCompanyAdminRequest;
use App\Http\Resources\StaffResource;
use App\Models\Staff;
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
                'firstName' => $request->input('firstName'),
                'lastName' => $request->input('lastName'),
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
}
