<?php
namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Espada extends Model
{
    use HasFactory;

    protected $fillable = ['tipo', 'num_serie', 'quantidade'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}

