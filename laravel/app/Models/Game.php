<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\TargetGroup;

class Game extends Model
{
    use HasFactory;

    // Allow the below fields to be filled
    protected $fillable = [
        'title',
        'description',
    ];

    public function clients()
    {
        return $this->belongsToMany(Client::class, 'client_game');
    }
}
