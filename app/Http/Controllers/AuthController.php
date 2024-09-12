<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function submitLogin(LoginRequest $request) {
        $loginValidated = $request->validated();

        if ($loginValidated) {
            if(Auth::attempt($loginValidated)) {
                $sessionId = $request->session()->getId();
                $user = Auth::user();
                return response()->json([
                    'result'=> 'true',
                    'id' => $sessionId,
                    'user' => $user
                ]);
                
            } else {
                return response()->json([
                    'result'=> false,
                    'message'=> 'Incorrect username or password.'
                ]);
            } 
        }
    }
    
    public function submitRegister(RegisterRequest $request) {
        $registerValidated = $request->validated();

        if($registerValidated) {
            $user = User::create([
                'firstName'=> $request->firstName,
                'lastName'=> $request->lastName,
                'gender' => $request->gender,
                'dateOfBirth'=> $request->dateOfBirth,
                'username'=> $request->username,
                'password'=> Hash::make($request->password),
            ]);

            return response()->json([
                'result'=> true,
            ]);
        } else {
            return response()->json([
                'result'=> false,
                'message' => $registerValidated->messages(),
            ]);
        }
    }

    public function submitLogout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();
    }    
}
