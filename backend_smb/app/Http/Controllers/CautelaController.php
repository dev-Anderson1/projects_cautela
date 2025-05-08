<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Cautela;
use App\Models\CautelaItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class CautelaController extends Controller
{

    // Listar todas as cautelas
    public function index()
    {
        $cautelas = Cautela::with([
            'admin:id,name',
            'usuario:id,name,email',
            'itens.arma:id,modelo_id,carregador_id,municao_id',
            'itens.arma.modelo:id,name,numero_serie,calibre_id', // <- numero_serie está aqui!
            'itens.arma.modelo.calibre:id,nome',
            'itens.arma.carregador:id,capacidade,quantidade',
            'itens.arma.municao:id,tipo,calibre_id,quantidade',
            'itens.arma.municao.calibre:id,nome',
        ])->get();
        
        

        return response()->json($cautelas);
    }

    // Mostrar uma cautela específica
    public function show($id)
    {
        $cautela = Cautela::with([
            'admin:id,name',
            'usuario:id,name,email',
            'itens.arma:id,name,numero_serie,quantidade',
            'itens.colet:id,tipo,num_serie,quantidade',
            'itens.espada:id,tipo,num_serie,quantidade',
            'itens.algema:id,tipo,num_serie,quantidade',
            'itens.material:id,tipo,num_serie,quantidade',
        ])->find($id);

        if (!$cautela) {
            return response()->json(['message' => 'Cautela não encontrada'], 404);
        }

        return response()->json($cautela);
    }

// Atualizar status ou informações
public function update(Request $request, $id)
{
    $cautela = Cautela::find($id);

    if (!$cautela) {
        return response()->json(['message' => 'Cautela não encontrada'], 404);
    }

    $cautela->update($request->only(['status'])); // ou outros campos que quiser permitir

    return response()->json(['message' => 'Cautela atualizada', 'cautela' => $cautela]);
}

// Deletar cautela
public function destroy($id)
{
    $cautela = Cautela::find($id);

    if (!$cautela) {
        return response()->json(['message' => 'Cautela não encontrada'], 404);
    }

    $cautela->delete();

    return response()->json(['message' => 'Cautela deletada com sucesso']);
}

    // Autenticação do usuário para liberar o formulário de cautela
    public function authUser(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Usuário não autorizado'], 401);
        }
    
        // Gerar um token para o admin (opcional, caso você use Laravel Sanctum ou Passport)
        $admin = Auth::user();
        $token = $admin->createToken('admin_token')->plainTextToken;
    
        return response()->json([
            'message' => 'Usuário autorizado com sucesso',
            'token' => $token,
        ]);
    }
    
    // Registro inicial da cautela (admin preenche formulário)
    public function store(Request $request)
    {
        // Validação dos dados da requisição
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'itens' => 'required|array',
            'itens.*.id' => 'required|exists:armas,id',  // Garantir que o material (arma) existe
            'itens.*.quantidade' => 'required|integer|min:1',
        ]);
    
        // Verifica se o admin está logado
        $admin = Auth::user();
        if (!$admin->is_admin) {
            return response()->json(['message' => 'Apenas administradores podem criar cautelas'], 403);
        }
    
        // Criação da Cautela
        $cautela = Cautela::create([
            'admin_id' => $admin->id,
            'user_id' => $request->user_id,  // Usuário que está recebendo a cautela
            'status' => 'pendente', // Status inicial
        ]);
    
        // Criar os itens relacionados à cautela (armas, materiais)
        foreach ($request->itens as $item) {
            CautelaItem::create([
                'cautela_id' => $cautela->id,  // ID da cautela
                'material_id' => $item['id'],  // ID da arma
                'quantidade' => $item['quantidade'],  // Quantidade de armas
            ]);
        }
    
        return response()->json(['message' => 'Cautela registrada com sucesso. Aguarde confirmação.']);
    }


    // Autenticação do usuário para finalizar a cautela
    public function finalizar(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Confirmação inválida'], 401);
        }
    
        $cautela = Cautela::findOrFail($request->cautela_id);
    
        // Garantir que a cautela está em 'pendente' antes de finalizá-la
        if ($cautela->status !== 'pendente') {
            return response()->json(['message' => 'A cautela já foi finalizada ou devolvida.'], 400);
        }
    
        $cautela->update(['status' => 'autorizada']);
    
        return response()->json(['message' => 'Cautela finalizada com sucesso.']);
    }
    

    // Devolução dos itens com nova autenticação do usuário
    public function devolucao(Request $request)
    {
        $credentials = $request->only('email', 'password');
    
        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'Autenticação inválida'], 401);
        }
    
        $cautela = Cautela::findOrFail($request->cautela_id);
    
        // Garantir que a cautela esteja no status 'autorizada' para poder fazer a devolução
        if ($cautela->status !== 'autorizada') {
            return response()->json(['message' => 'A cautela não foi autorizada ainda.'], 400);
        }
    
        $cautela->update(['status' => 'devolvido']);
    
        return response()->json(['message' => 'Itens devolvidos com sucesso']);
    }

    public function usuariosComCautelasPendentes()
    {
        $usuarios = User::whereHas('cautelas', function ($query) {
            $query->where('status', 'pendente');
        })
        ->with([
            'opm:id,bpm',
            'postoGraduacao:id,nome',
            'cautelas' => function ($query) {
                $query->where('status', 'pendente')->with([
                    'itens.arma:id,modelo_id,carregador_id,municao_id',
                    'itens.arma.modelo:id,name,calibre_id',
                    'itens.arma.modelo.calibre:id,nome',
                    'itens.arma.carregador:id,capacidade,quantidade',
                    'itens.arma.municao:id,tipo,calibre_id,quantidade',
                    'itens.arma.municao.calibre:id,nome',
                    'itens.algema:id,tipo,num_serie,quantidade',
                    'itens.colete:id,tipo,num_serie,quantidade',
                    'itens.espada:id,tipo,num_serie,quantidade',
                ]);
            }
        ])
        ->get(['id', 'name', 'email', 'apelido', 'opm_id', 'posto_graduacoes_id']);
    
        return response()->json($usuarios);
    }
    
    
}
