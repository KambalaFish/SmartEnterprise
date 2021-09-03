<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Resources\LoginResource;
use App\Models\Staff;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(LoginRequest $request){
        if (Auth::attempt($request->only('email', 'password'))){
            $request->session()->regenerate();
            $id = Auth::id();
            $user = Staff::find($id);
            $roles = $user->roles;
            logger('user: '.$user);
            logger('roles: '.$roles);
            return response(LoginResource::make($user), 200);
        }
        return response('Credentials are not valid', 401);
    }

    public function logout(Request $request){
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response('logged out', 200);
    }
}
