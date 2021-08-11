<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCompanyAdminRequest;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    public function createCompanyAdmin(CreateCompanyAdminRequest $request){
        $validated = $request->validated();
        logger($validated);
        return response('Company admin was created');
    }
}
