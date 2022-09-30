<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleStoreRequest;
use App\Http\Resources\RoleResource;
use App\Models\Company;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function store(RoleStoreRequest $request, Company $company){
        $validatedData = $request->validated();
        $validatedData['usersNumber'] = 0;
        $role = $company->roles()->create($validatedData);
        return RoleResource::make($role);
    }
}
