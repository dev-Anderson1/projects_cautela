<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Opm extends Model
{
    use HasFactory;

    protected $fillable = ['bpm'];

    public function users()
    {
        return $this->hasMany(User::class);
    }
}
