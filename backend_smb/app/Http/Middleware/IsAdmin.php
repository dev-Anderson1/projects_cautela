<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user(); // Pega o usuário autenticado da requisição
    
        // Verifica se o usuário existe e se é admin
        if ($user && $user->is_admin) {
            return $next($request);
        }
    
        return response()->json(['message' => 'Acesso negado.'], 403);
    }
}

