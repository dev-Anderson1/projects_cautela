<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    // Registro de usuáriopublic function register(Request $request)
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|max:255',
            'password' => 'required|min:6',
            'is_admin' => 'nullable|boolean',
            'opm_id' => 'nullable|integer',
            'posto_graduacoes_id' => 'nullable|integer',
            'colete_id' => 'nullable|integer',
            'espada_id' => 'nullable|integer',
            'algema_id' => 'nullable|integer',
            'outros_materiais' => 'nullable|string',
            'arma_id' => 'nullable|integer',
        ]);
    
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->is_admin ?? 0,
            'opm_id' => $request->opm_id ?? null,
            'posto_graduacoes_id' => $request->posto_graduacoes_id ?? null,
            'colete_id' => $request->colete_id ?? null,
            'espada_id' => $request->espada_id ?? null,
            'algema_id' => $request->algema_id ?? null,
            'outros_materiais' => $request->outros_materiais ?? null,
            'arma_id' => $request->arma_id ?? null,
        ]);
    
        $token = $user->createToken('auth_token')->plainTextToken;
    
        return response()->json([
            'user' => $user,
            'token' => $token,
        ], 201);
    }
    


    // Mostrar todos os usuários
    public function index()
{
    $users = User::select('id', 'name', 'email', 'apelido', 'opm_id', 'posto_graduacoes_id')
        ->with([
            'opm:id,bpm',
            'postoGraduacao:id,nome',
        ])
        ->get();

    return response()->json($users);
}




    // Mostrar um usuário específico pelo ID
    public function show($id)
{
    $user = User::select('id', 'name', 'email', 'apelido', 'opm_id', 'posto_graduacoes_id')
        ->with([
            'opm:id,bpm',
            'postoGraduacao:id,nome',
            'cautelas' => function ($query) {
                $query->with([
                    'admin:id,name',
                    'itens.arma:id,modelo_id,carregador_id,municao_id',
                    'itens.arma.modelo:id,name,calibre_id,numero_serie',
                    'itens.arma.modelo.calibre:id,nome',
                    'itens.arma.carregador:id,capacidade,quantidade',
                    'itens.arma.municao:id,tipo,calibre_id,quantidade',
                    'itens.arma.municao.calibre:id,nome',
                    'itens.colete:id,tipo,num_serie,quantidade',
                    'itens.espada:id,tipo,num_serie,quantidade',
                    'itens.algema:id,tipo,num_serie,quantidade',
                ]);
            }
        ])
        ->find($id);

    if (!$user) {
        return response()->json(['message' => 'Usuário não encontrado'], 404);
    }

    return response()->json($user);
}


    // Atualizar informações de um usuário
    public function update(Request $request, $id)
    {
        $user = User::find($id);
    
        if (!$user) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        }
    
        $request->validate([
            'name' => 'string|max:255',
            'email' => 'email|unique:users,email,' . $id . '|max:255',
            'password' => 'min:6',
            'is_admin' => 'nullable|boolean',
            'opm_id' => 'nullable|integer',
            'posto_graduacoes_id' => 'nullable|integer',
            'colete_id' => 'nullable|integer',
            'espada_id' => 'nullable|integer',
            'algema_id' => 'nullable|integer',
            'outros_materiais' => 'nullable|string',
            'arma_id' => 'nullable|integer',
        ]);
    
        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
            'password' => $request->password ? Hash::make($request->password) : $user->password,
            'is_admin' => $request->is_admin ?? $user->is_admin,
            'opm_id' => $request->opm_id ?? $user->opm_id,
            'posto_graduacoes_id' => $request->posto_graduacoes_id ?? $user->posto_graduacoes_id,
            'colete_id' => $request->colete_id ?? $user->colete_id,
            'espada_id' => $request->espada_id ?? $user->espada_id,
            'algema_id' => $request->algema_id ?? $user->algema_id,
            'outros_materiais' => $request->outros_materiais ?? $user->outros_materiais,
            'arma_id' => $request->arma_id ?? $user->arma_id,
        ]);
    
        return response()->json([
            'message' => 'Usuário atualizado com sucesso!',
            'user' => $user,
        ]);
    }
    

    // Deletar um usuário pelo ID
    public function destroy($id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'Usuário não encontrado.',
            ], 404);
        }

        $user->delete();

        return response()->json([
            'message' => 'Usuário deletado com sucesso!',
        ]);
    }
}