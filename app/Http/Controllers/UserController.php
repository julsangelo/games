<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redis;

class UserController extends Controller
{
    public function editProfile(EditRequest $request) {
        $editValidated = $request->validated();
        $user = Auth::user();

        if($editValidated) {
            if (Redis::connection('cache')->exists($user->username)) {
                Redis::connection('cache')->rename($user->username, $request->username);
            } 

            User::where("id", $user->id)->update($editValidated);

            return response()->json([
                'result' => 'true',
                'data' => $editValidated,
            ]);
        } 

        return response()->json([
            'result'=> 'false',
        ]);
    }
}
