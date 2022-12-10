<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function create(UserRequest $request): JsonResponse {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = User::where('email', $data['email'])
                    ->orWhere('login', $data['login'])
                    ->first();
        if($user) {
            if($user['email'] == $data['email']) {
                return response()->json(['message' => 'Данный email уже занят'], 403);
            }
            if($user['login'] == $data['login']) {
                return response()->json(['message' => 'Данный login уже занят'], 403);
            }
        }
        else {
            $user = User::create($data);
            $token = auth()->tokenById($user->id);
            return response()->json([
                'access_token' => $token,
            ]);
        }
    }

    public function getMe(): JsonResponse
    {
        $user = auth()->user();
        return response()->json($user);
    }
}
