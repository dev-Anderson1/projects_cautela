<?php

namespace App\Http\Controllers;

use App\Models\Arma;
use App\Models\Municao;
use App\Models\Carregador;
use App\Models\ModeloArma;
use Illuminate\Http\Request;

class ArmaController extends Controller
{
    // Lista todas as armas
    public function index()
    {
        $armas = Arma::all();
        return response()->json($armas);
    }

    // Cria uma nova arma
    public function store(Request $request)
    {
        $request->validate([
            'municao_id' => 'required|exists:municoes,id',
            'carregador_id' => 'required|exists:carregadores,id',
            'modelo_armas_id' => 'required|exists:modelo_armas,id',
        ]);

        $arma = Arma::create($request->all());

        return response()->json([
            'message' => 'Arma criada com sucesso!',
            'data' => $arma
        ], 201);
    }

    // Mostra uma arma específica
    public function show($id)
    {
        $arma = Arma::findOrFail($id);
        return response()->json($arma);
    }

    // Atualiza uma arma
    public function update(Request $request, $id)
    {
        $request->validate([
            'municao_id' => 'required|exists:municoes,id',
            'carregador_id' => 'required|exists:carregadores,id',
            'modelo_armas_id' => 'required|exists:modelo_armas,id',
        ]);

        $arma = Arma::findOrFail($id);
        $arma->update($request->all());

        return response()->json([
            'message' => 'Arma atualizada com sucesso!',
            'data' => $arma
        ]);
    }

    // Deleta uma arma
    public function destroy($id)
    {
        $arma = Arma::findOrFail($id);
        $arma->delete();

        return response()->json([
            'message' => 'Arma deletada com sucesso!'
        ], 204);
    }
}
