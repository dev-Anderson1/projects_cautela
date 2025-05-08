<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cautela extends Model
{
    use HasFactory;

    protected $fillable = [
        'admin_id',
        'user_id',
        'status',
    ];

    // Relacionamento com o Admin (usuário administrador)
    public function admin()
    {
        return $this->belongsTo(User::class, 'admin_id');
    }

    // Relacionamento com o Usuário (aquele que recebe a cautela)
    public function usuario()
    {
        return $this->belongsTo(User::class, 'user_id');  // Relacionamento com user_id
    }

    // Relacionamento com os Itens (cautela_items)
    public function itens()
    {
        return $this->hasMany(CautelaItem::class);
    }
}

