<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Método para fazer login
   // Exemplo de controle de login com Sanctum
   public function login(Request $request)
{
    $credentials = $request->only('email', 'password');
    
    if (Auth::attempt($credentials)) {
        $user = Auth::user();
        $token = $user->createToken('Personal Access Token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => $user
        ]);
    }

    return response()->json(['message' => 'Credenciais inválidas'], 401);
}
   


    // Método para fazer logoutpublic function logout(Request $request)
    public function logout(Request $request)
    {
        // Revoga o token atual
        $request->user()->currentAccessToken()->delete();
    
        return response()->json([
            'message' => 'Logout realizado com sucesso!',
        ]);
    }

    // Método para verificar se o usuário está autenticado
    public function check(Request $request)
    {
        return response()->json([
            'authenticated' => Auth::check(),
            'user' => Auth::user(),
        ]);
    }
}
