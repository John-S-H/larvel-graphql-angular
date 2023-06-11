<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validate the request data
        try {
            $validatedData = $this->validate($request, [
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:8',
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        // Create a new user based on the request data
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => bcrypt($validatedData['password']),
        ]);

        // Log in the user
        Auth::login($user);

        // Generate a token for the user
        $token = $user->createToken('authToken')->plainTextToken;

        // Return the user and token as a response
        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201);

    }


    public function login(Request $request)
    {
        // Validation rules for login
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        // Validate the request data
        $this->validate($request, $rules);

        // Attempt to authenticate the user
        if (Auth::attempt($request->only('email', 'password'))) {
            // Authentication successful
            $user = Auth::user();

            // Generate a new token for the user
            $token = $user->createToken('authToken')->plainTextToken;

            // Return the user and token as a response
            return response()->json([
                'user' => $user,
                'token' => $token
            ], 200);
        }

        // Authentication failed
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        // Revoke the current user's token
        $request->user()->currentAccessToken()->delete();

        // Return a success message
        return response()->json(['message' => 'Logged out successfully']);
    }

}
