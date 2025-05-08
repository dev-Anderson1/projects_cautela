<?php

namespace App\Http\Controllers;

use App\Models\Carregador;
use Illuminate\Http\Request;

class CarregadorController extends Controller
{
    // Método para listar todos os carregadores
    public function index()
    {
        $carregadores = Carregador::all();
        return response()->json($carregadores);
    }

    // Método para armazenar um novo carregador
    public function store(Request $request)
    {
        // Validação dos dados recebidos
        $validated = $request->validate([
            'capacidade' => 'required|integer|min:1',
            'quantidade' => 'required|integer|min:1',
            'arma_id' => 'nullable|exists:armas,id', // Verificando se o arma_id existe na tabela armas
        ]);

        // Criação de um novo carregador
        $carregador = Carregador::create($validated);

        return response()->json([
            'message' => 'Carregador criado com sucesso!',
            'data' => $carregador
        ], 201);
    }

    // Método para exibir um carregador específico
    public function show(Carregador $carregador)
    {
        return response()->json($carregador);
    }

    // Método para atualizar um carregador existente
    public function update(Request $request, Carregador $carregador)
    {
        // Validação dos dados recebidos
        $validated = $request->validate([
            'capacidade' => 'required|integer|min:1',
            'quantidade' => 'required|integer|min:1',
            'arma_id' => 'nullable|exists:armas,id', // Verificando se o arma_id existe na tabela armas
        ]);

        // Atualizando o carregador
        $carregador->update($validated);

        return response()->json([
            'message' => 'Carregador atualizado com sucesso!',
            'data' => $carregador
        ]);
    }

    // Método para excluir um carregador
    public function destroy(Carregador $carregador)
    {
        $carregador->delete();

        return response()->json([
            'message' => 'Carregador deletado com sucesso!'
        ], 204);
    }
}
